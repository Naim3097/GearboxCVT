'use client'

import { useEffect, useRef } from 'react'
import ArticleCard from '@/components/ui/ArticleCard'
import type { Article } from '@/lib/mdx'

interface Props {
  articles: Article[]   // pre-filtered: same category, excluding current article, max 3
}

export default function RelatedArticles({ articles }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    async function init() {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      if (!section) return

      gsap.utils.toArray<HTMLElement>('.card', section).forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.667,
            delay: i * 0.1,
            ease: 'customEaseOut',
            immediateRender: false,
            scrollTrigger: { trigger: card, start: 'top 90%' },
          }
        )
      })
    }
    init()
  }, [])

  if (articles.length === 0) return null

  return (
    <section
      ref={sectionRef}
      className="section-pad bg-subtle"
      aria-labelledby="related-heading"
    >
      <div className="site-container">
        <div className="mb-8">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-2">
            Baca Seterusnya
          </p>
          <h2
            id="related-heading"
            className="text-display-md font-light text-ink leading-tight"
          >
            Artikel berkaitan
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, i) => (
            <ArticleCard
              key={`${article.category}/${article.slug}`}
              article={article}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
