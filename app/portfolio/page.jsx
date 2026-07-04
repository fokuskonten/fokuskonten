import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const categories = ['Semua', 'Android Dev', 'Creative Digital', 'Fotografi & Videografi', 'Content Creator']

const projects = [
  {
    title: 'E-Commerce Android App',
    description: 'Aplikasi belanja online dengan fitur real-time tracking, payment gateway, dan admin dashboard.',
    category: 'Android Dev',
    tags: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Midtrans'],
    gradient: 'from-accent-500/10 to-accent-700/5',
    border: 'border-accent-500/20',
    status: 'Publikasi',
  },
  {
    title: 'Social Media Dashboard',
    description: 'Aplikasi monitoring dan analitik media sosial multiplatform.',
    category: 'Android Dev',
    tags: ['Java', 'MPAndroidChart', 'Firebase'],
    gradient: 'from-accent-500/10 to-accent-700/5',
    border: 'border-accent-500/20',
    status: 'Publikasi',
  },
  {
    title: 'Brand Identity FokusKonten',
    description: 'Perancangan identitas merek, logo, dan panduan visual untuk personal brand.',
    category: 'Creative Digital',
    tags: ['Adobe Illustrator', 'Photoshop', 'Brand Guideline'],
    gradient: 'from-vibrant-500/10 to-vibrant-700/5',
    border: 'border-vibrant-500/20',
    status: 'Selesai',
  },
  {
    title: 'Social Media Templates',
    description: 'Set template Instagram, TikTok, dan YouTube dengan konsep modern dan dinamis.',
    category: 'Creative Digital',
    tags: ['Canva', 'Photoshop', 'After Effects'],
    gradient: 'from-vibrant-500/10 to-vibrant-700/5',
    border: 'border-vibrant-500/20',
    status: 'Selesai',
  },
  {
    title: 'Pre-Wedding Photography',
    description: 'Sesi foto pre-wedding dengan konsep outdoor dan indoor profesional.',
    category: 'Fotografi & Videografi',
    tags: ['Sony A7III', 'Lightroom', 'Photoshop'],
    gradient: 'from-pink-500/10 to-rose-700/5',
    border: 'border-pink-500/20',
    status: 'Selesai',
  },
  {
    title: 'Product Photography',
    description: 'Foto produk untuk katalog e-commerce dengan pencahayaan studio dan styling.',
    category: 'Fotografi & Videografi',
    tags: ['Studio Lighting', 'Lightroom', 'Photoshop'],
    gradient: 'from-pink-500/10 to-rose-700/5',
    border: 'border-pink-500/20',
    status: 'Selesai',
  },
  {
    title: 'YouTube Content Series',
    description: 'Produksi konten video pendek untuk YouTube Shorts dan TikTok dengan strategi viral.',
    category: 'Content Creator',
    tags: ['Premiere Pro', 'After Effects', 'SEO'],
    gradient: 'from-yellow-500/10 to-orange-700/5',
    border: 'border-yellow-500/20',
    status: 'Tayang',
  },
  {
    title: 'Instagram Campaign',
    description: 'Manajemen konten Instagram dengan strategi engagement dan growth organik.',
    category: 'Content Creator',
    tags: ['Copywriting', 'Canva', 'Analytics'],
    gradient: 'from-yellow-500/10 to-orange-700/5',
    border: 'border-yellow-500/20',
    status: 'Tayang',
  },
]

export const metadata = {
  title: 'Portfolio',
  description: 'Portfolio FokusKonten — Karya dalam Android Development, Creative Digital, Fotografi & Videografi.',
}

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-vibrant-500/5 rounded-full blur-3xl" />
          <div className="container-custom section-padding">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase">Portfolio</span>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white text-balance">
                Karya & <span className="gradient-text">Proyek</span>
              </h1>
              <p className="mt-4 text-dark-200">
                Beberapa proyek yang telah dikerjakan oleh FokusKonten. Setiap proyek dikerjakan dengan penuh dedikasi dan perhatian terhadap detail.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-10 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    cat === 'Semua'
                      ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                      : 'bg-dark-600/50 text-dark-200 border border-dark-400/20 hover:border-accent-500/30 hover:text-accent-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl overflow-hidden border ${project.border} bg-gradient-to-br ${project.gradient} p-6 hover-lift group cursor-pointer`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-accent-400 bg-accent-500/10 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-xs text-dark-300">{project.status}</span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-dark-200 text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs text-dark-300 bg-dark-600/50 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-dark-800/50">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white text-balance">
                Punya Proyek?
              </h2>
              <p className="mt-3 text-dark-200 max-w-xl mx-auto">
                Mari wujudkan ide Anda menjadi karya nyata bersama FokusKonten.
              </p>
              <a
                href="https://wa.me/6285183011318"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-accent-500 to-vibrant-600 text-white font-semibold hover:shadow-xl hover:shadow-vibrant-500/25 transition-all duration-300"
              >
                Diskusikan Proyek
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
