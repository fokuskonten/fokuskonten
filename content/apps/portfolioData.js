export const portfolioData = {
  apotekpro: {
    id: 'apotekpro',
    name: 'Apotek Pro',
    category: 'Bisnis & POS',
    badge: 'Produk Unggulan Apotek',
    tagline: 'Sistem Kasir & Manajemen Apotek Modern Offline-First',
    icon: '/app-icons/apotekpro.png',
    overview: 'Apotek Pro adalah aplikasi kasir dan manajemen apotek berbasis Android yang dirancang khusus untuk memenuhi standar operasional apotek modern dan toko obat. Mengusung arsitektur Offline-First yang tangguh, Apotek Pro dapat beroperasi 100% tanpa internet sehingga kasir apotek tetap dapat melayani resep dan transaksi tanpa jeda.',
    targetUsers: 'Apoteker, Pemilik Apotek, Asisten Apoteker, Klinik Pratama, dan Toko Obat.',
    highlights: [
      '100% Beroperasi Offline (Tanpa Kuota Internet)',
      'Manajemen Stok Batch & Notifikasi Kadaluarsa',
      'Transaksi Resep Dokter & Obat Bebas',
      'Cetak Struk Thermal Bluetooth (58mm & 80mm)',
      'Laporan Laba Rugi & Neraca Kas Harian',
    ],
    features: [
      {
        title: 'Manajemen Batch & Kadaluarsa Obat',
        desc: 'Pencatatan nomor batch obat masuk, pemantauan masa expired, dan notifikasi peringatan otomatis saat obat mendekati tanggal kadaluarsa.',
      },
      {
        title: 'Kasir Transaksi & Resep Dokter',
        desc: 'Alur kasir cepat untuk penjualan obat bebas (OTC), obat keras (ethical), serta pencatatan nama dokter dan pasien pada resep.',
      },
      {
        title: 'Cetak Struk Bluetooth Thermal',
        desc: 'Dukungan penuh untuk seluruh tipe printer thermal Bluetooth (58mm/80mm) dengan format struk rapi, nama apotek, dan rincian obat.',
      },
      {
        title: 'Laporan Keuangan & Stok Opname',
        desc: 'Rekapitulasi omzet penjualan harian, margin keuntungan bersih, dan penyesuaian stok opname fisik secara berkala.',
      },
      {
        title: 'Penyimpanan Data Lokal Aman',
        desc: 'Data apotek tersimpan di basis data Room SQLite internal perangkat dengan fitur backup dan restore terstruktur.',
      },
    ],
    advantages: [
      {
        title: 'Tanpa Biaya Langganan Bulanan',
        desc: 'Dapat digunakan mandiri tanpa kewajiban biaya langganan bulanan yang memberatkan kas operasional.',
      },
      {
        title: 'Privasi Data Usaha 100% Terjaga',
        desc: 'Riwayat penjualan, data pelanggan, dan harga beli obat tidak diunggah ke pihak ketiga tanpa izin Anda.',
      },
      {
        title: 'Performa Sangat Responsif',
        desc: 'Dibangun dengan Kotlin native berstandar SDK 36 untuk respon antarmuka yang instan tanpa loading.',
      },
    ],
    specs: {
      platform: 'Android 7.0 (Nougat) hingga Android 16 (SDK 36)',
      arsitektur: 'Offline-First (Room SQLite)',
      printer: 'Thermal Bluetooth 58mm & 80mm',
      bahasa: 'Bahasa Indonesia',
      tipe: 'Aplikasi Android Resmi',
    },
    googleGroupUrl: 'https://groups.google.com/g/penguji-fokuskonten',
    landingUrl: '/landpage/apotekpro',
    testingUrl: 'https://play.google.com/apps/testing/com.fokuskonten.apotekpro',
    playstoreUrl: 'https://play.google.com/store/apps/details?id=com.fokuskonten.apotekpro',
    apkDownload: {
      url: 'https://github.com/fokuskonten/fokuskonten/releases/download/apps-v1.0/Apotek_Pro_v1.0.2.apk',
      version: 'v1.0.2',
      size: '60.3 MB',
      filename: 'Apotek_Pro_v1.0.2.apk'
    },
    whatsappUrl: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20tertarik%20dengan%20Apotek%20Pro',
    cta: {
      primary: { label: 'Lihat Promo & Akses Beta', href: '/landpage/apotekpro', type: 'internal' },
      secondary: { label: 'Unduh Berkas APK', href: 'https://github.com/fokuskonten/fokuskonten/releases/download/apps-v1.0/Apotek_Pro_v1.0.2.apk', type: 'apk' },
      tertiary: { label: 'Konsultasi WhatsApp', href: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20tertarik%20dengan%20Apotek%20Pro', type: 'whatsapp' },
    },
    privacyPolicy: '/aplikasi/apotekpro/privacy',
    termsOfService: '/aplikasi/apotekpro/terms',
  },
  tokokelontongpro: {
    id: 'tokokelontongpro',
    name: 'Kelontong Pro',
    category: 'Bisnis & POS',
    badge: 'Solusi Kasir Toko Retail',
    tagline: 'Aplikasi Kasir Praktis Toko Kelontong, Barcode & Piutang',
    icon: '/app-icons/tokokelontongpro.png',
    overview: 'Kelontong Pro adalah software kasir dan manajemen stok barang harian yang dirancang khusus untuk warung sembako, minimarket, dan toko retail kelontong. Memudahkan pemilik toko mencatat transaksi dengan scanner barcode kamera, memonitor stok menipis, serta mencatat hutang/kasbon pelanggan secara rapi.',
    targetUsers: 'Pemilik Toko Kelontong, Warung Sembako, Toko Kelontong Modern, dan Usaha Retail UMKM.',
    highlights: [
      'Scan Barcode Cepat Menggunakan Kamera HP',
      'Pencatatan Hutang & Piutang Pelanggan',
      'Katalog Ribuan SKU Sembako & Barang Dagangan',
      'Cetak Struk Transaksi Bluetooth Thermal',
      'Rekap Omzet & Laporan Penjualan Harian',
    ],
    features: [
      {
        title: 'Barcode Scanner Kamera Instan',
        desc: 'Scan barcode produk kemasan secara instan menggunakan kamera smartphone tanpa perlu membeli scanner mahal.',
      },
      {
        title: 'Buku Kasbon & Hutang Pelanggan',
        desc: 'Catat nama pelanggan yang berhutang, rincian barang yang diambil, jatuh tempo, serta riwayat pembayaran bertahap.',
      },
      {
        title: 'Inventaris & Peringatan Stok Menipis',
        desc: 'Pantau jumlah sisa barang di etalase dan dapatkan notifikasi jika stok barang tertentu sudah hampir habis.',
      },
      {
        title: 'Cetak Struk & Bagikan Nota Digital',
        desc: 'Cetak nota fisik ke printer thermal atau kirim struk digital dalam format teks/gambar via WhatsApp ke pelanggan.',
      },
      {
        title: 'Operasional 100% Offline',
        desc: 'Tetap bisa melayani pembeli saat kondisi mati lampu atau tidak ada jaringan internet di area toko.',
      },
    ],
    advantages: [
      {
        title: 'Mudah Dipelajari oleh Siapapun',
        desc: 'Antarmuka kasir yang sederhana dengan tombol besar yang mudah dioperasikan oleh staf atau penjaga warung.',
      },
      {
        title: 'Data Tersimpan di HP Sendiri',
        desc: 'Seluruh database transaksi disimpan di memori HP Anda dan dapat di-backup ke file eksternal sewaktu-waktu.',
      },
      {
        title: 'Meningkatkan Disiplin Keuangan',
        desc: 'Mencegah selisih kas dan barang hilang dengan rekapitulasi laba kotor harian otomatis.',
      },
    ],
    specs: {
      platform: 'Android 7.0 hingga Android 16 (SDK 36)',
      arsitektur: 'Offline-First (Room SQLite)',
      printer: 'Thermal Bluetooth 58mm & 80mm',
      bahasa: 'Bahasa Indonesia',
      tipe: 'Aplikasi Android Resmi',
    },
    video: 'https://www.youtube.com/embed/EL0Rsx5PcsA',
    googleGroupUrl: 'https://groups.google.com/g/penguji-fokuskonten',
    landingUrl: '/landpage/tokokelontongpro',
    testingUrl: 'https://play.google.com/apps/testing/com.fokuskonten.kelontongpro',
    playstoreUrl: 'https://play.google.com/store/apps/details?id=com.fokuskonten.kelontongpro',
    apkDownload: {
      url: 'https://github.com/fokuskonten/fokuskonten/releases/download/apps-v1.0/Kelontong_Pro_v1.0.0.apk',
      version: 'v1.0.0',
      size: '56.8 MB',
      filename: 'Kelontong_Pro_v1.0.0.apk'
    },
    whatsappUrl: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20tertarik%20dengan%20Kelontong%20Pro',
    cta: {
      primary: { label: 'Lihat Promo & Akses Beta', href: '/landpage/tokokelontongpro', type: 'internal' },
      secondary: { label: 'Unduh Berkas APK', href: 'https://github.com/fokuskonten/fokuskonten/releases/download/apps-v1.0/Kelontong_Pro_v1.0.0.apk', type: 'apk' },
      tertiary: { label: 'Konsultasi WhatsApp', href: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20tertarik%20dengan%20Kelontong%20Pro', type: 'whatsapp' },
    },
    privacyPolicy: '/aplikasi/tokokelontongpro/privacy',
    termsOfService: '/aplikasi/tokokelontongpro/terms',
  },
  bacaquran: {
    id: 'bacaquran',
    name: "BacaQur'an",
    category: 'Religi & Edukasi',
    badge: "Al-Qur'an Digital Resmi",
    tagline: "Baca & Pelajari Al-Qur'an Digital dengan Tanda Tajwid & Terjemahan",
    icon: '/app-icons/bacaquran.png',
    overview: "BacaQur'an adalah aplikasi Al-Qur'an digital yang dirancang untuk memberikan kenyamanan maksimal saat tilawah dan tadarus. Menghadirkan teks mushaf standar Kemenag RI dengan tanda tajwid berwarna, terjemahan bahasa Indonesia resmi, penanda ayat terakhir dibaca, serta mode malam yang sejuk di mata.",
    targetUsers: "Umat Muslim yang ingin membaca, mempelajari, dan mentadabburi Al-Qur'an di perangkat smartphone.",
    highlights: [
      "Teks Mushaf Lengkap 30 Juz & 114 Surah",
      "Tanda Tajwid Berwarna Sesuai Kaidah",
      "Terjemahan Bahasa Indonesia Resmi Kemenag",
      "Bookmark Ayat Terakhir Dibaca & Penanda Favorit",
      "100% Gratis & Dapat Digunakan Tanpa Kuota Internet",
    ],
    features: [
      {
        title: "Tampilan Mushaf Standar & Jelas",
        desc: "Tipografi huruf Arab yang jelas, proporsional, dan nyaman dibaca untuk semua usia tanpa membuat mata lelah.",
      },
      {
        title: "Panduan Tajwid Berwarna",
        desc: "Pewarnaan tajwid interaktif (Ghunnah, Ikhfa, Idgham, Qalqalah, Mad) untuk mempermudah tilawah yang tartil.",
      },
      {
        title: "Terjemahan Per Ayat & Tafsir Ringkas",
        desc: "Dilengkapi terjemahan bahasa Indonesia yang akurat untuk mendalami makna setiap ayat suci.",
      },
      {
        title: "Mode Gelap & Tema Bacaan",
        desc: "Pilihan tema latar belakang malam (Dark Mode) yang nyaman digunakan saat tadarus di ruangan minim cahaya.",
      },
      {
        title: "Pencarian Surah & Juz Cepat",
        desc: "Navigasi instan ke nomor surah, juz, atau nomor ayat tertentu tanpa perlu scrolling panjang.",
      },
    ],
    advantages: [
      {
        title: "Akses Offline Penuh",
        desc: "Seluruh data ayat dan terjemahan tersimpan lokal, siap dibuka kapan saja tanpa memerlukan koneksi data.",
      },
      {
        title: "Bebas Iklan Mengganggu",
        desc: "Pengalaman ibadah yang khusyuk tanpa popup iklan yang menutupi bacaan ayat suci.",
      },
      {
        title: "Ringan & Hemat Baterai",
        desc: "Ukuran aplikasi kompak dan dioptimalkan agar tidak membebani memori smartphone.",
      },
    ],
    specs: {
      platform: 'Android 7.0 hingga Android 16 (SDK 36)',
      arsitektur: 'Native Kotlin Mushaf Engine',
      bahasa: 'Arab & Bahasa Indonesia',
      konten: '30 Juz, 114 Surah, Terjemahan Resmi',
      tipe: 'Aplikasi Android Religi',
    },
    headerImage: '/screenshots/bacaquran/header.png',
    video: 'https://www.youtube.com/embed/DuhmnK7Gnq0',
    googleGroupUrl: 'https://groups.google.com/g/penguji-fokuskonten',
    landingUrl: '/landpage/bacaquran',
    testingUrl: 'https://play.google.com/apps/testing/com.fokuskonten.bacaquran',
    playstoreUrl: 'https://play.google.com/store/apps/details?id=com.fokuskonten.bacaquran',
    apkDownload: {
      url: 'https://github.com/fokuskonten/fokuskonten/releases/download/apps-v1.0/BacaQuran_v1.2.0.apk',
      version: 'v1.2.0',
      size: '4.7 MB',
      filename: 'BacaQuran_v1.2.0.apk'
    },
    whatsappUrl: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20masukan%20untuk%20BacaQur%27an',
    cta: {
      primary: { label: 'Lihat Promo & Akses Beta', href: '/landpage/bacaquran', type: 'internal' },
      secondary: { label: 'Unduh Berkas APK', href: 'https://github.com/fokuskonten/fokuskonten/releases/download/apps-v1.0/BacaQuran_v1.2.0.apk', type: 'apk' },
      tertiary: { label: 'Konsultasi WhatsApp', href: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20masukan%20untuk%20BacaQur%27an', type: 'whatsapp' },
    },
  },
  gamepuzzle: {
    id: 'gamepuzzle',
    name: '2048 Puzzle',
    category: 'Game & Logika',
    badge: 'Game Puzzle Populer',
    tagline: 'Mainkan Puzzle Angka 2048 Klasik yang Ringan & Mengasah Otak',
    icon: '/app-icons/gamepuzzle.png',
    overview: '2048 Puzzle adalah permainan logika angka klasik di mana pemain menggeser ubin bernomor sama untuk menggabungkannya hingga mencapai angka 2048 atau rekor tertinggi. Menawarkan animasi 60 FPS yang mulus, kontrol responsif, mode undo langkah, dan penyimpanan skor otomatis.',
    targetUsers: 'Pecinta game puzzle, pemain yang ingin melatih konsentrasi, dan pengguna yang mencari hiburan ringan.',
    highlights: [
      'Gameplay Klasik Geser & Gabungkan Ubin',
      'Animasi 60 FPS Halus & Ringan',
      'Fitur Undo (Batalkan Langkah Terakhir)',
      'Pencatatan Rekor Skor Tertinggi Otomatis',
      'Bisa Dimainkan 100% Offline Tanpa Kuota',
    ],
    features: [
      {
        title: 'Mekanisme Geser Responsif',
        desc: 'Kontrol gesture swipe 4 arah yang presisi dan responsif tanpa lag.',
      },
      {
        title: 'Tombol Undo Cerdas',
        desc: 'Fitur untuk membatalkan langkah terakhir jika Anda melakukan kesalahan strategi.',
      },
      {
        title: 'Penyimpanan Game Otomatis',
        desc: 'Keluar dari aplikasi kapan saja tanpa kehilangan posisi permainan terakhir Anda.',
      },
      {
        title: 'Desain Minimalis Elegan',
        desc: 'Palet warna modern dengan kontras angka yang jelas dan nyaman dipandang berlama-lama.',
      },
      {
        title: 'Papan Peringkat Rekor Pribadi',
        desc: 'Tantang diri sendiri untuk memecahkan rekor skor tertinggi Anda sebelumnya.',
      },
    ],
    advantages: [
      {
        title: 'Ukuran Aplikasi Sangat Kecil',
        desc: 'Instalasi cepat dalam hitungan detik tanpa memakan ruang penyimpanan perangkat Anda.',
      },
      {
        title: 'Sangat Hemat Baterai',
        desc: 'Dioptimalkan tanpa render 3D berat sehingga tidak membuat ponsel panas.',
      },
      {
        title: 'Cocok untuk Segala Usia',
        desc: 'Permainan edukatif yang melatih penalaran matematika dan perencanaan strategi langkah.',
      },
    ],
    specs: {
      platform: 'Android 7.0 hingga Android 16 (SDK 36)',
      arsitektur: 'Native Canvas 60 FPS',
      bahasa: 'Universal / Bahasa Indonesia',
      tipe: 'Game Android Resmi',
    },
    headerImage: '/screenshots/gamepuzzle/header2.jpg',
    video: 'https://www.youtube.com/embed/vvSRUtPkpgU',
    googleGroupUrl: 'https://groups.google.com/g/penguji-fokuskonten',
    landingUrl: '/landpage/puzzle',
    testingUrl: 'https://play.google.com/apps/testing/com.fokuskonten.gamepuzzle',
    playstoreUrl: 'https://play.google.com/store/apps/details?id=com.fokuskonten.gamepuzzle',
    apkDownload: {
      url: 'https://github.com/fokuskonten/fokuskonten/releases/download/apps-v1.0/2048_Puzzle_v1.4.3.apk',
      version: 'v1.4.3',
      size: '9.5 MB',
      filename: '2048_Puzzle_v1.4.3.apk'
    },
    whatsappUrl: 'https://wa.me/6285183011318',
    cta: {
      primary: { label: 'Buka Halaman Resmi Game', href: '/landpage/puzzle', type: 'internal' },
      secondary: { label: 'Unduh Berkas APK', href: 'https://github.com/fokuskonten/fokuskonten/releases/download/apps-v1.0/2048_Puzzle_v1.4.3.apk', type: 'apk' },
      tertiary: { label: 'Konsultasi WhatsApp', href: 'https://wa.me/6285183011318', type: 'whatsapp' },
    },
  },
  mcjob: {
    id: 'mcjob',
    name: 'MCJob.id App',
    category: 'Produktivitas & Karir',
    badge: 'Platform Bursa Kerja Resmi',
    tagline: 'Aplikasi Pencari Kerja & Portal Rekrutmen Karir Terpercaya',
    icon: '/app-icons/mcjob.png',
    overview: 'MCJob.id adalah platform bursa lowongan kerja resmi yang menghubungkan para pencari kerja dengan ratusan peluang karir terverifikasi dari berbagai industri di Indonesia. Dilengkapi fitur pencarian pintar berdasarkan kota, gaji, dan keahlian, serta sistem resume digital untuk melamar pekerjaan dengan satu sentuhan.',
    targetUsers: 'Fresh Graduate, Profesional Berpengalaman, Job Seeker, dan Perusahaan Rekruter.',
    highlights: [
      'Pencarian Lowongan Kerja Terverifikasi',
      'Filter Lokasi, Gaji, dan Bidang Industri',
      'Pembuatan Resume & CV Digital Cepat',
      'Lamar Pekerjaan Instan (One-Click Apply)',
      'Notifikasi Status Lamaran Realtime',
    ],
    features: [
      {
        title: 'Katalog Lowongan Kerja Resmi',
        desc: 'Ratusan lowongan kerja dari perusahaan terpercaya yang telah melalui proses kurasi dan verifikasi legalitas.',
      },
      {
        title: 'Filter Karir Presisi',
        desc: 'Temukan peluang kerja impian dengan filter spesifik berdasarkan lokasi kota, kisaran gaji, dan tipe pekerjaan (Full Time / Part Time / Remote).',
      },
      {
        title: 'Profil & CV Interaktif',
        desc: 'Lengkapi data pengalaman kerja, riwayat pendidikan, dan portofolio keahlian langsung di dalam profil Anda.',
      },
      {
        title: 'Pelacakan Status Lamaran',
        desc: 'Dapatkan pemberitahuan saat berkas lamaran Anda dibuka, ditinjau HRD, hingga penjadwalan interview.',
      },
      {
        title: 'Terhubung dengan Portal Web MCJob.id',
        desc: 'Akun Anda tersinkronisasi langsung dengan platform web https://mcjob.my.id/ untuk kemudahan akses dari desktop maupun mobile.',
      },
    ],
    advantages: [
      {
        title: 'Bebas Penipuan Lowongan Palsu',
        desc: 'Proses screening ketat terhadap identitas perusahaan pemasang lowongan untuk melindungi pencari kerja.',
      },
      {
        title: 'Gratis untuk Seluruh Pencari Kerja',
        desc: 'Akses tanpa biaya untuk membuat profil, mencari lowongan, dan mengirim lamaran.',
      },
      {
        title: 'Desain Modern & Ergonomis',
        desc: 'Navigasi yang rapi dan mudah digunakan untuk pengalaman mencari kerja yang menyenangkan.',
      },
    ],
    specs: {
      platform: 'Android & Web Ecosystem',
      sinkronisasi: 'Realtime Cloud Karir Engine',
      bahasa: 'Bahasa Indonesia & English',
      tipe: 'Platform Karir & Rekrutmen',
    },
    cta: {
      primary: { label: 'Kunjungi Website MCJob.id', href: 'https://mcjob.my.id/', type: 'external' },
      secondary: { label: 'Konsultasi Rekrutmen', href: 'https://wa.me/6285183011318?text=Halo%20MCJob.id,%20saya%20ingin%20info%20rekrutmen', type: 'whatsapp' },
    },
  },
  whatsappcrm: {
    id: 'whatsappcrm',
    name: 'WhatsApp Lead CRM',
    category: 'Software Desktop Bisnis',
    badge: 'Desktop EXE Windows',
    tagline: 'Software Manajemen Database Prospek & Pipeline Follow-up Penjualan',
    icon: '/app-icons/whatsappcrm.png',
    overview: 'WhatsApp Lead CRM adalah software desktop Windows (.EXE) yang dirancang khusus untuk tim sales, UMKM, dan pemilik bisnis dalam mengelola ratusan kontak prospek WhatsApp secara terstruktur. Membantu memetakan tahapan penjualan (pipeline), mengatur jadwal follow-up berkala, serta mencatat riwayat transaksi tanpa risiko kehilangan data prospek.',
    targetUsers: 'Pemilik Bisnis Online, Tim Sales & Marketing, Agen Properti, Asuransi, dan Layanan Jasa.',
    highlights: [
      'Manajemen Database Kontak & Lead WhatsApp',
      'Papan Pipeline Penjualan (Kanban Board)',
      'Template Pesan Follow-up Personalisasi Cepat',
      'Pencatatan Riwayat Deal & Catatan Pelanggan',
      'Aplikasi Desktop Windows (.EXE) Mandiri',
    ],
    features: [
      {
        title: 'Pipeline Kanban Penjualan',
        desc: 'Visualisasikan perjalanan prospek mulai dari New Lead, Contacted, In Negotiation, hingga Closed Won / Lost.',
      },
      {
        title: 'Template Pesan Cepat & Personalisasi',
        desc: 'Simpan template broadcast dan pesan follow-up dengan variabel nama otomatis untuk mempercepat respon ke pelanggan.',
      },
      {
        title: 'Pengingat Jadwal Follow-up',
        desc: 'Atur tanggal dan jam tindak lanjut agar tim sales tidak pernah melewatkan janji temu atau penawaran produk.',
      },
      {
        title: 'Ekspor & Impor Database Excel / CSV',
        desc: 'Kemudahan memindahkan ribuan data kontak dari spreadsheet ke dalam sistem CRM dalam hitungan detik.',
      },
      {
        title: 'Instalasi Desktop Windows Mandiri',
        desc: 'Software dijalankan langsung di komputer/laptop Windows Anda dengan performa cepat tanpa beban browser.',
      },
    ],
    advantages: [
      {
        title: 'Tingkatkan Rasio Konversi Penjualan',
        desc: 'Follow-up yang tepat waktu dan terstruktur terbukti meningkatkan rasio closing penjualan hingga 300%.',
      },
      {
        title: 'Data Prospek Aman di Komputer Anda',
        desc: 'Database prospek berharga tersimpan offline di harddisk Anda, bebas dari kebocoran data pihak ketiga.',
      },
      {
        title: 'Sekali Beli Tanpa Biaya Bulanan',
        desc: 'Bebas dari biaya langganan SaaS bulanan yang mahal, sangat efisien untuk perkembangan UMKM.',
      },
    ],
    specs: {
      platform: 'Windows 10 / Windows 11 (64-bit)',
      format: 'Aplikasi Desktop (.EXE)',
      arsitektur: 'Local Database Engine',
      bahasa: 'Bahasa Indonesia',
      tipe: 'Software Desktop Bisnis',
    },
    headerImage: '/screenshots/whatsappcrm/header.png',
    bannerOverlay: true,
    landingUrl: '/landpage/whatsappcrm',
    cta: {
      primary: { label: 'Konsultasi & Pemesanan Lisensi', href: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20ingin%20info%20WhatsApp%20Lead%20CRM', type: 'whatsapp' },
      secondary: { label: 'Lihat Layanan Kami', href: '/layanan', type: 'internal' },
    },
  },
  jumptools: {
    id: 'jumptools',
    name: 'JumperTools',
    category: 'Utilitas & Teknisi',
    badge: 'Universal Hardware & Flasher Suite',
    tagline: 'Software Desktop C# WPF .NET 8 Multi-Chipset Flashing, Unlocking & Diagnosa Smartphone',
    icon: '/app-icons/jumptools.png',
    overview: 'JumperTools Pro adalah software suite desktop Windows (.EXE) generasi baru yang dibangun dengan arsitektur C# .NET 8 WPF modern dengan Ribbon UI. Mengintegrasikan protokol flashing dan perbaikan tingkat rendah untuk multi-chipset (Qualcomm Emergency Download EDL 9008 Sahara/Firehose, MediaTek Brom & Preloader DA Bypass, Samsung Odin & PIT Partition, serta Spreadtrum/UNISOC SPD FDL) dalam satu aplikasi mandiri yang tangguh untuk teknisi ponsel profesional.',
    targetUsers: 'Teknisi Smartphone, Pemilik Konter Servis HP, Spesialis Flashing & Unbrick, Lab Hardware Ponsel.',
    highlights: [
      'Multi-Chipset Flasher (Qualcomm, MediaTek, Samsung, UNISOC SPD)',
      'Qualcomm EDL 9008 Firehose RawProgram & Patch Flashing',
      'MediaTek Brom Auth Bypass SLA/DAA & NVRAM/NVDATA Repair',
      'Samsung Odin PIT Extractor & 4-File Firmware Automation',
      'Modern Ribbon GUI C# .NET 8 WPF dengan Realtime USB Log Terminal',
    ],
    features: [
      {
        title: 'Qualcomm EDL 9008 Flasher & Firehose',
        desc: 'Membaca, menulis, mem-backup partisi (Boot, Recovery, System, EFS/QCN, Modem), serta unbrick perangkat Qualcomm via mode Emergency Download (EDL 9008).',
      },
      {
        title: 'MediaTek (MTK) Brom & DA Bypass',
        desc: 'Bypass proteksi SLA/DAA pada chipset MTK (Dimensity & Helio), flashing scatter firmware resmi, serta perbaikan partisi NVRAM/NVDATA.',
      },
      {
        title: 'Samsung Odin & PIT Partition Assistant',
        desc: 'Otomasi instalasi firmware 4 file (BL, AP, CP, CSC), pembacaan tabel partisi PIT, dan tool perbaikan soft-brick Samsung.',
      },
      {
        title: 'Spreadtrum / UNISOC (SPD) Dump Suite',
        desc: 'Dukungan handshake bootloader FDL1/FDL2, pembacaan info partisi chipset SPD, dan otomasi flashing firmware PAC.',
      },
      {
        title: 'Fastboot, Recovery & ADB Diagnostics',
        desc: 'Deteksi otomatis tipe ponsel, versi kernel, status unlock bootloader, sideload update, dan navigasi reboot satu klik tanpa tombol fisik.',
      },
    ],
    advantages: [
      {
        title: 'Performa C# .NET 8 WPF Responsif',
        desc: 'Dibangun di atas runtime .NET 8 x64 modern untuk proses penulisan file biner firmware dengan kecepatan transfer USB maksimal.',
      },
      {
        title: 'Antarmuka Ribbon Modern Tanpa CLI Rumit',
        desc: 'Tampilan grafis Ribbon profesional yang rapi menghilangkan keharusan menghafal ratusan baris perintah terminal command-line.',
      },
      {
        title: 'Keamanan Flashing Terproteksi',
        desc: 'Dilengkapi verifikasi hash checksum file firmware sebelum proses penulisan partisi untuk mencegah resiko hard-brick permanen.',
      },
    ],
    specs: {
      platform: 'Windows 10 / Windows 11 (64-bit)',
      arsitektur: 'Native .NET 8 WPF (C# MVVM Architecture)',
      chipset: 'Qualcomm, MediaTek, Samsung Exynos, UNISOC SPD',
      konektivitas: 'USB COM Port Auto-Detect, ADB, Fastboot, EDL',
      format: 'Aplikasi Desktop Mandiri (.EXE)',
      tipe: 'Universal Smartphone Flasher & Repair Suite',
    },
    headerImage: '/screenshots/jumptools/header.jpg',
    landingUrl: '/landpage/jumptools',
    cta: {
      primary: { label: 'Konsultasi & Lisensi JumperTools', href: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20tertarik%20dengan%20JumperTools%20Pro', type: 'whatsapp' },
      secondary: { label: 'Lihat Layanan Kami', href: '/layanan', type: 'internal' },
    },
  },
  hptools: {
    id: 'hptools',
    name: 'JumperTools (FokusKonten HP Tools)',
    category: 'Utilitas & Teknisi',
    badge: 'Universal Hardware & Flasher Suite',
    tagline: 'Software Desktop C# WPF .NET 8 Multi-Chipset Flashing, Unlocking & Diagnosa Smartphone',
    icon: '/app-icons/jumptools.png',
    overview: 'JumperTools Pro (sebelumnya FokusKonten HP Tools) adalah software suite desktop Windows (.EXE) generasi baru yang dibangun dengan arsitektur C# .NET 8 WPF modern dengan Ribbon UI. Mengintegrasikan protokol flashing dan perbaikan tingkat rendah untuk multi-chipset (Qualcomm Emergency Download EDL 9008 Sahara/Firehose, MediaTek Brom & Preloader DA Bypass, Samsung Odin & PIT Partition, serta Spreadtrum/UNISOC SPD FDL) dalam satu aplikasi mandiri yang tangguh untuk teknisi ponsel profesional.',
    targetUsers: 'Teknisi Smartphone, Pemilik Konter Servis HP, Spesialis Flashing & Unbrick, Lab Hardware Ponsel.',
    highlights: [
      'Multi-Chipset Flasher (Qualcomm, MediaTek, Samsung, UNISOC SPD)',
      'Qualcomm EDL 9008 Firehose RawProgram & Patch Flashing',
      'MediaTek Brom Auth Bypass SLA/DAA & NVRAM/NVDATA Repair',
      'Samsung Odin PIT Extractor & 4-File Firmware Automation',
      'Modern Ribbon GUI C# .NET 8 WPF dengan Realtime USB Log Terminal',
    ],
    features: [
      {
        title: 'Qualcomm EDL 9008 Flasher & Firehose',
        desc: 'Membaca, menulis, mem-backup partisi (Boot, Recovery, System, EFS/QCN, Modem), serta unbrick perangkat Qualcomm via mode Emergency Download (EDL 9008).',
      },
      {
        title: 'MediaTek (MTK) Brom & DA Bypass',
        desc: 'Bypass proteksi SLA/DAA pada chipset MTK (Dimensity & Helio), flashing scatter firmware resmi, serta perbaikan partisi NVRAM/NVDATA.',
      },
      {
        title: 'Samsung Odin & PIT Partition Assistant',
        desc: 'Otomasi instalasi firmware 4 file (BL, AP, CP, CSC), pembacaan tabel partisi PIT, dan tool perbaikan soft-brick Samsung.',
      },
      {
        title: 'Spreadtrum / UNISOC (SPD) Dump Suite',
        desc: 'Dukungan handshake bootloader FDL1/FDL2, pembacaan info partisi chipset SPD, dan otomasi flashing firmware PAC.',
      },
      {
        title: 'Fastboot, Recovery & ADB Diagnostics',
        desc: 'Deteksi otomatis tipe ponsel, versi kernel, status unlock bootloader, sideload update, dan navigasi reboot satu klik tanpa tombol fisik.',
      },
    ],
    advantages: [
      {
        title: 'Performa C# .NET 8 WPF Responsif',
        desc: 'Dibangun di atas runtime .NET 8 x64 modern untuk proses penulisan file biner firmware dengan kecepatan transfer USB maksimal.',
      },
      {
        title: 'Antarmuka Ribbon Modern Tanpa CLI Rumit',
        desc: 'Tampilan grafis Ribbon profesional yang rapi menghilangkan keharusan menghafal ratusan baris perintah terminal command-line.',
      },
      {
        title: 'Keamanan Flashing Terproteksi',
        desc: 'Dilengkapi verifikasi hash checksum file firmware sebelum proses penulisan partisi untuk mencegah resiko hard-brick permanen.',
      },
    ],
    specs: {
      platform: 'Windows 10 / Windows 11 (64-bit)',
      arsitektur: 'Native .NET 8 WPF (C# MVVM Architecture)',
      chipset: 'Qualcomm, MediaTek, Samsung Exynos, UNISOC SPD',
      konektivitas: 'USB COM Port Auto-Detect, ADB, Fastboot, EDL',
      format: 'Aplikasi Desktop Mandiri (.EXE)',
      tipe: 'Universal Smartphone Flasher & Repair Suite',
    },
    headerImage: '/screenshots/jumptools/header.jpg',
    landingUrl: '/landpage/jumptools',
    cta: {
      primary: { label: 'Konsultasi & Lisensi JumperTools', href: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20tertarik%20dengan%20JumperTools%20Pro', type: 'whatsapp' },
      secondary: { label: 'Lihat Layanan Kami', href: '/layanan', type: 'internal' },
    },
  },
  reimage: {
    id: 'reimage',
    name: 'FokusKonten ReImage',
    category: 'Utilitas & Optimasi',
    badge: 'Image Optimizer & Rust Engine',
    tagline: 'Software Desktop Kompresi, Optimasi & Konversi Gambar Multi-Core Super Cepat',
    icon: '/app-icons/reimage.png',
    overview: 'FokusKonten ReImage Pro adalah software aplikasi desktop Windows (.EXE) berperforma tinggi untuk fotografer, pengelola website, dan desainer. Memadukan antarmuka modern C# .NET 8 WPF dengan engine C-FFI Rust libcaesium multi-core, aplikasi ini mampu mereduksi ukuran file gambar hingga 90% tanpa penurunan kualitas visual yang tampak mata, mendukung kompresi batch ribuan foto, konversi ke format modern WebP/JPG/PNG, serta fitur target ukuran file presisi (byte target). Dilengkapi maskot resmi Burung Dara Berkelas (Rock Dove).',
    targetUsers: 'Fotografer, Webmaster, Seller Marketplace (Shopee/Tokopedia), Desainer Grafis, Admin E-Commerce.',
    highlights: [
      'Engine Kompresi Rust libcaesium Multi-Core Ultra Cepat',
      'Kompresi Lossy (10–100%) & Lossless Zopfli/WebP',
      'Fitur Presisi Target Ukuran File (Target File Size in Bytes)',
      'Konversi Format Dua Fase (JPG, PNG, WebP) Batch',
      '6 Preset Komersial Cepat: Marketplace, Web, IG, Email, Cetak, Lossless',
      'Totem Maskot Resmi Rock Dove (Burung Dara Berkelas)',
    ],
    features: [
      {
        title: 'Engine Rust libcaesium Multi-Threaded',
        desc: 'Memanfaatkan seluruh core prosesor PC lokal Anda untuk kompresi paralel ribuan gambar secara instan tanpa lag atau memory leak.',
      },
      {
        title: 'Mode Target Ukuran File Presisi',
        desc: 'Tentukan batas maksimal file yang Anda inginkan (misal: harus di bawah 200 KB untuk Shopee atau di bawah 100 KB untuk Web); ReImage otomatis mengkalkulasi parameter optimal.',
      },
      {
        title: 'Konversi Format WebP Modern',
        desc: 'Mengubah format gambar lawas menjadi WebP generasi baru dengan transparansi alpha tetap utuh dan rasio kompresi 30% lebih hemat dari JPEG.',
      },
      {
        title: 'Komparasi Visual Sebelum & Sesudah',
        desc: 'Panel pratinjau real-time dengan slider perbandingan pixel-by-pixel untuk memastikan detail visual tetap tajam sebelum disimpan.',
      },
      {
        title: 'Proteksi Anti-Pembengkakan File',
        desc: 'Algoritma cerdas otomatis membatalkan penulisan jika hasil kompresi ternyata lebih besar dari file aslinya, menjaga efisiensi penyimpanan.',
      },
    ],
    advantages: [
      {
        title: '100% Offline & Privasi Terjaga',
        desc: 'Seluruh proses optimasi berlangsung langsung di PC Anda tanpa mengunggah foto pribadi atau aset klien ke server cloud pihak ketiga.',
      },
      {
        title: 'Tanpa Biaya Langganan Bulanan',
        desc: 'Bebas dari biaya SaaS kompresi online yang membatasi kuota bulanan file gambar Anda.',
      },
      {
        title: 'Satu File Eksekusi Ringan (Single-File)',
        desc: 'Ukuran master aplikasi sangat ringkas (~560 KB) dengan konsumsi RAM di bawah 60 MB saat standby.',
      },
    ],
    specs: {
      platform: 'Windows 10 / Windows 11 (64-bit x64)',
      arsitektur: 'Native .NET 8 WPF + C-FFI Rust libcaesium',
      formatDukungan: 'JPEG, PNG, WebP (Input & Output)',
      kecepatan: 'Multi-Core Thread Pool CPU Acceleration',
      format: 'Aplikasi Desktop Single-File (.EXE)',
      tipe: 'Image Optimization & Conversion Suite',
    },
    landingUrl: '/landpage/reimage',
    cta: {
      primary: { label: 'Konsultasi & Lisensi ReImage', href: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20tertarik%20dengan%20FokusKonten%20ReImage%20Pro', type: 'whatsapp' },
      secondary: { label: 'Lihat Layanan Kami', href: '/layanan', type: 'internal' },
    },
  },
  smartvidkon: {
    id: 'smartvidkon',
    name: 'Smart Vidkon Automation',
    category: 'Produktivitas & Video',
    badge: 'Video Automation & NVENC',
    tagline: 'Desktop Video Automation Suite dengan Akselerasi GPU NVENC & Whisper AI',
    icon: '/app-icons/smartvidkon.png',
    overview: 'Smart Vidkon Automation Pro adalah software desktop Windows (.EXE) canggih untuk otomasi produksi massal konten video vertikal 9:16 (YouTube Shorts, Instagram Reels, dan TikTok). Mengintegrasikan pipeline render berbasis hardware encoder NVIDIA NVENC yang super cepat, ekstraksi waktu audio kata-per-kata menggunakan Whisper AI lokal, generasi teks kinetik otomatis, serta lembar storyboard visual interaktif dalam satu kendali desktop profesional.',
    targetUsers: 'Kreator Konten Video, Digital Media Agency, Pengelola Akun Edukasi & Bisnis, Podcaster.',
    highlights: [
      'Hardware-Accelerated NVIDIA NVENC Video Rendering Pipeline',
      'Whisper Word-Level Accurate Alignment & Timing Extraction',
      'AI Voiceover Multi-Engine (Gemini Studio TTS & ElevenLabs)',
      'Storyboard Visual Contact Sheet Generator Otomatis',
      'Pustaka Footage B-Roll & BGM Bebas Royalti Terintegrasi',
      '100% Berjalan Lokal di PC Tanpa Ketergantungan Cloud',
    ],
    features: [
      {
        title: 'Rendering GPU NVIDIA NVENC Ultra-Cepat',
        desc: 'Perakitan video Full HD 1080x1920 60 FPS langsung diproses oleh chip encoder hardware grafis NVIDIA tanpa membebani prosesor utama PC.',
      },
      {
        title: 'Transkripsi Presisi Per-Kata Whisper CUDA',
        desc: 'Mengekstrak stempel waktu per-kata secara akurat untuk memposisikan sorot animasi teks kinetik yang selaras dengan intonasi ucapan narator.',
      },
      {
        title: 'Generator Tipografi Teks Kinetik',
        desc: 'Penyusunan subtitle bergerak otomatis dengan pergantian gaya teks, penekanan kata kunci, dan transisi halus.',
      },
      {
        title: 'Storyboard Contact Sheet Generator',
        desc: 'Menciptakan lembar pratinjau matriks kontak visual seluruh adegan video untuk memudahkan kurasi alur cerita sebelum render final.',
      },
      {
        title: 'Katalog Footage B-Roll & BGM SQLite',
        desc: 'Pengelolaan ledger aset video latar dan musik pengiring bebas Content ID secara otomatis berbasis basis data lokal.',
      },
    ],
    advantages: [
      {
        title: 'Hemat Waktu Produksi hingga 85%',
        desc: 'Proses editing video pendek yang biasanya memakan waktu berjam-jam dapat diselesaikan dalam hitungan menit secara terotomasi.',
      },
      {
        title: 'Bebas Biaya Server Cloud Render',
        desc: 'Seluruh proses render dijalankan langsung di kartu grafis PC lokal Anda tanpa tagihan compute engine cloud yang mahal.',
      },
      {
        title: 'Kualitas Output 60 FPS Jernih',
        desc: 'Hasil akhir video Full HD vertikal tajam dengan bitrate teroptimasi untuk algoritma rekomendasi YouTube Shorts dan TikTok.',
      },
    ],
    specs: {
      platform: 'Windows 10 / Windows 11 (64-bit)',
      arsitektur: 'C# .NET Windows Forms + FFmpeg NVENC + Python Whisper',
      akselerator: 'NVIDIA GPU (GTX 1650/1660 SUPER ke atas didukung)',
      resolusiOutput: 'Vertikal 9:16 (1080x1920) Full HD 60 FPS',
      format: 'Aplikasi Desktop Mandiri (.EXE)',
      tipe: 'Video Automation & Conference Studio Suite',
    },
    cta: {
      primary: { label: 'Konsultasi & Lisensi Smart Vidkon', href: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20tertarik%20dengan%20Smart%20Vidkon%20Automation%20Pro', type: 'whatsapp' },
      secondary: { label: 'Lihat Layanan Kami', href: '/layanan', type: 'internal' },
    },
  },
  smartmotion: {
    id: 'smartmotion',
    name: 'Smart Motion Automation',
    category: 'Produktivitas & Animasi',
    badge: 'Motion Graphics & Remotion 60FPS',
    tagline: 'Engine Otomasi Video Kinetik 60 FPS Berbasis React Remotion & Semantic Router',
    icon: '/app-icons/smartmotion.png',
    overview: 'Smart Motion Automation Suite adalah software desktop Windows (.EXE) revolusioner yang mengotomatiskan pembuatan video motion graphic tipografi kinetik vertikal (Shorts/Reels) menggunakan engine prosedural React Remotion 60 FPS. Dilengkapi router semantik yang mengklasifikasikan kata kunci secara dinamis, orkestrasi efek suara (SFX) ketukan presisi, serta arsitektur dua jalur mandiri: Paket Corporate Suite (Elements 3000) dan Paket Cartoon Suite (Action FX Pop-Art). Mengusung totem maskot Gagak Hitam (Raven Master).',
    targetUsers: 'Motion Designer, Digital Agency, Video Editor, Brand Storyteller, Kreator Konten Finansial & Tech.',
    highlights: [
      'Engine Animasi Prosedural React Remotion 60 FPS Berstandar Studio',
      'Blueprint SSOT Dua Jalur Mandiri (Corporate Elements 3000 & Cartoon Action FX)',
      'Klasifikasi Semantik 7 Kelas Kata (Danger, Tech, Number, Negative, Positive, Question, CTA)',
      'Sinkronisasi Otomatis Micro Sound Effects (SFX Hits & Whooshes)',
      'Transkripsi Hibrida Faster-Whisper CUDA + Gemini Audio AI',
      'Totem Maskot Resmi Gagak Hitam (Raven Master)',
    ],
    features: [
      {
        title: 'Engine Kinetik Tipografi Remotion 60 FPS',
        desc: 'Rendering grafis gerak tingkat kode menggunakan komponen React deklaratif dengan kehalusan pergerakan 60 frame per detik bebas patah-patah.',
      },
      {
        title: 'Blueprint Dua Jalur Bebas Kontaminasi Silang',
        desc: 'Pemisahan tegas antara gaya Corporate/Tech formal (6 archetypes kinetik rapi) dan gaya Cartoon/Pop-Art (comic bursts, speech bubbles, brush strokes) tanpa tercampur acak.',
      },
      {
        title: 'Router Semantik Klasifikasi Kata Pintar',
        desc: 'Secara cerdas mendeteksi kata-kata penekanan penting pada naskah dan menerapkan gaya visual serta warna aksen yang sesuai makna konteks.',
      },
      {
        title: 'Peredam Kepadatan Kata & Anti-Clutter',
        desc: 'Filter otomatis kata pengisi (filler) dan penjagaan jarak waktu (rest gap) minimal 8 frame antar-kata untuk keterbacaan mata yang prima.',
      },
      {
        title: 'GUI Desktop Control Studio C# WinForms',
        desc: 'Antarmuka kontrol desktop terpadu untuk pengaturan naskah, upload audio vokal, pemilihan BGM, dan monitoring progres render secara visual.',
      },
    ],
    advantages: [
      {
        title: 'Kualitas Animasi Tingkat Agensi Premium',
        desc: 'Menghasilkan video berkelas tanpa ketergantungan pada template After Effects manual yang berat dan memakan waktu berhari-hari.',
      },
      {
        title: 'Skalabilitas Produksi Massal Instan',
        desc: 'Cukup masukkan file rekaman suara narasumber; sistem langsung menganalisis waktu kata, menata tipografi, dan merender video otomatis.',
      },
      {
        title: 'Dukungan Audio Multi-Track Cerdas',
        desc: 'Penyelarasan otomatis volume vokal, background music (ducking audio), dan efek ketukan tanpa tabrakan frekuensi suara.',
      },
    ],
    specs: {
      platform: 'Windows 10 / Windows 11 (64-bit)',
      arsitektur: 'C# WinForms + React Remotion + Node.js Kinetic Engine',
      framerate: '60 FPS Full HD Vertikal (1080x1920)',
      engineAudio: 'Faster-Whisper CUDA + FFmpeg Silencedetect',
      format: 'Aplikasi Desktop Mandiri (.EXE)',
      tipe: 'Kinetic Motion Graphics Automation Suite',
    },
    cta: {
      primary: { label: 'Konsultasi & Lisensi Smart Motion', href: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20tertarik%20dengan%20Smart%20Motion%20Automation', type: 'whatsapp' },
      secondary: { label: 'Lihat Layanan Kami', href: '/layanan', type: 'internal' },
    },
  },
  ptnti: {
    id: 'ptnti',
    name: 'PT. Nurcahya Teknik Industry',
    category: 'Web PWA & Industrial',
    badge: 'Industrial Manufacturing PWA',
    tagline: 'Platform Digital Profil Industri Machining Presisi, CNC Milling & Bubut, Stamping Dies, dan Fabrikasi Logam',
    icon: '/app-icons/ptnti.png',
    overview: 'PT. Nurcahya Teknik Industry (PT NTI) adalah platform Progressive Web App (PWA) profil industri manufaktur presisi dan katalog rekayasa logam interaktif. Dibangun dengan standar performa web modern berarsitektur Offline-First Service Worker, platform ini memfasilitasi kebutuhan industri otomotif, mesin perakitan, dan manufaktur berskala nasional dalam memesan komponen presisi toleransi mikron.',
    targetUsers: 'Perusahaan Manufaktur, Manajer Pengadaan (Procurement), Pabrik Otomotif, Industri Perakitan Mesin, dan Workshop Rekayasa Logam.',
    highlights: [
      'PWA Standalone Offline-Ready dengan Service Worker Caching',
      'Katalog Interaktif 30+ Produk Machining, Dies, Mold & Jig Fixture',
      'Formulir Digital RFQ (Request for Quotation) Terintegrasi',
      'Detail Spesifikasi Mesin CNC Hision & GUT 3-Axis Toleransi Mikron',
      'Desain Responsif Mobile-First dengan Akses Cepat Ringan',
    ],
    features: [
      {
        title: 'Katalog Komponen Machining Presisi',
        desc: 'Menampilkan katalog interaktif spherical precision parts, pelat cetakan die, billet kontur kompleks, dan komponen bubut dengan toleransi presisi mikron.',
      },
      {
        title: 'Portal RFQ & Estimasi Proyek',
        desc: 'Memudahkan calon mitra industri mengirimkan spesifikasi CAD, estimasi volume produksi, dan permintaan penawaran harga secara langsung.',
      },
      {
        title: 'Showcase Fasilitas & Mesin CNC',
        desc: 'Dokumentasi transparan mesin CNC Bubut Hision, CNC Milling GUT 3-Axis, mesin milling manual, dan perlengkapan QC inspection.',
      },
      {
        title: 'PWA Offline & Mobile Standalone',
        desc: 'Dapat diinstal langsung ke homescreen Android, iOS, maupun desktop PC tanpa melalui Play Store dengan performa instan tanpa loading.',
      },
      {
        title: 'Integrasi Video Profil & Dokumentasi',
        desc: 'Penyajian dokumentasi video proses manufaktur, fabrikasi rak assembly, dan jaminan mutu ISO untuk meningkatkan kredibilitas klien enterprise.',
      },
    ],
    advantages: [
      {
        title: 'Kecepatan Akses & Zero Latency',
        desc: 'Arsitektur statis murni yang dioptimasi untuk pemuatan secepat kilat bahkan pada jaringan industri yang lambat.',
      },
      {
        title: 'Komunikasi Cepat WhatsApp & Email',
        desc: 'Tautan langsung ke tim sales engineering untuk konsultasi teknis gambar teknik dan jadwal produksi.',
      },
      {
        title: 'Kredibilitas Profil Perusahaan',
        desc: 'Memperkuat citra profesional PT. Nurcahya Teknik Industry di mata prinsipal industri dan korporasi multinasional.',
      },
    ],
    specs: {
      tipe: 'Progressive Web App (PWA) Standalone',
      frontend: 'HTML5 Semantik, Vanilla CSS3 Modern, Vanilla JavaScript ES6+',
      caching: 'Service Worker Cache-First & Offline Fallback Shell',
      penyimpanan: 'IndexedDB & LocalStorage',
      responsif: '100% Mobile, Tablet & Desktop Adaptive (Fluid Grid)',
      targetIndustri: 'Precision Machining, CNC Bubut, CNC Milling, Mold Dies & Stamping',
      status: 'Production Live PWA (App_Web/PT_Nurcahya_Teknik_Industry)',
    },
    cta: {
      primary: { label: 'Konsultasi Proyek PT NTI', href: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20ingin%20konsultasi%20proyek%20PT%20NTI', type: 'whatsapp' },
      secondary: { label: 'Lihat Layanan Kami', href: '/layanan', type: 'internal' },
    },
  },
}
