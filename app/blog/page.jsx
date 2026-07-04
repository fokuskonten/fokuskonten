import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import postsData from '@/content/blog/posts.json'

const categoryColors = {
  'Android Dev':      { text: '#8c1f1f', bg: 'rgba(140,31,31,0.03)', border: 'rgba(140,31,31,0.08)' },
  'Fotografi':        { text: '#751919', bg: 'rgba(117,25,25,0.03)', border: 'rgba(117,25,25,0.08)' },
  'Content Creator':  { text: '#5e1414', bg: 'rgba(94,20,20,0.03)',  border: 'rgba(94,20,20,0.08)'  },
  'Creative Digital': { text: '#ab3333', bg: 'rgba(171,51,51,0.03)', border: 'rgba(171,51,51,0.08)'  },
  'Videografi':       { text: '#8c1f1f', bg: 'rgba(140,31,31,0.03)', border: 'rgba(140,31,31,0.08)' },
  'Desain Grafis':    { text: '#7b2d8e', bg: 'rgba(123,45,142,0.03)', border: 'rgba(123,45,142,0.08)' },
  'Kerajinan Kayu':   { text: '#6b4c3a', bg: 'rgba(107,76,58,0.03)',  border: 'rgba(107,76,58,0.08)'  },
  'Aset Digital':     { text: '#2d6a4f', bg: 'rgba(45,106,79,0.03)', border: 'rgba(45,106,79,0.08)' },
  'Template Blogger': { text: '#5c6bc0', bg: 'rgba(92,107,192,0.03)', border: 'rgba(92,107,192,0.08)' },
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
            className="absolute top-0 right-0 w-[400px] h-[400px] blur-[120px] opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(140,31,31,0.06) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="container-max section px-4 sm:px-6 lg:px-8 animate-fade-up">
            <div className="max-w-2xl">
              <span className="section-label">Blog</span>
              <h1 className="heading-xl text-4xl sm:text-5xl text-charcoal-900 mb-4 text-balance">
                Artikel &{' '}
                <span className="text-maroon-gradient">Panduan</span>
              </h1>
              <p className="text-charcoal-500 text-base leading-relaxed">
                Berbagi pengetahuan tentang Android development, desain kreatif, fotografi, videografi, dan strategi konten digital.
              </p>
            </div>
          </div>
        </section>

        {/* ── Featured Post ─────────────────── */}
        {featured && (
          <section className="container-max px-4 sm:px-6 lg:px-8 pb-10 animate-fade-up delay-100" aria-label="Artikel unggulan">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl p-8 sm:p-10 bg-white border border-black/[0.05] shadow-mature hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
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
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900 group-hover:text-maroon-700 transition-colors duration-200 mb-3 text-balance max-w-2xl">
                {featured.title}
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed mb-6 max-w-2xl">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-charcoal-400">
                  <span>{formatDate(featured.date)}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <span className="text-xs font-display font-semibold text-maroon-700 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => {
              const col = categoryColors[post.category] || categoryColors['Android Dev']
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block card-outline p-6 shadow-mature hover:shadow-elevated transition-all duration-300 animate-scale-in"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-display font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: col.bg, color: col.text, border: `1px solid ${col.border}` }}
                    >
                      {post.category}
                    </span>
                    <span className="text-charcoal-400 text-xs">{post.readTime}</span>
                  </div>
                  <h2 className="font-display font-semibold text-base text-charcoal-900 group-hover:text-maroon-700 transition-colors duration-200 mb-2 text-balance">
                    {post.title}
                  </h2>
                  <p className="text-charcoal-500 text-xs leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-black/[0.04]">
                    <span className="text-charcoal-400 text-xs">{formatDate(post.date)}</span>
                    <span className="text-xs font-display font-semibold text-maroon-700/70 group-hover:text-maroon-700 flex items-center gap-1 transition-all">
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

          <p className="text-charcoal-400 text-sm text-center mt-10">
            Artikel baru akan segera hadir. Pantau terus FokusKonten.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
