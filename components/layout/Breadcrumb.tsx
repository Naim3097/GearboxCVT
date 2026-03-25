import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Laluan lokasi" className="flex items-center gap-2 text-sm text-white/50">
      <Link href="/" className="hover:text-white/80 transition-colors">Utama</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span aria-hidden="true" className="text-white/20">/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-white/80 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white/80" aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
