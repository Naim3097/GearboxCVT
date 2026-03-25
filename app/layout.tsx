import type { Metadata } from 'next'
import './globals.css'
import { baseMetadata } from '@/lib/seo'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageLoader from '@/components/ui/PageLoader'
import SmoothScrollProvider from '@/providers/SmoothScrollProvider'
import AnimationProvider from '@/providers/AnimationProvider'

export const metadata: Metadata = baseMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ms">
      <body suppressHydrationWarning>
        <PageLoader />
        <SmoothScrollProvider>
          <AnimationProvider>
            <Header />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </AnimationProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
