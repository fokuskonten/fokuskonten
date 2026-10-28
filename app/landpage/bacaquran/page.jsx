import Link from 'next/link'
import AppScreenshotGallery from '@/components/AppScreenshotGallery'
import BacaQuranVideoShowcase from '@/components/BacaQuranVideoShowcase'

export const metadata = {
  title: 'BacaQur\'an — Al-Qur\'an Digital 100% Offline, Tajwid Berwarna & Super-App Muslim',
  description: 'Aplikasi Al-Qur\'an digital resmi karya FokusKonten murni tanpa iklan mengganggu. Mushaf standar Kemenag RI, audio murottal 30 juz, jadwal shalat akurat, kompas kiblat presisi, tasbih digital haptic, dan doa harian tanpa kuota internet.',
  alternates: { canonical: 'https://fokuskonten.my.id/landpage/bacaquran' },
  openGraph: {
    title: 'BacaQur\'an — Super-App Muslim Resmi FokusKonten',
    description: 'Ibadah lebih khusyuk tanpa distraksi iklan. Al-Qur\'an offline, jadwal shalat otomatis, kiblat presisi, doa, dzikir, dan tajwid lengkap.',
    images: [{ url: '/screenshots/bacaquran/header.png', width: 1200, height: 630, alt: 'BacaQur\'an Header Resmi' }],
  },
}

export default function BacaQuranDedicatedLandingPage() {
  const googleGroupUrl = 'https://groups.google.com/g/penguji-fokuskonten'
  const playTestingWebUrl = 'https://play.google.com/apps/testing/com.fokuskonten.bacaquran'
  const playStoreDirectUrl = 'https://play.google.com/store/apps/details?id=com.fokuskonten.bacaquran'
  const directApkUrl = 'https://github.com/fokuskonten/fokuskonten/releases/download/apps-v1.0/BacaQuran_v1.2.1_Build5.apk'
  const waConsultUrl = `https://wa.me/6285183011318?text=${encodeURIComponent('Halo FokusKonten,\n\nSaya ingin tanya seputar aplikasi BacaQur\'an, program pengujian terbuka Android Play Store, dan cara pasang di handphone saya.')}`

  // Tantangan Nyata — Bahasa Lugas, Ringkas & Bebas Pleonasme
  const painPoints = [
    {
      title: 'Iklan Pop-up Muncul di Tengah Ayat Tilawah',
      desc: 'Sedang khusyuk membaca firman Allah, mendadak layar tertutup iklan video bersuara kencang yang tidak pantas dan memutus konsentrasi ibadah Anda.',
    },
    {
      title: 'Koneksi Internet Lemah Saat di Perjalanan',
      desc: 'Banyak aplikasi Al-Qur\'an memuat ayat secara online. Saat kuota habis atau berada di daerah pelosok, halaman mushaf mendadak gagal dimuat.',
    },
    {
      title: 'Alarm Adzan Meleset dari Waktu Shalat Nyata',
      desc: 'Penetapan waktu shalat tidak akurat karena koordinat lokasi tidak sinkron, membuat Anda was-was saat berpuasa maupun mengejar shalat fardhu awal waktu.',
    },
    {
      title: 'Arah Kiblat Membingungkan Tanpa Kalibrasi',
      desc: 'Kompas kiblat biasa sering berputar liar dan tidak stabil, menyulitkan Anda menentukan arah kiblat yang tepat saat berada di hotel atau luar kota.',
    },
  ]

  // Galeri 12 Tangkapan Layar HD Master Video Resmi BacaQur'an
  const galleryScreenshots = [
    {
      id: '01',
      title: 'Dashboard Beranda Nuansa Cream & Hitung Mundur Shalat',
      desc: 'Tampilan beranda utama bersih: salam penyejuk, hitung mundur hisab shalat terdekat, dan menu cepat 19 fitur ibadah.',
      img: '/screenshots/bacaquran/01_Dashboard_Beranda.jpg',
    },
    {
      id: '02',
      title: 'Navigasi Cepat 114 Surah & Pembagian Juz',
      desc: 'Daftar lengkap 114 surah Makkiyah dan Madaniyah dengan pencarian instan, arti nama surah, dan tab pembagian 30 juz.',
      img: '/screenshots/bacaquran/02_Daftar_Surah_AlQuran.jpg',
    },
    {
      id: '03',
      title: 'Mushaf Standar Kemenag RI & Transliterasi Latin',
      desc: 'Teks ayat Arab beresolusi tajam, tanda waqaf jelas, transliterasi latin resmi, dan terjemahan bahasa Indonesia per ayat.',
      img: '/screenshots/bacaquran/03_Mushaf_Kemenag_AlFatihah.jpg',
    },
    {
      id: '04',
      title: 'Jadwal Shalat Hisab Presisi & 5 Mode Alarm Adzan',
      desc: 'Jadwal hisab Subuh hingga Isya berbasis koordinat lintang-bujur otomatis dengan opsi alarm adzan penuh, dering, atau getar.',
      img: '/screenshots/bacaquran/04_Jadwal_Shalat_5Waktu.jpg',
    },
    {
      id: '05',
      title: 'Kompas Kiblat Sensor Giroskop Presisi Ka\'bah',
      desc: 'Penunjuk derajat Ka\'bah akurat dan stabil menggunakan sensor giroskop handphone tanpa membutuhkan kuota internet.',
      img: '/screenshots/bacaquran/05_Kompas_Arah_Kiblat.jpg',
    },
    {
      id: '06',
      title: 'Kalender Hijriyah & Penanda Puasa Sunnah',
      desc: 'Sinkronisasi tanggal Islam harian, puasa sunnah Ayyamul Bidh, Senin-Kamis, dan hari-hari besar Islam nasional.',
      img: '/screenshots/bacaquran/06_Kalender_Hijriyah_Puasa.jpg',
    },
    {
      id: '07',
      title: 'Kumpulan Doa Harian & Dzikir Pagi Petang',
      desc: 'Ratusan doa mustajab bersumber dalil shahih lengkap dengan teks Arab, tulisan latin, arti bahasa Indonesia, dan audio.',
      img: '/screenshots/bacaquran/07_Kumpulan_Doa_Harian.jpg',
    },
    {
      id: '08',
      title: 'Tasbih Digital Respon Getar Haptic',
      desc: 'Penghitung wirid praktis dengan sentuhan bebas di layar handphone dan getaran lembut di tangan tanpa perlu menatap layar.',
      img: '/screenshots/bacaquran/08_Dzikir_Tasbih_Digital.jpg',
    },
    {
      id: '09',
      title: '99 Asmaul Husna Lengkap Lafal Arab & Makna',
      desc: 'Nama-nama agung Allah SWT tersusun rapi per kartu modern dengan lafal Arab, transliterasi, dan arti keagungan.',
      img: '/screenshots/bacaquran/09_99_Asmaul_Husna.jpg',
    },
    {
      id: '10',
      title: 'Hadits Arbain Shahih & Faidah Kandungan',
      desc: 'Rujukan hadits tematik terpercaya dengan matan Arab berharakat, terjemahan lengkap, dan intisari faedah amal.',
      img: '/screenshots/bacaquran/10_Hadits_Arbain_Shahih.jpg',
    },
    {
      id: '11',
      title: 'Kitab Ibadah & Surah Pilihan (Yasin, Al-Mulk, Al-Waqi\'ah)',
      desc: 'Panduan ibadah dan kumpulan surah utama lengkap dengan keutamaan wirid, liturgi, dan ratib harian keluarga.',
      img: '/screenshots/bacaquran/11_Kitab_Ibadah_Surah_Pilihan.jpg',
    },
    {
      id: '12',
      title: 'Kurikulum Belajar Tajwid & Kelas Tahsin Terstruktur',
      desc: 'Panduan kaidah hukum nun mati, mim mati, mad, waqaf, dan makharijul huruf dari pemula hingga mahir.',
      img: '/screenshots/bacaquran/12_Belajar_Tajwid_Tahsin.jpg',
    },
  ]

  // Target Pengguna Resmi — Dual Persona Muslim Lapang Penuh Tanpa Chip Mengambang
  const targetAudiences = [
    {
      role: 'Santri, Penghafal Al-Qur\'an & Penuntut Ilmu',
      badge: 'Tadarus 30 Juz & Murajaah Harian',
      badgeColor: 'text-neutral-900',
      img: '/screenshots/bacaquran/human/santri_tadarus.png',
      alt: 'Santri dan Penghafal Al-Qur\'an',
      desc: 'Dirancang bagi santri pondok pesantren, penghafal Al-Qur\'an, dan penuntut ilmu yang membutuhkan mushaf beresolusi tajam dengan pewarnaan tajwid interaktif, pemutar murottal per ayat, dan ketenangan tilawah tanpa terganggu iklan pop-up bersuara.',
      tags: [
        'Tadarus 30 Juz',
        'Koreksi Tajwid Warna',
        'Audio Per Ayat',
        'Penanda Ayat Terbuka',
        'Evaluasi Hafalan',
      ],
      points: [
        'Teks mushaf standar resmi Kemenag RI tersimpan utuh di perangkat tanpa butuh kuota internet',
        'Pewarnaan kaidah tajwid interaktif mempermudah tilawah tartil dan koreksi hukum bacaan',
        'Dengarkan lantunan merdu qari internasional ayat per ayat untuk mempermudah murajaah mandiri',
        'Bebas dari segala bentuk iklan video atau pop-up mengganggu yang memutus konsentrasi ibadah',
      ],
      metric: 'Bebas Iklan Selamanya • 100% Mushaf Offline Tanpa Kuota',
    },
    {
      role: 'Pembina Keluarga Muslim & Jamaah Masjid',
      badge: 'Rutinitas Ibadah Harian & Bimbingan Keluarga',
      badgeColor: 'text-neutral-900',
      img: '/screenshots/bacaquran/human/keluarga_doa.png',
      alt: 'Pembina Keluarga Muslim',
      desc: 'Sangat cocok untuk orang tua, kepala keluarga, dan jamaah masjid yang ingin menjaga rutinitas ibadah keluarga tetap tertib: shalat fardhu awal waktu, dzikir pagi petang, tasbih haptic praktis, dan membimbing anak belajar membaca Al-Qur\'an.',
      tags: [
        'Alarm Adzan 5 Mode',
        'Kompas Kiblat Sensor',
        'Dzikir Tasbih Haptic',
        'Kumpulan Doa Harian',
        'Kalender Puasa Sunnah',
      ],
      points: [
        'Jadwal shalat otomatis berbasis koordinat lokasi presisi dengan 5 pilihan mode alarm adzan',
        'Kompas kiblat sensor giroskop yang akurat dan stabil untuk bepergian ke luar kota atau hotel',
        'Dzikir tasbih digital dengan respon getaran lembut di tangan tanpa perlu menatap layar handphone',
        'Ratusan kumpulan doa mustajab dan dzikir pagi petang lengkap teks Arab, latin, dan artinya',
      ],
      metric: 'Super-App Terpadu 19 Modul • Praktis untuk Seluruh Keluarga',
    },
  ]

  // 19 Modul Lengkap Super-App BacaQur'an Sesuai Master Data Aplikasi
  const coreModules = [
    {
      num: '01',
      icon: '/app-icons/bacaquran/3d/quran.png',
      headline: 'Mushaf 30 Juz Standar Kemenag RI',
      subHeadline: 'Teks ayat suci Al-Qur\'an lengkap 114 surah beresolusi tajam',
      features: [
        'Teks mushaf standar resmi Kementerian Agama Republik Indonesia',
        'Dilengkapi transliterasi latin resmi dan terjemahan bahasa Indonesia',
        'Penanda otomatis ayat terakhir yang dibaca langsung dari layar beranda',
        'Pencarian cepat nama surah, nomor juz, atau terjemahan ayat',
      ],
    },
    {
      num: '02',
      icon: '/app-icons/bacaquran/3d/tajwid.png',
      headline: 'Pewarnaan Kaidah Tajwid Interaktif',
      subHeadline: 'Panduan visual hukum bacaan agar tilawah tartil dan tepat',
      features: [
        'Pewarnaan cerdas kaidah Ghunnah, Ikhfa, Idgham, Mad, dan Qalqalah',
        'Keterangan hukum tajwid langsung saat ayat suci dibaca',
        'Mempermudah pemula maupun anak-anak belajar membaca Al-Qur\'an',
        'Dapat diaktifkan atau dinonaktifkan sesuai kenyamanan Anda',
      ],
    },
    {
      num: '03',
      icon: '/app-icons/bacaquran/3d/quran.png',
      headline: 'Audio Murottal 30 Juz Per Ayat',
      subHeadline: 'Lantunan merdu qari internasional ayat per ayat',
      features: [
        'Pilihan qari ternama dunia seperti Syaikh Misyari Rasyid Al-Afasy',
        'Pemutaran audio ayat per ayat mempermudah murajaah mandiri',
        'Kontrol audio praktis: jeda, putar ulang, dan loncat ayat',
        'Kualitas audio jernih dan hemat penyimpanan perangkat',
      ],
    },
    {
      num: '04',
      icon: '/app-icons/bacaquran/3d/jadwal_shalat.png',
      headline: 'Jadwal Shalat Presisi & Countdown',
      subHeadline: 'Penetapan waktu Subuh hingga Isya berbasis hisab akurat',
      features: [
        'Perhitungan hisab resmi untuk seluruh wilayah kota di Indonesia',
        'Hitung mundur waktu shalat terdekat langsung di beranda aplikasi',
        'Otomatis mendeteksi koordinat garis lintang dan bujur lokasi Anda',
        'Tetap akurat tanpa membutuhkan sambungan internet aktif',
      ],
    },
    {
      num: '05',
      icon: '/app-icons/bacaquran/3d/kiblat.png',
      headline: 'Kompas Arah Kiblat Sensor Giroskop',
      subHeadline: 'Penunjuk derajat Ka\'bah akurat di mana pun Anda berada',
      features: [
        'Memanfaatkan sensor kompas dan giroskop internal handphone',
        'Jarum penunjuk kiblat stabil dan terkalibrasi presisi',
        'Bekerja 100% tanpa internet di kamar hotel atau perjalanan luar kota',
        'Dilengkapi indikator derajat dan panduan kalibrasi sensor',
      ],
    },
    {
      num: '06',
      icon: '/app-icons/bacaquran/3d/kalender_hijri.png',
      headline: 'Kalender Hijriah & Puasa Sunnah',
      subHeadline: 'Sinkronisasi penanggalan Islam dan pengingat puasa sunnah',
      features: [
        'Konversi otomatis antara kalender Masehi dan kalender Hijriah',
        'Pengingat jadwal puasa Ayyamul Bidh, Senin-Kamis, dan puasa sunnah',
        'Penetapan hari-hari besar Islam dan peringatan hari keagamaan',
        'Tampilan kalender bulanan bersih dan informatif',
      ],
    },
    {
      num: '07',
      icon: '/app-icons/bacaquran/3d/jadwal_shalat.png',
      headline: 'Alarm Adzan 5 Mode Pengingat',
      subHeadline: 'Pengingat waktu shalat fardhu awal waktu yang dapat disesuaikan',
      features: [
        '5 pilihan mode: Adzan penuh, adzan ringkas, nada dering, getar, atau hening',
        'Tetap berbunyi tepat waktu meski smartphone dalam keadaan terkunci',
        'Pengaturan alarm fleksibel untuk masing-masing waktu shalat fardhu',
        'Notifikasi pengingat sebelum dan saat masuk waktu shalat',
      ],
    },
    {
      num: '08',
      icon: '/app-icons/bacaquran/3d/tasbih.png',
      headline: 'Dzikir Tasbih Digital Getaran Haptic',
      subHeadline: 'Penghitung wirid praktis dengan respon getar lembut di tangan',
      features: [
        'Sentuh area mana saja di layar smartphone untuk menambah hitungan',
        'Getaran haptic halus di setiap ketukan tanpa perlu melihat ke layar',
        'Pilihan target hitungan wirid 33, 99, 100, 1.000, atau hitungan bebas',
        'Riwayat capaian wirid harian tersimpan otomatis di perangkat',
      ],
    },
    {
      num: '09',
      icon: '/app-icons/bacaquran/3d/doa_harian.png',
      headline: 'Kumpulan Doa Mustajab Sehari-Hari',
      subHeadline: 'Ratusan doa ibadah harian bersumber dalil shahih',
      features: [
        'Doa ibadah harian: Bangun tidur, masuk masjid, hingga safar perjalanan',
        'Wirid dzikir pagi dan petang lengkap dengan dalil keutamaan amalan',
        'Teks Arab tajam, tulisan latin, terjemahan Indonesia, dan audio',
        'Fitur favorit untuk menandai doa yang sering diamalkan',
      ],
    },
    {
      num: '10',
      icon: '/app-icons/bacaquran/3d/shalawat.png',
      headline: 'Koleksi Shalawat Nabi Pilihan',
      subHeadline: 'Lantunan shalawat penyejuk hati lengkap teks dan terjemahan',
      features: [
        'Koleksi shalawat populer: Shalawat Nariyah, Thibbil Qulub, Munjiyat',
        'Teks Arab berharakat jelas disertai transliterasi dan makna',
        'Materi keutamaan membaca shalawat kepada Rasulullah SAW',
        'Dapat dibaca dan diamalkan secara mandiri kapan saja',
      ],
    },
    {
      num: '11',
      icon: '/app-icons/bacaquran/3d/asmaul_husna.png',
      headline: '99 Asmaul Husna & Pelafalan Merdu',
      subHeadline: 'Nama-nama agung Allah SWT lengkap arti dan dalil amalan',
      features: [
        '99 nama indah Allah SWT dengan tulisan kaligrafi Arab tajam',
        'Disertai audio pelafalan merdu dan terjemahan bahasa Indonesia',
        'Penjelasan makna teologis dan faedah dzikir Asmaul Husna',
        'Pencarian cepat berdasarkan nomor atau arti nama',
      ],
    },
    {
      num: '12',
      icon: '/app-icons/bacaquran/3d/hadits.png',
      headline: 'Hadits Shahih Pilihan Berbagai Kitab',
      subHeadline: 'Koleksi sabda Rasulullah SAW dari perawi terpercaya',
      features: [
        'Hadits Arbain Nawawi dan hadits tematik akhlak, ibadah, serta muamalah',
        'Rujukan sanad dan derajat hadits bersumber kitab shahih',
        'Teks Arab lengkap dengan terjemahan bahasa Indonesia yang jelas',
        'Membantu memperkaya materi dakwah dan pemahaman sunnah',
      ],
    },
    {
      num: '13',
      icon: '/app-icons/bacaquran/3d/kitab_ibadah.png',
      headline: 'Kitab Tuntunan Ibadah Praktis',
      subHeadline: 'Panduan tata cara thaharah, shalat fardhu, dan sunnah',
      features: [
        'Panduan wudhu, tayamum, dan tata cara mandi wajib yang benar',
        'Tuntunan shalat fardhu 5 waktu, shalat jenazah, dan shalat sunnah',
        'Disertai bacaan doa ruku, sujud, dan tasyahhud bersumber shahih',
        'Disajikan dengan ilustrasi langkah ibadah yang mudah diikuti',
      ],
    },
    {
      num: '14',
      icon: '/app-icons/bacaquran/3d/sirah.png',
      headline: 'Sirah Nabawiyah & Kisah Teladan Tokoh',
      subHeadline: 'Perjalanan hidup Rasulullah SAW dan para sahabat mulia',
      features: [
        'Kisah sejarah kenabian dari kelahiran hingga wafatnya Nabi Muhammad SAW',
        'Biografi Khulafaur Rasyidin dan sahabat-sahabat utama penghafal Al-Qur\'an',
        'Pelajaran akhlak dan hikmah kepemimpinan Islam untuk keluarga',
        'Format narasi yang ramah dibaca untuk anak-anak dan remaja',
      ],
    },
    {
      num: '15',
      icon: '/app-icons/bacaquran/3d/tajwid.png',
      headline: 'Materi Belajar Kaidah Tajwid Lengkap',
      subHeadline: 'Kurikulum teori hukum bacaan Al-Qur\'an terstruktur',
      features: [
        'Kaidah nun mati/tanwin, mim sukun, idgham bighunnah/bilaghunnah',
        'Hukum mad thobi\'i dan mad far\'i lengkap dengan jumlah harakat',
        'Kaidah waqaf, washal, saktah, dan tanda baca mushaf resmi',
        'Disertai contoh ayat nyata dalam Al-Qur\'an untuk tiap hukum',
      ],
    },
    {
      num: '16',
      icon: '/app-icons/bacaquran/3d/tahsin.png',
      headline: 'Kelas Tahsin 3 Tingkatan Belajar',
      subHeadline: 'Perbaikan pelafalan makharijul huruf dari pemula ke mahir',
      features: [
        'Materi berjenjang: Tingkat Dasar, Menengah, dan Lanjutan Mahir',
        'Penjelasan titik keluar huruf hijaiyah (Makharijul Huruf) yang presisi',
        'Perbedaan sifatul huruf: Hams, Jahr, Isti\'la, dan Qalqalah',
        'Sangat cocok sebagai panduan belajar mandiri sebelum setoran guru',
      ],
    },
    {
      num: '17',
      icon: '/app-icons/bacaquran/3d/hafalan.png',
      headline: 'Pelacak & Evaluasi Target Hafalan',
      subHeadline: 'Manajemen murajaah harian untuk santri dan hafiz Al-Qur\'an',
      features: [
        'Catat capaian hafalan per juz, per surah, dan per rentang ayat',
        'Penanda status ayat yang sudah mutqin atau perlu pengulangan',
        'Target waktu harian untuk menjaga kelancaran hafalan Al-Qur\'an',
        'Statistik progres hafalan tersimpan privat di smartphone Anda',
      ],
    },
    {
      num: '18',
      icon: '/app-icons/bacaquran/3d/haji_umrah.png',
      headline: 'Panduan Manasik Haji & Umrah Lengkap',
      subHeadline: 'Tuntunan rukun, wajib, dan amalan ibadah di Tanah Suci',
      features: [
        'Panduan ihram, thawaf, sa\'i, wukuf di Arafah, hingga tahallul',
        'Kumpulan doa manasik haji dan umrah lengkap teks Arab dan arti',
        'Peta rute dan tahapan ibadah di Makkah Al-Mukarramah dan Madinah',
        'Dapat diakses 100% offline saat berada di Arab Saudi tanpa roaming',
      ],
    },
    {
      num: '19',
      icon: '/app-icons/bacaquran/3d/amalan_harian.png',
      headline: 'Amalan Harian Sunnah & Dzikir Rutin',
      subHeadline: 'Daftar cek amalan sunnah harian untuk menjaga istiqamah',
      features: [
        'Ceklis amalan shalat dhuha, tahajjud, sedekah subuh, dan tilawah',
        'Dzikir pagi dan petang Al-Matsurat dengan dalil shahih',
        'Motivasi istiqamah beribadah tanpa beban sewa dan tanpa iklan',
        'Membentuk kebiasaan spiritual harian yang teratur dan tenang',
      ],
    },
  ]

  // 10 Komparasi Nyata Datar — Bersih & Bebas Kartu Bersarang (Anti-Nested Card)
  const comparisons = [
    {
      feature: 'Kenyamanan Tilawah & Bebas Iklan',
      oldWay: 'Sering disisipi iklan video bersuara kencang di tengah membaca ayat',
      bacaQuran: '100% murni tanpa iklan pop-up mengganggu, tilawah khusyuk dan hening',
    },
    {
      feature: 'Ketergantungan Kuota Internet',
      oldWay: 'Memuat teks mushaf secara online, ayat gagal terbuka saat kuota habis',
      bacaQuran: '100% Offline-First, seluruh 30 juz dan fitur tersimpan lokal di perangkat',
    },
    {
      feature: 'Kejelasan Teks Mushaf & Tajwid',
      oldWay: 'Gambar scan halaman kusam atau teks digital polos tanpa hukum tajwid',
      bacaQuran: 'Mushaf standar Kemenag RI tajam dengan pewarnaan tajwid interaktif',
    },
    {
      feature: 'Audio Murottal Per Ayat',
      oldWay: 'Hanya menyediakan audio satu surah penuh yang boros kuota streaming',
      bacaQuran: 'Audio per ayat qari internasional ternama untuk murajaah dan hafalan',
    },
    {
      feature: 'Keakuratan Jadwal Shalat',
      oldWay: 'Perhitungan kota umum sering meleset dari waktu hisab lokal nyata',
      bacaQuran: 'Koordinat lokasi presisi dengan 5 pilihan mode alarm adzan otomatis',
    },
    {
      feature: 'Kestabilan Kompas Kiblat',
      oldWay: 'Jarum kompas berputar liar dan tidak stabil saat membuka aplikasi',
      bacaQuran: 'Sensor giroskop terkalibrasi presisi dengan penunjuk derajat Ka\'bah',
    },
    {
      feature: 'Dzikir Tasbih Digital',
      oldWay: 'Tampilan tombol kaku, wajib menatap layar terus-menerus saat berdzikir',
      bacaQuran: 'Sentuhan bebas di layar dengan respon getaran haptic lembut di tangan',
    },
    {
      feature: 'Kelengkapan Fitur Super-App',
      oldWay: 'Hanya berisi Al-Qur\'an, fitur doa dan jadwal shalat harus pasang aplikasi lain',
      bacaQuran: 'Super-App 19 modul: Murottal, Kiblat, Shalat, Tasbih, Doa, Hadits & Tahsin',
    },
    {
      feature: 'Beban Memori & Baterai HP',
      oldWay: 'Aplikasi berat dengan animasi berlebihan yang membuat handphone cepat panas',
      bacaQuran: 'Arsitektur ringan dan hemat daya baterai, performa gulir super mulus',
    },
    {
      feature: 'Biaya Pemakaian Software',
      oldWay: 'Menarik biaya langganan bulanan mahal untuk menghilangkan iklan',
      bacaQuran: 'Rp 0 Bebas Iuran Bulanan, seluruh fitur terbuka penuh selamanya',
    },
  ]

  // Tanya Jawab Ringkas & Esensial (Format Kartu Bersih Monokrom)
  const faqs = [
    {
      q: 'Apakah aplikasi BacaQur\'an benar-benar bisa digunakan tanpa internet?',
      a: 'Benar 100%. Seluruh teks mushaf 30 juz 114 surah, transliterasi latin, terjemahan resmi Kemenag RI, kumpulan doa, hadits, materi tajwid, dan kompas kiblat tersimpan secara lokal di memori smartphone Anda. Anda dapat mengaji di mana saja tanpa membutuhkan kuota internet.',
    },
    {
      q: 'Apakah ada iklan video yang mengganggu saat sedang membaca Al-Qur\'an?',
      a: 'Tidak ada sama sekali. FokusKonten mendesain BacaQur\'an dengan prinsip ibadah khusyuk. Tidak ada iklan pop-up bersuara, tidak ada banner yang menutupi ayat suci, dan tidak ada jeda iklan yang merusak konsentrasi tilawah Anda.',
    },
    {
      q: 'Bagaimana cara aplikasi menentukan jadwal shalat dan arah kiblat?',
      a: 'Jadwal shalat dihitung otomatis berdasarkan koordinat garis lintang dan bujur lokasi perangkat Anda menggunakan rumus hisab resmi. Arah kiblat ditentukan secara presisi oleh sensor kompas dan giroskop internal handphone Anda menuju titik koordinat Ka\'bah di Masjidil Haram Makkah.',
    },
    {
      q: 'Bagaimana cara saya bergabung sebagai penguji resmi BacaQur\'an?',
      a: 'Caranya sangat mudah dan gratis: ikuti 3 langkah alur pasang di halaman ini. Bergabunglah ke Google Group Penguji Resmi FokusKonten, klik tautan opt-in pengujian web Google Play, dan Anda dapat langsung mengunduh pembaruan resmi melalui aplikasi Google Play Store.',
    },
    {
      q: 'Apakah aplikasi BacaQur\'an memungut biaya langganan bulanan?',
      a: 'Sama sekali tidak ada biaya bulanan (Rp 0 Bebas Sewa). Seluruh ekosistem aplikasi ini dihadirkan untuk mempermudah rutinitas ibadah harian kaum Muslimin di Indonesia.',
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
            <span className="text-neutral-900 font-semibold">BacaQur&#39;an</span>
          </div>
          <span className="hidden sm:inline-block text-neutral-400 text-xs font-mono">
            Versi Rilis 1.2.0
          </span>
        </div>
      </div>

      {/* ── HERO SALES SECTION ─────────────────────────────────────────── */}
      <section className="pt-12 sm:pt-16 pb-16 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h1 className="heading-xl text-3xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-tight sm:leading-none mb-6 text-balance max-w-5xl mx-auto">
            Al-Qur&#39;an Digital &amp; Tajwid Berwarna 100% Offline <br className="hidden sm:inline" />
            Ibadah Lebih Khusyuk Tanpa Gangguan Iklan
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            Bukan sekadar aplikasi Al-Qur&#39;an biasa. Teks mushaf standar Kemenag RI berpewarnaan tajwid, audio murottal 30 juz per ayat, jadwal shalat akurat, kompas kiblat sensor presisi, tasbih digital haptic, dan doa harian lengkap dalam satu aplikasi terpadu yang <strong>100% beroperasi secara offline</strong>.
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/screenshots/bacaquran/header.png"
              alt="BacaQur'an Header Banner Resmi"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 4 STATS GRID DENGAN IKON 3D MENONJOL BEBAS TANPA KOTAK */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
            <div className="p-3 text-center flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/app-icons/bacaquran/3d/quran.png"
                  alt="Mushaf Kemenag RI"
                  className="max-w-full max-h-full object-contain drop-shadow-md hover:scale-110 transition-transform"
                />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">114 Surah</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Mushaf Kemenag RI</div>
            </div>

            <div className="p-3 text-center flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/app-icons/bacaquran/3d/tajwid.png"
                  alt="100% Offline"
                  className="max-w-full max-h-full object-contain drop-shadow-md hover:scale-110 transition-transform"
                />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Tanpa Kuota</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">100% Beroperasi Offline</div>
            </div>

            <div className="p-3 text-center flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/app-icons/bacaquran/3d/jadwal_shalat.png"
                  alt="Jadwal Shalat Otomatis"
                  className="max-w-full max-h-full object-contain drop-shadow-md hover:scale-110 transition-transform"
                />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Otomatis</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Jadwal Shalat &amp; Adzan</div>
            </div>

            <div className="p-3 text-center flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/app-icons/bacaquran/3d/donasi_masjid.png"
                  alt="Bebas Biaya Langganan"
                  className="max-w-full max-h-full object-contain drop-shadow-md hover:scale-110 transition-transform"
                />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Rp 0</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Bebas Iuran Bulanan</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── THE VIDEO SHOWCASE (PRESENTASI RESMI BACAQUR'AN) ─────────── */}
      <BacaQuranVideoShowcase />

      {/* ── PAIN POINTS SECTION ────────────────────────────────────────── */}
      <section className="py-20 bg-neutral-50/60 border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
              Tantangan Ibadah Modern
            </span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3">
              Apakah Masalah Ini Sering Mengganggu Ibadah Anda?
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Sebagian besar aplikasi Al-Qur&#39;an digital membebani pengguna dengan iklan pop-up mendadak dan ketergantungan koneksi internet yang merusak kenyamanan beribadah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((item, idx) => (
              <div key={idx} className="p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-neutral-950 mb-2.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REL GALERI MOCKUP MELEBAR PENUH (EDGE-TO-EDGE) ─────────────── */}
      <AppScreenshotGallery
        label="Tangkapan Layar HD Master Video"
        title="Galeri Antarmuka BacaQur'an Versi Terbaru"
        subtitle="Geser ke samping untuk memeriksa langsung navigasi 114 surah, mushaf standar Kemenag RI, hisab shalat otomatis, kompas kiblat giroskop, tasbih digital haptic, hingga kurikulum tajwid dan kitab ibadah."
        items={galleryScreenshots}
      />

      {/* ── 19 MODUL LENGKAP SUPER-APP BACAQUR'AN (2 KOLOM LAPANG) ─────── */}
      <section className="py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3.5 block">
              19 Modul Ibadah Lengkap
            </span>
            <h2 className="heading-xl text-3xl sm:text-5xl text-neutral-950 mb-4 tracking-tight">
              Fitur Lengkap Super-App Muslim Tanpa Kuota
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Seluruh 19 modul ibadah dirancang mandiri agar beroperasi 100% tanpa internet, responsif, dan ringan tanpa menguras baterai handphone Anda.
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
                        {/* eslint-disable-next-line @next/next/no-img-element */}
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

      {/* ── TARGET PENGGUNA RESMI (DUAL PERSONA SHOWCASE LAPANG PENUH) ─── */}
      <section className="py-24 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3.5 block">
              Target Pengguna
            </span>
            <h2 className="heading-xl text-3xl sm:text-5xl text-neutral-950 mb-4 tracking-tight">
              Sangat Tepat Digunakan Untuk Siapa?
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Dibuat khusus untuk mendukung rutinitas ibadah santri, penghafal Al-Qur&#39;an, jamaah masjid, dan seluruh keluarga Muslim di Indonesia:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {targetAudiences.map((aud, i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden border border-neutral-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.07)] bg-white flex flex-col justify-between hover:shadow-2xl hover:border-neutral-400 transition-all duration-300 group"
              >
                {/* Visual Model Persona Penuh Edge-to-Edge Tanpa Chip Mengambang */}
                <div className="w-full h-[320px] sm:h-[380px] lg:h-[400px] overflow-hidden bg-neutral-100 border-b border-neutral-200/80 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={aud.img}
                    alt={aud.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
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
                        Alur Ibadah &amp; Fitur Harian:
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

      {/* ── 10 KOMPARASI NYATA HEAD-TO-HEAD (FORMAT DATAR ANTI-NESTED) ──── */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
              Perbandingan Nyata
            </span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3">
              Perbandingan: Aplikasi Biasa vs BacaQur&#39;an
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Ketahui alasan mengapa beralih ke BacaQur&#39;an jauh lebih khusyuk, tenang, dan aman tanpa gangguan iklan pop-up.
            </p>
          </div>

          <div className="space-y-4">
            {comparisons.map((item, idx) => (
              <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-display font-bold text-neutral-950 text-sm sm:w-1/3">{item.feature}</span>
                <div className="flex-1 text-xs sm:text-sm text-neutral-400 line-through sm:pr-4 font-sans">{item.oldWay}</div>
                <div className="flex-1 text-xs sm:text-sm font-semibold text-neutral-950 font-sans flex items-center gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{item.bacaQuran}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-STEP INSTALLATION & GETTING STARTED (CLEAN SHOWCASE) ──────── */}
      <section id="alur-pengujian" className="py-20 bg-white border-b border-neutral-200/80 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3.5 block">
            Alur Pemasangan
          </span>
          <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-3">
            3 Langkah Cepat Pasang BacaQur&#39;an di Handphone Anda
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto mb-12 leading-relaxed">
            Tanpa prosedur rumit. Bergabunglah dalam program pengujian terbuka resmi Google Play Console untuk menerima pembaruan aplikasi langsung dari Google Play.
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/app-icons/bacaquran/3d/komunitas.png"
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

            {/* Step 2 - Highlighted */}
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/app-icons/bacaquran/3d/amalan_harian.png"
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
                      Pasang di Handphone
                    </span>
                  </div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/app-icons/bacaquran/3d/quran.png"
                      alt="Pasang di Handphone"
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
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-display font-bold text-xs text-white bg-neutral-950 hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  <span>Buka Halaman Play Store</span>
                  <span className="text-neutral-400">&rarr;</span>
                </a>
              </div>
              <div className="pt-6 border-t border-neutral-200/60 mt-4">
                <span className="text-[11px] font-mono text-neutral-500">✓ Mushaf 30 juz siap tilawah</span>
              </div>
            </div>
          </div>

          {/* DUA PILIHAN CTA: JALUR RESMI PLAY STORE VS UNDUH APK MANDIRI */}
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {/* Opsi 1: Jalur Resmi Google Play */}
              <div className="p-5 rounded-2xl border-2 border-emerald-600 bg-emerald-50/40 text-neutral-950 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>JALUR RESMI (DIREKOMENDASIKAN)</span>
                  </div>
                  <h4 className="font-display font-bold text-neutral-950 text-sm mb-1.5">Google Play Closed Testing</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                    Terverifikasi aman oleh Google Play Protect. Bebas peringatan sistem dan otomatis menerima pembaruan versi terbaru.
                  </p>
                </div>
                <a
                  href={googleGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-display font-bold text-xs sm:text-sm text-white bg-emerald-700 hover:bg-emerald-800 shadow-md hover:shadow-lg transition-all duration-200"
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
                    Unduh file APK v1.2.1 (Build 5) resmi dan pasang langsung di perangkat Android tanpa bergabung ke Google Grup.
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
                  <span>Unduh APK (v1.2.1)</span>
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

            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Kompatibel Tablet &amp; Smartphone Android (API 24+)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION (FORMAT KARTU BERSIH MONOKROM) ─────────────────── */}
      <section className="py-20 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
              Bantuan &amp; Tanya Jawab
            </span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base">
              Jawaban seputar pemakaian, operasional offline, dan fitur lengkap BacaQur&#39;an.
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
            Tilawah Khusyuk &amp; Tenang
          </span>
          <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3 tracking-tight">
            Ibadah Lebih Khusyuk, Kapan Pun &amp; Di Mana Pun
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed font-sans">
            Mulai uji coba mandiri 100% offline di smartphone atau tablet Android Anda sekarang juga. Mushaf standar Kemenag RI bebas dari iklan pop-up selamanya.
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
              href={directApkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-neutral-800 bg-neutral-100/90 border border-neutral-300 hover:border-black hover:bg-neutral-100 shadow-sm transition-all duration-200 inline-flex items-center justify-center gap-2.5"
            >
              <svg className="w-5 h-5 text-neutral-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              <span>Unduh APK Mandiri (v1.2.1)</span>
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
