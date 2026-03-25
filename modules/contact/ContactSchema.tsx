// LocalBusiness schema — contact page ONLY.
// This is the single place the business identity is revealed.

import { localBusinessSchema } from '@/lib/schema'

export default function ContactSchema() {
  const schema = localBusinessSchema()
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
