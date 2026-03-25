import Breadcrumb from '@/components/layout/Breadcrumb'

export default function ContactHero() {
  return (
    <section className="bg-ink text-white pt-32 pb-16" aria-label="Kepala halaman hubungi kami">
      <div className="site-container">
        <Breadcrumb items={[{ label: 'Hubungi Kami' }]} />
        <div className="mt-8 max-w-xl">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Pakar Gearbox
          </p>
          <h1 className="text-display-lg font-light leading-tight mb-4">
            One X Transmission
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Bengkel pakar gearbox dan transmisi automatik di Shah Alam, Selangor.
            Hubungi kami untuk perundingan percuma.
          </p>
        </div>
      </div>
    </section>
  )
}
