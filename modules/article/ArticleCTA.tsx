import Link from 'next/link'

// Soft CTA at article bottom — drives readers to /contact/ without revealing the business.

export default function ArticleCTA() {
  return (
    <section className="section-pad bg-subtle" aria-label="Tindakan seterusnya">
      <div className="site-container">
        <div className="max-w-xl">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Perlu Bantuan?
          </p>
          <h2 className="text-display-md font-light text-ink mb-4 leading-snug">
            Ada masalah dengan gearbox kereta anda?
          </h2>
          <p className="text-muted/70 text-base leading-relaxed mb-8">
            Artikel ini adalah panduan umum. Untuk diagnosis tepat dan kos pembaikan, hubungi pakar gearbox berdekatan anda.
          </p>
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded transition-colors"
          >
            Tanya Pakar Sekarang
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
