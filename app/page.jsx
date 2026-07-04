import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import portfolioData from '@/content/portfolio/portfolio.json'
import appsData from '@/content/apps/apps.json'
import postsData from '@/content/blog/posts.json'

/* ── SVG Illustrations per Service ──────── */
function SvgSmartphone() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
      <rect x="12" y="6" width="24" height="36" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <rect x="15" y="12" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <circle cx="24" cy="34" r="2.5" fill="currentColor" opacity="0.4" />
      <path d="M19 17l8 5-8 5V17z" fill="currentColor" opacity="0.5" />
      <path d="M30 10l2 2M30 14l2-2" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}

function SvgPalette() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="32" cy="16" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="16" cy="32" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="32" cy="32" r="2" fill="currentColor" opacity="0.2" />
      <path d="M12 12l4 4M36 12l-4 4M12 36l4-4M36 36l-4-4" stroke="currentColor" strokeWidth="1" opacity="0.25" />
    </svg>
  )
}

function SvgCamera() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
      <rect x="8" y="16" width="32" height="20" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="24" cy="26" r="7" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="24" cy="26" r="3" fill="currentColor" opacity="0.5" />
      <rect x="33" y="19" width="2.5" height="2" rx="0.5" fill="currentColor" opacity="0.4" />
      <path d="M20 12l2.5-3.5h3L28 12" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <circle cx="36" cy="26" r="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

function SvgSpeaker() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
      <path d="M16 18h-4a2 2 0 00-2 2v8a2 2 0 002 2h4l8 6V12l-8 6z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M32 16a12 12 0 010 16M36 12a16 16 0 010 24" stroke="currentColor" strokeWidth="1.8" opacity="0.5" />
      <path d="M36 12a16 16 0 010 24" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
    </svg>
  )
}

function SvgMonitor() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
      <rect x="6" y="8" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 36h20l-2 4H16l-2-4z" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5" />
      <line x1="24" y1="32" x2="24" y2="36" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <path d="M12 14l8 5-8 5V14z" fill="currentColor" opacity="0.4" />
      <line x1="28" y1="14" x2="34" y2="14" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="28" y1="18" x2="34" y2="18" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
    </svg>
  )
}

function SvgTree() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
      <rect x="22" y="32" width="4" height="10" rx="1" fill="currentColor" opacity="0.4" />
      <path d="M24 6L12 24h8l-6 8h20l-6-8h8L24 6z" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M24 6L12 24h8l-6 8h20l-6-8h8L24 6z" fill="currentColor" opacity="0.08" />
      <circle cx="21" cy="20" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="27" cy="18" r="1" fill="currentColor" opacity="0.3" />
      <line x1="24" y1="6" x2="24" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.15" />
    </svg>
  )
}

const services = [
  { svg: SvgSmartphone, title: 'Android Development', desc: '79 aplikasi Android native — Kotlin, Jetpack Compose, Firebase, AdMob, target SDK 36. Dari game, utilitas, bisnis, hingga edukasi.', number: '01' },
  { svg: SvgPalette, title: 'Desain Grafis & Percetakan', desc: 'CorelDraw, desain ID Card, banner, brosur, logo, kartu nama, dan kebutuhan percetakan lainnya.', number: '02' },
  { svg: SvgCamera, title: 'Fotografi & Videografi', desc: 'Foto produk, dokumentasi acara, video profil perusahaan, dan video senam hati. Sony kamera, lighting studio.', number: '03' },
  { svg: SvgSpeaker, title: 'Content Creator', desc: 'YouTube @fokuskonten, TikTok, Instagram — konten kreatif, video pendek, dan strategi media sosial.', number: '04' },
  { svg: SvgMonitor, title: 'Template Blogger', desc: 'Template blog SEO-friendly, mobile first, dark mode, responsive, dan optimized untuk platform Blogger.', number: '05' },
  { svg: SvgTree, title: 'Kerajinan Kayu / Kaila Mebel', desc: 'Produk kayu pinus, MDF, Jati Belanda — organizer meja, asbak rokok, furniture custom, dan handicraft unik.', number: '06' },
]

const featuredPortfolio = portfolioData.filter(p => p.featured).slice(0, 4)
const recentPosts = postsData.slice(0, 3)
const featuredApps = appsData.slice(0, 4)

const catStyle = {
  'Android Development':    { dot: '#8c1f1f', light: '#fdf4f4', mid: '#fbe5e5' },
  'Creative Digital':       { dot: '#ab3333', light: '#fdf2f2', mid: '#f7cece' },
  'Fotografi & Videografi': { dot: '#751919', light: '#fcf2f2', mid: '#f5d6d6' },
  'Content Creator':        { dot: '#5e1414', light: '#fbf0f0', mid: '#f3c8c8' },
}

const gradColors = ['from-[#8B1A1A] to-[#ab3333]', 'from-[#ab3333] to-[#751919]', 'from-[#751919] to-[#5e1414]', 'from-[#5e1414] to-[#8B1A1A]']
const gradBgs = ['#8B1A1A', '#ab3333', '#751919', '#5e1414']

/* ── Section Header ──────────────────────── */
function SectionHeader({ label, title, highlight, description, href }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
      <div>
        <span className="section-label">{label}</span>
        <h2 className="heading-xl text-3xl sm:text-4xl text-charcoal-900">
          {title} <span className="text-maroon-gradient">{highlight}</span>
        </h2>
        {description && <p className="text-charcoal-500 text-sm mt-2 max-w-md">{description}</p>}
      </div>
      {href && (
        <Link href={href} className="btn-ghost text-sm group self-start sm:self-auto hover:translate-x-1 transition-transform">
          {href === '/portfolio' ? 'Lihat Semua' : href === '/blog' ? 'Semua Artikel' : 'Semua Aplikasi'}
          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ══════════════════════════════════════
            HERO — Indonesian style (Niagahoster/Al Grafika inspired)
        ══════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-canvas-100" aria-label="Hero section">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20" style={{ background: 'radial-gradient(circle, rgba(140, 31, 31, 0.08) 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15" style={{ background: 'radial-gradient(circle, rgba(171, 51, 51, 0.06) 0%, transparent 70%)' }} />
          </div>

          <div className="relative z-10 container-max section px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* ── Left: Text ── */}
              <div className="max-w-xl">
                <div className="flex items-center gap-2.5 mb-6 animate-fade-up">
                  <span className="w-2 h-2 rounded-full bg-maroon-700 animate-pulse" aria-hidden="true" />
                  <span className="heading-label">Official Website · FokusKonten</span>
                </div>

                <h1 className="heading-xl text-[clamp(2.2rem,6vw,4rem)] text-balance text-charcoal-900 mb-5 animate-fade-up delay-100 leading-[1.08]">
                  Solusi Kreatif Digital{' '}
                  <span className="text-maroon-gradient">Terlengkap</span>
                  <br />
                  untuk Kebutuhan Anda
                </h1>

                <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed mb-3 animate-fade-up delay-200">
                  Satu tempat untuk semua kebutuhan kreatif digital Anda — dari
                  pengembangan aplikasi Android, desain grafis, fotografi & videografi,
                  hingga kerajinan kayu handmade.
                </p>
                <p className="text-charcoal-400 text-sm leading-relaxed mb-8 animate-fade-up delay-300">
                  Berpengalaman 5+ tahun dengan 79 aplikasi terpublikasi di Google Play Store
                  dan puluhan klien puas dari seluruh Indonesia.
                </p>

                <div className="flex flex-wrap items-center gap-3 animate-fade-up delay-400">
                  <Link href="/portfolio" className="btn-primary text-sm px-6 py-3 hover:scale-[1.02] transition-transform shadow-lg shadow-maroon-700/20">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
                    </svg>
                    Lihat Portfolio
                  </Link>
                  <a href="https://wa.me/6285183011318" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm px-6 py-3 hover:scale-[1.02] transition-transform border-maroon-700/20 text-maroon-700">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Konsultasi Gratis
                  </a>
                </div>

                {/* Trust bar */}
                <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-black/[0.05] animate-fade-up delay-500">
                  {[
                    { value: '79', label: 'Aplikasi Android' },
                    { value: '5+', label: 'Tahun Pengalaman' },
                    { value: '50+', label: 'Produk Kayu' },
                    { value: '30+', label: 'Klien Puas' },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="font-display font-bold text-2xl text-charcoal-900">{s.value}</div>
                      <div className="text-charcoal-500 text-[11px] mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right: Visual Illustration ── */}
              <div className="hidden lg:flex items-center justify-center animate-fade-up delay-200" aria-hidden="true">
                <div className="relative w-full max-w-md">
                  {/* Main composition */}
                  <div className="relative z-10 bg-white rounded-3xl border border-black/[0.06] shadow-elevated p-8">
                    {/* Service icons row */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-maroon-50 border border-maroon-100 flex items-center justify-center text-maroon-700">
                        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
                          <rect x="4" y="2" width="16" height="20" rx="3" />
                          <line x1="12" y1="17" x2="12" y2="18" />
                          <line x1="8" y1="5" x2="16" y2="5" opacity="0.4" />
                        </svg>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-maroon-50 border border-maroon-100 flex items-center justify-center text-maroon-700">
                        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="9" />
                          <circle cx="12" cy="12" r="4" opacity="0.5" />
                          <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
                        </svg>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-maroon-50 border border-maroon-100 flex items-center justify-center text-maroon-700">
                        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
                          <rect x="2" y="7" width="20" height="14" rx="4" />
                          <circle cx="12" cy="14" r="4" />
                          <path d="M16 3l-3 4h-2l-3-4" opacity="0.4" />
                        </svg>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-maroon-50 border border-maroon-100 flex items-center justify-center text-maroon-700">
                        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 2L6 12h4l-2 8 8-12h-4l4-8-8 10h4l-2 6" />
                        </svg>
                      </div>
                    </div>

                    {/* Stats mini card */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-canvas-100 rounded-xl p-4 text-center border border-black/[0.04]">
                        <div className="font-display font-bold text-2xl text-maroon-700">79</div>
                        <div className="text-charcoal-500 text-[10px]">Aplikasi di Play Store</div>
                      </div>
                      <div className="bg-canvas-100 rounded-xl p-4 text-center border border-black/[0.04]">
                        <div className="font-display font-bold text-2xl text-maroon-700">6</div>
                        <div className="text-charcoal-500 text-[10px]">Bidang Layanan</div>
                      </div>
                    </div>

                    {/* Rating / Trust */}
                    <div className="flex items-center justify-center gap-2 text-xs text-charcoal-500 bg-maroon-50/50 rounded-xl py-3 px-4 border border-maroon-100/50">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>Terpercaya — 5+ tahun melayani klien di Indonesia</span>
                    </div>
                  </div>

                  {/* Decorative element */}
                  <div className="absolute -top-3 -right-3 w-24 h-24 rounded-full bg-maroon-700/[0.04] blur-xl pointer-events-none" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-maroon-700/[0.03] blur-xl pointer-events-none" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SERVICES — with unique SVG illustrations
        ══════════════════════════════════════ */}
        <section className="section border-t border-black/[0.04] bg-white" aria-label="Layanan">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Layanan" title="Apa yang" highlight="FokusKonten tawarkan?" description="Enam bidang layanan — dari pembangunan aplikasi hingga kerajinan kayu handmade." />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((s, i) => {
                const Icon = s.svg
                return (
                  <div key={i} className="group relative p-8 lg:p-10 bg-canvas-50 rounded-2xl border border-black/[0.05] shadow-mature hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none" aria-hidden="true">
                      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-maroon-700 blur-2xl" />
                    </div>
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-maroon-700 transition-colors duration-300 group-hover:bg-maroon-700 group-hover:text-white" style={{ background: 'rgba(140,31,31,0.06)', border: '1px solid rgba(140,31,31,0.12)' }}>
                        <Icon />
                      </div>
                      <span className="font-display font-bold text-4xl text-charcoal-200 group-hover:text-maroon-100 transition-colors">{s.number}</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-charcoal-900 mb-2 group-hover:text-maroon-700 transition-colors duration-200">{s.title}</h3>
                    <p className="text-charcoal-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PORTFOLIO — visual gradient cards
        ══════════════════════════════════════ */}
        <section className="section border-t border-black/[0.04]" aria-label="Portfolio unggulan">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Portfolio" title="Karya" highlight="Pilihan" href="/portfolio" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredPortfolio.map((item, i) => {
                const cs = catStyle[item.category] || { dot: '#8c1f1f', light: '#fdf4f4', mid: '#fbe5e5' }
                return (
                  <Link key={item.id} href={`/portfolio/${item.id}`} className="group block rounded-2xl overflow-hidden bg-white border border-black/[0.05] shadow-mature hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                    <div className="h-2" style={{ background: `linear-gradient(90deg, ${cs.dot}, ${cs.mid})` }} />
                    <div className="p-7">
                      <div className="flex items-center gap-2 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: cs.dot }} aria-hidden="true" />
                        <span className="text-charcoal-500 text-xs font-display tracking-wide">{item.category}</span>
                        <span className="ml-auto text-charcoal-400 text-xs">{item.year}</span>
                      </div>
                      <h3 className="font-display font-semibold text-xl text-charcoal-900 mb-3 group-hover:text-maroon-700 transition-colors duration-200">{item.title}</h3>
                      <p className="text-charcoal-500 text-sm leading-relaxed mb-6">{item.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            BLOG — visual category-striped cards
        ══════════════════════════════════════ */}
        <section className="section border-t border-black/[0.04] bg-white" aria-label="Artikel terbaru">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Blog" title="Artikel" highlight="Terbaru" href="/blog" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {recentPosts.map((post, i) => {
                const colors = [
                  { bar: '#8c1f1f', bg: '#fdf4f4', txt: '#8c1f1f' },
                  { bar: '#ab3333', bg: '#fdf2f2', txt: '#ab3333' },
                  { bar: '#751919', bg: '#fcf2f2', txt: '#751919' },
                ][i]
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block rounded-2xl overflow-hidden bg-canvas-50 border border-black/[0.05] shadow-mature hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                    <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${colors.bar}, ${colors.txt}55)` }} />
                    <div className="p-6">
                      <span className="inline-block text-xs font-display font-semibold px-2.5 py-1 rounded-full mb-3" style={{ background: colors.bg, color: colors.txt }}>
                        {post.category}
                      </span>
                      <h3 className="font-display font-semibold text-charcoal-900 group-hover:text-maroon-700 transition-colors duration-200 text-sm leading-snug mb-3">
                        {post.title}
                      </h3>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-charcoal-400 text-xs">{post.readTime}</span>
                        <svg className="w-4 h-4 text-charcoal-400 group-hover:text-maroon-700 group-hover:translate-x-0.5 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FEATURED APPS — gradient icon cards
        ══════════════════════════════════════ */}
        <section className="section border-t border-black/[0.04]" aria-label="Aplikasi unggulan">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Applications" title="Aplikasi" highlight="Unggulan" href="/applications" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredApps.map((app, i) => (
                <a key={app.id} href={`https://play.google.com/store/apps/details?id=${app.package}`} target="_blank" rel="noopener noreferrer" className="group p-6 bg-white rounded-2xl border border-black/[0.05] shadow-mature hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 font-display font-bold text-xl text-white bg-gradient-to-br ${gradColors[i % 4]}`}>
                    {app.name.charAt(0)}
                  </div>
                  <h3 className="font-display font-semibold text-charcoal-900 mb-1 group-hover:text-maroon-700 transition-colors">{app.name}</h3>
                  <p className="text-charcoal-500 text-xs mb-3">{app.category}</p>
                  <span className="text-charcoal-400 text-[11px] font-mono block truncate">{app.package}</span>
                  <div className="mt-3 flex items-center gap-1 text-maroon-700 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Lihat di Play Store</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WHY CHOOSE US
        ══════════════════════════════════════ */}
        <section className="section border-t border-black/[0.04] bg-white" aria-label="Mengapa memilih FokusKonten">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="section-label">Keunggulan</span>
              <h2 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Mengapa <span className="text-maroon-gradient">FokusKonten</span>?
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed">
                Lintas disiplin — dari coding hingga woodworking — semua dalam satu studio kreatif.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '📱', title: '79 Aplikasi Nyata', desc: 'Portofolio 79 aplikasi Android terpublikasi di Play Store dengan berbagai kategori dan target SDK 36.' },
                { icon: '⚡', title: 'AI-Assisted Development', desc: 'Proses pengembangan dipercepat dengan AI tools tanpa mengorbankan kualitas dan keamanan.' },
                { icon: '🪵', title: 'Multi-Disiplin Unik', desc: 'Gabungan skill digital kreatif dan kerajinan kayu handmade — solusi one-stop creative studio.' },
                { icon: '🎯', title: 'SEO & Mobile First', desc: 'Template Blogger dan website dioptimalkan untuk SEO, mobile-first, dan performa tinggi.' },
                { icon: '🤝', title: 'Konsultasi Gratis', desc: 'Diskusikan kebutuhan Anda via WhatsApp tanpa biaya. Tim merespon cepat dan solutif.' },
                { icon: '🔄', title: 'Support Berkelanjutan', desc: 'Dukungan maintenance, update, dan revisi untuk setiap proyek yang sudah selesai.' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-canvas-50 rounded-2xl border border-black/[0.05] hover:shadow-mature transition-all duration-300 hover:-translate-y-0.5">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-display font-semibold text-charcoal-900 mb-2">{item.title}</h3>
                  <p className="text-charcoal-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            TECHNOLOGY & WORKFLOW
        ══════════════════════════════════════ */}
        <section className="section border-t border-black/[0.04]" aria-label="Teknologi dan workflow">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="section-label">Teknologi</span>
              <h2 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Teknologi & <span className="text-maroon-gradient">Workflow</span>
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed">
                Kami menggunakan teknologi modern dan workflow yang teruji untuk hasil optimal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white rounded-2xl border border-black/[0.05] shadow-mature">
                <h3 className="font-display font-semibold text-xl text-charcoal-900 mb-6">Teknologi Utama</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Kotlin & Java', desc: 'Android Development' },
                    { name: 'Jetpack Compose', desc: 'Modern UI Toolkit' },
                    { name: 'Firebase & AdMob', desc: 'Backend & Monetization' },
                    { name: 'Next.js & React', desc: 'Web Development' },
                    { name: 'Adobe Creative Suite', desc: 'Design & Editing' },
                    { name: 'CorelDraw', desc: 'Desain Grafis & Percetakan' },
                    { name: 'Mesin Kayu (Circular Saw, Router)', desc: 'Woodworking' },
                  ].map((tech, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-maroon-700" />
                      <div>
                        <div className="font-medium text-charcoal-900 text-sm">{tech.name}</div>
                        <div className="text-charcoal-400 text-xs">{tech.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-canvas-50 rounded-2xl border border-black/[0.05] shadow-mature">
                <h3 className="font-display font-semibold text-xl text-charcoal-900 mb-6">Workflow Kami</h3>
                <div className="space-y-4">
                  {[
                    { step: '01', title: 'Discovery', desc: 'Memahami kebutuhan dan tujuan proyek' },
                    { step: '02', title: 'Planning', desc: 'Merencanakan arsitektur dan desain' },
                    { step: '03', title: 'Development', desc: 'Implementasi dengan AI-assisted coding' },
                    { step: '04', title: 'Testing', desc: 'QA dan testing menyeluruh' },
                    { step: '05', title: 'Deployment', desc: 'Publish dan launch' },
                    { step: '06', title: 'Maintenance', desc: 'Support dan improvement' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="font-display font-bold text-maroon-700">{item.step}</span>
                      <div>
                        <div className="font-medium text-charcoal-900 text-sm">{item.title}</div>
                        <div className="text-charcoal-400 text-xs">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FAQ
        ══════════════════════════════════════ */}
        <section className="section border-t border-black/[0.04] bg-white" aria-label="FAQ">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="section-label">FAQ</span>
              <h2 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Pertanyaan <span className="text-maroon-gradient">Umum</span>
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed">
                Jawaban untuk pertanyaan yang sering diajukan tentang layanan FokusKonten.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                { q: 'Apa saja layanan yang ditawarkan FokusKonten?', a: 'FokusKonten menawarkan 6 bidang layanan: Android Development (79 aplikasi), Desain Grafis & Percetakan, Fotografi & Videografi, Content Creator (YouTube @fokuskonten), Template Blogger SEO, dan Kerajinan Kayu / Kaila Mebel.' },
                { q: 'Bagaimana cara memesan produk atau layanan?', a: 'Hubungi kami langsung via WhatsApp di +62 851-8301-1318. Konsultasi awal gratis — diskusikan kebutuhan Anda, dan kami akan memberikan proposal serta estimasi waktu pengerjaan.' },
                { q: 'Apakah aplikasi Android FokusKonten gratis?', a: 'Beberapa aplikasi gratis dengan dukungan AdMob, sementara aplikasi bisnis (seperti Apotek Pro, Bangunan Pro, dll) bersifat berbayar. Semua aplikasi dapat diunduh di Google Play Store.' },
              ].map((item, i) => (
                <details key={i} className="group p-6 bg-canvas-50 rounded-2xl border border-black/[0.05] shadow-mature open:shadow-elevated transition-all duration-300 cursor-pointer">
                  <summary className="font-display font-semibold text-charcoal-900 list-none flex items-center justify-between gap-4">
                    {item.q}
                    <svg className="w-4 h-4 text-charcoal-400 shrink-0 group-open:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="text-charcoal-500 text-sm leading-relaxed mt-3 pt-3 border-t border-black/[0.04]">{item.a}</p>
                </details>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-8 text-center">
              <Link href="/faq" className="btn-secondary inline-flex items-center gap-2 text-sm">
                Lihat Semua FAQ
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            NEWSLETTER
        ══════════════════════════════════════ */}
        <section className="section border-t border-black/[0.04]" aria-label="Newsletter">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto p-10 rounded-2xl bg-maroon-50 border border-maroon-100 text-center">
              <h2 className="font-display font-semibold text-2xl text-charcoal-900 mb-3">
                Berlangganan Newsletter
              </h2>
              <p className="text-charcoal-600 text-sm leading-relaxed mb-6">
                Dapatkan update terbaru tentang artikel, aplikasi, dan promosi eksklusif langsung ke inbox Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input type="email" placeholder="Email Anda" className="flex-1 px-4 py-3 rounded-xl border border-black/[0.08] bg-white text-charcoal-900 text-sm focus:outline-none focus:border-maroon-700 transition-colors" />
                <button className="btn-primary px-6 py-3 text-sm whitespace-nowrap">
                  Berlangganan
                </button>
              </div>
              <p className="text-charcoal-400 text-xs mt-4">
                Kami menghargai privasi Anda. No spam, unsubscribe kapan saja.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────── */}
        <section className="section border-t border-black/[0.04] bg-white" aria-label="Call to action">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl p-10 sm:p-16 relative overflow-hidden text-center bg-white border border-black/[0.05] shadow-elevated">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 blur-[60px] opacity-40 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(140,31,31,0.15) 0%, transparent 70%)' }} aria-hidden="true" />

              <div className="relative">
                <div className="maroon-line mx-auto mb-6" aria-hidden="true" />
                <h2 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mb-4 text-balance">
                  Punya Proyek atau Ide?
                </h2>
                <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
                  Mari diskusikan bersama dan wujudkan ide Anda menjadi karya nyata yang berdampak.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a href="https://wa.me/6285183011318" target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-3.5 hover:scale-[1.02] transition-transform">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Mulai via WhatsApp
                  </a>
                  <Link href="/contact" className="btn-secondary px-8 py-3.5 hover:scale-[1.02] transition-transform">
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
