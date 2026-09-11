import Link from 'next/link'

export const metadata = {
  title: 'Lisensi Software & Aset Digital | FokusKonten',
  description: 'Ketentuan lisensi resmi aplikasi Android, software kasir POS, template CorelDraw (.CDR), PowerPoint (.PPTX), dan hak cipta FokusKonten.',
  alternates: { canonical: 'https://fokuskonten.my.id/lisensi' },
}

const legalDocs = [
  { href: '/kebijakan-privasi', label: 'Kebijakan Privasi', active: false },
  { href: '/syarat-ketentuan', label: 'Syarat & Ketentuan', active: false },
  { href: '/lisensi', label: 'Lisensi Software', active: true },
  { href: '/disclaimer', label: 'Disclaimer', active: false },
  { href: '/hak-cipta', label: 'Hak Cipta', active: false },
  { href: '/dmca', label: 'DMCA Takedown', active: false },
]

const licenses = [
  {
    title: '1. Lisensi Aplikasi Android & Software POS',
    content: 'Aplikasi Android yang dikembangkan oleh FokusKonten (seperti Apotek Pro, Kelontong Pro, dan aplikasi utilitas lainnya) didistribusikan dengan skema lisensi resmi sekali beli (beli putus). Lisensi memberikan hak pakai non-eksklusif kepada pembeli untuk operasional usaha.',
    rules: [
      'Lisensi berlaku seumur hidup (lifetime) untuk versi yang dibeli tanpa biaya langganan bulanan.',
      'Dilarang melakukan reverse engineering, dekompilasi (decompiling), atau modifikasi source code APK/AAB.',
      'Dilarang mendistribusikan ulang atau mengunggah ulang installer aplikasi ke situs pihak ketiga tanpa izin tertulis.',
    ],
  },
  {
    title: '2. Lisensi Template CorelDraw (.CDR) & Desain Grafis',
    content: 'Sebagai produk unggulan utama FokusKonten, seluruh template vektor CorelDraw (.CDR) dibuat dengan presisi tinggi untuk kebutuhan industri percetakan, sablon, konveksi, dan promosi bisnis.',
    rules: [
      'Pembeli berhak menggunakan template untuk memproduksi hasil cetak fisik tanpa batas (brosur, banner, kaos, kemasan produk, merchandise).',
      'Pembeli berhak memodifikasi elemen desain (warna, teks, tata letak) sesuai kebutuhan klien atau usaha pribadi.',
      'Dilarang keras menjual kembali, membagikan gratis, atau mengunggah ulang file mentah (.CDR) ke situs stok atau marketplace lain.',
    ],
  },
  {
    title: '3. Lisensi Presentasi PowerPoint (.PPTX)',
    content: 'Template presentasi (.PPTX) dirancang khusus untuk percepatan proposal bisnis, pitch deck, edukasi, dan webinar profesional.',
    rules: [
      'Dapat digunakan bebas untuk presentasi komersial perusahaan, seminar bisnis, dan video presentasi.',
      'Dilarang mengekspor atau memaketkan ulang slide sebagai template mentah untuk dijual kembali sebagai produk kompetitor.',
    ],
  },
  {
    title: '4. Konten Website, Dokumentasi & Branding',
    content: 'Seluruh teks, logo Mata Elang, panduan instalasi, dan aset visual di website fokuskonten.my.id adalah hak cipta terdaftar FokusKonten. Dilarang menyalin teks dokumentasi atau memanfaatkan identitas brand FokusKonten tanpa izin.',
    rules: [],
  },
  {
    title: '5. Pustaka Pihak Ketiga & Open Source Software',
    content: 'Aplikasi kami memanfaatkan pustaka open source terpercaya seperti Android Jetpack, SQLCipher (enkripsi AES-256), Kotlin Coroutines, serta SDK resmi Google Play Services. Hak cipta dari masing-masing pustaka pihak ketiga tetap menjadi milik pemilik lisensinya masing-masing.',
    rules: [],
  },
]

export default function LicensesPage() {
  return (
    <section className="pt-28 sm:pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white min-h-screen">
      <div className="container-page">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 mb-6 font-mono">
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">Lisensi Software</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <span className="label-brand mb-3 inline-block">Lisensi Produk &amp; Aset Digital</span>
          <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-4 text-balance">
            Lisensi Software &amp; <span className="text-gradient-brand">Aset Digital</span>
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Panduan hak penggunaan dan ketentuan hukum untuk aplikasi Android, software kasir POS, template CorelDraw (.CDR), dan PowerPoint (.PPTX) FokusKonten.
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
                Ringkasan Model Lisensi
              </span>
              <div className="flex justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-400">Skema Software</span>
                <span className="font-semibold text-neutral-900">Sekali Beli (Beli Putus)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-400">Cetak Komersial</span>
                <span className="font-medium text-neutral-900">Diizinkan Penuh</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-400">Resell File Mentah</span>
                <span className="font-semibold text-red-600">Dilarang Keras</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-400">Pemilik Hak Cipta</span>
                <span className="font-medium text-neutral-900">Muhari / FokusKonten</span>
              </div>
            </div>

          </div>

          {/* Right Content (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {licenses.map((lic, i) => (
              <div key={i} className="rounded-2xl bg-white border border-neutral-200/80 shadow-sm p-6 sm:p-8 hover:shadow-md transition-shadow">
                <h2 className="font-display font-semibold text-neutral-900 text-base sm:text-lg mb-3">
                  {lic.title}
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-4">
                  {lic.content}
                </p>
                {lic.rules.length > 0 && (
                  <ul className="space-y-2.5 border-t border-neutral-100 pt-4">
                    {lic.rules.map((rule, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-neutral-600 text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0 mt-2" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Official Support Card - Clean Flat (No Redundant Inner Boxes) */}
            <div className="rounded-2xl bg-neutral-950 text-white p-6 sm:p-8 shadow-xl border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="max-w-md">
                <h2 className="font-display font-bold text-white text-lg sm:text-xl mb-1.5">
                  Konsultasi Lisensi Perusahaan &amp; Custom
                </h2>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  Butuh lisensi multi-cabang (enterprise) atau software khusus untuk institusi Anda? Silakan hubungi kami:
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
