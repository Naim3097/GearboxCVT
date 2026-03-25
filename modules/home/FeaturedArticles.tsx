'use client'

import { useEffect, useRef } from 'react'
import ArticleCard from '@/components/ui/ArticleCard'
import type { Article } from '@/lib/mdx'

interface Props {
  articles: Article[]
}

export default function FeaturedArticles({ articles }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    async function init() {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      if (!section) return

      // Heading reveal
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

      // Card stagger
      gsap.utils.toArray<HTMLElement>('.card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.667,
            delay: i * 0.1,
            ease: 'customEaseOut',
            immediateRender: false,
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        )
      })
    }

    init()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-pad bg-surface"
      aria-labelledby="featured-heading"
    >
      <div className="site-container">
        <div className="mb-12">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-3">
            Artikel Pilihan
          </p>
          <h2
            id="featured-heading"
            data-split="true"
            className="text-display-md font-light text-ink"
          >
            Panduan terbaru untuk anda
          </h2>
        </div>

        {articles.length === 0 ? (
          <p className="text-muted/50 text-sm">Tiada artikel buat masa ini.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article, i) => (
              <ArticleCard key={`${article.category}/${article.slug}`} article={article} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
