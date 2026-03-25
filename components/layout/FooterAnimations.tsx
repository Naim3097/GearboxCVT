'use client'

import { useEffect } from 'react'

// Footer column stagger animation — MOTION.md pattern #20

export default function FooterAnimations() {
  useEffect(() => {
    async function init() {
      const { gsap }         = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.utils.toArray<HTMLElement>('.f-col').forEach((col, i) => {
        gsap.from(col, {
          y: 30,
          opacity: 0,
          duration: 0.667,
          delay: i * 0.08,
          ease: 'customEaseOut',
          scrollTrigger: {
            trigger: '.footer-cols',
            start: 'top 90%',
          },
        })
      })
    }
    init()
  }, [])

  return null
}
