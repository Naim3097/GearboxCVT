import type { Metadata } from 'next'

const SITE_URL = 'https://gearboxcvt.com'
const SITE_NAME = 'GearboxCVT'
const DEFAULT_DESCRIPTION =
  'Portal rujukan gearbox dan transmisi automatik untuk pemandu Malaysia. Panduan pembaikan, CVT, penyelenggaraan, dan lebih lagi.'

// ─── BASE METADATA ────────────────────────────────────────────────────────────
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Rujukan Gearbox Malaysia`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'ms_MY',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

// ─── BUILD PAGE METADATA ─────────────────────────────────────────────────────
export function buildSeoMeta({
  title,
  description,
  path,
  ogImage,
}: {
  title: string
  description: string
  path: string
  ogImage?: string
}): Metadata {
  const url = `${SITE_URL}${path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

// ─── BUILD ARTICLE METADATA ───────────────────────────────────────────────────
export function buildArticleMeta({
  title,
  description,
  path,
  publishedAt,
  modifiedAt,
  ogImage,
}: {
  title: string
  description: string
  path: string
  publishedAt?: string
  modifiedAt?: string
  ogImage?: string
}): Metadata {
  const url = `${SITE_URL}${path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

export { SITE_URL, SITE_NAME }
