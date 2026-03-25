// ─── REDIRECT MAP ────────────────────────────────────────────────────────────
// All 85 WordPress posts were flat `/slug/`.
// New structure is `/[category]/[slug]/`.
// Priority column = GSC click rank (populate once GSC data is received).
//
// Format: { source: '/old-slug/', destination: '/category/new-slug/', permanent: true }
// ─────────────────────────────────────────────────────────────────────────────

export const redirects = [
  // ── CVT ──────────────────────────────────────────────────────────────────
  {
    source: '/panduan-pilih-minyak-gearbox-cvt-mengikut-spesifikasi-kereta/',
    destination: '/cvt/panduan-pilih-minyak-gearbox-cvt-mengikut-spesifikasi-kereta/',
    permanent: true,
  },
  {
    source: '/masalah-gearbox-cvt/',
    destination: '/cvt/masalah-gearbox-cvt/',
    permanent: true,
  },
  {
    source: '/berapa-lama-gearbox-cvt-tahan/',
    destination: '/cvt/berapa-lama-gearbox-cvt-tahan/',
    permanent: true,
  },
  {
    source: '/bila-tukar-minyak-gearbox-cvt/',
    destination: '/cvt/bila-tukar-minyak-gearbox-cvt/',
    permanent: true,
  },

  // ── GEARBOX REPAIR ───────────────────────────────────────────────────────
  {
    source: '/9-tanda-tanda-gearbox-kereta-anda-bermasalah/',
    destination: '/gearbox-repair/9-tanda-tanda-gearbox-kereta-anda-bermasalah/',
    permanent: true,
  },
  {
    source: '/9-tanda-tanda-gearbox-kereta-anda-bermasalah-2/',
    destination: '/gearbox-repair/9-tanda-tanda-gearbox-kereta-anda-bermasalah/',
    permanent: true,
  },
  {
    source: '/kod-p0730/',
    destination: '/gearbox-repair/kod-p0730/',
    permanent: true,
  },
  {
    source: '/sebab-gearbox-kereta-rosak/',
    destination: '/gearbox-repair/sebab-gearbox-kereta-rosak/',
    permanent: true,
  },
  {
    source: '/overhaul-gearbox-berbaloi/',
    destination: '/gearbox-repair/overhaul-gearbox-berbaloi/',
    permanent: true,
  },
  {
    source: '/gearbox-slip/',
    destination: '/gearbox-repair/gearbox-slip/',
    permanent: true,
  },
  {
    source: '/gearbox-bunyi-bising/',
    destination: '/gearbox-repair/gearbox-bunyi-bising/',
    permanent: true,
  },

  // ── AUTOMATIC TRANSMISSION ───────────────────────────────────────────────
  {
    source: '/perbezaan-cvt-at-dct/',
    destination: '/automatic-transmission/perbezaan-cvt-at-dct/',
    permanent: true,
  },
  {
    source: '/cara-jaga-gearbox-automatik/',
    destination: '/automatic-transmission/cara-jaga-gearbox-automatik/',
    permanent: true,
  },

  // ── MAINTENANCE ──────────────────────────────────────────────────────────
  {
    source: '/servis-gearbox-berapa-kilometer/',
    destination: '/maintenance/servis-gearbox-berapa-kilometer/',
    permanent: true,
  },
  {
    source: '/flush-gearbox-vs-tukar-minyak/',
    destination: '/maintenance/flush-gearbox-vs-tukar-minyak/',
    permanent: true,
  },

  // ── BUYING GUIDE ─────────────────────────────────────────────────────────
  {
    source: '/beli-kereta-second-hand-semak-gearbox/',
    destination: '/buying-guide/beli-kereta-second-hand-semak-gearbox/',
    permanent: true,
  },

  // ── HIGH-PRIORITY LANDING PAGE ───────────────────────────────────────────
  // /masalahgearboxcvt/ stays — rebuild as a dedicated page if needed.
  // Redirect handled via static page at app/masalahgearboxcvt/page.tsx

  // TODO: Populate remaining 70+ redirects once GSC export is reviewed.
  //       Add entries above in the same format.
]
