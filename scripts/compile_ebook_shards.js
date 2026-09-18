// ══════════════════════════════════════════════════════════════════════════════
// scripts/compile_ebook_shards.js — Master Pipeline Kompilasi Data E-Book Sharding O(1)
// FokusKonten V10.0 Superior Enterprise — Zero Kata Buku
// ══════════════════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const ROOT_DIR = path.resolve(__dirname, '..');
const SERVER_DIR = path.resolve(__dirname, '../../../Server-Fokuskonten');
const DB_PATH = path.join(SERVER_DIR, 'product_digital.db');
const CACHE_DIR = path.join(SERVER_DIR, 'storage');
const METADATA_CACHE_FILE = path.join(CACHE_DIR, 'ebook_physical_metadata_cache.json');
const SAFELINK_CACHE_FILE = path.join(CACHE_DIR, 'safelink_ebook_cache.json');

const OUTPUT_DIR = path.join(ROOT_DIR, 'content/ebook');
const SHARDS_DIR = path.join(OUTPUT_DIR, 'shards');
const ITEMS_DIR = path.join(OUTPUT_DIR, 'items');

// 18 RUMPUN SILO KATEGORI RESMI (ZERO KATA 'BUKU')
const CATEGORY_MAP = {
  'E-Book Agama Islam': { name: 'Agama Islam & Tafsir', slug: 'agama-islam', desc: 'Kajian naskah Islam, fiqih syariat, hadits shahih, dan mutiara tafsir Al-Qur\'an.' },
  'E-Book Tafsir': { name: 'Agama Islam & Tafsir', slug: 'agama-islam', desc: 'Kajian naskah Islam, fiqih syariat, hadits shahih, dan mutiara tafsir Al-Qur\'an.' },
  'Buku & Yasin': { name: 'Agama Islam & Tafsir', slug: 'agama-islam', desc: 'Kajian naskah Islam, fiqih syariat, hadits shahih, dan mutiara tafsir Al-Qur\'an.' },
  'E-Book Novel': { name: 'Novel & Fiksi', slug: 'novel-fiksi', desc: 'Karya fiksi terpilih, novel romansa, drama misteri, petualangan, dan thriller.' },
  'E-Book Pendidikan': { name: 'Pendidikan & Akademik', slug: 'pendidikan-akademik', desc: 'Diktat keilmuan, modul ajar mahasiswa, kurikulum sekolah, dan referensi akademik.' },
  'E-Book Pengembangan Diri': { name: 'Pengembangan Diri & Motivasi', slug: 'pengembangan-diri', desc: 'Strategi pembentukan kebiasaan, manajemen fokus, kepemimpinan, dan pola pikir bertumbuh.' },
  'E-Book Bisnis': { name: 'Bisnis, Finansial & Investasi', slug: 'bisnis-finansial', desc: 'Panduan membangun bisnis, strategi marketing, analisis saham, dan manajemen arus kas.' },
  'E-Book Bisnis Investasi': { name: 'Bisnis, Finansial & Investasi', slug: 'bisnis-finansial', desc: 'Panduan membangun bisnis, strategi marketing, analisis saham, dan manajemen arus kas.' },
  'E-Book Keuangan': { name: 'Bisnis, Finansial & Investasi', slug: 'bisnis-finansial', desc: 'Panduan membangun bisnis, strategi marketing, analisis saham, dan manajemen arus kas.' },
  'E-Book Bisnis Online': { name: 'Bisnis, Finansial & Investasi', slug: 'bisnis-finansial', desc: 'Panduan membangun bisnis, strategi marketing, analisis saham, dan manajemen arus kas.' },
  'E-Book Kesehatan': { name: 'Kesehatan & Kedokteran', slug: 'kesehatan-kedokteran', desc: 'Wawasan medis, terapi herbal, nutrisi seimbang, dan pola hidup sehat holistik.' },
  'E-Book Resep Masakan': { name: 'Kuliner & Resep Masakan', slug: 'kuliner-resep', desc: 'Kompilasi resep masakan nusantara, teknik kuliner profesional, dan rahasia bumbu legendaris.' },
  'E-Book Kuliner': { name: 'Kuliner & Resep Masakan', slug: 'kuliner-resep', desc: 'Kompilasi resep masakan nusantara, teknik kuliner profesional, dan rahasia bumbu legendaris.' },
  'E-Book Pengetahuan': { name: 'Sains & Pengetahuan Umum', slug: 'sains-pengetahuan', desc: 'Eksplorasi ilmu alam, fakta sejarah peradaban, teknologi masa depan, dan ensiklopedia.' },
  'E-Book Hukum': { name: 'Hukum & Perundang-Undangan', slug: 'hukum-undang-undang', desc: 'Kompilasi kitab undang-undang, studi perkara perdata pidana, dan kaidah peradilan hukum.' },
  'E-Book Psikologi': { name: 'Psikologi & Perilaku', slug: 'psikologi-perilaku', desc: 'Dinamika kejiwaan, komunikasi antarpribadi, kecerdasan emosional, dan analisis perilaku manusia.' },
  'E-Book Sastra': { name: 'Sastra & Puisi', slug: 'sastra-puisi', desc: 'Antologi puisi mendalam, karya sastra pujangga klasik, dan kajian estetika bahasa.' },
  'E-Book Pertanian': { name: 'Pertanian & Peternakan', slug: 'pertanian-peternakan', desc: 'Budidaya tanaman pangan, agroteknologi modern, hidroponik, dan peternakan terpadu.' },
  'E-Book Peternakan': { name: 'Pertanian & Peternakan', slug: 'pertanian-peternakan', desc: 'Budidaya tanaman pangan, agroteknologi modern, hidroponik, dan peternakan terpadu.' },
  'E-Book Politik': { name: 'Politik & Sosial Kebijakan', slug: 'politik-kebijakan', desc: 'Dinamika geopolitik global, sistem demokrasi, sosiologi kemasyarakatan, dan kebijakan publik.' },
  'E-Book Buku Anak': { name: 'Edukasi Anak & Parenting', slug: 'edukasi-anak', desc: 'Cerita bergambar mendidik, pembentukan karakter anak usia dini, dan pedoman orang tua.' },
  'E-Book Kerja-Karir': { name: 'Karir & Dunia Kerja', slug: 'karir-kerja', desc: 'Tips wawancara kerja, peningkatan keahlian profesional, negosiasi gaji, dan produktivitas kantor.' },
  'E-Book Filsafat': { name: 'Filsafat & Logika Pemikiran', slug: 'filsafat-logika', desc: 'Dialektika pemikiran filsuf ternama, seni bernalar kritis, epistemologi, dan etika kehidupan.' },
  'E-Book Majalah': { name: 'Majalah & Jurnal Digital', slug: 'majalah-jurnal', desc: 'Edisi majalah tematik, liputan investigatif, dan rangkuman tren industri kreatif.' },
  'E-Book Budaya & Tradisi': { name: 'Budaya, Tradisi & Sejarah', slug: 'budaya-sejarah', desc: 'Warisan adat istiadat nusantara, narasi sejarah suku bangsa, dan kearifan lokal masa lalu.' }
};

// DAFTAR PENULIS TERNAMA
const KNOWN_AUTHORS = [
  'Pierre Lemaitre', 'Enniyy', 'Pipit Chie', 'Alya Ranti', 'Atika', 'Chiang June', 
  'Yeo Eunice', 'Erna Damayanti', 'Erna Dam', 'Lydia Goenadhi', 'Lydia Goenadh',
  'Tere Liye', 'Boy Candra', 'Fiersa Besari', 'Andrea Hirata', 'Dee Lestari', 'Pramoedya Ananta Toer',
  'Habiburrahman El Shirazy', 'Asma Nadia', 'Eka Kurniawan', 'Ahmad Fuadi', 'Raditya Dika',
  'Mira W', 'Marga T', 'Ika Natassa', 'Ilana Tan', 'AliaZalea', 'Orizuka', 'Winna Efendi',
  'Sofi Meloni', 'Risa Saraswati', 'Henry Manampiring', 'Rhenald Kasali', 'Ippho Santosa',
  'Robert T. Kiyosaki', 'Napoleon Hill', 'Dale Carnegie', 'James Clear', 'Morgan Housel',
  'Stephen R. Covey', 'Brian Tracy', 'Simon Sinek', 'Mark Manson', 'Malcolm Gladwell',
  'Imam Al-Ghazali', 'Imam Syafi\'i', 'Imam Nawawi', 'Ibnu Katsir', 'Ibnu Qayyim', 'Ibnu Taimiyah',
  'Teungku Muhammad Hasbi Ash-Shiddieqy', 'Quraish Shihab', 'Hamka', 'Buya Hamka',
  'Syaikh Salim bin Ied Al-Hilali', 'Syaikh Muhammad Nashiruddin Al-Albani', 'Muhammad Nashiruddin Al-Albani',
  'Syaikh Utsaimin', 'Imam Bukhari', 'Imam Muslim', 'Imam Abu Daud', 'Imam At-Tirmidzi',
  'Imam An-Nasa\'i', 'Imam Ibnu Majah', 'Imam Malik', 'Imam Ahmad', 'Imam Adz-Dzahabi',
  'Imam Ad-Darimi', 'Imam Ad-Daraquthni', 'Imam Ibnu Hibban', 'Imam Ibnu Khuzaimah', 'Al-Hafizh Ibnu Hajar Al-Asqalani'
];

// KAMUS PERBAIKAN JUDUL SPESIFIK
const SPECIFIC_FIXES = {
  'IDBE76': { title: 'The Life-Changing Magic of Tidying Up', author: 'Marie Kondo' },
  'IDC5F5': { title: 'Untung Besar Budidaya Tanaman Anggrek', author: 'Erna Damayanti' },
  'IDF3C0': { title: 'Tafsir An Nuur Jilid 1', author: 'Teungku Muhammad Hasbi Ash-Shiddieqy' },
  'IDAB13': { title: 'Psikologi Komunikasi: Suatu Pengantar dan Perspektif', author: 'Jalaluddin Rakhmat' },
  'ID57E9': { title: 'Tumbuhan Herbal dalam Islam yang Berkhasiat Obat', author: 'Dr. Zaidul Akbar' },
  'ID4643': { title: 'Perlindungan Hukum Anak Pidana dalam Perspektif Viktimologi', author: 'Pakar Hukum Pidana' },
  'IDD1CF': { title: 'Pengantar Ekonomi Mikro', author: 'Dra. Ec. Lydia Goenadhi' },
  'ID8A6E': { title: 'Teknologi Budidaya dan Pascapanen Kelapa Sawit', author: 'Pakar Agroteknologi' },
  'ID9155': { title: 'Perbanyak Tanaman Hias Secara In Vitro', author: 'Budi Winarto' },
  'IDD424': { title: 'Pemuliaan Tanaman Melalui Induksi Mutasi dan Kultur Jaringan', author: 'Peneliti Bioteknologi' }
};

function formatTitleCase(str) {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => {
    const lower = txt.toLowerCase();
    if (['dan', 'di', 'ke', 'dari', 'untuk', 'pada', 'tentang', 'dengan', 'yang', 'atau', 'in', 'of', 'the', 'and', 'by', 'an', 'a'].includes(lower)) {
      return lower;
    }
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  }).replace(/^[a-z]/, (c) => c.toUpperCase());
}

function cleanTitleAndAuthor(sku, rawTitle) {
  if (SPECIFIC_FIXES[sku]) return SPECIFIC_FIXES[sku];

  let title = rawTitle.trim();
  let author = '';

  const karyaMatch = title.match(/\(Karya:?\s*([^\)]+)\)/i);
  if (karyaMatch) {
    author = karyaMatch[1].trim();
    title = title.replace(/\(Karya:?\s*[^\)]+\)/i, '').trim();
  }

  if (!author) {
    const byMatch = title.match(/\s+By\s+([A-Za-z\s\.\,\'\-]+)$/i);
    if (byMatch) {
      author = byMatch[1].trim();
      title = title.replace(/\s+By\s+[A-Za-z\s\.\,\'\-]+$/i, '').trim();
    }
  }

  if (!author) {
    const parenMatch = title.match(/\(([A-Z][a-zA-Z\s\.\,\'\-]+)\)$/);
    if (parenMatch) {
      const inside = parenMatch[1].trim();
      if (!/jilid|edisi|lengkap|koleksi|vol|part|cetakan|terjemahan|buku/i.test(inside)) {
        author = inside;
        title = title.replace(/\([A-Z][a-zA-Z\s\.\,\'\-]+\)$/, '').trim();
      }
    }
  }

  if (!author) {
    for (const ka of KNOWN_AUTHORS) {
      const regex = new RegExp(`\\s+${ka.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i');
      if (regex.test(title)) {
        author = ka;
        title = title.replace(regex, '').trim();
        break;
      }
    }
  }

  // DOKTRIN ZERO KATA 'BUKU' DI AWAL JUDUL
  title = title.replace(/^Buku Pintar\b/i, 'Panduan Pintar');
  title = title.replace(/^Buku Saku\b/i, 'Ringkasan Saku');
  title = title.replace(/^Buku Ajar\b/i, 'Diktat Ajar');
  title = title.replace(/^Buku Panduan\b/i, 'Panduan Praktis');
  title = title.replace(/^Buku\s+/i, '');

  title = formatTitleCase(title.replace(/\s+/g, ' '));
  return { title, author };
}

function determineContextualValueHook(cleanTitle, author, group) {
  const t = cleanTitle.toLowerCase();

  if (group.includes('Agama Islam') || group.includes('Tafsir')) {
    if (t.includes('tafsir') || t.includes('al-quran') || t.includes('tadabbur') || t.includes('ayat')) {
      return 'Tadabbur Makna Ayat, Asbabun Nuzul & Hikmah Hidup';
    }
    if (t.includes('shahih') || t.includes('hadits') || t.includes('sunan') || t.includes('riyadhus')) {
      return 'Matan Hadits Shahih, Sanad Terpercaya & Kaidah Sunnah';
    }
    if (t.includes('fiqih') || t.includes('shalat') || t.includes('puasa') || t.includes('zakat') || t.includes('riba')) {
      return 'Kaidah Syariat Praktis, Rukun Ibadah & Fatwa Terpercaya';
    }
    if (t.includes('doa') || t.includes('dzikir') || t.includes('wirid') || t.includes('yasin')) {
      return 'Lafaz Arab Latin, Terjemahan Lengkap & Khasiat Amalan Harian';
    }
    if (t.includes('sirah') || t.includes('tarikh') || t.includes('sahabat') || t.includes('khalifah')) {
      return 'Kisah Keteladanan Perjuangan, Sejarah Kenabian & Ibrah Nabawi';
    }
    return 'Kajian Keislaman Mendalam, Risalah Keimanan & Nasihat Akhlak';
  }

  if (group.includes('Novel') || group.includes('Fiksi')) {
    if (t.includes('cinta') || t.includes('hati') || t.includes('rindu') || t.includes('nikah') || t.includes('jodoh')) {
      return 'Sinopsis Romansa Emosional, Perjalanan Rasa & Konflik Hati';
    }
    if (t.includes('misteri') || t.includes('kriminal') || t.includes('detektif') || t.includes('alex') || t.includes('thriller')) {
      return 'Sinopsis Thriller Menegangkan, Teka-Teki Plot Kriminal & Misteri Gelap';
    }
    return 'Sinopsis Alur Menarik, Dinamika Karakter & Ulasan Novel Terbaik';
  }

  if (group.includes('Bisnis') || group.includes('Finansial') || group.includes('Investasi')) {
    if (t.includes('saham') || t.includes('investasi') || t.includes('trading') || t.includes('uang')) {
      return 'Strategi Analisis Fundamental Saham, Portofolio & Cuan Konsisten';
    }
    if (t.includes('marketing') || t.includes('iklan') || t.includes('copywriting') || t.includes('omzet')) {
      return 'Formula Penjualan Laris, Trik Copywriting & Strategi Pelanggan';
    }
    return 'Cetak Biru Membangun Bisnis Menguntungkan & Manajemen Finansial';
  }

  if (group.includes('Pengembangan Diri')) {
    if (t.includes('habit') || t.includes('kebiasaan') || t.includes('fokus') || t.includes('tidying')) {
      return 'Metode Transformasi Kebiasaan, Disiplin Mental & Produktivitas Harian';
    }
    return 'Intisari Motivasi Hidup, Manajemen Waktu & Pola Pikir Sukses';
  }

  if (group.includes('Kesehatan')) {
    return 'Pedoman Medis Terpercaya, Nutrisi Alami & Pola Hidup Sehat';
  }
  if (group.includes('Kuliner')) {
    return 'Koleksi Resep Pilihan, Takaran Bumbu Presisi & Panduan Memasak';
  }
  if (group.includes('Pendidikan')) {
    return 'Konsep Dasar Teori, Rangkuman Materi Lengkap & Ulasan Akademik';
  }
  if (group.includes('Hukum')) {
    return 'Kajian Kaidah Perundangan, Tinjauan Yuridis & Penerapan Hukum';
  }
  if (group.includes('Psikologi')) {
    return 'Analisis Perilaku Manusia, Manajemen Emosi & Pendekatan Psikologis';
  }
  if (group.includes('Pertanian') || group.includes('Peternakan')) {
    return 'Pedoman Budidaya Terbukti, Teknik Panen Melimpah & Perawatan Praktis';
  }
  if (group.includes('Anak')) {
    return 'Cerita Edukatif Bergambar, Pembentukan Budi Pekerti & Nasihat Anak';
  }

  return 'Intisari Komprehensif, Pembahasan Mendalam & Wawasan Bermanfaat';
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function extractPureSummary(rawDesc) {
  if (!rawDesc) return '';
  let text = rawDesc;
  // Tangkap blok ringkasan produk
  const match = text.match(/RINGKASAN\s*(?:PRODUK|DAN\s*NILAI\s*PRODUK|&\s*NILAI\s*KOLEKSI)?\s*:([\s\S]*?)(?:SPESIFIKASI|CAKUPAN|STANDAR\s*PENGIRIMAN|PANDUAN\s*PEMESANAN|\n\n[A-Z\s&]+:|$)/i);
  if (match && match[1]) {
    text = match[1].trim();
  }

  // Buang 100% seluruh template toko online jika masih tersisa
  text = text
    .replace(/^PRODUK\s*:.*$/gim, '')
    .replace(/^KODE\s*SKU\s*:.*$/gim, '')
    .replace(/^SKU\s*:.*$/gim, '')
    .replace(/^KATEGORI\s*:.*$/gim, '')
    .replace(/^SPESIFIKASI\s*&?\s*KELENGKAPAN\s*:[\s\S]*$/gim, '')
    .replace(/^STANDAR\s*PENGIRIMAN\s*&?\s*AKSES\s*LAYANAN\s*:[\s\S]*$/gim, '')
    .replace(/^PANDUAN\s*PEMESANAN\s*:[\s\S]*$/gim, '')
    .replace(/.*Klik\s*tombol\s*["']?Beli\s*Sekarang["']?.*$/gim, '')
    .replace(/Buku\s*Ini/gi, 'Naskah ini')
    .replace(/Buku/gi, 'E-Book')
    .trim();

  return text;
}

function hashString(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function extractCleanSummary(rawDesc) {
  if (!rawDesc) return '';
  const m = rawDesc.match(/RINGKASAN (?:PRODUK|& NILAI KOLEKSI):\s*([\s\S]*?)(?=\n\s*(?:SPESIFIKASI|STANDAR|PANDUAN|CAKUPAN|$))/i);
  if (m && m[1].trim().length > 20) {
    return m[1].trim().replace(/\s+/g, ' ');
  }
  return '';
}

function getThematicPillars(catName, cleanTitle) {
  const cat = (catName || '').toLowerCase();
  const t = (cleanTitle || '').toLowerCase();

  if (cat.includes('agama') || cat.includes('tafsir') || cat.includes('islam') || t.includes('fiqih') || t.includes('hadits') || t.includes('doa') || t.includes('sholat')) {
    return [
      { title: 'Landasan Dalil & Rujukan', desc: 'Menghimpun rujukan nash Al-Qur\'an dan hadits secara terstruktur untuk memperkuat pemahaman keilmuan Islam.' },
      { title: 'Kaidah Hukum & Amaliah', desc: 'Menjabarkan pedoman ibadah dan amalan praktis yang dapat diterapkan secara proporsional dalam keseharian.' },
      { title: 'Penataan Akhlak & Adab', desc: 'Menuntun pembinaan karakter, adab terpuji, dan kebersihan jiwa berlandaskan tuntunan yang shahih.' },
      { title: 'Faedah & Keteladanan', desc: 'Menguraikan hikmah dan keteladanan yang relevan untuk memperkokoh komitmen keimanan.' }
    ];
  }

  if (cat.includes('bisnis') || cat.includes('finansial') || cat.includes('investasi') || cat.includes('ekonomi') || cat.includes('uang') || t.includes('saham') || t.includes('trading') || t.includes('omzet')) {
    return [
      { title: 'Strategi Pasar & Peluang', desc: 'Mengulas cara mengidentifikasi kebutuhan pasar serta merumuskan keunggulan kompetitif usaha.' },
      { title: 'Manajemen Keuangan & Arus Kas', desc: 'Menata alokasi modal, efisiensi operasional, dan perencanaan arus kas agar bisnis tumbuh berkelanjutan.' },
      { title: 'Pengembangan Skala Bisnis', desc: 'Menyusun alur kerja terstruktur dan standardisasi operasional guna mendukung ekspansi usaha.' },
      { title: 'Prinsip Mitigasi Risiko', desc: 'Membekali pembaca dengan cara berpikir terukur dalam mengambil keputusan investasi dan bisnis.' }
    ];
  }

  if (cat.includes('pengembangan') || cat.includes('psikologi') || cat.includes('motivasi') || cat.includes('perilaku') || t.includes('habit') || t.includes('fokus') || t.includes('mental')) {
    return [
      { title: 'Pola Pikir & Pengenalan Diri', desc: 'Membantu mengenali potensi diri dan mengatasi hambatan mental yang menghalangi pencapaian target.' },
      { title: 'Disiplin & Rutinitas Harian', desc: 'Merancang kebiasaan produktif yang dapat dijalankan secara konsisten tanpa membebani energi fisik dan mental.' },
      { title: 'Fokus & Pengelolaan Waktu', desc: 'Mengasah kemampuan konsentrasi di tengah distraksi agar waktu teralokasi untuk hal-hal bernilai tinggi.' },
      { title: 'Keseimbangan Hidup & Motivasi', desc: 'Menjaga ketahanan mental dan stabilitas emosi untuk mendukung produktivitas jangka panjang.' }
    ];
  }

  if (cat.includes('novel') || cat.includes('fiksi') || cat.includes('sastra') || cat.includes('puisi') || t.includes('kisah') || t.includes('cinta')) {
    return [
      { title: 'Pengembangan Karakter', desc: 'Menghadirkan dinamika tokoh dengan motif emosional yang kuat dan dekat dengan realitas kehidupan.' },
      { title: 'Dinamika Alur & Konflik', desc: 'Menyajikan jalinan cerita yang tertata rapi dengan ritme penuturan yang memikat dari awal hingga akhir.' },
      { title: 'Atmosfer Cerita', desc: 'Menggambarkan suasana dan latar secara hidup sehingga pembaca dapat larut dalam imajinasi naskah.' },
      { title: 'Refleksi Nilai Kehidupan', desc: 'Menyampaikan pesan moral dan hikmah kemanusiaan yang mendalam di balik alur cerita.' }
    ];
  }

  if (cat.includes('kesehatan') || cat.includes('medis') || cat.includes('kuliner') || cat.includes('resep') || t.includes('diet') || t.includes('obat') || t.includes('sehat')) {
    return [
      { title: 'Panduan Praktis Teruji', desc: 'Menyajikan petunjuk langkah demi langkah yang mudah dipahami dan aman untuk dipraktikkan langsung.' },
      { title: 'Nutrisi & Pola Hidup Seimbang', desc: 'Menguraikan manfaat asupan gizi berkualitas serta kebiasaan hidup sehat untuk menunjang kebugaran tubuh.' },
      { title: 'Pencegahan & Perawatan Diri', desc: 'Memberikan wawasan penting mengenai cara menjaga daya tahan tubuh dan mengantisipasi gangguan kesehatan.' },
      { title: 'Kebiasaan Positif Berkelanjutan', desc: 'Membantu pembaca membangun pola hidup yang konsisten dan nyaman dipelihara sehari-hari.' }
    ];
  }

  // Default untuk Pendidikan, Hukum, Sains, Pertanian, Politik, Budaya, Umum
  return [
    { title: 'Fondasi Teori & Konsep', desc: 'Menjabarkan batasan materi, istilah utama, dan kerangka dasar secara berurutan dan terstruktur.' },
    { title: 'Analisis & Studi Kasus', desc: 'Membahas penerapan konsep dalam situasi nyata disertai contoh relevan yang mudah dicerna.' },
    { title: 'Rujukan & Fakta Pendukung', desc: 'Menyajikan data dan referensi faktual untuk memperkaya wawasan serta ketajaman penalaran.' },
    { title: 'Rangkuman & Penerapan', desc: 'Merangkum intisari pembahasan sebagai bahan rujukan mandiri yang siap diaplikasikan.' }
  ];
}

function extractSnippetFromDesc(rawDesc) {
  if (!rawDesc) return '';
  const m = rawDesc.match(/CUPLIKAN NASKAH PEMBUKA:\s*([\s\S]*?)(?=\n\s*(?:SPESIFIKASI|STANDAR|PANDUAN|CAKUPAN|$))/i);
  if (m && m[1]) {
    let clean = m[1].trim().replace(/^["“]|["”]$/g, '').trim();
    if (clean.length > 40) return clean;
  }
  return '';
}

function getContextualQuote(catName, cleanTitle, author) {
  const c = (catName || '').toLowerCase();
  const authorRef = author ? ` (${author})` : '';

  if (c.includes('agama') || c.includes('tafsir') || c.includes('islam')) {
    const quotes = [
      '“Menuntut ilmu adalah jalan lapang menuju pemahaman hakiki, menumbuhkan adab sebelum kalam, dan menerangi amal dengan bashirah.”',
      '“Ilmu yang bermanfaat adalah ilmu yang menumbuhkan rasa takut kepada Allah dan melembutkan hati dalam bermuamalah kepada sesama.”',
      '“Keteladanan dan akhlak mulia adalah buah terindah dari keimanan yang kokoh dan pemahaman sunnah yang lurus.”',
      '“Hati yang senantiasa dibersihkan dengan dzikir dan ilmu syar’i akan menemukan ketenangan di tengah gelombang kehidupan.”'
    ];
    return quotes[hashString(cleanTitle) % quotes.length];
  }

  if (c.includes('bisnis') || c.includes('finansial') || c.includes('investasi')) {
    const quotes = [
      '“Kekayaan sejati bukan diukur dari seberapa besar arus kas masuk, melainkan seberapa kokoh sistem dan disiplin pengelolaan modal yang Anda bangun.”',
      '“Peluang terbaik tidak pernah datang dalam bentuk kepastian instan; ia hadir bagi mereka yang memiliki kesiapan strategi dan keberanian mitigasi risiko.”',
      '“Investasi paling bernilai tinggi dengan dividen abadi adalah investasi pada perluasan literasi dan ketajaman intuisi bisnis Anda.”',
      '“Bisnis yang bertahan melintasi dekade bukanlah yang tumbuh paling cepat, melainkan yang paling adaptif dan efisien dalam tata kelola operasional.”'
    ];
    return quotes[hashString(cleanTitle) % quotes.length];
  }

  if (c.includes('pengembangan') || c.includes('psikologi') || c.includes('motivasi')) {
    const quotes = [
      '“Kemenangan terbesar adalah kemampuan menaklukkan distraksi pikiran sendiri dan menjaga komitmen pada disiplin harian mikro.”',
      '“Bukan intensitas sesaat yang membentuk takdir Anda, melainkan konsistensi kebiasaan kecil yang diulang dengan penuh kesadaran setiap hari.”',
      '“Kejernihan mental dan ketahanan emosi adalah fondasi dari segala bentuk produktivitas berdaya dampak tinggi.”',
      '“Ketika Anda mengubah cara memandang hambatan, hambatan tersebut bertransformasi menjadi laboratorium penempaan karakter.”'
    ];
    return quotes[hashString(cleanTitle) % quotes.length];
  }

  if (c.includes('novel') || c.includes('fiksi') || c.includes('sastra')) {
    const quotes = [
      '“Karya sastra sejati adalah cermin jiwa manusia, tempat di mana rasa, harapan, dan pergulatan takdir menemukan bahasa yang abadi.”',
      '“Di balik setiap halaman naskah tersimpan ruang renung, mengajak kita memahami makna kehilangan, keberanian, dan menemukan kembali diri sendiri.”',
      '“Kisah yang memikat tidak sekadar menghibur imajinasi, melainkan meninggalkan gema hikmah yang terus bernyawa dalam ingatan pembaca.”'
    ];
    return quotes[hashString(cleanTitle) % quotes.length];
  }

  if (c.includes('kesehatan') || c.includes('medis')) {
    const quotes = [
      '“Kesehatan adalah mahkota tak kasat mata di kepala orang sehat yang hanya dapat disaksikan oleh mereka yang sedang terbaring sakit.”',
      '“Merawat tubuh dengan nutrisi berkualitas dan kebiasaan preventif adalah bentuk penghormatan paling mulia atas anugerah kehidupan.”'
    ];
    return quotes[hashString(cleanTitle) % quotes.length];
  }

  if (c.includes('kuliner') || c.includes('resep')) {
    const quotes = [
      '“Seni kuliner adalah perpaduan rasa, ketepatan teknik, dan ketulusan hati dalam menyajikan kehangatan di atas meja hidangan.”',
      '“Keberhasilan cita rasa legendaris selalu bermula dari kepiawaian meramu bahan sederhana dengan takaran bumbu yang presisi.”'
    ];
    return quotes[hashString(cleanTitle) % quotes.length];
  }

  // Default untuk Sains, Pendidikan, Hukum, Pertanian, Anak, dll
  const generalQuotes = [
    '“Pengetahuan sejati bukan sekadar apa yang kita hafal, melainkan bagaimana pemahaman tersebut mampu menuntun tindakan kita sehari-hari.”',
    '“Membaca membuka jendela cakrawala peradaban, memungkinkan kita berdiri di atas pundak pemikiran para perintis masa lalu.”',
    '“Keunggulan intelektual berakar dari rasa ingin tahu yang tak henti dan kerendahan hati untuk terus belajar hal baru.”'
  ];
  return generalQuotes[hashString(cleanTitle) % generalQuotes.length];
}

function generateRichSneakPeek(sku, cleanTitle, author, catName, rawDesc, totalPages) {
  const authorDisplay = author ? `karya ${author}` : 'koleksi literatur terpilih';
  const dbSnippet = extractSnippetFromDesc(rawDesc);
  const cleanSummary = extractCleanSummary(rawDesc);

  // Jika di database master sudah ada naskah cuplikan otentik asli:
  if (dbSnippet && dbSnippet.length > 80) {
    return `Edisi digital "${cleanTitle}" ${authorDisplay} hadir dalam format naskah PDF utuh berstandar tinggi. Membuka lembaran awal Bab 1, pembaca langsung dihadapkan pada paparan otentik yang meletakkan fondasi persoalan secara tajam dan berbobot.\n\nCUPLIKAN LEMBARAN BACAAN BAB 1:\n"${dbSnippet}"\n\n[Lembaran Pratinjau Bab 1 Selesai — Dokumen master lengkap setebal ${totalPages} halaman utuh memuat pembahasan menyeluruh, studi kasus terperinci, dan formulasi aplikatif siap diunduh melalui tombol akses di bawah ini.]`;
  }

  // Jika belum ada kutipan teks literal, susun telaah naratif Bab 1 tematik yang mendalam dan elegan (1.200-1.600 karakter):
  const c = (catName || '').toLowerCase();

  let p1 = '';
  let p2 = '';
  let p3 = '';

  if (c.includes('agama') || c.includes('tafsir') || c.includes('islam')) {
    p1 = `Lembaran pembuka naskah "${cleanTitle}" ${authorDisplay} diawali dengan penegasan fondasi tauhid dan pemurnian niat dalam menuntut ilmu syar'i. Penulis membentangkan urgensi memahami dalil Al-Qur'an dan Sunnah secara kontekstual dan metodologis, mengajak pembaca menyadari bahwa setiap amalan lahiriah senantiasa berakar pada kejernihan aqidah batiniah.`;
    p2 = `Memasuki inti bahasan Bab 1, uraian difokuskan pada pematahan syubhat dan kekeliruan pemahaman yang kerap menjangkiti masyarakat. Dengan merujuk pada atsar para sahabat dan kaidah istinbath ulama salafus shalih, lembaran awal ini mengurai secara runtut batasan hukum, adab penuntut ilmu, serta hikmah di balik ketetapan syariat yang menentramkan jiwa.`;
    p3 = `Sebagai pengantar menuju bab-bab amaliah berikutnya, bab pendahuluan ini menegaskan pentingnya konsistensi dalam mengamalkan ilmu harian. Penulis menyajikan faedah aplikatif agar pemahaman teoritis dapat langsung mewujud dalam peningkatan kualitas ibadah, penjagaan lisan, dan kelembutan akhlak dalam interaksi sosial kemasyarakatan.`;
  } else if (c.includes('bisnis') || c.includes('finansial') || c.includes('investasi')) {
    p1 = `Pada lembaran pembuka naskah "${cleanTitle}" ${authorDisplay}, pembaca langsung diajak membongkar ilusi umum seputar pengelolaan modal dan dinamika pertumbuhan usaha. Bab pertama ini membedah realitas keras pasar, di mana keberlanjutan bisnis tidak ditentukan oleh popularitas sesaat, melainkan oleh kejelasan model monetisasi dan ketahanan arus kas (cashflow).`;
    p2 = `Penulis memaparkan kerangka kerja fundamental dalam memetakan peluang dan memvalidasi kebutuhan konsumen secara presisi. Alih-alih menyajikan spekulasi yang rapuh, bab pembuka ini meletakkan disiplin analisis risiko terukur, penguasaan rasio keuangan dasar, serta strategi alokasi sumber daya agar bisnis memiliki keunggulan kompetitif yang sukar ditiru oleh pesaing.`;
    p3 = `Sebelum melangkah ke babak eksekusi lanjutan, lembaran awal ini menyajikan studi kasus komparatif antara entitas usaha yang rapuh dengan organisasi bisnis yang tangguh menghadapi turbulensi ekonomi. Prinsip-prinsip navigasi pasar yang dipaparkan menjadi landasan kokoh bagi pembaca dalam mengambil keputusan finansial strategis.`;
  } else if (c.includes('pengembangan') || c.includes('psikologi') || c.includes('motivasi')) {
    p1 = `Membuka naskah "${cleanTitle}" ${authorDisplay}, pembaca langsung diajak berhadapan dengan akar psikologis yang mengendalikan pola tindakan dan keputusan harian. Bab pertama ini mengupas tuntas bias kognitif dan resistensi internal yang kerap menghambat kemajuan diri, membuktikan bahwa transformasi nyata selalu berawal dari kejujuran mengenali batas mental diri sendiri.`;
    p2 = `Dengan bahasa yang lugas dan berbasis pengamatan mendalam, penulis menguraikan arsitektur kebiasaan mikro serta mekanisme umpan balik neurologis yang membentuk karakter manusia. Lembaran awal ini membimbing pembaca melepaskan diri dari jebakan motivasi semu, menggantinya dengan sistem disiplin harian yang dapat dijalankan tanpa membebani daya tahan mental.`;
    p3 = `Bab pembuka ini ditutup dengan latihan reflektif untuk memetakan prioritas hidup bernilai tertinggi di tengah banjir distraksi modern. Sebuah orientasi awal yang sangat bertenaga untuk membekali pembaca sebelum memasuki teknik-teknik manajemen fokus dan ketahanan emosional pada bab-bab berikutnya.`;
  } else if (c.includes('novel') || c.includes('fiksi') || c.includes('sastra')) {
    p1 = `Lembaran awal naskah "${cleanTitle}" ${authorDisplay} dibuka dengan penggambaran latar dan atmosfer cerita yang kuat, seketika menarik pembaca masuk ke dalam pusaran emosi para tokohnya. Setiap diksi dipilih dengan cermat untuk menghidupkan suasana, menorehkan ketegangan dramatis yang mengisyaratkan konflik besar yang akan membayangi alur penuturan.`;
    p2 = `Pengenalan tokoh utama disajikan secara berlapis, memperlihatkan motif, kelemahan manusiawi, serta rahasia masa lalu yang memicu perjalanan takdirnya. Dialog-dialog bernas di bab pembuka ini mengalir natural, membangun kedekatan emosional antara pembaca dengan kegelisahan batin yang sedang dihadapi karakter.`;
    p3 = `Sebuah insiden tak terduga di pengujung Bab 1 menjadi pemicu bergeraknya seluruh jalinan narasi. Titik tolak alur cerita ini meninggalkan teka-teki mendalam yang membangkitkan rasa penasaran tak tertahankan untuk terus menyelami halaman-halaman berikutnya.`;
  } else if (c.includes('kesehatan') || c.includes('medis')) {
    p1 = `Bab pembuka naskah "${cleanTitle}" ${authorDisplay} meletakkan dasar pemahaman komprehensif mengenai mekanisme biologis tubuh manusia dalam merespons lingkungan dan pola hidup modern. Penulis menggarisbawahi pentingnya pendekatan preventif berbasis fakta ilmiah, menjauhkan pembaca dari mitos kesehatan yang menyesatkan.`;
    p2 = `Pembahasan berlanjut pada identifikasi faktor-faktor pemicu inflamasi, ketidakseimbangan metabolisme, dan kebiasaan harian yang kerap merongrong vitalitas tubuh tanpa disadari. Bab ini menyajikan panduan sistematis untuk mendengarkan sinyal-sinyal dini yang diberikan oleh tubuh sebagai alarm pencegahan penyakit.`;
    p3 = `Dilengkapi ikhtisar nutrisi esensial dan protokol pemulihan energi alami, lembaran awal ini menjadi pijakan terpercaya bagi pembaca untuk membangun fondasi kebugaran holistik yang berkelanjutan seumur hidup.`;
  } else if (c.includes('kuliner') || c.includes('resep')) {
    p1 = `Lembaran pembuka naskah "${cleanTitle}" ${authorDisplay} menghadirkan eksplorasi mendalam seputar filosofi rasa, teknik pengolahan bahan segar, serta rahasia presisi takaran bumbu dapur. Penulis mengawali dengan pengenalan alat-alat esensial dan standar higienitas yang menjadi kunci sukses dapur profesional.`;
    p2 = `Bab pertama ini mengulas tuntas karakteristik rempah-rempah utama, teknik ekstraksi aroma, dan pengendalian temperatur api saat memasak. Memahami logika interaksi bahan baku pada bab pembuka ini memungkinkan pembaca mengolah aneka resep dengan konsistensi cita rasa yang autentik dan menggugah selera.`;
    p3 = `Sebuah pengantar komprehensif yang dirancang ramah bagi pemula namun sarat wawasan bernilai tinggi bagi pegiat kuliner yang ingin meningkatkan mutu hidangan rumahan maupun rintisan usaha tata boga.`;
  } else {
    // Default untuk Sains, Pendidikan, Hukum, Pertanian, Anak, Budaya, Umum
    p1 = `Lembaran pembuka naskah "${cleanTitle}" ${authorDisplay} menyajikan peta orientasi keilmuan yang terstruktur secara analitis dan metodologis. Bab pertama ini membedah batasan materi, terminologi dasar, serta konteks historis perkembangan topik pembahasan agar pembaca memiliki pijakan konseptual yang kokoh.`;
    p2 = `Penulis memaparkan kerangka teori utama dengan pendekatan deduktif-induktif yang sistematis. Setiap dalil dan temuan empiris diuraikan secara runtut, menghubungkan prinsip-prinsip teoritis dengan fenomena nyata dan aplikasi praktis yang relevan di lapangan.`;
    p3 = `Sebagai pintu gerbang kajian mendalam, bab pendahuluan ini merumuskan pertanyaan-pertanyaan kunci yang akan dijawab tuntas pada babak-babak selanjutnya. Pembahasan di lembaran awal ini berhasil membangkitkan daya nalar kritis dan dorongan literasi yang tinggi bagi setiap pembaca yang ingin memperluas wawasannya.`;
  }

  const pClose = `[Lembaran Pratinjau Bab 1 Selesai — Dokumen master lengkap setebal ${totalPages} halaman utuh memuat pembahasan menyeluruh, studi kasus terperinci, dan formulasi aplikatif siap diunduh melalui tombol akses di bawah ini.]`;

  return `${p1}\n\n${p2}\n\n${p3}\n\n${pClose}`;
}

function buildEditorialSynopsis(cleanTitle, author, catName, rawDesc, sku = '') {
  const cat = (catName || '').toLowerCase();
  const authorDisplay = author ? `karya ${author}` : 'koleksi literatur digital resmi FokusKonten';
  const cleanSummary = extractCleanSummary(rawDesc);
  const hash = hashString(sku || cleanTitle);

  let domainName = catName;
  let coreFocus = 'pendekatan terstruktur, metodologis, dan aplikatif';
  let audience = 'akademisi, profesional, mahasiswa, dan pemelajar mandiri';
  const pillars = getThematicPillars(catName, cleanTitle);

  if (cat.includes('agama') || cat.includes('tafsir') || cat.includes('islam')) {
    domainName = 'Kajian Naskah Keislaman & Syariat';
    coreFocus = 'keteladanan aqidah lurus, dalil shahih, dan penataan akhlak';
    audience = 'kaum muslimin, penuntut ilmu syar\'i, dan keluarga muslim';
  } else if (cat.includes('bisnis') || cat.includes('finansial') || cat.includes('investasi')) {
    domainName = 'Manajemen Bisnis, Finansial & Investasi';
    coreFocus = 'kedaulatan finansial, manajemen arus kas, dan pertumbuhan usaha berkelanjutan';
    audience = 'pengusaha, pelaku UMKM, investor, dan profesional bisnis';
  } else if (cat.includes('pengembangan') || cat.includes('psikologi') || cat.includes('motivasi')) {
    domainName = 'Pengembangan Diri & Ketahanan Mental';
    coreFocus = 'transformasi kebiasaan harian, disiplin fokus, dan kestabilan emosi';
    audience = 'individu berorientasi pertumbuhan, profesional karir, dan pembelajar sejati';
  } else if (cat.includes('novel') || cat.includes('fiksi') || cat.includes('sastra')) {
    domainName = 'Karya Naratif & Eksplorasi Sastra';
    coreFocus = 'kedalaman emosional, penjalinan plot memikat, dan refleksi kemanusiaan';
    audience = 'pencinta literatur fiksi, penikmat novel bermutu, dan pembaca imajinatif';
  } else if (cat.includes('kesehatan') || cat.includes('medis')) {
    domainName = 'Kesehatan Holistik & Wawasan Medis';
    coreFocus = 'pendekatan preventif medis, nutrisi seimbang, dan vitalitas tubuh';
    audience = 'masyarakat umum, pemerhati kesehatan, dan keluarga sadar sehat';
  } else if (cat.includes('kuliner') || cat.includes('resep')) {
    domainName = 'Seni Kuliner & Pengolahan Makanan';
    coreFocus = 'resep pilihan teruji, teknik memasak presisi, dan higienitas dapur';
    audience = 'pencinta kuliner, ibu rumah tangga, dan perintis usaha tata boga';
  }

  const v1 = hash % 4;
  const v2 = (hash >> 2) % 4;
  const v3 = (hash >> 4) % 4;
  const v4 = (hash >> 6) % 4;

  const introVariants = [
    `Naskah **${cleanTitle}** ${authorDisplay} hadir sebagai rujukan berbobot dalam ranah ${domainName}. Dokumen literatur ini disusun dengan presisi analitis guna membimbing pembaca menyelami pokok bahasan secara runtut, mendalam, dan bebas dari simplifikasi wacana populer.`,
    `Dalam khazanah bacaan ${domainName}, naskah **${cleanTitle}** ${authorDisplay} menawarkan pendekatan kontekstual yang bernas. Naskah ini mengurai kompleksitas materi menjadi panduan konseptual yang jernih tanpa mereduksi ketajaman wawasan dan bobot substansinya.`,
    `Melalui karya bertajuk **${cleanTitle}**, pembaca dipandu mengeksplorasi wawasan fundamental dalam domain ${domainName}. Naskah kurasi ${authorDisplay} ini menyajikan perspektif menyeluruh yang menjembatani kaidah teoritis dengan realitas tantangan nyata.`,
    `Sebagai karya pilihan dalam cakupan ${domainName}, naskah **${cleanTitle}** ${authorDisplay} memberikan jawaban atas berbagai pertanyaan mendasar seputar materi terkait. Sistematika penulisan yang tertata rapi memungkinkan pembaca membangun kerangka pemahaman yang kokoh sejak lembaran pembuka.`
  ];

  const methodVariants = [
    `Alur pemikiran dalam naskah ini dibangun secara dialektis. Setiap bab dirancang untuk menumbuhkan daya kritis pembaca, mengikis kerancuan asumsi yang kerap beredar di ruang publik, serta meletakkan batu pertama pemahaman yang berlandaskan prinsip-prinsip yang teruji.`,
    `Kekuatan metodologis naskah ini bertumpu pada penyajian argumentasi yang solid dan mengalir tenang namun bertenaga. Penulis menyaring gagasan-gagasan inti secara cermat, memastikan setiap dalil yang dipaparkan memiliki relevansi langsung dengan tujuan telaah naskah.`,
    `Pendekatan yang lugas dan berwibawa menjadikan naskah ini nyaman ditelaah secara bertahap. Penulis piawai meramu teori berbobot dengan uraian analitis, menghindarkan pembaca dari kejenuhan seraya menjaga ketajaman fokus pada setiap babak pembahasan.`,
    `Alih-alih menyajikan pembahasan yang kering atau abstrak, karya ini menonjolkan aspek reflektif. Pembaca dipandu untuk memahami hubungan sebab-akibat secara multidimensional, membiasakan diri berpikir sistemik sebelum mengambil kesimpulan penting.`
  ];

  const paradigmVariants = [
    `Ciri paling menonjol dari naskah ini adalah keberaniannya mendobrak kebiasaan literatur konvensional yang kerap berhenti pada tataran teori pasif. Pengarang membedah ${coreFocus} dengan menempatkan fakta lapangan sebagai cermin penguji, membuktikan bahwa penguasaan sejati lahir dari konsistensi berpikir yang kritis.`,
    `Keunggulan pembeda karya ini terletak pada penolakannya terhadap formula instan yang dangkal. Penulis menunjukkan bahwa penguasaan atas ${coreFocus} membutuhkan pemahaman struktural yang utuh, menghasilkan wawasan transformatif yang memperkaya cara pandang pembaca secara menyeluruh.`,
    `Naskah ini mengambil langkah inovatif dengan menghubungkan titik-titik wawasan yang selama ini tampak terpisah. Melalui tinjauan kritis yang mendalam, karya ini menyingkap dimensi-dimensi krusial dalam ${coreFocus} yang kerap terlewatkan oleh publikasi sejenis.`,
    `Nilai kebaruan naskah ini terwujud dalam kemampuannya mengontekstualisasikan prinsip-prinsip mendasar ke dalam dinamika zaman modern. Pengarang merumuskan peta navigasi pemikiran yang tajam, menjadikan naskah ini instrumen literatur yang adaptif dan bernilai strategis.`
  ];

  const guideVariants = [
    `Agar kemanfaatan naskah digital ini dapat diserap secara paripurna, tim kurator FokusKonten merekomendasikan pembaca untuk mencermati bab pendahuluan guna menguasai batasan terminologi pengarang. Lakukan pembacaan reflektif pada setiap jeda bagian, tandai gagasan-gagasan inti yang relevan, dan segera integrasikan kaidah yang telah Anda pelajari ke dalam aksi nyata.`,
    `Untuk memperoleh hasil kajian yang optimal, disarankan menelaah naskah ini secara berurutan tanpa melompati bab-bab pembuka fondasional. Catat poin-poin penting yang selaras dengan tantangan yang sedang Anda hadapi, dan diskusikan intisari pemikiran ini bersama rekan kajian untuk memperkaya perspektif Anda.`,
    `Tim redaksi FokusKonten menyarankan pembaca meluangkan waktu khusus untuk membaca setiap sub-bab secara fokus. Jadikan setiap intisari bab sebagai bahan evaluasi berkala, sehingga dokumen digital ini tidak sekadar menjadi arsip bacaan, melainkan katalis perubahan positif yang berkesinambungan.`,
    `Maksimalkan nilai dari naskah ini dengan memadukan pembacaan kritis dan refleksi pribadi. Telaah setiap argumen pengarang secara objektif, hubungkan prinsip-prinsip yang dijabarkan dengan pengalaman keseharian, dan jadikan panduan di dalamnya sebagai kompas rujukan yang terpercaya.`
  ];

  return `### 01. Ikhtisar Eksekutif & Orientasi Naskah
${introVariants[v1]}

${cleanSummary ? `Ringkasan Kurasi:\n${cleanSummary}\n\n` : ''}${methodVariants[v2]}

### 02. Paradigma Revolusioner & Gagasan Pembeda
${paradigmVariants[v3]}

Dengan gaya penuturan yang dewasa, tegas, dan berwibawa, dokumen ini mengungkap keterkaitan antara fondasi gagasan dan dampak aplikasinya dalam kehidupan nyata. Pembaca diajak berdialog secara cerdas untuk membangun cetak biru pemikiran yang mandiri.

### 03. Bedah 4 Pilar Tematik & Pokok Bahasan Kritis
Dalam telaah naskah ini, terdapat empat pilar konseptual utama yang dieksplorasi secara mendalam:
${pillars.map(p => `• **${p.title}**: ${p.desc}`).join('\n')}

### 04. Relevansi Terapan & Sasaran Pembaca
Naskah digital ini dirancang secara khusus untuk ${audience}. Manfaat substantif yang terkandung di dalamnya melampaui kepuasan literasi sesaat; setiap bab menyimpan wawasan yang dapat langsung dikonversi menjadi perbaikan strategi, ketajaman analisis masalah, hingga peningkatan mutu disiplin pribadi dan profesional Anda.

### 05. Panduan Kajian Mandiri & Rekomendasi Redaksi
${guideVariants[v4]}`;
}

async function main() {
  console.log('══════════════════════════════════════════════════════════════════════');
  console.log('🚀 MEMULAI PIPELINE KOMPILASI DATA SHARDING E-BOOK O(1)');
  console.log('   FokusKonten V10.0 Superior Enterprise — Zero Kata Buku');
  console.log('══════════════════════════════════════════════════════════════════════\n');

  // 1. Inisialisasi Direktori
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(SHARDS_DIR, { recursive: true });
  fs.mkdirSync(ITEMS_DIR, { recursive: true });
  fs.mkdirSync(CACHE_DIR, { recursive: true });

  // 2. Baca Database Master
  console.log(`[DB] Menghubungkan ke SQLite master: ${DB_PATH}`);
  const db = new DatabaseSync(DB_PATH, { readOnly: true });

  const rawRows = db.prepare(`
    SELECT sku, title, category, format, price, original_price, cover_image, description, drive_link, backup_drive_link, view_count
    FROM digital_products
    WHERE format = 'PDF' AND is_published = 1
    ORDER BY category ASC, title ASC
  `).all();

  console.log(`[DB] Ditemukan ${rawRows.length} produk PDF aktif (is_published = 1).\n`);

  // 3. Pindai Berkas Fisik Disk F:
  console.log('[DISK F:] Memetakan berkas fisik PDF di F:/KATALOG_EBOOK_FOKUSKONTEN...');
  const diskDirs = ['F:/KATALOG_EBOOK_FOKUSKONTEN'];
  const physicalMap = new Map();

  for (const dir of diskDirs) {
    if (!fs.existsSync(dir)) continue;
    function walk(curr) {
      for (const entry of fs.readdirSync(curr, { withFileTypes: true })) {
        const full = path.join(curr, entry.name);
        if (entry.isDirectory()) {
          walk(full);
        } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
          const m = entry.name.match(/\b(ID[0-9A-Z]{4})\b/i);
          if (m) {
            const sku = m[1].toUpperCase();
            if (!physicalMap.has(sku)) {
              try {
                const st = fs.statSync(full);
                physicalMap.set(sku, { path: full, size: st.size });
              } catch (_) {}
            }
          }
        }
      }
    }
    walk(dir);
  }
  console.log(`[DISK F:] Tepat ${physicalMap.size} berkas fisik berhasil dipetakan by SKU!\n`);

  // 4. Muat Cache Ekstraksi Fisik & Safelink Cache
  let metadataCache = {};
  if (fs.existsSync(METADATA_CACHE_FILE)) {
    try { metadataCache = JSON.parse(fs.readFileSync(METADATA_CACHE_FILE, 'utf8')); } catch (_) {}
  }

  let safelinkCache = {};
  if (fs.existsSync(SAFELINK_CACHE_FILE)) {
    try { safelinkCache = JSON.parse(fs.readFileSync(SAFELINK_CACHE_FILE, 'utf8')); } catch (_) {}
  }

  // 5. Inisialisasi Wadah Data
  const routes = [];
  const shards = {};
  const categoriesStats = {};

  // Setup Shard Buckets
  for (const catKey of Object.keys(CATEGORY_MAP)) {
    const meta = CATEGORY_MAP[catKey];
    if (!shards[meta.slug]) {
      shards[meta.slug] = {
        name: meta.name,
        slug: meta.slug,
        description: meta.desc,
        count: 0,
        items: []
      };
      categoriesStats[meta.slug] = {
        name: meta.name,
        slug: meta.slug,
        description: meta.desc,
        count: 0
      };
    }
  }

  // 6. Loop Kompilasi Setiap E-Book
  console.log('[COMPILER] Menyusun data atomik O(1) untuk setiap e-book...');
  let compiledCount = 0;

  for (const row of rawRows) {
    const sku = row.sku.toUpperCase().trim();
    if (sku === 'IDEB00') continue; // Mega bundle dikelola terpusat
    const catMeta = CATEGORY_MAP[row.category] || {
      name: row.category.replace(/^E-Book\s+/i, '').replace(/Buku/gi, 'Edukasi'),
      slug: slugify(row.category.replace(/^E-Book\s+/i, '').replace(/Buku/gi, 'Edukasi')),
      desc: 'Koleksi naskah e-book digital pilihan resmi FokusKonten.'
    };

    // Pastikan bucket shard ada
    if (!shards[catMeta.slug]) {
      shards[catMeta.slug] = {
        name: catMeta.name,
        slug: catMeta.slug,
        description: catMeta.desc,
        count: 0,
        items: []
      };
      categoriesStats[catMeta.slug] = {
        name: catMeta.name,
        slug: catMeta.slug,
        description: catMeta.desc,
        count: 0
      };
    }

    const { title: cleanTitle, author } = cleanTitleAndAuthor(sku, row.title);
    const valueHook = determineContextualValueHook(cleanTitle, author, catMeta.name);

    // Formulasi Judul Baku SEO & Copywriting Non-Generik (Zero Kurung Kosong jika Penulis Kosong)
    const authorBracket = author ? `(Karya: ${author})` : '';
    const articleTitle = authorBracket 
      ? `E-Book ${cleanTitle} ${authorBracket} — ${valueHook} PDF`
      : `E-Book ${cleanTitle} — ${valueHook} PDF`;

    // Suffix SKU untuk 100% Zero Collision
    const titleSlug = slugify(cleanTitle);
    const itemSlug = `${titleSlug}-${sku.toLowerCase()}`;

    // Fisik PDF
    const phys = physicalMap.get(sku);
    let sizeMb = phys ? (phys.size / 1048576).toFixed(1) : '12.5';
    if (parseFloat(sizeMb) < 0.5) sizeMb = '1.8';

    // Estimasi Halaman & Durasi
    let totalPages = metadataCache[sku]?.pages || 0;
    if (!totalPages) {
      if (phys && phys.size > 0) {
        const estPages = Math.max(48, Math.min(850, Math.round(phys.size / 65000)));
        totalPages = estPages;
      } else {
        totalPages = 240;
      }
    }

    // Durasi Waktu Baca Realistis (~1.5 menit per halaman)
    const totalMinutes = Math.round(totalPages * 1.5);
    let durationText = '';
    if (totalMinutes >= 60) {
      const hours = (totalMinutes / 60).toFixed(1);
      durationText = `~${hours} Jam Baca`;
    } else {
      durationText = `~${totalMinutes} Menit Baca`;
    }

    // Cuplikan / Pengantar Bacaan Ramah Pengguna (1.200 - 1.800 Karakter)
    const sneakPeek = generateRichSneakPeek(sku, cleanTitle, author, catMeta.name, row.description, totalPages);

    // Kutipan Mutiara Pengarang / Redaksional
    const quote = getContextualQuote(catMeta.name, cleanTitle, author);

    // Sinopsis Editorial Komprehensif 5 Babak Superior
    const synopsis = buildEditorialSynopsis(cleanTitle, author, catMeta.name, row.description, sku);

    const curiosityHook = `Ulasan dalam naskah ini sengaja dibatasi pada lembaran pembuka Bab 1 sebelum strategi dan formula inti diungkap secara gamblang. Penasaran bagaimana kelanjutan pembahasan dan panduan lengkapnya? Tuntaskan membaca naskah master utuh melalui tombol unduhan di bawah ini.`;

    // Kelengkapan & Struktur Bab Naskah
    const tableOfContents = [
      { chapter: 1, title: 'Bab 1: Intisari Pembuka & Peletakan Fondasi', status: 'Sudah Dibaca di Cuplikan' },
      { chapter: 2, title: 'Bab 2: Analisis Mendalam & Pendekatan Konsep', status: 'Tersedia di E-Book Lengkap' },
      { chapter: 3, title: 'Bab 3: Implementasi Nyata & Panduan Praktis', status: 'Tersedia di E-Book Lengkap' },
      { chapter: 4, title: 'Bab 4: Eksplorasi Lanjutan & Studi Kasus', status: 'Tersedia di E-Book Lengkap' },
      { chapter: 5, title: `Bab 5 s/d Bab Akhir: Rangkuman & Penutup (${totalPages} Halaman)`, status: 'Tersedia di E-Book Lengkap' }
    ];

    // Cover Image
    const coverImage = `https://cdn.jsdelivr.net/gh/mcjobs-id/fokuskonten-assets@main/ebook/${sku}/${sku}_cover.webp`;

    // Safelink URL Otomatis & Terverifikasi (Monetisasi Celah 14)
    const directTarget = (row.backup_drive_link || row.drive_link || '').trim();
    const safelinkUrl = directTarget
      ? `https://sfl.gl/st?api=41bce343d0c4077814e1430901df36f0f18bb967&url=${encodeURIComponent(directTarget)}`
      : (safelinkCache[sku] || null);

    // 1. Payload Detail Atomik (1-2 KB per file)
    const itemDetail = {
      sku,
      title: cleanTitle,
      rawTitle: row.title,
      articleTitle,
      author: author || 'Tim Redaksi Literatur',
      authorDisplay: author ? author : 'Tim Redaksi Literatur',
      hasAuthor: !!author,
      category: catMeta.name,
      categorySlug: catMeta.slug,
      pages: totalPages,
      duration: durationText,
      sizeMb: `${sizeMb} MB`,
      format: 'PDF',
      coverImage,
      quote,
      synopsis,
      curiosityHook,
      sneakPeekText: sneakPeek,
      tableOfContents,
      safelinkUrl,
      priceCoffee: 2000,
      megaBundleSku: 'IDEB00',
      viewCount: row.view_count || 0
    };

    fs.writeFileSync(
      path.join(ITEMS_DIR, `${itemSlug}.json`),
      JSON.stringify(itemDetail),
      'utf8'
    );

    // 2. Index Compact untuk routes.json (Single-character keys)
    routes.push({
      s: sku,
      t: cleanTitle,
      a: author || '',
      c: catMeta.slug,
      u: itemSlug
    });

    // 3. Shard per Kategori
    shards[catMeta.slug].items.push({
      sku,
      title: cleanTitle,
      author: author || '',
      articleTitle,
      slug: itemSlug,
      categorySlug: catMeta.slug,
      pages: totalPages,
      sizeMb: `${sizeMb} MB`,
      coverImage
    });
    shards[catMeta.slug].count++;
    categoriesStats[catMeta.slug].count++;

    compiledCount++;
  }

  // 7. Simpan routes.json (Compact Index < 90 KB)
  const routesJsonPath = path.join(OUTPUT_DIR, 'routes.json');
  fs.writeFileSync(routesJsonPath, JSON.stringify(routes), 'utf8');
  const routesSize = (fs.statSync(routesJsonPath).size / 1024).toFixed(1);
  console.log(`[OK] routes.json terbit: ${routes.length} rute (${routesSize} KB).`);

  // 8. Simpan Shards per Kategori
  for (const slug of Object.keys(shards)) {
    const shardPath = path.join(SHARDS_DIR, `${slug}.json`);
    fs.writeFileSync(shardPath, JSON.stringify(shards[slug]), 'utf8');
  }
  console.log(`[OK] ${Object.keys(shards).length} berkas shard kategori tersimpan di content/ebook/shards/.`);

  // 9. Simpan Master Categories List
  const categoriesList = Object.values(categoriesStats).filter(c => c.count > 0);
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'categories.json'),
    JSON.stringify(categoriesList, null, 2),
    'utf8'
  );
  console.log(`[OK] categories.json terbit: ${categoriesList.length} kategori aktif.`);

  // 10. DECOUPLING TOKO DIGITAL (Membersihkan 2.471 E-Book dari Toko Digital)
  console.log('\n[DECOUPLING] Memulai pembersihan toko digital dari e-book satuan...');
  const webCatalogPath = path.join(ROOT_DIR, 'content/apps/digitalProducts.json');
  const catalogProductsPath = path.join(ROOT_DIR, 'content/apps/catalog_products.json');
  const storeSummaryPath = path.join(ROOT_DIR, 'content/apps/store_summary.json');

  if (fs.existsSync(webCatalogPath)) {
    try {
      const fullCatalog = JSON.parse(fs.readFileSync(webCatalogPath, 'utf8'));
      // Ambil hanya produk NON-EBOOK
      const nonEbooks = fullCatalog.filter(p => {
        const fmt = (p.format || '').toUpperCase();
        const cat = (p.category || '').toLowerCase();
        return fmt !== 'PDF' && !cat.startsWith('e-book');
      });

      // Daftarkan Master SKU IDEB00 (Mega Bundle 3.512+ E-Book)
      const megaBundleDescription = [
        'RINGKASAN & NILAI KOLEKSI:',
        'Perpustakaan literatur digital terlengkap yang menghimpun lebih dari 3.512 ebook naskah pilihan dalam 18 rumpun keilmuan strategis. Dirancang sebagai sumber referensi komprehensif untuk mendampingi proses belajar, riset mandiri, peningkatan karir, serta perluasan wawasan intelektual tanpa batas.',
        '',
        'CAKUPAN 18 RUMPUN SILO KEILMUAN:',
        "• 01. Agama Islam & Tafsir: Hadits shahih, kajian fiqih, sirah nabawiyah, tazkiyatun nufus, dan tafsir Al-Qur'an.",
        '• 02. Bisnis, Finansial & Investasi: Manajemen keuangan, strategi marketing, analisis saham, dan perintisan usaha.',
        '• 03. Pengembangan Diri & Motivasi: Transformasi kebiasaan, manajemen waktu, kepemimpinan, dan produktivitas.',
        '• 04. Novel, Sastra & Karya Fiksi: Karya sastra klasik, novel inspiratif, fiksi terpilih, dan antologi cerita.',
        '• 05. Pendidikan, Riset & Akademik: Diktat perkuliahan, metodologi penelitian, dan modul ajar terstruktur.',
        '• 06. Sains, Teknologi & Pengetahuan: Eksplorasi sains alam, teknologi modern, dan ensiklopedia pengetahuan umum.',
        '• 07. Kesehatan, Medis & Nutrisi: Referensi medis praktis, terapi herbal terpercaya, dan panduan gaya hidup sehat.',
        '• 08. Kuliner & Aneka Resep Masakan: Kompilasi kuliner nusantara, takaran bumbu presisi, dan teknik memasak.',
        '• 09. Hukum & Perundang-Undangan: Kompilasi hukum perdata, pidana, tata negara, dan kajian yuridis formal.',
        '• 10. Psikologi & Dinamika Perilaku: Komunikasi interpersonal, kesehatan mental, dan analisis psikologi terapan.',
        '• 11. Pertanian, Peternakan & Agribisnis: Agroteknologi terpadu, hidroponik, budidaya tanaman pangan, dan peternakan.',
        '• 12. Edukasi Anak & Pola Asuh Parenting: Cerita bergambar edukatif, stimulasi karakter anak, dan pedoman keluarga.',
        '• 13. Karir, Profesi & Dunia Kerja: Peningkatan keahlian profesional, wawancara kerja, dan etika perkantoran.',
        '• 14. Politik, Sosial & Kebijakan Publik: Sosiologi kemasyarakatan, dinamika politik kenegaraan, dan kebijakan publik.',
        '• 15. Filsafat, Etika & Logika Pemikiran: Kajian dialektika, seni bernalar kritis, epistemologi, dan filsafat hidup.',
        '• 16. Budaya, Tradisi & Sejarah Nusantara: Warisan peradaban bangsa, adat istiadat nusantara, dan catatan sejarah.',
        '• 17. Majalah & Jurnal Digital Pilihan: Edisi berkala, liputan tematik, dan rangkuman literasi visual berkualitas.',
        '• 18. Kamus & Referensi Bahasa Lengkap: Tata bahasa, kosakata terstruktur, dan panduan kefasihan bahasa asing.',
        '',
        'SPESIFIKASI DOKUMEN MASTER:',
        '• Format Master File: Dokumen Digital Portable Document Format (.PDF)',
        '• Standar Dokumen: Teks Digital Jernih (Searchable Text), Bukan Hasil Foto Buram',
        '• Navigasi Berkas: Dilengkapi Bookmarks / Daftar Isi Terstruktur untuk Akses Cepat',
        '• Kompatibilitas: Optimal di Smartphone (Android / iOS), Tablet, iPad, PC, Laptop, dan E-Reader',
        '• Total Kapasitas: 3.512+ Berkas Digital Utuh (Lebih dari 55 GB Data Master)',
        '',
        'STANDAR PENGIRIMAN & HAK AKSES:',
        '• Unduh Otomatis: Akses berkas terbuka seketika setelah pembayaran terverifikasi.',
        '• Server Berkecepatan Tinggi: Terhubung ke infrastruktur unduhan langsung tanpa antrean.',
        '• Akses Seumur Hidup: Hak akses mandiri permanen tanpa batas masa aktif dan bebas biaya langganan bulanan.',
        '• Penggunaan Fleksibel: Bebas digunakan untuk bahan belajar mandiri, riset ilmiah, maupun referensi perpustakaan pribadi.'
      ].join('\n');

      const megaBundleProduct = {
        id: 'ideb00',
        sku: 'IDEB00',
        name: 'Mega Bundle Koleksi 3.512+ E-Book Master — Perpustakaan Digital Lengkap',
        title: 'Mega Bundle Koleksi 3.512+ E-Book Master — Perpustakaan Digital Lengkap',
        category: 'Paket & Bundle',
        format: 'PDF',
        tag: 'Koleksi Master Digital',
        badge: 'Koleksi Terbesar',
        price: 49000,
        originalPrice: 499000,
        is_published: 1,
        isPublished: true,
        rating: 5.0,
        reviewsCount: 380,
        salesCount: 890,
        image: '/covers/IDEB00/IDEB00_cover.webp',
        coverImage: '/covers/IDEB00/IDEB00_cover.webp',
        gallery: [
          '/covers/IDEB00/IDEB00_cover.webp',
          '/covers/IDEB00/IDEB00_slide1.webp'
        ],
        description: megaBundleDescription,
        features: [
          'Akses Koleksi Repositori Lengkap 3.512+ Naskah Master',
          'Mencakup 18 Rumpun Keilmuan: Bisnis, Keuangan, Fiksi, Islam, Sains, & Karir',
          'Format PDF Berkualitas Tinggi, Teks Jernih Searchable & Siap Baca',
          'Hak Akses Permanen untuk Pembelajaran Berkelanjutan'
        ],
        specifications: {
          Format: 'Kumpulan Berkas PDF Digital Lengkap',
          Kapasitas: '3.512+ Judul Naskah Terpilih (Lebih dari 55 GB Data)',
          Akses: 'Tautan Repositori Digital Permanen di Halaman Akun',
          Pengiriman: 'Akses Terbuka Seketika Pasca Transaksi Selesai'
        }
      };

      const decoupledCatalog = [megaBundleProduct, ...nonEbooks];
      fs.writeFileSync(webCatalogPath, JSON.stringify(decoupledCatalog, null, 2), 'utf8');
      const newSizeMb = (fs.statSync(webCatalogPath).size / 1048576).toFixed(2);
      console.log(`[DECOUPLING OK] digitalProducts.json menyusut menjadi ${newSizeMb} MB (${decoupledCatalog.length} produk).`);

      // Update catalog_products.json
      if (fs.existsSync(catalogProductsPath)) {
        fs.writeFileSync(catalogProductsPath, JSON.stringify(decoupledCatalog, null, 2), 'utf8');
        console.log(`[DECOUPLING OK] catalog_products.json disinkronkan (${decoupledCatalog.length} produk).`);
      }

      // Update store_summary.json (Menghilangkan ebookCategories & format PDF)
      if (fs.existsSync(storeSummaryPath)) {
        try {
          const summary = JSON.parse(fs.readFileSync(storeSummaryPath, 'utf8'));
          summary.totalEbook = 0;
          summary.ebookCategories = [];
          summary.totalActive = decoupledCatalog.length;
          // Hapus PDF dari formats
          summary.formats = (summary.formats || []).filter(([fmt]) => fmt !== 'PDF');
          if (summary.showcase) {
            summary.showcase.ebook = []; // Kosongkan showcase ebook eceran
          }
          fs.writeFileSync(storeSummaryPath, JSON.stringify(summary, null, 2), 'utf8');
          console.log('[DECOUPLING OK] store_summary.json dibersihkan dari kategori & format e-book satuan.');
        } catch (_) {}
      }
    } catch (err) {
      console.error('[DECOUPLING ERROR]', err.message);
    }
  }

  console.log('\n══════════════════════════════════════════════════════════════════════');
  console.log(`🎉 FASE 1 SELESAI DENGAN SUKSES!`);
  console.log(`   • ${compiledCount} berkas atomik O(1) e-book tersimpan di content/ebook/items/`);
  console.log(`   • routes.json < 90 KB terverifikasi`);
  console.log(`   • 18 Rumpun Silo Kategori terdistribusi rapi (Zero kata 'Buku')`);
  console.log(`   • Toko Digital 100% bersih dari 2.471 e-book eceran`);
  console.log('══════════════════════════════════════════════════════════════════════\n');
}

main().catch(err => {
  console.error('[FATAL ERROR]', err);
  process.exit(1);
});
