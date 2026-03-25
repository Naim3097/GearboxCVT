'use client'

import { useEffect } from 'react'

// Custom cursor (desktop only) + GSAP custom easing registration.
// Loaded once at root level.
//
// NOTE: gsap/CustomEase is Club GSAP (premium). We register equivalent
// cubic-bezier easings using gsap.registerEase() which is free.

/** Resolve cubic-bezier(x1,y1,x2,y2) → GSAP easing function */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  return (t: number): number => {
    let u = t
    for (let i = 0; i < 6; i++) {
      const cu = 1 - u
      const bx = 3 * cu * cu * u * x1 + 3 * cu * u * u * x2 + u * u * u
      const dx = 3 * cu * cu * x1 + 6 * cu * u * (x2 - x1) + 3 * u * u * (1 - x2)
      u -= (bx - t) / (dx || 1)
    }
    const cu = 1 - u
    return 3 * cu * cu * u * y1 + 3 * cu * u * u * y2 + u * u * u
  }
}

export default function AnimationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    async function init() {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.registerEase('customEaseOut',   cubicBezier(0,   0.4, 0,   1  ))
      gsap.registerEase('customEaseIn',    cubicBezier(1,   0,   1,   0.6))
      gsap.registerEase('customEaseInOut', cubicBezier(0.2, 0,   0,   1  ))
    }

    init()
  }, [])

  return <>{children}</>
}
