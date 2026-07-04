import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import postsData from '@/content/blog/posts.json'

const categoryColors = {
  'Android Dev':     { text: '#c5a880', bg: 'rgba(197,168,128,0.08)', border: 'rgba(197,168,128,0.15)' },
  'Fotografi':       { text: '#9a7a3d', bg: 'rgba(154,122,61,0.08)',  border: 'rgba(154,122,61,0.15)'  },
  'Content Creator': { text: '#b8924a', bg: 'rgba(184,146,74,0.08)',  border: 'rgba(184,146,74,0.15)'  },
  'Creative Digital':{ text: '#dda855', bg: 'rgba(221,168,85,0.08)',  border: 'rgba(221,168,85,0.15)'  },
  'Videografi':      { text: '#c5a880', bg: 'rgba(197,168,128,0.08)', border: 'rgba(197,168,128,0.15)' },
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

export const metadata = {
  title: 'Blog',
  description: 'Artikel dan panduan seputar Android Development, Creative Digital, Fotografi, Videografi, dan Content Creator dari FokusKonten.',
}

export default function BlogPage() {
  const featured = postsData.find(p => p.featured)
  const rest     = postsData.filter(p => !p.featured || p.slug !== featured?.slug)

  return (
    <>
      <Navbar />
      <main>

        {/* ── Header ────────────────────────── */}
        <section className="relative pt-32 sm:pt-40 pb-10 overflow-hidden" aria-label="Blog header">
          <div
            className="absolute top-0 right-0 w-[400px] h-[400px] blur-[120px] opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(197,168,128,0.4) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="container-max section px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="section-label">Blog</span>
              <h1 className="heading-xl text-4xl sm:text-5xl text-ivory-50 mb-4 text-balance">
                Artikel &{' '}
                <span className="text-copper-gradient">Panduan</span>
              </h1>
              <p className="text-ink-400 text-base leading-relaxed">
                Berbagi pengetahuan tentang Android development, desain kreatif, fotografi, videografi, dan strategi konten digital.
              </p>
            </div>
          </div>
        </section>

        {/* ── Featured Post ─────────────────── */}
        {featured && (
          <section className="container-max px-4 sm:px-6 lg:px-8 pb-10" aria-label="Artikel unggulan">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl p-8 sm:p-10 transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'rgba(197,168,128,0.04)', border: '1px solid rgba(197,168,128,0.12)', boxShadow: '0 0 40px rgba(197,168,128,0.04) inset' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="badge">Unggulan</span>
                <span
                  className="text-xs font-display font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: (categoryColors[featured.category] || categoryColors['Android Dev']).bg,
                    color: (categoryColors[featured.category] || categoryColors['Android Dev']).text,
                    border: `1px solid ${(categoryColors[featured.category] || categoryColors['Android Dev']).border}`,
                  }}
                >
                  {featured.category}
                </span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-ivory-100 group-hover:text-copper transition-colors duration-200 mb-3 text-balance max-w-2xl">
                {featured.title}
              </h2>
              <p className="text-ink-400 text-sm leading-relaxed mb-6 max-w-2xl">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-ink-600">
                  <span>{formatDate(featured.date)}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <span className="text-xs font-display font-semibold text-copper flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Baca Artikel
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* ── Post Grid ─────────────────────── */}
        <section className="container-max px-4 sm:px-6 lg:px-8 pb-24" aria-label="Semua artikel">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((post) => {
              const col = categoryColors[post.category] || categoryColors['Android Dev']
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block card-outline p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-display font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: col.bg, color: col.text, border: `1px solid ${col.border}` }}
                    >
                      {post.category}
                    </span>
                    <span className="text-ink-600 text-xs">{post.readTime}</span>
                  </div>
                  <h2 className="font-display font-semibold text-base text-ivory-200 group-hover:text-copper transition-colors duration-200 mb-2 text-balance">
                    {post.title}
                  </h2>
                  <p className="text-ink-500 text-xs leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                    <span className="text-ink-600 text-xs">{formatDate(post.date)}</span>
                    <span className="text-xs font-display font-medium text-copper/70 group-hover:text-copper flex items-center gap-1 transition-all">
                      Baca
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          <p className="text-ink-600 text-sm text-center mt-10">
            Artikel baru akan segera hadir. Pantau terus FokusKonten.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
