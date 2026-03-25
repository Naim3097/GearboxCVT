// ─── CATEGORY DEFINITIONS ────────────────────────────────────────────────────
// Single source of truth for all 5 topic categories.
// Used by nav, category pages, article frontmatter, breadcrumbs, sitemap.
// ─────────────────────────────────────────────────────────────────────────────

export type CategorySlug =
  | 'gearbox-repair'
  | 'cvt'
  | 'automatic-transmission'
  | 'maintenance'
  | 'buying-guide'

export interface Category {
  slug: CategorySlug
  /** Display label in Bahasa Malaysia */
  label: string
  /** Short description for category page meta / hero */
  description: string
  /** Used for og:image fallback and placeholder */
  color: string
}

export const CATEGORIES: Category[] = [
  {
    slug: 'gearbox-repair',
    label: 'Pembaikan Gearbox',
    description: 'Panduan lengkap mengenai diagnosis, pembaikan, dan kos overhaul gearbox kereta di Malaysia.',
    color: '#AB2020',
  },
  {
    slug: 'cvt',
    label: 'CVT',
    description: 'Semua yang perlu anda tahu tentang transmisi CVT — masalah biasa, penyelenggaraan, dan jangka hayat.',
    color: '#1A1A1A',
  },
  {
    slug: 'automatic-transmission',
    label: 'Transmisi Automatik',
    description: 'Perbezaan jenis transmisi, cara kerja, dan tips menjaga gearbox automatik anda.',
    color: '#333333',
  },
  {
    slug: 'maintenance',
    label: 'Penyelenggaraan',
    description: 'Jadual servis gearbox, tukar minyak, dan amalan terbaik untuk jangka hayat maksimum.',
    color: '#444444',
  },
  {
    slug: 'buying-guide',
    label: 'Panduan Beli',
    description: 'Cara semak gearbox kereta second-hand dan tips penting sebelum membeli.',
    color: '#555555',
  },
]

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map(c => [c.slug, c])
) as Record<CategorySlug, Category>

export function isValidCategory(slug: string): slug is CategorySlug {
  return slug in CATEGORY_MAP
}
