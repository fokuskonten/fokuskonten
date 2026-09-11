import Link from 'next/link'

export const metadata = {
  title: 'Tentang FokusKonten',
  description: 'FokusKonten adalah pengembang perangkat lunak dan publisher aplikasi Android Indonesia yang berbasis di Kabupaten Bekasi, Jawa Barat.',
  alternates: { canonical: 'https://fokuskonten.my.id/tentang' },
}

const milestones = [
  { year: '2020', title: 'Awal Pendirian', desc: 'Memulai perancangan dan riset pengembangan aplikasi Android berbasis utilitas dan kebutuhan harian masyarakat.' },
  { year: '2021', title: 'Publikasi Resmi Play Store', desc: 'Merilis aplikasi pertama secara resmi di Google Play Store dan membangun fondasi arsitektur aplikasi yang ringan dan stabil.' },
  { year: '2023', title: 'Ekspansi Solusi Bisnis & POS', desc: 'Mengembangkan lini aplikasi kasir dan manajemen usaha (Apotek Pro, Retail POS) berbasis offline-first untuk mendukung UMKM.' },
  { year: '2025', title: 'Standar Target SDK 36', desc: 'Mengadopsi standar sistem Android termutakhir (SDK 36 / Android 15 & 16) untuk seluruh katalog aplikasi demi performa dan privasi maksimal.' },
  { year: '2026', title: 'Ekosistem Berkelanjutan', desc: 'Terus menyempurnakan fitur aplikasi bisnis, utilitas, dan layanan pembuatan aplikasi kustom berstandar profesional.' },
]

export default function AboutPage() {
  return (
    <section className="pt-28 sm:pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container-page">
        
        {/* ── 0. BREADCRUMB ─────────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 mb-6 font-mono">
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">Tentang FokusKonten</span>
        </nav>

        {/* ── 1. PAGE TITLE & HEADER ────────────────────────────────────── */}
        <div className="mb-10">
          <span className="label-brand mb-3 inline-block">Profil FokusKonten</span>
          <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-4 text-balance">
            FokusKonten —{' '}
            <span className="text-gradient-brand">Pengembang Software &amp; Aplikasi</span>
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Pengembang dan publisher aplikasi Android &amp; software resmi Indonesia yang berpusat di Kabupaten Bekasi, Jawa Barat.
          </p>
        </div>

        {/* ── 2. BALANCED & GROUNDED SIGNATURE BANNER ─────────── */}
        <div className="relative mb-14 rounded-3xl overflow-hidden border border-neutral-800 shadow-xl bg-neutral-950 min-h-[330px] sm:min-h-[360px] flex items-center w-full">
          {/* Eagle Image on Right - Contained & Full Height (Never Clipped) */}
          <div className="absolute right-0 top-0 bottom-0 h-full w-full sm:w-2/3 lg:w-1/2 pointer-events-none flex justify-end overflow-hidden">
            <img
              src="/brand/fokuskonten-header.jpg"
              alt="FokusKonten Header Banner"
              className="h-full w-auto max-w-none object-contain object-right"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 sm:via-neutral-950/60 to-transparent pointer-events-none" />
          
          <div className="relative z-10 w-full p-6 sm:p-10 lg:p-12 xl:p-14">
            <div className="max-w-xl lg:max-w-2xl">
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white text-neutral-950 text-xs font-semibold mb-4 w-fit shadow-sm">
                FokusKonten • Indonesia
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-display font-bold text-white tracking-tight leading-snug mb-3 drop-shadow-sm">
                Aplikasi Bisnis Praktis &amp; Software Siap Pakai
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-neutral-300 font-normal leading-relaxed drop-shadow-sm max-w-lg mb-6">
                Mengembangkan aplikasi kasir Android dan software desktop yang berjalan lancar tanpa internet, bebas biaya langganan bulanan, dan data tersimpan aman di perangkat Anda.
              </p>
              {/* Plain clean white chips on black container */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-white text-neutral-950 font-display font-semibold text-xs tracking-tight shadow-sm">
                  100% Bisa Offline
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white text-neutral-950 font-display font-semibold text-xs tracking-tight shadow-sm">
                  Data Aman di HP Sendiri
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white text-neutral-950 font-display font-semibold text-xs tracking-tight shadow-sm">
                  Beli Putus Tanpa Langganan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. STORY & CORE PRINCIPLES (NATURAL EDITORIAL & ACCENT PANEL) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
          {/* Left: Studio Story Paragraphs (Fluid & Unboxed) */}
          <div className="lg:col-span-7 space-y-5 text-neutral-600 text-sm sm:text-base leading-relaxed py-1">
            <span className="label-brand mb-2 inline-block">Misi &amp; Komitmen</span>
            <h2 className="heading-xl text-2xl sm:text-3xl text-neutral-900">
              Solusi Digital Praktis untuk Pelaku Usaha &amp; Kreator
            </h2>
            <p>
              FokusKonten hadir untuk menjawab kebutuhan nyata para pemilik usaha dan kreator di Indonesia. Kami melihat banyak toko kelontong, apotek, dan pelaku UMKM yang kesulitan mengelola operasional harian karena aplikasi kasir lain mewajibkan internet terus-menerus atau membebankan langganan bulanan yang mahal.
            </p>
            <p>
              Melalui produk andalan seperti <strong>Apotek Pro</strong> (manajemen obat, resep &amp; deteksi kadaluarsa), <strong>Kelontong Pro</strong> (kasir praktis toko sembako &amp; retail), dan portal karir <strong>MCJob.id</strong>, kami memastikan setiap aplikasi mudah dipahami oleh siapapun dan siap langsung digunakan.
            </p>
            <p>
              Selain software, kami juga menyediakan ribuan aset digital terkurasi seperti template CorelDRAW (.CDR) untuk percetakan, presentasi PowerPoint (.PPTX), dan panduan digital berkualitas untuk mendukung percepatan bisnis Anda.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/aplikasi"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-xs text-white bg-black hover:bg-neutral-800 shadow-sm transition-all"
              >
                Lihat Katalog Aplikasi
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/toko-digital"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-xs text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-colors"
              >
                Katalog Toko Digital
              </Link>
            </div>
          </div>

          {/* Right: Core Principles Accent Panel */}
          <div className="lg:col-span-5 bg-neutral-50/90 rounded-2xl border border-neutral-200/70 p-6 sm:p-7 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-neutral-900" />
              <span className="text-xs font-display font-bold uppercase tracking-wider text-neutral-700">Prinsip Kerja Kami</span>
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-neutral-900 mb-2">
              Fokus &amp; Presisi Berkarya
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6">
              Simbol <strong>Mata Elang</strong> melambangkan ketelitian dalam pembuatan software, fokus pada kebutuhan nyata pemilik usaha, dan komitmen memberikan hasil karya berkualitas tinggi.
            </p>
            <div className="space-y-4 border-t border-neutral-200/60 pt-5">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 text-xs font-bold text-neutral-900 shadow-sm">
                  01
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-neutral-900 mb-0.5">Bisa Dipakai Tanpa Internet</h4>
                  <p className="text-neutral-500 text-xs leading-relaxed">Kasir, kontrol stok, dan cetak struk Bluetooth tetap berjalan normal tanpa kuota atau sinyal wifi.</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 text-xs font-bold text-neutral-900 shadow-sm">
                  02
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-neutral-900 mb-0.5">Data Usaha Aman Milik Anda</h4>
                  <p className="text-neutral-500 text-xs leading-relaxed">Semua catatan transaksi dan database pelanggan tersimpan di perangkat Anda sendiri, bukan di server publik.</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 text-xs font-bold text-neutral-900 shadow-sm">
                  03
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-neutral-900 mb-0.5">Ringan &amp; Tanpa Biaya Bulanan</h4>
                  <p className="text-neutral-500 text-xs leading-relaxed">Aplikasi gesit tidak membebani HP, hemat baterai, dan sistem beli putus tanpa tagihan langganan bulanan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. EXPANSIVE 5-COLUMN BALANCED TIMELINE ────────────────────── */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="label-brand mb-3 inline-block">Linimasa</span>
            <h2 className="heading-xl text-2xl sm:text-3xl text-neutral-900">Perjalanan &amp; Perkembangan</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {milestones.map((m, idx) => (
              <div
                key={m.year}
                className={`bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-sm hover:shadow-md hover:border-neutral-400 transition-all flex flex-col justify-between ${
                  idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-block px-2.5 py-1 rounded-lg font-display font-bold text-xs ${
                      idx === 4 ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-950'
                    }`}>
                      {m.year}
                    </span>
                    {idx === 4 && (
                      <span className="text-[11px] font-semibold text-neutral-500">
                        Aktif
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-neutral-900 text-sm sm:text-base mb-2 leading-snug">
                    {m.title}
                  </h3>
                  <p className="text-neutral-600 text-xs leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. VISION & MISSION (CLEAN DUAL CARDS) ─────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="rounded-2xl bg-white border border-neutral-200/80 p-7 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
              <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-neutral-900 text-lg mb-2.5">Visi Kami</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Menjadi pengembang software dan aplikasi terpercaya dari Indonesia yang menghadirkan solusi digital berkualitas tinggi, tangguh, dan mudah diakses untuk seluruh lapisan masyarakat dan pelaku usaha.
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-neutral-200/80 p-7 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
              <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-neutral-900 text-lg mb-2.5">Misi Kami</h3>
            <ul className="space-y-2.5 text-neutral-600 text-sm leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 shrink-0 mt-2" />
                Membangun aplikasi bisnis kasir offline-first yang andal dan terjangkau.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 shrink-0 mt-2" />
                Menjaga standar performa dan kompatibilitas SDK Android termutakhir.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 shrink-0 mt-2" />
                Memberikan layanan konsultasi dan pembuatan aplikasi yang transparan.
              </li>
            </ul>
          </div>
        </div>

        {/* ── 6. OFFICIAL FOKUSKONTEN INFO (FULL WIDTH 4-COLUMN) ─────────────── */}
        <div className="rounded-2xl bg-white border border-neutral-200/80 p-6 sm:p-8 shadow-sm">
          <div className="mb-6">
            <span className="label-brand mb-2 inline-block">Legalitas &amp; Kontak</span>
            <h3 className="font-display font-semibold text-neutral-900 text-xl">Informasi Resmi FokusKonten</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-sm">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
              <span className="text-neutral-400 text-xs block mb-1">Nama Brand / Usaha</span>
              <span className="font-semibold text-neutral-900 text-base">FokusKonten</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
              <span className="text-neutral-400 text-xs block mb-1">Lokasi Kantor</span>
              <span className="font-medium text-neutral-800">Kabupaten Bekasi, Jawa Barat, Indonesia</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
              <span className="text-neutral-400 text-xs block mb-1">Email Resmi</span>
              <a href="mailto:admin@fokuskonten.my.id" className="font-semibold text-neutral-900 underline hover:text-black">
                admin@fokuskonten.my.id
              </a>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
              <span className="text-neutral-400 text-xs block mb-1">WhatsApp Resmi</span>
              <a href="https://wa.me/6285183011318" target="_blank" rel="noopener noreferrer" className="font-semibold text-neutral-900 underline hover:text-black">
                +62 851-8301-1318
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
