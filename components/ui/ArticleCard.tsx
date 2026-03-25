import Link from 'next/link'
import type { Article } from '@/lib/mdx'
import { CATEGORY_MAP } from '@/lib/categories'
import { getArticleImage } from '@/lib/images'

interface Props {
  article: Article
  index?: number
}

export default function ArticleCard({ article, index = 0 }: Props) {
  const cat = CATEGORY_MAP[article.category]
  const href = `/${article.category}/${article.slug}/`

  const imgSrc = getArticleImage(article.category, article.slug)

  return (
    <article
      className="card bg-surface border border-border group"
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <Link href={href} className="block h-full no-underline">
        {/* Cover image */}
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={imgSrc}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
        {/* Category badge */}
        <span className="inline-block text-xs font-medium uppercase tracking-widest text-accent mb-3">
          {cat?.label ?? article.category}
        </span>

        {/* Title */}
        <h3 className="text-base font-semibold text-ink leading-snug mb-3 group-hover:text-accent transition-colors line-clamp-3">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted/70 leading-relaxed line-clamp-2 mb-4">
          {article.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted/40 mt-auto">
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
      </Link>
    </article>
  )
}
