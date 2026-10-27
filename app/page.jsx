import Link from 'next/link'

const stats = [
  { value: '100%', label: 'Offline-First Ready' },
  { value: 'SDK 36', label: 'Standar Android Termutakhir' },
  { value: 'Multi-Platform', label: 'Android, Web & Windows' },
  { value: '24/7', label: 'Stabilitas & Keamanan Data' },
]

const featuredProducts = [
  {
    id: 'apotekpro',
    name: 'Apotek Pro',
    category: 'Android POS',
    badge: 'Apotek POS',
    description: 'Sistem kasir dan manajemen apotek modern. Pencatatan stok obat, deteksi batch kadaluarsa, resep dokter, dan cetak struk printer Bluetooth thermal offline-first.',
    icon: '/app-icons/apotekpro.png',
    href: '/landpage/apotekpro',
    actionText: 'Lihat Landing Page',
    type: 'app',
  },
  {
    id: 'tokokelontongpro',
    name: 'Kelontong Pro',
    category: 'Android POS',
    badge: 'Retail POS',
    description: 'Aplikasi kasir praktis toko kelontong & sembako. Scan barcode cepat, pencatatan hutang pelanggan, dan rekap omzet harian instan.',
    icon: '/app-icons/tokokelontongpro.png',
    href: '/landpage/tokokelontongpro',
    actionText: 'Lihat Landing Page',
    type: 'app',
  },
  {
    id: 'whatsappcrm',
    name: 'WhatsApp Lead CRM',
    category: 'Windows EXE',
    badge: 'Desktop CRM',
    description: 'Software desktop Windows (.EXE) untuk manajemen prospek WhatsApp, pipeline penjualan, dan tindak lanjut pesan otomatis.',
    icon: '/app-icons/whatsappcrm.png',
    href: '/landpage/whatsappcrm',
    actionText: 'Lihat Landing Page',
    type: 'desktop',
  },
  {
    id: 'reimage',
    name: 'FokusKonten ReImage',
    category: 'Windows Desktop',
    badge: 'Image Optimizer',
    description: 'Software desktop kompresi gambar berbasis Rust libcaesium. Konversi instan WebP, AVIF, JPEG, dan PNG tanpa penurunan mutu visual.',
    icon: '/app-icons/reimage.png',
    href: '/landpage/reimage',
    actionText: 'Lihat Landing Page',
    type: 'desktop',
  },
  {
    id: 'bacaquran',
    name: "BacaQur'an",
    category: 'Android Religi',
    badge: "Al-Qur'an Digital",
    description: "Aplikasi baca Al-Qur'an digital dengan tampilan nyaman di mata, terjemahan lengkap, tanda tajwid, dan mode offline.",
    icon: '/app-icons/bacaquran.png',
    href: '/landpage/bacaquran',
    actionText: 'Lihat Landing Page',
    type: 'app',
  },
  {
    id: 'gamepuzzle',
    name: '2048 Puzzle',
    category: 'Android Game',
    badge: 'Game Logika',
    description: 'Game puzzle angka klasik 2048 yang ringan, responsif, melatih konsentrasi, dan asyik dimainkan kapan saja.',
    icon: '/app-icons/gamepuzzle.png',
    href: '/landpage/2048puzzle',
    actionText: 'Lihat Landing Page',
    type: 'app',
  },
]

const clientProjects = [
  {
    id: 'pt-nurcahya-teknik-industry',
    name: 'PT. Nurcahya Teknik Industry',
    category: 'Web PWA',
    badge: 'Pesanan Klien',
    description: 'Progressive Web App profil industri manufaktur presisi, katalog permesinan CNC Bubut & Milling 3-Axis, dan portal RFQ digital.',
    icon: '/app-icons/ptnti.png',
    href: '/portfolio/pt-nurcahya-teknik-industry',
    actionText: 'Lihat Studi Kasus',
    type: 'web',
  },
  {
    id: 'web-mcjob',
    name: 'Website MCJob.id',
    category: 'Web Platform',
    badge: 'Platform Mitra',
    description: 'Portal web resmi ekosistem lowongan kerja terverifikasi, publikasi informasi perusahaan, dan rekrutmen talenta profesional.',
    icon: '/app-icons/mcjob.png',
    href: 'https://mcjob.my.id/',
    actionText: 'Kunjungi Website',
    type: 'web',
    external: true,
  },
  {
    id: 'mcjob-platform-karir',
    name: 'MCJob.id Platform Karir',
    category: 'Web Platform',
    badge: 'Aplikasi Mitra',
    description: 'Platform bursa lowongan kerja resmi dan terverifikasi untuk memudahkan pencari kerja dan perusahaan di Indonesia.',
    icon: '/app-icons/mcjob.png',
    href: '/portfolio/mcjob-platform-karir',
    actionText: 'Lihat Studi Kasus',
    type: 'app',
  },
]

const inDevelopmentProjects = [
  {
    id: 'jumptools-suite',
    name: 'JumperTools',
    category: 'Windows Desktop',
    badge: 'Sedang Berjalan',
    description: 'Perangkat lunak utilitas teknisi smartphone multi-chipset (Qualcomm EDL 9008, MediaTek Brom, Samsung Odin) untuk penanganan perangkat keras dan firmware.',
    icon: '/app-icons/jumptools.png',
    href: '/portfolio/jumptools-suite',
    actionText: 'Lihat Detail Proyek',
    type: 'desktop',
  },
  {
    id: 'smart-vidkon-automation',
    name: 'Smart Vidkon Automation',
    category: 'Windows Desktop',
    badge: 'Sedang Berjalan',
    description: 'Perangkat lunak orkestrasi video vertikal 9:16 berbasis akselerasi hardware GPU NVIDIA NVENC dan transkripsi suara otomatis kata per kata.',
    icon: '/app-icons/smartvidkon.png',
    href: '/portfolio/smart-vidkon-automation',
    actionText: 'Lihat Detail Proyek',
    type: 'desktop',
  },
  {
    id: 'smart-motion-automation',
    name: 'Smart Motion Automation',
    category: 'Windows Desktop',
    badge: 'Sedang Berjalan',
    description: 'Perangkat lunak orkestrasi timeline kinetik tipografi 60 FPS menggunakan engine React Remotion dengan visual router terintegrasi.',
    icon: '/app-icons/smartmotion.png',
    href: '/portfolio/smart-motion-automation',
    actionText: 'Lihat Detail Proyek',
    type: 'desktop',
  },
]

const features = [
  {
    title: 'Arsitektur Offline-First',
    desc: 'Seluruh aplikasi bisnis dirancang untuk bekerja secara penuh tanpa ketergantungan koneksi internet. Operasional toko tetap berjalan lancar meski jaringan mati.',
    icon: (
      <svg className="w-6 h-6 text-neutral-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Standar Target SDK 36',
    desc: 'Dibangun dengan teknologi Kotlin dan Android Studio modern yang memenuhi standar keamanan dan kompatibilitas sistem operasi Android 15 & 16 terbaru.',
    icon: (
      <svg className="w-6 h-6 text-neutral-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Antarmuka Cepat & Bersih',
    desc: 'Desain navigasi yang ergonomis, kontras warna yang nyaman di mata, dan respons instan untuk mempermudah kasir maupun pengguna awam.',
    icon: (
      <svg className="w-6 h-6 text-neutral-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Keamanan & Integritas Data',
    desc: 'Penyimpanan database terenkripsi secara lokal di perangkat dengan sistem pencadangan terstruktur untuk menjamin tidak ada riwayat transaksi yang hilang.',
    icon: (
      <svg className="w-6 h-6 text-neutral-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
]

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-neutral-50 via-white to-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-brand-500/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-accent-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="container-page relative z-10 w-full">
          <div className="max-w-4xl lg:max-w-5xl 2xl:max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-neutral-950 text-white text-xs font-display font-medium mb-6 sm:mb-8 shadow-sm">
              <span>Pengembang &amp; Publisher Software Resmi</span>
            </div>

            <h1 className="heading-xl text-3xl sm:text-5xl lg:text-6xl text-neutral-900 mb-6 sm:mb-8 text-balance tracking-tight">
              Solusi Software &amp; Aplikasi Andal untuk{' '}
              <span className="text-gradient-brand">Bisnis dan Produktivitas</span>
            </h1>

            <p className="text-neutral-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl lg:max-w-4xl mx-auto mb-8 sm:mb-12">
              FokusKonten menghadirkan ekosistem software kasir POS (Apotek Pro, Kelontong Pro), platform bursa kerja MCJob.id, Al-Qur&apos;an digital, hingga software desktop CRM untuk efisiensi bisnis Anda.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/aplikasi"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-display font-semibold text-sm text-white bg-black hover:bg-neutral-800 shadow-md shadow-black/20 transition-all duration-200"
              >
                Jelajahi Produk Kami
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/toko-digital"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-display font-semibold text-sm text-neutral-800 bg-white border border-neutral-300 hover:border-black hover:text-black hover:shadow-sm transition-all duration-200"
              >
                Toko Aset Digital
              </Link>
              <Link
                href="/layanan"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-display font-semibold text-sm text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors"
              >
                Layanan Kustom
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 border-y border-neutral-100 bg-neutral-50/70">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center py-2">
                <div className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-neutral-900">{stat.value}</div>
                <div className="text-neutral-500 text-xs sm:text-sm mt-1.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="container-page">
          <div className="max-w-4xl mx-auto text-center mb-14 sm:mb-16">
            <span className="label-brand mb-3.5 inline-block">Produk Unggulan</span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-4">
              Inovasi Produk &amp; Ekosistem FokusKonten
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              Katalog aplikasi kasir POS, software manajemen prospek, dan aplikasi mobile resmi siap pakai untuk menunjang produktivitas dan bisnis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:border-neutral-400 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-14 h-14 rounded-2xl object-contain bg-neutral-50 p-1 border border-neutral-100 shadow-sm group-hover:scale-105 transition-transform"
                    />
                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-neutral-950 text-white">
                        {item.badge}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="heading-lg text-xl text-neutral-900 mb-2">{item.name}</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-neutral-100">
                  <Link
                    href={item.href}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-display font-semibold text-xs text-white bg-black hover:bg-neutral-800 shadow-sm transition-all"
                  >
                    {item.actionText}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Link
              href="/aplikasi"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-semibold text-sm text-neutral-900 bg-white border border-neutral-300 hover:border-neutral-950 hover:bg-neutral-50 shadow-sm transition-all duration-200"
            >
              Lihat Selengkapnya
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white border-t border-neutral-100">
        <div className="container-page">
          <div className="max-w-4xl mx-auto text-center mb-14 sm:mb-16">
            <span className="label-warm mb-3.5 inline-block font-mono">Pesanan &amp; Kemitraan</span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-4">
              Karya Pesanan &amp; Studi Kasus Klien
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              Platform web dan sistem aplikasi yang dibangun khusus untuk memenuhi kebutuhan nyata operasional mitra dan industri.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientProjects.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:border-neutral-400 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-14 h-14 rounded-2xl object-contain bg-neutral-50 p-1 border border-neutral-100 shadow-sm group-hover:scale-105 transition-transform"
                    />
                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-neutral-950 text-white">
                        {item.badge}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="heading-lg text-xl text-neutral-900 mb-2">{item.name}</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-neutral-100">
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-display font-semibold text-xs text-white bg-black hover:bg-neutral-800 shadow-sm transition-all"
                    >
                      {item.actionText}
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-display font-semibold text-xs text-white bg-black hover:bg-neutral-800 shadow-sm transition-all"
                    >
                      {item.actionText}
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-14">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-semibold text-sm text-neutral-900 bg-white border border-neutral-300 hover:border-neutral-950 hover:bg-neutral-50 shadow-sm transition-all duration-200"
            >
              Lihat Semua Portofolio
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white border-t border-neutral-100">
        <div className="container-page">
          <div className="max-w-4xl mx-auto text-center mb-14 sm:mb-16">
            <span className="label-brand mb-3.5 inline-block font-mono">Sedang Berjalan</span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-4">
              Proyek Dalam Tahap Pengembangan
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              Inisiatif perangkat lunak internal studio yang saat ini sedang dalam proses riset, pengujian, dan pengembangan aktif.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {inDevelopmentProjects.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:border-neutral-400 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-14 h-14 rounded-2xl object-contain bg-neutral-50 p-1 border border-neutral-100 shadow-sm group-hover:scale-105 transition-transform"
                    />
                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-neutral-950 text-white">
                        {item.badge}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="heading-lg text-xl text-neutral-900 mb-2">{item.name}</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-neutral-100">
                  <Link
                    href={item.href}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-display font-semibold text-xs text-white bg-black hover:bg-neutral-800 shadow-sm transition-all"
                  >
                    {item.actionText}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50/70 border-t border-neutral-100">
        <div className="container-page">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <span className="label-brand mb-3 inline-block">Standar Kualitas &amp; Arsitektur</span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-4">
              Fondasi Software yang Kokoh &amp; Terpercaya
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Setiap aplikasi dibangun dengan prinsip keandalan tinggi untuk memastikan bisnis dan pengguna mendapatkan pengalaman terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-5 text-neutral-900">
                  {f.icon}
                </div>
                <h3 className="font-display font-semibold text-base text-neutral-900 mb-2">{f.title}</h3>
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-950 text-white relative overflow-hidden">
        <div className="container-page relative z-10">
          <div className="max-w-4xl lg:max-w-5xl mx-auto text-center">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-display font-semibold bg-white text-neutral-950 shadow-sm mb-4">
              Layanan Pembuatan Aplikasi
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-white mb-4">
              Butuh Aplikasi Android Khusus untuk Usaha Anda?
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Diskusikan kebutuhan aplikasi kasir, manajemen inventaris, toko online, atau aplikasi utilitas perusahaan Anda langsung dengan tim pengembang FokusKonten.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/6285183011318"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-display font-semibold text-sm bg-white text-neutral-950 hover:bg-neutral-100 transition-all shadow-lg"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Konsultasi via WhatsApp
              </a>
              <Link
                href="/layanan"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-display font-semibold text-sm bg-white text-neutral-950 hover:bg-neutral-100 transition-all shadow-lg"
              >
                Informasi Layanan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
