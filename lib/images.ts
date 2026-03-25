/**
 * lib/images.ts
 * Deterministic image URLs for articles and the site hero.
 * Uses picsum.photos with a seed string — always reliable, no auth needed.
 * Seed = category + slug → same image every build.
 */

import type { CategorySlug } from './categories'

// Hero section — real verified Unsplash automotive photo
export const HERO_IMAGE =
  'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1800&q=80&auto=format&fit=crop'

/**
 * Returns a deterministic image URL for an article card/hero.
 * picsum.photos/seed/{seed}/{w}/{h} always returns a real photo.
 */
export function getArticleImage(
  category: CategorySlug,
  slug: string,
  width = 800,
  quality = 75
): string {
  const seed = `${category}-${slug}`
  const height = Math.round(width * 9 / 16)
  return `https://picsum.photos/seed/${seed}/${width}/${height}`
}

/**
 * Returns a category-level cover image URL.
 */
export function getCategoryImage(category: CategorySlug, width = 1200): string {
  const height = Math.round(width * 9 / 16)
  return `https://picsum.photos/seed/${category}/${width}/${height}`
}
