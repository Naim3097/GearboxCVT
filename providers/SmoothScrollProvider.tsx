'use client'

// NOTE: Lenis is intentionally NOT imported at the top level.
// Next.js SSRs 'use client' components — a top-level lenis import would run in
// Node.js where Lenis touches browser globals (window/document) and crash.
// Dynamic import inside useEffect is the correct pattern.
import type { default as LenisType } from 'lenis'
import { useEffect } from 'react'

let lenis: LenisType | null = null

export function getLenis() {
  return lenis
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    let tickerFn: ((time: number) => void) | null = null

    async function init() {
      const { default: Lenis }  = await import('lenis')
      const { gsap }            = await import('gsap')
      const { ScrollTrigger }   = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      lenis.on('scroll', ScrollTrigger.update)

      // Single update path: GSAP ticker drives Lenis (no separate rAF loop)
      tickerFn = (time: number) => lenis!.raf(time * 1000)
      gsap.ticker.add(tickerFn)
      gsap.ticker.lagSmoothing(0)
    }

    init()

    return () => {
      if (tickerFn) {
        import('gsap').then(({ gsap }) => gsap.ticker.remove(tickerFn!))
      }
      lenis?.destroy()
      lenis = null
    }
  }, [])

  return <>{children}</>
}
