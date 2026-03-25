'use client'

import { useEffect, useRef } from 'react'
import ArticleCard from '@/components/ui/ArticleCard'
import type { Article } from '@/lib/mdx'
import type { Category } from '@/lib/categories'

interface Props {
  category: Category
  articles: Article[]
}

export default function ArticleGrid({ category, articles }: Props) {
  const gridRef = useRef<HTMLElement>(null)

  useEffect(() => {
    async function init() {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.utils.toArray<HTMLElement>('.card').forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.667,
          delay: i * 0.08,
          ease: 'customEaseOut',
          scrollTrigger: { trigger: card, start: 'top 90%' },
        })
      })
    }
    init()
  }, [])

  return (
    <section
      ref={gridRef}
      className="section-pad bg-surface"
      aria-labelledby="cat-articles-heading"
    >
      <div className="site-container">
        <h2 id="cat-articles-heading" className="sr-only">
          Semua artikel — {category.label}
        </h2>
        {articles.length === 0 ? (
          <p className="text-muted/50 text-sm">Tiada artikel buat masa ini.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article, i) => (
              <ArticleCard
                key={`${article.category}/${article.slug}`}
                article={article}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
