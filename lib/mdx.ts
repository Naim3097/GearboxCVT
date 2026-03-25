import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { CategorySlug } from './categories'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'articles')

export interface ArticleFrontmatter {
  title: string
  description: string
  publishedAt: string
  modifiedAt?: string
  category: CategorySlug
  tags?: string[]
  ogImage?: string
  featured?: boolean
  draft?: boolean
}

export interface Article extends ArticleFrontmatter {
  slug: string
  readingTime: string
  content: string
}

// ─── READ SINGLE ARTICLE ─────────────────────────────────────────────────────
export async function getArticle(
  category: string,
  slug: string
): Promise<Article | null> {
  const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    ...(data as ArticleFrontmatter),
    slug,
    readingTime: `${Math.ceil(rt.minutes)} minit baca`,
    content,
  }
}

// ─── LIST ALL ARTICLES IN CATEGORY ───────────────────────────────────────────
export async function getArticlesByCategory(
  category: string
): Promise<Article[]> {
  const dir = path.join(CONTENT_DIR, category)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))

  const articles = await Promise.all(
    files.map(async file => {
      const slug = file.replace('.mdx', '')
      return getArticle(category, slug)
    })
  )

  return articles
    .filter((a): a is Article => a !== null && !a.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
}

// ─── LIST ALL ARTICLES (all categories) ──────────────────────────────────────
export async function getAllArticles(): Promise<Article[]> {
  if (!fs.existsSync(CONTENT_DIR)) return []
  const categories = fs.readdirSync(CONTENT_DIR)
  const all = await Promise.all(categories.map(getArticlesByCategory))
  return all.flat().sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

// ─── GET FEATURED ARTICLES ────────────────────────────────────────────────────
export async function getFeaturedArticles(limit = 6): Promise<Article[]> {
  const all = await getAllArticles()
  const featured = all.filter(a => a.featured)
  return featured.length >= limit ? featured.slice(0, limit) : all.slice(0, limit)
}

// ─── GENERATE STATIC PARAMS ───────────────────────────────────────────────────
export async function generateAllArticleParams() {
  if (!fs.existsSync(CONTENT_DIR)) return []
  const categories = fs.readdirSync(CONTENT_DIR)
  const params: { category: string; slug: string }[] = []

  for (const category of categories) {
    const dir = path.join(CONTENT_DIR, category)
    if (!fs.statSync(dir).isDirectory()) continue
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
    files.forEach(f => params.push({ category, slug: f.replace('.mdx', '') }))
  }
  return params
}
