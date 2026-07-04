import postsData from '@/content/blog/posts.json'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return postsData.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }) {
  const post = postsData.find(p => p.slug === params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

const categoryColors = {
  'Android Dev':     { text: '#8c1f1f', bg: 'rgba(140,31,31,0.03)', border: 'rgba(140,31,31,0.08)' },
  'Fotografi':       { text: '#751919', bg: 'rgba(117,25,25,0.03)', border: 'rgba(117,25,25,0.08)' },
  'Content Creator': { text: '#5e1414', bg: 'rgba(94,20,20,0.03)',  border: 'rgba(94,20,20,0.08)'  },
  'Creative Digital':{ text: '#ab3333', bg: 'rgba(171,51,51,0.03)', border: 'rgba(171,51,51,0.08)'  },
  'Videografi':      { text: '#8c1f1f', bg: 'rgba(140,31,31,0.03)', border: 'rgba(140,31,31,0.08)' },
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogDetailPage({ params }) {
  const post = postsData.find(p => p.slug === params.slug)
  if (!post) notFound()

  const col = categoryColors[post.category] || categoryColors['Android Dev']
  const related = postsData.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <Navbar />
      <main>
        {/* ── Header ───────────────────────── */}
        <section className="relative pt-32 sm:pt-40 pb-10 overflow-hidden bg-canvas-100" aria-label={post.title}>
          <div
            className="absolute top-0 left-0 w-[400px] h-[400px] blur-[120px] opacity-15 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${col.text}33 0%, transparent 70%)` }}
            aria-hidden="true"
          />
          <div className="container-max section px-4 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-charcoal-400 mb-8 animate-fade-up">
              <Link href="/" className="hover:text-maroon-700 transition-colors">Beranda</Link>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              <Link href="/blog" className="hover:text-maroon-700 transition-colors">Blog</Link>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              <span className="text-charcoal-600 truncate max-w-[160px]">{post.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Main Article */}
              <article className="lg:col-span-2 animate-fade-up delay-100">
                {/* Meta */}
                <div className="flex items-center flex-wrap gap-3 mb-6">
                  <span
                    className="text-xs font-display font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: col.bg, color: col.text, border: `1px solid ${col.border}` }}
                  >
                    {post.category}
                  </span>
                  <span className="text-charcoal-400 text-xs">{formatDate(post.date)}</span>
                  <span className="text-charcoal-300 text-xs">·</span>
                  <span className="text-charcoal-400 text-xs">{post.readTime} baca</span>
                </div>

                <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mb-5 text-balance">
                  {post.title}
                </h1>
                <p className="text-charcoal-500 text-lg leading-relaxed mb-8 font-light">
                  {post.excerpt}
                </p>

                {/* Divider */}
                <div className="maroon-line mb-8" aria-hidden="true" />

                {/* Content Placeholder */}
                <div className="prose-custom space-y-4 text-charcoal-600 text-[15px] leading-relaxed">
                  <p>{post.content}</p>
                  <div
                    className="rounded-xl p-6 my-6 bg-maroon-50 border border-maroon-100"
                  >
                    <p className="text-maroon-700 text-sm font-medium">
                      ✍️ Konten artikel ini sedang dalam penyusunan. Pantau terus FokusKonten untuk artikel lengkap yang akan segera hadir.
                    </p>
                  </div>
                </div>

                {/* Author */}
                <div
                  className="flex items-center gap-4 mt-10 p-5 rounded-xl bg-white border border-black/[0.04] shadow-mature"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-display font-bold text-lg shrink-0"
                    style={{ background: 'linear-gradient(135deg, #ab3333 0%, #751919 100%)' }}
                    aria-hidden="true"
                  >
                    F
                  </div>
                  <div>
                    <div className="font-display font-semibold text-charcoal-800 text-sm">FokusKonten</div>
                    <div className="text-charcoal-400 text-xs mt-0.5">Studio Kreatif Digital · Indonesia</div>
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="space-y-6 animate-fade-up delay-200">
                <div className="card-outline p-6 shadow-mature">
                  <h2 className="font-display font-bold text-charcoal-900 text-sm mb-4">Tentang Artikel</h2>
                  <dl className="space-y-3 text-sm border-b border-black/[0.04] pb-4">
                    <div className="flex justify-between">
                      <dt className="text-charcoal-500">Kategori</dt>
                      <dd className="text-charcoal-900 font-semibold text-xs">{post.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-charcoal-500">Tanggal</dt>
                      <dd className="text-charcoal-900 font-semibold text-xs">{formatDate(post.date)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-charcoal-500">Waktu Baca</dt>
                      <dd className="text-charcoal-900 font-semibold text-xs">{post.readTime}</dd>
                    </div>
                  </dl>
                </div>

                {related.length > 0 && (
                  <div className="card-outline p-6 shadow-mature">
                    <h2 className="font-display font-bold text-charcoal-900 text-sm mb-4">Artikel Terkait</h2>
                    <div className="space-y-4">
                      {related.map(r => (
                        <Link key={r.slug} href={`/blog/${r.slug}`} className="block group">
                          <div className="font-display font-medium text-sm text-charcoal-700 group-hover:text-maroon-700 transition-colors leading-snug">
                            {r.title}
                          </div>
                          <div className="text-charcoal-400 text-xs mt-1">{formatDate(r.date)}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className="p-6 rounded-xl text-center bg-maroon-50 border border-maroon-100"
                >
                  <p className="text-maroon-700 text-xs font-semibold leading-relaxed mb-4">
                    Punya pertanyaan atau ingin diskusi lebih lanjut?
                  </p>
                  <a
                    href="https://wa.me/6285183011318"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs px-4 py-2.5 w-full justify-center hover:scale-[1.02] transition-transform"
                  >
                    Hubungi via WhatsApp
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── Back ─────────────────────────── */}
        <div className="container-max px-4 sm:px-6 lg:px-8 pb-16 animate-fade-up">
          <Link href="/blog" className="btn-ghost text-sm hover:translate-x-[-2px] transition-transform">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Kembali ke Blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
