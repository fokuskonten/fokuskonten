import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const services = [
  {
    title: 'Android Development',
    description: 'Pengembangan aplikasi Android native dengan performa tinggi, UI/UX modern, dan arsitektur yang scalable.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: 'from-accent-400 to-accent-600',
  },
  {
    title: 'Creative Digital',
    description: 'Desain grafis, branding digital, motion graphics, dan konten kreatif untuk kebutuhan media sosial dan website.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: 'from-vibrant-400 to-vibrant-600',
  },
  {
    title: 'Fotografi & Videografi',
    description: 'Jasa foto dan video profesional untuk produk, event, portrait, serta konten komersial dan kreatif.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    color: 'from-pink-500 to-rose-600',
  },
  {
    title: 'Content Creator',
    description: 'Strategi konten, produksi video pendek, dan manajemen media sosial untuk meningkatkan engagement dan reach.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: 'from-yellow-500 to-orange-600',
  },
]

const portfolioItems = [
  {
    title: 'Android Apps',
    description: 'Aplikasi Android native dengan fitur lengkap',
    category: 'Android Dev',
    gradient: 'from-accent-500/20 to-accent-700/20',
    border: 'border-accent-500/30',
  },
  {
    title: 'Digital Design',
    description: 'Branding dan desain grafis kreatif',
    category: 'Creative Digital',
    gradient: 'from-vibrant-500/20 to-vibrant-700/20',
    border: 'border-vibrant-500/30',
  },
  {
    title: 'Photo & Video',
    description: 'Foto dan video profesional',
    category: 'Fotografi & Videografi',
    gradient: 'from-pink-500/20 to-rose-700/20',
    border: 'border-pink-500/30',
  },
  {
    title: 'Content Strategy',
    description: 'Konten kreatif media sosial',
    category: 'Content Creator',
    gradient: 'from-yellow-500/20 to-orange-700/20',
    border: 'border-yellow-500/30',
  },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-800 via-dark-900 to-dark-900" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-vibrant-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
                Official Website FokusKonten
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight text-balance">
                <span className="text-white">Create, Develop, </span>
                <span className="gradient-text">Capture</span>
                <br />
                <span className="text-dark-200">with FokusKonten</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-dark-200 max-w-2xl leading-relaxed">
                Android Developer | Creative Digital & Content Creator | Fotograf & Videografi
              </p>

              <p className="mt-3 text-dark-300 max-w-xl text-sm sm:text-base">
                Berfokus pada pengembangan aplikasi Android, desain kreatif, produksi foto-video, dan strategi konten digital yang berdampak.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/portfolio"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-500 to-vibrant-600 text-white font-semibold text-sm hover:shadow-xl hover:shadow-vibrant-500/25 transition-all duration-300"
                >
                  Lihat Portfolio
                </Link>
                <a
                  href="https://wa.me/6285183011318"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl border border-dark-400 text-dark-200 font-semibold text-sm hover:border-accent-500 hover:text-accent-400 transition-all duration-300"
                >
                  Hubungi Saya
                </a>
              </div>

              <div className="flex items-center gap-6 mt-10 text-dark-300">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br from-dark-500 to-dark-400 border-2 border-dark-800 flex items-center justify-center text-xs font-bold text-dark-200`}>
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm">Trusted by clients across Indonesia</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-dark-800/50">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase">Layanan</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-white text-balance">
                Apa yang <span className="gradient-text">FokusKonten</span> tawarkan?
              </h2>
              <p className="mt-4 text-dark-200">
                Solusi digital lengkap dari pengembangan hingga publikasi konten.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="glass-card p-6 hover-lift group cursor-default"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} bg-opacity-20 flex items-center justify-center text-white mb-5`}>
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-display font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-dark-200 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase">Portfolio</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-white text-balance">
                Karya <span className="gradient-text">Kami</span>
              </h2>
              <p className="mt-4 text-dark-200">
                Beberapa proyek dan karya yang telah kami kerjakan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {portfolioItems.map((item, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl overflow-hidden border ${item.border} bg-gradient-to-br ${item.gradient} p-6 sm:p-8 hover-lift group cursor-pointer`}
                >
                  <div className="relative z-10">
                    <span className="text-xs font-semibold text-accent-400 uppercase tracking-wider">{item.category}</span>
                    <h3 className="mt-2 text-xl sm:text-2xl font-display font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-dark-200 text-sm">{item.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-white font-medium">
                      <span>Detail</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-dark-400 text-dark-200 font-semibold text-sm hover:border-accent-500 hover:text-accent-400 transition-all duration-300"
              >
                Lihat Semua Portfolio
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section className="section-padding bg-dark-800/50">
          <div className="container-custom">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dark-700 via-dark-600 to-dark-700 border border-dark-400/20 p-8 sm:p-12 lg:p-16">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-vibrant-500/10 rounded-full blur-3xl" />

              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white text-balance">
                  Siap Bekerja Sama?
                </h2>
                <p className="mt-4 text-dark-200">
                  Punya proyek atau ide? Mari diskusikan dan wujudkan bersama FokusKonten.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                  <a
                    href="https://wa.me/6285183011318"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-accent-500 to-vibrant-600 text-white font-semibold hover:shadow-xl hover:shadow-vibrant-500/25 transition-all duration-300"
                  >
                    WhatsApp Sekarang
                  </a>
                  <Link
                    href="/contact"
                    className="px-8 py-3 rounded-xl border border-dark-400 text-dark-200 font-semibold hover:border-accent-500 hover:text-accent-400 transition-all duration-300"
                  >
                    Form Kontak
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
