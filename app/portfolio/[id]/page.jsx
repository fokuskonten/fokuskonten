import portfolioData from '@/content/portfolio/portfolio.json'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return portfolioData.map((item) => ({ id: item.id }))
}

export function generateMetadata({ params }) {
  const item = portfolioData.find(p => p.id === params.id)
  if (!item) return {}
  return {
    title: item.title,
    description: item.description,
  }
}

const categoryColors = {
  'Android Development':    { dot: '#c5a880', bg: 'rgba(197,168,128,0.06)', border: 'rgba(197,168,128,0.15)' },
  'Creative Digital':       { dot: '#dda855', bg: 'rgba(221,168,85,0.06)',  border: 'rgba(221,168,85,0.15)'  },
  'Fotografi & Videografi': { dot: '#9a7a3d', bg: 'rgba(154,122,61,0.06)', border: 'rgba(154,122,61,0.15)'  },
  'Content Creator':        { dot: '#b8924a', bg: 'rgba(184,146,74,0.06)', border: 'rgba(184,146,74,0.15)'  },
}

export default function PortfolioDetailPage({ params }) {
  const item = portfolioData.find(p => p.id === params.id)
  if (!item) notFound()

  const col = categoryColors[item.category] || { dot: '#c5a880', bg: 'rgba(197,168,128,0.06)', border: 'rgba(197,168,128,0.15)' }
  const related = portfolioData.filter(p => p.category === item.category && p.id !== item.id).slice(0, 3)

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ───────────────────────── */}
        <section className="relative pt-32 sm:pt-40 pb-10 overflow-hidden" aria-label={item.title}>
          <div
            className="absolute top-0 right-0 w-[400px] h-[400px] blur-[120px] opacity-10 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${col.dot}66 0%, transparent 70%)` }}
            aria-hidden="true"
          />
          <div className="container-max section px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-500 mb-8">
              <Link href="/" className="hover:text-copper transition-colors">Beranda</Link>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              <Link href="/portfolio" className="hover:text-copper transition-colors">Portfolio</Link>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              <span className="text-ink-400 truncate max-w-[150px]">{item.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Main */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full" style={{ background: col.dot }} aria-hidden="true" />
                  <span className="text-ink-500 text-xs font-display">{item.category}</span>
                </div>
                <h1 className="heading-xl text-3xl sm:text-4xl text-ivory-50 mb-4 text-balance">
                  {item.title}
                </h1>
                <p className="text-ink-400 leading-relaxed mb-8">{item.description}</p>

                {/* Placeholder for project images */}
                <div
                  className="w-full aspect-video rounded-2xl flex items-center justify-center mb-8"
                  style={{ background: col.bg, border: `1px solid ${col.border}` }}
                  role="img"
                  aria-label={`Pratinjau proyek ${item.title}`}
                >
                  <div className="text-center">
                    <div className="font-display font-bold text-5xl text-copper/30 mb-3">{item.category.split(' ')[0]}</div>
                    <p className="text-ink-600 text-sm">Gambar proyek akan segera hadir</p>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h2 className="font-display font-semibold text-sm text-ink-400 mb-3">Teknologi & Tools</h2>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="card-outline p-6">
                  <h2 className="font-display font-semibold text-sm text-ivory-300 mb-4">Detail Proyek</h2>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-ink-500">Kategori</dt>
                      <dd className="text-ivory-200 font-medium text-right text-xs">{item.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink-500">Status</dt>
                      <dd>
                        <span className="badge text-xs">{item.status}</span>
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink-500">Tahun</dt>
                      <dd className="text-ivory-200 font-medium">{item.year}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 pt-5 border-t border-white/[0.06]">
                    <a
                      href="https://wa.me/6285183011318"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full justify-center text-sm"
                    >
                      Proyek Serupa
                    </a>
                  </div>
                </div>

                {/* Related */}
                {related.length > 0 && (
                  <div className="card-outline p-6">
                    <h2 className="font-display font-semibold text-sm text-ivory-300 mb-4">Karya Lainnya</h2>
                    <div className="space-y-3">
                      {related.map(r => (
                        <Link
                          key={r.id}
                          href={`/portfolio/${r.id}`}
                          className="block group"
                        >
                          <div className="font-display font-medium text-sm text-ink-300 group-hover:text-copper transition-colors">
                            {r.title}
                          </div>
                          <div className="text-ink-600 text-xs mt-0.5">{r.year}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Back ─────────────────────────── */}
        <div className="container-max px-4 sm:px-6 lg:px-8 pb-16">
          <Link href="/portfolio" className="btn-ghost text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Kembali ke Portfolio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
