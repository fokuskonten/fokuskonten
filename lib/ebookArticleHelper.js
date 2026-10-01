/**
 * ebookArticleHelper.js — Helper Generator Konten Artikel E-Book Dinamis
 * Menyusun data atomik artikel kaya (Sinopsis 5 Bab, Sneak Peek Bab 1, TOC, dll)
 * secara instan dari shard kategori tanpa memerlukan 13.000+ berkas JSON lepasan.
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md dan AGENTS.md (Zero Tabel Markdown, Zero Emoji).
 */

/**
 * isOcrGarbage(text) — Mendeteksi apakah cuplikan teks mengandung noise OCR tinggi,
 * watermark spam, crawler spam, atau artefak pemindaian yang merusak kenyamanan membaca.
 */
export function isOcrGarbage(text) {
  if (!text || typeof text !== 'string') return true;
  const s = text.trim();
  if (s.length < 60) return true;

  // 1. Watermark spam, CamScanner, dan penanda scanner software
  if (/scanned by camscanner|camscanner/i.test(s)) return true;
  if (/this page intentionally left blank/i.test(s)) return true;

  // 2. Blogspot / situs bajakan / crawler download / tautan luar
  if (/blogspot\.com|wordpress\.com|getwsodo\.com|scribd\.com|dokumen\.tips|bacaan-indo/i.test(s)) return true;
  if (/https?:\/\/[^\s]+/i.test(s)) return true;
  if (/www\.[a-z0-9\-]+\.[a-z]{2,}/i.test(s)) return true;

  // 3. Copyright / Legal boilerplate / KDT / Undang-undang
  if (/sanksi pelanggaran pasal|undang-undang nomor \d+|dilarang memperbanyak|katalog dalam terbitan|hak cipta dilindungi|all rights reserved/i.test(s)) {
    return true;
  }

  // 4. Pengulangan token watermark (misal domain yang diulang 3x atau lebih)
  if (/(.{6,25})\1{2,}/i.test(s)) return true;

  // 5. Noise simbol atau tanda baca beruntun ekstrem
  if (/[\\_\-\.\,\;\:\|\/\~]{5,}/.test(s)) return true;
  if (/(\.\s*){5,}/.test(s)) return true;
  if (/(\-\s*){4,}/.test(s)) return true;
  if (/[!#$%&'()*+,./:;<=>?@[\]^_`{|}~]{4,}/.test(s)) return true;

  // 6. Karakter non-prosa editorial (@, $, \, ^, ~, |, dll.)
  const badCharsCount = (s.match(/[@$\\\^~\|<>{}\[\]_=+]/g) || []).length;
  if (badCharsCount >= 2) return true;

  // 7. Rasio karakter asing terhadap teks standar alfabet/arab/angka
  const totalChars = s.length;
  const normalChars = (s.match(/[a-zA-Z0-9\u0600-\u06FF\s\.\,\!\?\'\"\-\:\;\(\)“”‘’«»]/g) || []).length;
  const weirdRatio = (totalChars - normalChars) / totalChars;
  if (weirdRatio > 0.08) return true;

  // 8. Rasio kata 1-karakter terpecah (fragmented OCR tokens)
  const words = s.split(/\s+/).filter(Boolean);
  if (words.length < 8) return true;
  const singleCharWords = words.filter(w => w.length === 1 && !/^[0-9ia]$/i.test(w));
  if (singleCharWords.length / words.length > 0.12) return true;

  // 9. Ligatur rusak (ffi, ffl), simbol di tengah kata, atau kluster konsonan acak tanpa vokal
  let gibberishWords = 0;
  for (const w of words) {
    if (/[a-zA-Z]+[@$#\*\(\)\\\/]+[a-zA-Z0-9]+/.test(w)) gibberishWords++;
    else if (/^[bcdfghjklmnpqrstvwxyz]{5,}$/i.test(w)) gibberishWords++;
    else if (/\b(?:ffi|ffl)[a-z]{5,}/i.test(w)) gibberishWords++;
    else if (/\b[a-zA-Z]*ffias[a-zA-Z]*/i.test(w)) gibberishWords++;
  }
  if (gibberishWords >= 2) return true;

  // 10. Karakter berjarak spasi satu-satu (e.g. 'b h u m i e d u k a s i')
  if (/(\b[a-zA-Z]\s+){4,}[a-zA-Z]\b/.test(s)) return true;

  // 11. Pola angka pecahan OCR acak (seperti '7/ r 0,0m ffiasdldltdh aa uk)izar')
  if (/\b\d+\/\s*[a-zA-Z]\s*\d+/.test(s)) return true;
  if (/[a-zA-Z]+\)[a-zA-Z]+/.test(s)) return true;

  return false;
}

/**
 * cleanTitleAndAuthor — Sanitasi judul dan deteksi nama penulis
 */
export function cleanTitleAndAuthor(rawTitle, metaAuthor, snippet) {
  let title = (rawTitle || '').trim();
  let author = '';

  // 1. Bersihkan prefix SKU jika ada
  title = title.replace(/^ID[0-9A-Fa-f]{4,6}\s*-\s*/, '').trim();
  title = title.replace(/\.pdf$/i, '').trim();

  // 2. Ekstrak penulis dari kurung di akhir judul (Karya: ...), (Penulis: ...), atau (Nama)
  const parenMatch = title.match(/\((?:Karya:?|Penulis:?|oleh:?)?\s*([^\)]+)\)$/i);
  if (parenMatch) {
    const candidate = parenMatch[1].trim();
    if (!/^(?:edisi|cetakan|vol|jilid|part|lengkap|terjemah|indonesia)\b/i.test(candidate)) {
      author = candidate;
      title = title.replace(/\s*\([^\)]+\)$/, '').trim();
    }
  }

  // 3. Ekstrak penulis dari "by [Nama]" atau "oleh [Nama]"
  const byMatch = title.match(/\s+(?:by|oleh)\s+([A-Za-z\s\.\,\'\-]+)$/i);
  if (byMatch) {
    author = byMatch[1].trim();
    title = title.replace(/\s+(?:by|oleh)\s+[A-Za-z\s\.\,\'\-]+$/i, '').trim();
  }

  // 4. Validasi metaAuthor dari berkas PDF
  const isGeneric = (str) => {
    if (!str) return true;
    const s = str.trim().toLowerCase();
    const bad = ['windows user', 'user', 'admin', 'administrator', 'pc', 'owner', 'unknown', 'hp', 'dell', 'acer', 'lenovo', 'asus', 'microsoft', 'nitro', 'acrobat', 'pdf'];
    return bad.some(b => s === b || s.startsWith(b + ' ') || s.endsWith(' ' + b));
  };

  if (!author && metaAuthor && !isGeneric(metaAuthor)) {
    author = metaAuthor.trim();
  }

  if (!author && snippet && !isOcrGarbage(snippet)) {
    const snipMatch = snippet.match(/(?:penulis|karya|oleh)\s*[:]\s*([A-Za-z\s\.\,\'\-]{3,40})/i);
    if (snipMatch) author = snipMatch[1].trim();
  }

  if (!author) author = 'Tim Redaksi Literatur';

  // 5. Doktrin Zero Kata Buku
  title = title.replace(/^Buku Pintar\b/i, 'Panduan Pintar');
  title = title.replace(/^Buku Saku\b/i, 'Ringkasan Saku');
  title = title.replace(/^Buku Ajar\b/i, 'Diktat Ajar');
  title = title.replace(/^Buku Panduan\b/i, 'Panduan Praktis');
  title = title.replace(/^Buku\s+/i, '');

  return { title, author };
}

/**
 * cleanOrExtractSubtitle — Sanitasi atau ekstraksi subjudul autentik
 * Mencegah subjudul kaku/aneh seperti 'Resensi Literatur E-Book Agama Islam' atau 'Koleksi Resmi PDF'
 */
export function cleanOrExtractSubtitle(candidate, categoryName = '', title = '') {
  if (!candidate || typeof candidate !== 'string') return null;
  let sub = candidate.trim();

  // Bersihkan karakter prefix / suffix pembatas
  sub = sub.replace(/^[\s—–\-:]+/, '').replace(/[\s—–\-:]+$/, '').trim();

  // Bersihkan format PDF di akhir jika ada
  sub = sub.replace(/\s+PDF$/i, '').trim();

  // Bersihkan prefix E-Book jika ada
  sub = sub.replace(/^E-Book\s+/i, '').trim();

  // Jika candidate berupa string panjang seperti "E-Book Judul — Subtitle", ambil bagian setelah tanda pisah
  if (sub.includes('—')) {
    const parts = sub.split('—');
    sub = parts[parts.length - 1].trim().replace(/\s+PDF$/i, '').trim();
  } else if (sub.includes(' - ')) {
    const parts = sub.split(' - ');
    sub = parts[parts.length - 1].trim().replace(/\s+PDF$/i, '').trim();
  }

  // Bersihkan kurung karya / penulis jika ada
  sub = sub.replace(/\(Karya:[^)]+\)/i, '').trim();
  sub = sub.replace(/^[\s—–\-:]+/, '').replace(/[\s—–\-:]+$/, '').trim();

  // Filter teks sampah generic / placeholder yang janggal dijadikan subjudul H1
  const junkPatterns = [
    /^resensi literatur/i,
    /^koleksi resmi/i,
    /^koleksi literatur/i,
    /^risalah & koleksi/i,
    /^dokumen resmi/i,
    /^dokumen pdf/i,
    /^buku digital/i,
    /^edisi lengkap/i,
    /^buku panduan/i,
    /^diktat digital/i,
    /^katalog naskah/i,
    /^bacaan digital/i,
    /^bacaan resmi/i,
    /^unduh buku/i,
    /^download ebook/i,
    /^pdf searchable/i,
    /^bebas drm/i,
    /^akses terbuka/i,
    /^arsip digital/i,
    /^naskah resmi/i
  ];

  if (junkPatterns.some(p => p.test(sub))) return null;

  // Jika terlalu pendek (< 4 huruf) atau identik dengan kategori / judul
  if (sub.length < 4) return null;
  if (categoryName && sub.toLowerCase() === categoryName.toLowerCase()) return null;
  if (title && sub.toLowerCase() === title.toLowerCase()) return null;

  return sub;
}

/**
 * resolveCategoryCluster — Memetakan slug/kategori ke rumpun editorial
 */
export function resolveCategoryCluster(categorySlug = '', categoryName = '', title = '') {
  const s = (categorySlug || '').toLowerCase();
  const n = (categoryName || '').toLowerCase();
  const t = (title || '').toLowerCase();

  // Deteksi lembar kerja / printable lebih dulu jika judul memuat keyword aktivitas
  if (
    s.includes('printable') ||
    s.includes('worksheet') ||
    /\b(?:lembar (?:kerja|aktivitas)|worksheet|printable|mewarnai|tracing|flashcard|pola jahit)\b/i.test(t)
  ) {
    return 'printable';
  }

  if (s.includes('islam') || s.includes('agama') || n.includes('islam') || n.includes('agama')) {
    return 'agama-islam';
  }
  if (
    s.includes('bisnis') ||
    s.includes('finansial') ||
    s.includes('investasi') ||
    s.includes('karir') ||
    s.includes('ekonomi') ||
    n.includes('bisnis') ||
    n.includes('finansial') ||
    n.includes('karir')
  ) {
    return 'bisnis-finansial';
  }
  if (
    s.includes('seni') ||
    s.includes('desain') ||
    s.includes('musik') ||
    s.includes('arsitektur') ||
    n.includes('seni') ||
    n.includes('desain') ||
    n.includes('musik') ||
    n.includes('arsitektur')
  ) {
    return 'seni-desain';
  }
  if (
    s.includes('sains') ||
    s.includes('teknik') ||
    s.includes('komputer') ||
    s.includes('teknologi') ||
    s.includes('coding') ||
    n.includes('sains') ||
    n.includes('teknologi') ||
    n.includes('teknik')
  ) {
    return 'sains-teknik';
  }
  if (
    s.includes('pengembangan-diri') ||
    s.includes('motivasi') ||
    s.includes('psikologi') ||
    s.includes('filsafat') ||
    n.includes('pengembangan diri') ||
    n.includes('psikologi') ||
    n.includes('filsafat')
  ) {
    return 'pengembangan-diri';
  }
  if (
    s.includes('pendidikan') ||
    s.includes('akademik') ||
    s.includes('bahasa') ||
    n.includes('pendidikan') ||
    n.includes('akademik') ||
    n.includes('bahasa')
  ) {
    return 'pendidikan';
  }
  if (s.includes('kesehatan') || s.includes('kedokteran') || s.includes('medis') || n.includes('kesehatan') || n.includes('kedokteran')) {
    return 'kesehatan';
  }
  if (s.includes('kuliner') || s.includes('resep') || s.includes('masak') || n.includes('kuliner') || n.includes('resep')) {
    return 'kuliner';
  }
  if (s.includes('novel') || s.includes('fiksi') || s.includes('sastra') || s.includes('puisi') || n.includes('novel') || n.includes('fiksi') || n.includes('sastra')) {
    return 'novel-fiksi';
  }
  if (s.includes('hukum') || s.includes('undang') || n.includes('hukum') || n.includes('undang')) {
    return 'hukum';
  }
  if (s.includes('pertanian') || s.includes('peternakan') || n.includes('pertanian') || n.includes('peternakan')) {
    return 'pertanian';
  }
  if (s.includes('edukasi-anak') || s.includes('parenting') || n.includes('anak') || n.includes('parenting')) {
    return 'edukasi-anak';
  }
  if (s.includes('politik') || s.includes('budaya') || s.includes('sejarah') || n.includes('politik') || n.includes('budaya') || n.includes('sejarah')) {
    return 'sosial-sejarah';
  }

  return 'umum';
}

/**
 * generateDynamicQuote — Kutipan mutiara berwibawa per rumpun kategori
 */
export function generateDynamicQuote(categorySlug, categoryName, title) {
  const cluster = resolveCategoryCluster(categorySlug, categoryName, title);
  switch (cluster) {
    case 'agama-islam':
      return '“Menuntut ilmu adalah jalan lapang menuju pemahaman hakiki, menumbuhkan adab sebelum kalam, dan menerangi amal dengan bashirah.”';
    case 'bisnis-finansial':
      return '“Keberhasilan finansial dan bisnis bermula dari disiplin modal, kejelasan strategi nilai, dan ketahanan dalam mengelola risiko.”';
    case 'seni-desain':
      return '“Karya seni dan desain yang luhur lahir dari kedalaman rasa, ketajaman estetika, dan ketepatan struktur yang memberi jiwa pada ruang dan harmoni.”';
    case 'sains-teknik':
      return '“Sains dan teknologi sejati bukan sekadar menguasai alat, melainkan memahami prinsip dasar untuk memecahkan persoalan peradaban.”';
    case 'pengembangan-diri':
      return '“Perubahan sejati tidak lahir dari lompatan instan, melainkan dari konsistensi membangun disiplin dan kejernihan pikiran setiap hari.”';
    case 'pendidikan':
      return '“Pendidikan yang berbobot tidak hanya mentransfer pengetahuan, tetapi menyalakan rasa ingin tahu dan membangun karakter merdeka.”';
    case 'kesehatan':
      return '“Kesehatan prima adalah harmoni antara pemahaman biologis yang benar, nutrisi berkualitas, dan ketenangan jiwa.”';
    case 'kuliner':
      return '“Memasak adalah perpaduan antara penghormatan terhadap bahan baku, ketepatan teknik, dan ketulusan dalam menyajikan rasa.”';
    case 'novel-fiksi':
      return '“Karya fiksi yang agung memantulkan kejujuran emosi manusia dan membuka jendela pemahaman atas rahasia kehidupan.”';
    case 'printable':
      return '“Aktivitas belajar yang terarah dan konsisten adalah fondasi terkuat bagi tumbuh kembang potensi serta daya cipta anak.”';
    case 'hukum':
      return '“Kepastian hukum dan keadilan sejati berpijak pada keteguhan asas, integritas moral, dan ketajaman menafsirkan kebenaran.”';
    case 'pertanian':
      return '“Kesuburan bumi dan kemandirian pangan terwujud melalui keselarasan antara kearifan alam dan kemajuan agroteknologi.”';
    case 'sosial-sejarah':
      return '“Masa lalu adalah lentera yang menuntun peradaban memahami kekinian dan merumuskan arah masa depan secara bijaksana.”';
    default:
      return '“Membaca dan menuntut ilmu adalah jalan lapang menuju pemahaman hakiki dan kejernihan pemikiran.”';
  }
}

/**
 * generateDynamicSneakPeek — Menyusun narasi cuplikan Bab 1 editorial berkualitas tinggi per rumpun
 */
export function generateDynamicSneakPeek(title, pages, categorySlug, categoryName) {
  const totalPages = pages || 120;
  const cluster = resolveCategoryCluster(categorySlug, categoryName, title);

  let p1 = '';
  let p2 = '';
  let p3 = '';
  let closing = '';

  switch (cluster) {
    case 'agama-islam':
      p1 = `Lembaran pembuka naskah "${title}" diawali dengan penegasan fondasi tauhid, pemurnian niat, dan urgensi menuntut ilmu berlandaskan dalil Al-Qur'an serta Sunnah. Penulis membentangkan konteks mendasar topik ini dalam membina keimanan dan menjawab keresahan umat secara metodologis.`;
      p2 = `Memasuki uraian inti Bab 1, pembahasan difokuskan pada penjabaran dalil shahih, pembersihan hati (tazkiyatun nufus), serta kaidah amaliyah yang bersandar pada keteladanan para ulama salafus shalih. Pembaca dipandu menelaah batasan syariat, adab lahir batin, dan hikmah berharga di balik setiap tuntunan.`;
      p3 = `Sebagai pengantar menuju bab-bab kajian berikutnya, bab pendahuluan ini menegaskan pentingnya konsistensi dalam mengamalkan ilmu di ranah keseharian, memperkokoh ketakwaan, serta menjaga kelembutan akhlak dalam kehidupan sosial.`;
      closing = `[Lembaran Pratinjau Bab 1 Selesai — Dokumen master lengkap setebal ${totalPages} halaman utuh memuat kajian menyeluruh, rujukan dalil, dan panduan amaliah siap diakses melalui tombol unduhan di bawah ini.]`;
      break;

    case 'bisnis-finansial':
      p1 = `Lembaran pembuka naskah "${title}" menguraikan dinamika lanskap ekonomi kontemporer dan pentingnya penguasaan model bisnis yang solid. Penulis membentangkan realitas persaingan pasar, pola pergeseran perilaku konsumen, serta pentingnya literasi finansial strategis sebagai pilar ketahanan usaha.`;
      p2 = `Memasuki pembahasan Bab 1, fokus diarahkan pada dekonstruksi variabel arus kas, kalkulasi risiko terukur, dan identifikasi peluang profitabel. Pembaca diajak menelaah studi kasus nyata tentang bagaimana keputusan manajerial dan alokasi modal yang disiplin menjadi pembeda antara stagnasi dan pertumbuhan eksponensial.`;
      p3 = `Menutup bab pengantar ini, penulis merumuskan kerangka kerja awal untuk memvalidasi ide, memitigasi kebocoran anggaran, dan menetapkan fondasi tata kelola yang kokoh sebelum melangkah ke strategi ekspansi pasar lanjutan.`;
      closing = `[Lembaran Pratinjau Bab 1 Selesai — Dokumen master lengkap setebal ${totalPages} halaman utuh memuat formulasi bisnis, analisis keuangan terperinci, dan studi kasus siap diakses melalui tombol unduhan di bawah ini.]`;
      break;

    case 'seni-desain':
      p1 = `Lembaran pembuka naskah "${title}" membentangkan eksplorasi estetika visual, keharmonisan komposisi nada, serta rancang bangun spasial yang menginspirasi. Penulis mengawali pengantar dengan membedah filosofi dasar keindahan, proporsi bentuk, dan peran krusial ekspresi kreatif dalam kebudayaan manusia.`;
      p2 = `Memasuki uraian teknis Bab 1, fokus kajian diarahkan pada penguasaan elemen-elemen fundamental—mulai dari anatomi garis dan warna dalam desain, struktur harmoni dan notasi dalam musik, hingga logika fungsi dan material dalam arsitektur. Pembaca diajak menyelami teknik dasar secara sistematis dengan rujukan visual serta diagram yang presisi.`;
      p3 = `Sebagai pengantar menuju bab-bab eksplorasi karya berikutnya, bab pendahuluan ini merumuskan standar apresiasi dan kaidah komposisi yang esensial, membekali perancang dan praktisi seni dengan kepekaan rasa serta ketajaman visual sebelum melangkah ke tahap perancangan yang lebih kompleks.`;
      closing = `[Lembaran Pratinjau Bab 1 Selesai — Dokumen master lengkap setebal ${totalPages} halaman utuh memuat partitur, panduan desain terperinci, dan ilustrasi estetika siap diakses melalui tombol unduhan di bawah ini.]`;
      break;

    case 'sains-teknik':
      p1 = `Lembaran pembuka naskah "${title}" membentangkan evolusi teknologi mutakhir serta landasan teoritis yang menopang arsitektur sistem modern. Penulis menggarisbawahi urgensi pemahaman prinsip sains, komputasi, dan kaidah rekayasa ilmiah dalam memecahkan kompleksitas problem teknis saat ini.`;
      p2 = `Memasuki inti bab pertama, telaah mendalam dititikberatkan pada alur logika sistem, metodologi analisis data, dan integrasi modul fungsional. Pembaca dipandu menelusuri formulasi matematis dan mekanisme kerja internal yang menjadi tulang punggung implementasi teknologi terapan.`;
      p3 = `Sebagai pijakan menuju bab-bab implementatif berikutnya, bab ini menetapkan parameter efisiensi, standar optimasi, serta mitigasi kelemahan sistem guna memastikan keandalan, skalabilitas, dan ketahanan rancang bangun yang dikembangkan.`;
      closing = `[Lembaran Pratinjau Bab 1 Selesai — Dokumen master lengkap setebal ${totalPages} halaman utuh memuat dokumentasi teknis, diagram arsitektur, dan implementasi terapan siap diakses melalui tombol unduhan di bawah ini.]`;
      break;

    case 'pengembangan-diri':
      p1 = `Lembaran pembuka naskah "${title}" mengajak pembaca berefleksi mendalam atas pola pikir harian, kebiasaan otomatis, dan hambatan mental internal yang kerap membatasi potensi diri. Penulis menantang asumsi umum mengenai kesuksesan instan dan menekankan nilai transformasi sadar dari dalam ke luar.`;
      p2 = `Memasuki pembahasan inti Bab 1, uraian difokuskan pada dekonstruksi keyakinan pembatas (limiting beliefs), sains di balik pembentukan kebiasaan baru, dan manajemen energi emosional. Pembaca diajak mengidentifikasi pemicu distraksi modern serta menyusun komitmen pribadi yang terukur.`;
      p3 = `Sebagai landasan menuju tahapan aksi berikutnya, bab ini merumuskan protokol mikro-disiplin harian dan strategi resiliensi mental agar pembaca memiliki kejernihan arah serta konsistensi jangka panjang dalam mencapai tujuan hidup.`;
      closing = `[Lembaran Pratinjau Bab 1 Selesai — Dokumen master lengkap setebal ${totalPages} halaman utuh memuat strategi transformasi personal, latihan terstruktur, dan panduan aksi siap diakses melalui tombol unduhan di bawah ini.]`;
      break;

    case 'pendidikan':
      p1 = `Lembaran pembuka naskah "${title}" menghamparkan urgensi reformasi metode pembelajaran serta landasan pedagogis dalam membentuk ekosistem akademik yang bermakna. Penulis mengidentifikasi kesenjangan antara teori instruksional dengan dinamika ruang kelas kontemporer.`;
      p2 = `Pada inti Bab 1, pembahasan terfokus pada perancangan capaian pembelajaran berbasis kompetensi, integrasi kurikulum terpadu, dan stimulasi pemikiran kritis bagi pembelajar. Uraian diperkuat dengan analisis metodologis yang sistematis dan mudah diadopsi oleh pendidik maupun akademisi.`;
      p3 = `Menutup bab pengantar ini, disajikan kerangka kerja evaluasi autentik untuk mengukur perkembangan kognitif secara komprehensif, menyiapkan landasan yang solid sebelum melangkah ke teknik asesmen dan modul pembelajaran lanjutan.`;
      closing = `[Lembaran Pratinjau Bab 1 Selesai — Dokumen master lengkap setebal ${totalPages} halaman utuh memuat modul ajar terpadu, kajian akademis mendalam, dan instrumen asesmen siap diakses melalui tombol unduhan di bawah ini.]`;
      break;

    case 'kesehatan':
      p1 = `Lembaran pembuka naskah "${title}" mengulas pentingnya pendekatan kesehatan berbasis bukti ilmiah (evidence-based) dan pemahaman holistik atas fungsi tubuh manusia. Penulis memaparkan keterkaitan antara gaya hidup modern, faktor genetik, dan kerentanan terhadap gangguan fisiologis.`;
      p2 = `Memasuki pembahasan Bab 1, telaah dititikberatkan pada mekanisme biologis, deteksi dini faktor risiko klinis, dan pentingnya tindakan preventif. Pembaca dibekali pemahaman anatomi praktis dan indikator vital yang menjadi barometer kesehatan prima.`;
      p3 = `Sebagai gerbang menuju panduan terapi dan pengobatan di bab berikutnya, bagian pembuka ini menegaskan perlunya sinergi antara nutrisi seimbang, aktivitas fisik terukur, serta manajemen stres untuk mencapai pemulihan dan imunitas tubuh yang optimal.`;
      closing = `[Lembaran Pratinjau Bab 1 Selesai — Dokumen master lengkap setebal ${totalPages} halaman utuh memuat panduan medis teruji, protokol kesehatan preventif, dan studi kasus klinis siap diakses melalui tombol unduhan di bawah ini.]`;
      break;

    case 'kuliner':
      p1 = `Lembaran pembuka naskah "${title}" menyuguhkan kehangatan tradisi kuliner dan seni mengolah cita rasa autentik. Penulis membagikan filosofi dasar dapur, pengenalan bumbu rempah berkualitas, serta pentingnya memilih bahan baku segar yang menjadi rahasia kelezatan masakan.`;
      p2 = `Memasuki inti bahasan Bab 1, penjelasan difokuskan pada penguasaan teknik dasar dapur, manajemen api dan suhu, serta tahapan persiapan bahan (mise en place) yang efisien. Pembaca diajak memahami bagaimana kombinasi aroma dan tekstur dapat mengangkat hidangan sederhana menjadi sajian istimewa.`;
      p3 = `Sebagai pengantar menuju deretan resep unggulan pada bab-bab berikutnya, bab awal ini merangkum kaidah higienitas dapur dan tips menjaga konsistensi rasa agar setiap kreasi kuliner dapat direplikasi dengan sempurna di rumah.`;
      closing = `[Lembaran Pratinjau Bab 1 Selesai — Dokumen master lengkap setebal ${totalPages} halaman utuh memuat kompilasi resep rahasia, takaran bahan presisi, dan panduan masak siap diakses melalui tombol unduhan di bawah ini.]`;
      break;

    case 'novel-fiksi':
      p1 = `Lembaran pembuka naskah "${title}" menghembuskan atmosfer narasi yang memikat sejak baris pertama, memperkenalkan latar waktu dan ruang dengan daya imajinasi yang hidup. Penulis secara piawai membangun rasa ingin tahu pembaca melalui dinamika permulaan yang menegangkan.`;
      p2 = `Memasuki pergulatan Bab 1, perkenalan tokoh utama dan motif tersembunyinya mulai terungkap di tengah pusaran konflik permulaan. Hubungan antarkarakter dijalin dengan dialog tajam dan narasi emosional yang mengikat simpati pembaca.`;
      p3 = `Lembaran pembuka ini ditutup dengan tanda tanya besar dan titik balik pertama (plot hook) yang memicu ketegangan, mengantarkan pembaca pada labirin misteri dan petualangan menggetarkan di bab-bab selanjutnya.`;
      closing = `[Lembaran Pratinjau Bab 1 Selesai — Dokumen master naskah lengkap setebal ${totalPages} halaman utuh dengan alur dramatis penuh intrik siap dinikmati melalui tombol unduhan di bawah ini.]`;
      break;

    case 'printable':
      p1 = `Lembaran pembuka modul lembar kerja "${title}" dirancang khusus sebagai panduan praktis aktivitas terstruktur dan edukatif. Bagian pengantar menjelaskan tujuan pembelajaran, estimasi durasi latihan, serta perlengkapan belajar yang dibutuhkan untuk mendukung pendampingan optimal.`;
      p2 = `Memasuki lembar aktivitas Bab 1, peserta didik disajikan latihan pengenalan yang menyenangkan, memadukan stimulasi visual, ketangkasan motorik halus, dan tantangan logika dasar yang ramah pemula. Setiap lembar disusun dengan petunjuk pengerjaan yang jelas dan mudah dipahami.`;
      p3 = `Sebagai pelengkap modul pembuka ini, disertakan catatan panduan bagi orang tua atau pendidik untuk memberikan apresiasi positif, memantau kemajuan anak, serta menciptakan suasana belajar yang interaktif dan menggembirakan.`;
      closing = `[Lembaran Pratinjau Bab 1 Selesai — Dokumen printable beresolusi tinggi setebal ${totalPages} halaman siap dicetak (print-ready) dan diunduh melalui tombol di bawah ini.]`;
      break;

    case 'hukum':
      p1 = `Lembaran pembuka naskah "${title}" menguraikan kerangka normatif dan asas-asas fundamental hukum yang melandasi topik kajian. Penulis membentangkan kedudukan hierarki peraturan perundang-undangan serta relevansi kepatuhan yuridis dalam dinamika kehidupan bernegara dan bermasyarakat.`;
      p2 = `Pada pembahasan Bab 1, analisis difokuskan pada interpretasi teks pasal, doktrin hukum para ahli, serta tinjauan kritis atas hak dan kewajiban subjek hukum terkait. Pembaca dipandu menelaah konstruksi yuridis secara runtut, tajam, dan objektif.`;
      p3 = `Sebagai pengantar menuju bab-bab kajian perkara berikutnya, bab pendahuluan ini merumuskan batasan penegakan hukum dan implikasi sanksi, membekali pembaca dengan landasan pemahaman yang kokoh dalam menghadapi problem hukum konkret.`;
      closing = `[Lembaran Pratinjau Bab 1 Selesai — Dokumen master lengkap setebal ${totalPages} halaman utuh memuat pasal-pasal komprehensif, telaah doktrin yuridis, dan kompilasi regulasi siap diakses melalui tombol unduhan di bawah ini.]`;
      break;

    case 'pertanian':
      p1 = `Lembaran pembuka naskah "${title}" membentangkan potensi sektor agrobisnis dan prinsip dasar agroteknologi modern dalam meningkatkan produktivitas hasil budidaya. Penulis memaparkan kondisi ekologis lahan, pemilihan komoditas unggul, dan faktor keberlanjutan lingkungan.`;
      p2 = `Memasuki bab pertama, uraian difokuskan pada penyiapan media tanam atau kandang, manajemen nutrisi dan pakan, serta pengendalian siklus hidup tanaman atau ternak secara terukur. Disajikan pedoman praktis yang meminimalkan risiko kegagalan pemeliharaan awal.`;
      p3 = `Menutup lembar pembuka ini, dibahas langkah-langkah preventif proteksi hama terpadu dan standardisasi perawatan harian, memberikan panduan aplikatif bagi petani dan peternak sebelum melangkah ke teknik panen dan pascapanen lanjutan.`;
      closing = `[Lembaran Pratinjau Bab 1 Selesai — Dokumen master lengkap setebal ${totalPages} halaman utuh memuat panduan agroteknologi teruji, kalkulasi budidaya, dan strategi pemeliharaan siap diakses melalui tombol unduhan di bawah ini.]`;
      break;

    default:
      p1 = `Lembaran pembuka naskah "${title}" menguraikan pokok pemikiran awal dan konteks mendasar dari topik yang dibahas. Penulis membentangkan urgensi telaah ini dalam merespons tantangan zaman serta memberikan kerangka berpikir yang sistematis bagi pembaca.`;
      p2 = `Memasuki inti bahasan Bab 1, uraian difokuskan pada dekonstruksi konsep-konsep kunci dan peletakan fondasi keilmuan. Pembaca diajak memahami variabel utama, metodologi pembahasan, serta implikasi praktis yang dapat dipetik dari setiap argumentasi yang disajikan.`;
      p3 = `Sebagai pengantar menuju bab-bab berikutnya, bab pendahuluan ini menegaskan pentingnya konsistensi dan pemahaman terpadu dalam menuntaskan keseluruhan naskah.`;
      closing = `[Lembaran Pratinjau Bab 1 Selesai — Naskah master utuh setebal ${totalPages} halaman siap diakses dan diunduh melalui tombol di bawah ini.]`;
      break;
  }

  return `${p1}\n\n${p2}\n\n${p3}\n\n${closing}`;
}

const SYNOPSIS_CONFIG = {
  'agama-islam': {
    domain: 'Kajian Naskah Keislaman & Syariat',
    kurasi: 'Naskah referensi keislaman yang menyajikan panduan autentik berlandaskan Al-Qur\'an dan Sunnah sesuai kaidah dan pemahaman ulama salafus shalih. Disusun secara terstruktur untuk memudahkan penanaman aqidah yang lurus, pembersihan hati (tazkiyatun nufus), serta pengamalan adab dan akhlak terpuji.',
    mastery: 'keteladanan aqidah lurus, dalil shahih, dan penataan akhlak mulia',
    pillars: [
      { title: 'Landasan Dalil & Rujukan', desc: 'Menghimpun rujukan nash Al-Qur\'an dan Sunnah secara terstruktur untuk memperkuat pemahaman keilmuan Islam.' },
      { title: 'Kaidah Syariat & Tuntunan', desc: 'Menjabarkan pedoman ibadah, kaidah fiqih, dan amalan praktis yang dapat diterapkan secara proporsional dalam keseharian.' },
      { title: 'Pembinaan Adab & Kebersihan Jiwa', desc: 'Menuntun pembinaan karakter, adab penuntut ilmu, dan penyucian jiwa (tazkiyatun nufus) berlandaskan tuntunan yang shahih.' },
      { title: 'Hikmah & Keteladanan', desc: 'Menguraikan faedah, hikmah keteladanan salafus shalih, dan keteguhan iman dalam menghadapi berbagai dinamika zaman.' }
    ],
    audience: 'kaum muslimin, penuntut ilmu syar\'i, akademisi keislaman, serta pembelajar mandiri'
  },
  'bisnis-finansial': {
    domain: 'Ekonomi, Bisnis & Manajemen Finansial',
    kurasi: 'Panduan strategis bisnis dan finansial yang dirancang untuk membekali praktisi, wirausahawan, dan investor dengan instrumen analisis terukur. Mengombinasikan studi kasus nyata dengan prinsip mitigasi risiko untuk membangun model pertumbuhan bisnis yang kokoh dan berkelanjutan.',
    mastery: 'pengelolaan likuiditas arus kas, eksekusi strategi pasar, dan manajemen portofolio modal',
    pillars: [
      { title: 'Analisis Pasar & Model Bisnis', desc: 'Memetakan dinamika pasar, proposisi nilai kompetitif, dan validasi model bisnis berkelanjutan.' },
      { title: 'Manajemen Arus Kas & Investasi', desc: 'Merumuskan tata kelola likuiditas, alokasi modal terukur, dan strategi diversifikasi portofolio aset.' },
      { title: 'Strategi Pemasaran & Pertumbuhan', desc: 'Mengakselerasi akuisisi pelanggan, penetrasi pasar digital, serta optimasi konversi penjualan terukur.' },
      { title: 'Mitigasi Risiko & Tata Kelola', desc: 'Mengidentifikasi titik kritis operasional, kepatuhan finansial, serta proteksi ketahanan bisnis jangka panjang.' }
    ],
    audience: 'wirausahawan, manajer bisnis, investor, pelaku UMKM, dan profesional korporat'
  },
  'seni-desain': {
    domain: 'Seni Rupa, Desain Grafis, Arsitektur & Musik',
    kurasi: 'Rujukan estetika dan teknis komprehensif yang memadukan kepekaan artistik dengan ketepatan struktural. Disusun untuk membimbing desainer, musisi, arsitek, dan pemerhati seni dalam menguasai kaidah visual, harmoni auditif, serta eksplorasi ruang yang berkarakter.',
    mastery: 'harmoni komposisi nada, presisi tipografi visual, dan proporsi arsitektural',
    pillars: [
      { title: 'Prinsip Estetika & Filosofi Bentuk', desc: 'Membedah kaidah dasar visual, proporsi estetis, dan filosofi ekspresi artistik lintas masa.' },
      { title: 'Teknik Dasar & Penguasaan Medium', desc: 'Menguasai instrumen berkarya, notasi musik, eksplorasi warna, serta pemilihan material ruang.' },
      { title: 'Komposisi & Perancangan Karya', desc: 'Menata harmoni nada, tata letak grafis terstruktur, dan rancang bangun spasial yang fungsional.' },
      { title: 'Apresiasi & Kritik Seni Kontemporer', desc: 'Mengevaluasi karya cipta secara kritis untuk memperkaya wawasan keindahan dan identitas berkarya.' }
    ],
    audience: 'desainer grafis, musisi, arsitek, ilustrator, mahasiswa seni, dan pemerhati estetika budaya'
  },
  'sains-teknik': {
    domain: 'Sains Terapan, Rekayasa & Teknologi Informasi',
    kurasi: 'Rujukan ilmiah dan teknis komprehensif yang mengulas prinsip-prinsip sains fundamental serta penerapannya dalam rekayasa teknologi modern. Memadukan kejelasan konsep teoritis dengan pedoman pemecahan masalah praktis di lapangan.',
    mastery: 'arsitektur sistem terpadu, metodologi riset ilmiah, dan komputasi presisi',
    pillars: [
      { title: 'Fondasi Teori & Metodologi', desc: 'Mengupas prinsip dasar keilmuan, hukum alam, serta landasan metodologis pengujian eksperimental.' },
      { title: 'Prinsip Arsitektur Sistem', desc: 'Menelaah rancang bangun sistem, struktur komponen, dan integrasi logika teknologi modern.' },
      { title: 'Implementasi & Studi Kasus Terapan', desc: 'Menghubungkan teori kalkulatif dengan pemecahan masalah teknis di lingkungan industri nyata.' },
      { title: 'Analisis Performa & Optimasi', desc: 'Mengevaluasi metrik efisiensi, skalabilitas performa, dan inovasi pengembangan mutakhir.' }
    ],
    audience: 'praktisi teknologi, insinyur rekayasa, peneliti laboratorium, mahasiswa teknik, dan peminat sains'
  },
  'pengembangan-diri': {
    domain: 'Pengembangan Diri, Psikologi Terapan & Produktivitas',
    kurasi: 'Panduan transformasi personal yang membedah akar kebiasaan, manajemen fokus, dan ketahanan mental berbasis sains perilaku. Disusun secara sistematis agar pembaca mampu membangun disiplin harian dan mengikis pola pikir yang menghambat pertumbuhan.',
    mastery: 'regulasi emosional, arsitektur kebiasaan berdaya tahan, dan kejernihan fokus',
    pillars: [
      { title: 'Dekonstruksi Pola Pikir', desc: 'Membongkar keyakinan pembatas (limiting beliefs) dan membangun mentalitas bertumbuh yang resilien.' },
      { title: 'Manajemen Fokus & Kebiasaan', desc: 'Menyusun arsitektur rutinitas produktif, pengelolaan energi harian, dan eliminasi distraksi modern.' },
      { title: 'Formulasi Aksi Nyata', desc: 'Menerjemahkan visi strategis menjadi rencana aksi terukur dengan target capaian bertahap.' },
      { title: 'Pertumbuhan Berkelanjutan', desc: 'Memelihara konsistensi diri, evaluasi berkala, dan resiliensi mental jangka panjang.' }
    ],
    audience: 'pembelajar mandiri, profesional muda, pencari produktivitas tinggi, dan individu yang berorientasi pada kemajuan'
  },
  'pendidikan': {
    domain: 'Pendidikan, Kurikulum & Pedagogi Akademik',
    kurasi: 'Diktat keilmuan dan modul pendidikan terstruktur yang memadukan teori kurikulum mutakhir dengan metodologi pengajaran adaptif. Dirancang untuk memperkuat kapasitas instruksional pendidik serta meningkatkan daya serap pembelajar.',
    mastery: 'desain instruksional aktif, asesmen autentik, dan literasi keilmuan komprehensif',
    pillars: [
      { title: 'Kurikulum & Landasan Pedagogis', desc: 'Menyusun kerangka pembelajaran berbasis capaian, standar kompetensi, dan teori pedagogi modern.' },
      { title: 'Metodologi Pembelajaran Aktif', desc: 'Mengintegrasikan strategi instruksional interaktif untuk mengoptimalkan retensi pemahaman peserta didik.' },
      { title: 'Evaluasi & Asesmen Autentik', desc: 'Merancang instrumen penilaian komprehensif yang mengukur pemahaman kognitif dan keterampilan praktis.' },
      { title: 'Pengembangan Kapasitas Pembelajar', desc: 'Membina kemandirian belajar, literasi kritis, dan kesiapan adaptif menghadapi tantangan akademik.' }
    ],
    audience: 'pendidik, guru, dosen, perancang kurikulum, mahasiswa, dan akademisi'
  },
  'kesehatan': {
    domain: 'Kesehatan Holistik, Kedokteran & Gaya Hidup Sehat',
    kurasi: 'Panduan kesehatan dan medis berbasis bukti yang mengupas cara kerja organ tubuh, pencegahan penyakit secara dini, serta perawatan terpadu. Memberikan wawasan klinis yang mudah dipahami demi meningkatkan taraf kesehatan fisik dan kebugaran tubuh.',
    mastery: 'pencegahan preventif, nutrisi fungsional, dan pemeliharaan homeostasis tubuh',
    pillars: [
      { title: 'Patofisiologi & Dasar Klinis', desc: 'Memahami mekanisme biologis, etiologi keluhan, dan fungsi fisiologis tubuh secara komprehensif.' },
      { title: 'Diagnosis & Tindakan Preventif', desc: 'Mengidentifikasi gejala dini, mitigasi faktor risiko, dan kaidah pencegahan penyakit berbasis bukti medis.' },
      { title: 'Protokol Terapi & Nutrisi Holistik', desc: 'Menguraikan panduan perawatan teruji, asupan nutrisi esensial, dan pemulihan kesehatan terpadu.' },
      { title: 'Manajemen Pola Hidup Sehat', desc: 'Mengembangkan rutinitas kebugaran berkelanjutan, manajemen stres, dan pemeliharaan vitalitas fisik.' }
    ],
    audience: 'praktisi kesehatan, pemerhati kebugaran, keluarga, dan masyarakat umum yang peduli kesehatan preventif'
  },
  'kuliner': {
    domain: 'Seni Kuliner, Gastronomi & Resep Autentik',
    kurasi: 'Kompilasi resep dan teknik memasak teruji yang menyingkap rahasia perpaduan bumbu rempah pilihan, kontrol temperatur, dan metode pengolahan profesional. Disusun bertahap untuk memandu juru masak amatir maupun berpengalaman menciptakan hidangan berkelas.',
    mastery: 'keseimbangan komposisi bumbu, presisi suhu pengolahan, dan standar higienitas dapur',
    pillars: [
      { title: 'Karakteristik & Anatomi Bahan', desc: 'Memahami profil rasa, kualitas kesegaran bahan baku, dan kompatibilitas bumbu dapur pilihan.' },
      { title: 'Teknik Pengolahan & Suhu Presisi', desc: 'Menguasai metodologi memasak profesional, penanganan tekstur, dan presisi temperatur pengolahan.' },
      { title: 'Formulasi Resep Teruji', desc: 'Menyajikan takaran bumbu akurat dan tahapan eksekusi dapur yang konsisten serta mudah direplikasi.' },
      { title: 'Penyajian & Standar Higienitas', desc: 'Memadukan estetika presentasi visual hidangan dengan standar kebersihan dan sanitasi makanan modern.' }
    ],
    audience: 'penggemar kuliner, juru masak rumahan, wirausahawan kuliner, dan pecinta gastronomi nusantara maupun internasional'
  },
  'novel-fiksi': {
    domain: 'Karya Fiksi, Sastra & Penulisan Kreatif',
    kurasi: 'Karya sastra dan fiksi terpilih yang menawarkan kedalaman jalinan konflik, penokohan emosional yang memikat, dan eksplorasi latar naratif yang hidup. Mengajak pembaca meresapi refleksi kemanusiaan melalui keindahan prosa dan arsitektur alur cerita.',
    mastery: 'pembangunan karakter multidimensi, tensi dramatik plot, dan penjiwaan latar cerita',
    pillars: [
      { title: 'Konstruksi Karakter & Psikologi Tokoh', desc: 'Membangun kedalaman motif kepribadian, konflik internal, dan busur perkembangan tokoh naskah.' },
      { title: 'Arsitektur Plot & Dinamika Konflik', desc: 'Menganyam alur cerita berlapis, ketegangan dramatis, dan resolusi klimaks yang memikat.' },
      { title: 'Eksplorasi Latar & Atmosfer Cerita', desc: 'Menghidupkan dunia narasi melalui detail ruang waktu yang sensoris dan imersif.' },
      { title: 'Kedalaman Tema & Pesan Filosofis', desc: 'Mengartikulasikan resonansi moral, kritik sosial, dan renungan kemanusiaan yang berkesan bagi pembaca.' }
    ],
    audience: 'penikmat novel, pecinta sastra klasik, penulis kreatif, dan pembaca umum yang mendambakan narasi berbobot'
  },
  'printable': {
    domain: 'Modul Aktivitas Edukatif & Lembar Kerja Terstruktur',
    kurasi: 'Paket printable dan lembar kerja aktivitas interaktif yang dirancang untuk menstimulasi daya motorik halus, koordinasi visual, dan kemampuan bernalar dasar anak. Disusun secara sistematis agar dapat digunakan langsung dalam pembelajaran mandiri di rumah maupun sekolah.',
    mastery: 'perancangan latihan bertahap, stimulasi daya visual-spasial, dan pendampingan belajar interaktif',
    pillars: [
      { title: 'Rancang Bangun Latihan Terstruktur', desc: 'Menyusun modul lembar kerja bertahap yang disesuaikan dengan tingkat perkembangan anak.' },
      { title: 'Stimulasi Motorik & Kognitif', desc: 'Melatih koordinasi visual-motorik, ketangkasan menulis, dan kemampuan asosiasi logika dasar.' },
      { title: 'Desain Visual Edukatif & Interaktif', desc: 'Menggunakan tata letak ramah anak untuk menjaga fokus, minat belajar, dan daya imajinasi.' },
      { title: 'Evaluasi Capaian & Panduan Pendamping', desc: 'Memberikan instruksi panduan bagi orang tua atau guru dalam mendampingi aktivitas pembelajaran.' }
    ],
    audience: 'orang tua, pendidik anak usia dini (PAUD/TK), guru pendamping, dan pemerhati edukasi anak'
  },
  'hukum': {
    domain: 'Ilmu Hukum, Perundang-Undangan & Yurisprudensi',
    kurasi: 'Kompilasi dan telaah hukum normatif yang mengkaji konstruksi pasal, doktrin yuridis, serta praktik peradilan. Menyajikan penalaran hukum yang terstruktur untuk membantu praktisi maupun akademisi memahami kepatuhan perundang-undangan.',
    mastery: 'interpretasi yuridis norma aturan, konstruksi penalaran hukum, dan tata kelola litigasi',
    pillars: [
      { title: 'Asas & Doktrin Hukum', desc: 'Membedah fondasi yuridis, hierarki peraturan perundang-undangan, dan prinsip kepastian hukum.' },
      { title: 'Interpretasi & Konstruksi Pasal', desc: 'Menafsirkan norma aturan hukum secara sistematis terhadap dinamika perkara nyata.' },
      { title: 'Prosedur & Praktik Litigasi', desc: 'Menguraikan tahapan formil peradilan, tata cara pembuktian, dan hak-hak subjek hukum.' },
      { title: 'Analisis Yurisprudensi & Kepatuhan', desc: 'Mengevaluasi putusan pengadilan terdahulu dan strategi kepatuhan hukum preventif.' }
    ],
    audience: 'praktisi hukum, advokat, konsultan regulasi, mahasiswa hukum, dan pengambil kebijakan'
  },
  'pertanian': {
    domain: 'Agroteknologi, Budidaya Tanaman & Peternakan Terpadu',
    kurasi: 'Panduan agribisnis dan teknik budidaya terpadu yang memadukan prinsip biologi pertanian dengan teknologi modern. Berfokus pada efisiensi pemeliharaan, kesehatan tanah dan ternak, serta peningkatan nilai ekonomis hasil panen.',
    mastery: 'manajemen hara tanah dan pakan ternak, proteksi hama terpadu, dan efisiensi agroklimat',
    pillars: [
      { title: 'Karakteristik Tanah & Agroklimat', desc: 'Menganalisis kondisi lahan, kebutuhan hara tanaman, dan penyesuaian iklim mikro budidaya.' },
      { title: 'Teknik Budidaya & Manajemen Ternak', desc: 'Menguasai siklus pemeliharaan bibit unggul, nutrisi pakan, dan perawatan terjadwal.' },
      { title: 'Pengendalian Hama & Penyakit Terpadu', desc: 'Menerapkan mitigasi biologis ramah lingkungan dan proteksi dini terhadap patogen.' },
      { title: 'Pasca Panen & Efisiensi Rantai Pasok', desc: 'Mengoptimalkan penanganan hasil panen, standardisasi mutu, dan kelayakan nilai ekonomi hasil tani.' }
    ],
    audience: 'petani mandiri, peternak, pengelola usaha agribisnis, penyuluh lapangan, dan mahasiswa agroteknologi'
  },
  'sosial-sejarah': {
    domain: 'Sosiologi, Kebijakan Publik, Sejarah & Kebudayaan',
    kurasi: 'Kajian multidimensional atas dinamika peradaban manusia, struktur komunitas sosial, serta evolusi kebijakan politik. Menggali keterkaitan masa lalu dengan realitas sosial kontemporer guna membangun pemahaman historis yang kritis.',
    mastery: 'analisis dinamika sosial, dialektika historis peradaban, dan evaluasi kebijakan publik',
    pillars: [
      { title: 'Konstruksi Sosio-Historis', desc: 'Menelusuri akar historis, kontinuitas peradaban, dan dialektika perubahan struktur masyarakat.' },
      { title: 'Dinamika Kebijakan & Kekuasaan', desc: 'Menganalisis relasi institusi publik, formulasi kebijakan, dan pengaruh geopolitik.' },
      { title: 'Kearifan Lokal & Identitas Kolektif', desc: 'Mengkaji nilai budaya, tradisi komunitas, dan ketahanan sosial menghadapi modernisasi.' },
      { title: 'Refleksi Kritis Masa Depan', desc: 'Menarik sintesis hikmah masa lalu untuk merumuskan respon strategis atas tantangan peradaban.' }
    ],
    audience: 'peneliti sosial, sejarawan, akademisi ilmu budaya, analis kebijakan, dan peminat literatur humaniora'
  },
  'umum': {
    domain: 'Koleksi Literatur Digital Terpilih',
    kurasi: 'Naskah referensi digital terverifikasi yang menyajikan pembahasan komprehensif, terstruktur, dan aplikatif. Disusun untuk menjembatani wawasan teoritis dengan kebutuhan praktis pembaca dalam memperluas cakrawala keilmuan.',
    mastery: 'pemahaman konseptual yang utuh, ketajaman analisis, dan implementasi terarah',
    pillars: [
      { title: 'Landasan Konseptual', desc: 'Membangun fondasi pemahaman yang kokoh dan terverifikasi secara metodologis.' },
      { title: 'Kerangka Analitis', desc: 'Menyajikan tinjauan kritis terhadap prinsip-prinsip utama dan studi kasus relevan.' },
      { title: 'Panduan Terapan', desc: 'Memberikan formulasi praktis yang dapat langsung diimplementasikan dalam aktivitas harian.' },
      { title: 'Evaluasi & Sintesis', desc: 'Menarik benang merah pembelajaran untuk pengembangan wawasan berkelanjutan.' }
    ],
    audience: 'pegiat literasi, pembelajar mandiri, akademisi, dan profesional'
  }
};

/**
 * generateDynamicSynopsis — Menyusun sinopsis 5 bab komprehensif dengan 4 pilar tematik spesifik per rumpun
 */
export function generateDynamicSynopsis(title, categorySlug, categoryName) {
  const cluster = resolveCategoryCluster(categorySlug, categoryName, title);
  const cfg = SYNOPSIS_CONFIG[cluster] || SYNOPSIS_CONFIG['umum'];

  return `### 01. Ikhtisar Eksekutif & Orientasi Naskah
Melalui naskah bertajuk **${title}**, pembaca dipandu mengeksplorasi wawasan fundamental dalam domain ${cfg.domain}. Koleksi literatur digital resmi FokusKonten ini menyajikan perspektif menyeluruh yang menjembatani kaidah teoritis dengan realitas terapan.

Ringkasan Kurasi:
${cfg.kurasi}

Alih-alih menyajikan pembahasan yang kering atau abstrak, karya ini menonjolkan aspek reflektif. Pembaca dipandu untuk memahami hubungan sebab-akibat secara multidimensional, membiasakan diri berpikir sistemik sebelum mengambil kesimpulan penting.

### 02. Paradigma Revolusioner & Gagasan Pembeda
Keunggulan pembeda naskah ini terletak pada penolakannya terhadap formula instan yang dangkal. Penulis menunjukkan bahwa penguasaan atas ${cfg.mastery} membutuhkan pemahaman struktural yang utuh, menghasilkan wawasan transformatif yang memperkaya cara pandang pembaca secara menyeluruh.

Dengan gaya penuturan yang terstruktur, lugas, dan berwibawa, dokumen ini mengungkap keterkaitan antara fondasi gagasan dan dampak aplikasinya dalam konteks nyata. Pembaca diajak berdialog secara cerdas untuk membangun cetak biru pemikiran yang mandiri.

### 03. Bedah 4 Pilar Tematik & Pokok Bahasan Kritis
Dalam telaah naskah ini, terdapat empat pilar konseptual utama yang dieksplorasi secara terperinci:
• **${cfg.pillars[0].title}**: ${cfg.pillars[0].desc}
• **${cfg.pillars[1].title}**: ${cfg.pillars[1].desc}
• **${cfg.pillars[2].title}**: ${cfg.pillars[2].desc}
• **${cfg.pillars[3].title}**: ${cfg.pillars[3].desc}

### 04. Relevansi Terapan & Sasaran Pembaca
Naskah digital ini dirancang secara khusus untuk ${cfg.audience}. Wawasan substantif di dalamnya menyimpan nilai praktis yang dapat langsung dikonversi menjadi perbaikan strategi, ketajaman analisis masalah, hingga peningkatan mutu disiplin pribadi dan profesional Anda.

### 05. Panduan Kajian Mandiri & Rekomendasi Redaksi
Tim redaksi FokusKonten menyarankan pembaca meluangkan waktu khusus untuk menelaah setiap bab secara berurutan guna memperoleh sintesis pemahaman yang utuh dan aplikatif. Jadikan intisari naskah sebagai bahan evaluasi berkala untuk mendorong pertumbuhan wawasan berkelanjutan.`;
}

/**
 * enrichShardItem — Mengonversi item shard kategori menjadi data atomik artikel utuh O(1)
 */
export function enrichShardItem(item, categoryName, categorySlug) {
  if (!item) return null;

  const catSlug = categorySlug || item.categorySlug || '';
  const catName = categoryName || item.category || 'Literatur Digital';

  const cleaned = cleanTitleAndAuthor(item.title, item.author, item.previewSnippet);
  const title = cleaned.title || item.title;
  const author = cleaned.author || 'Tim Redaksi Literatur';
  const hasAuthor = Boolean(author && author !== 'Tim Redaksi Literatur');

  const pages = item.pages || 120;
  const durationMinutes = Math.round(pages * 1.5);
  const durationText = durationMinutes >= 60 
    ? `~${(durationMinutes / 60).toFixed(1)} Jam Baca`
    : `~${durationMinutes} Menit Baca`;

  const tags = [
    'PDF Searchable',
    'Edisi Lengkap',
    'Akses Terbuka',
    'Bebas DRM'
  ];

  // Evaluasi kelayakan snippet: jika terdeteksi noise OCR, buang dan gunakan editorial generator Bab 1
  let sneakPeekText = '';
  if (item.previewSnippet && !isOcrGarbage(item.previewSnippet)) {
    const cleanSnippet = item.previewSnippet.trim().replace(/\s{2,}/g, ' ');
    sneakPeekText = `${cleanSnippet}\n\n[Lembaran Pratinjau Bab 1 Selesai — Dokumen master lengkap setebal ${pages} halaman utuh memuat pembahasan menyeluruh siap diakses melalui tombol unduhan di bawah ini.]`;
  } else {
    sneakPeekText = generateDynamicSneakPeek(title, pages, catSlug, catName);
  }

  // Rapikan Subtitle agar tidak menghasilkan string kaku / aneh di H1
  const subtitle = cleanOrExtractSubtitle(item.subtitle, catName, title) ||
                   cleanOrExtractSubtitle(item.articleTitle, catName, title);

  const articleTitle = item.articleTitle &&
    !item.articleTitle.includes('Risalah & Koleksi Literatur PDF') &&
    !item.articleTitle.includes('Koleksi Resmi PDF')
      ? item.articleTitle
      : (subtitle ? `E-Book ${title} — ${subtitle} PDF` : `E-Book ${title} — Risalah & Koleksi Literatur PDF`);

  const quote = generateDynamicQuote(catSlug, catName, title);

  return {
    sku: item.sku,
    title,
    rawTitle: item.title,
    subtitle,
    articleTitle,
    author,
    authorDisplay: author,
    hasAuthor,
    category: catName,
    categorySlug: catSlug,
    tags,
    pages,
    duration: durationText,
    sizeMb: item.sizeMb || '1.5 MB',
    format: 'PDF',
    coverImage: item.coverImage || `https://cdn.jsdelivr.net/gh/mcjobs-id/fokuskonten-assets-ebook@main/ebook/${item.sku}/${item.sku}_cover.webp`,
    quote,
    synopsis: generateDynamicSynopsis(title, catSlug, catName),
    curiosityHook: 'Ulasan dalam naskah ini sengaja dibatasi pada lembaran pembuka Bab 1 sebelum strategi dan formula inti diungkap secara gamblang. Penasaran bagaimana kelanjutan pembahasan dan panduan lengkapnya? Tuntaskan membaca naskah master utuh melalui tombol unduhan di bawah ini.',
    sneakPeekText,
    tableOfContents: [
      { chapter: 1, title: 'Bab 1: Intisari Pembuka & Peletakan Fondasi', status: 'Sudah Dibaca di Cuplikan' },
      { chapter: 2, title: 'Bab 2: Analisis Mendalam & Pendekatan Konsep', status: 'Tersedia di E-Book Lengkap' },
      { chapter: 3, title: 'Bab 3: Implementasi Nyata & Panduan Praktis', status: 'Tersedia di E-Book Lengkap' },
      { chapter: 4, title: 'Bab 4: Eksplorasi Lanjutan & Studi Kasus', status: 'Tersedia di E-Book Lengkap' },
      { chapter: 5, title: `Bab 5 s/d Bab Akhir: Rangkuman & Penutup (${pages} Halaman)`, status: 'Tersedia di E-Book Lengkap' }
    ],
    safelinkUrl: null,
    priceCoffee: 2000,
    megaBundleSku: 'IDEB00',
    viewCount: item.viewCount || 0
  };
}
