// ─── JSON-LD SCHEMA BUILDERS ──────────────────────────────────────────────────
// LocalBusiness schema ONLY used on /contact/.
// All other pages use Article or BreadcrumbList.
// ─────────────────────────────────────────────────────────────────────────────

const SITE_URL = 'https://gearboxcvt.com'

// ─── ARTICLE SCHEMA ───────────────────────────────────────────────────────────
export function articleSchema({
  title,
  description,
  url,
  publishedAt,
  modifiedAt,
  imageUrl,
}: {
  title: string
  description: string
  url: string
  publishedAt?: string
  modifiedAt?: string
  imageUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE_URL}${url}`,
    ...(publishedAt && { datePublished: publishedAt }),
    ...(modifiedAt  && { dateModified: modifiedAt }),
    ...(imageUrl && {
      image: { '@type': 'ImageObject', url: imageUrl },
    }),
    publisher: {
      '@type': 'Organization',
      name: 'GearboxCVT',
      url: SITE_URL,
    },
    inLanguage: 'ms',
  }
}

// ─── BREADCRUMB SCHEMA ────────────────────────────────────────────────────────
export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

// ─── FAQ SCHEMA ───────────────────────────────────────────────────────────────
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

// ─── LOCAL BUSINESS — contact page only ──────────────────────────────────────
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    name: 'One X Transmission',
    url: 'https://gearboxcvt.com/contact/',
    telephone: '+601131051677',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'GF LOT 184107, Jalan Haji Taib, Batu 7 1/2, Jln Kebun Tambahan',
      addressLocality: 'Shah Alam',
      addressRegion: 'Selangor',
      postalCode: '40460',
      addressCountry: 'MY',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 3.0738,
      longitude: 101.5183,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+601131051677',
      contactType: 'customer service',
      availableLanguage: ['Malay', 'English'],
    },
    sameAs: [
      'https://www.facebook.com/onextransmission',
      'https://www.instagram.com/onextransmission',
      'https://www.tiktok.com/@onextransmission',
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 3.0738,
        longitude: 101.5183,
      },
      geoRadius: '50000',
    },
    priceRange: '$$',
  }
}
