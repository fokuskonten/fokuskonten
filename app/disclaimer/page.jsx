import Link from 'next/link'

export const metadata = {
  title: 'Pernyataan Penyangkalan (Disclaimer) | FokusKonten',
  description: 'Pernyataan penyangkalan resmi (Disclaimer) untuk penggunaan website fokuskonten.my.id dan aplikasi Android FokusKonten.',
  alternates: { canonical: 'https://fokuskonten.my.id/disclaimer' },
}

const legalDocs = [
  { href: '/kebijakan-privasi', label: 'Kebijakan Privasi', active: false },
  { href: '/syarat-ketentuan', label: 'Syarat & Ketentuan', active: false },
  { href: '/lisensi', label: 'Lisensi Software', active: false },
  { href: '/disclaimer', label: 'Disclaimer', active: true },
  { href: '/hak-cipta', label: 'Hak Cipta', active: false },
  { href: '/dmca', label: 'DMCA Takedown', active: false },
]

const disclaimers = [
  {
    title: '1. Informasi Umum & Tujuan Edukasi',
    content: 'Seluruh informasi, artikel, dan dokumentasi yang disajikan pada website fokuskonten.my.id serta materi pendukung aplikasi FokusKonten bersifat umum dan bertujuan untuk informasi operasional. Kami senantiasa berupaya menyajikan konten yang akurat, namun tidak memberikan garansi mutlak atas ketepatan situasi bisnis di luar parameter yang ditentukan.',
  },
  {
    title: '2. Kinerja Software & Aplikasi Android (As-Is)',
    content: 'Aplikasi kasir Android dan software utilitas FokusKonten disediakan dengan prinsip "sebagaimana adanya" (as-is). FokusKonten menguji stabilitas aplikasi secara ketat di berbagai tipe perangkat, namun pengguna bertanggung jawab secara mandiri atas kepatuhan regulasi perpajakan lokal, pencadangan data berkala, dan perawatan fisik perangkat keras yang digunakan.',
  },
  {
    title: '3. Tautan Eksternal & Pihak Ketiga',
    content: 'Website kami dapat memuat tautan menuju situs eksternal terpercaya (seperti Google Play Store, saluran YouTube resmi, atau repository SDK). FokusKonten tidak memiliki kendali langsung atas perubahan kebijakan privasi atau isi dari platform pihak ketiga tersebut.',
  },
  {
    title: '4. Transparansi Penayangan Iklan & Monetisasi',
    content: 'Pada versi aplikasi yang didukung iklan, materi promosi dikelola oleh jaringan Google AdMob. FokusKonten tidak terafiliasi secara langsung dengan pengiklan individual yang ditayangkan oleh algoritma periklanan Google.',
  },
  {
    title: '5. Pembaruan Pernyataan Penyangkalan',
    content: 'FokusKonten berhak memperbarui klausul disclaimer ini sewaktu-waktu guna menyelaraskan dengan pembaruan sistem dan hukum yang berlaku di Indonesia.',
  },
]

export default function DisclaimerPage() {
  return (
    <section className="pt-28 sm:pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white min-h-screen">
      <div className="container-page">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 mb-6 font-mono">
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">Disclaimer</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <span className="label-brand mb-3 inline-block">Pernyataan Hukum Resmi</span>
          <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-4 text-balance">
            Pernyataan <span className="text-gradient-brand">Penyangkalan (Disclaimer)</span>
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Batasan tanggung jawab dan klarifikasi operasional penggunaan website fokuskonten.my.id serta aplikasi Android FokusKonten.
          </p>
        </div>

        {/* Standardized 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full">
          
          {/* Left Sidebar (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
            
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-sm">
              <span className="text-xs font-display font-bold uppercase tracking-wider text-neutral-500 block mb-3">
                Dokumen Kebijakan Resmi
              </span>
              <div className="space-y-1">
                {legalDocs.map((doc) => (
                  <Link
                    key={doc.href}
                    href={doc.href}
                    className={`block px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-display font-medium transition-colors ${
                      doc.active
                        ? 'bg-neutral-950 text-white font-semibold'
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                    }`}
                  >
                    {doc.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-neutral-50 rounded-2xl border border-neutral-200/70 p-5 text-xs text-neutral-600 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                Status Dokumen
              </span>
              <div className="flex justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-400">Penerbit</span>
                <span className="font-semibold text-neutral-900">FokusKonten</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-400">Yurisdiksi</span>
                <span className="font-medium text-neutral-900">Indonesia</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-400">Terakhir Diperbarui</span>
                <span className="font-medium text-neutral-900">1 Januari 2026</span>
              </div>
            </div>

          </div>

          {/* Right Content (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {disclaimers.map((d, i) => (
              <div key={i} className="rounded-2xl bg-white border border-neutral-200/80 shadow-sm p-6 sm:p-8 hover:shadow-md transition-shadow">
                <h2 className="font-display font-semibold text-neutral-900 text-base sm:text-lg mb-3">
                  {d.title}
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  {d.content}
                </p>
              </div>
            ))}

            {/* Official Contact Card - Clean Flat (No Redundant Inner Boxes) */}
            <div className="rounded-2xl bg-neutral-950 text-white p-6 sm:p-8 shadow-xl border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="max-w-md">
                <h2 className="font-display font-bold text-white text-lg sm:text-xl mb-1.5">
                  Saluran Klarifikasi &amp; Pertanyaan Hukum
                </h2>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  Untuk permohonan klarifikasi mengenai disclaimer atau batasan pertanggungjawaban teknis, silakan hubungi saluran resmi kami:
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="https://wa.me/6285183011318"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display font-semibold text-xs bg-white text-neutral-950 hover:bg-neutral-100 transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 text-neutral-950" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Resmi
                </a>
                <a
                  href="mailto:admin@fokuskonten.my.id"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display font-semibold text-xs bg-white text-neutral-950 hover:bg-neutral-100 transition-all shadow-sm font-mono"
                >
                  admin@fokuskonten.my.id
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
