import Link from 'next/link'

export const metadata = {
  title: 'FokusKonten ReImage Pro — Mesin Kompresi Gambar Native Rust & .NET 8 WPF',
  description: 'Software desktop Windows x64 native (.NET 8 WPF + C-FFI Rust libcaesium) untuk optimasi kompresi gambar massal, reduksi byte presisi, dan konversi format WebP/JPG/PNG berkecepatan tinggi.',
  alternates: { canonical: 'https://fokuskonten.my.id/landpage/reimage/' },
  openGraph: {
    title: 'FokusKonten ReImage Pro — Mesin Kompresi Gambar Native C-FFI Rust & .NET 8',
    description: 'Software desktop Windows x64 native untuk optimasi kompresi gambar massal, reduksi byte presisi, dan konversi format WebP/JPG/PNG berkecepatan tinggi.',
    images: [{ url: '/screenshots/reimage/rock_dove_circle.png', width: 1024, height: 1024, alt: 'FokusKonten ReImage Pro Totem Rock Dove' }],
  },
}

export default function ReImageDedicatedLandingPage() {
  const waContactUrl = `https://wa.me/6285183011318?text=${encodeURIComponent('Halo FokusKonten,\n\nSaya tertarik dengan software desktop *FokusKonten ReImage Pro* (Proyek Berjalan / Early Access Preview).\nMohon info mengenai pengujian performa dan akses lisensi rilis pratinjaunya.')}`
  const devMailUrl = 'mailto:admin@fokuskonten.my.id?subject=Inquiry%20FokusKonten%20ReImage%20Pro%20Early%20Access'

  // 6 Preset Komersial Faktual
  const commercialPresets = [
    {
      id: '01',
      title: 'Shopee & Marketplace',
      format: 'JPEG / WebP',
      spec: 'Rasio 1:1 (1200x1200px) • Ukuran < 300 KB',
      desc: 'Diformulasikan khusus untuk memenuhi standar algoritma pencarian Shopee dan Tokopedia. Gambar produk tajam tanpa pecah dengan waktu muat super cepat.',
    },
    {
      id: '02',
      title: 'E-Commerce & Katalog Web',
      format: 'WebP Ringan',
      spec: 'Kualitas 75% • Reduksi Ukuran Hingga 85%',
      desc: 'Optimalisasi gambar untuk toko online Next.js, WordPress, atau Shopify. Mempercepat skor Google PageSpeed dan memangkas konsumsi bandwidth CDN server.',
    },
    {
      id: '03',
      title: 'Instagram Feed & Carousel',
      format: 'JPEG 4:4:4 Chroma',
      spec: 'Preservasi Spektrum Warna • Nol Kompresi Rusak',
      desc: 'Mempertahankan ketajaman teks, warna grafis, dan detail visual agar tidak hancur atau buram saat dikompresi ulang oleh algoritma Instagram.',
    },
    {
      id: '04',
      title: 'Batas Maksimal Ukuran (Target Size)',
      format: 'Presisi Byte Otomatis',
      spec: 'Contoh: Tepat di Bawah 500 KB / 1 MB',
      desc: 'Fungsi native C-FFI Rust c_compress_to_size yang mengompresi gambar massal secara presisi hingga tepat berada di bawah kuota maksimal unggahan formulir/portal.',
    },
    {
      id: '05',
      title: 'Lampiran Email & Laporan Kantor',
      format: 'JPEG Hemat',
      spec: 'Batas Ukuran < 200 KB per File',
      desc: 'Solusi bagi dokumen presentasi PDF dan lampiran email massal agar tidak memicu penolakan kuota server surat elektronik kantor.',
    },
    {
      id: '06',
      title: 'Arsip Grafis Lossless Murni',
      format: 'PNG Zopfli & WebP Lossless',
      spec: '100% Nol Penurunan Kualitas Piksel',
      desc: 'Kompresi lossless tingkat lanjut menggunakan algoritma Zopfli. Mengurangi ukuran berkas PNG dan aset logo transparan tanpa membuang satu piksel pun.',
    },
  ]

  // Roadmap Transparansi Proyek Berjalan
  const roadmapStages = [
    {
      step: '01',
      title: 'Rekayasa Mesin Rust C-FFI',
      status: 'Selesai 100%',
      statusColor: 'bg-neutral-950 text-white',
      desc: 'Penyusunan biner 64-bit fokuskonten_engine.dll berbasis libcaesium Rust dengan pemrosesan paralel multi-core dan isolasi memori tanpa kebocoran resource.',
    },
    {
      step: '02',
      title: 'Antarmuka .NET 8 WPF & Kriptografi',
      status: 'Selesai 100%',
      statusColor: 'bg-neutral-950 text-white',
      desc: 'Pembangunan antarmuka desktop modern 60 FPS, sistem antrean drag-and-drop, dual live preview, serta lisensi offline HMAC-SHA256 (FKRIO).',
    },
    {
      step: '03',
      title: 'Pengujian Beban Massal & Kalibrasi',
      status: 'Tahap Berjalan (Aktif)',
      statusColor: 'bg-neutral-100 border border-neutral-300 text-neutral-950 font-bold',
      desc: 'Siklus pengujian fisik pada ribuan aset gambar e-commerce, kalibrasi multi-threading semaphore, serta uji stabilitas memori di PC Windows 10/11.',
    },
    {
      step: '04',
      title: 'Rilis Pratinjau Terbuka (Public Preview)',
      status: 'Fase Berikutnya',
      statusColor: 'bg-neutral-50 text-neutral-400 border border-neutral-200',
      desc: 'Penyediaan installer mandiri Inno Setup (ReImage.exe), pendaftaran lisensi pengguna awal, serta integrasi otomatisasi katalog marketplace.',
    },
  ]

  // 4 Pilar Arsitektur Faktual
  const techPillars = [
    {
      num: '01',
      title: 'Multi-Core Parallel Rust Engine',
      desc: 'Memanfaatkan seluruh inti prosesor komputer secara optimal melalui mekanisme throttling semaphore sehingga antarmuka tetap responsif 60 FPS tanpa macet saat memproses ratusan foto.',
    },
    {
      num: '02',
      title: 'Target Size Byte-Precision Compression',
      desc: 'Bebas dari tebak-tebakan kualitas. Tentukan batas maksimal ukuran berkas yang diizinkan (misal 300 KB), dan mesin Rust akan mencari titik kompresi tertinggi yang memenuhi kriteria secara otomatis.',
    },
    {
      num: '03',
      title: '100% Offline & Kerahasiaan Privat',
      desc: 'Seluruh proses pengolahan gambar berlangsung di harddisk komputer Anda sendiri. Nol unggahan data ke server cloud, menjamin kerahasiaan master aset digital dan foto pribadi Anda.',
    },
    {
      num: '04',
      title: 'Lisensi Permanen Kriptografi Offline',
      desc: 'Kunci serial lisensi FKRIO terikat pada perangkat keras Windows Anda tanpa kewajiban koneksi internet konstan. Sekali pasang aktif seumur hidup tanpa biaya langganan bulanan.',
    },
  ]

  return (
    <div className="bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* ── HERO SECTION & STATUS PROYEK BERJALAN ───────────────────────── */}
      <section className="pt-28 sm:pt-36 pb-16 border-b border-neutral-200/80 bg-gradient-to-b from-neutral-50/80 via-white to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Lencana Transparansi Status Proyek Berjalan */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-300 text-xs font-mono font-bold text-neutral-900 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-neutral-950 animate-pulse"></span>
            <span>PROYEK BERJALAN • EARLY ACCESS PREVIEW v1.0.0</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight leading-[1.15] mb-5 max-w-4xl mx-auto font-display">
            FokusKonten ReImage Pro
          </h1>

          <p className="text-base sm:text-xl text-neutral-600 max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
            Perangkat lunak desktop native Windows x64 berkinerja tinggi berbasis mesin C-FFI Rust untuk kompresi gambar massal, pengubahan skala cerdas, dan konversi format WebP, JPEG, dan PNG super cepat tanpa penurunan mutu visual.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14">
            <a
              href={waContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-white bg-neutral-950 hover:bg-neutral-800 shadow-md transition-all duration-200"
            >
              <span>Daftar Pengujian Beta via WhatsApp</span>
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href="#roadmap"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-neutral-800 bg-neutral-100 border border-neutral-300 hover:border-neutral-950 hover:bg-neutral-200 shadow-sm transition-all duration-200"
            >
              <span>Lihat Roadmap Pengembangan</span>
            </a>
          </div>

          {/* ── SASIS JENDELA DESKTOP WINDOWS CENTERPIECE ─────────────────── */}
          <div className="rounded-3xl overflow-hidden border border-neutral-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.14)] max-w-5xl mx-auto bg-neutral-950 text-left">
            
            {/* Titlebar Jendela Windows */}
            <div className="px-5 py-3.5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white p-0.5 border border-neutral-300 shrink-0">
                  <img
                    src="/screenshots/reimage/rock_dove_circle.png"
                    alt="Rock Dove Heraldic Medallion"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-mono text-xs font-semibold text-neutral-200 tracking-wide">
                  FokusKonten ReImage Optimizer Pro — Enterprise Media Utility (win-x64)
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neutral-800 text-neutral-300 border border-neutral-700">
                  RUST CORE NATIVE
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-neutral-700 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-neutral-700 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-neutral-600 inline-block"></span>
              </div>
            </div>

            {/* Antarmuka Dalam Sasis: KPI Metrics & Status Panel */}
            <div className="p-6 sm:p-8 bg-neutral-950 text-white space-y-6">
              
              {/* 4 Kartu KPI Metrics Dashboard */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800">
                  <span className="text-[11px] font-mono font-bold text-neutral-400 block mb-1">TOTAL ANTREAN</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-white">1.250 File</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800">
                  <span className="text-[11px] font-mono font-bold text-neutral-400 block mb-1">UKURAN ASLI</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-neutral-300">4,85 GB</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800">
                  <span className="text-[11px] font-mono font-bold text-neutral-400 block mb-1">HASIL OPTIMASI</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-white">820 MB</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800">
                  <span className="text-[11px] font-mono font-bold text-neutral-400 block mb-1">PENGHEMATAN</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-neutral-100">83,1%</span>
                </div>
              </div>

              {/* Panel Simulasi Antrean & Dual Live Preview */}
              <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    <span>Status Engine: Siap Memproses Pemrosesan Paralel Multi-Core</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">
                    Kecepatan Rata-Rata: 42 Foto / Detik
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs font-mono font-bold text-neutral-400 block mb-2">MODE KOMPRESI AKTIF</span>
                    <p className="text-sm font-semibold text-white">Batas Maksimal Ukuran (Target Size: &lt; 300 KB)</p>
                    <p className="text-xs text-neutral-400 mt-1">Presisi byte transaksional tanpa distorsi piksel foto.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs font-mono font-bold text-neutral-400 block mb-2">FORMAT KELUARAN</span>
                    <p className="text-sm font-semibold text-white">WebP Ringan &amp; Progressive JPEG</p>
                    <p className="text-xs text-neutral-400 mt-1">Struktur subfolder dan metadata EXIF dipertahankan utuh.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION: ROADMAP TRANSPARANSI PROYEK BERJALAN ────────────── */}
      <section id="roadmap" className="py-20 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 mb-3 block">
              Transparansi Siklus Produk
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-display mb-4">
              Tahapan Pengembangan FokusKonten ReImage Pro
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Kami menjunjung tinggi kejujuran teknis. Perangkat lunak ini sedang berada pada tahap pengujian performa mendalam sebelum rilis umum resmi dibuka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapStages.map((stage) => (
              <div
                key={stage.step}
                className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-lg bg-neutral-950 text-white font-mono font-bold text-xs flex items-center justify-center">
                      {stage.step}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono ${stage.statusColor}`}>
                      {stage.status}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-neutral-950 mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: 6 PRESET KOMERSIAL SIAP PAKAI ─────────────────────── */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 mb-3 block">
              Standar Kompresi Industri
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-display mb-4">
              6 Preset Kompresi Siap Pakai untuk Bisnis Anda
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Tinggalkan pengaturan teknis yang rumit. Cukup pilih kebutuhan media Anda, dan mesin ReImage Pro akan menerapkan konfigurasi terbaik secara instan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialPresets.map((preset) => (
              <div
                key={preset.id}
                className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:border-neutral-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-md bg-neutral-950 text-white font-mono font-bold text-xs flex items-center justify-center">
                      {preset.id}
                    </span>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-300">
                      {preset.format}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-neutral-950 mb-1.5">
                    {preset.title}
                  </h3>
                  <div className="text-xs font-mono font-semibold text-neutral-500 mb-3">
                    {preset.spec}
                  </div>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                    {preset.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: 4 PILAR ARSITEKTUR & KEUNGGULAN FAKTUAL ────────────── */}
      <section className="py-20 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 mb-3 block">
              Keunggulan Rekayasa Native
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-display mb-4">
              Arsitektur Komputasi Lokal Tanpa Biaya Cloud
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Dibangun dari nol dengan bahasa Rust dan .NET 8 WPF untuk menghasilkan kecepatan komputasi maksimal pada perangkat PC Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techPillars.map((pillar) => (
              <div
                key={pillar.num}
                className="bg-white rounded-2xl border border-neutral-200/90 p-7 shadow-sm flex items-start gap-5"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white font-mono font-bold flex items-center justify-center shrink-0 text-sm shadow-sm">
                  {pillar.num}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-neutral-950 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: KOTAK PARTISIPASI EARLY ACCESS ─────────────────────── */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl bg-neutral-950 text-white p-8 sm:p-12 border border-neutral-800 shadow-2xl">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-white text-neutral-950 mb-4">
              PARTISIPASI PENGUJIAN BETA
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight mb-4 text-balance">
              Ingin Mencoba Performa FokusKonten ReImage Pro di Laptop Anda?
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              Kami membuka kesempatan pengujian pratinjau (*early preview*) bagi pemilik toko online, fotografer produk, dan pengembang web yang membutuhkan kompresi ribuan gambar harian secara cepat dan privat.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href={waContactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-neutral-950 bg-white hover:bg-neutral-100 shadow-lg transition-all"
              >
                <span>Ajukan Akses Pengujian via WhatsApp</span>
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <a
                href={devMailUrl}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-neutral-300 bg-neutral-900 border border-neutral-700 hover:border-white transition-all"
              >
                <span>Hubungi Pengembang Resmi</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER NAVIGASI BREADCRUMB ─────────────────────────────────── */}
      <div className="py-8 bg-neutral-50 text-center border-t border-neutral-200/60 text-xs text-neutral-500 font-mono">
        <span>FokusKonten Software Suite</span>
        <span className="mx-2">·</span>
        <Link href="/aplikasi" className="hover:text-neutral-950 underline font-semibold">
          Katalog Produk
        </Link>
        <span className="mx-2">·</span>
        <Link href="/" className="hover:text-neutral-950 underline font-semibold">
          Beranda
        </Link>
      </div>
    </div>
  )
}
