'use client'

import { useEffect } from 'react'

// Handles nav: scrolled (blur) + hidden (scroll direction) behaviour.
// Pure side-effect client component — renders nothing.

export default function NavScrollBehaviour() {
  useEffect(() => {
    const nav = document.getElementById('main-nav')
    if (!nav) return

    let lastY = 0

    async function init() {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      ScrollTrigger.create({
        onUpdate: () => {
          const y = window.scrollY
          nav!.classList.toggle('scrolled', y > 60)
          if (y > 400 && y > lastY) nav!.classList.add('hidden')
          else nav!.classList.remove('hidden')
          lastY = y
        },
      })
    }

    init()
  }, [])

  return null
}
