import Link from 'next/link'
import MobileNav from './MobileNav'
import NavScrollBehaviour from './NavScrollBehaviour'
import SearchToggle from './SearchToggle'

export default function Header() {
  return (
    <>
      <NavScrollBehaviour />

      <header className="nav" id="main-nav" role="banner">
        <div className="site-container flex h-16 items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="text-white font-bold text-xl tracking-tight no-underline"
            aria-label="GearboxCVT — Laman Utama"
          >
            GearboxCVT
          </Link>

          {/* Desktop right side — search + single CTA */}
          <div className="hidden md:flex items-center gap-5">
            <SearchToggle />
            <Link
              href="/contact/"
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile hamburger */}
          <MobileNav />
        </div>
      </header>
    </>
  )
}
