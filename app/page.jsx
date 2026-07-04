import Link from 'next/link'
import appsData from '@/content/apps/apps.json'
import AppCard from '@/components/AppCard'
import SectionHeading from '@/components/SectionHeading'

const stats = [
  { value: '79+', label: 'Aplikasi Android' },
  { value: '8', label: 'Kategori Aplikasi' },
  { value: '5+', label: 'Tahun Pengembangan' },
  { value: '100%', label: 'Buatan Indonesia' },
]

const categories = [
  { name: 'Game', count: appsData.filter(a => a.category === 'Game').length, color: 'bg-accent-50', textColor: 'text-accent-600', border: 'border-accent-200', icon: '🎮' },
  { name: 'Edukasi', count: appsData.filter(a => a.category === 'Edukasi').length, color: 'bg-brand-50', textColor: 'text-brand-600', border: 'border-brand-200', icon: '📚' },
  { name: 'Utilitas', count: appsData.filter(a => a.category === 'Utilitas').length, color: 'bg-purple-50', textColor: 'text-purple-600', border: 'border-purple-200', icon: '🔧' },
  { name: 'Bisnis', count: appsData.filter(a => a.category === 'Bisnis').length, color: 'bg-blue-50', textColor: 'text-blue-600', border: 'border-blue-200', icon: '💼' },
  { name: 'Religi', count: appsData.filter(a => a.category === 'Religi').length, color: 'bg-emerald-50', textColor: 'text-emerald-600', border: 'border-emerald-200', icon: '🕌' },
  { name: 'Kesehatan', count: appsData.filter(a => a.category === 'Kesehatan').length, color: 'bg-rose-50', textColor: 'text-rose-600', border: 'border-rose-200', icon: '❤️' },
  { name: 'Produktivitas', count: appsData.filter(a => a.category === 'Produktivitas').length, color: 'bg-cyan-50', textColor: 'text-cyan-600', border: 'border-cyan-200', icon: '📋' },
  { name: 'Hiburan', count: appsData.filter(a => a.category === 'Hiburan').length, color: 'bg-pink-50', textColor: 'text-pink-600', border: 'border-pink-200', icon: '🎵' },
]

export default function HomePage() {
  const featuredApps = appsData.slice(0, 6)

  return (
    <>
      <section className="min-h-[90vh] flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-brand opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-accent opacity-5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-500/3 via-transparent to-transparent" />
        </div>
        <div className="container-page relative z-10 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse-soft" />
              <span className="label-brand text-xs">79+ Aplikasi Android Tersedia</span>
            </div>

            <h1 className="heading-xl text-[clamp(2rem,5vw,4rem)] text-balance text-neutral-900 mb-6">
              Kumpulan Aplikasi Android{' '}
              <span className="text-gradient-brand">Paling Berani</span>
              {' '}dari Indonesia
            </h1>

            <p className="text-neutral-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
              Jelajahi 79+ aplikasi Android karya FokusKonten — dari game seru, edukasi interaktif, utilitas praktis, hingga solusi bisnis profesional. Dibangun dengan standar tertinggi.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
              <Link href="/aplikasi" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm text-white bg-gradient-brand hover:shadow-xl hover:shadow-brand-500/30 transition-all duration-200">
                Jelajahi Aplikasi
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <a
                href="https://play.google.com/store/apps/developer?id=FokusKonten"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm text-neutral-700 bg-white border border-neutral-200 hover:border-brand-300 hover:text-brand-600 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M1.326 1.973C1.256 2.294 1.22 2.634 1.22 3v18c0 .366.036.706.106 1.027L12 12 1.326 1.973zm.905-.642l11.17 10.736L23.723 3.38c-.443-.269-1-.43-1.607-.43H4.202c-.717 0-1.356.248-1.971.38zM23.66 4.797L13.334 15.05l5.914 5.686 4.02-3.878c.442-.374.732-.932.732-1.558V6.19c0-.515-.121-1-.34-1.394zM12 13.14L1.628 22.21A3.573 3.573 0 004.202 23h15.596c.46 0 .893-.112 1.28-.31L18.87 19.87 12 13.14z"/></svg>
                Google Play Store
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display font-bold text-3xl sm:text-4xl text-neutral-900">{stat.value}</div>
                  <div className="text-neutral-400 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-neutral-100 bg-gradient-to-b from-white to-neutral-50">
        <div className="container-page">
          <SectionHeading
            label="Kategori"
            title="Jelajahi Berdasarkan Kategori"
            description="Temukan aplikasi yang Anda butuhkan dari delapan kategori yang tersedia."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                href={`/aplikasi#${cat.name.toLowerCase()}`}
                className={`group ${cat.color} rounded-2xl p-5 text-center border ${cat.border} hover:${cat.textColor} transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
              >
                <span className="text-2xl block mb-2">{cat.icon}</span>
                <div className="font-display font-semibold text-sm text-neutral-800">{cat.name}</div>
                <div className={`text-xs mt-0.5 ${cat.textColor}`}>{cat.count} aplikasi</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-neutral-50 to-white border-t border-neutral-100">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
            <div>
              <span className="label-brand mb-3 inline-block">Terbaru</span>
              <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-900">
                Aplikasi Unggulan
              </h2>
            </div>
            <Link href="/aplikasi" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
              Lihat Semua &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredApps.map((app, i) => (
              <AppCard key={app.id} app={app} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="rounded-3xl bg-gradient-brand p-10 sm:p-14 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_white_0%,_transparent_50%)] opacity-10" />
            <div className="relative z-10">
              <h2 className="heading-xl text-3xl sm:text-4xl mb-4">
                Siap Kembangkan Aplikasi Android?
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
                Punya ide aplikasi? Diskusikan dengan kami dan wujudkan menjadi produk nyata yang siap dipublikasikan di Google Play Store.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://wa.me/6285183011318"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm bg-white text-brand-700 hover:bg-white/90 hover:shadow-xl transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Mulai via WhatsApp
                </a>
                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm border border-white/20 text-white hover:bg-white/10 transition-all"
                >
                  Form Kontak
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
