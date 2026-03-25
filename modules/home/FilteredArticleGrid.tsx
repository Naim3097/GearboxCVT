'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import ArticleCard from '@/components/ui/ArticleCard'
import { CATEGORIES } from '@/lib/categories'
import type { Article } from '@/lib/mdx'

interface Props {
  articles: Article[]
}

const ALL = 'semua'

export default function FilteredArticleGrid({ articles }: Props) {
  const [activeFilter, setActiveFilter] = useState(ALL)
  const [searchQuery,  setSearchQuery]  = useState('')
  const [visible,      setVisible]      = useState(9)
  const gridRef = useRef<HTMLDivElement>(null)

  // ── Listen for search events from the nav SearchToggle ─────────────────────
  useEffect(() => {
    const handler = (e: Event) => {
      const query = (e as CustomEvent<string>).detail
      setSearchQuery(query)
      setActiveFilter(ALL)
      setVisible(9)
    }
    window.addEventListener('gcvt:search', handler)
    return () => window.removeEventListener('gcvt:search', handler)
  }, [])

  // ── Filtered + searched article list ──────────────────────────────────────
  const filtered = articles.filter(a => {
    const matchesCat = activeFilter === ALL || a.category === activeFilter
    if (!searchQuery) return matchesCat
    const q = searchQuery.toLowerCase()
    return matchesCat && (
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      (a.tags ?? []).some(t => t.toLowerCase().includes(q))
    )
  })

  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  // ── GSAP card stagger whenever the filtered list changes ──────────────────
  useEffect(() => {
    async function animate() {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const cards = gridRef.current?.querySelectorAll<HTMLElement>('.card')
      if (!cards?.length) return

      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          immediateRender: false,
          clearProps: 'transform,opacity',
        }
      )
    }
    animate()
  }, [activeFilter, searchQuery, visible])

  const handleFilter = useCallback((slug: string) => {
    setActiveFilter(slug)
    setSearchQuery('')
    setVisible(9)
  }, [])

  return (
    <section
      id="article-grid"
      className="section-pad bg-surface"
      aria-label="Senarai artikel"
    >
      <div className="site-container">

        {/* Section label */}
        <div className="mb-8">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-3">
            Artikel
          </p>
          <h2 className="text-display-md font-light text-ink leading-tight">
            Panduan untuk pemandu Malaysia
          </h2>
        </div>

        {/* Filter chips */}
        <div
          role="group"
          aria-label="Tapis mengikut kategori"
          className="flex flex-wrap gap-2 mb-10"
        >
          <FilterChip
            label="Semua"
            active={activeFilter === ALL}
            onClick={() => handleFilter(ALL)}
          />
          {CATEGORIES.map(cat => (
            <FilterChip
              key={cat.slug}
              label={cat.label}
              active={activeFilter === cat.slug}
              onClick={() => handleFilter(cat.slug)}
            />
          ))}
        </div>

        {/* Search query badge */}
        {searchQuery && (
          <div className="flex items-center gap-3 mb-6">
            <p className="text-sm text-muted/60">
              Hasil carian untuk <span className="text-ink font-medium">"{searchQuery}"</span>
              {' '}— {filtered.length} artikel
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-accent hover:underline underline-offset-2"
            >
              Padam carian
            </button>
          </div>
        )}

        {/* Grid */}
        {shown.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted/40 text-sm">Tiada artikel dijumpai.</p>
            <button
              onClick={() => { setActiveFilter(ALL); setSearchQuery('') }}
              className="mt-4 text-sm text-accent hover:underline underline-offset-2"
            >
              Lihat semua artikel
            </button>
          </div>
        ) : (
          <>
            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {shown.map((article, i) => (
                <ArticleCard
                  key={`${article.category}/${article.slug}`}
                  article={article}
                  index={i}
                />
              ))}
            </div>

            {/* Load more */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setVisible(v => v + 9)}
                  className="px-8 py-3 border border-border text-ink text-sm font-medium rounded hover:border-accent hover:text-accent transition-colors"
                >
                  Muat lebih banyak ({filtered.length - visible} lagi)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

// ── Filter Chip ───────────────────────────────────────────────────────────────
function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`
        px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
        ${active
          ? 'bg-ink text-white'
          : 'bg-subtle text-muted/60 hover:bg-border hover:text-ink'
        }
      `}
    >
      {label}
    </button>
  )
}
