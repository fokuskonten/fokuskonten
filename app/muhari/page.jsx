import Link from 'next/link'

export const metadata = {
  title: 'Muhari — Founder & Lead Engineer FokusKonten | Portofolio Resmi',
  description: 'Profil dan portofolio resmi Muhari, Founder FokusKonten. Praktisi multidisiplin dalam software engineering, mobile app development, desain grafis percetakan, multimedia, dan woodworking.',
  alternates: { canonical: 'https://fokuskonten.my.id/muhari' },
}

const businessVentures = [
  {
    name: 'FokusKonten',
    role: 'Founder & Software Engineer',
    desc: 'Studio pengembang software dan publisher aplikasi Android berbasis offline-first (Apotek Pro, Kelontong Pro, CRM).',
    link: '/',
    badge: 'Software House',
    icon: '⚡',
  },
  {
    name: 'Kalila Mebel Store',
    role: 'Owner & Woodcraft Artisan',
    desc: 'Produksi kerajinan kayu solid presisi, spesialis perlengkapan meja kerja, asbak kayu, rak organizer, dan furnitur estetik.',
    link: 'https://shopee.co.id/kalilamebelstore',
    badge: 'Craft & Woodworking',
    icon: '🪵',
    external: true,
  },
  {
    name: 'KuyCuan Agency',
    role: 'Founder & Creative Lead',
    desc: 'Layanan agensi kreatif digital, optimasi toko online, pengelolaan aset grafis, dan strategi media pemasaran.',
    link: 'https://www.kuycuan.sbs/',
    badge: 'Creative Agency',
    icon: '🚀',
    external: true,
  },
]

const socialLinks = [
  { name: 'WhatsApp Personal', link: 'https://wa.me/6289529131131', handle: '0895-2913-1131', icon: '💬' },
  { name: 'Email Personal', link: 'mailto:muhariamsori@gmail.com', handle: 'muhariamsori@gmail.com', icon: '✉️' },
  { name: 'YouTube Portofolio', link: 'https://www.youtube.com/@RemajaBroadcaster', handle: '@RemajaBroadcaster', icon: '▶️' },
  { name: 'YouTube Studio & DIY', link: 'https://www.youtube.com/@fokuskonten', handle: '@fokuskonten', icon: '🎥' },
  { name: 'TikTok Portofolio', link: 'https://tiktok.com/@fokuskonten', handle: '@fokuskonten', icon: '📱' },
  { name: 'TikTok DIY & Craft', link: 'https://tiktok.com/@freelancegabut', handle: '@freelancegabut', icon: '🛠️' },
  { name: 'Instagram', link: 'https://instagram.com/fokuskonten', handle: '@fokuskonten', icon: '📸' },
  { name: 'Facebook', link: 'https://facebook.com/muhariamsori', handle: 'Muhari Bin Amsori', icon: '👥' },
]

const skillCategories = [
  {
    title: 'Mobile & Software Engineering',
    icon: '📱',
    desc: 'Pengembangan aplikasi skala enterprise, POS kasir, dan arsitektur database offline-first.',
    skills: [
      'Android Studio Native (Kotlin & Java)',
      'Room DB SQLite & Data Isolation',
      'Target SDK 36 (Android 15/16 Ready)',
      'Next.js 14 & React Web Ecosystem',
      'Node.js REST API Architecture',
      'C# .NET Desktop Application',
      'Google Play Console Publishing',
      'Firebase & Push Synchronization',
    ],
  },
  {
    title: 'Desain Grafis & Percetakan Presisi',
    icon: '🎨',
    desc: 'Penguasaan teknik cetak komersial, desain vektor, dan pemodelan packaging.',
    skills: [
      'CorelDRAW Advanced Vector Design',
      'Pola Dus & Packaging Pattern Modeling',
      'Template Desain (Undangan, Sertifikat, Banner, ID Card)',
      'Separasi Warna Sablon Manual & Digital',
      'Manajemen Kertas & Karakteristik Media Cetak',
      'Maintenance & Penanganan Mesin Printer Cetak',
    ],
  },
  {
    title: 'Fotografi & Sinematografi Digital',
    icon: '🎬',
    desc: 'Produksi konten visual terarah mulai dari pra-produksi, shooting, hingga color grading.',
    skills: [
      'Video Cinematic Wedding & Acara Resmi',
      'Produksi Film Dokumenter',
      'Adobe Premiere Pro & CapCut Video Editing',
      'Color Grading & Retouching Lightroom PC',
      'Fotografi DSLR & Mirrorless',
      'Album Foto Pernikahan & Wisuda Komersial',
    ],
  },
  {
    title: 'Woodworking & 3D Modeling',
    icon: '🪵',
    desc: 'Pengerjaan produk kayu solid fisik dengan mesin bertenaga dan pemodelan digital.',
    skills: [
      'Penguasaan Power Tools (Table Saw, Miter Saw, Gerinda, Bor)',
      'Pembuatan Organizer Meja & Home Decor Kayu',
      'Perakitan Mebel, Meja, Rak & Bangku Solid',
      'Finishing Kayu (Sanding, Sealer, Clear Coat)',
      '3D Modeling Furnitur & Interior (Blender 3D)',
    ],
  },
  {
    title: 'Hardware IT & Broadcast Studio Setup',
    icon: '🖥️',
    desc: 'Infrastruktur komputer, siaran langsung, dan pemeliharaan perangkat keras.',
    skills: [
      'Perakitan & Troubleshooting PC / Laptop',
      'Instalasi Sistem Operasi & Optimasi Hardware',
      'Setup & Konfigurasi Studio Live Streaming',
      'Administrasi Google Workspace & Cloud Storage',
      'Pengelolaan cPanel & Domain Web',
      'Service & Troubleshooting Elektronik Konvensional',
    ],
  },
]

const careerTimeline = [
  {
    period: '2021 — Sekarang',
    title: 'Founder FokusKonten & Pengrajin Kalila Mebel',
    role: 'Lead Software Developer & Furniture Maker',
    desc: 'Membangun ekosistem aplikasi kasir dan utilitas (Apotek Pro, Kelontong Pro), mengelola penerbitan Play Store, serta memproduksi lini produk kayu solid organizer meja.',
  },
  {
    period: '2018 — 2021',
    title: 'Desain Grafis & Produksi Percetakan',
    role: 'Graphic Designer & Print Specialist',
    desc: 'Bertanggung jawab atas perancangan desain komersial, pembuatan template percetakan, separasi sablon, dan eksekusi cetak media promosi.',
  },
  {
    period: '2018',
    title: 'PT Agility International',
    role: 'Outbound Logistics Staff',
    desc: 'Menjalankan prosedur logistik, alur pengiriman barang, dan administrasi pergudangan dengan standar operasional internasional.',
  },
  {
    period: '2017 — 2018',
    title: 'PT Metindo Era Sakti',
    role: 'Operator Welding Robot',
    desc: 'Mengoperasikan mesin robot pengelasan manufaktur otomotif dengan presisi tinggi dan kontrol kualitas ketat.',
  },
  {
    period: '2015 — 2016',
    title: 'PT Prakarsa Alam Segar',
    role: 'Packing Oil Production Staff',
    desc: 'Mengawal proses pengemasan dan standar higienitas produksi pangan manufaktur berskala besar.',
  },
]

const educationList = [
  { year: '2012 — 2015', school: 'MA Attaqwa Pusat Putra 01', status: 'Lulus' },
  { year: '2009 — 2012', school: 'MTS Attaqwa Pusat Putra 01', status: 'Lulus' },
  { year: '2002 — 2009', school: 'MI Attaqwa 03 Ujung Harapan', status: 'Lulus' },
]

const documentList = [
  { name: 'Curriculum Vitae (CV Lengkap)', status: 'Tersedia (PDF)', icon: '📄', isPrimary: true, link: '/docs/CV-Muhari.pdf' },
  { name: 'Scan KTP', status: 'Terverifikasi', icon: '🪪' },
  { name: 'Scan SIM C', status: 'Terverifikasi', icon: '🪪' },
  { name: 'Scan NPWP', status: 'Terdaftar Resmi', icon: '📋' },
  { name: 'Scan SKCK', status: 'Tersedia', icon: '🛡️' },
  { name: 'Scan Ijazah Terakhir', status: 'Terverifikasi MA 01', icon: '🎓' },
  { name: 'Scan SKHUN', status: 'Tersedia', icon: '📜' },
  { name: 'Scan Kartu Keluarga', status: 'Tersedia', icon: '👥' },
  { name: 'Buku Rekening Aktif', status: 'Terverifikasi', icon: '🏦' },
  { name: 'Paklaring & Pengalaman Kerja', status: 'Lengkap', icon: '💼' },
]

export default function MuhariProfilePage() {
  return (
    <section className="pt-32 pb-24 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 text-neutral-900">
      <div className="container-page max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8 flex items-center gap-2 text-xs font-mono text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/tentang" className="hover:text-neutral-900 transition-colors">Tentang Studio</Link>
          <span>/</span>
          <span className="text-neutral-950 font-semibold">Profil Owner</span>
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
              <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-white text-neutral-950 border-2 border-neutral-950 flex items-center justify-center text-[10px] font-bold" title="Verified Creator & Engineer">
                ✓
              </span>
            </div>

            {/* Main Bio Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-white/90 mb-3">
                <span className="w-2 h-2 rounded-full bg-white" />
                Founder &amp; Owner FokusKonten
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white mb-2">
                Muhari
              </h1>
              <p className="text-sm sm:text-base font-medium text-neutral-300 mb-4">
                Software &amp; Mobile App Engineer • Digital Creative Specialist • Woodcraft Artisan
              </p>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl mb-6">
                Praktisi multidisiplin dengan etos kerja disiplin, tangguh, dan pembelajar otodidak. Berpengalaman merancang arsitektur aplikasi mobile native offline-first, sistem kasir POS, desain grafis &amp; packaging presisi, sinematografi visual, hingga kerajinan kayu solid dan perakitan IT.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="/docs/CV-Muhari.pdf"
                  download="CV-Muhari.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-display font-semibold text-xs sm:text-sm shadow-md hover:bg-neutral-100 transition-all transform hover:-translate-y-0.5"
                >
                  <span>📄</span> Unduh CV Resmi (PDF)
                </a>
                <a
                  href="https://wa.me/6289529131131"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-display font-semibold text-xs sm:text-sm shadow-md hover:bg-neutral-800 transition-all transform hover:-translate-y-0.5"
                >
                  <span>💬</span> WhatsApp Pribadi
                </a>
                <a
                  href="mailto:muhariamsori@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 font-display font-medium text-xs sm:text-sm hover:bg-neutral-800 transition-colors"
                >
                  <span>✉️</span> Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Data Identitas & Kontak */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="md:col-span-1 rounded-2xl bg-white border border-neutral-200/80 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-1 block">Identitas Personal</span>
              <h2 className="text-lg font-display font-bold text-neutral-900 mb-4">Informasi Pribadi</h2>
              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="text-neutral-400 block text-[11px]">Nama Lengkap</span>
                  <span className="font-semibold text-neutral-900">Muhari</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Tempat, Tanggal Lahir</span>
                  <span className="font-medium text-neutral-800">Bekasi, 05 September 1997</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Domisili</span>
                  <span className="font-medium text-neutral-800">Bekasi, Jawa Barat, Indonesia</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Status</span>
                  <span className="font-medium text-neutral-800">Laki-laki • Menikah • Islam</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 rounded-2xl bg-white border border-neutral-200/80 p-6 shadow-sm">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-1 block">Unit Usaha &amp; Ekosistem</span>
            <h2 className="text-lg font-display font-bold text-neutral-900 mb-4">Ekosistem Karya &amp; Bisnis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {businessVentures.map((v) => (
                <div key={v.name} className="rounded-xl bg-neutral-50/80 border border-neutral-200/70 p-4 flex flex-col justify-between hover:border-neutral-400 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">{v.icon}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-200/70 text-neutral-700 font-medium">
                        {v.badge}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-neutral-900 text-sm mb-0.5">{v.name}</h3>
                    <p className="text-[11px] font-medium text-neutral-500 mb-2">{v.role}</p>
                    <p className="text-xs text-neutral-600 leading-relaxed mb-4">{v.desc}</p>
                  </div>
                  <a
                    href={v.link}
                    target={v.external ? '_blank' : undefined}
                    rel={v.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center text-xs font-semibold text-neutral-950 hover:underline mt-auto"
                  >
                    Buka Profil Usaha →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Berkas & Kredensial Resmi Vault */}
        <div className="rounded-3xl bg-white border border-neutral-200/80 p-6 sm:p-8 shadow-card mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-100">
            <div>
              <span className="label-brand mb-1 inline-block">Official Credentials</span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900">
                Kelengkapan Berkas &amp; Dokumen Kredensial
              </h2>
            </div>
            <a
              href="/docs/CV-Muhari.pdf"
              download="CV-Muhari.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shrink-0"
            >
              <span>📥</span> Unduh Dokumen CV Langsung (PDF)
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {documentList.map((doc) => (
              <div
                key={doc.name}
                className={"p-3.5 rounded-xl border flex items-center justify-between gap-3 " + (doc.isPrimary ? "bg-neutral-950 text-white border-neutral-900" : "bg-neutral-50/70 border-neutral-200/70 text-neutral-800")}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-lg shrink-0">{doc.icon}</span>
                  <div className="min-w-0">
                    <span className={"text-xs font-bold block truncate " + (doc.isPrimary ? "text-white" : "text-neutral-900")}>{doc.name}</span>
                    <span className={"text-[10px] font-mono " + (doc.isPrimary ? "text-neutral-300 font-medium" : "text-neutral-500")}>
                      {doc.status}
                    </span>
                  </div>
                </div>
                {doc.link && (
                  <a
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-white underline hover:text-neutral-200 shrink-0"
                  >
                    Buka →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Jejaring Sosial Lengkap */}
        <div className="rounded-3xl bg-neutral-900 text-white p-6 sm:p-8 mb-16 border border-neutral-800 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-800">
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">Direct Channels</span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">Jejaring Sosial &amp; Media Komunikasi</h2>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm">
              Seluruh kanal portofolio, kreasi DIY, dan komunikasi resmi personal Muhari.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-neutral-600 hover:bg-neutral-800/50 transition-all group"
              >
                <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">{s.icon}</span>
                <div className="min-w-0">
                  <span className="text-[11px] text-neutral-400 block truncate">{s.name}</span>
                  <span className="text-xs font-semibold text-white truncate block group-hover:text-neutral-300 transition-colors">
                    {s.handle}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 5 Pilar Keahlian & Spesialisasi */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="label-brand mb-3 inline-block">Multidisciplinary Matrix</span>
            <h2 className="heading-xl text-2xl sm:text-3xl lg:text-4xl text-neutral-900 mb-3">
              5 Pilar Keahlian &amp; Rekayasa Teknis
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
              Integrasi nyata antara kecakapan logika komputasi, keindahan estetika visual, dan presisi manufaktur fisik.
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
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0 mt-1.5" />
                        <span>{sk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Riwayat Karir & Pengalaman */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 rounded-3xl bg-white border border-neutral-200/80 p-6 sm:p-8 shadow-card">
            <span className="label-brand mb-3 inline-block">Track Record</span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 mb-6">
              Riwayat Pengalaman Kerja
            </h2>
            <div className="space-y-6">
              {careerTimeline.map((item, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-neutral-200 pb-2 last:pb-0">
                  <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-neutral-950 border-2 border-white shadow-sm" />
                  <span className="text-[11px] font-mono font-semibold text-neutral-900 bg-neutral-100 px-2.5 py-0.5 rounded-md inline-block mb-1">
                    {item.period}
                  </span>
                  <h3 className="font-display font-bold text-neutral-900 text-base">{item.title}</h3>
                  <p className="text-xs font-semibold text-neutral-700 mb-1">{item.role}</p>
                  <p className="text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Pendidikan */}
            <div className="rounded-3xl bg-white border border-neutral-200/80 p-6 sm:p-8 shadow-card">
              <span className="label-brand mb-3 inline-block">Akademik</span>
              <h2 className="text-lg font-display font-bold text-neutral-900 mb-4">Riwayat Pendidikan</h2>
              <div className="space-y-3">
                {educationList.map((edu) => (
                  <div key={edu.school} className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <span className="text-[10px] font-mono text-neutral-500 block">{edu.year}</span>
                    <span className="text-xs font-bold text-neutral-900 block">{edu.school}</span>
                    <span className="text-[11px] text-neutral-700 font-semibold">{edu.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hubungi Langsung */}
            <div className="rounded-3xl bg-neutral-950 text-white p-6 sm:p-8 shadow-card border border-neutral-800 text-center">
              <h3 className="font-display font-bold text-lg text-white mb-2">Kolaborasi &amp; Konsultasi</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                Terbuka untuk diskusi proyek aplikasi kasir, sistem digital custom, dan kemitraan bisnis.
              </p>
              <a
                href="https://wa.me/6289529131131"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-white text-neutral-950 font-display font-bold text-xs hover:bg-neutral-100 transition-colors inline-block"
              >
                Hubungi via WhatsApp →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
