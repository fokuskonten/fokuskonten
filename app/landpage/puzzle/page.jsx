import Link from 'next/link'
import AppScreenshotGallery from '@/components/AppScreenshotGallery'
import PuzzleVideoShowcase from '@/components/PuzzleVideoShowcase'

export const metadata = {
  title: '2048 Puzzle — Game Edukasi Asah Otak & Logika Angka Android',
  description: 'Game edukasi puzzle angka 2048 legendaris karya FokusKonten. Dilengkapi 7 mode tantangan unik, pilihan ukuran papan 3x3 hingga 5x5, tombol 3D responsif, dan fitur undo pintar. 100% offline tanpa kuota internet.',
  alternates: { canonical: 'https://fokuskonten.my.id/landpage/puzzle' },
  openGraph: {
    title: '2048 Puzzle — Game Angka & Asah Otak Offline Android',
    description: 'Tantang logika dan strategi berpikir Anda. 7 mode tantangan, variasi grid 3x3 sampai 5x5, hemat baterai, dan bebas iklan pop-up mengganggu.',
    images: [{ url: '/screenshots/gamepuzzle/header.png', width: 1024, height: 500, alt: '2048 Puzzle Banner Resmi' }],
  },
}

export default function GamePuzzleDedicatedLandingPage() {
  const googleGroupUrl = 'https://groups.google.com/g/penguji-fokuskonten'
  const playTestingWebUrl = 'https://play.google.com/apps/testing/com.fokuskonten.gamepuzzle'
  const playStoreDirectUrl = 'https://play.google.com/store/apps/details?id=com.fokuskonten.gamepuzzle'
  const devMailUrl = 'mailto:admin@fokuskonten.my.id?subject=Masukan%20dan%20Pertanyaan%20Game%202048%20Puzzle'

  // Masalah Umum Game Puzzle Kasual di Pasaran — Bahasa Lugas, Bebas Pleonasme
  const painPoints = [
    {
      title: 'Iklan Pop-up Muncul Tiba-Tiba Saat Berpikir',
      desc: 'Banyak game angka menyisipkan video iklan satu layar penuh saat Anda sedang fokus menyusun ubin angka, merusak konsentrasi dan alur strategi.',
    },
    {
      title: 'Wajib Kuota Internet untuk Game Sederhana',
      desc: 'Game kasual biasa menolak dibuka saat paket data habis atau di dalam moda transportasi tanpa sinyal. Kuota internet terbuang hanya untuk memuat iklan luar.',
    },
    {
      title: 'Aplikasi Berat & Menguras Daya Baterai',
      desc: 'Optimalisasi grafis yang buruk membuat perangkat cepat panas dan baterai cepat berkurang drastis, padahal hanya menjalankan papan angka datar.',
    },
    {
      title: 'Pola Permainan Monoton & Cepat Bosan',
      desc: 'Hanya menyediakan papan 4x4 tanpa variasi rintangan, tanpa sistem medali pencapaian, dan tanpa alternatif tantangan baru yang menguji kecerdasan.',
    },
  ]

  // Galeri 9 Tangkapan Layar HD Otentik — Real Smartphone Frame Mockup
  const galleryScreenshots = [
    {
      id: '01',
      title: 'Papan Angka Klasik 4x4 & Tombol Undo 3D',
      desc: 'Geser ubin angka ke empat arah dengan animasi lembut untuk menyatukan angka identik dari 2 hingga 2048, didukung tombol batalkan langkah seketika.',
      img: '/screenshots/gamepuzzle/01_Papan_Klasik_4x4.jpg',
    },
    {
      id: '02',
      title: 'Papan Luas 5x5 untuk Rekor Tertinggi',
      desc: 'Pilihan papan leluasa 25 kotak bagi pemain yang menyukai ruang manuver lapang untuk menembus ubin angka ekstrem 4096 hingga 8192.',
      img: '/screenshots/gamepuzzle/02_Papan_Lebar_5x5.jpg',
    },
    {
      id: '03',
      title: 'Menu Pilihan Grid & 7 Mode Permainan',
      desc: 'Navigasi cepat dan mudah untuk beralih antara ukuran grid 3x3, 4x4, 5x5, melihat riwayat permainan, atau mengaktifkan tantangan khusus.',
      img: '/screenshots/gamepuzzle/03_Menu_Mode_Ukuran.jpg',
    },
    {
      id: '04',
      title: 'Tantangan Blok Beku & Target 50 Langkah',
      desc: 'Hadapi rintangan ubin es yang terkunci dan uji efisiensi kalkulasi taktik Anda dalam batasan ketat kuota 50 langkah.',
      img: '/screenshots/gamepuzzle/04_Tantangan_Blok_Beku.jpg',
    },
    {
      id: '05',
      title: 'Ubin Virus (-1), Idle Penalty & Magnet',
      desc: 'Tantangan bahaya ubin perusak yang mengurangi nilai angka, pemotongan skor jika berdiam diri lebih dari 10 detik, dan medan magnet periodik.',
      img: '/screenshots/gamepuzzle/05_Tantangan_Tile_Virus.jpg',
    },
    {
      id: '06',
      title: 'Siap Gabung Manual & Chaos Event Acak',
      desc: 'Kombinasi kontrol presisi ketuk manual untuk menyatukan angka kembar serta kejutan acak rotasi papan setiap kelipatan 1000 skor.',
      img: '/screenshots/gamepuzzle/06_Tantangan_Manual_Merge_Chaos.jpg',
    },
    {
      id: '07',
      title: 'Mode Waktu Mundur & Sensasi Kecepatan',
      desc: 'Adu refleks logika dengan hitung mundur detik yang memacu adrenalin, dilengkapi getaran haptic dan umpan balik audio responsif.',
      img: '/screenshots/gamepuzzle/07_Mode_Adu_Waktu_Endless.jpg',
    },
    {
      id: '08',
      title: 'Pengaturan Tema Scenic HD & Suara 8-Bit',
      desc: 'Kustomisasi suasana bermain dengan latar belakang pemandangan Gurun, Hutan, Aurora, atau Polos yang hemat daya dan nyaman di mata.',
      img: '/screenshots/gamepuzzle/08_Pengaturan_Tema_Scenic.jpg',
    },
    {
      id: '09',
      title: 'Layar Kemenangan & Koreksi Otomatis',
      desc: 'Penyimpanan skor rekor terbaik secara otomatis di memori internal dengan opsi undo cerdas untuk melanjutkan strategi tanpa harus mengulang dari awal.',
      img: '/screenshots/gamepuzzle/09_Layar_Game_Over_Undo.jpg',
    },
  ]

  // 7 Mode Tantangan Unik Versi 1.3.0
  const challengeModes = [
    {
      num: '01',
      title: 'Blok Beku (Frozen Tile)',
      badge: 'Rintangan Posisi',
      desc: 'Muncul ubin es yang terkunci dan tidak bisa digeser atau digabungkan selama beberapa giliran langkah. Pemain ditantang mencari jalur alternatif agar papan tidak terkunci.',
      tactic: 'Strategi: Manfaatkan sudut papan yang bebas untuk memutar pergerakan angka utama.',
    },
    {
      num: '02',
      title: 'Target 50 Langkah',
      badge: 'Batas Manuver',
      desc: 'Batas kuota ketat 50 langkah untuk mencapai skor target tertentu. Menguji efisiensi berpikir dan menghilangkan gerakan geser acak tanpa kalkulasi.',
      tactic: 'Strategi: Pastikan setiap geseran menghasilkan penggabungan minimal satu pasang ubin.',
    },
    {
      num: '03',
      title: 'Tile Virus (-1)',
      badge: 'Ancaman Reduksi',
      desc: 'Ubin perusak bertanda minus satu yang dapat menelan atau mengurangi nilai ubin di sampingnya. Wajib segera diisolasi sebelum menyentuh ubin bernilai besar.',
      tactic: 'Strategi: Giring ubin virus ke tepi terluar dan hilangkan melalui kombinasi langkah khusus.',
    },
    {
      num: '04',
      title: 'Idle Penalty Waktu',
      badge: 'Uji Kecepatan',
      desc: 'Skor permainan akan terpotong secara bertahap jika pemain tidak mengambil keputusan geser dalam durasi 10 detik. Melatih ketangkasan dan refleks logika.',
      tactic: 'Strategi: Pertahankan pola sudut tetap agar keputusan langkah berikutnya terbaca dalam hitungan detik.',
    },
    {
      num: '05',
      title: 'Zona Magnet Gravitasi',
      badge: 'Dinamika Alur',
      desc: 'Medan magnet periodik yang menarik seluruh ubin angka ke kolom atau baris tertentu, membelokkan arah luncuran normal yang Anda rencanakan.',
      tactic: 'Strategi: Antisipasi letak tarikan magnet sebelum memutuskan geser ke arah yang berlawanan.',
    },
    {
      num: '06',
      title: 'Siap Gabung (Manual Merge)',
      badge: 'Kontrol Presisi',
      desc: 'Dua angka kembar yang bersinggungan tidak akan otomatis menyatu saat digeser, melainkan harus diketuk manual pada sel target untuk bergabung.',
      tactic: 'Strategi: Tahan penggabungan ubin sampai posisi grid berada pada susunan paling menguntungkan.',
    },
    {
      num: '07',
      title: 'Chaos Event Acak',
      badge: 'Kejadian Darurat',
      desc: 'Kejadian acak tak terduga yang dapat memutar grid 90 derajat atau menata ulang posisi ubin netral setiap kelipatan pencapaian skor tertentu.',
      tactic: 'Strategi: Bangun pondasi angka besar di pusat papan agar tetap stabil saat rotasi grid terjadi.',
    },
  ]

  // Pilihan Ukuran Papan Permainan
  const boardSizes = [
    {
      size: 'Grid 3x3',
      tag: 'Tantangan Kilat',
      headline: 'Permainan Cepat & Ruang Terbatas',
      desc: 'Format papan padat dengan 9 kotak. Sangat cocok untuk menguji fokus cepat selama 2 hingga 5 menit di sela istirahat kerja atau perjalanan singkat.',
      target: 'Target Utama: Bentuk Ubin 512 & 1024',
    },
    {
      size: 'Grid 4x4',
      tag: 'Standar Klasik',
      headline: 'Keseimbangan Taktik & Ruang Strategi',
      desc: 'Format standar internasional legendaris 16 kotak. Membutuhkan perencanaan matang dalam menempatkan angka terbesar di sudut tetap papan permainan.',
      target: 'Target Utama: Menembus Ubin 2048 & Skor 20.000+',
    },
    {
      size: 'Grid 5x5',
      tag: 'Mode Ekstrem',
      headline: 'Leluasa Menyusun Rekor Spektakuler',
      desc: 'Format papan luas dengan 25 kotak bagi para pecinta rekor raksasa. Ruang manuver yang lapang memungkinkan penggabungan ubin hingga angka 4096, 8192, dan seterusnya.',
      target: 'Target Utama: Menembus Ubin 4096, 8192 & Tak Terhingga',
    },
  ]

  // Komparasi Objektif — Game Konvensional vs 2048 Puzzle FokusKonten
  const comparisons = [
    {
      aspect: 'Konektivitas Internet',
      ordinary: 'Wajib koneksi internet aktif untuk memuat iklan pihak ketiga',
      fokusKonten: '100% Offline mandiri, aman dimainkan tanpa sambungan data',
    },
    {
      aspect: 'Kenyamanan Iklan',
      ordinary: 'Iklan video pop-up muncul tiba-tiba saat tengah memikirkan langkah',
      fokusKonten: 'Bebas iklan pop-up layar penuh yang mengganggu jalannya permainan',
    },
    {
      aspect: 'Variasi Papan Permainan',
      ordinary: 'Terkunci hanya pada satu ukuran papan 4x4 standar tanpa pilihan lain',
      fokusKonten: 'Pilihan fleksibel 3 ukuran papan: 3x3 (Cepat), 4x4 (Klasik), dan 5x5 (Ekstrem)',
    },
    {
      aspect: 'Kedalaman Gameplay',
      ordinary: 'Gameplay geser datar yang monoton dan mudah menimbulkan kebosanan',
      fokusKonten: 'Dilengkapi 7 mode tantangan unik (Blok Beku, Virus, Magnet, hingga Chaos Event)',
    },
    {
      aspect: 'Koreksi Kesalahan Langkah',
      ordinary: 'Tidak ada tombol pembatalan; salah satu geseran langsung merusak permainan',
      fokusKonten: 'Fitur Undo cerdas dengan tombol 3D untuk membatalkan langkah salah seketika',
    },
    {
      aspect: 'Konsumsi Baterai & Suhu HP',
      ordinary: 'Penggunaan resource berlebihan yang membuat handphone cepat hangat',
      fokusKonten: 'Arsitektur native Android yang sangat ringan, RAM < 50 MB, dan dingin di perangkat',
    },
  ]

  // Tanya Jawab Sering Diajukan (FAQ)
  const faqs = [
    {
      q: 'Apakah game 2048 Puzzle ini benar-benar bisa dimainkan tanpa internet?',
      a: 'Ya, 100% benar. 2048 Puzzle dirancang dengan prinsip Offline-First murni. Seluruh kalkulasi pergerakan ubin, rekor skor, lemari pencapaian piala, hingga mode tantangan dapat dimainkan lancar di mana saja tanpa kuota internet atau sinyal seluler.',
    },
    {
      q: 'Apakah aplikasi ini aman untuk anak-anak dan ramah keluarga?',
      a: 'Sangat aman. Game ini merupakan sarana edukasi logika dan perhitungan angka sederhana. Permainan bebas dari konten kekerasan, bebas pelacakan data pribadi yang invasif, dan terverifikasi secara resmi oleh Google Play Protect.',
    },
    {
      q: 'Bagaimana cara bergabung dalam pengujian resmi Google Play Store?',
      a: 'Anda cukup mengikuti 3 langkah mudah di halaman ini: (1) Masuk ke Google Group Penguji FokusKonten dengan akun Google Anda, (2) Klik tautan terima undangan pengujian Google Play, lalu (3) Pasang aplikasi langsung dari Google Play Store.',
    },
    {
      q: 'Apakah skor rekor tertinggi saya akan hilang jika aplikasi ditutup?',
      a: 'Tidak. Seluruh skor tertinggi dan capaian medali penghargaan tersimpan secara otomatis dan instan di penyimpanan internal handphone Anda. Anda dapat melanjutkan permainan kapan saja tepat di kondisi terakhir.',
    },
    {
      q: 'Spesifikasi handphone Android apa yang dibutuhkan untuk memainkan game ini?',
      a: '2048 Puzzle dikembangkan sangat ringan sehingga kompatibel dengan hampir seluruh perangkat Android dari Android 7.0 hingga versi terbaru Android 15 (Target SDK 37). Kebutuhan memori kerja RAM sangat hemat di bawah 50 MB.',
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
            <Link href="/aplikasi" className="hover:text-black transition-colors">Portofolio Aplikasi</Link>
            <span>/</span>
            <span className="text-neutral-900 font-semibold">2048 Puzzle</span>
          </div>
          <span className="hidden sm:inline-block text-neutral-500 text-xs font-mono">
            Versi Rilis 1.4.4 • Target Android 15 (API 37)
          </span>
        </div>
      </div>

      {/* ── HERO SALES SECTION ─────────────────────────────────────────── */}
      <section className="pt-12 sm:pt-16 pb-16 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* BADGE RESMI IDENTITAS GAME */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-800 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Game Edukasi Asah Otak • 100% Offline-First</span>
          </div>

          <h1 className="heading-xl text-3xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-tight sm:leading-none mb-6 text-balance max-w-5xl mx-auto">
            Latih Logika &amp; Asah Strategi Otak <br className="hidden sm:inline" />
            dengan Sensasi Puzzle Angka Legendaris
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            Game puzzle angka klasik 2048 berkinerja tinggi karya FokusKonten. Nikmati 7 mode tantangan unik, pilihan papan 3x3 hingga 5x5, tombol 3D responsif, dan fitur undo cerdas tanpa kuota internet di perangkat Android Anda.
          </p>

          {/* DUA TOMBOL AKSI UTAMA — GOOGLE PLAY SEBAGAI PRIMADONA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12 max-w-xl mx-auto">
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
              <span>Pasang via Google Play</span>
            </a>

            <a
              href={devMailUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-neutral-800 bg-neutral-100/90 border border-neutral-300 hover:border-black hover:bg-neutral-100 shadow-sm transition-all duration-200"
            >
              <svg className="w-5 h-5 text-neutral-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Hubungi Pengembang</span>
            </a>
          </div>

          {/* BANNER RESMI LANDSCAPE HEADER */}
          <div className="rounded-3xl overflow-hidden border border-neutral-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] max-w-6xl mx-auto mb-12 bg-white">
            <img
              src="/screenshots/gamepuzzle/header.png"
              alt="2048 Puzzle Banner Header Resmi"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 4 STATS PILAR KEUNGGULAN UTAMA */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
            <div className="p-3 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 text-white font-mono font-bold flex items-center justify-center text-sm mb-3 shadow-sm">
                01
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Tanpa Kuota</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">100% Offline-First</div>
            </div>

            <div className="p-3 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 text-white font-mono font-bold flex items-center justify-center text-sm mb-3 shadow-sm">
                02
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">7 Mode</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Tantangan Unik</div>
            </div>

            <div className="p-3 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 text-white font-mono font-bold flex items-center justify-center text-sm mb-3 shadow-sm">
                03
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">3 Ukuran</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Grid 3x3, 4x4, 5x5</div>
            </div>

            <div className="p-3 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 text-white font-mono font-bold flex items-center justify-center text-sm mb-3 shadow-sm">
                04
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">&lt; 50 MB</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Sangat Ringan &amp; Dingin</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── VIDEO SHOWCASE PRESENTASI GAMEPLAY ────────────────────────── */}
      <PuzzleVideoShowcase />

      {/* ── PAIN POINTS SECTION (TANTANGAN GAME KASUAL BIASA) ──────────── */}
      <section className="py-20 bg-neutral-50/60 border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">Tantangan Nyata Permainan Angka</span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3">
              Kekurangan Game Puzzle Angka Biasa di Pasaran
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Banyak game puzzle angka di toko aplikasi dipenuhi rintangan yang mengganggu kenyamanan bermain dan konsentrasi berpikir Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((item, idx) => (
              <div key={idx} className="p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-neutral-950 text-white font-mono text-xs flex items-center justify-center font-bold mb-4">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-neutral-950 mb-2.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REL GALERI SCREENSHOT EDGE-TO-EDGE ──────────────────────────── */}
      <AppScreenshotGallery
        title="Galeri Antarmuka 2048 Puzzle"
        subtitle="Geser ke kanan atau kiri untuk melihat langsung alur papan permainan, variasi ukuran grid, sistem pencapaian, hingga mode malam."
        label="TAMPILAN NYATA APLIKASI"
        items={galleryScreenshots}
      />

      {/* ── 7 MODE TANTANGAN UNIK (FITUR UNGGULAN VERSI 1.3.0) ─────────── */}
      <section className="py-20 sm:py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">Inovasi Permainan Versi 1.4.4</span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-4">
              7 Mode Tantangan yang Mengubah Cara Bermain Anda
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Bosan dengan geser angka biasa? Aktifkan mode tantangan interaktif untuk menguji kelincahan taktik, manajemen risiko, dan perhitungan langkah Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challengeModes.map((mode, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between hover:border-black transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-lg bg-neutral-950 text-white font-mono text-xs flex items-center justify-center font-bold">
                      {mode.num}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-mono font-medium">
                      {mode.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-neutral-950 mb-2.5">
                    {mode.title}
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {mode.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-100 text-xs font-mono text-neutral-500">
                  {mode.tactic}
                </div>
              </div>
            ))}

            {/* KARTU PENGATURAN TAMBAHAN — TOMBOL 3D & UNDO CERDAS */}
            <div className="p-6 sm:p-7 rounded-3xl bg-neutral-950 text-white flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-lg bg-white text-neutral-950 font-mono text-xs flex items-center justify-center font-bold">
                    +
                  </span>
                  <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-200 text-xs font-mono">
                    Kontrol Penuh
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2.5">
                  Tombol 3D &amp; Fitur Undo Cerdas
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Salah menggeser arah? Batalkan langkah terakhir secara instan menggunakan tombol Undo pintar tanpa merusak rekor susunan angka yang telah Anda bangun.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-800 text-xs font-mono text-neutral-400">
                Respon tombol taktil cepat dan transisi animasi mulus.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILIHAN UKURAN PAPAN PERMAINAN ──────────────────────────────── */}
      <section className="py-20 bg-neutral-50/60 border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">Variasi Tingkat Kesulitan</span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-4">
              Pilih Ukuran Papan Sesuai Target Waktu &amp; Strategi Anda
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Tentukan sendiri tempo permainan Anda melalui panel pemilih ukuran papan yang dapat diganti kapan saja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {boardSizes.map((board, idx) => (
              <div
                key={idx}
                className="p-7 sm:p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-neutral-950">
                      {board.size}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-mono">
                      {board.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-neutral-950 mb-2.5">
                    {board.headline}
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {board.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-100 font-mono text-xs text-neutral-500 font-medium">
                  {board.target}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KOMPARASI OBJEKTIF DUA SISI ─────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">Perbandingan Kualitas</span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-4">
              Game Angka Biasa vs 2048 Puzzle FokusKonten
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Kenyamanan bermain, stabilitas perangkat, dan kebebasan offline menjadi prioritas utama rancangan aplikasi kami.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] overflow-hidden divide-y divide-neutral-100 bg-white">
            {comparisons.map((row, idx) => (
              <div key={idx} className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
                <div className="md:col-span-4">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">Fitur &amp; Aspek</span>
                  <div className="font-display font-bold text-sm sm:text-base text-neutral-950">{row.aspect}</div>
                </div>
                <div className="md:col-span-4 bg-neutral-50 p-3 sm:p-3.5 rounded-xl border border-neutral-200/60">
                  <span className="text-[11px] font-mono text-neutral-500 block mb-1">Game Puzzle Biasa</span>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">{row.ordinary}</p>
                </div>
                <div className="md:col-span-4 bg-white p-3 sm:p-3.5 rounded-xl border border-neutral-900 shadow-sm">
                  <span className="text-[11px] font-mono text-neutral-900 font-bold block mb-1">2048 Puzzle FokusKonten</span>
                  <p className="text-neutral-950 text-xs sm:text-sm font-medium leading-relaxed">{row.fokusKonten}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-LANGKAH PASANG CEPAT VIA GOOGLE PLAY ──────────────────────── */}
      <section className="py-20 bg-neutral-50/60 border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">Alur Pemasangan Mudah</span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-4">
              3 Langkah Mudah Mulai Bermain di Handphone Anda
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Bergabunglah dengan program pengujian resmi FokusKonten untuk mendapatkan versi rilis terbaru langsung dari Google Play Store.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            <div className="p-7 sm:p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white font-mono font-bold flex items-center justify-center text-sm mb-5">
                  01
                </div>
                <h3 className="font-display text-lg font-bold text-neutral-950 mb-2">
                  Gabung Grup Penguji
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6">
                  Buka Google Group resmi FokusKonten menggunakan akun Google aktif di handphone Android Anda untuk otorisasi akses penguji.
                </p>
              </div>
              <a
                href={googleGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors"
              >
                <span>Buka Google Group</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            <div className="p-7 sm:p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white font-mono font-bold flex items-center justify-center text-sm mb-5">
                  02
                </div>
                <h3 className="font-display text-lg font-bold text-neutral-950 mb-2">
                  Terima Akses Pengujian
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6">
                  Buka tautan web pengujian Google Play Store resmi lalu klik tombol konfirmasi untuk menjadi penguji resmi aplikasi.
                </p>
              </div>
              <a
                href={playTestingWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors"
              >
                <span>Terima Undangan Play Store</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            <div className="p-7 sm:p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white font-mono font-bold flex items-center justify-center text-sm mb-5">
                  03
                </div>
                <h3 className="font-display text-lg font-bold text-neutral-950 mb-2">
                  Pasang &amp; Mainkan
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6">
                  Unduh langsung melalui Google Play Store. Aplikasi otomatis terpasang dengan perlindungan penuh Google Play Protect.
                </p>
              </div>
              <a
                href={playStoreDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs font-bold text-white bg-neutral-950 hover:bg-black transition-colors"
              >
                <span>Unduh di Google Play</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION (TANYA JAWAB UMUM) ───────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">Bantuan &amp; Informasi</span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Segala hal yang perlu Anda ketahui mengenai keamanan, performa offline, dan fitur game 2048 Puzzle.
            </p>
          </div>

          <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-6 sm:py-7">
                <h3 className="font-display text-base sm:text-lg font-bold text-neutral-950 mb-3">
                  {faq.q}
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CALL-TO-ACTION BANNER ─────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-neutral-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono mb-6">
            Tantang Kemampuan Logika Anda Hari Ini
          </span>

          <h2 className="heading-xl text-3xl sm:text-5xl text-white mb-6 tracking-tight">
            Siap Menembus Angka 2048 &amp; Memecahkan Rekor Baru?
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Pasang 2048 Puzzle sekarang melalui program pengujian resmi Google Play Store. Nikmati permainan asah otak yang murni, menantang, dan 100% offline.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <a
              href={playTestingWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-sm sm:text-base text-neutral-950 bg-white hover:bg-neutral-100 shadow-xl transition-all duration-200"
            >
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 01-.61-1.636V3.45c0-.624.226-1.198.609-1.636z" fill="#00C3FF"/>
                <path d="M14.851 13.059l2.42 2.42-11.89 6.845 9.47-9.265z" fill="#FF3A44"/>
                <path d="M17.271 10.941l3.197 1.84c.895.516.895 1.364 0 1.88l-3.197 1.84-2.42-2.42 2.42-3.14z" fill="#FFCE00"/>
                <path d="M14.851 10.000L5.38 3.48l11.89 6.845-2.42 2.419z" fill="#00E676"/>
              </svg>
              <span>Pasang via Google Play</span>
            </a>

            <a
              href={devMailUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-white bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-all duration-200"
            >
              <span>Kirim Masukan</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
