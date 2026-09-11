import Link from 'next/link'

export const metadata = {
  title: 'Hak Cipta & Kepemilikan Karya | FokusKonten',
  description: 'Informasi hak cipta resmi FokusKonten — perlindungan hukum atas software kasir, aset desain CorelDraw (.CDR), PowerPoint (.PPTX), dan brand FokusKonten.',
  alternates: { canonical: 'https://fokuskonten.my.id/hak-cipta' },
}

const legalDocs = [
  { href: '/kebijakan-privasi', label: 'Kebijakan Privasi', active: false },
  { href: '/syarat-ketentuan', label: 'Syarat & Ketentuan', active: false },
  { href: '/lisensi', label: 'Lisensi Software', active: false },
  { href: '/disclaimer', label: 'Disclaimer', active: false },
  { href: '/hak-cipta', label: 'Hak Cipta', active: true },
  { href: '/dmca', label: 'DMCA Takedown', active: false },
]

const copyrightClauses = [
  {
    title: '1. Pernyataan Kepemilikan & Hak Cipta Utama',
    content: 'Seluruh karya cipta yang dipublikasikan di situs web fokuskonten.my.id serta aplikasi mobile di Google Play Store — mencakup namun tidak terbatas pada source code aplikasi, arsitektur database, desain visual antarmuka, template desain CorelDraw (.CDR), slide presentasi PowerPoint (.PPTX), teks dokumentasi, dan logo Mata Elang — merupakan hak cipta eksklusif milik Muhari (FokusKonten).',
  },
  {
    title: '2. Perlindungan Hukum Republik Indonesia & Internasional',
    content: 'Karya cipta FokusKonten dilindungi oleh Undang-Undang Republik Indonesia Nomor 28 Tahun 2014 tentang Hak Cipta serta konvensi internasional kekayaan intelektual yang berlaku. Setiap bentuk pelanggaran, penggandaan tanpa izin, atau pembajakan komersial tunduk pada sanksi hukum pidana dan perdata.',
  },
  {
    title: '3. Larangan Penggandaan & Penjualan Ulang (No Resell)',
    content: 'Dilarang keras menyalin, merekayasa balik (reverse engineering), mendistribusikan ulang, memaketkan ulang ke dalam CD/flashdisk/cloud drive untuk dijual kembali, atau mengunggah master file (.CDR, .PPTX, source code) ke platform kompetitor tanpa izin tertulis dari pemegang hak cipta.',
  },
  {
    title: '4. Batasan Izin Penggunaan Aset Pembeli',
    content: 'Pengguna yang telah membeli produk resmi FokusKonten diberikan lisensi hak pakai non-eksklusif. Untuk template desain (.CDR), pembeli diizinkan penuh mencetak dan memproduksi barang fisik komersial untuk klien, namun hak cipta atas susunan master desain tetap berada pada FokusKonten.',
  },
  {
    title: '5. Pelaporan & Penegakan Hukum',
    content: 'FokusKonten secara aktif memantau peredaran aset di internet. Kami berhak melakukan tindakan hukum dan pelaporan DMCA takedown kepada platform pihak ketiga apabila ditemukan pembajakan atau penjualan ilegal.',
  },
]

export default function CopyrightPage() {
  const currentYear = 2026

  return (
    <section className="pt-28 sm:pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white min-h-screen">
      <div className="container-page">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 mb-6 font-mono">
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">Hak Cipta</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <span className="label-brand mb-3 inline-block">Kekayaan Intelektual Resmi</span>
          <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-4 text-balance">
            Hak Cipta &amp; <span className="text-gradient-brand">Kepemilikan Karya</span>
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Pemberitahuan resmi perlindungan hak cipta atas seluruh aplikasi Android, software POS, template CorelDraw (.CDR), PowerPoint (.PPTX), dan aset digital FokusKonten.
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
                Hak Cipta &amp; Kepemilikan
              </span>
              <div className="flex justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-400">Pemilik Hak Cipta</span>
                <span className="font-semibold text-neutral-900">Muhari / FokusKonten</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-400">Dasar Hukum</span>
                <span className="font-medium text-neutral-900">UU No. 28 Tahun 2014</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-400">Tahun Publikasi</span>
                <span className="font-medium text-neutral-900">2020 &ndash; {currentYear}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-400">Status Aset</span>
                <span className="font-medium text-neutral-900">All Rights Reserved</span>
              </div>
            </div>

          </div>

          {/* Right Content (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {copyrightClauses.map((c, i) => (
              <div key={i} className="rounded-2xl bg-white border border-neutral-200/80 shadow-sm p-6 sm:p-8 hover:shadow-md transition-shadow">
                <h2 className="font-display font-semibold text-neutral-900 text-base sm:text-lg mb-3">
                  {c.title}
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  {c.content}
                </p>
              </div>
            ))}

            {/* Official Contact Card - Clean Flat (No Redundant Inner Boxes) */}
            <div className="rounded-2xl bg-neutral-950 text-white p-6 sm:p-8 shadow-xl border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="max-w-md">
                <h2 className="font-display font-bold text-white text-lg sm:text-xl mb-1.5">
                  Permohonan Lisensi Khusus &amp; Hak Cipta
                </h2>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  Untuk pertanyaan terkait lisensi komersial atau izin karya turunan, silakan hubungi kami:
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
