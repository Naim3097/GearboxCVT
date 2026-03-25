'use client'

import { useEffect, useRef } from 'react'

// Page loader — clip-path exit animation.
// Counter counts 0→100, progress bar fills, then clips upward.

export default function PageLoader() {
  const loaderRef   = useRef<HTMLDivElement>(null)
  const counterRef  = useRef<HTMLDivElement>(null)
  const barRef      = useRef<HTMLDivElement>(null)
  const hasRun      = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    async function run() {
      const { gsap } = await import('gsap')

      const loader  = loaderRef.current
      const counter = counterRef.current
      const bar     = barRef.current
      if (!loader || !counter || !bar) return

      const tl = gsap.timeline({
        onComplete: () => {
          loader.style.display = 'none'
        },
      })

      // Count 0 → 100
      tl.to({ v: 0 }, {
        v: 100,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: function () {
          counter.textContent = String(Math.round(this.targets()[0].v))
        },
      }, 0)

      // Fill progress bar
      tl.to(bar, {
        width: '100%',
        duration: 1.4,
        ease: 'power2.inOut',
      }, 0)

      // Clip upward exit
      tl.to(loader, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.9,
        ease: 'customEaseOut',
      }, 1.2)
    }

    run()
  }, [])

  return (
    <div ref={loaderRef} className="page-loader" aria-hidden="true">
      <div ref={counterRef} className="loader-counter">0</div>
      <div className="loader-bar-wrap">
        <div ref={barRef} className="loader-bar" />
      </div>
    </div>
  )
}
