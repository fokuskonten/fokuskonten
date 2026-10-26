import Link from 'next/link'
import AppScreenshotGallery from '@/components/AppScreenshotGallery'
import DualReelVideoShowcase from '@/components/DualReelVideoShowcase'

export const metadata = {
  description: 'Software kasir apotek dan manajemen stok obat Android resmi karya FokusKonten. Lacak batch kedaluwarsa FEFO otomatis, hitung resep racikan puyer dokter, buku defecta digital, dan cetak struk bluetooth 100% offline tanpa iuran bulanan.',
  alternates: { canonical: 'https://fokuskonten.my.id/landpage/apotekpro' },
  openGraph: {
    title: 'Apotek Pro — Solusi Cerdas Kasir & Stok Apotek Modern',
    description: 'Cegah obat expired terbuang! Gunakan Apotek Pro untuk kelola stok batch FEFO, kasir racikan puyer instan, dan cetak struk tanpa kuota internet.',
    images: [{ url: '/screenshots/apotekpro/Apotek_Pro_Feature_Graphic_1024x500.png', width: 1024, height: 500, alt: 'Apotek Pro Feature Graphic' }],
  },
}

export default function ApotekProDedicatedSalesPage() {
  const googleGroupUrl = 'https://groups.google.com/g/penguji-fokuskonten'
  const playTestingWebUrl = 'https://play.google.com/apps/testing/com.fokuskonten.apotekpro'
  const playStoreDirectUrl = 'https://play.google.com/store/apps/details?id=com.fokuskonten.apotekpro'
  const waConsultUrl = `https://wa.me/6285183011318?text=${encodeURIComponent('Halo FokusKonten,\n\nSaya tertarik dengan aplikasi Apotek Pro dan ingin berkonsultasi seputar fitur, printer bluetooth, dan kompatibilitas perangkat kasir.')}`

  const painPoints = [
    {
      title: 'Obat Kedaluwarsa Terbuang Belasan Juta',
      desc: 'Banyak apotek mengalami kerugian besar akibat sistem FIFO biasa. Obat yang mendekati tanggal expired tertumpuk di baris belakang rak dan baru disadari saat sudah tidak dapat diretur ke PBF.',
    },
    {
      title: 'Rumitnya Menghitung Resep Racikan Puyer',
      desc: 'Menghitung dosis miligram terbagi untuk 15–20 bungkus puyer secara manual memakan waktu kasir, rentan salah takar, dan menyebabkan pencatatan stok botol obat di gudang menjadi kacau.',
    },
    {
      title: 'Pasien Putar Balik Akibat Stok Obat Kosong',
      desc: 'Petugas kasir sering terlambat mencatat obat yang menipis di buku defecta manual. Ketika pasien datang membutuhkan obat darurat, stok fisik kosong dan omzet beralih ke apotek kompetitor.',
    },
    {
      title: 'Terbebani Iuran Sewa Software Bulanan',
      desc: 'Aplikasi kasir berbasis cloud membebani biaya langganan ratusan ribu per bulan secara terus-menerus, serta langsung macet total saat jaringan internet apotek mengalami gangguan teknis.',
    },
  ]

  const galleryScreenshots = [
    {
      id: '01',
      title: 'Dashboard Apotek & Ringkasan Bisnis',
      desc: 'Pantau omset, profit, dan performa apotek secara real-time.',
      img: '/screenshots/apotekpro/raw/01_Dashboard_Utama_Apotek.png',
    },
    {
      id: '02',
      title: 'Kasir POS Cepat & Input Resep',
      desc: 'Transaksi obat bebas dan racikan dokter dalam hitungan detik.',
      img: '/screenshots/apotekpro/raw/02_Kasir_POS_Penjualan.png',
    },
    {
      id: '03',
      title: 'Manajemen Stok & Standar CDOB',
      desc: 'Kelola multi-satuan, batas stok, nomor batch, dan kartu stok terperinci.',
      img: '/screenshots/apotekpro/raw/03_Manajemen_Stok_Obat_CDOB.png',
    },
    {
      id: '04',
      title: 'Kalkulator Pintar Dosis & Racikan',
      desc: 'Perhitungan dosis obat anak & dewasa otomatis dan presisi.',
      img: '/screenshots/apotekpro/raw/04_Kalkulator_Dosis_dan_Racikan.png',
    },
    {
      id: '05',
      title: 'Riwayat Transaksi & Cetak Nota',
      desc: 'Pantau arus kas penjualan harian & cetak struk kasir bluetooth mudah.',
      img: '/screenshots/apotekpro/raw/05_Riwayat_Transaksi_dan_Nota.png',
    },
    {
      id: '06',
      title: 'Pembelian, PO & Gudang',
      desc: 'Pencatatan faktur PBF, buku defecta digital, dan mutasi stok cabang.',
      img: '/screenshots/apotekpro/raw/06_Pembelian_PO_dan_Gudang.png',
    },
    {
      id: '07',
      title: 'Laporan Keuangan & PPN',
      desc: 'Buku kas, arus kas, laba rugi, dan hitung pajak otomatis.',
      img: '/screenshots/apotekpro/raw/07_Laporan_Keuangan_dan_PPN.png',
    },
    {
      id: '08',
      title: 'Analisis Bisnis & AI Pintar',
      desc: 'Prediksi penjualan masa depan & produk terlaris apotek.',
      img: '/screenshots/apotekpro/raw/08_Analisis_Bisnis_dan_AI.png',
    },
  ]

  const targetAudiences = [
    {
      role: 'Apoteker (APA) & Tenaga Teknis Farmasi (TTK)',
      badge: 'Praktik Farmasi & Pelayanan Resep',
      badgeColor: 'text-emerald-700',
      img: '/screenshots/apotekpro/human/girl.png',
      alt: 'Apoteker Wanita Apotek Pro',
      gradient: 'from-emerald-50/70 via-white to-white',
      desc: 'Dirancang untuk apoteker, asisten apoteker, dan kasir yang mengelola pelayanan resep obat harian, membutuhkan kalkulator dosis racikan puyer cepat, serta mengawasi peringatan obat kedaluwarsa berstandar FEFO tanpa cemas.',
      points: [
        'Kalkulator dosis racikan puyer otomatis memotong stok presisi',
        'Deteksi dini kedaluwarsa dengan alarm visual nomor batch FEFO',
        'Pencarian obat barcode cepat via kamera HP atau scanner USB',
        'Cetak struk thermal bluetooth & kirim nota rincian ke WhatsApp',
      ],
    },
    {
      role: 'Pemilik Sarana Apotek (PSA) & Dokter Klinik',
      badge: 'Manajemen Bisnis & Pemilik Sarana',
      badgeColor: 'text-blue-700',
      img: '/screenshots/apotekpro/human/laki.png',
      alt: 'Pemilik Apotek & Dokter Apotek Pro',
      gradient: 'from-blue-50/60 via-white to-white',
      desc: 'Pilihan tepat bagi pemilik apotek mandiri, pengelola klinik pratama, dan apotek jejaring untuk memantau omzet per shift kasir, mengawasi buku defecta pemesanan obat ke PBF, dan mengamankan profit 100% offline tanpa iuran bulanan.',
      points: [
        'Rekonsiliasi laci kas otomatis mencegah kebocoran dana per shift',
        'Buku defecta digital siap cetak draf Surat Pesanan (SP) ke PBF',
        'Laporan laba rugi bersih & rekap PPN otomatis siap audit',
        'Database lokal terenkripsi aman tersimpan di perangkat kasir',
      ],
    },
  ]

  const coreModules = [
    {
      num: '01',
      screens: 'POSCashierScreen & PrescriptionScreen',
      headline: 'Kasir Penjualan Apotek Cepat & Input Resep Dokter',
      subHeadline: 'Transaksi obat bebas dan obat racikan dalam hitungan detik',
      features: [
        'Penjualan Cepat Obat Bebas, Bebas Terbatas, dan Obat Keras',
        'Modul Khusus Resep Dokter & Kalkulasi Otomatis Biaya Racikan',
        'Dukungan Barcode Scanner Kamera HP & Pemindai Bluetooth/USB',
        'Multi-Metode Pembayaran: Tunai, QRIS, Transfer Bank, dan Piutang Pasien',
        'Pengurangan Stok Otomatis Secara Real-Time Pasca-Pembayaran',
      ],
    },
    {
      num: '02',
      screens: 'InventoryScreen & UnitManagementScreen',
      headline: 'Manajemen Inventaris Obat & Konversi Multi-Satuan',
      subHeadline: 'Pengelolaan satuan berjenjang dari box hingga butir tanpa selisih',
      features: [
        'Konversi Satuan Fleksibel Otomatis (Box ke Strip, Strip ke Tablet/Kapsul)',
        'Penetapan Multi-Tier Harga Jual (Harga Umum, Grosir, dan Pasien Resep)',
        'Riwayat Kartu Stok Terperinci (Pemasukan, Penjualan, Mutasi, dan Penyesuaian)',
        'Pencarian Cepat Berdasarkan Nama Obat, Barcode, Kategori, atau Indikasi',
        'Fitur Stock Opname Fisik dengan Laporan Selisih Stok Otomatis',
      ],
    },
    {
      num: '03',
      screens: 'ExpiryTrackerScreen & BatchReportScreen',
      headline: 'Alarm Obat Kedaluwarsa & Pelacakan Nomor Batch',
      subHeadline: 'Pantau masa simpan obat secara presisi untuk menjamin keamanan pasien',
      features: [
        'Pencatatan Nomor Batch dan Tanggal Kedaluwarsa (ED) Per Lot Masuk',
        'Sistem Alarm Visual Berperingkat: Merah (<30 Hari), Kuning (<90 Hari)',
        'Pengurutan Penjualan Berbasis FEFO (First Expired, First Out) & FIFO',
        'Filter Khusus Stok Kritis untuk Mempercepat Pengajuan Retur ke PBF',
        'Laporan Lengkap Riwayat Distribusi Batch Obat Terdaftar',
      ],
    },
    {
      num: '04',
      screens: 'DefectaScreen & PurchaseOrderScreen',
      headline: 'Buku Defecta Digital & Pengadaan Barang PBF',
      subHeadline: 'Tidak ada lagi obat habis tanpa sengaja berkat deteksi batas minimum',
      features: [
        'Deteksi Otomatis Obat Menipis Langsung Masuk ke Buku Defecta',
        'Penerbitan Surat Pesanan (SP) Resmi ke Pedagang Besar Farmasi (PBF)',
        'Database Terpadu Supplier, Kontak Salesman PBF, dan Termin Pembayaran',
        'Fitur Retur Obat Rusak atau Mendekati Expired Lengkap dengan Bukti Serah Terima',
        'Pencatatan Penerimaan Barang (Goods Receiving) Berdasarkan Faktur',
      ],
    },
    {
      num: '05',
      screens: 'RakEtalaseScreen & RakManagementScreen',
      headline: 'Pemetaan Posisi Rak & Etalase Obat Visual',
      subHeadline: 'Temukan letak obat di apotek dengan instan saat kasir melayani antrean',
      features: [
        'Pemetaan Presisi Berbasis Nomor Lemari, Kode Rak, dan Posisi Baris',
        'Informasi Posisi Rak Terpampang Langsung di Layar Pencarian Kasir',
        'Zonasi Khusus: Lemari Prekursor/Psikotropika, Lemari Suhu Dingin, & Display Bebas',
        'Optimasi Waktu Pengambilan Obat bagi Apoteker dan Asisten Apoteker',
      ],
    },
    {
      num: '06',
      screens: 'ReceiptPrintScreen & PrinterSettingScreen',
      headline: 'Cetak Struk Kasir Thermal & Etiket Obat Pasien',
      subHeadline: 'Kompatibel dengan printer thermal bluetooth ukuran 58mm dan 80mm',
      features: [
        'Sambungan Langsung Bluetooth & USB ke Segala Merek Printer Thermal',
        'Kustomisasi Identitas Apotek: Nama Toko, Nomor SIA/SIPA, Alamat & Pesan Sehat',
        'Cetak Salinan Resep (Copy Resep) dan Label Etiket Aturan Pakai Pasien',
        'Pratinjau Struk Digital & Kemudahan Ekspor Struk ke Format WhatsApp/PDF',
      ],
    },
    {
      num: '07',
      screens: 'ProfitLossScreen & CashFlowScreen',
      headline: 'Laporan Laba Rugi Real-Time & Arus Kas Apotek',
      subHeadline: 'Ketahui keuntungan bersih dan pergerakan kas harian tanpa rekap manual',
      features: [
        'Kalkulasi Otomatis Laba Bersih (Total Penjualan dikurangi HPP Modal Produk)',
        'Rekapitulasi Arus Kas Masuk dan Kas Keluar Operasional Farmasi',
        'Laporan Rekapitulasi Pajak PPN Penjualan Siap Cetak',
        'Analisis Tren Produk Terlaris dan Performa Penjualan Berdasarkan Periode',
      ],
    },
    {
      num: '08',
      screens: 'ShiftManagementScreen & BusinessDataCashierScreen',
      headline: 'Manajemen Shift Kasir & Rekonsiliasi Laci Kas',
      subHeadline: 'Mencegah kebocoran dana operasional di setiap pergantian operator kasir',
      features: [
        'Pencatatan Kas Awal (Modal Pecahan) saat Membuka Shift Kasir',
        'Rekonsiliasi Otomatis: Uang Fisik di Laci vs Total Penerimaan di Sistem',
        'Deteksi Selisih Kas (Lebih/Kurang) Disertai Berita Acara Tutup Kasir',
        'Rekapitulasi Transaksi Per Kasir untuk Evaluasi Transparansi Staf',
      ],
    },
    {
      num: '09',
      screens: 'UserManagementScreen & SecurityScreen',
      headline: 'Pembagian Hak Akses Pengguna & Keamanan PIN',
      subHeadline: 'Kendali penuh di tangan pemilik untuk melindungi data finansial dan stok',
      features: [
        'Pembagian Peran Pengguna: Pemilik Apotek (Owner), Apoteker (APA), dan Kasir',
        'Proteksi Akses Laporan Keuangan dan Perubahan Master Harga Menggunakan PIN',
        'Fitur Audit Trail: Merekam Riwayat Penghapusan Transaksi dan Penyesuaian Stok',
        'Pengawasan Sesi Perangkat Aktif untuk Keamanan Akun',
      ],
    },
    {
      num: '10',
      screens: 'LocalBackupScreen & CloudBackupScreen',
      headline: 'Bekerja 100% Offline Tanpa Ketergantungan Kuota',
      subHeadline: 'Solusi software kasir mandiri yang selalu aktif meski jaringan terputus',
      features: [
        'Operasional Penuh Tanpa Memerlukan Sambungan Internet (Lokal di Handphone/Tablet)',
        'Pencadangan Database Lokal Satu-Klik ke Memori Internal atau Kartu SD',
        'Sekoci Sinkronisasi Cadangan Cloud Aman Saat Terhubung Jaringan',
        'Zero Monthly Fee: Sekali Pasang, Beroperasi Permanen Tanpa Tagihan Bulanan',
      ],
    },
  ]

  const comparisons = [
    {
      feature: 'Hitung Racikan Resep Puyer',
      oldWay: 'Hitung manual kalkulator saku, takaran dosis miligram rawan salah',
      apotekPro: 'Kalkulator cerdas otomatis hitung dosis anak/dewasa & potong stok presisi',
    },
    {
      feature: 'Manajemen Kedaluwarsa Obat',
      oldWay: 'Cek manual satu per satu di rak, obat expired terlewat hingga belasan juta',
      apotekPro: 'Alarm visual FEFO otomatis lacak nomor batch obat yang mendekati expired',
    },
    {
      feature: 'Pencarian Posisi Rak Obat',
      oldWay: 'Petugas kasir mencari muter-muter rak, antrean pasien menumpuk lama',
      apotekPro: 'Nomor lemari, kode rak & baris etalase langsung terpampang di layar kasir',
    },
    {
      feature: 'Buku Defecta & Pesanan PBF',
      oldWay: 'Catat manual di buku tulis, sering lupa hingga stok kosong & pasien kabur',
      apotekPro: 'Otomatis terdata saat stok sentuh batas aman, siap cetak Surat Pesanan (SP)',
    },
    {
      feature: 'Multi-Satuan Bertingkat',
      oldWay: 'Pusing konversi harga dan hitung sisa stok antara box, strip, dan tablet',
      apotekPro: 'Konversi otomatis multi-satuan dengan penetapan harga fleksibel per kemasan',
    },
    {
      feature: 'Cetak Struk & Etiket Pasien',
      oldWay: 'Tulis etiket aturan pakai tangan manual memakai spidol/pulpen lama',
      apotekPro: 'Cetak struk thermal bluetooth 58/80mm, salinan resep & label etiket instan',
    },
    {
      feature: 'Rekonsiliasi Shift Kasir',
      oldWay: 'Selisih uang kas sering terjadi tanpa bukti jelas antar operator kasir',
      apotekPro: 'Catat modal kas awal, rekonsiliasi laci kas vs sistem & berita acara tutup shift',
    },
    {
      feature: 'Kerahasiaan Laba & PIN',
      oldWay: 'Kasir bisa intip modal HPP kulakan obat atau sembarangan hapus penjualan',
      apotekPro: 'Proteksi PIN multi-peran (Owner, Apoteker, Kasir) & audit trail anti-manipulasi',
    },
    {
      feature: 'Konektivitas & Kestabilan',
      oldWay: 'Software berbasis cloud macet total saat koneksi internet/Wi-Fi apotek down',
      apotekPro: 'Arsitektur Multi Hybrid: 100% Offline Room SQLite lokal + sekoci cloud aman',
    },
    {
      feature: 'Laporan Laba Rugi & Pajak',
      oldWay: 'Rekap buku kas manual di buku folio, laporan keuangan baru siap berminggu-minggu',
      apotekPro: 'Laba bersih real-time (omzet minus HPP), arus kas, dan rekap PPN siap audit',
    },
    {
      feature: 'Model Biaya & Lisensi',
      oldWay: 'Terjebak sewa cloud bulanan ratusan ribu tanpa batas kepemilikan software',
      apotekPro: 'Zero Monthly Fee: Sekali aktivasi aktif permanen tanpa iuran bulanan',
    },
  ]

  const faqs = [
    {
      q: 'Apakah Apotek Pro benar-benar bisa bekerja penuh tanpa internet?',
      a: 'Benar 100%. Apotek Pro dirancang dengan arsitektur Offline-First (Room SQLite lokal mandiri). Seluruh proses transaksi kasir, input resep racikan, manajemen stok, dan cetak struk bluetooth berjalan lancar tanpa memerlukan sambungan internet maupun kuota data.',
    },
    {
      q: 'Bagaimana cara mencoba aplikasinya di handphone atau tablet saya?',
      a: 'Anda dapat bergabung dalam program pengujian resmi Google Play Store FokusKonten hanya dengan 1-klik akun Google melalui tombol "Pasang via Google Play" di halaman ini. Anda langsung mendapatkan akses Starter gratis untuk mencoba seluruh alur kasir dengan verifikasi keamanan Google Play Protect.',
    },
    {
      q: 'Bagaimana jika apotek saya membutuhkan kapasitas lebih dari 100 produk obat?',
      a: 'Anda dapat mengaktifkan peningkatan paket (Pro atau Business) kapan saja secara langsung di dalam aplikasi melalui Google Play Billing. Untuk apotek skala besar atau klinik farmasi yang membutuhkan lisensi Enterprise Lifetime permanen, Anda juga dapat berkonsultasi langsung dengan tim pengembang melalui WhatsApp resmi FokusKonten.',
    },
    {
      q: 'Printer apa saja yang kompatibel dengan Apotek Pro?',
      a: 'Apotek Pro kompatibel dengan seluruh printer thermal Bluetooth standar ESC/POS ukuran 58mm maupun 80mm (seperti Panda, VSC, Iware, Zywell, Bluetooth POS) yang umum digunakan di Indonesia.',
    },
    {
      q: 'Bagaimana keamanan data apotek saya jika handphone kasir rusak atau diganti?',
      a: 'Apotek Pro dilengkapi menu pencadangan (backup) database lokal terenkripsi. Berkas cadangan dapat disimpan secara aman ke memori internal atau Google Drive pribadi Anda, dan dapat dipulihkan (restore) ke perangkat baru dengan hitungan detik.',
    },
  ]

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans antialiased">

      {/* ── BREADCRUMB & BACK NAVIGATION ──────────────────────────────── */}
      <div className="pt-24 sm:pt-28 pb-4 bg-neutral-50/70 border-b border-neutral-100">
        <div className="container-page max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-500">
            <Link href="/" className="hover:text-black transition-colors">Beranda</Link>
            <span>/</span>
            <Link href="/aplikasi" className="hover:text-black transition-colors">Produk &amp; Aplikasi</Link>
            <span>/</span>
            <span className="text-neutral-900 font-semibold">Apotek Pro</span>
          </div>
          <span className="hidden sm:inline-block text-neutral-400 text-xs font-mono">
            Versi Rilis 1.0.2
          </span>
        </div>
      </div>

      {/* ── HERO SALES SECTION ─────────────────────────────────────────── */}
      <section className="pt-12 sm:pt-16 pb-16 bg-white border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">

          <h1 className="heading-xl text-3xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-tight sm:leading-none mb-6 text-balance">
            Kelola Stok Apotek &amp; Kasir Resep Presisi <br className="hidden sm:inline" />
            Tanpa Takut Obat Kedaluwarsa
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            Software kasir POS farmasi pintar berstandar FEFO (First Expired First Out). Hitung dosis resep racikan dokter otomatis, buku defecta digital anti-kehabisan stok, dan cetak struk bluetooth 100% offline tanpa iuran bulanan di perangkat Android Anda.
          </p>

          {/* DUA TOMBOL AKSI UTAMA — GOOGLE PLAY SEBAGAI PRIMADONA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10 max-w-xl mx-auto">
            <a
              href={playTestingWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-sm sm:text-base text-neutral-950 bg-white border-2 border-neutral-300 hover:border-black hover:bg-neutral-50 shadow-md hover:shadow-lg transition-all duration-200 group"
            >
              <svg className="w-6 h-6 shrink-0 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 01-.61-1.636V3.45c0-.624.226-1.198.609-1.636z" fill="#00C3FF"/>
                <path d="M14.851 13.059l2.42 2.42-11.89 6.845 9.47-9.265z" fill="#FF3A44"/>
                <path d="M17.271 10.941l3.197 1.84c.895.516.895 1.364 0 1.88l-3.197 1.84-2.42-2.42 2.42-3.14z" fill="#FFCE00"/>
                <path d="M14.851 10.000L5.38 3.48l11.89 6.845-2.42 2.419z" fill="#00E676"/>
              </svg>
              <span>Pasang Uji Coba (Playstore)</span>
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
              <span>Konsultasi Teknis via WhatsApp</span>
            </a>
          </div>

          {/* BANNER FEATURE GRAPHIC RESMI */}
          <div className="rounded-3xl overflow-hidden border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] max-w-4xl mx-auto mb-12 bg-white">
            <img
              src="/screenshots/apotekpro/Apotek_Pro_Feature_Graphic_1024x500.png"
              alt="Apotek Pro Feature Graphic Banner Resmi"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 4 STATS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto p-6 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
            <div className="p-3 text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Hybrid</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Online &amp; Offline</div>
            </div>
            <div className="p-3 text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">FEFO</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Alarm Batch Expired</div>
            </div>
            <div className="p-3 text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Puyer</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Hitung Racikan Resep</div>
            </div>
            <div className="p-3 text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Rp 0</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Bebas Iuran Bulanan</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── THE DUAL-REEL VIDEO SHOWCASE (CURHATAN & DEMO LIVE) ─────────── */}
      <DualReelVideoShowcase />

      {/* ── PAIN POINTS SECTION ────────────────────────────────────────── */}
      <section className="py-20 bg-neutral-50/60 border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">Tantangan Nyata Apotek</span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3">
              Apakah Masalah Ini Kerap Terjadi di Apotek Anda?
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Menjalankan apotek dengan pencatatan manual atau software sewa rumit sering memicu kebocoran modal tanpa disadari.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {painPoints.map((item, idx) => (
              <div key={idx} className="p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
                <h3 className="font-display text-base sm:text-lg font-bold text-neutral-950 mb-2">{item.title}</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERI GESER INTERAKTIF PREVIEW APLIKASI ────────────────────── */}
      <AppScreenshotGallery
        title="Galeri Antarmuka Apotek Pro"
        subtitle="Geser ke kanan atau kiri untuk melihat langsung alur kerja kasir POS, kalkulator racikan resep dokter, hingga pembukuan obat."
        items={galleryScreenshots}
      />

      {/* ── 10 MODUL RESMI FARMASI TERINTEGRASI ──────────────────────────── */}
      <section className="py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3.5 block">10 Modul Farmasi Lengkap</span>
            <h2 className="heading-xl text-3xl sm:text-5xl text-neutral-950 mb-4 tracking-tight">
              Sistem Kasir &amp; Tata Kelola Apotek Terpadu
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Dibangun dari arsitektur nyata kode Kotlin Android Apotek Pro, setiap modul dirancang untuk menjawab kebutuhan operasional harian apoteker dan kasir apotek di lapangan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {coreModules.map((m) => (
              <div
                key={m.num}
                className="rounded-3xl border border-neutral-200/90 bg-white p-7 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:border-neutral-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Nomor Modul Bersih */}
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
                    MODUL {m.num}
                  </div>

                  {/* Headline & Sub-Headline */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-950 mb-2 leading-snug group-hover:text-black transition-colors">
                    {m.headline}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-neutral-600 font-sans leading-relaxed mb-6 pb-4 border-b border-neutral-100">
                    {m.subHeadline}
                  </p>

                  {/* Fitur Utama */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-1">
                      Fitur Utama:
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

      {/* ── SECTION: TARGET PENGGUNA (SERUPA DENGAN CRM) ───────────────── */}
      <section className="py-24 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3.5 block">Target Pengguna Resmi</span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-3 tracking-tight">
              Cocok Digunakan oleh Siapa Saja?
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans">
              Dirancang khusus untuk mendukung operasional pelayanan resep apotek dan transparansi bisnis farmasi di Indonesia:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {targetAudiences.map((aud, i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden border border-neutral-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] bg-white flex flex-col justify-between hover:shadow-xl hover:border-neutral-400 transition-all duration-300 group"
              >
                {/* Visual Model Dokter / Farmasi */}
                <div className={`bg-gradient-to-b ${aud.gradient} pt-8 px-6 flex justify-center items-end border-b border-neutral-100 relative overflow-hidden h-72 sm:h-80`}>
                  <img
                    src={aud.img}
                    alt={aud.alt}
                    className="h-full w-auto object-contain object-bottom drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Deskripsi & Poin Peran */}
                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className={`text-xs font-mono font-bold uppercase tracking-wider mb-2.5 ${aud.badgeColor}`}>
                      {aud.badge}
                    </div>
                    <h3 className="font-display font-bold text-neutral-950 text-xl sm:text-2xl mb-3 leading-snug">
                      {aud.role}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans mb-6">
                      {aud.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 space-y-2.5">
                    {aud.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-sans">
                        <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON SECTION ─────────────────────────────────────────── */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">Efisiensi &amp; Perbandingan</span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3">
              Perbandingan: Cara Konvensional vs Apotek Pro
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Ketahui alasan mengapa beralih ke Apotek Pro jauh lebih menguntungkan dan mengamankan omzet apotek Anda.
            </p>
          </div>

          <div className="space-y-4">
            {comparisons.map((item, idx) => (
              <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-display font-bold text-neutral-950 text-sm sm:w-1/3">{item.feature}</span>
                <div className="flex-1 text-xs sm:text-sm text-neutral-400 line-through sm:pr-4 font-sans">{item.oldWay}</div>
                <div className="flex-1 text-xs sm:text-sm font-semibold text-neutral-950 font-sans flex items-center gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{item.apotekPro}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-STEP INSTALLATION & GETTING STARTED (CLEAN SHOWCASE) ──────── */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3.5 block">Alur Akses Resmi</span>
          <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-3">
            3 Langkah Cepat Memasang Apotek Pro di Kasir Anda
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto mb-12 leading-relaxed">
            Tanpa prosedur rumit. Langsung rasakan kemudahan kasir farmasi cerdas, lacak batch FEFO otomatis, dan racikan puyer 100% offline tanpa kuota internet di apotek Anda hari ini.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
            {/* Step 1 */}
            <div className="p-7 rounded-3xl border border-neutral-200/80 bg-neutral-50/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono font-extrabold text-neutral-950">01</span>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
                    Akses Grup
                  </span>
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
                  <span className="text-2xl font-mono font-extrabold text-neutral-950">02</span>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                    Akses Uji Coba
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-neutral-950 mb-2">Terima Akses Pengujian</h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  Buka tautan web pengujian Google Play dan konfirmasi menjadi penguji untuk mengaktifkan izin pasang aplikasi di akun Anda.
                </p>
                <a
                  href={playTestingWebUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-emerald-700 underline hover:text-emerald-900 inline-flex items-center gap-1"
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
                  <span className="text-2xl font-mono font-extrabold text-neutral-950">03</span>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
                    Pasang di Kasir
                  </span>
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
                <span className="text-[11px] font-mono text-neutral-500">✓ Starter 100 obat siap beroperasi</span>
              </div>
            </div>
          </div>

          {/* DUA TOMBOL AKSI UTAMA DENGAN FALLBACK */}
          <div className="max-w-xl mx-auto space-y-4">
            <a
              href={playTestingWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-sm sm:text-base text-neutral-950 bg-white border-2 border-neutral-300 hover:border-black hover:bg-neutral-50 shadow-md hover:shadow-lg transition-all duration-200 group"
            >
              <svg className="w-6 h-6 shrink-0 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 01-.61-1.636V3.45c0-.624.226-1.198.609-1.636z" fill="#00C3FF"/>
                <path d="M14.851 13.059l2.42 2.42-11.89 6.845 9.47-9.265z" fill="#FF3A44"/>
                <path d="M17.271 10.941l3.197 1.84c.895.516.895 1.364 0 1.88l-3.197 1.84-2.42-2.42 2.42-3.14z" fill="#FFCE00"/>
                <path d="M14.851 10.000L5.38 3.48l11.89 6.845-2.42 2.419z" fill="#00E676"/>
              </svg>
              <span>Pasang Uji Coba (Playstore)</span>
            </a>

            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Kompatibel Tablet &amp; Smartphone Android (API 24+)</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── FAQ SECTION ────────────────────────────────────────────────── */}
      <section className="py-20 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">Bantuan &amp; Panduan</span>
            <h2 className="heading-xl text-2xl sm:text-3xl text-neutral-950 mb-3">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm">Informasi lengkap seputar pemakaian, kompatibilitas, dan lisensi Apotek Pro.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((f, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
                <h3 className="font-display text-sm sm:text-base font-bold text-neutral-950 mb-2">{f.q}</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CALL TO ACTION ───────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white border-t border-neutral-200/80 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
            Solusi Kasir Farmasi Tanpa Ribet
          </span>
          <h2 className="heading-xl text-2xl sm:text-4xl font-extrabold text-neutral-950 mb-4 tracking-tight">
            Siap Mengamankan Stok &amp; Omzet Apotek Anda Hari Ini?
          </h2>
          <p className="text-neutral-600 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed font-sans">
            Mulai uji coba mandiri 100% offline di tablet atau handphone Android Anda sekarang juga. Tanpa komitmen dan tanpa biaya tersembunyi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-4">
            <a
              href={playTestingWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-display font-bold text-sm sm:text-base text-neutral-950 bg-white hover:bg-neutral-50 transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] border-2 border-neutral-200 hover:border-neutral-400 inline-flex items-center justify-center gap-3 group"
            >
              <svg className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 01-.61-1.636V3.45c0-.624.226-1.198.609-1.636z" fill="#00C3FF"/>
                <path d="M14.851 13.059l2.42 2.42-11.89 6.845 9.47-9.265z" fill="#FF3A44"/>
                <path d="M17.271 10.941l3.197 1.84c.895.516.895 1.364 0 1.88l-3.197 1.84-2.42-2.42 2.42-3.14z" fill="#FFCE00"/>
                <path d="M14.851 10.000L5.38 3.48l11.89 6.845-2.42 2.419z" fill="#00E676"/>
              </svg>
              <span>Pasang Uji Coba (Playstore)</span>
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
              <span>Konsultasi WhatsApp Tim Pengembang</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
