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
    cta: {
      primary: { label: 'Download di Google Play', href: 'https://play.google.com/store/apps/details?id=com.fokuskonten.apotekpro', type: 'playstore' },
      secondary: { label: 'Konsultasi WhatsApp', href: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20tertarik%20dengan%20Apotek%20Pro', type: 'whatsapp' },
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
    cta: {
      primary: { label: 'Download di Google Play', href: 'https://play.google.com/store/apps/details?id=com.fokuskonten.tokokelontongpro', type: 'playstore' },
      secondary: { label: 'Konsultasi WhatsApp', href: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20tertarik%20dengan%20Kelontong%20Pro', type: 'whatsapp' },
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
    cta: {
      primary: { label: 'Download di Google Play', href: 'https://play.google.com/store/apps/details?id=com.fokuskonten.bacaquran', type: 'playstore' },
      secondary: { label: 'Beri Masukan', href: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20masukan%20untuk%20BacaQur%27an', type: 'whatsapp' },
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
    cta: {
      primary: { label: 'Download di Google Play', href: 'https://play.google.com/store/apps/details?id=com.fokuskonten.gamepuzzle', type: 'playstore' },
      secondary: { label: 'Hubungi Kami', href: 'https://wa.me/6285183011318', type: 'whatsapp' },
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
    video: 'https://www.youtube.com/embed/hdsWgj9GdLc',
    cta: {
      primary: { label: 'Konsultasi & Pemesanan Lisensi', href: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20ingin%20info%20WhatsApp%20Lead%20CRM', type: 'whatsapp' },
      secondary: { label: 'Lihat Layanan Kami', href: '/layanan', type: 'internal' },
    },
  },
  hptools: {
    id: 'hptools',
    name: 'FokusKonten HP Tools',
    category: 'Utilitas & Teknisi',
    badge: 'Desktop Suite Teknisi HP',
    tagline: 'Software Desktop Utilitas Diagnosa, Flashing & Servis Smartphone',
    icon: '/app-icons/hptools.png',
    overview: 'FokusKonten HP Tools adalah software desktop Windows komprehensif yang dikembangkan khusus untuk teknisi smartphone dan konter servis ponsel. Mengintegrasikan protokol flashing tingkat rendah multi-chipset (Qualcomm EDL 9008, MediaTek Brom/Preloader, Samsung Odin PIT, Spreadtrum/UNISOC SPD, dan Fastboot/ADB Toolkit) dalam satu antarmuka modern yang cepat dan aman.',
    targetUsers: 'Teknisi Servis HP, Teknisi Hardware/Software Ponsel, Pemilik Konter Reparasi, dan Spesialis Flashing.',
    highlights: [
      'Multi-Chipset Flasher (Qualcomm, MTK, Samsung, SPD, Xiaomi)',
      'Qualcomm EDL 9008 Firehose & Sahara Partition Manager',
      'MediaTek Brom Mode Auth Bypass & Scatter Flash',
      'Samsung Odin PIT & Fastboot/ADB Automated Toolkit',
      'Driver Auto-Detector & Realtime Terminal Log GUI',
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
        title: 'Mempersingkat Waktu Servis Ponsel',
        desc: 'Otomasi alur flashing dan integrasi multi-chipset memangkas waktu kerja teknisi hingga 70% per perangkat.',
      },
      {
        title: 'Antarmuka GUI Bersih & Modern',
        desc: 'Tampilan grafis desktop yang intuitif menghilangkan kebutuhan mengetik perintah command line manual yang rumit.',
      },
      {
        title: 'Keamanan Flashing Terproteksi',
        desc: 'Dilengkapi verifikasi integritas file firmware sebelum proses penulisan partisi untuk mencegah resiko hard-brick.',
      },
    ],
    specs: {
      platform: 'Windows 10 / Windows 11 (64-bit)',
      chipset: 'Qualcomm, MediaTek, Samsung Exynos, UNISOC SPD',
      konektivitas: 'USB (COM Port Auto-Detection, ADB, Fastboot, EDL)',
      format: 'Aplikasi Desktop Mandiri (.EXE)',
      tipe: 'Software Suite Teknisi Ponsel',
    },
    headerImage: '/screenshots/hptools/header.jpg',
    bannerOverlay: true,
    cta: {
      primary: { label: 'Konsultasi & Lisensi Tools', href: 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20tertarik%20dengan%20FokusKonten%20HP%20Tools', type: 'whatsapp' },
      secondary: { label: 'Lihat Layanan Kami', href: '/layanan', type: 'internal' },
    },
  },
}
