import Link from 'next/link'
import AppScreenshotGallery from '@/components/AppScreenshotGallery'
import DualReelKelontongShowcase from '@/components/DualReelKelontongShowcase'

export const metadata = {
  title: 'Kelontong Pro — Aplikasi Kasir Toko Kelontong & Warung Sembako Android',
  description: 'Aplikasi kasir toko sembako dan kelontong Android resmi karya FokusKonten. Scan barcode cepat pakai kamera HP, hitung pecah satuan dus ke eceran otomatis, catat bon utang pembeli, dan cetak struk tanpa kuota internet.',
  alternates: { canonical: 'https://fokuskonten.my.id/landpage/tokokelontongpro' },
  openGraph: {
    title: 'Kelontong Pro — Kasir Warung & Toko Sembako Cepat',
    description: 'Beli karton jual eceran tanpa tekor modal. Transaksi kasir kilat, catat bon utang rapi, dan cetak struk kasir tanpa biaya sewa bulanan.',
    images: [{ url: '/screenshots/tokokelontongpro/Kelontong_Pro_Feature_Graphic_1024x500.jpg', width: 1024, height: 500, alt: 'Kelontong Pro Banner Resmi' }],
  },
}

export default function TokoKelontongProDedicatedSalesPage() {
  const googleGroupUrl = 'https://groups.google.com/g/penguji-fokuskonten'
  const playTestingWebUrl = 'https://play.google.com/apps/testing/com.fokuskonten.kelontongpro'
  const playStoreDirectUrl = 'https://play.google.com/store/apps/details?id=com.fokuskonten.kelontongpro'
  const directApkUrl = 'https://github.com/fokuskonten/fokuskonten/releases/download/apps-v1.0/Kelontong_Pro_v1.0.1_Build2.apk'
  const waConsultUrl = `https://wa.me/6285183011318?text=${encodeURIComponent('Halo FokusKonten,\n\nSaya ingin tanya seputar aplikasi kasir Kelontong Pro, printer struk bluetooth, dan cara pasang di handphone kasir warung saya.')}`

  // Tantangan Nyata — Bahasa Warung Sehari-hari, Ringkas & Bebas Pleonasme
  const painPoints = [
    {
      title: 'Kulakan Dus Dijual Eceran, Uang Modal Meleset',
      desc: 'Kulakan 1 karton mie atau kopi, lalu dijual campur antara rencengan dan eceran. Di akhir bulan uang kas tidak klop karena hitungan modal manual sering salah takar.',
    },
    {
      title: 'Buku Bon Utang Terselip, Uang Warung Macet',
      desc: 'Catatan utang di buku kertas mudah sobek, tercecer, atau lupa dicatat. Uang modal Anda akhirnya macet di pembeli tanpa catatan tanggal tempo yang jelas.',
    },
    {
      title: 'Antrean Kasir Macet Saat Warung Ramai',
      desc: 'Pembeli menumpuk di depan warung saat Anda sibuk memencet kalkulator dan mengingat-ingat harga barang. Pembeli tidak sabar dan batal belanja.',
    },
    {
      title: 'Kasir Online Mendadak Mati Saat Internet Gangguan',
      desc: 'Aplikasi kasir online biasa langsung macet total saat mati lampu atau kuota habis, membuat pelayanan warung Anda terhenti seketika.',
    },
  ]

  // Galeri 12 Tangkapan Layar Asli — Ringkas, Padat, Jelas Fungsionalitasnya
  const galleryScreenshots = [
    {
      id: '01',
      title: 'Ringkasan Kasir & Penjualan Hari Ini',
      desc: 'Pantau total uang masuk, modal barang terjual, dan untung bersih kasir harian.',
      img: '/screenshots/tokokelontongpro/01_Dashboard_Utama.png',
    },
    {
      id: '02',
      title: 'Kasir Cepat & Scan Barcode Kamera',
      desc: 'Pindai barcode kemasan barang seketika, total belanja langsung terhitung otomatis.',
      img: '/screenshots/tokokelontongpro/02_Kasir_POS_Penjualan.png',
    },
    {
      id: '03',
      title: 'Pecah Satuan Dus, Renceng & Eceran',
      desc: 'Pecah karton dus mie atau kopi menjadi renceng dan sachet tanpa selisih modal.',
      img: '/screenshots/tokokelontongpro/03_Manajemen_Stok_dan_Produk.png',
    },
    {
      id: '04',
      title: 'Pilihan Bayar Tunai, QRIS & Bon',
      desc: 'Terima bayar tunai, scan barcode QRIS, transfer bank, hingga catatan kasbon warga.',
      img: '/screenshots/tokokelontongpro/04_Penjualan_dan_Pelayanan.png',
    },
    {
      id: '05',
      title: 'Daftar Letak Rak & Sisa Stok Barang',
      desc: 'Lacak posisi barang di etalase toko dan terima alarm saat barang mau habis.',
      img: '/screenshots/tokokelontongpro/05_Stok_dan_Inventaris.png',
    },
    {
      id: '06',
      title: 'Catat Kulakan Masuk dari Distributor',
      desc: 'Rekam faktur belanjaan grosir supplier, stok warung langsung bertambah otomatis.',
      img: '/screenshots/tokokelontongpro/06_Pembelian_dan_Gudang.png',
    },
    {
      id: '07',
      title: 'Buku Bon Utang Pembeli & Jatuh Tempo',
      desc: 'Catat utang warga, rekam cicilan pelunasan, dan kirim rincian tagihan via WhatsApp.',
      img: '/screenshots/tokokelontongpro/07_Master_Relasi_dan_SDM.png',
    },
    {
      id: '08',
      title: 'Laporan Laba Rugi & Arus Kas',
      desc: 'Tutup kasir harian dengan tenang, seluruh uang masuk dan pengeluaran tercatat rapi.',
      img: '/screenshots/tokokelontongpro/08_Laporan_Keuangan.png',
    },
    {
      id: '09',
      title: 'Daftar Produk Sembako Paling Laris',
      desc: 'Ketahui barang paling cepat terjual untuk perencanaan belanja kulakan berikutnya.',
      img: '/screenshots/tokokelontongpro/09_Pusat_Laporan_dan_AI.png',
    },
    {
      id: '10',
      title: 'Cetak Nota Kasir Bluetooth & Struk',
      desc: 'Cetak nota struk thermal pakai nama warung Anda atau kirim bukti bayar ke WhatsApp.',
      img: '/screenshots/tokokelontongpro/10_Riwayat_Transaksi.png',
    },
    {
      id: '11',
      title: 'Catatan Pergantian Shift Operator Kasir',
      desc: 'Awasi uang setoran awal dan akhir kasir agar tidak terjadi kebocoran dana laci.',
      img: '/screenshots/tokokelontongpro/11_Audit_Trail_dan_Log.png',
    },
    {
      id: '12',
      title: 'Cadangan Data Toko Aman di Perangkat',
      desc: 'Simpan salinan data toko ke memori perangkat atau Google Drive agar aman saat ganti handphone.',
      img: '/screenshots/tokokelontongpro/12_Pengaturan_Sistem.png',
    },
  ]

  // Target Pengguna Resmi — Bahasa Lugas, Mengajak & Ramah Pemula
  const targetAudiences = [
    {
      role: 'Pemilik Toko Sembako, Agen Grosir & Juragan Warung',
      badge: 'Pemilik Toko, Pengelola Modal & Juragan Grosir',
      badgeColor: 'text-sky-700',
      img: '/screenshots/tokokelontongpro/human/laki.png',
      alt: 'Pemilik Toko Sembako Kelontong Pro',
      gradient: 'from-sky-50/80 via-sky-50/30 to-white',
      floatingBadge: 'Audit Keuntungan Bersih & Bon Utang',
      floatingPill: 'Kontrol Stok Dus, Kulakan & Modal HPP',
      desc: 'Cocok bagi pemilik toko kelontong mandiri, agen sembako, dan pedagang grosir yang ingin mengawasi uang kasir, memantau buku bon utang warga, dan memastikan untung warung tidak bocor.',
      tags: [
        'Laporan Laba Harian',
        'Buku Bon Utang Warga',
        'Daftar Kulakan Habis',
        'Stock Opname Cepat',
        'Proteksi Modal HPP',
      ],
      points: [
        'Ketahui keuntungan bersih harian dan modal barang terjual secara otomatis tanpa rekap buku folio',
        'Buku bon utang warga tercatat rapi lengkap dengan tanggal jatuh tempo dan tombol tagih WhatsApp',
        'Cek sisa stok di rak warung lebih cepat dengan peringatan batas minimum barang kulakan',
        'Seluruh data penjualan tersimpan privat di handphone Anda sendiri tanpa biaya sewa selamanya',
      ],
      metric: 'Bebas Sewa Bulanan • 100% Data Dagangan Aman Tersimpan di HP',
    },
    {
      role: 'Kasir Toko Kelontong, Penjaga Warung & Anggota Keluarga',
      badge: 'Pelayanan Penjualan Kasir & Front Office',
      badgeColor: 'text-emerald-700',
      img: '/screenshots/tokokelontongpro/human/girl.png',
      alt: 'Kasir Toko Kelontong Pro',
      gradient: 'from-emerald-50/80 via-emerald-50/30 to-white',
      floatingBadge: 'Scan Barcode Kamera Cepat 1 Detik',
      floatingPill: 'Pecah Dus ke Renceng & Struk Bluetooth',
      desc: 'Sangat mudah dipakai oleh penjaga warung, anak, atau kasir baru. Tampilan tombol besar dan jelas membuat siapa pun langsung lancar melayani pembeli dalam hitungan menit tanpa bingung.',
      tags: [
        'Scan Barcode HP',
        'Pecah Satuan Dus',
        'Cetak Struk Thermal',
        'Hitung Kembalian Otomatis',
        'Kirim Nota WhatsApp',
      ],
      points: [
        'Scan barcode kemasan kilat pakai kamera HP tanpa repot beli alat scanner barcode tambahan',
        'Pecah harga otomatis saat pembeli membeli eceran dari kemasan karton atau rencengan',
        'Cetak nota struk belanja bluetooth dan bagikan bukti bayar ke nomor WhatsApp pembeli',
        'Menu kasir berbahasa Indonesia sederhana, mudah dipahami orang awam tanpa pelatihan rumit',
      ],
      metric: 'Layanan Antrean 3x Lebih Kilat • Kasir Tetap Bekerja Lancar Tanpa Kuota',
    },
  ]

  // 8 Modul Ritel Lengkap — Ringkas, Padat, Padanan Ikon 3D Jelas
  const coreModules = [
    {
      num: '01',
      icon: '/app-icons/kelontongpro/3d/modul_01_kasir.png',
      headline: 'Kasir Kilat & Scan Barcode Kamera',
      subHeadline: 'Pindai barcode kemasan dan hitung kembalian dalam 1 detik',
      features: [
        'Cari barang lewat nama, foto, atau scan barcode kemasan pakai kamera HP',
        'Mendukung printer thermal bluetooth kasir (ukuran 58mm dan 80mm)',
        'Pilihan bayar lengkap: Tunai, QRIS, Transfer Bank, hingga Kasbon',
        'Stok barang otomatis berkurang seketika setelah pembayaran selesai',
        'Beroperasi lancar tanpa perlu kuota internet di warung Anda',
      ],
    },
    {
      num: '02',
      icon: '/app-icons/kelontongpro/3d/modul_02_satuan.png',
      headline: 'Pecah Satuan Dus ke Renceng & Eceran',
      subHeadline: 'Kulakan 1 karton dus, jual eceran bebas tekor modal',
      features: [
        'Atur konversi bertingkat mudah (1 Dus = 10 Renceng = 100 Sachet/Pcs)',
        'Harga modal terbagi proporsional sesuai isi satuan terkecil',
        'Bebas atur harga eceran biasa, harga grosir, dan harga langganan',
        'Riwayat kartu stok mencatat barang masuk dan barang keluar rapi',
        'Mendukung ribuan jenis barang sembako, minuman, bumbu, dan jajanan',
      ],
    },
    {
      num: '03',
      icon: '/app-icons/kelontongpro/3d/modul_03_bon.png',
      headline: 'Buku Catatan Bon Utang Pelanggan',
      subHeadline: 'Catat utang belanja pembeli tertib tanpa takut buku kertas sobek',
      features: [
        'Catat nama pembeli yang kasbon langsung dari layar pembayaran kasir',
        'Lihat sisa utang pembeli dan tanggal jatuh tempo dalam satu sentuhan',
        'Catat cicilan pelunasan bertahap dengan bukti riwayat pembayaran jelas',
        'Kirim rincian tagihan belanja rapi langsung ke WhatsApp pembeli',
        'Daftar kontak pelanggan tetap untuk memudahkan komunikasi warung',
      ],
    },
    {
      num: '04',
      icon: '/app-icons/kelontongpro/3d/modul_04_struk.png',
      headline: 'Cetak Nota Struk Bluetooth & WhatsApp',
      subHeadline: 'Cetak nota belanja fisik atau bagikan bukti belanja digital hemat kertas',
      features: [
        'Kompatibel dengan semua printer struk thermal bluetooth di Indonesia',
        'Bebas pasang nama warung, alamat toko, nomor HP, dan pesan ucapan',
        'Kirim struk belanja digital berformat rapi langsung ke nomor WhatsApp',
        'Bisa cetak ulang nota kapan saja dari riwayat transaksi kasir',
        'Hemat kertas dan tinta dengan tampilan struk yang ringkas dan jelas',
      ],
    },
    {
      num: '05',
      icon: '/app-icons/kelontongpro/3d/modul_05_opname.png',
      headline: 'Cek Selisih Stok & Cegah Barang Hilang',
      subHeadline: 'Cocokkan jumlah barang nyata di rak toko dengan mudah lewat HP',
      features: [
        'Hitung stok fisik di rak warung cukup menggunakan layar handphone',
        'Sistem otomatis menghitung selisih barang (kurang atau lebih)',
        'Catatan koreksi stok tersimpan aman untuk mencegah barang hilang',
        'Peringatan dini untuk barang dagangan yang sudah mendekati kedaluwarsa',
        'Tandai posisi rak etalase agar kasir cepat menemukan letak barang',
      ],
    },
    {
      num: '06',
      icon: '/app-icons/kelontongpro/3d/modul_06_labarugi.png',
      headline: 'Rekap Untung Bersih & Arus Kas Harian',
      subHeadline: 'Tahu keuntungan toko setiap hari tanpa perlu hitung kalkulator rumit',
      features: [
        'Laporan laba bersih otomatis: Omzet penjualan dikurangi modal barang',
        'Rekap shift kasir: Catat modal kasir awal dan setoran uang kas akhir',
        'Catat pengeluaran harian: Listrik warung, kantong plastik, dan gaji kasir',
        'Pisahkan uang usaha dengan uang pribadi agar modal kerja tidak terpakai',
        'Ekspor ringkasan pembukuan ke file Excel dan PDF kapan saja dibutuhkan',
      ],
    },
    {
      num: '07',
      icon: '/app-icons/kelontongpro/3d/modul_07_kulakan.png',
      headline: 'Catatan Kulakan & Nomor Sales Supplier',
      subHeadline: 'Kelola jadwal belanja ke agen grosir dan simpan nomor distributor resmi',
      features: [
        'Buku kontak agen grosir, sales keliling, dan distributor sembako resmi',
        'Catat barang kulakan masuk, stok di kasir otomatis langsung bertambah',
        'Rekam riwayat retur barang rusak atau bocor ke pihak sales supplier',
        'Pantau tanggal jatuh tempo pembayaran kulakan agar tidak menumpuk',
        'Daftar barang habis otomatis menjadi panduan belanja saat ke pasar grosir',
      ],
    },
    {
      num: '08',
      icon: '/app-icons/kelontongpro/3d/modul_08_terlaris.png',
      headline: 'Daftar Produk Terlaris & Rekomendasi Kulakan',
      subHeadline: 'Ketahui barang paling laku agar tidak salah kulakan barang yang macet',
      features: [
        'Daftar produk paling laris berdasarkan jumlah terjual dan keuntungan uang',
        'Ketahui jam dan hari belanja paling ramai pengunjung di warung Anda',
        'Saran belanja otomatis agar barang sembako utama tidak pernah kehabisan',
        'Kunci keamanan PIN kasir untuk melindungi data uang dan laporan toko',
        'Cadangkan seluruh data toko dengan aman tanpa risiko data terhapus',
      ],
    },
  ]

  // 10 Komparasi Nyata — Tegas, Objektif, Bahasa Pemilik Warung
  const comparisons = [
    {
      feature: 'Kecepatan Layani Pembeli',
      oldWay: 'Hitung pakai kalkulator, rawan salah kembalian & antrean macet',
      kelontongPro: 'Scan barcode kamera 1 detik, total belanja & kembalian instan',
    },
    {
      feature: 'Jual Eceran dari Karton Dus',
      oldWay: 'Hitung modal di ingatan, rawan rugi saat sachet terjual campur',
      kelontongPro: 'Multi-satuan otomatis (1 Dus = 10 Renceng = 100 Pcs) akurat',
    },
    {
      feature: 'Kebutuhan Kuota Internet',
      oldWay: 'Kasir online macet total saat mati lampu atau sinyal lemot',
      kelontongPro: 'Kasir offline mandiri, tetap lancar melayani tanpa kuota internet',
    },
    {
      feature: 'Pencatatan Bon Utang Pembeli',
      oldWay: 'Catat di buku tulis, kertas sobek, terselip & lupa tanggal tempo',
      kelontongPro: 'Tercatat rapi di HP, ada tanggal tempo, dan kirim rincian via WA',
    },
    {
      feature: 'Biaya Pemakaian Software',
      oldWay: 'Wajib bayar sewa langganan ratusan ribu per bulan selamanya',
      kelontongPro: 'Gratis dicoba, opsi Lisensi Sekali Bayar aktif permanen seumur hidup',
    },
    {
      feature: 'Cetak Bukti Pembayaran',
      oldWay: 'Tulis nota kertas karbon tangan yang memakan waktu dan boros biaya',
      kelontongPro: 'Cetak struk nota bluetooth thermal atau bagikan bukti bayar ke WA',
    },
    {
      feature: 'Pengecekan Stok Barang',
      oldWay: 'Jarang dihitung karena repot, barang hilang baru ketahuan belakangan',
      kelontongPro: 'Cek stok lewat HP, sistem langsung menghitung sisa barang nyata',
    },
    {
      feature: 'Perhitungan Untung Bersih',
      oldWay: 'Hanya menebak keuntungan dari sisa uang di laci kasir',
      kelontongPro: 'Laporan laba bersih otomatis: Omzet dikurangi modal barang tepat',
    },
    {
      feature: 'Keamanan Data Usaha',
      oldWay: 'Data toko tersimpan di server pihak lain yang rawan diintip',
      kelontongPro: 'Data 100% tersimpan privat di dalam handphone kasir Anda sendiri',
    },
    {
      feature: 'Kemudahan Bagi Pemula',
      oldWay: 'Menu komputer rumit, butuh kursus berhari-hari untuk penjaga toko',
      kelontongPro: 'Tampilan bersih dan mudah, penjaga toko langsung lancar dalam 5 menit',
    },
  ]

  // Tanya Jawab Ringkas & Esensial
  const faqs = [
    {
      q: 'Apakah warung saya butuh kuota internet untuk memakai Kelontong Pro?',
      a: 'Tidak butuh sama sekali. Kelontong Pro beroperasi 100% offline. Seluruh data barang, transaksi kasir, dan catatan bon utang tersimpan aman di dalam handphone kasir Anda.',
    },
    {
      q: 'Printer struk apa saja yang cocok dengan Kelontong Pro?',
      a: 'Kelontong Pro cocok dengan semua printer thermal Bluetooth ukuran 58mm maupun 80mm standar pasar (seperti Panda, VSC, Iware, Zywell, Bluetooth POS) yang banyak dijual di pasaran.',
    },
    {
      q: 'Bagaimana cara scan barcode kemasan barang dagangan?',
      a: 'Aplikasi sudah menyediakan pemindai barcode bawaan menggunakan kamera handphone Anda. Cukup arahkan kamera ke barcode kemasan barang, nama dan harga barang akan langsung muncul di kasir.',
    },
    {
      q: 'Apa perbedaan versi Uji Coba Gratis dan Lisensi Resmi Enterprise?',
      a: 'Versi gratis memberikan akses kasir penuh hingga 100 jenis barang. Untuk toko yang memiliki ribuan jenis sembako, Anda dapat mengaktifkan Lisensi Enterprise Sekali Bayar untuk membuka katalog barang tanpa batas dan bebas biaya sewa selamanya.',
    },
    {
      q: 'Bagaimana keamanan data warung jika handphone kasir rusak atau diganti?',
      a: 'Kelontong Pro menyediakan menu pencadangan (backup) data yang mudah. Anda dapat menyimpan salinan data toko ke memori HP atau Google Drive pribadi, dan memulihkannya ke handphone baru dalam hitungan detik.',
    },
  ]

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans antialiased">

      {/* ── BREADCRUMB & STATUS NAVIGASI ──────────────────────────────── */}
      <div className="pt-24 sm:pt-28 pb-4 bg-neutral-50/70 border-b border-neutral-100">
        <div className="container-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-500">
            <Link href="/" className="hover:text-black transition-colors">Beranda</Link>
            <span>/</span>
            <Link href="/aplikasi" className="hover:text-black transition-colors">Produk &amp; Aplikasi</Link>
            <span>/</span>
            <span className="text-neutral-900 font-semibold">Kelontong Pro</span>
          </div>
          <span className="hidden sm:inline-block text-neutral-400 text-xs font-mono">
            Versi Rilis 1.0.1 (Build 2)
          </span>
        </div>
      </div>

      {/* ── HERO SALES SECTION ─────────────────────────────────────────── */}
      <section className="pt-12 sm:pt-16 pb-16 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h1 className="heading-xl text-3xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-tight sm:leading-none mb-6 text-balance max-w-5xl mx-auto">
            Kasir Toko Kelontong &amp; Sembako Cepat <br className="hidden sm:inline" />
            Beli Dus Jual Renceng, Bebas Iuran Bulanan
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            Beli karton jual eceran tanpa tekor modal. Aplikasi kasir toko sembako pintar: scan barcode cepat pakai kamera HP, hitung pecah satuan otomatis, catat bon utang pembeli, dan cetak struk kasir tanpa kuota internet.
          </p>

          {/* DUA TOMBOL AKSI UTAMA — GOOGLE PLAY SEBAGAI PRIMADONA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12 max-w-xl mx-auto">
            <a
              href="#alur-pengujian"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-sm sm:text-base text-neutral-950 bg-white border-2 border-neutral-300 hover:border-black hover:bg-neutral-50 shadow-md hover:shadow-lg transition-all duration-200 group"
            >
              <svg className="w-6 h-6 shrink-0 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 01-.61-1.636V3.45c0-.624.226-1.198.609-1.636z" fill="#00C3FF"/>
                <path d="M14.851 13.059l2.42 2.42-11.89 6.845 9.47-9.265z" fill="#FF3A44"/>
                <path d="M17.271 10.941l3.197 1.84c.895.516.895 1.364 0 1.88l-3.197 1.84-2.42-2.42 2.42-3.14z" fill="#FFCE00"/>
                <path d="M14.851 10.000L5.38 3.48l11.89 6.845-2.42 2.419z" fill="#00E676"/>
              </svg>
              <span>Uji Coba Play Store (Gabung Grup)</span>
            </a>

            <a
              href={waConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-neutral-800 bg-neutral-100/90 border border-neutral-300 hover:border-black hover:bg-neutral-100 shadow-sm transition-all duration-200"
            >
              <svg className="w-5 h-5 text-neutral-900 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Konsultasi WhatsApp</span>
            </a>
          </div>

          {/* BANNER FEATURE GRAPHIC RESMI */}
          <div className="rounded-3xl overflow-hidden border border-neutral-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] max-w-6xl mx-auto mb-12 bg-white">
            <img
              src="/screenshots/tokokelontongpro/hero_banner_pos.png"
              alt="Kelontong Pro Commercial Hero Banner"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 4 STATS GRID DENGAN IKON 3D MENONJOL BEBAS TANPA KOTAK */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
            <div className="p-3 text-center flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3">
                <img
                  src="/app-icons/kelontongpro/3d/stat_offline.png"
                  alt="Kasir 100% Offline"
                  className="max-w-full max-h-full object-contain drop-shadow-md hover:scale-110 transition-transform"
                />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Tanpa Kuota</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Kasir 100% Offline</div>
            </div>
            <div className="p-3 text-center flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3">
                <img
                  src="/app-icons/kelontongpro/3d/stat_scanner.png"
                  alt="Scan Barcode Kilat"
                  className="max-w-full max-h-full object-contain drop-shadow-md hover:scale-110 transition-transform"
                />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">1 Detik</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Scan Barcode Kilat</div>
            </div>
            <div className="p-3 text-center flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3">
                <img
                  src="/app-icons/kelontongpro/3d/stat_satuan.png"
                  alt="Pecah Dus ke Eceran"
                  className="max-w-full max-h-full object-contain drop-shadow-md hover:scale-110 transition-transform"
                />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Otomatis</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Pecah Dus ke Eceran</div>
            </div>
            <div className="p-3 text-center flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3">
                <img
                  src="/app-icons/kelontongpro/3d/stat_rp0.png"
                  alt="Rp 0 Bebas Iuran"
                  className="max-w-full max-h-full object-contain drop-shadow-md hover:scale-110 transition-transform"
                />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Rp 0</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Bebas Iuran Bulanan</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── THE DUAL-REEL VIDEO SHOWCASE (CURHATAN & DEMO LIVE) ─────────── */}
      <DualReelKelontongShowcase />

      {/* ── PAIN POINTS SECTION ────────────────────────────────────────── */}
      <section className="py-20 bg-neutral-50/60 border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">Tantangan Nyata Warung Sembako</span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3">
              Apakah Masalah Ini Sering Terjadi di Warung Anda?
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Mengelola toko kelontong dengan buku bon tulis atau kalkulator manual sering memicu kebocoran uang modal tanpa Anda sadari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((item, idx) => (
              <div key={idx} className="p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-neutral-950 mb-2.5 leading-snug">{item.title}</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── BANNER PROMOSI LANDSCAPE 16:9 KEDUA ───────────────────────────── */}
      <section className="py-16 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="container-page">
          <div className="rounded-3xl overflow-hidden border border-neutral-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] max-w-6xl mx-auto bg-white">
            <img
              src="/screenshots/tokokelontongpro/hero_banner_landscape.png"
              alt="Kelontong Pro Solusi Kasir Sembako Modern"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── GALERI GESER INTERAKTIF PREVIEW APLIKASI (MOCKUP FRAME HP) ─── */}
      <AppScreenshotGallery
        title="Galeri Antarmuka Kelontong Pro"
        subtitle="Geser ke samping untuk melihat tampilan kasir POS, scanner barcode kamera, konversi multi-satuan, hingga pencatatan bon utang pembeli."
        items={galleryScreenshots}
      />

      {/* ── 8 MODUL RITEL TOKO LENGKAP ─────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3.5 block">8 Modul Kasir Toko</span>
            <h2 className="heading-xl text-3xl sm:text-5xl text-neutral-950 mb-4 tracking-tight">
              Sistem Kasir &amp; Pengelolaan Warung Praktis
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Aplikasi kasir handphone ringan dan responsif, dirancang agar anggota keluarga maupun karyawan toko dapat langsung menggunakannya dengan lancar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {coreModules.map((m) => (
              <div
                key={m.num}
                className="rounded-3xl border border-neutral-200/90 bg-white p-7 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:border-neutral-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Header Modul dengan Ikon 3D Menonjol Bebas Tanpa Pembungkus */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                        MODUL {m.num}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-950 leading-snug group-hover:text-black transition-colors">
                        {m.headline}
                      </h3>
                    </div>
                    {m.icon && (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
                        <img
                          src={m.icon}
                          alt={m.headline}
                          className="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-neutral-600 font-sans leading-relaxed mb-6 pb-4 border-b border-neutral-100">
                    {m.subHeadline}
                  </p>

                  {/* Fitur Utama */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-1">
                      Kemampuan Utama:
                    </span>
                    {m.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed">
                        <svg className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: TARGET PENGGUNA RESMI (DUAL PERSONA SHOWCASE LAPANG) ── */}
      <section className="py-24 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3.5 block">Target Pengguna</span>
            <h2 className="heading-xl text-3xl sm:text-5xl text-neutral-950 mb-4 tracking-tight">
              Sangat Tepat Digunakan Untuk Siapa?
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Dibuat khusus untuk mendukung operasional harian warung sembako, toko kelontong, dan agen grosir di seluruh Indonesia:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {targetAudiences.map((aud, i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden border border-neutral-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.07)] bg-white flex flex-col justify-between hover:shadow-2xl hover:border-neutral-400 transition-all duration-300 group"
              >
                {/* Visual Model Persona Proporsional Tinggi Menonjol */}
                <div className={`bg-gradient-to-b ${aud.gradient} pt-8 px-6 flex justify-center items-end border-b border-neutral-100 relative overflow-hidden h-[420px] sm:h-[480px] lg:h-[500px]`}>
                  {/* Foto Model Persona Utuh */}
                  <img
                    src={aud.img}
                    alt={aud.alt}
                    className="h-full w-auto object-contain object-bottom drop-shadow-2xl transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Deskripsi, Workflow Tags & Poin Peran Komprehensif */}
                <div className="p-7 sm:p-9 flex-1 flex flex-col justify-between">
                  <div>
                    <div className={`text-xs font-mono font-bold uppercase tracking-wider mb-2.5 ${aud.badgeColor}`}>
                      {aud.badge}
                    </div>
                    <h3 className="font-display font-bold text-neutral-950 text-xl sm:text-2xl mb-3 leading-snug">
                      {aud.role}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans mb-5">
                      {aud.desc}
                    </p>

                    {/* Alur Kerja & Modul Terkait (Workflow Tags) */}
                    <div className="mb-6">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2">
                        Alur Kerja &amp; Fitur Harian:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {aud.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 text-[11px] font-mono font-medium border border-neutral-200/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Poin Tanggung Jawab Operasional */}
                    <div className="pt-5 border-t border-neutral-100 space-y-2.5 mb-6">
                      {aud.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed">
                          <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Ringkasan Hasil Nyata */}
                    <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs font-mono text-neutral-700 flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{aud.metric}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON SECTION ─────────────────────────────────────────── */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">Perbandingan Nyata</span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3">
              Perbandingan: Cara Lama vs Kelontong Pro
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Ketahui alasan mengapa beralih ke Kelontong Pro jauh lebih menguntungkan dan mengamankan omzet warung Anda.
            </p>
          </div>

          <div className="space-y-4">
            {comparisons.map((item, idx) => (
              <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-display font-bold text-neutral-950 text-sm sm:w-1/3">{item.feature}</span>
                <div className="flex-1 text-xs sm:text-sm text-neutral-400 line-through sm:pr-4 font-sans">{item.oldWay}</div>
                <div className="flex-1 text-xs sm:text-sm font-semibold text-neutral-950 font-sans flex items-center gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{item.kelontongPro}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-STEP INSTALLATION & GETTING STARTED (CLEAN SHOWCASE) ──────── */}
      <section id="alur-pengujian" className="py-20 bg-white border-b border-neutral-200/80 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3.5 block">Alur Pemasangan</span>
          <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-3">
            3 Langkah Cepat Pasang Kelontong Pro di Kasir Anda
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto mb-12 leading-relaxed">
            Tanpa prosedur rumit. Langsung rasakan kemudahan kasir sembako kilat, scan barcode kamera, dan pembukuan laba rugi 100% offline di handphone Anda hari ini.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
            {/* Step 1 */}
            <div className="p-7 rounded-3xl border border-neutral-200/80 bg-neutral-50/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-mono font-extrabold text-neutral-950 block">01</span>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
                      Akses Grup
                    </span>
                  </div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
                    <img
                      src="/app-icons/kelontongpro/3d/step_01_grup.png"
                      alt="Grup Penguji"
                      className="max-w-full max-h-full object-contain drop-shadow-md"
                    />
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-neutral-950 mb-2">Gabung Grup Penguji</h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  Buka Google Grup pengujian resmi FokusKonten satu kali menggunakan akun Google aktif di handphone Anda.
                </p>
                <a
                  href={googleGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-neutral-900 underline hover:text-black inline-flex items-center gap-1"
                >
                  <span>Buka Google Grup</span>
                  <span>&rarr;</span>
                </a>
              </div>
              <div className="pt-6 border-t border-neutral-200/60 mt-4">
                <span className="text-[11px] font-mono text-neutral-500">✓ 1-Klik akun Google aktif</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-3xl border-2 border-neutral-900 bg-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-mono font-extrabold text-neutral-950 block">02</span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
                      Akses Uji Coba
                    </span>
                  </div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
                    <img
                      src="/app-icons/kelontongpro/3d/step_02_akses.png"
                      alt="Akses Play Store"
                      className="max-w-full max-h-full object-contain drop-shadow-md"
                    />
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-neutral-950 mb-2">Terima Akses Pengujian</h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  Buka tautan web pengujian Google Play dan konfirmasi menjadi penguji untuk mengaktifkan izin pasang aplikasi di akun Anda.
                </p>
                <a
                  href={playTestingWebUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-blue-700 underline hover:text-blue-900 inline-flex items-center gap-1"
                >
                  <span>Konfirmasi di Web Play Store</span>
                  <span>&rarr;</span>
                </a>
              </div>
              <div className="pt-6 border-t border-neutral-200/60 mt-4">
                <span className="text-[11px] font-mono text-neutral-900 font-semibold">✓ Verifikasi resmi Google Play</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-3xl border border-neutral-200/80 bg-neutral-50/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-mono font-extrabold text-neutral-950 block">03</span>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
                      Pasang di Kasir
                    </span>
                  </div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
                    <img
                      src="/app-icons/kelontongpro/3d/step_03_kasir.png"
                      alt="Pasang di Kasir"
                      className="max-w-full max-h-full object-contain drop-shadow-md"
                    />
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-neutral-950 mb-2">Pasang di Google Play</h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  Buka halaman aplikasi di Google Play Store perangkat Anda, unduh dan pasang secara aman dengan Google Play Protect.
                </p>
                <a
                  href={playStoreDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-neutral-900 underline hover:text-black inline-flex items-center gap-1"
                >
                  <span>Buka Halaman Play Store</span>
                  <span>&rarr;</span>
                </a>
              </div>
              <div className="pt-6 border-t border-neutral-200/60 mt-4">
                <span className="text-[11px] font-mono text-neutral-500">✓ Starter 100 barang siap beroperasi</span>
              </div>
            </div>
          </div>

          {/* DUA PILIHAN JALUR PEMASANGAN (DUAL-CHOICE CTA) */}
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {/* Opsi 1: Google Group & Play Store (Rekomendasi Utama) */}
              <div className="p-5 rounded-2xl border-2 border-neutral-900 bg-neutral-900 text-white flex flex-col justify-between shadow-lg">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>JALUR RESMI (DIREKOMENDASIKAN)</span>
                  </div>
                  <h4 className="font-display font-bold text-white text-sm mb-1.5">Google Play Closed Testing</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                    Terverifikasi aman oleh Google Play Protect. Bebas peringatan sistem dan otomatis menerima pembaruan versi terbaru.
                  </p>
                </div>
                <a
                  href={googleGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-display font-bold text-xs sm:text-sm text-neutral-950 bg-white hover:bg-neutral-100 transition-all duration-200"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 01-.61-1.636V3.45c0-.624.226-1.198.609-1.636z" fill="#00C3FF"/>
                    <path d="M14.851 13.059l2.42 2.42-11.89 6.845 9.47-9.265z" fill="#FF3A44"/>
                    <path d="M17.271 10.941l3.197 1.84c.895.516.895 1.364 0 1.88l-3.197 1.84-2.42-2.42 2.42-3.14z" fill="#FFCE00"/>
                    <path d="M14.851 10.000L5.38 3.48l11.89 6.845-2.42 2.419z" fill="#00E676"/>
                  </svg>
                  <span>1. Gabung Google Grup</span>
                </a>
              </div>

              {/* Opsi 2: Unduh APK Mandiri */}
              <div className="p-5 rounded-2xl border border-neutral-300 bg-white flex flex-col justify-between shadow-sm">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-neutral-100 text-neutral-700 mb-2.5">
                    <span>OPSI MANDIRI</span>
                  </div>
                  <h4 className="font-display font-bold text-neutral-950 text-sm mb-1.5">Unduh Berkas APK Langsung</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                    Unduh file APK v1.0.1 (Build 2) resmi dan pasang langsung di perangkat Android tanpa bergabung ke Google Grup.
                  </p>
                </div>
                <a
                  href={directApkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-display font-bold text-xs sm:text-sm text-neutral-900 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 transition-all duration-200"
                >
                  <svg className="w-4 h-4 shrink-0 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  <span>Unduh APK (v1.0.1)</span>
                </a>
              </div>
            </div>

            {/* NOTICE PERINGATAN GOOGLE PLAY PROTECT */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-left">
              <div className="flex items-start gap-3">
                <span className="text-amber-600 font-bold text-base leading-none mt-0.5">!</span>
                <div className="text-xs text-amber-900 leading-relaxed">
                  <span className="font-bold block mb-0.5">Pemberitahuan Keamanan Google Play Protect:</span>
                  Pemasangan langsung melalui berkas APK lokal (sideload) akan memunculkan dialog peringatan dari Google Play Protect karena aplikasi tidak diunduh langsung dari Play Store. Berkas biner ini 100% aman dan ditandatangani resmi oleh Keystore FokusKonten. <strong>Sangat disarankan menggunakan Jalur Google Group</strong> di atas agar terverifikasi resmi oleh Play Protect dan menerima pembaruan otomatis.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FAQ SECTION ────────────────────────────────────────────────── */}
      <section className="py-20 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">Bantuan &amp; Tanya Jawab</span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base">
              Jawaban seputar pemakaian, printer struk, dan kepemilikan lisensi Kelontong Pro.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((f, idx) => (
              <div key={idx} className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
                <h3 className="font-display text-base sm:text-lg font-bold text-neutral-950 mb-2">{f.q}</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CALL TO ACTION (TEMA PUTIH TERANG BERSIH ENTERPRISE) ──── */}
      <section className="py-20 sm:py-24 bg-white border-t border-neutral-200/80 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
            Solusi Kasir Toko Tanpa Ribet
          </span>
          <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3 tracking-tight">
            Bikin Kasir Toko Sembako Anda Lebih Cepat Hari Ini
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed font-sans">
            Mulai uji coba mandiri 100% offline di smartphone atau tablet kasir Anda sekarang juga. Tanpa komitmen dan tanpa biaya tersembunyi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-4">
            <a
              href="#alur-pengujian"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-display font-bold text-sm sm:text-base text-neutral-950 bg-white hover:bg-neutral-50 transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] border-2 border-neutral-200 hover:border-neutral-400 inline-flex items-center justify-center gap-3 group"
            >
              <svg className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 01-.61-1.636V3.45c0-.624.226-1.198.609-1.636z" fill="#00C3FF"/>
                <path d="M14.851 13.059l2.42 2.42-11.89 6.845 9.47-9.265z" fill="#FF3A44"/>
                <path d="M17.271 10.941l3.197 1.84c.895.516.895 1.364 0 1.88l-3.197 1.84-2.42-2.42 2.42-3.14z" fill="#FFCE00"/>
                <path d="M14.851 10.000L5.38 3.48l11.89 6.845-2.42 2.419z" fill="#00E676"/>
              </svg>
              <span>Uji Coba Play Store (Gabung Grup)</span>
            </a>

            <a
              href={waConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-neutral-800 bg-neutral-100/90 border border-neutral-300 hover:border-black hover:bg-neutral-100 shadow-sm transition-all duration-200 inline-flex items-center justify-center gap-2.5"
            >
              <svg className="w-5 h-5 text-neutral-900 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Konsultasi WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
