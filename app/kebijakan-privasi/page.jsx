import Link from 'next/link'

export const metadata = {
  title: 'Kebijakan Privasi Resmi | FokusKonten',
  description: 'Kebijakan Privasi resmi FokusKonten — informasi mengenai pengumpulan, perlindungan, dan penggunaan data pengunjung website fokuskonten.my.id dan pengguna lini aplikasi mobile FokusKonten sesuai standar Google Play Developer Policy.',
  alternates: { canonical: 'https://fokuskonten.my.id/kebijakan-privasi' },
}

const legalDocs = [
  { href: '/kebijakan-privasi', label: 'Kebijakan Privasi', active: true },
  { href: '/syarat-ketentuan', label: 'Syarat & Ketentuan', active: false },
  { href: '/lisensi', label: 'Lisensi Software', active: false },
  { href: '/disclaimer', label: 'Disclaimer', active: false },
  { href: '/hak-cipta', label: 'Hak Cipta', active: false },
  { href: '/dmca', label: 'DMCA Takedown', active: false },
]

const sections = [
  {
    title: '1. Ruang Lingkup & Identitas FokusKonten',
    content: [
      'Kebijakan Privasi ini mengatur bagaimana FokusKonten ("kami", "pengembang") mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi pengguna di seluruh layanan resmi kami, termasuk website fokuskonten.my.id, platform digital, serta lini aplikasi Android resmi yang kami kembangkan dan distribusikan di Google Play Store (termasuk Apotek Pro, Kelontong Pro, dan 2048 Puzzle Game Legendaris).',
      'Kami berkomitmen penuh untuk menghormati privasi pengguna serta mematuhi seluruh Kebijakan Program Pengembang Google Play (Google Play Developer Program Policies), khususnya ketentuan Kebijakan Data Pengguna (User Data Policy).',
    ],
  },
  {
    title: '2. Informasi yang Dikumpulkan (Data Collection) & Ketentuan Aplikasi Mobile',
    content: [
      'Sesuai dengan ketentuan pada masing-masing aplikasi mobile dan standar Google Play Store, pengumpulan dan pemrosesan data diatur sebagai berikut:',
    ],
    list: [
      'Apotek Pro (com.fokuskonten.apotekpro): Mengumpulkan data transaksi penjualan obat, stok obat, data pelanggan, dan data resep dokter untuk keperluan manajemen apotek. Seluruh data disimpan secara lokal di perangkat pengguna dan tidak dikirimkan ke server eksternal tanpa izin pengguna.',
      'Kelontong Pro (com.fokuskonten.tokokelontongpro): Mengumpulkan data transaksi penjualan produk, stok barang, data pelanggan, dan catatan hutang/kasbon piutang untuk keperluan operasional toko retail. Data disimpan secara lokal di perangkat.',
      'Penggunaan Kamera: Aplikasi menggunakan kamera perangkat untuk memindai barcode produk dan obat. Data kamera hanya diproses secara real-time di perangkat dan tidak disimpan atau dikirimkan ke pihak ketiga.',
      'Penyimpanan & Enkripsi Data: Semua data bisnis disimpan di database lokal yang dienkripsi menggunakan SQLCipher (AES-256). Pengguna bertanggung jawab penuh atas keamanan perangkat fisik mereka.',
      'Backup Data & Sinkronisasi: Fitur backup memungkinkan pengguna menyimpan salinan data ke penyimpanan internal perangkat, akun Google Drive pribadi, atau Server FokusKonten jika sinkronisasi cloud diaktifkan secara eksplisit oleh pemilik.',
      'Izin Aplikasi (App Permissions): Aplikasi memerlukan izin kamera untuk pemindaian barcode, izin notifikasi untuk pengingat stok dan kedaluwarsa, serta izin Bluetooth untuk menghubungkan printer kasir thermal ESC/POS.',
      'ID Iklan & Analitik Stabilitas: Aplikasi gratis menggunakan Google AdMob (Advertising ID) untuk penayangan iklan yang relevan, serta Firebase Crashlytics untuk pemantauan crash log anonim demi stabilitas sistem tanpa merekam data identitas pribadi.',
      'Layanan Website & Kontak: Informasi sukarela yang Anda kirimkan saat menghubungi kami via form kontak, WhatsApp, atau email (nama, email, nomor telepon, dan pesan).',
    ],
  },
  {
    title: '3. Tujuan Penggunaan Informasi',
    list: [
      'Menyediakan, memelihara, dan mengoptimalkan fungsi website dan aplikasi FokusKonten.',
      'Menayangkan iklan seluler yang relevan melalui Google AdMob pada aplikasi yang didukung iklan.',
      'Mendeteksi gangguan teknis, memperbaiki bug/error, dan memastikan kestabilan aplikasi di berbagai perangkat.',
      'Merespons pertanyaan, transaksi aset digital, dan permohonan bantuan teknis pengguna.',
      'Mematuhi ketentuan hukum serta standar kepatuhan ekosistem Google Play Store.',
    ],
  },
  {
    title: '4. Enkripsi dan Keamanan Data Saat Transit (Data Safety & Encryption)',
    content: [
      'Keamanan data Anda merupakan prioritas utama FokusKonten. Sesuai dengan deklarasi Keamanan Data (Data Safety) Google Play kami:',
      'Seluruh transmisi data antara aplikasi/website dengan jaringan pihak ketiga dienkripsi saat transit menggunakan protokol kriptografi standar industri yang aman (HTTPS / TLS 1.3). Kami tidak pernah mengumpulkan atau menyimpan informasi pribadi yang sensitif seperti kata sandi perbankan atau data finansial rahasia pengguna.',
    ],
  },
  {
    title: '5. Layanan Pihak Ketiga & SDK Terdaftar (Third-Party Services)',
    content: [
      'Aplikasi mobile kami mengintegrasikan Software Development Kit (SDK) resmi pihak ketiga dari Google LLC. Pengguna dapat meninjau kebijakan privasi masing-masing penyedia layanan secara langsung:',
    ],
    links: [
      {
        name: 'Google Play Services',
        url: 'https://policies.google.com/privacy',
        desc: 'Layanan autentikasi sistem dan kompatibilitas Android',
      },
      {
        name: 'Google AdMob',
        url: 'https://support.google.com/admob/answer/6128543',
        desc: 'Jaringan penayangan iklan seluler terverifikasi',
      },
      {
        name: 'Firebase Analytics & Crashlytics',
        url: 'https://firebase.google.com/support/privacy',
        desc: 'Pelaporan crash log anonim dan stabilitas performa aplikasi',
      },
    ],
  },
  {
    title: '6. Hak Pengguna & Retensi Data (Data Retention & Deletion)',
    content: [
      'Sesuai dengan ketentuan Google Play mengenai Penghapusan Akun & Data (Account & Data Deletion Policy):',
      'Karena aplikasi kami berarsitektur offline-first di mana database tersimpan di perangkat lokal pengguna, Anda memegang kendali penuh atas data Anda. Anda dapat menghapus data transaksi kapan saja melalui fitur "Reset Data" di dalam menu Pengaturan aplikasi, atau dengan menghapus data aplikasi / mencopot (uninstall) aplikasi dari perangkat Anda.',
      'Jika Anda pernah meminta sinkronisasi ke server kami dan ingin data Anda dihapus permanen dari sistem cadangan kami, silakan ajukan permohonan penghapusan data via email ke admin@fokuskonten.my.id.',
    ],
  },
  {
    title: '7. Privasi Anak-Anak (Children\'s Privacy)',
    content: [
      'Layanan dan aplikasi kami tidak ditujukan untuk anak-anak di bawah usia 13 tahun. Kami tidak pernah secara sengaja mengumpulkan informasi identitas pribadi dari anak-anak. Jika Anda meyakini bahwa anak Anda telah memberikan informasi pribadi kepada kami, silakan hubungi kami agar kami dapat segera mengambil tindakan penghapusan.',
    ],
  },
  {
    title: '8. Penggunaan Cookie Website',
    content: [
      'Website fokuskonten.my.id menggunakan cookie teknis untuk meningkatkan navigasi, memelihara preferensi tampilan, dan menganalisis traffic situs secara anonim. Anda dapat mengatur preferensi cookie melalui browser Anda.',
    ],
  },
  {
    title: '9. Pembaruan Kebijakan Privasi',
    content: [
      'Kami dapat memperbarui Kebijakan Privasi ini secara berkala guna menyesuaikan dengan rilis aplikasi baru, regulasi hukum, atau kebijakan Google Play yang berlaku. Tanggal efektif terbaru akan selalu dicantumkan di bagian atas halaman ini.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-28 sm:pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white min-h-screen">
      <div className="container-page">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 mb-6 font-mono">
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">Kebijakan Privasi</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <span className="label-brand mb-3 inline-block">Legalitas &amp; Kepatuhan Data</span>
          <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-4 text-balance">
            Kebijakan Privasi <span className="text-gradient-brand">Resmi</span>
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Pernyataan transparansi FokusKonten mengenai perlindungan data pribadi pengunjung situs web resmi dan pengguna seluruh lini aplikasi mobile FokusKonten sesuai standar Google Play Developer Policy.
          </p>
        </div>

        {/* Standardized 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full">
          
          {/* Left Sidebar: Document Index & Studio Legal Profile (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
            
            {/* Navigasi Dokumen Resmi */}
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

            {/* Profil Legal Entitas */}
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200/70 p-5 text-xs text-neutral-600 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                Identitas Entitas
              </span>
              <div className="flex justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-400">Pengembang</span>
                <span className="font-semibold text-neutral-900">FokusKonten</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-400">Yurisdiksi</span>
                <span className="font-medium text-neutral-900">Republik Indonesia</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-400">Status Kepatuhan</span>
                <span className="font-medium text-neutral-900">Google Play Compliant</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-400">Terakhir Diperbarui</span>
                <span className="font-medium text-neutral-900">1 Januari 2026</span>
              </div>
            </div>

          </div>

          {/* Right Main Content: Legal Sections (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Identity Quick Card */}
            <div className="rounded-2xl bg-white border border-neutral-200/80 shadow-sm p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-neutral-400 font-semibold block uppercase text-[11px] tracking-wider mb-1">Pengembang Resmi</span>
                <span className="font-bold text-neutral-950 text-base">FokusKonten</span>
              </div>
              <div>
                <span className="text-neutral-400 font-semibold block uppercase text-[11px] tracking-wider mb-1">Domain Resmi</span>
                <span className="font-bold text-neutral-900 text-base">fokuskonten.my.id</span>
              </div>
              <div>
                <span className="text-neutral-400 font-semibold block uppercase text-[11px] tracking-wider mb-1">Aplikasi Google Play</span>
                <span className="font-medium text-neutral-800">Apotek Pro, Kelontong Pro, Game Puzzle</span>
              </div>
              <div>
                <span className="text-neutral-400 font-semibold block uppercase text-[11px] tracking-wider mb-1">Protokol Keamanan</span>
                <span className="font-medium text-neutral-800">SQLCipher AES-256 &amp; TLS 1.3</span>
              </div>
            </div>

            {/* Clauses */}
            {sections.map((s, i) => (
              <div key={i} className="rounded-2xl bg-white border border-neutral-200/80 shadow-sm p-6 sm:p-8 hover:shadow-md transition-shadow">
                <h2 className="font-display font-semibold text-neutral-900 text-base sm:text-lg mb-3">
                  {s.title}
                </h2>
                {s.content && s.content.map((p, j) => (
                  <p key={j} className="text-neutral-600 text-sm leading-relaxed mb-3 last:mb-0">{p}</p>
                ))}
                {s.list && (
                  <ul className="space-y-2.5 mt-4">
                    {s.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-neutral-600 text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.links && (
                  <div className="mt-5 pt-4 border-t border-neutral-100 space-y-2">
                    <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">Kebijakan Resmi SDK Mitra:</span>
                    {s.links.map((link, k) => (
                      <div key={k} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-xs gap-2 sm:gap-4">
                        <span className="font-semibold text-neutral-800">{link.name} — <span className="font-normal text-neutral-500">{link.desc}</span></span>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-neutral-900 hover:text-black font-semibold underline shrink-0"
                        >
                          Kebijakan Resmi &rarr;
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Official Contact Card - Clean Flat (No Redundant Inner Boxes) */}
            <div className="rounded-2xl bg-neutral-950 text-white p-6 sm:p-8 shadow-xl border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="max-w-md">
                <h2 className="font-display font-bold text-white text-lg sm:text-xl mb-1.5">
                  10. Kontak Pengembang &amp; Permohonan Data
                </h2>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  Apabila Anda memiliki pertanyaan seputar kepatuhan privasi atau permohonan data, silakan hubungi kami:
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
                  WhatsApp Pengembang
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
