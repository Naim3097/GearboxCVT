import Breadcrumb from '@/components/layout/Breadcrumb'
import type { Article } from '@/lib/mdx'
import type { Category } from '@/lib/categories'

interface Props {
  article: Article
  category: Category
}

export default function ArticleHero({ article, category }: Props) {
  return (
    <section
      className="bg-ink text-white pt-32 pb-16"
      aria-label="Kepala artikel"
    >
      <div className="site-container">
        <Breadcrumb
          items={[
            { label: category.label, href: `/${category.slug}/` },
            { label: article.title },
          ]}
        />
        <div className="mt-8 max-w-prose">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-4">
            {category.label}
          </p>
          <h1 className="text-display-md font-light leading-tight mb-5 text-white">
            {article.title}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-6">
            {article.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('ms-MY', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
