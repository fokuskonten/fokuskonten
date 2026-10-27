import Link from 'next/link'

export const metadata = {
  title: 'FokusKonten ReImage Pro — Software Kompresi Gambar Massal Cepat & Presisi',
  description: 'Software desktop Windows x64 native untuk optimasi kompresi gambar massal, batas ukuran file presisi, dan konversi format WebP, JPEG, dan PNG tanpa penurunan mutu visual.',
  alternates: { canonical: 'https://fokuskonten.my.id/landpage/reimage/' },
  openGraph: {
    title: 'FokusKonten ReImage Pro — Mesin Kompresi Gambar Desktop Windows',
    description: 'Software desktop Windows x64 native untuk optimasi kompresi gambar massal, reduksi byte presisi, dan konversi format WebP/JPG/PNG berkecepatan tinggi.',
    images: [{ url: '/screenshots/reimage/rock_dove_circle.png', width: 1024, height: 1024, alt: 'FokusKonten ReImage Pro Totem Rock Dove' }],
  },
}

export default function ReImageDedicatedLandingPage() {
  const waContactUrl = `https://wa.me/6285183011318?text=${encodeURIComponent('Halo FokusKonten,\n\nSaya tertarik dengan software desktop *FokusKonten ReImage Pro* (Proyek Berjalan / Early Access Preview).\nMohon info mengenai pengujian performa dan akses lisensi rilis pratinjaunya.')}`
  const devMailUrl = 'mailto:admin@fokuskonten.my.id?subject=Inquiry%20FokusKonten%20ReImage%20Pro%20Early%20Access'

  // 4 Keresahan Nyata Pengguna
  const painPoints = [
    {
      title: 'Foto Produk Ditolak Marketplace Akibat Terlalu Besar',
      desc: 'Formulir unggahan Shopee, Tokopedia, atau formulir web sering menolak foto resolusi tinggi karena melebihi batas maksimal ukuran berkas per foto.',
    },
    {
      title: 'Kompresi Online Biasa Menghancurkan Ketajaman Gambar',
      desc: 'Banyak website kompresi gambar gratisan yang memangkas kualitas secara agresif sehingga teks label produk menjadi buram dan warna foto tampak pudar.',
    },
    {
      title: 'Terbebani Biaya Sewa API Cloud & Langganan Bulanan',
      desc: 'Layanan optimasi gambar berbasis cloud memungut biaya langganan bulanan atau bayar per gambar yang membebani anggaran operasional toko online Anda.',
    },
    {
      title: 'Kerahasiaan Foto Terancam Karena Diunggah ke Internet',
      desc: 'Mengunggah ratusan foto aset berharga atau dokumen privat ke server pihak ketiga rentan terhadap kebocoran data dan ketergantungan koneksi internet.',
    },
  ]

  // 6 Preset Komersial Faktual
  const commercialPresets = [
    {
      id: '01',
      title: 'Shopee & Marketplace',
      format: 'JPEG / WebP',
      spec: 'Rasio 1:1 • Ukuran di Bawah 300 KB',
      desc: 'Diformulasikan khusus untuk memenuhi standar algoritma pencarian Shopee dan Tokopedia. Gambar produk tetap tajam dengan waktu muat cepat.',
    },
    {
      id: '02',
      title: 'E-Commerce & Website',
      format: 'WebP Ringan',
      spec: 'Kualitas 75% • Reduksi Hingga 85%',
      desc: 'Optimalisasi gambar untuk website toko online. Mempercepat skor Google PageSpeed dan memangkas konsumsi bandwidth server.',
    },
    {
      id: '03',
      title: 'Instagram Feed & Grafis',
      format: 'JPEG Spektrum Tinggi',
      spec: 'Preservasi Warna • Detail Visual Utuh',
      desc: 'Mempertahankan ketajaman teks dan saturasi warna grafis agar tidak buram saat diunggah ke media sosial.',
    },
    {
      id: '04',
      title: 'Batas Ukuran Presisi (Target Size)',
      format: 'Batas Ukuran Otomatis',
      spec: 'Contoh: Tepat di Bawah 300 KB / 1 MB',
      desc: 'Fitur presisi otomatis yang mengompresi gambar massal agar tepat berada di bawah kuota maksimal unggahan formulir pendaftaran.',
    },
    {
      id: '05',
      title: 'Lampiran Email & Dokumen',
      format: 'JPEG Hemat Ruang',
      spec: 'Batas Ukuran di Bawah 200 KB',
      desc: 'Solusi untuk dokumen presentasi dan lampiran email massal agar tidak melebihi kuota penerimaan server surat elektronik kantor.',
    },
    {
      id: '06',
      title: 'Arsip Grafis Kualitas Utuh (Lossless)',
      format: 'PNG & WebP Lossless',
      spec: '100% Tanpa Penurunan Kualitas Piksel',
      desc: 'Optimasi struktur berkas PNG dan aset logo berlatar transparan dengan pengurangan ukuran tanpa membuang satu piksel warna pun.',
    },
  ]

  // Roadmap Transparansi Proyek Berjalan
  const roadmapStages = [
    {
      step: '01',
      title: 'Mesin Pemroses Berkecepatan Tinggi',
      status: 'Selesai 100%',
      statusBadge: 'SELESAI',
      desc: 'Penyusunan mesin biner native 64-bit dengan pemrosesan paralel multi-inti prosesor dan isolasi memori mandiri tanpa kebocoran memori.',
    },
    {
      step: '02',
      title: 'Antarmuka Desktop & Lisensi Offline',
      status: 'Selesai 100%',
      statusBadge: 'SELESAI',
      desc: 'Pembangunan antarmuka kerja Windows modern, sistem antrean drag-and-drop, pratinjau komparasi visual, serta verifikasi lisensi offline permanen.',
    },
    {
      step: '03',
      title: 'Pengujian Beban Massal & Kalibrasi',
      status: 'Tahap Berjalan',
      statusBadge: 'AKTIF',
      desc: 'Siklus pengujian fisik pada ribuan aset gambar produk e-commerce untuk memastikan kestabilan konsumsi memori dan ketajaman visual.',
    },
    {
      step: '04',
      title: 'Rilis Pratinjau Terbuka (Public Preview)',
      status: 'Fase Berikutnya',
      statusBadge: 'SEGERA',
      desc: 'Penyediaan berkas installer mandiri Windows, pendaftaran lisensi pengguna awal, serta integrasi panduan pengoperasian teknis.',
    },
  ]

  // 4 Pilar Arsitektur Faktual
  const techPillars = [
    {
      num: '01',
      title: 'Pemrosesan Paralel Multi-Inti',
      desc: 'Memanfaatkan seluruh inti prosesor komputer secara seimbang sehingga antarmuka tetap lancar tanpa macet saat memproses ratusan foto sekaligus.',
    },
    {
      num: '02',
      title: 'Batas Ukuran Berkas Presisi',
      desc: 'Cukup tentukan batas maksimal ukuran berkas yang diinginkan (misal 300 KB), dan sistem akan mencari titik kompresi optimal secara otomatis.',
    },
    {
      num: '03',
      title: '100% Mandiri & Privasi Aman',
      desc: 'Seluruh proses pengolahan gambar berlangsung di komputer Anda sendiri. Nol unggahan data ke server cloud, menjamin keamanan master foto privat Anda.',
    },
    {
      num: '04',
      title: 'Lisensi Permanen Tanpa Iuran Bulanan',
      desc: 'Kunci lisensi resmi melekat pada komputer Windows Anda tanpa kewajiban koneksi internet konstan. Sekali aktivasi aktif selamanya tanpa biaya sewa.',
    },
  ]

  // Komparasi Head-to-Head
  const comparisons = [
    {
      feature: 'Metode Pengolahan',
      oldWay: 'Wajib unggah berkas satu per satu ke website pihak ketiga, lambat dan kuota internet cepat habis',
      reimage: 'Pengolahan massal ratusan foto langsung di komputer lokal secara instan tanpa internet',
    },
    {
      feature: 'Ketajaman & Kualitas Foto',
      oldWay: 'Penurunan mutu visual sering kali drastis, teks label menjadi kabur dan warna foto pudar',
      reimage: 'Preset terkalibrasi khusus untuk menjaga ketajaman visual dengan reduksi byte maksimal',
    },
    {
      feature: 'Batas Maksimal Ukuran File',
      oldWay: 'Harus mencoba berkali-kali secara manual dengan mengubah persentase kualitas yang tidak pasti',
      reimage: 'Tentukan target ukuran (misal 300 KB), sistem otomatis menyesuaikan hingga tepat di bawah batas',
    },
    {
      feature: 'Kerahasiaan Data & Privasi',
      oldWay: 'Master aset foto pribadi dan data kantor tersimpan sementara di server luar yang tidak dikenal',
      reimage: '100% Privat di harddisk sendiri, tanpa ada satu byte gambar pun yang dikirim keluar',
    },
    {
      feature: 'Biaya Langganan & Batasan',
      oldWay: 'Dibatasi kuota gratis harian, wajib bayar sewa bulanan jika ingin kompresi file dalam jumlah banyak',
      reimage: 'Lisensi beli-putus seumur hidup untuk penggunaan tanpa batas di komputer kerja Anda',
    },
  ]

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans antialiased selection:bg-neutral-950 selection:text-white">
      {/* ── BREADCRUMB & STATUS PROYEK BERJALAN ─────────────────────────── */}
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
            <span className="text-neutral-950 font-semibold">ReImage Pro</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-950" />
            <span className="font-semibold text-neutral-950">PROYEK BERJALAN • EARLY ACCESS PREVIEW</span>
          </div>
        </div>
      </div>

      {/* ── HERO SALES SECTION ─────────────────────────────────────────── */}
      <section className="pt-12 sm:pt-16 pb-16 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-300 text-xs font-mono font-bold text-neutral-950 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-neutral-950" />
            <span>SOFTWARE DESKTOP WINDOWS (64-BIT)</span>
          </div>

          <h1 className="heading-xl text-3xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-tight sm:leading-none mb-6 text-balance max-w-5xl mx-auto">
            Kompresi Gambar Massal Cepat &amp; Presisi <br className="hidden sm:inline" />
            Tanpa Penurunan Mutu Visual
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            Software desktop Windows 64-bit untuk optimasi gambar produk e-commerce, website toko online, dan lampiran dokumen kantor. Kompresi ratusan foto sekaligus secara mandiri di komputer sendiri tanpa biaya langganan cloud.
          </p>

          {/* DUA TOMBOL AKSI UTAMA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14 max-w-xl mx-auto">
            <a
              href={waContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-display font-bold text-sm sm:text-base text-white bg-neutral-950 hover:bg-neutral-800 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>Daftar Pengujian Beta via WhatsApp</span>
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href="#roadmap"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-neutral-800 bg-white border border-neutral-300 hover:border-black hover:bg-neutral-50 shadow-sm transition-all duration-200"
            >
              <span>Lihat Tahapan Proyek</span>
            </a>
          </div>

          {/* SASIS MOCKUP RESMI (PUTIH BERSIH BERSHADOW HALUS) */}
          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] bg-white mb-12 text-left">
            {/* Titlebar Bersih Monokrom */}
            <div className="px-5 py-3.5 bg-neutral-50 border-b border-neutral-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white p-0.5 border border-neutral-300 shrink-0">
                  <img
                    src="/screenshots/reimage/rock_dove_circle.png"
                    alt="FokusKonten ReImage Maskot Rock Dove"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-mono text-xs font-semibold text-neutral-900 tracking-wide">
                  FokusKonten ReImage Pro — Image Optimizer Utility (win-x64)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 inline-block" />
              </div>
            </div>

            {/* Konten Dashboard Sasis Bersih */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* 4 Kartu KPI Hasil Uji */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                  <span className="text-[11px] font-mono font-bold text-neutral-500 block mb-1">TOTAL ANTREAN</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-neutral-950">1.250 File</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                  <span className="text-[11px] font-mono font-bold text-neutral-500 block mb-1">UKURAN ASLI</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-neutral-700">4,85 GB</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                  <span className="text-[11px] font-mono font-bold text-neutral-500 block mb-1">HASIL OPTIMASI</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-neutral-950">820 MB</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                  <span className="text-[11px] font-mono font-bold text-neutral-500 block mb-1">PENGHEMATAN</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-neutral-950">83,1%</span>
                </div>
              </div>

              {/* Rincian Operasi Faktual */}
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200 text-xs font-mono text-neutral-600">
                  <span className="font-semibold text-neutral-950">Status: Pemrosesan Paralel Multi-Inti Aktif</span>
                  <span>Kecepatan Rata-Rata: 42 Foto / Detik</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-mono font-bold text-neutral-400 block mb-1">MODE OPTIMASI</span>
                    <p className="font-semibold text-neutral-950">Batas Ukuran Presisi (&lt; 300 KB)</p>
                    <p className="text-neutral-500 mt-0.5">Mempertahankan ketajaman visual foto produk.</p>
                  </div>
                  <div>
                    <span className="font-mono font-bold text-neutral-400 block mb-1">FORMAT KELUARAN</span>
                    <p className="font-semibold text-neutral-950">WebP Ringan &amp; JPEG Standar</p>
                    <p className="text-neutral-500 mt-0.5">Struktur subfolder dan metadata dipertahankan utuh.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 STATS GRID KEUNGGULAN UTAMA */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
            <div className="p-3 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-3">
                01
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Multi-Inti</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Pemrosesan Paralel Cepat</div>
            </div>
            <div className="p-3 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-3">
                02
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Presisi Byte</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Batas Ukuran Target Otomatis</div>
            </div>
            <div className="p-3 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-3">
                03
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">100% Offline</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Privasi Aman di Komputer Sendiri</div>
            </div>
            <div className="p-3 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-3">
                04
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Beli Putus</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Nol Biaya Langganan Bulanan</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── KERESAHAN NYATA PENGGUNA (PAIN POINTS) ───────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-950 text-white mb-3 inline-block">
              TANTANGAN PENGELOLAAN GAMBAR
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              Masalah yang Sering Terjadi Saat Mengoptimasi Foto
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Memproses ribuan foto produk secara manual menggunakan tool online memakan banyak waktu dan sering kali menurunkan mutu visual.
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

      {/* ── 6 PRESET KOMERSIAL FAKTUAL ──────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-300 mb-3 inline-block">
              PRESET SIAP PAKAI
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              6 Pilihan Optimasi Sesuai Kebutuhan Anda
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Dikalibrasi secara tepat untuk kebutuhan e-commerce, website toko online, media sosial, hingga arsip grafis beresolusi tinggi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {commercialPresets.map((preset) => (
              <div
                key={preset.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:border-neutral-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-mono text-xl font-bold text-neutral-400">{preset.id}</span>
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-300">
                      {preset.format}
                    </span>
                  </div>

                  <h3 className="heading-lg text-lg text-neutral-950 mb-2 font-bold">{preset.title}</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-4 font-sans">{preset.desc}</p>
                </div>

                <div className="pt-3 border-t border-neutral-100 font-mono text-xs text-neutral-500 font-semibold">
                  {preset.spec}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 PILAR KEUNGGULAN SOFTWARE ─────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-950 text-white mb-3 inline-block">
              KEUNGGULAN UTAMA
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              Arsitektur Komputasi Mandiri Tanpa Server Luar
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Seluruh proses konversi dan kompresi berjalan langsung di komputer Anda tanpa memerlukan sambungan internet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {techPillars.map((tp) => (
              <div
                key={tp.num}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-4 shadow-sm">
                  {tp.num}
                </div>
                <h3 className="heading-lg text-lg text-neutral-950 mb-2 font-bold">{tp.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed font-sans">{tp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: ROADMAP TRANSPARANSI PROYEK BERJALAN ──────────────── */}
      <section id="roadmap" className="py-20 sm:py-24 border-b border-neutral-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-300 mb-3 inline-block">
              TRANSPARANSI PRODUK
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              Tahapan Pengembangan FokusKonten ReImage Pro
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Software ini saat ini berada pada tahap pengujian performa beban kerja massal sebelum rilis umum resmi dibuka.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapStages.map((stage) => (
              <div
                key={stage.step}
                className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-2xl font-bold text-neutral-300">{stage.step}</span>
                    <span className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-300">
                      {stage.statusBadge}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-neutral-950 mb-2">{stage.title}</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans">{stage.desc}</p>
                </div>

                <div className="pt-4 border-t border-neutral-100 text-xs font-mono font-semibold text-neutral-500 mt-4">
                  Status: {stage.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KOMPARASI HEAD-TO-HEAD (CARA LAMA VS REIMAGE PRO) ───────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-neutral-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-950 text-white mb-3 inline-block">
              KOMPARASI EFISIENSI
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              Tool Online Biasa vs FokusKonten ReImage Pro
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Perbandingan efisiensi waktu, kualitas gambar, dan keamanan data antara tool online biasa dengan software native lokal.
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
                  <div className="text-[11px] font-mono uppercase text-neutral-400 mb-1 font-semibold">Tool Online Biasa</div>
                  {c.oldWay}
                </div>
                <div className="lg:col-span-4 text-xs sm:text-sm text-neutral-950 font-medium font-sans">
                  <div className="text-[11px] font-mono uppercase text-neutral-950 mb-1 font-bold">ReImage Pro</div>
                  {c.reimage}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA PENUTUP (PROGRAM BETA & KONTAK) ─────────────────────────── */}
      <section className="py-20 sm:py-24 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
            Ingin Menguji Coba FokusKonten ReImage Pro?
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Bergabunglah dalam program pratinjau awal (Early Access Preview) untuk menguji performa pengolahan gambar massal di komputer Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
            <a
              href={waContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-display font-bold text-sm sm:text-base text-white bg-neutral-950 hover:bg-neutral-800 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>Daftar Pengujian Beta via WhatsApp</span>
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href={devMailUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-neutral-800 bg-white border border-neutral-300 hover:border-black hover:bg-neutral-50 shadow-sm transition-all duration-200"
            >
              <span>Kirim Pertanyaan via Email</span>
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
