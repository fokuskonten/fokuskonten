import Link from 'next/link'

export const metadata = {
  title: 'Muhari — Founder, Lead Engineer & 3D Woodcraft Artisan | FokusKonten',
  description: 'Profil dan portofolio rekayasa teknologi Muhari, Founder & Lead Engineer FokusKonten. Praktisi software engineering aplikasi Android native, desktop tools, web modern, 3D modeling, dan woodworking power tools.',
  alternates: { canonical: 'https://fokuskonten.my.id/muhari' },
}

const activeProducts = [
  {
    name: 'Apotek Pro',
    category: 'Mobile Application',
    platform: 'Android Native (Kotlin)',
    desc: 'Sistem manajemen apotek & kasir POS terlengkap berstandar CDOB dengan algoritma FEFO otomatis, kalkulator racikan presisi, shift kasir, dan kamera TimeStamp bukti fisik penyerahan obat keras.',
    link: '/aplikasi/apotekpro',
    badge: 'Flagship POS',
    icon: '💊',
  },
  {
    name: 'Kelontong Pro',
    category: 'Mobile Application',
    platform: 'Android Native (Kotlin)',
    desc: 'Aplikasi kasir pintar toko kelontong & warung sembako dengan pemindai barcode kamera secepat minimarket, buku kasbon digital kirim tagihan WhatsApp, dan konversi satuan grosir ke eceran.',
    link: '/aplikasi/tokokelontongpro',
    badge: 'Retail POS',
    icon: '🏪',
  },
  {
    name: 'WhatsApp Lead CRM Pro',
    category: 'Desktop Software',
    platform: 'Windows Desktop (.EXE)',
    desc: 'Software otomasi manajemen prospek WhatsApp: scraper nomor bisnis dari Google Maps, broadcast massal terjadwal dengan jeda aman anti-blokir, serta papan funnel penjualan Kanban.',
    link: '/landpage/whatsappcrm',
    badge: 'Marketing Tool',
    icon: '💬',
  },
  {
    name: 'FokusKonten HP Tools',
    category: 'Desktop Utility',
    platform: 'Windows Desktop (.EXE)',
    desc: 'Software suite diagnostik dan flashing ponsel multi-chipset (Qualcomm EDL 9008, MediaTek Brom, Samsung Odin, SPD) untuk kebutuhan teknisi ponsel dan reparasi firmware.',
    link: '/aplikasi/hptools',
    badge: 'Technician Suite',
    icon: '🛠️',
  },
  {
    name: 'Woodworking & 3D Modeling Studio',
    category: 'Physical & Digital Craft',
    platform: 'Power Tools • Solid Wood • Blender 3D',
    desc: 'Perancangan 3D CAD modeling furnitur & dekorasi interior menggunakan Blender 3D, serta eksekusi manufaktur kayu solid presisi dengan Power Tools (Table Saw, Miter Saw, Router, Trimmer, Jointer, Bor). Spesialis organizer meja kerja, mebel custom, dan produk fungsional estetik.',
    link: '/tentang',
    badge: 'PowerTools & 3D',
    icon: '🪵',
  },
  {
    name: 'BacaQur\'an Pro',
    category: 'Mobile Application',
    platform: 'Android Native',
    desc: 'Aplikasi Al-Qur\'an digital interaktif dengan mushaf standar Kemenag RI, tanda tajwid berwarna, audio murottal merdu, jadwal sholat akurat, serta 100% bebas iklan dan hemat baterai.',
    link: '/aplikasi/bacaquran',
    badge: 'Spiritual App',
    icon: '📖',
  },
  {
    name: 'Ekosistem Toko Digital FokusKonten',
    category: 'Web Platform & Digital Assets',
    platform: 'Next.js 14 • SSG • PWA',
    desc: 'Platform toko digital mandiri dengan katalog lebih dari 2.800 aset desain percetakan CorelDRAW (CDR), WMF/SVG Canva elements, preset fotografi Lightroom & Premiere Pro, dan footage sinematik.',
    link: '/toko-digital',
    badge: '2.800+ Assets',
    icon: '🎨',
  },
]

const officialChannels = [
  { name: 'WhatsApp Bisnis Resmi', link: 'https://wa.me/6285183011318', handle: '+62 851-8301-1318', icon: '💬' },
  { name: 'Email Resmi', link: 'mailto:admin@fokuskonten.my.id', handle: 'admin@fokuskonten.my.id', icon: '✉️' },
  { name: 'YouTube Official', link: 'https://www.youtube.com/@fokuskonten', handle: '@fokuskonten', icon: '🎥' },
  { name: 'GitHub Repository', link: 'https://github.com/fokuskonten', handle: 'github.com/fokuskonten', icon: '💻' },
  { name: 'TikTok Official', link: 'https://tiktok.com/@fokuskonten.my.id', handle: '@fokuskonten.my.id', icon: '📱' },
  { name: 'Instagram Resmi', link: 'https://instagram.com/fokuskonten', handle: '@fokuskonten', icon: '📸' },
]

const skillCategories = [
  {
    title: 'Mobile Software Engineering',
    icon: '📱',
    desc: 'Pengembangan aplikasi mobile native tangguh berskala produksi dengan arsitektur data lokal mandiri.',
    skills: [
      'Android Studio Native (Kotlin & Java)',
      'Room DB SQLite & Enkripsi Data Lokal',
      'Target SDK 36 (Android 15 & 16 Ready)',
      'WorkManager Background Automation',
      'CameraX Barcode Scanning & TimeStamp',
      'Thermal Bluetooth Printer (ESC/POS)',
      'Google Play Console Release & Keystore',
    ],
  },
  {
    title: 'Woodworking, Power Tools & 3D Modeling',
    icon: '🪵',
    desc: 'Pengerjaan kayu solid fisik bertenaga mesin (power tools), teknik sambungan presisi (joinery), dan pemodelan digital 3D.',
    skills: [
      'Penguasaan Power Tools (Table Saw, Miter Saw, Router, Gerinda, Bor)',
      '3D Modeling Furnitur & Interior (Blender 3D)',
      'Pembuatan Organizer Meja Kerja & Home Decor Solid',
      'Teknik Sambungan Presisi (Mortise, Tenon, Pocket Hole, Dowel)',
      'Finishing Kayu Komersial (Sanding, Wood Stain, Clear Polyurethane)',
      'Kalibrasi Akurasi Sudut & Pemeliharaan Mesin Workshop',
    ],
  },
  {
    title: 'Desktop & System Engineering',
    icon: '🖥️',
    desc: 'Perancangan software desktop mandiri untuk utilitas bisnis, otomatisasi, dan antarmuka hardware.',
    skills: [
      'C# .NET Windows Desktop Application',
      'COM Port Auto-Detection & USB Handshake',
      'Scraper Data & Headless Automation',
      'Sistem Lisensi Offline & Hardware ID Binding',
      'Local SQLite & File-Based Storage Architecture',
      'Aplikasi Standalone Portabel (.EXE)',
    ],
  },
  {
    title: 'Web Platform & Modern Stack',
    icon: '🌐',
    desc: 'Pengembangan platform web modern berkecepatan tinggi, SEO-friendly, dan siap transaksi digital.',
    skills: [
      'Next.js 14 (App Router & Static Export SSG)',
      'React & Tailwind CSS Responsive Architecture',
      'Node.js REST API & Microservices',
      'Integrasi Payment Gateway (Midtrans Snap/Core)',
      'Google Drive Cloud API Sync Engine',
      'PWA (Progressive Web Apps) Offline Support',
    ],
  },
  {
    title: 'Desain Vektor & Percetakan Komersial',
    icon: '🎨',
    desc: 'Rekayasa grafis presisi tinggi untuk industri manufaktur cetak dan katalog aset digital siap produksi.',
    skills: [
      'CorelDRAW Advanced Vector Engineering',
      'Pola Packaging Dus & Die-Cut Cutting Lines',
      'Separasi Warna Sablon Manual & Cetak Offset',
      'Katalog Master 2.800+ Template Komersial',
      'Manajemen Format Multi-Software (WMF, SVG, CDR)',
    ],
  },
  {
    title: 'Sinematografi & Visual Production',
    icon: '🎬',
    desc: 'Produksi konten multimedia sinematik dari penyusunan konsep, storyboard visual, hingga pasca produksi.',
    skills: [
      'Adobe Premiere Pro & CapCut Video Editing',
      'Color Grading & Retouching Lightroom Presets',
      'Sinematografi Kamera Mirrorless & Drone',
      'Penyusunan Storyboard AI & Video Advertising',
      'Audio Post-Production & Voice-Over Pacing',
    ],
  },
]

const engineeringMilestones = [
  {
    period: '2021 — Sekarang',
    title: 'Founder, Lead Engineer & 3D Woodcraft Artisan — FokusKonten',
    desc: 'Merancang dan membangun seluruh ekosistem produk FokusKonten: lini aplikasi kasir mobile native (Apotek Pro, Kelontong Pro), software desktop otomasi bisnis (WhatsApp Lead CRM Pro), platform web 2.800+ aset kreatif, serta workshop perakitan kayu solid berbasis Power Tools dan 3D modeling Blender.',
  },
  {
    period: '2018 — 2021',
    title: 'Graphic Designer & Commercial Print Specialist',
    desc: 'Memimpin perancangan desain grafis komersial presisi, master template percetakan, tata letak kemasan produk (*packaging*), separasi warna sablon, dan kontrol kualitas cetak industri promosi berskala besar.',
  },
  {
    period: '2015 — 2018',
    title: 'Industrial Automation & Manufacturing Precision',
    desc: 'Berpengalaman dalam pengoperasian mesin manufaktur robotik, alur logistik internasional, serta disiplin kontrol kualitas ketat yang membentuk etos kerja presisi dan keandalan rekayasa mekanik fisik hingga saat ini.',
  },
]

export default function MuhariProfilePage() {
  return (
    <section className="pt-32 pb-24 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 text-neutral-900">
      <div className="container-page max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8 flex items-center gap-2 text-xs font-mono text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/tentang" className="hover:text-neutral-900 transition-colors">Tentang FokusKonten</Link>
          <span>/</span>
          <span className="text-neutral-950 font-semibold">Founder &amp; Lead Engineer</span>
        </div>

        {/* Profile Hero Section */}
        <div className="rounded-3xl bg-neutral-950 text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-neutral-800 mb-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-white/25 shadow-xl bg-neutral-900">
                <img
                  src="/brand/muhari-profile.jpg"
                  alt="Muhari — Founder FokusKonten"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 text-white border-2 border-neutral-950 flex items-center justify-center text-[11px] font-bold" title="Verified Founder & Engineer">
                ✓
              </span>
            </div>

            {/* Main Bio Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-neutral-950 text-xs font-mono font-semibold mb-3 shadow-sm">
                Founder &amp; Lead Software Engineer
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white mb-2">
                Muhari
              </h1>
              <p className="text-sm sm:text-base font-medium text-emerald-400 mb-4">
                Mobile App Engineer • 3D Modeler • Woodcraft PowerTools Artisan
              </p>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl mb-6">
                Praktisi rekayasa multidisiplin di balik ekosistem <strong>FokusKonten</strong>. Menyatukan ketelitian logika komputasi aplikasi mobile Android native <em>offline-first</em>, software desktop, perancangan visual digital, hingga presisi fisik permesinan kayu (*woodworking power tools*) dan pemodelan 3D Blender.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="https://wa.me/6285183011318?text=Halo%20Muhari%20(FokusKonten),%20saya%20tertarik%20untuk%20diskusi%20proyek%20software%20atau%20custom%20craft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-display font-semibold text-xs sm:text-sm shadow-md hover:bg-neutral-100 transition-all"
                >
                  Kontak WhatsApp Resmi
                </a>
                <Link
                  href="/aplikasi"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-display font-semibold text-xs sm:text-sm shadow-md hover:bg-neutral-100 transition-all"
                >
                  Portofolio Aplikasi
                </Link>
                <a
                  href="mailto:admin@fokuskonten.my.id"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-display font-semibold text-xs sm:text-sm shadow-md hover:bg-neutral-100 transition-all"
                >
                  Email Resmi
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION: PORTOFOLIO PRODUK & SOFTWARE AKTIF ─────────────────── */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 block mb-1">
                Active Projects &amp; Ecosystem
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-950">
                Portofolio Karya Nyata: Software &amp; Woodcraft
              </h2>
            </div>
            <p className="text-xs text-neutral-500 max-w-sm">
              Seluruh karya dirancang dan dibangun secara mandiri dengan standar ketelitian tinggi, fungsionalitas nyata, dan keindahan estetika.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeProducts.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl bg-white border border-neutral-200/80 p-6 shadow-sm hover:shadow-card hover:border-neutral-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{p.icon}</span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-semibold border border-neutral-200/80">
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-neutral-950 text-base mb-1">
                    {p.name}
                  </h3>
                  <div className="text-[11px] font-mono text-emerald-700 font-medium mb-2.5">
                    {p.platform}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                    {p.desc}
                  </p>
                </div>
                <Link
                  href={p.link}
                  className="inline-flex items-center text-xs font-bold text-neutral-950 hover:text-emerald-700 underline underline-offset-4 mt-auto pt-2"
                >
                  Lihat Detail Produk →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION: 6 PILAR KEAHLIAN TEKNIS ───────────────────────────── */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 block mb-2">
              Multidisciplinary Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-950 mb-3">
              6 Pilar Keahlian: Software, 3D &amp; PowerTools
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
              Integrasi nyata antara kecakapan logika komputasi, seni pemodelan 3D, serta presisi ketukangan mesin kayu bertenaga (*power tools*).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat) => (
              <div key={cat.title} className="rounded-2xl bg-white border border-neutral-200/80 p-6 shadow-sm flex flex-col justify-between hover:shadow-card transition-shadow">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-xl mb-4">
                    {cat.icon}
                  </div>
                  <h3 className="font-display font-bold text-neutral-900 text-base mb-1.5">{cat.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-4">{cat.desc}</p>
                  <hr className="border-neutral-100 mb-4" />
                  <ul className="space-y-2">
                    {cat.skills.map((sk) => (
                      <li key={sk} className="flex items-start gap-2 text-xs text-neutral-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                        <span>{sk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION: TRACK RECORD REKAYASA TEKNOLOGI ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 rounded-3xl bg-white border border-neutral-200/80 p-6 sm:p-8 shadow-card">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 block mb-1">
              Engineering Journey
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 mb-6">
              Rekam Jejak Rekayasa Sistem &amp; Manufaktur
            </h2>
            <div className="space-y-6">
              {engineeringMilestones.map((item, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-neutral-200 pb-2 last:pb-0">
                  <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-neutral-950 border-2 border-white shadow-sm" />
                  <span className="text-[11px] font-mono font-semibold text-neutral-900 bg-neutral-100 px-2.5 py-0.5 rounded-md inline-block mb-1">
                    {item.period}
                  </span>
                  <h3 className="font-display font-bold text-neutral-900 text-base mb-1">{item.title}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Direct Official Channels */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-neutral-200">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block mb-2 font-semibold">
                Official Channels
              </span>
              <h3 className="font-display font-bold text-lg text-neutral-900 mb-2">
                Saluran Komunikasi Resmi
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                Terhubung langsung dengan tim FokusKonten untuk konsultasi aplikasi, custom software, atau kreasi desain &amp; kerajinan.
              </p>
              
              <div className="space-y-3">
                {officialChannels.map((c) => (
                  <a
                    key={c.name}
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 hover:bg-neutral-100 hover:border-neutral-300 transition-all text-left group"
                  >
                    <div className="min-w-0">
                      <div className="text-[10px] text-neutral-500 block truncate">{c.name}</div>
                      <div className="text-xs font-semibold text-neutral-900 truncate">
                        {c.handle}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-neutral-400 group-hover:text-neutral-900 transition-colors">&rarr;</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
