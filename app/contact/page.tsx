import type { Metadata } from 'next'
import { buildSeoMeta } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import ContactHero   from '@/modules/contact/ContactHero'
import ContactDetails from '@/modules/contact/ContactDetails'
import ContactSchema  from '@/modules/contact/ContactSchema'

export const dynamic = 'force-static'

export const metadata: Metadata = buildSeoMeta({
  title: 'Hubungi Kami',
  description:
    'Pakar gearbox dan transmisi automatik di Shah Alam, Selangor. Hubungi One X Transmission untuk perundingan percuma.',
  path: '/contact/',
})

export default function ContactPage() {
  const breadcrumbLd = breadcrumbSchema([
    { name: 'Utama',         url: '/' },
    { name: 'Hubungi Kami',  url: '/contact/' },
  ])

  return (
    <>
      <ContactSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ContactHero />
      <ContactDetails />
    </>
  )
}
