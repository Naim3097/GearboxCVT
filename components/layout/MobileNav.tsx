'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'
import { getLenis } from '@/providers/SmoothScrollProvider'

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  function toggle() {
    const next = !open
    setOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
    const l = getLenis()
    next ? l?.stop() : l?.start()
  }

  function close() {
    setOpen(false)
    document.body.style.overflow = ''
    getLenis()?.start()
  }

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={toggle}
        className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 z-[1001] relative"
        aria-label={open ? 'Tutup menu' : 'Buka menu'}
        aria-expanded={open}
      >
        <span className={`block w-6 h-px bg-white transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
        <span className={`block w-6 h-px bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-px bg-white transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
      </button>

      {/* Mobile nav overlay */}
      <div className={`mobile-nav ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu navigasi">
        <div className="mobile-nav-links flex flex-col items-center gap-5 text-center">

          {/* Primary CTA */}
          <Link
            href="/contact/"
            onClick={close}
            className="px-8 py-3 bg-accent hover:bg-accent-hover text-white text-lg font-medium rounded transition-colors"
          >
            Hubungi Kami
          </Link>

          {/* Divider */}
          <span className="block w-8 h-px bg-white/10 my-2" aria-hidden="true" />

          {/* Categories as secondary links */}
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}/`}
              onClick={close}
              className="text-base font-light text-white/50 hover:text-white/90 transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
