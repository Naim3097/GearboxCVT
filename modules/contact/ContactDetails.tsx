// Contact info + WhatsApp CTA.
// No HTML form — WhatsApp and phone are the primary contact methods.

const WHATSAPP = 'https://wa.me/601131051677'
const PHONE    = 'tel:+601131051677'
const ADDRESS  = 'GF LOT 184107, Jalan Haji Taib, Batu 7 1/2, Jln Kebun Tambahan, 40460 Shah Alam, Selangor'
const MAPS_URL = 'https://maps.google.com/?q=One+X+Transmission+Shah+Alam'

const HOURS = [
  'Isnin – Sabtu: 8:00 pagi – 6:00 petang',
  'Ahad: Tutup',
]

export default function ContactDetails() {
  return (
    <section className="section-pad bg-surface" aria-label="Maklumat hubungi">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact info */}
          <div>
            <h2 className="text-display-md font-light text-ink mb-8 leading-snug">
              Hubungi kami hari ini
            </h2>

            <dl className="space-y-6">
              <div>
                <dt className="text-xs font-medium uppercase tracking-widest text-accent mb-1">Telefon / WhatsApp</dt>
                <dd>
                  <a
                    href={PHONE}
                    className="text-lg font-medium text-ink hover:text-accent transition-colors"
                  >
                    011-3105 1677
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs font-medium uppercase tracking-widest text-accent mb-1">Alamat</dt>
                <dd>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-muted/80 hover:text-accent transition-colors leading-relaxed"
                  >
                    {ADDRESS}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs font-medium uppercase tracking-widest text-accent mb-1">Waktu Operasi</dt>
                <dd>
                  <ul className="text-base text-muted/80 space-y-1">
                    {HOURS.map(h => <li key={h}>{h}</li>)}
                  </ul>
                </dd>
              </div>
            </dl>

            {/* WhatsApp CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-medium rounded transition-colors text-sm"
              >
                {/* WhatsApp icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.12 1.528 5.845L0 24l6.341-1.513A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 0 1-5.002-1.371l-.357-.213-3.766.898.935-3.655-.233-.375A9.8 9.8 0 0 1 2.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
                </svg>
                WhatsApp Sekarang
              </a>
              <a
                href={PHONE}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-accent text-accent hover:bg-accent hover:text-white font-medium rounded transition-colors text-sm"
              >
                Telefon Terus
              </a>
            </div>
          </div>

          {/* Map embed placeholder */}
          <div className="rounded-lg overflow-hidden bg-subtle aspect-video lg:aspect-auto lg:min-h-[400px] flex items-center justify-center">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted/50 hover:text-accent transition-colors text-center px-4"
            >
              <span className="block text-sm font-medium text-white/50 mb-2">Lokasi</span>
              GF LOT 184107, Shah Alam<br />
              <span className="underline underline-offset-2">Buka dalam Google Maps →</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
