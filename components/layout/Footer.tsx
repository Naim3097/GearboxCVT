import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'
import FooterAnimations from './FooterAnimations'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-white/70 section-pad mt-auto" role="contentinfo">
      <FooterAnimations />
      <div className="site-container">
        <div className="footer-cols mb-12">
          {/* Brand column */}
          <div className="f-col">
            <p className="text-white font-bold text-lg mb-3 tracking-tight">GearboxCVT</p>
            <p className="text-sm leading-relaxed text-white/50">
              Portal rujukan gearbox &amp; transmisi automatik untuk pemandu Malaysia.
            </p>
          </div>

          {/* Topic categories */}
          <div className="f-col">
            <p className="text-white text-xs font-medium uppercase tracking-widest mb-4">
              Topik
            </p>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map(cat => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}/`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="f-col">
            <p className="text-white text-xs font-medium uppercase tracking-widest mb-4">
              Laman
            </p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/"          className="hover:text-white transition-colors">Utama</Link></li>
              <li><Link href="/contact/"  className="hover:text-white transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-white/30">
          <p>&copy; {year} GearboxCVT. Hak cipta terpelihara.</p>
          <p>Maklumat dalam laman ini adalah untuk rujukan sahaja.</p>
        </div>
      </div>
    </footer>
  )
}
