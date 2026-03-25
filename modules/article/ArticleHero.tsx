import Breadcrumb from '@/components/layout/Breadcrumb'
import type { Article } from '@/lib/mdx'
import type { Category } from '@/lib/categories'
import { getArticleImage } from '@/lib/images'

interface Props {
  article: Article
  category: Category
}

export default function ArticleHero({ article, category }: Props) {
  const imgSrc = article.ogImage || getArticleImage(article.category, article.slug, 1200, 80)

  return (
    <section
      className="bg-ink text-white pt-32"
      aria-label="Kepala artikel"
    >
      <div className="site-container pb-12">
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

      {/* Cover image */}
      <div className="aspect-[21/9] max-h-[480px] overflow-hidden">
        <img
          src={imgSrc}
          alt={article.title}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  )
}
