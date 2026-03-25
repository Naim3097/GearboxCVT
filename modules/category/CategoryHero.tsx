import Breadcrumb from '@/components/layout/Breadcrumb'
import type { Category } from '@/lib/categories'
import { getCategoryImage } from '@/lib/images'

export default function CategoryHero({ category }: { category: Category }) {
  const imgSrc = getCategoryImage(category.slug)

  return (
    <section
      className="relative overflow-hidden bg-ink text-white pt-32 pb-16"
      aria-label={`Kepala kategori ${category.label}`}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-15"
        style={{ backgroundImage: `url(${imgSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        aria-hidden="true"
      />
      <div className="site-container">
        <Breadcrumb items={[{ label: category.label }]} />
        <div className="mt-8 max-w-2xl">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Kategori
          </p>
          <h1 className="text-display-lg font-light leading-tight mb-4">
            {category.label}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>
    </section>
  )
}
