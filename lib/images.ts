/**
 * lib/images.ts
 * Deterministic Unsplash image URLs for articles and the site hero.
 * Uses the Unsplash Source API (no auth required).
 * Images are categorised by topic for thematic relevance.
 */

import type { CategorySlug } from './categories'

// Curated Unsplash photo IDs for each category
const CATEGORY_PHOTOS: Record<CategorySlug, string[]> = {
  'gearbox-repair': [
    'bBiuSdck8CI', // mechanic under car
    'jLwVAUtLOAQ', // car engine detail
    'pjlkqQGmKZs', // tools on bench
    'SIlSqgQmVmI', // workshop interior
    '5Hl5reICevY', // car in workshop
    'TrhLCn1abMU', // wrench on engine
  ],
  'cvt': [
    'qZ-U4P8NQ7c', // car transmission close-up
    '9UqBRiL8z7A', // gearbox parts
    'G9ZmJbPHmw8', // automotive machinery
    'V4YP0-Yg_mE', // car mechanics
    'mfB1B1s4rFV', // engine bay
    'HtUBBdNDxpQ', // car interior dashboard
  ],
  'automatic-transmission': [
    'VpB9JxMSzT0', // car gear lever
    'OhlGJmiYq4I', // car cockpit
    'pHANt-BEzGE', // driving perspective
    'G9ZmJbPHmw8', // automotive parts
    'nTiy36QJSIM', // car interior
    'NhkoKAvCqnQ', // road and car
  ],
  'maintenance': [
    'pElSkGRA2NU', // oil change
    'lCNb5MYa2OQ', // car maintenance
    'xbEVM6oJ1Fs', // hands with tools
    'XMFZqrGyV-Q', // checking under hood
    'HtUBBdNDxpQ', // car dashboard
    'NhkoKAvCqnQ', // car on road
  ],
  'buying-guide': [
    'ZRns3R5aqAw', // car showroom
    'ITjiVXs6OoI', // new car
    'GXXYkSwndP4', // car keys
    '1_CMoFsNs4g', // car lot
    'OhlGJmiYq4I', // car interior
    'VpB9JxMSzT0', // steering wheel
  ],
}

// Hero section — high quality automotive wide shot
export const HERO_IMAGE =
  'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=1800&q=80&auto=format&fit=crop'

/**
 * Returns a deterministic Unsplash image URL for an article.
 * Uses the slug to pick consistently from the category pool.
 */
export function getArticleImage(
  category: CategorySlug,
  slug: string,
  width = 800,
  quality = 75
): string {
  const pool = CATEGORY_PHOTOS[category] ?? CATEGORY_PHOTOS['gearbox-repair']
  // Simple hash of slug to pick from pool deterministically
  let hash = 0
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  const id = pool[hash % pool.length]
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=${quality}&auto=format&fit=crop`
}

/**
 * Returns a category-level cover image URL.
 */
export function getCategoryImage(category: CategorySlug, width = 1200): string {
  const pool = CATEGORY_PHOTOS[category] ?? CATEGORY_PHOTOS['gearbox-repair']
  return `https://images.unsplash.com/photo-${pool[0]}?w=${width}&q=80&auto=format&fit=crop`
}
