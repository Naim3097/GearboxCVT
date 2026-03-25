import { notFound } from 'next/navigation'
import { CATEGORIES, isValidCategory } from '@/lib/categories'
import { getArticlesByCategory } from '@/lib/mdx'
import { buildSeoMeta } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import CategoryHero from '@/modules/category/CategoryHero'
import ArticleGrid  from '@/modules/category/ArticleGrid'
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return CATEGORIES.map(c => ({ category: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  if (!isValidCategory(params.category)) return {}
  const cat = CATEGORIES.find(c => c.slug === params.category)!
  return buildSeoMeta({
    title: cat.label,
    description: cat.description,
    path: `/${cat.slug}/`,
  })
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  if (!isValidCategory(params.category)) notFound()

  const cat      = CATEGORIES.find(c => c.slug === params.category)!
  const articles = await getArticlesByCategory(params.category)

  const schema = breadcrumbSchema([
    { name: 'Utama',   url: '/' },
    { name: cat.label, url: `/${cat.slug}/` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CategoryHero category={cat} />
      <ArticleGrid  category={cat} articles={articles} />
    </>
  )
}
