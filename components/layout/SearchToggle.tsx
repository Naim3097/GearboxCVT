'use client'

import { useEffect, useRef, useState } from 'react'

// Search icon that scrolls to + focuses the filter grid on the homepage,
// or opens a simple inline search overlay on article/category pages.

export default function SearchToggle() {
  const [open, setOpen]     = useState(false)
  const [query, setQuery]   = useState('')
  const inputRef            = useRef<HTMLInputElement>(null)

  // Focus input when overlay opens
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); setQuery('') }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    // Scroll to article grid and let FilteredArticleGrid handle the query via URL hash
    const grid = document.getElementById('article-grid')
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Emit custom event for FilteredArticleGrid to pick up
      window.dispatchEvent(new CustomEvent('gcvt:search', { detail: query.trim() }))
    }
    setOpen(false)
    setQuery('')
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center w-9 h-9 text-white/60 hover:text-white transition-colors"
        aria-label={open ? 'Tutup carian' : 'Cari artikel'}
        aria-expanded={open}
      >
        {open ? (
          // X icon
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        ) : (
          // Search icon
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        )}
      </button>

      {open && (
        <form
          onSubmit={handleSubmit}
          className="absolute right-0 top-12 w-72 bg-muted/95 backdrop-blur-md border border-white/10 rounded-lg px-4 py-3 flex items-center gap-3 shadow-2xl"
          role="search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white/30 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cari artikel..."
            className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
            aria-label="Cari artikel"
          />
          <kbd className="hidden sm:inline text-[10px] text-white/20 border border-white/10 rounded px-1.5 py-0.5">ESC</kbd>
        </form>
      )}
    </div>
  )
}
