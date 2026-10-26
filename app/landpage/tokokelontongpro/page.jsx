import Link from 'next/link'

export const metadata = {
  title: 'Kelontong Pro — Software Kasir Toko Sembako & Minimarket Android Offline',
  description: 'Aplikasi kasir toko kelontong, sembako, dan minimarket Android resmi. Konversi multi-satuan dus ke renceng/pcs otomatis, scan barcode kamera kilat, cetak struk bluetooth, dan catat utang pelanggan 100% offline tanpa iuran bulanan.',
  alternates: { canonical: 'https://fokuskonten.my.id/landpage/tokokelontongpro' },
  openGraph: {
    title: 'Kelontong Pro — Solusi Cerdas Kasir Toko Kelontong Modern',
    description: 'Stop rugi karena stok selisih! Kelontong Pro mencatat penjualan kilat, multi-satuan otomatis, dan cetak struk tanpa perlu kuota internet.',
    images: [{ url: '/screenshots/tokokelontongpro/Kelontong_Pro_Feature_Graphic_1024x500.jpg', width: 1024, height: 500, alt: 'Kelontong Pro Feature Graphic' }],
  },
}

export default function TokoKelontongProDedicatedSalesPage() {
  const waOrderUrl = 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20mau%20pesan%20Lisensi%20Resmi%20Kelontong%20Pro%20(Paket%20Enterprise%20Lifetime)'
  const waConsultUrl = 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20mau%20tanya%20seputar%20fitur%20dan%20cara%20pengujian%20Kelontong%20Pro'
  const googleGroupUrl = 'https://groups.google.com/g/penguji-fokuskonten'
  const playStoreTestingUrl = 'https://play.google.com/apps/testing/com.fokuskonten.kelontongpro'
  const apkDownloadUrl = 'https://github.com/fokuskonten/fokuskonten/releases/download/apps-v1.0/Kelontong_Pro_v1.0.0.apk'

  const painPoints = [
    {
      num: '01',
      title: 'Kulakan Dus Jual Eceran, Margin Bocor',
      desc: 'Kulakan 1 Karton mie atau kopi, lalu dijual campur antara rencengan dan eceran. Di akhir bulan uang kas tidak klop dengan sisa barang karena hitungan modal manual sering meleset.',
    },
    {
      num: '02',
      title: 'Antrean Kasir Macet Saat Toko Ramai',
      desc: 'Pembeli menumpuk di depan warung, kasir sibuk memencet kalkulator dan mencari harga barang di ingatan. Pembeli tidak sabar dan akhirnya batal belanja.',
    },
    {
      num: '03',
      title: 'Catatan Bon & Utang Pembeli Tercecer',
      desc: 'Buku catatan utang sobek, terselip, atau lupa dicatat saat pelanggan berhutang. Akhirnya piutang warung menumpuk dan modal kerja Anda macet.',
    },
    {
      num: '04',
      title: 'Kasir Online Mati Saat Listrik Padam',
      desc: 'Software kasir online di luaran langsung lumpuh saat mati lampu atau kuota internet habis, membuat pelayanan warung terhenti total.',
    },
  ]

  const modules = [
    {
      title: '1. Kasir POS Kilat & Scan Barcode Kamera',
      desc: 'Pindai barcode kemasan produk secara instan menggunakan kamera handphone Anda tanpa perlu beli alat scanner mahal. Total belanja dan uang kembalian dihitung otomatis dalam 1 detik.',
      img: '/screenshots/tokokelontongpro/02_Kasir_POS_Penjualan.png',
    },
    {
      title: '2. Multi-Satuan Dinamis (Dus, Renceng, Pcs)',
      desc: 'Atur rasio kemasan bertingkat dengan mudah (1 Dus = 10 Renceng = 100 Sachet). Kasir bebas memilih satuan jual, dan stok gudang otomatis terpotong akurat hingga satuan terkecil.',
      img: '/screenshots/tokokelontongpro/03_Manajemen_Stok_dan_Produk.png',
    },
    {
      title: '3. Manajemen Buku Utang & Piutang Pelanggan',
      desc: 'Catat nama pelanggan yang berhutang saat checkout dalam satu klik. Pantau sisa tagihan, tanggal jatuh tempo, dan rekam riwayat cicilan pelunasan secara rapi tanpa buku kertas.',
      img: '/screenshots/tokokelontongpro/07_Master_Relasi_dan_SDM.png',
    },
    {
      title: '4. Cetak Struk Nota Bluetooth & Format WhatsApp',
      desc: 'Cetak nota struk fisik menggunakan printer thermal bluetooth (58mm/80mm) berlogo warung Anda, atau bagikan bukti belanja digital langsung ke nomor WhatsApp pembeli.',
      img: '/screenshots/tokokelontongpro/10_Riwayat_Transaksi.png',
    },
    {
      title: '5. Stock Opname Cepat & Koreksi Selisih Barang',
      desc: 'Sesuaikan jumlah stok nyata di rak warung dengan angka sistem secara berkala. Sistem mencatat log koreksi secara otomatis untuk mencegah pencurian barang di toko.',
      img: '/screenshots/tokokelontongpro/05_Stok_dan_Inventaris.png',
    },
    {
      title: '6. Rekap Omzet, Laba Bersih & Arus Kas Harian',
      desc: 'Tutup buku kasir harian semudah satu sentuhan layar. Ketahui total uang masuk, modal barang terjual, dan keuntungan bersih Anda hari ini secara transparan.',
      img: '/screenshots/tokokelontongpro/08_Laporan_Keuangan.png',
    },
  ]

  const comparison = [
    {
      feature: 'Kecepatan Transaksi',
      oldWay: 'Hitung manual di kalkulator, antrean lambat',
      kelontongPro: 'Scan barcode kamera kilat 1 detik',
    },
    {
      feature: 'Pecah Satuan Dus ke Ecer',
      oldWay: 'Hitung manual di kepala, rawan tekor margin',
      kelontongPro: 'Konversi multi-satuan otomatis terintegrasi',
    },
    {
      feature: 'Ketergantungan Internet',
      oldWay: 'Kasir online error saat sinyal lemot',
      kelontongPro: '100% Offline-First aman di perangkat Anda',
    },
    {
      feature: 'Pencatatan Utang Bon',
      oldWay: 'Buku tulis kertas, sering sobek dan lupa',
      kelontongPro: 'Tercatat otomatis di profil pelanggan',
    },
    {
      feature: 'Biaya Pemakaian',
      oldWay: 'Biaya sewa langganan ratusan ribu per bulan',
      kelontongPro: 'Sekali bayar aktif permanen seumur hidup',
    },
  ]

  const faqs = [
    {
      q: 'Apakah warung saya butuh koneksi internet untuk memakai Kelontong Pro?',
      a: 'Tidak butuh sama sekali. Kelontong Pro beroperasi 100% offline. Seluruh data stok, transaksi penjualan, dan pencatatan utang tersimpan aman di dalam handphone atau tablet kasir Anda.',
    },
    {
      q: 'Apakah bisa menggunakan printer kasir Bluetooth?',
      a: 'Sangat bisa. Kelontong Pro kompatibel dengan semua merek printer thermal Bluetooth ukuran 58mm dan 80mm standar pasar. Cukup sambungkan via Bluetooth dan cetak struk instan.',
    },
    {
      q: 'Bagaimana cara scan barcode barang?',
      a: 'Aplikasi sudah dilengkapi fitur scan barcode bawaan menggunakan kamera handphone atau tablet Anda. Anda juga bisa menyambungkan scanner barcode USB/Bluetooth jika diinginkan.',
    },
    {
      q: 'Apa keuntungan Lisensi Resmi Enterprise Lifetime?',
      a: 'Versi gratis membatasi hingga 100 jenis produk. Dengan Lisensi Enterprise Sekali Bayar, Anda bisa memasukkan ribuan jenis barang sembako tanpa batas, multi-kasir shift, dan bebas biaya bulanan selamanya.',
    },
    {
      q: 'Bagaimana jika handphone saya hilang atau rusak?',
      a: 'Anda bisa mencadangkan (backup) data warung Anda ke Google Drive pribadi atau memori SD Card kapan saja. Data dapat dipulihkan ke handphone baru dalam hitungan detik.',
    },
  ]

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans antialiased">

      {/* ── HERO SALES SECTION ─────────────────────────────────────────── */}
      <section className="pt-28 pb-16 bg-white border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-6 border border-emerald-200">
            <span>Aplikasi Android Khusus Sembako &amp; Retail</span>
            <span className="text-emerald-300">•</span>
            <span>100% Offline Tanpa Kuota Bulanan</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight leading-tight sm:leading-none mb-6">
            Kasir Warung &amp; Toko Sembako Kilat <br />
            Beli Dus Jual Renceng, Bebas Iuran Bulanan!
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
            Software kasir POS toko kelontong cerdas: scan barcode kamera instan, konversi multi-satuan dus ke eceran otomatis, catat bon utang pembeli rapi, dan cetak struk bluetooth tanpa perlu kuota internet.
          </p>

          {/* Dual Action Buttons Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href={googleGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-white bg-black hover:bg-neutral-800 shadow-md shadow-black/20 transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.326 1.973C1.256 2.294 1.22 2.634 1.22 3v18c0 .366.036.706.106 1.027L12 12 1.326 1.973zm.905-.642l11.17 10.736L23.723 3.38c-.443-.269-1-.43-1.607-.43H4.202c-.717 0-1.356.248-1.971.38zM23.66 4.797L13.334 15.05l5.914 5.686 4.02-3.878c.442-.374.732-.932.732-1.558V6.19c0-.515-.121-1-.34-1.394zM12 13.14L1.628 22.21A3.573 3.573 0 004.202 23h15.596c.46 0 .893-.112 1.28-.31L18.87 19.87 12 13.14z"/>
              </svg>
              Gabung Pengujian Resmi Google Play
            </a>
            <a
              href={apkDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-base text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 transition-all"
            >
              <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Unduh File APK Langsung
            </a>
          </div>

          {/* Banner Feature Graphic */}
          <div className="rounded-3xl overflow-hidden border border-neutral-200/80 shadow-card max-w-4xl mx-auto mb-10 bg-neutral-950">
            <img
              src="/screenshots/tokokelontongpro/Kelontong_Pro_Feature_Graphic_1024x500.jpg"
              alt="Kelontong Pro Banner Resmi"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 4 Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950">100%</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Offline Tanpa Kuota</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950">1 Detik</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Scan Barcode Cepat</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950">Multi-Satuan</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Dus / Renceng / Pcs</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950">Rp 0</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Bebas Iuran Bulanan</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── PAIN POINTS SECTION ────────────────────────────────────────── */}
      <section className="py-16 bg-neutral-50/60 border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 mb-3">
              Kendala Klasik yang Bikin Warung Kelontong Tekor
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base">
              Menghitung manual di ingatan atau memakai software sewa bulanan yang ribet sering membuat pemilik toko kelontong kelelahan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {painPoints.map((item) => (
              <div key={item.num} className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-start gap-4">
                <span className="font-mono text-xl font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-lg shrink-0">
                  {item.num}
                </span>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 mb-1.5">{item.title}</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DETAILED MODULES & SCREENSHOTS ──────────────────────────────── */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Fitur Toko Lengkap
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 mt-4 mb-3">
              Solusi Cerdas Kasir &amp; Inventaris Warung Sembako
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base">
              Didesain praktis agar kasir keluarga atau karyawan toko bisa langsung menggunakannya tanpa perlu pelatihan rumit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((m, idx) => (
              <div key={idx} className="rounded-3xl border border-neutral-200 overflow-hidden bg-neutral-50 shadow-sm hover:shadow-md transition-all">
                <div className="p-6 bg-white border-b border-neutral-100">
                  <h3 className="text-lg font-bold text-neutral-950 mb-2">{m.title}</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">{m.desc}</p>
                </div>
                <div className="p-4 bg-neutral-100/50 flex justify-center">
                  <img src={m.img} alt={m.title} className="w-full max-h-[320px] object-contain rounded-xl shadow-inner border border-neutral-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON SECTION ─────────────────────────────────────────── */}
      <section className="py-16 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 mb-3">
              Perbandingan: Cara Lama vs Kelontong Pro
            </h2>
            <p className="text-neutral-600 text-sm">Kemudahan operasional toko dengan sistem kasir mandiri seumur hidup.</p>
          </div>

          <div className="space-y-4">
            {comparison.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-semibold text-neutral-900 text-sm sm:w-1/3">{item.feature}</span>
                <div className="flex-1 text-xs sm:text-sm text-neutral-500 line-through sm:pr-4">{item.oldWay}</div>
                <div className="flex-1 text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  {item.kelontongPro}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING & LIFETIME UPGRADE ──────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
            Pilihan Paket
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 mt-4 mb-3">
            Pakai Gratis Dulu, Upgrade Sekali Seumur Hidup
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto mb-10">
            Mulai kelola 100 produk pertama Anda secara gratis. Buka kunci unlimited kapan pun toko Anda siap melompat lebih besar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
            {/* Free Tier */}
            <div className="p-8 rounded-3xl border border-neutral-200 bg-neutral-50/50">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Uji Coba Toko</span>
              <h3 className="text-2xl font-bold text-neutral-950 mt-1 mb-2">Versi Starter</h3>
              <div className="text-3xl font-extrabold text-neutral-950 mb-4">Rp 0 <span className="text-xs text-neutral-400 font-normal">/ Gratis</span></div>
              <p className="text-xs text-neutral-600 mb-6">Cocok untuk toko kecil yang baru memulai pencatatan kasir digital.</p>
              <ul className="space-y-2.5 text-xs text-neutral-700 mb-8">
                <li className="flex items-center gap-2 font-medium">Batas Maksimal 100 Item Barang</li>
                <li className="flex items-center gap-2 font-medium">1 Perangkat Kasir Aktif</li>
                <li className="flex items-center gap-2 font-medium">100% Offline Tanpa Kuota Internet</li>
                <li className="flex items-center gap-2 font-medium">Cetak Struk Thermal Bluetooth</li>
              </ul>
              <a
                href={apkDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-3 rounded-xl font-bold text-xs text-neutral-800 bg-white border border-neutral-300 hover:border-neutral-900 transition-all"
              >
                Download Gratis Sekarang
              </a>
            </div>

            {/* Enterprise Tier */}
            <div className="p-8 rounded-3xl border-2 border-black bg-white shadow-xl relative">
              <div className="absolute -top-3.5 right-6 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold tracking-wide">
                PROMO PERDANA
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Akses Penuh</span>
              <h3 className="text-2xl font-bold text-neutral-950 mt-1 mb-2">Enterprise Lifetime</h3>
              <div className="text-3xl font-extrabold text-neutral-950 mb-1">Rp 149.000</div>
              <div className="text-xs text-neutral-400 line-through mb-4">Harga Normal: Rp 299.000</div>
              <p className="text-xs text-neutral-600 mb-6">Sekali bayar aktif permanen seumur hidup. Tanpa iuran bulanan selamanya.</p>
              <ul className="space-y-2.5 text-xs text-neutral-900 mb-8 font-medium">
                <li className="flex items-center gap-2">Katalog Barang Tanpa Batas (Unlimited)</li>
                <li className="flex items-center gap-2">Multi-Kasir Shift Karyawan Tanpa Batas</li>
                <li className="flex items-center gap-2">Konversi Multi-Satuan Dus / Renceng Otomatis</li>
                <li className="flex items-center gap-2">Buku Catatan Bon Utang Pelanggan</li>
                <li className="flex items-center gap-2">Jaminan Pembaruan Sistem Resmi</li>
              </ul>
              <a
                href={waOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-3.5 rounded-xl font-bold text-xs text-white bg-black hover:bg-neutral-800 shadow-md shadow-black/20 transition-all"
              >
                Pesan Lisensi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ────────────────────────────────────────────────── */}
      <section className="py-16 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 text-center mb-8">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="space-y-4">
            {faqs.map((f, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-sm">
                <h3 className="text-sm sm:text-base font-bold text-neutral-950 mb-2">{f.q}</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM STICKY CALL TO ACTION ────────────────────────────────── */}
      <section className="py-12 bg-neutral-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl sm:text-3xl font-extrabold mb-3">
            Bikin Kasir Toko Kelontong Anda Lebih Cepat Hari Ini!
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto mb-6">
            Mulai uji coba mandiri 100% offline di tablet atau handphone kasir Anda sekarang juga.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={googleGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs text-neutral-950 bg-white hover:bg-neutral-100 transition-all"
            >
              Uji Coba Google Play Store
            </a>
            <a
              href={waConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs text-white border border-neutral-700 hover:border-white transition-all"
            >
              Konsultasi WhatsApp Pengembang
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
