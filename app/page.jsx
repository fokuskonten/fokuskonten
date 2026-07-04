import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import portfolioData from '@/content/portfolio/portfolio.json'
import postsData    from '@/content/blog/posts.json'

const services = [
  {
    icon: (
      <svg className="w-6 h-6 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Android Development',
    desc:  'Aplikasi Android native: Kotlin, Jetpack Compose, Firebase, Play Store.',
    number: '01',
  },
  {
    icon: (
      <svg className="w-6 h-6 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8 17.926 17.926 0 00-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8" />
      </svg>
    ),
    title: 'Creative Digital',
    desc:  'Logo, branding, desain grafis, template media sosial, dan visual identity.',
    number: '02',
  },
  {
    icon: (
      <svg className="w-6 h-6 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Fotografi & Videografi',
    desc:  'Foto produk, portrait, pre-wedding, film dokumenter, dan video kreatif.',
    number: '03',
  },
  {
    icon: (
      <svg className="w-6 h-6 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Content Creator',
    desc:  'Strategi konten, video pendek, copywriting, dan manajemen media sosial.',
    number: '04',
  },
]

const featuredPortfolio = portfolioData.filter(p => p.featured).slice(0, 4)
const recentPosts       = postsData.slice(0, 3)

const categoryColors = {
  'Android Development':    { dot: '#8c1f1f', bg: 'rgba(140,31,31,0.03)', border: 'rgba(140,31,31,0.08)' },
  'Creative Digital':       { dot: '#ab3333', bg: 'rgba(171,51,51,0.03)', border: 'rgba(171,51,51,0.08)'  },
  'Fotografi & Videografi': { dot: '#751919', bg: 'rgba(117,25,25,0.03)', border: 'rgba(117,25,25,0.08)'  },
  'Content Creator':        { dot: '#5e1414', bg: 'rgba(94,20,20,0.03)',  border: 'rgba(94,20,20,0.08)'   },
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section
          className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-canvas-100"
          aria-label="Hero section"
        >
          {/* Ambient Background */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[130px] opacity-40"
              style={{ background: 'radial-gradient(circle, rgba(140, 31, 31, 0.05) 0%, transparent 70%)' }}
            />
            <div
              className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-30"
              style={{ background: 'radial-gradient(circle, rgba(171, 51, 51, 0.05) 0%, transparent 70%)' }}
            />
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
              }}
            />
          </div>

          <div className="relative z-10 container-max section px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">

              {/* Label */}
              <div className="flex items-center gap-2.5 mb-8 animate-fade-up">
                <span className="w-2 h-2 rounded-full bg-maroon-700 animate-pulse" aria-hidden="true" />
                <span className="heading-label">Official Website · FokusKonten</span>
              </div>

              {/* Headline */}
              <h1 className="heading-xl text-[clamp(2.8rem,8vw,5.5rem)] text-balance text-charcoal-900 mb-6 animate-fade-up delay-100">
                Create.{' '}
                <span className="text-maroon-gradient">Develop.</span>
                <br />
                <span className="text-charcoal-400">Capture.</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-charcoal-600 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mb-4 animate-fade-up delay-200">
                Studio kreatif digital — Android Development, Creative Design,
                Fotografi & Videografi, dan Content Creation.
              </p>
              <p className="text-charcoal-400 text-sm max-w-xl leading-relaxed mb-10 animate-fade-up delay-300">
                Berfokus pada solusi digital yang fungsional, estetis, dan berdampak nyata bagi klien dengan pendekatan minimalis elegan.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 animate-fade-up delay-400">
                <Link href="/portfolio" id="hero-cta-portfolio" className="btn-primary text-sm px-7 py-3.5 hover:scale-[1.02] transition-transform">
                  Lihat Portfolio
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="https://wa.me/6285183011318"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-cta-wa"
                  className="btn-secondary text-sm px-7 py-3.5 hover:scale-[1.02] transition-transform"
                >
                  Hubungi via WhatsApp
                </a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-8 mt-14 pt-10 border-t border-black/[0.05] animate-fade-up delay-500">
                {[
                  { value: '50+', label: 'Proyek Selesai' },
                  { value: '30+', label: 'Klien Puas' },
                  { value: '5+',  label: 'Tahun Pengalaman' },
                ].map((s) => (
                  <div key={s.label} className="hover:scale-105 transition-transform duration-200">
                    <div className="font-display font-bold text-3xl text-charcoal-900">{s.value}</div>
                    <div className="text-charcoal-500 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SERVICES
        ══════════════════════════════════════ */}
        <section className="section border-t border-black/[0.04] bg-white" aria-label="Layanan">
          <div className="container-max px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6 animate-fade-up">
              <div>
                <span className="section-label">Layanan</span>
                <h2 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 max-w-sm">
                  Apa yang{' '}
                  <span className="text-maroon-gradient">FokusKonten</span>{' '}
                  tawarkan?
                </h2>
              </div>
              <p className="text-charcoal-500 text-sm leading-relaxed max-w-xs md:text-right">
                Solusi digital komprehensif dari pembangunan aplikasi hingga strategi konten.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="group p-8 lg:p-10 bg-canvas-50 rounded-2xl border border-black/[0.05] shadow-mature hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-maroon-700 transition-colors duration-300 group-hover:bg-maroon-700 group-hover:text-white"
                      style={{ background: 'rgba(140,31,31,0.06)', border: '1px solid rgba(140,31,31,0.12)' }}
                    >
                      {s.icon}
                    </div>
                    <span className="font-display font-bold text-4xl text-charcoal-200 group-hover:text-maroon-100 transition-colors">
                      {s.number}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-charcoal-900 mb-2 group-hover:text-maroon-700 transition-colors duration-200">{s.title}</h3>
                  <p className="text-charcoal-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PORTFOLIO PREVIEW
        ══════════════════════════════════════ */}
        <section className="section border-t border-black/[0.04]" aria-label="Portfolio unggulan">
          <div className="container-max px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4 animate-fade-up">
              <div>
                <span className="section-label">Portfolio</span>
                <h2 className="heading-xl text-3xl sm:text-4xl text-charcoal-900">
                  Karya <span className="text-maroon-gradient">Pilihan</span>
                </h2>
              </div>
              <Link href="/portfolio" className="btn-ghost text-sm group self-start sm:self-auto hover:translate-x-1 transition-transform">
                Lihat Semua
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredPortfolio.map((item, i) => {
                const col = categoryColors[item.category] || { dot: '#8c1f1f', bg: 'rgba(140,31,31,0.03)', border: 'rgba(140,31,31,0.08)' }
                return (
                  <Link
                    key={item.id}
                    href={`/portfolio/${item.id}`}
                    className="group block rounded-2xl p-7 bg-white border border-black/[0.05] shadow-mature hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: col.dot }}
                        aria-hidden="true"
                      />
                      <span className="text-charcoal-500 text-xs font-display tracking-wide">{item.category}</span>
                      <span className="ml-auto text-charcoal-400 text-xs">{item.year}</span>
                    </div>
                    <h3 className="font-display font-semibold text-xl text-charcoal-900 mb-3 group-hover:text-maroon-700 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-charcoal-500 text-sm leading-relaxed mb-6">{item.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            BLOG PREVIEW
        ══════════════════════════════════════ */}
        <section className="section border-t border-black/[0.04] bg-white" aria-label="Artikel terbaru">
          <div className="container-max px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4 animate-fade-up">
              <div>
                <span className="section-label">Blog</span>
                <h2 className="heading-xl text-3xl sm:text-4xl text-charcoal-900">
                  Artikel <span className="text-maroon-gradient">Terbaru</span>
                </h2>
              </div>
              <Link href="/blog" className="btn-ghost text-sm group self-start sm:self-auto hover:translate-x-1 transition-transform">
                Semua Artikel
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="space-y-4">
              {recentPosts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white border border-black/[0.04] rounded-2xl shadow-subtle hover:shadow-mature hover:-translate-y-0.5 transition-all duration-300 gap-4 group"
                >
                  <div className="flex items-start gap-5">
                    <span className="font-display font-bold text-2xl text-charcoal-300 group-hover:text-maroon-200 transition-colors mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="badge text-xs mb-2">{post.category}</span>
                      <h3 className="font-display font-semibold text-charcoal-800 group-hover:text-maroon-700 transition-colors duration-200 text-base">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 pl-9 sm:pl-0">
                    <span className="text-charcoal-400 text-xs">{post.readTime}</span>
                    <svg className="w-4 h-4 text-charcoal-400 group-hover:text-maroon-700 group-hover:translate-x-0.5 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────── */}
        <section className="section border-t border-black/[0.04]" aria-label="Call to action">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div
              className="rounded-3xl p-10 sm:p-16 relative overflow-hidden text-center bg-white border border-black/[0.05] shadow-elevated"
            >
              {/* Ambient glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 blur-[60px] opacity-40 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(140,31,31,0.15) 0%, transparent 70%)' }}
                aria-hidden="true"
              />

              <div className="relative">
                <div className="maroon-line mx-auto mb-6" aria-hidden="true" />
                <h2 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mb-4 text-balance">
                  Punya Proyek atau Ide?
                </h2>
                <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
                  Mari diskusikan bersama dan wujudkan ide Anda menjadi karya nyata yang berdampak.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="https://wa.me/6285183011318"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="cta-whatsapp"
                    className="btn-primary px-8 py-3.5 hover:scale-[1.02] transition-transform"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Mulai via WhatsApp
                  </a>
                  <Link href="/contact" id="cta-form" className="btn-secondary px-8 py-3.5 hover:scale-[1.02] transition-transform">
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
