import { notFound } from 'next/navigation'
import { isValidCategory, CATEGORY_MAP } from '@/lib/categories'
import { getArticle, getArticlesByCategory, generateAllArticleParams } from '@/lib/mdx'
import { buildArticleMeta } from '@/lib/seo'
import { articleSchema, breadcrumbSchema } from '@/lib/schema'
import ArticleHero      from '@/modules/article/ArticleHero'
import ArticleBody      from '@/modules/article/ArticleBody'
import RelatedArticles  from '@/modules/article/RelatedArticles'
import ArticleCTA       from '@/modules/article/ArticleCTA'
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return generateAllArticleParams()
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string }
}): Promise<Metadata> {
  const article = await getArticle(params.category, params.slug)
  if (!article) return {}
  return buildArticleMeta({
    title: article.title,
    description: article.description,
    path: `/${params.category}/${params.slug}/`,
    publishedAt: article.publishedAt,
    modifiedAt: article.modifiedAt,
    ogImage: article.ogImage,
  })
}

export default async function ArticlePage({
  params,
}: {
  params: { category: string; slug: string }
}) {
  if (!isValidCategory(params.category)) notFound()

  const article = await getArticle(params.category, params.slug)
  if (!article) notFound()

  const cat = CATEGORY_MAP[params.category]

  // Related: same category, exclude current, max 3
  const allInCategory = await getArticlesByCategory(params.category)
  const related = allInCategory.filter(a => a.slug !== params.slug).slice(0, 3)

  const articleLd = articleSchema({
    title: article.title,
    description: article.description,
    url: `/${params.category}/${params.slug}/`,
    publishedAt: article.publishedAt,
    modifiedAt: article.modifiedAt,
    imageUrl: article.ogImage,
  })

  const breadcrumbLd = breadcrumbSchema([
    { name: 'Utama',    url: '/' },
    { name: cat.label,  url: `/${cat.slug}/` },
    { name: article.title, url: `/${params.category}/${params.slug}/` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ArticleHero article={article} category={cat} />
      <ArticleBody content={article.content} />
      <RelatedArticles articles={related} />
      <ArticleCTA />
    </>
  )
}
