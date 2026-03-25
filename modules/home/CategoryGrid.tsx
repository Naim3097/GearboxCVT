'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'

// MOTION.md patterns: #8 word reveal, #12 staggered card entrance

export default function CategoryGrid() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    async function init() {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      if (!section) return

      // Section heading word reveal
      const heading = section.querySelector<HTMLElement>('[data-split]')
      if (heading) {
        const text = heading.textContent ?? ''
        heading.innerHTML = ''
        text.split(/\s+/).forEach((w, i, arr) => {
          if (!w) return
          const span = document.createElement('span')
          span.className = 'word'
          span.textContent = w
          heading.appendChild(span)
          if (i < arr.length - 1) heading.appendChild(document.createTextNode(' '))
        })
        gsap.set(heading.querySelectorAll('.word'), {
          perspective: 1000,
          transformOrigin: 'bottom',
        })
        gsap.from(heading.querySelectorAll('.word'), {
          y: 50,
          rotationX: 80,
          opacity: 0,
          duration: 0.334,
          stagger: 0.067,
          ease: 'customEaseOut',
          scrollTrigger: { trigger: heading, start: 'top 70%' },
        })
      }

      // Card stagger entrance
      gsap.utils.toArray<HTMLElement>('.cat-card').forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.667,
          delay: i * 0.08,
          ease: 'customEaseOut',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        })
      })
    }

    init()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-pad bg-subtle"
      aria-labelledby="cat-grid-heading"
    >
      <div className="site-container">
        <div className="mb-12">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-3">
            Topik
          </p>
          <h2
            id="cat-grid-heading"
            data-split="true"
            className="text-display-md font-light text-ink"
          >
            Terokai mengikut kategori
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}/`}
              className="cat-card card bg-surface group block p-8 border border-border opacity-0 translate-y-10"
              style={{ '--index': i } as React.CSSProperties}
            >
              <span className="block w-8 h-px bg-accent mb-6 transition-all duration-500 group-hover:w-12" />
              <h3 className="text-lg font-semibold text-ink mb-2 group-hover:text-accent transition-colors">
                {cat.label}
              </h3>
              <p className="text-sm text-muted/60 leading-relaxed line-clamp-2">
                {cat.description}
              </p>
              <span className="mt-6 inline-block text-xs font-medium text-accent uppercase tracking-widest">
                Baca lebih →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
