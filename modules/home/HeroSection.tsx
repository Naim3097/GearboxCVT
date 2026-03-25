'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { HERO_IMAGE } from '@/lib/images'

// MOTION.md patterns: #9 hero parallax, #23 scroll indicator, #8 word reveal

export default function HeroSection() {
  const heroRef    = useRef<HTMLElement>(null)
  const imgRef     = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const indicator  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function init() {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const hero    = heroRef.current
      const img     = imgRef.current
      const content = contentRef.current
      const ind     = indicator.current
      if (!hero || !img || !content || !ind) return

      // Hero image parallax — MOTION.md #9
      gsap.to(img, {
        yPercent: 25,
        scale: 1.3,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Content fade out on scroll
      gsap.to(content, {
        yPercent: -30,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '60% top',
          scrub: true,
        },
      })

      // SplitText word reveal (manual fallback) — MOTION.md #8
      const headings = hero.querySelectorAll<HTMLElement>('[data-split]')
      headings.forEach(el => {
        const text = el.textContent ?? ''
        el.innerHTML = ''
        text.split(/\s+/).forEach((w, i, arr) => {
          if (!w) return
          const span = document.createElement('span')
          span.className = 'word'
          span.textContent = w
          el.appendChild(span)
          if (i < arr.length - 1) el.appendChild(document.createTextNode(' '))
        })
      })

      gsap.set(hero.querySelectorAll('.word'), {
        perspective: 1000,
        transformOrigin: 'bottom',
      })
      gsap.from(hero.querySelectorAll('.word'), {
        y: 50,
        rotationX: 80,
        opacity: 0,
        duration: 0.667,
        stagger: 0.067,
        ease: 'customEaseOut',
        delay: 2.2, // after loader exits
      })

      // Scroll indicator fade in
      gsap.to(ind, {
        opacity: 1,
        duration: 0.8,
        delay: 2.8,
        ease: 'customEaseOut',
      })
    }

    init()
  }, [])

  return (
    <section ref={heroRef} className="hero" aria-label="Bahagian utama">
      {/* Background — Unsplash automotive hero image */}
      <div ref={imgRef} className="hero-img-wrap">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="hero-grad" aria-hidden="true" />

      <div
        ref={contentRef}
        className="hero-content flex flex-col justify-end pb-24 px-6 h-full site-container"
      >
        <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-4">
          Portal Rujukan Gearbox Malaysia
        </p>
        <h1
          data-split="true"
          className="text-white text-display-xl font-light leading-tight mb-6 max-w-3xl"
        >
          Semua yang perlu anda tahu tentang gearbox kereta
        </h1>
        <p className="text-white/60 text-lg max-w-xl mb-8 leading-relaxed">
          Panduan praktikal, pembaikan, dan tip penyelenggaraan — ditulis untuk pemandu Malaysia.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/gearbox-repair/"
            className="px-6 py-3 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded transition-colors"
          >
            Masalah Gearbox
          </Link>
          <Link
            href="/cvt/"
            className="px-6 py-3 border border-white/20 hover:border-white/50 text-white text-sm font-medium rounded transition-colors"
          >
            Panduan CVT
          </Link>
        </div>
      </div>

      {/* Scroll indicator — MOTION.md #23 */}
      <div ref={indicator} className="scroll-indicator" aria-hidden="true">
        <div className="si-line" />
        <span>TATAL</span>
      </div>
    </section>
  )
}
