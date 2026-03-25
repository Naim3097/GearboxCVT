import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Halaman Tidak Dijumpai',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <section className="bg-ink text-white min-h-screen flex items-center justify-center">
      <div className="site-container text-center py-24">
        <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-6">
          404
        </p>
        <h1 className="text-display-xl font-light text-white mb-4 leading-tight">
          Halaman tidak<br />dijumpai
        </h1>
        <p className="text-white/50 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Halaman yang anda cari mungkin telah dipindahkan atau tidak wujud.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded transition-colors"
        >
          ← Kembali ke Laman Utama
        </Link>
      </div>
    </section>
  )
}
