import { MetadataRoute } from 'next'
import { CATEGORIES } from '@/lib/categories'
import { getAllArticles } from '@/lib/mdx'

const SITE_URL = 'https://gearboxcvt.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map(cat => ({
    url: `${SITE_URL}/${cat.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const articlePages: MetadataRoute.Sitemap = articles.map(article => ({
    url: `${SITE_URL}/${article.category}/${article.slug}/`,
    lastModified: article.modifiedAt
      ? new Date(article.modifiedAt)
      : new Date(article.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: article.featured ? 0.9 : 0.7,
  }))

  return [...staticPages, ...categoryPages, ...articlePages]
}
