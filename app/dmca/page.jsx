import Link from 'next/link'

export const metadata = {
  title: 'Kebijakan DMCA & Takedown | FokusKonten',
  description: 'Digital Millennium Copyright Act (DMCA) — kebijakan dan prosedur pelaporan pelanggaran hak cipta resmi FokusKonten.',
  alternates: { canonical: 'https://fokuskonten.my.id/dmca' },
}

const legalDocs = [
  { href: '/kebijakan-privasi', label: 'Kebijakan Privasi', active: false },
  { href: '/syarat-ketentuan', label: 'Syarat & Ketentuan', active: false },
  { href: '/lisensi', label: 'Lisensi Software', active: false },
  { href: '/disclaimer', label: 'Disclaimer', active: false },
  { href: '/hak-cipta', label: 'Hak Cipta', active: false },
  { href: '/dmca', label: 'DMCA Takedown', active: true },
]

const dmcaClauses = [
  {
    title: '1. Penghormatan terhadap Hak Kekayaan Intelektual',
    content: 'FokusKonten sangat menghormati hak kekayaan intelektual pihak lain dan mewajibkan seluruh pengunjung serta pengguna website dan aplikasi kami untuk mematuhi standar hukum yang sama. Kami akan menindaklanjuti secara tegas setiap pemberitahuan dugaan pelanggaran hak cipta sesuai dengan ketentuan Digital Millennium Copyright Act (DMCA) dan Undang-Undang Hak Cipta Indonesia.',
  },
  {
    title: '2. Prosedur Pengajuan Pemberitahuan Pelanggaran (Takedown Notice)',
    content: 'Apabila Anda adalah pemilik hak cipta atau agen yang sah dan meyakini bahwa terdapat materi atau konten di fokuskonten.my.id yang melanggar hak cipta Anda, silakan kirimkan pemberitahuan tertulis lengkap yang memuat informasi berikut:',
    requirements: [
      'Tanda tangan fisik atau elektronik dari pemilik hak cipta atau pihak yang berwenang bertindak atas namanya.',
      'Identifikasi yang jelas atas karya berhak cipta yang diklaim telah dilanggar.',
      'Identifikasi materi yang melanggar beserta URL spesifik tempat materi tersebut ditemukan di website kami.',
      'Informasi kontak pengadu yang memadai (nama lengkap, alamat, nomor telepon, dan alamat email aktif).',
      'Pernyataan itikad baik (good faith belief) bahwa penggunaan materi tersebut tidak diizinkan oleh pemilik hak cipta, agennya, atau hukum.',
      'Pernyataan bahwa informasi dalam pemberitahuan adalah akurat dan, di bawah ancaman sanksi sumpah palsu, Anda berhak mewakili pemilik hak cipta.',
    ],
  },
  {
    title: '3. Verifikasi & Tindakan Penurunan Konten',
    content: 'Setelah menerima pemberitahuan tertulis yang sah dan memenuhi syarat kelengkapan di atas, tim hukum FokusKonten akan segera melakukan investigasi dan, bila terbukti benar, menghapus atau menonaktifkan akses ke materi yang melanggar dalam waktu 2x24 jam kerja.',
  },
  {
    title: '4. Sanksi atas Pemberitahuan Palsu',
    content: 'Harap diperhatikan bahwa pengajuan klaim pelanggaran hak cipta palsu atau menyesatkan dapat dikenakan sanksi ganti rugi hukum, termasuk biaya penasihat hukum yang timbul bagi FokusKonten atau pemilik materi yang sah.',
  },
]

export default function DmcaPage() {
  return (
    <section className="pt-28 sm:pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white min-h-screen">
      <div className="container-page">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 mb-6 font-mono">
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">DMCA</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <span className="label-brand mb-3 inline-block">Prosedur Perlindungan Hak Cipta</span>
          <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-4 text-balance">
            Kebijakan <span className="text-gradient-brand">DMCA &amp; Takedown</span>
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Prosedur resmi pengajuan klaim dan penurunan materi yang melanggar hak kekayaan intelektual di platform FokusKonten.
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
                Petugas Kontak DMCA
              </span>
              <div className="flex justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-400">Penerima Klaim</span>
                <span className="font-semibold text-neutral-900">Legal FokusKonten</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-400">Batas Respon</span>
                <span className="font-medium text-neutral-900">2x24 Jam Kerja</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-400">Email Khusus</span>
                <span className="font-medium text-neutral-900 font-mono">admin@fokuskonten.my.id</span>
              </div>
            </div>

          </div>

          {/* Right Content (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {dmcaClauses.map((clause, i) => (
              <div key={i} className="rounded-2xl bg-white border border-neutral-200/80 shadow-sm p-6 sm:p-8 hover:shadow-md transition-shadow">
                <h2 className="font-display font-semibold text-neutral-900 text-base sm:text-lg mb-3">
                  {clause.title}
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  {clause.content}
                </p>
                {clause.requirements && (
                  <ul className="space-y-2.5 mt-4 border-t border-neutral-100 pt-4">
                    {clause.requirements.map((req, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-neutral-600 text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0 mt-2" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Official Filing Destination Card - Clean Flat */}
            <div className="rounded-2xl bg-neutral-950 text-white p-6 sm:p-8 shadow-xl border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="max-w-md">
                <h2 className="font-display font-bold text-white text-lg sm:text-xl mb-1.5">
                  Alamat Pengiriman Laporan DMCA Resmi
                </h2>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  Kirimkan surat pemberitahuan takedown resmi Anda dengan berkas bukti ke saluran resmi FokusKonten:
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="https://wa.me/6285183011318"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display font-semibold text-xs bg-white text-neutral-950 hover:bg-neutral-100 transition-all shadow-sm"
                >
                  WhatsApp Legal
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
