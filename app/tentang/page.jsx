import Link from 'next/link'

export const metadata = {
  title: 'Tentang FokusKonten',
  description: 'FokusKonten adalah studio pengembang perangkat lunak dan publisher aplikasi Android Indonesia yang berbasis di Cikarang, Jawa Barat.',
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
    <section className="pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container-page">
        {/* Signature Header Banner */}
        <div className="relative max-w-4xl mx-auto mb-16 rounded-3xl overflow-hidden border border-neutral-200/80 shadow-card bg-black group">
          <img
            src="/brand/fokuskonten-header.jpg"
            alt="FokusKonten Studio Header Banner"
            className="w-full h-auto object-cover min-h-[260px] max-h-[380px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-display font-semibold text-white/90 mb-3.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                FokusKonten Studio • Indonesia
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight mb-2.5 drop-shadow-md">
                Keahlian Rekayasa &amp; Standar Tinggi Software
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed drop-shadow line-clamp-2 sm:line-clamp-3 mb-5">
                Mendedikasikan keahlian software engineering untuk menghadirkan aplikasi Android dan desktop yang cepat, aman, dan berdaulat penuh.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-neutral-700/60 text-[10px] sm:text-[11px] font-mono text-neutral-300">
                  ⚡ Offline-First
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-neutral-700/60 text-[10px] sm:text-[11px] font-mono text-neutral-300">
                  🔒 Privasi Terjamin
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-neutral-700/60 text-[10px] sm:text-[11px] font-mono text-neutral-300">
                  🚀 SDK 36 Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <span className="label-brand mb-4 inline-block">Profil Perusahaan</span>
          <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-6 text-balance">
            FokusKonten —{' '}
            <span className="text-gradient-brand">Studio Pengembang Software</span>
          </h1>
          <p className="text-neutral-600 text-base leading-relaxed mb-5">
            FokusKonten adalah studio pengembang dan publisher aplikasi Android &amp; software resmi Indonesia yang berpusat di Cikarang, Jawa Barat. Mengusung simbol <strong>Mata Elang</strong> sebagai representasi ketajaman visi, ketelitian detail teknis, dan independensi sistem tanpa kompromi.
          </p>
          <p className="text-neutral-600 text-base leading-relaxed mb-5">
            Melalui produk unggulan seperti <strong>Apotek Pro</strong>, <strong>Kelontong Pro</strong>, dan platform karir <strong>MCJob.id</strong>, kami memprioritaskan prinsip <em>Offline-First</em> — memastikan pelaku usaha dapat terus mencatat transaksi, mengelola stok, dan mencetak struk secara andal tanpa hambatan jaringan.
          </p>
          <p className="text-neutral-600 text-base leading-relaxed">
            Seluruh produk kami dikembangkan dengan standar keamanan ketat, mematuhi panduan Google Play Protect SDK 36, serta dirancang untuk kemudahan navigasi bagi siapapun yang menggunakannya.
          </p>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="label-brand mb-3 inline-block">Linimasa</span>
            <h2 className="heading-xl text-2xl sm:text-3xl text-neutral-900">Perjalanan &amp; Perkembangan</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {milestones.map((m) => (
              <div key={m.year} className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-sm flex flex-col sm:flex-row sm:items-start gap-4">
                <span className="text-neutral-950 font-display font-bold text-lg shrink-0 w-20">{m.year}</span>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-neutral-900 text-base mb-1">{m.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          <div className="rounded-2xl bg-white border border-neutral-200/80 p-6 shadow-sm">
            <h3 className="font-display font-semibold text-neutral-900 text-base mb-3">Visi</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Menjadi studio pengembang software dan aplikasi terpercaya dari Indonesia yang menghadirkan solusi digital berkualitas tinggi, tangguh, dan mudah diakses untuk seluruh lapisan masyarakat dan pelaku usaha.
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-neutral-200/80 p-6 shadow-sm">
            <h3 className="font-display font-semibold text-neutral-900 text-base mb-3">Misi</h3>
            <ul className="space-y-2.5 text-neutral-600 text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 shrink-0 mt-2" />
                Membangun aplikasi bisnis kasir offline-first yang andal dan terjangkau.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 shrink-0 mt-2" />
                Menjaga standar performa dan kompatibilitas SDK Android termutakhir.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 shrink-0 mt-2" />
                Memberikan layanan konsultasi dan pembuatan aplikasi yang transparan.
              </li>
            </ul>
          </div>
        </div>

        {/* Founder & Lead Engineer Spotlight */}
        <div className="rounded-3xl bg-neutral-950 text-white p-6 sm:p-8 max-w-3xl mx-auto mb-16 shadow-2xl border border-neutral-800 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-white/25 shadow-md bg-neutral-900">
            <img
              src="/brand/muhari-profile.jpg"
              alt="Muhari — Founder FokusKonten"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono text-white/90 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Founder &amp; Lead Engineer
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-1.5">Muhari</h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
              Sosok praktisi di balik perancangan arsitektur FokusKonten. Menyatukan keahlian mobile software engineering, presisi percetakan &amp; packaging, sinematografi, hingga kerajinan kayu solid (*woodcraft*).
            </p>
            <Link
              href="/muhari"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white hover:text-neutral-300 underline underline-offset-4 transition-colors"
            >
              Lihat Portofolio &amp; Rekam Jejak Lengkap Owner →
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-neutral-200/80 p-8 max-w-3xl mx-auto shadow-card">
          <h3 className="font-display font-semibold text-neutral-900 text-base mb-4">Informasi Resmi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="border-b sm:border-b-0 pb-2 sm:pb-0">
              <span className="text-neutral-400 text-xs block">Studio / Badan Usaha</span>
              <span className="font-medium text-neutral-800">FokusKonten</span>
            </div>
            <div className="border-b sm:border-b-0 pb-2 sm:pb-0">
              <span className="text-neutral-400 text-xs block">Lokasi</span>
              <span className="font-medium text-neutral-800">Cikarang, Jawa Barat, Indonesia</span>
            </div>
            <div>
              <span className="text-neutral-400 text-xs block">Email Resmi</span>
              <a href="mailto:admin@fokuskonten.my.id" className="font-semibold text-neutral-900 underline">admin@fokuskonten.my.id</a>
            </div>
            <div>
              <span className="text-neutral-400 text-xs block">WhatsApp Resmi</span>
              <a href="https://wa.me/6285183011318" target="_blank" rel="noopener noreferrer" className="font-semibold text-neutral-900 underline">+62 851-8301-1318</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
