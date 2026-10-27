import Link from 'next/link'

export const metadata = {
  title: 'JumperTools Pro — Software Flasher & Diagnosa Smartphone Multi-Chipset',
  description: 'Software desktop Windows x64 native untuk teknisi ponsel profesional. Solusi terpadu perbaikan firmware Qualcomm EDL 9008, MediaTek Brom, Samsung Odin, dan UNISOC SPD dengan proteksi partisi sinyal IMEI serta operasional 100% offline.',
  alternates: { canonical: 'https://fokuskonten.my.id/landpage/jumptools/' },
  openGraph: {
    title: 'JumperTools Pro — Universal Smartphone Hardware & Flasher Suite',
    description: 'Software desktop Windows x64 native untuk teknisi ponsel profesional. Flashing multi-chipset Qualcomm, MediaTek, Samsung, dan UNISOC tanpa ketergantungan box hardware mahal.',
    images: [{ url: '/screenshots/jumptools/header.jpg', width: 1200, height: 630, alt: 'JumperTools Pro Banner Resmi' }],
  },
}

export default function JumperToolsDedicatedLandingPage() {
  const waContactUrl = `https://wa.me/6285183011318?text=${encodeURIComponent('Halo FokusKonten,\n\nSaya tertarik dengan software desktop *JumperTools Pro* (Universal Smartphone Flasher & Hardware Suite).\nMohon informasi aktivasi lisensi hardware, fitur multi-chipset, dan konsultasi teknisi.')}`
  const devMailUrl = 'mailto:admin@fokuskonten.my.id?subject=Inquiry%20JumperTools%20Pro%20Official%20Suite'

  // Keresahan Nyata Teknisi (Pain Points Meja Servis)
  const painPoints = [
    {
      title: 'Terbebani Biaya Dongle & Box Fisik Jutaan Rupiah',
      desc: 'Membeli berbagai macam alat box dan dongle perangkat keras terpisah untuk tiap merek ponsel sangat menguras modal meja kerja bengkel servis Anda.',
    },
    {
      title: 'Risiko Fatal Hilang Sinyal & Kerusakan Partisi IMEI',
      desc: 'Proses flashing manual sering kali secara tidak sengaja menimpa partisi radio jaringan (Modem/EFS/NVRAM), membuat ponsel pelanggan kehilangan nomor IMEI dan sinyal operator.',
    },
    {
      title: 'Software Pihak Ketiga Tercecer & Rentan Virus',
      desc: 'Mengunduh puluhan program flasher bajakan dari forum tidak resmi berisiko tinggi merusak sistem komputer Windows Anda dengan malware, adware, atau trojan berbahaya.',
    },
    {
      title: 'Servis Terhenti Saat Internet Mati & Biaya Sewa Bulanan',
      desc: 'Banyak software servis berbasis server cloud yang langsung macet saat jaringan internet padam, ditambah kewajiban membayar biaya kredit sewa bulanan yang terus membengkak.',
    },
  ]

  // 4 Pilar Chipset Protokol
  const chipsetPillars = [
    {
      id: '01',
      brand: 'Qualcomm Snapdragon',
      badge: 'Mode Darurat EDL 9008',
      desc: 'Protokol darurat Emergency Download langsung ke prosesor ponsel. Membaca tabel partisi memori, menulis firmware per sektor, dan memulihkan ponsel yang mengalami mati total (hard-brick) secara aman.',
      specs: 'Dukungan Memori UFS & eMMC • Pemulihan Hard-Brick',
    },
    {
      id: '02',
      brand: 'MediaTek (MTK)',
      badge: 'Bypass Proteksi Brom',
      desc: 'Melewati proteksi perangkat keras pada chipset Dimensity dan Helio tanpa kendala otorisasi akun. Penulisan firmware via berkas scatter resmi, format partisi terkunci, dan perbaikan partisi sinyal.',
      specs: 'Kompatibel Dimensity & Helio • Penulisan Scatter Cepat',
    },
    {
      id: '03',
      brand: 'Samsung Exynos & Qualcomm',
      badge: 'Flashing Odin 4-Berkas',
      desc: 'Otomatisasi pembacaan dan flashing paket firmware resmi 4 berkas (BL, AP, CP, CSC). Ekstraksi tabel partisi PIT otomatis untuk memulihkan perangkat Samsung yang terjebak kondisi bootloop.',
      specs: 'Protokol Mode Unduhan • Parser Partisi PIT Terpadu',
    },
    {
      id: '04',
      brand: 'UNISOC / Spreadtrum (SPD)',
      badge: 'Flasher Berkas PAC',
      desc: 'Dukungan penuh arsitektur prosesor UNISOC modern (SC9863A, T606, T612, T616). Ekstraksi paket berkas PAC resmi serta flashing aman tanpa risiko kegagalan sistem bootloader.',
      specs: 'Dukungan Seri T606/T616 • Ekstraksi Berkas PAC Instan',
    },
  ]

  // 6 Fitur Unggulan Servis
  const technicianFeatures = [
    {
      num: '01',
      title: 'Deteksi Otomatis Port USB Perangkat',
      desc: 'Mendeteksi seketika saat ponsel dihubungkan melalui kabel data USB dalam mode darurat tanpa perlu membuka jendela Device Manager secara manual.',
    },
    {
      num: '02',
      title: 'Pengaman Partisi Radio & Nomor IMEI',
      desc: 'Mengunci partisi kritis (Modem, EFS, QCN, NVRAM) secara otomatis sebelum proses flashing dimulai guna mencegah risiko ponsel hilang sinyal jaringan.',
    },
    {
      num: '03',
      title: 'Pemeriksaan Integritas Berkas Firmware',
      desc: 'Setiap sektor data firmware yang akan ditulis diverifikasi keasliannya terlebih dahulu untuk memastikan tidak ada berkas corrupt yang terpasang ke memori ponsel.',
    },
    {
      num: '04',
      title: 'Antarmuka Desktop Modern & Ergonomis',
      desc: 'Dirancang khusus untuk meja kerja teknisi. Menggantikan baris perintah terminal yang rumit menjadi tombol visual intuitif yang nyaman di mata.',
    },
    {
      num: '05',
      title: '100% Mandiri Tanpa Ketergantungan Cloud',
      desc: 'Seluruh algoritma flashing dan komunikasi USB berjalan langsung di komputer lokal Anda. Servis tetap lancar saat jaringan internet bengkel terputus.',
    },
    {
      num: '06',
      title: 'Lisensi Permanen Bebas Biaya Bulanan',
      desc: 'Sistem lisensi terikat langsung pada perangkat keras komputer kerja Anda. Cukup sekali aktivasi untuk penggunaan permanen tanpa iuran langganan berkala.',
    },
  ]

  // Komparasi Head-to-Head
  const comparisons = [
    {
      feature: 'Kebutuhan Perangkat Tambahan',
      oldWay: 'Wajib membeli belasan box dan dongle fisik bernilai jutaan rupiah',
      jumptools: 'Cukup menggunakan PC Windows dan kabel data USB standar yang berkualitas',
    },
    {
      feature: 'Keamanan Sinyal & IMEI',
      oldWay: 'Rentan salah menimpa partisi radio hingga ponsel kehilangan sinyal seluler',
      jumptools: 'Proteksi otomatis mengunci partisi Modem/EFS sebelum proses eksekusi dimulai',
    },
    {
      feature: 'Manajemen Aplikasi Flasher',
      oldWay: 'Memasang puluhan software flasher pihak ketiga yang tercecer dan rawan virus',
      jumptools: 'Satu aplikasi terpadu yang menyatukan protokol resmi 4 arsitektur chipset utama',
    },
    {
      feature: 'Konektivitas & Ketergantungan Jaringan',
      oldWay: 'Macet total saat koneksi internet lambat atau kuota akun server habis',
      jumptools: '100% Bekerja mandiri secara offline langsung dari komputer meja kerja Anda',
    },
    {
      feature: 'Model Biaya & Lisensi',
      oldWay: 'Sistem sewa tahunan atau pembelian kredit server yang terus menguras keuntungan',
      jumptools: 'Lisensi permanen beli-putus tanpa biaya langganan bulanan yang membebani kas',
    },
  ]

  // 3 Langkah Alur Kerja Cepat
  const workflowSteps = [
    {
      step: '01',
      title: 'Hubungkan Ponsel & Deteksi Port',
      desc: 'Sambungkan kabel data USB ke ponsel dalam mode servis. Software otomatis mengenali chipset dan status port COM yang aktif.',
    },
    {
      step: '02',
      title: 'Pilih Berkas Firmware Resmi',
      desc: 'Arahkan paket berkas firmware yang sesuai. Sistem otomatis mencocokkan struktur partisi data dengan spesifikasi perangkat.',
    },
    {
      step: '03',
      title: 'Eksekusi Flashing & Verifikasi',
      desc: 'Tekan tombol eksekusi. Pantau bilah progres hingga tuntas 100%, lalu ponsel siap dinyalakan kembali ke kondisi normal.',
    },
  ]

  // FAQ Teknisi
  const faqs = [
    {
      q: 'Apakah JumperTools Pro membutuhkan dongle atau box perangkat keras fisik tambahan?',
      a: 'Tidak. JumperTools Pro adalah software mandiri berekstensi .EXE untuk sistem operasi Windows. Anda hanya membutuhkan PC atau Laptop Windows 64-bit dan kabel data USB standar berkualitas baik tanpa perlu membeli box hardware tambahan yang mahal.',
    },
    {
      q: 'Sistem operasi Windows versi berapa yang didukung?',
      a: 'JumperTools Pro berjalan optimal pada sistem operasi Windows 10 (64-bit) dan Windows 11 (64-bit). Diperlukan pemasangan driver resmi USB chipset (Qualcomm QDLoader Driver, MTK VCOM Driver, Samsung USB Driver, dan Spreadtrum Driver) yang dapat dipasang dengan mudah.',
    },
    {
      q: 'Bagaimana lisensi diaktifkan dan apakah ada biaya langganan bulanan?',
      a: 'Lisensi JumperTools Pro bersifat beli-putus seumur hidup tanpa biaya langganan berkala. Lisensi terikat pada ID perangkat keras (HWID) komputer meja kerja Anda dan diverifikasi secara aman secara offline.',
    },
    {
      q: 'Apakah aman digunakan untuk ponsel yang mengalami bootloop atau mati total?',
      a: 'Sangat aman. Selama komponen fisik prosesor dan memori eMMC/UFS ponsel masih dapat menerima daya serta terdeteksi pada port USB (seperti Qualcomm 9008 atau MTK Preloader/Brom), protokol pemulihan darurat JumperTools Pro dapat menulis ulang partisi sistem hingga perangkat pulih kembali.',
    },
  ]

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans antialiased selection:bg-neutral-950 selection:text-white">
      {/* ── BREADCRUMB & NAVIGASI ATAS ─────────────────────────────────── */}
      <div className="pt-24 sm:pt-28 pb-4 bg-neutral-50/70 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-500">
            <Link href="/" className="hover:text-black transition-colors font-medium">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/aplikasi" className="hover:text-black transition-colors font-medium">
              Produk &amp; Aplikasi
            </Link>
            <span>/</span>
            <span className="text-neutral-950 font-semibold">JumperTools Pro</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-950" />
            <span className="font-semibold text-neutral-950">APLIKASI DESKTOP WINDOWS (64-BIT)</span>
          </div>
        </div>
      </div>

      {/* ── HERO SALES SECTION ─────────────────────────────────────────── */}
      <section className="pt-12 sm:pt-16 pb-16 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950 text-white text-xs font-mono font-semibold mb-6 shadow-sm">
            <span>SUITE TEKNISI PONSEL PROFESIONAL</span>
          </div>

          <h1 className="heading-xl text-3xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-tight sm:leading-none mb-6 text-balance max-w-5xl mx-auto">
            Perbaikan Firmware &amp; Diagnosa Smartphone <br className="hidden sm:inline" />
            Tanpa Box Hardware Mahal
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            Software desktop Windows 64-bit untuk meja servis teknisi ponsel profesional. Menyatukan protokol resmi flashing Qualcomm, MediaTek, Samsung, dan UNISOC dalam satu aplikasi praktis dengan pengaman partisi IMEI otomatis dan 100% bekerja offline.
          </p>

          {/* DUA TOMBOL AKSI UTAMA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14 max-w-xl mx-auto">
            <a
              href={waContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-display font-bold text-sm sm:text-base text-white bg-neutral-950 hover:bg-neutral-800 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>Konsultasi &amp; Lisensi Teknisi</span>
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <Link
              href="/aplikasi/jumptools"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-neutral-800 bg-white border border-neutral-300 hover:border-black hover:bg-neutral-50 shadow-sm transition-all duration-200"
            >
              <span>Spesifikasi Modul</span>
            </Link>
          </div>

          {/* BANNER VISUAL MOCKUP RESMI (PUTIH BERSIH BERSHADOW) */}
          <div className="rounded-3xl overflow-hidden border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] max-w-6xl mx-auto mb-12 bg-white">
            <img
              src="/screenshots/jumptools/header.jpg"
              alt="JumperTools Pro Banner Resmi"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 4 STATS GRID KEUNGGULAN UTAMA */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
            <div className="p-3 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-3">
                01
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">4 Protokol</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Multi-Chipset Terintegrasi</div>
            </div>
            <div className="p-3 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-3">
                02
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Aman Sinyal</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Proteksi Kunci Partisi IMEI</div>
            </div>
            <div className="p-3 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-3">
                03
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">100% Offline</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Mandiri Tanpa Internet</div>
            </div>
            <div className="p-3 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-3">
                04
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Beli Putus</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Nol Biaya Sewa Bulanan</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KERESAHAN NYATA TEKNISI (PAIN POINTS) ───────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-950 text-white mb-3 inline-block">
              TANTANGAN MEJA KERJA
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              Keresahan Nyata yang Dihadapi Teknisi Servis
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Penanganan perbaikan software ponsel sering kali terhambat oleh kerumitan alat dan tingginya biaya yang harus dikeluarkan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {painPoints.map((point, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-xs font-bold text-neutral-400 mb-2">
                    MASALAH 0{idx + 1}
                  </div>
                  <h3 className="heading-lg text-lg sm:text-xl text-neutral-950 mb-3 font-bold">
                    {point.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed font-sans">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 PILAR PROTOKOL CHIPSET TERINTEGRASI ────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-300 mb-3 inline-block">
              ARSITEKTUR MULTI-CHIPSET
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              4 Protokol Flashing Utama dalam Satu Aplikasi
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Mengeliminasi keharusan memasang puluhan program terpisah. Seluruh protokol resmi disatukan dalam satu aplikasi desktop yang stabil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {chipsetPillars.map((chip) => (
              <div
                key={chip.id}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:border-neutral-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-mono text-2xl font-extrabold text-neutral-400">
                      {chip.id}
                    </span>
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-neutral-950 text-white">
                      {chip.badge}
                    </span>
                  </div>

                  <h3 className="heading-lg text-xl sm:text-2xl text-neutral-950 mb-3 font-bold">
                    {chip.brand}
                  </h3>

                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                    {chip.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 font-mono text-xs text-neutral-500 font-semibold">
                  {chip.specs}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 FITUR UNGGULAN SERVIS ─────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-950 text-white mb-3 inline-block">
              KEAMANAN MEJA KERJA
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              Dirancang untuk Melindungi Ponsel Pelanggan
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Mencegah risiko kerusakan permanen pada ponsel pelanggan dengan menghadirkan sistem verifikasi dan penguncian partisi otomatis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {technicianFeatures.map((feat) => (
              <div
                key={feat.num}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:border-neutral-400 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-5 shadow-sm">
                  {feat.num}
                </div>
                <h3 className="heading-lg text-lg text-neutral-950 mb-2 font-bold">
                  {feat.title}
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 LANGKAH ALUR KERJA CEPAT ──────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-300 mb-3 inline-block">
              ALUR KERJA PRAKTIS
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              3 Langkah Standar Penanganan Perbaikan
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Alur kerja terstruktur untuk mempercepat antrean servis di konter reparasi Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {workflowSteps.map((wf) => (
              <div
                key={wf.step}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] text-center relative"
              >
                <div className="font-mono text-3xl font-extrabold text-neutral-300 mb-4">
                  {wf.step}
                </div>
                <h3 className="heading-lg text-lg text-neutral-950 mb-3 font-bold">
                  {wf.title}
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {wf.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KOMPARASI HEAD-TO-HEAD (CARA LAMA VS JUMPTOOLS PRO) ─────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-neutral-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-950 text-white mb-3 inline-block">
              KOMPARASI MEJA SERVIS
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              Alat Konvensional vs JumperTools Pro
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Perbandingan nyata efisiensi dan keamanan operasional servis antara cara konvensional dengan solusi terintegrasi.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] divide-y divide-neutral-100 overflow-hidden">
            {comparisons.map((c, idx) => (
              <div key={idx} className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-4">
                  <span className="text-xs font-mono font-bold text-neutral-400 block mb-1">ASPEK 0{idx + 1}</span>
                  <div className="font-display font-bold text-base text-neutral-950">{c.feature}</div>
                </div>
                <div className="lg:col-span-4 text-xs sm:text-sm text-neutral-500 font-sans">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 mb-1 font-semibold">Alat Konvensional</div>
                  {c.oldWay}
                </div>
                <div className="lg:col-span-4 text-xs sm:text-sm text-neutral-950 font-medium font-sans">
                  <div className="text-[11px] font-mono uppercase text-neutral-950 mb-1 font-bold">JumperTools Pro</div>
                  {c.jumptools}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ TEKNISI ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-14">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-950 text-white mb-3 inline-block">
              FAQ TEKNISI
            </span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3 tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Jawaban ringkas dan faktual mengenai pengoperasian software dan aktivasi lisensi.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-neutral-50/70 rounded-2xl p-6 sm:p-7 border border-neutral-200/80 shadow-sm"
              >
                <h3 className="font-display font-bold text-base sm:text-lg text-neutral-950 mb-2">
                  {faq.q}
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA PENUTUP (KONTAK & LISENSI) ───────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
            Siap Mengoptimalkan Meja Kerja Servis Anda?
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Dapatkan akses software mandiri untuk kemudahan penanganan firmware ponsel dengan dukungan teknis langsung dari pengembang.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
            <a
              href={waContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-display font-bold text-sm sm:text-base text-white bg-neutral-950 hover:bg-neutral-800 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>Hubungi Pengembang via WhatsApp</span>
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href={devMailUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-neutral-800 bg-white border border-neutral-300 hover:border-black hover:bg-neutral-50 shadow-sm transition-all duration-200"
            >
              <span>Kirim Pesan Email</span>
            </a>
          </div>

          <div className="text-xs font-mono text-neutral-500">
            Dukungan Resmi Pengembang Tunggal FokusKonten (Muhari) • Bebas Biaya Langganan Bulanan
          </div>
        </div>
      </section>
    </div>
  )
}
