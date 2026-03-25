'use client'

import { useEffect, useRef } from 'react'

// MOTION.md pattern #19 — animated number counters
// MOTION.md pattern #10 — marquee with velocity skew

const STATS = [
  { value: 85,   suffix: '+', label: 'Artikel Panduan' },
  { value: 5,    suffix: '',  label: 'Kategori Topik' },
  { value: 100,  suffix: '%', label: 'Bebas Iklan' },
]

const MARQUEE_ITEMS = [
  'GEARBOX REPAIR',
  'CVT',
  'TRANSMISI AUTOMATIK',
  'PENYELENGGARAAN',
  'PANDUAN BELI',
  'MALAYSIA',
]

export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function init() {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Animated counters
      sectionRef.current?.querySelectorAll<HTMLElement>('.stat-num').forEach(el => {
        const val = parseInt(el.dataset.val ?? '0')
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to({ v: 0 }, {
              v: val,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function () {
                el.textContent = Math.round(this.targets()[0].v).toString()
              },
            })
          },
        })
      })

      // Marquee velocity skew
      let skew = 0
      ScrollTrigger.create({
        onUpdate: self => {
          const velocity = self.getVelocity()
          const target   = gsap.utils.clamp(-5, 5, velocity / 300)
          skew += (target - skew) * 0.1
          const el = marqueeRef.current
          if (el) gsap.set(el, { skewX: skew })
        },
      })
    }

    init()
  }, [])

  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <>
      {/* Stats row */}
      <section
        ref={sectionRef}
        className="bg-ink section-pad"
        aria-label="Statistik laman"
      >
        <div className="site-container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-white/10">
            {STATS.map(stat => (
              <div key={stat.label} className="text-center sm:px-8">
                <p className="text-white text-display-lg font-light mb-1">
                  <span
                    className="stat-num"
                    data-val={stat.value}
                    aria-label={`${stat.value}${stat.suffix}`}
                  >
                    0
                  </span>
                  {stat.suffix}
                </p>
                <p className="text-white/40 text-sm uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="marquee-strip bg-ink py-4" aria-hidden="true">
        <div ref={marqueeRef} className="marquee-track">
          {items.map((item, i) => (
            <span key={i} className="mx-8 text-xs font-medium text-white/30 uppercase tracking-[0.25em]">
              {item}
              {i < items.length - 1 && <i className="mx-8 not-italic text-accent">◆</i>}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
