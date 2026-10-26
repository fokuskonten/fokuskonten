import Link from 'next/link'

export const metadata = {
  title: "BacaQur'an — Al-Qur'an Digital 100% Offline, Tajwid Berwarna & Super-App Muslim Lengkap",
  description: "Aplikasi Al-Qur'an digital terlengkap dan murni tanpa iklan mengganggu. Mushaf Kemenag RI, audio murottal 30 juz, jadwal shalat, arah kiblat, tasbih digital, doa harian, belajar tajwid, dan ensiklopedia Islam.",
  alternates: { canonical: 'https://fokuskonten.my.id/landpage/bacaquran' },
  openGraph: {
    title: "BacaQur'an — Super-App Muslim Resmi FokusKonten",
    description: "Ibadah lebih khusyuk tanpa distraksi iklan. Al-Qur'an offline, jadwal shalat, kiblat, doa, dzikir, dan tajwid lengkap.",
    images: [{ url: '/screenshots/bacaquran/header.png', width: 1200, height: 630, alt: "BacaQur'an Header" }],
  },
}

export default function BacaQuranLandingPage() {
  const waConsultUrl = 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20tertarik%20dengan%20aplikasi%20BacaQur%27an%20dan%20ingin%20info%20pengujian%20resminya'
  const playStoreTestingUrl = 'https://play.google.com/apps/testing/com.fokuskonten.bacaquran'
  const apkDownloadUrl = 'https://github.com/fokuskonten/fokuskonten/releases/download/apps-v1.0/BacaQuran_v1.2.0.apk'

  const featuresCategoryA = [
    { title: 'Mushaf 114 Surah 30 Juz Offline', desc: 'Teks mushaf standar Kemenag RI tersimpan lokal, tajam dibaca dan tidak memakan kuota internet.' },
    { title: 'Tanda Tajwid Interaktif Berwarna', desc: 'Pewarnaan kaidah tajwid (Ghunnah, Ikhfa, Idgham, Mad, Qalqalah) untuk tilawah lebih tartil dan benar.' },
    { title: 'Terjemahan Resmi & Transliterasi Latin', desc: 'Terjemahan bahasa Indonesia resmi per ayat serta panduan ejaan latin untuk mempermudah pemahaman.' },
    { title: 'Audio Murottal MP3 Per Ayat', desc: 'Lantunan merdu dari qari internasional terkemuka (termasuk Syaikh Misyari Rasyid Al-Afasy).' },
    { title: 'Pencarian Cerdas Surah & Ayat', desc: 'Temukan surah, nomor juz, atau penggalan terjemahan secara instan dengan mesin pencari lokal.' },
    { title: 'Penanda Terakhir Dibaca & Bookmark', desc: 'Lanjutkan tadarus harian Anda tepat di ayat terakhir tanpa perlu mengingat nomor halaman.' },
  ]

  const featuresCategoryB = [
    { title: 'Jadwal Shalat Otomatis & Akurat', desc: 'Penetapan waktu Subuh, Dzuhur, Ashar, Maghrib, dan Isya berbasis koordinat lokasi akurat.' },
    { title: 'Hitung Mundur Waktu Shalat Realtime', desc: 'Timer countdown langsung di beranda untuk memastikan Anda siap menyambut adzan berikutnya.' },
    { title: 'Alarm Adzan 5 Pilihan Mode', desc: 'Pengingat adzan penuh, adzan ringkas, nada dering pilihan, getar hening, atau mode senyap.' },
    { title: 'Kompas Arah Kiblat Sensor Presisi', desc: 'Penunjuk kiblat akurat menggunakan sensor giroskop dan kompas internal smartphone Anda.' },
    { title: 'Kalender Hijriah & Hari Besar Islam', desc: 'Sinkronisasi kalender Islam harian serta penanda puasa sunnah dan hari-hari besar Islam.' },
  ]

  const featuresCategoryC = [
    { title: 'Dzikir Tasbih Digital Haptic', desc: 'Penghitung dzikir digital praktis dengan getaran halus yang responsif tanpa perlu melihat layar.' },
    { title: 'Kumpulan Doa Sehari-hari & Dzikir Pagi Petang', desc: 'Doa mustajab lengkap dengan teks Arab, terjemahan Indonesia, serta tuntunan audio.' },
    { title: 'Ensiklopedia 99 Asmaul Husna', desc: 'Nama-nama Allah SWT lengkap dengan audio pelafalan merdu dan makna mendalam.' },
    { title: 'Koleksi Shalawat & Amalan Sunnah', desc: 'Kumpulan shalawat nabi dan panduan amalan harian untuk memperkaya rutinitas spiritual.' },
  ]

  const featuresCategoryD = [
    { title: 'Panduan Belajar Kaidah Tajwid Lengkap', desc: 'Materi terstruktur: hukum nun mati/tanwin, mim mati, mad, makharijul huruf, waqaf, dan qalqalah.' },
    { title: 'Kelas Tahsin Bertingkat', desc: 'Materi tahsin bacaan yang dirancang dari tingkat pemula, menengah, hingga mahir.' },
    { title: 'Hadits Shahih Pilihan & Kitab Ibadah', desc: 'Rangkuman hadits-hadits shahih dan kitab ibadah fiqih praktis untuk rujukan sehari-hari.' },
    { title: 'Sirah Nabawiyah & Panduan Haji/Umrah', desc: 'Kisah teladan Rasulullah SAW dan sahabat, serta panduan manasik ibadah haji dan umrah lengkap.' },
  ]

  const screenshots = [
    { url: '/screenshots/bacaquran/1.jpeg', label: 'Beranda & Jadwal Shalat' },
    { url: '/screenshots/bacaquran/2.jpeg', label: 'Teks Al-Qur\'an & Terjemahan' },
    { url: '/screenshots/bacaquran/3.jpeg', label: 'Kompas Kiblat & Sensor' },
    { url: '/screenshots/bacaquran/4.jpeg', label: 'Dzikir Tasbih & Doa Harian' },
    { url: '/screenshots/bacaquran/5.jpeg', label: 'Panduan Tajwid & Tahsin' },
  ]

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* ── BREADCRUMB & HEADER NOTIFICATION ── */}
      <div className="bg-emerald-950 text-emerald-100 py-2.5 px-4 text-xs font-mono border-b border-emerald-900/60">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>FokusKonten Mobile // Program Uji Coba Terbuka BacaQur&#39;an (Android Play Store)</span>
          </div>
          <div className="text-[11px] text-emerald-300">
            Arsitektur 100% Offline-First • Bebas Iklan Pop-up
          </div>
        </div>
      </div>

      {/* ── HERO BANNER SECTION ── */}
      <header className="relative pt-12 pb-16 md:pt-16 md:pb-24 border-b border-neutral-200/80 bg-gradient-to-b from-white via-[#F7F5EE] to-[#FAF9F6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 mb-6">
            <Link href="/" className="hover:text-emerald-700 transition-colors">Beranda</Link>
            <span>/</span>
            <Link href="/aplikasi" className="hover:text-emerald-700 transition-colors">Produk Aplikasi</Link>
            <span>/</span>
            <span className="text-emerald-800 font-semibold">BacaQur&#39;an</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Super-App Muslim Resmi FokusKonten • Bebas Iklan Mengganggu
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.15]">
                Ibadah Lebih Khusyuk Tanpa Gangguan Iklan. Baca, Dengarkan &amp; Pelajari Kalamullah di Manapun.
              </h1>

              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl">
                Bukan sekadar aplikasi Al-Qur&#39;an biasa. <strong>BacaQur&#39;an</strong> adalah ekosistem ibadah Muslim lengkap yang menyatukan teks mushaf Kemenag bertajwid warna, audio murottal 30 juz, waktu shalat dan alarm adzan otomatis, kompas kiblat presisi, tasbih digital, doa harian, hingga pembelajaran tajwid dan tahsin dalam satu aplikasi terpadu yang <strong>100% beroperasi secara offline</strong>.
              </p>

              {/* ACTION BUTTONS */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:items-center">
                <a
                  href={playStoreTestingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-sm text-white bg-emerald-700 hover:bg-emerald-800 shadow-lg shadow-emerald-700/25 transition-all"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.326 1.973C1.256 2.294 1.22 2.634 1.22 3v18c0 .366.036.706.106 1.027L12 12 1.326 1.973zm.905-.642l11.17 10.736L23.723 3.38c-.443-.269-1-.43-1.607-.43H4.202c-.717 0-1.356.248-1.971.38zM23.66 4.797L13.334 15.05l5.914 5.686 4.02-3.878c.442-.374.732-.932.732-1.558V6.19c0-.515-.121-1-.34-1.394zM12 13.14L1.628 22.21A3.573 3.573 0 004.202 23h15.596c.46 0 .893-.112 1.28-.31L18.87 19.87 12 13.14z"/>
                  </svg>
                  <span>Akses Penguji Google Play</span>
                </a>

                <a
                  href={apkDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-semibold text-sm text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-300 shadow-sm transition-all"
                >
                  <svg className="w-4 h-4 text-emerald-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Unduh APK Mandiri (v1.2.0 • 10 MB)</span>
                </a>
              </div>

              {/* QUICK HIGHLIGHT BADGES */}
              <div className="pt-3 flex flex-wrap gap-4 text-xs text-neutral-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  114 Surah &amp; 30 Juz Lengkap
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Tanda Tajwid Interaktif
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Nol Iklan Pop-up
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Hemat Baterai &amp; Memori
                </span>
              </div>
            </div>

            {/* HERO VISUAL PREVIEW */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-neutral-200/80 shadow-2xl bg-neutral-900 group">
                <img
                  src="/screenshots/bacaquran/header.png"
                  alt="Tampilan Antarmuka BacaQur'an"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                    Official Muslim Super-App
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    BacaQur&#39;an v1.2.0
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                    Mushaf standar Kemenag RI, transliterasi, audio qari internasional, waktu shalat, dan 24+ fitur keislaman terpadu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── SECTION: KENAPA BACAQUR'AN BERBEDA (BUKAN APLIKASI KALENG-KALENG) ── */}
      <section className="py-16 md:py-20 border-b border-neutral-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider block mb-2">
              Kualitas Tanpa Kompromi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              Mengapa BacaQur&#39;an Berbeda dari Aplikasi Al-Qur&#39;an Kebanyakan?
            </h2>
            <p className="text-neutral-600 mt-3 text-sm sm:text-base leading-relaxed">
              Banyak aplikasi Al-Qur&#39;an gratis di pasaran yang merusak kekhusyukan ibadah dengan iklan video tiba-tiba di tengah ayat, mewajibkan koneksi internet konstan, atau menjual data privasi pengguna. BacaQur&#39;an dibangun dengan filosofi ibadah murni: khusyuk, mandiri, dan berfaedah jangka panjang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#FBF9F5] border border-neutral-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg font-mono">
                01
              </div>
              <h3 className="font-bold text-base text-neutral-950">Murni Bebas Iklan</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Tidak ada iklan pop-up, banner berkedip, atau video interstitial yang memotong lantunan ayat suci saat Anda sedang tilawah.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FBF9F5] border border-neutral-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg font-mono">
                02
              </div>
              <h3 className="font-bold text-base text-neutral-950">100% Offline-First</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Seluruh 114 surah, teks Arab, transliterasi latin, terjemahan resmi, dan doa tersimpan di dalam memori perangkat. Tetap aktif tanpa kuota internet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FBF9F5] border border-neutral-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg font-mono">
                03
              </div>
              <h3 className="font-bold text-base text-neutral-950">Super-App 24 Fitur</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Bukan cuma Al-Qur&#39;an teks. Anda mendapatkan jadwal shalat, alarm adzan, kiblat, tasbih, Asmaul Husna, hadits shahih, dan kelas tajwid dalam satu genggaman.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FBF9F5] border border-neutral-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg font-mono">
                04
              </div>
              <h3 className="font-bold text-base text-neutral-950">Privasi 100% Terjaga</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Kami tidak melacak lokasi Anda ke server pihak ketiga dan tidak mengumpulkan data pribadi. Seluruh histori dan bookmark tersimpan aman di ponsel Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: 24 FITUR LENGKAP BACAQUR'AN ── */}
      <section className="py-16 md:py-20 border-b border-neutral-200/80 bg-[#FAF9F6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider block mb-2">
              Katalog Kemampuan Lengkap
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
              Ekosistem Ibadah Muslim Terlengkap &amp; Terpadu
            </h2>
            <p className="text-neutral-600 mt-3 text-sm sm:text-base leading-relaxed">
              Seluruh kebutuhan ibadah harian dirancang dalam antarmuka Material 3 modern bernuansa hangat yang ramah bagi mata segala usia.
            </p>
          </div>

          <div className="space-y-12">
            {/* Kategori 1: Al-Qur'an & Tilawah */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 rounded-full bg-emerald-600" />
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950">
                  1. Al-Qur&#39;an, Tajwid &amp; Audio Murottal
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuresCategoryA.map((f, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:border-emerald-600 transition-all">
                    <h4 className="font-bold text-sm text-neutral-900 mb-1.5">{f.title}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kategori 2: Waktu Shalat & Kiblat */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 rounded-full bg-amber-600" />
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950">
                  2. Manajemen Waktu Shalat, Adzan &amp; Arah Kiblat
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuresCategoryB.map((f, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:border-amber-600 transition-all">
                    <h4 className="font-bold text-sm text-neutral-900 mb-1.5">{f.title}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kategori 3: Dzikir, Doa & Tasbih */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 rounded-full bg-teal-600" />
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950">
                  3. Dzikir Tasbih, Doa Harian &amp; Asmaul Husna
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuresCategoryC.map((f, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:border-teal-600 transition-all">
                    <h4 className="font-bold text-sm text-neutral-900 mb-1.5">{f.title}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kategori 4: Pembelajaran Tajwid & Khazanah Islam */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 rounded-full bg-neutral-900" />
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950">
                  4. Pembelajaran Tajwid, Tahsin &amp; Khazanah Keislaman
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuresCategoryD.map((f, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:border-neutral-900 transition-all">
                    <h4 className="font-bold text-sm text-neutral-900 mb-1.5">{f.title}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: SCREENSHOTS SHOWCASE ── */}
      <section className="py-16 md:py-20 border-b border-neutral-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider block mb-2">
              Galeri Antarmuka Nyata
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              Desain Hangat, Bersih &amp; Menyejukkan Pandangan
            </h2>
            <p className="text-neutral-600 mt-2 text-sm">
              Tangkapan layar langsung dari aplikasi BacaQur&#39;an pada perangkat smartphone Android.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {screenshots.map((item, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden border border-neutral-200/80 shadow-sm bg-neutral-50 group hover:shadow-md transition-all">
                <img
                  src={item.url}
                  alt={item.label}
                  className="w-full h-auto object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="p-3 bg-white border-t border-neutral-100 text-center">
                  <span className="text-xs font-semibold text-neutral-800 line-clamp-1">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: PANDUAN PENGUJIAN PLAY STORE & UNDUH APK ── */}
      <section className="py-16 md:py-20 border-b border-neutral-200/80 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/80 shadow-sm space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider block mb-2">
                Akses Resmi &amp; Panduan Pengujian
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
                Cara Mendapatkan &amp; Menguji BacaQur&#39;an
              </h2>
              <p className="text-neutral-600 mt-2 text-sm">
                Aplikasi BacaQur&#39;an saat ini berstatus resmi di Google Play Console dan sedang melalui fase closed testing. Anda dapat menginstalnya melalui dua cara mudah:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* JALUR GOOGLE PLAY TESTING */}
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 flex flex-col justify-between space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold mb-3">
                    Jalur Utama (Rekomendasi)
                  </div>
                  <h3 className="font-bold text-lg text-neutral-950">Uji Coba Google Play</h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Instal langsung dari Google Play Store resmi. Anda akan menerima pembaruan otomatis setiap kali ada perbaikan atau penambahan surah/audio.
                  </p>
                  <ol className="mt-4 space-y-2 text-xs text-neutral-700 list-decimal list-inside font-medium">
                    <li>Klik tautan akses penguji di bawah.</li>
                    <li>Masuk dengan akun Google Anda dan pilih <strong>&quot;Become a tester&quot;</strong>.</li>
                    <li>Unduh aplikasi langsung dari Google Play Store.</li>
                  </ol>
                </div>

                <a
                  href={playStoreTestingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs text-white bg-emerald-700 hover:bg-emerald-800 shadow-md transition-all"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.326 1.973C1.256 2.294 1.22 2.634 1.22 3v18c0 .366.036.706.106 1.027L12 12 1.326 1.973zm.905-.642l11.17 10.736L23.723 3.38c-.443-.269-1-.43-1.607-.43H4.202c-.717 0-1.356.248-1.971.38zM23.66 4.797L13.334 15.05l5.914 5.686 4.02-3.878c.442-.374.732-.932.732-1.558V6.19c0-.515-.121-1-.34-1.394zM12 13.14L1.628 22.21A3.573 3.573 0 004.202 23h15.596c.46 0 .893-.112 1.28-.31L18.87 19.87 12 13.14z"/>
                  </svg>
                  <span>Buka Halaman Tester Play Store</span>
                </a>
              </div>

              {/* JALUR UNDUH APK MANDIRI */}
              <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-200 text-neutral-800 text-[11px] font-bold mb-3">
                    Jalur Langsung (Offline APK)
                  </div>
                  <h3 className="font-bold text-lg text-neutral-950">Unduh Berkas APK Resmi</h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Bagi Anda yang ingin langsung mencoba di perangkat smartphone tanpa perlu akun tester Google Play. Berkas resmi terenkripsi dan bebas virus.
                  </p>
                  <div className="mt-4 p-3 bg-white rounded-xl border border-neutral-200 text-xs font-mono text-neutral-600 space-y-1">
                    <div>Berkas: BacaQuran_v1.2.0.apk</div>
                    <div>Ukuran: ~10.1 MB</div>
                    <div>Kompatibilitas: Android 7.0 s/d Android 16</div>
                  </div>
                </div>

                <a
                  href={apkDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs text-neutral-900 bg-white hover:bg-neutral-100 border border-neutral-300 shadow-sm transition-all"
                >
                  <svg className="w-4 h-4 text-emerald-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Unduh APK Mandiri</span>
                </a>
              </div>
            </div>

            {/* WHATSAPP SUPPORT BANNER */}
            <div className="p-5 rounded-2xl bg-[#F4F1EA] border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-sm text-neutral-900">Punya Saran Fitur atau Ingin Konsultasi?</h4>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Tim pengembang FokusKonten siap mendengarkan aspirasi Anda untuk kemaslahatan umat.
                </p>
              </div>
              <a
                href={waConsultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-neutral-950 hover:bg-neutral-800 transition-colors"
              >
                <span>Hubungi Kami via WhatsApp</span>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER SIMPLE ── */}
      <footer className="py-8 bg-white border-t border-neutral-200 text-center text-xs text-neutral-500 font-mono">
        <div className="max-w-6xl mx-auto px-4">
          <p>© 2026 FokusKonten • BacaQur&#39;an Mobile Ecosystem • Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </footer>
    </div>
  )
}
