import { notFound } from 'next/navigation'
import Link from 'next/link'
import appsData from '@/content/apps/apps.json'
import { portfolioData } from '@/content/apps/portfolioData'
import Breadcrumb from '@/components/Breadcrumb'

export async function generateStaticParams() {
  return appsData.map((app) => ({ id: app.id }))
}

export async function generateMetadata({ params }) {
  const app = appsData.find((a) => a.id === params.id)
  const portfolio = portfolioData[params.id]
  if (!app && !portfolio) return {}

  const name = portfolio?.name || app?.name
  const desc = portfolio?.overview || app?.description

  return {
    title: `${name} — Portofolio Produk FokusKonten`,
    description: desc,
    alternates: { canonical: `https://fokuskonten.my.id/aplikasi/${params.id}` },
    openGraph: {
      title: `${name} — Produk Resmi FokusKonten`,
      description: desc,
      images: [{ url: portfolio?.icon || app?.icon || '/logo.webp', width: 512, height: 512, alt: name }],
    },
  }
}

export default function AppDetailPage({ params }) {
  const app = appsData.find((a) => a.id === params.id)
  const portfolio = portfolioData[params.id] || app

  if (!app && !portfolio) notFound()

  const otherProducts = appsData
    .filter((a) => a.id !== params.id)
    .slice(0, 4)

  const cta = portfolio?.cta || {
    primary: {
      label: 'Download di Google Play',
      href: `https://play.google.com/store/apps/details?id=${app?.package}`,
      type: 'playstore',
    },
    secondary: {
      label: 'Konsultasi WhatsApp',
      href: 'https://wa.me/6285183011318',
      type: 'whatsapp',
    },
  }

  return (
    <>
      {/* ── HERO HEADER SECTION ───────────────────────────────────────── */}
      <section className="pt-32 pb-14 bg-gradient-to-b from-neutral-50 via-white to-white border-b border-neutral-100">
        <div className="container-page">
          <Breadcrumb
            items={[
              { href: '/aplikasi', label: 'Produk & Aplikasi' },
              { label: portfolio.name },
            ]}
          />

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 pt-4">
            <img
              src={portfolio.icon}
              alt={portfolio.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-contain bg-neutral-50 p-1.5 border border-neutral-200/80 shadow-md shrink-0"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-display font-semibold bg-neutral-950 text-white">
                  {portfolio.badge || portfolio.category}
                </span>
                <span className="text-xs text-neutral-500 font-medium">
                  {portfolio.category}
                </span>
                {portfolio.specs?.platform && (
                  <span className="text-xs text-neutral-400 font-mono">
                    {portfolio.specs.platform}
                  </span>
                )}
              </div>

              <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-2">
                {portfolio.name}
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed max-w-2xl">
                {portfolio.tagline || portfolio.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT GRID ─────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* LEFT 2 COLS: OVERVIEW, HIGHLIGHTS, FEATURES & ADVANTAGES */}
            <div className="lg:col-span-2 space-y-12">
              {/* Product Overview */}
              <div>
                {portfolio.headerImage && (
                  <div className="relative mb-8 rounded-3xl overflow-hidden border border-neutral-200/80 shadow-card bg-black group">
                    <img
                      src={portfolio.headerImage}
                      alt={`${portfolio.name} Banner`}
                      className="w-full h-auto object-cover max-h-[360px]"
                    />

                    {portfolio.bannerOverlay && (
                      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                        <div className="max-w-xs sm:max-w-sm md:max-w-md">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-display font-semibold text-white/90 mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            FokusKonten • {portfolio.badge || 'Software Resmi'}
                          </div>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white tracking-tight mb-2 drop-shadow-md">
                            {portfolio.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed drop-shadow line-clamp-2 mb-4">
                            {portfolio.tagline || portfolio.overview}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {portfolio.specs?.platform && (
                              <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-neutral-700/60 text-[10px] sm:text-[11px] font-mono text-neutral-300">
                                {portfolio.specs.platform}
                              </span>
                            )}
                            {portfolio.specs?.format && (
                              <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-neutral-700/60 text-[10px] sm:text-[11px] font-mono text-neutral-300">
                                {portfolio.specs.format}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <h2 className="heading-lg text-2xl text-neutral-900 mb-4">
                  Tentang Produk
                </h2>
                <p className="text-neutral-600 text-base leading-relaxed mb-6">
                  {portfolio.overview || portfolio.description}
                </p>

                {portfolio.targetUsers && (
                  <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200/60">
                    <span className="text-xs font-display font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                      Target Pengguna
                    </span>
                    <p className="text-sm font-medium text-neutral-800">
                      {portfolio.targetUsers}
                    </p>
                  </div>
                )}
              </div>

              {/* Highlights Checkmarks */}
              {portfolio.highlights && portfolio.highlights.length > 0 && (
                <div>
                  <h3 className="heading-md text-xl text-neutral-900 mb-4">
                    Poin Utama Keunggulan
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {portfolio.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 text-sm font-medium text-neutral-800"
                      >
                        <svg
                          className="w-5 h-5 text-emerald-600 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Media Screenshots Showcase (Adaptif jika data tersedia) */}
              {portfolio.screenshots && portfolio.screenshots.length > 0 && (
                <div>
                  <h3 className="heading-md text-xl text-neutral-900 mb-5">
                    Tangkapan Layar &amp; Antarmuka Aplikasi
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {portfolio.screenshots.map((img, i) => (
                      <div
                        key={i}
                        className="rounded-2xl overflow-hidden border border-neutral-200/80 shadow-sm bg-neutral-50 group hover:shadow-md transition-all"
                      >
                        <img
                          src={typeof img === 'string' ? img : img.url}
                          alt={typeof img === 'string' ? `${portfolio.name} screenshot` : img.caption || portfolio.name}
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {typeof img === 'object' && img.caption && (
                          <p className="text-xs text-neutral-600 p-3 bg-white border-t border-neutral-100 font-medium">
                            {img.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Walkthrough (Adaptif jika video tersedia) */}
              {portfolio.video && (
                <div>
                  <h3 className="heading-md text-xl text-neutral-900 mb-5">
                    Video Walkthrough &amp; Demo
                  </h3>

                  {portfolio.video.includes('youtube') || portfolio.video.includes('youtu.be') ? (
                    portfolio.specs?.format?.includes('Desktop') || portfolio.category?.includes('Desktop') ? (
                      /* YOUTUBE DESKTOP: Widescreen */
                      <div className="w-full rounded-3xl overflow-hidden border border-neutral-200/80 shadow-card bg-black aspect-video">
                        <iframe
                          src={portfolio.video.replace('shorts/', 'embed/').replace('watch?v=', 'embed/').split('?')[0]}
                          title={`${portfolio.name} Video Demo`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      /* YOUTUBE MOBILE SHORTS: Vertical 9:16 Frame */
                      <div className="flex justify-center py-4">
                        <div className="w-full max-w-[310px] sm:max-w-[330px] aspect-[9/16] rounded-[36px] overflow-hidden border border-neutral-200/80 shadow-2xl shadow-neutral-950/20 bg-black">
                          <iframe
                            src={portfolio.video.replace('shorts/', 'embed/').replace('watch?v=', 'embed/').split('?')[0]}
                            title={`${portfolio.name} Video Demo`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )
                  ) : portfolio.specs?.format?.includes('Desktop') || portfolio.category?.includes('Desktop') ? (
                    /* DESKTOP SOFTWARE: Widescreen Window */
                    <div className="w-full rounded-3xl overflow-hidden border border-neutral-200/80 shadow-card bg-neutral-950 p-2 sm:p-3">
                      <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-800 mb-2">
                        <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                        <span className="text-[11px] text-neutral-400 font-mono ml-2 truncate">
                          {portfolio.name} — Windows Desktop
                        </span>
                      </div>
                      <video
                        src={portfolio.video}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-auto rounded-2xl"
                      />
                    </div>
                  ) : portfolio.videoFrame === 'phone' ? (
                    /* MOBILE APPS DENGAN FRAME HP KUSTOM */
                    <div className="flex justify-center py-4">
                      <div className="relative w-full max-w-[300px] sm:max-w-[320px] rounded-[44px] p-3 bg-neutral-950 border-[5px] border-neutral-800 shadow-2xl shadow-black/30">
                        {/* Camera Punch-Hole Notch */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-neutral-900 rounded-full z-10 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-neutral-800" />
                        </div>

                        {/* Phone Screen with Video */}
                        <div className="overflow-hidden rounded-[34px] bg-black aspect-[9/19.5] flex items-center justify-center">
                          <video
                            src={portfolio.video}
                            controls
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* MOBILE APPS: Video dengan Soft Floating Shadow alami */
                    <div className="flex justify-center py-4">
                      <video
                        src={portfolio.video}
                        controls
                        playsInline
                        preload="metadata"
                        className="max-h-[580px] w-auto max-w-full rounded-[36px] shadow-2xl shadow-neutral-950/20"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Core Features Detailed Grid */}
              {portfolio.features && portfolio.features.length > 0 && (
                <div>
                  <h3 className="heading-md text-xl text-neutral-900 mb-5">
                    Fitur &amp; Kemampuan Lengkap
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {portfolio.features.map((feat, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-sm hover:shadow-md hover:border-neutral-400 transition-all"
                      >
                        <h4 className="font-display font-semibold text-base text-neutral-900 mb-1.5 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-neutral-950 shrink-0" />
                          {feat.title}
                        </h4>
                        <p className="text-neutral-600 text-sm leading-relaxed pl-4">
                          {feat.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Competitive Advantages */}
              {portfolio.advantages && portfolio.advantages.length > 0 && (
                <div>
                  <h3 className="heading-md text-xl text-neutral-900 mb-5">
                    Mengapa Memilih {portfolio.name}?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {portfolio.advantages.map((adv, i) => (
                      <div
                        key={i}
                        className="bg-neutral-950 text-white rounded-2xl p-6 flex flex-col justify-between"
                      >
                        <div>
                          <span className="font-display font-bold text-lg text-neutral-400 block mb-2">
                            0{i + 1}
                          </span>
                          <h4 className="font-display font-semibold text-sm text-white mb-2">
                            {adv.title}
                          </h4>
                          <p className="text-neutral-400 text-xs leading-relaxed">
                            {adv.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specifications */}
              {portfolio.specs && (
                <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200/80">
                  <h3 className="font-display font-semibold text-base text-neutral-900 mb-4">
                    Spesifikasi &amp; Kompatibilitas
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    {Object.entries(portfolio.specs).map(([key, val]) => (
                      <div key={key}>
                        <span className="text-neutral-400 uppercase text-[11px] font-semibold block tracking-wider">
                          {key}
                        </span>
                        <span className="font-medium text-neutral-800 mt-0.5 block">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COL: STICKY ACTION CARD & COMMUNITY */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-card p-6 sm:p-7">
                  <h3 className="font-display font-semibold text-base text-neutral-900 mb-2">
                    Akses &amp; Layanan Produk
                  </h3>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-6">
                    Gunakan produk resmi ini untuk mendukung operasional harian Anda atau hubungi tim pengembang untuk konsultasi langsung.
                  </p>

                  <div className="space-y-3">
                    {cta.primary?.type === 'playstore' && (
                      <a
                        href={cta.primary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-display font-semibold text-xs text-white bg-black hover:bg-neutral-800 shadow-md shadow-black/20 transition-all"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M1.326 1.973C1.256 2.294 1.22 2.634 1.22 3v18c0 .366.036.706.106 1.027L12 12 1.326 1.973zm.905-.642l11.17 10.736L23.723 3.38c-.443-.269-1-.43-1.607-.43H4.202c-.717 0-1.356.248-1.971.38zM23.66 4.797L13.334 15.05l5.914 5.686 4.02-3.878c.442-.374.732-.932.732-1.558V6.19c0-.515-.121-1-.34-1.394zM12 13.14L1.628 22.21A3.573 3.573 0 004.202 23h15.596c.46 0 .893-.112 1.28-.31L18.87 19.87 12 13.14z"/>
                        </svg>
                        {cta.primary.label}
                      </a>
                    )}

                    {cta.primary?.type === 'external' && (
                      <a
                        href={cta.primary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-display font-semibold text-xs text-white bg-black hover:bg-neutral-800 shadow-md shadow-black/20 transition-all"
                      >
                        {cta.primary.label}
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}

                    {cta.primary?.type === 'whatsapp' && (
                      <a
                        href={cta.primary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-display font-semibold text-xs text-white bg-black hover:bg-neutral-800 shadow-md shadow-black/20 transition-all"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        {cta.primary.label}
                      </a>
                    )}

                    {cta.secondary && (
                      <a
                        href={cta.secondary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-display font-semibold text-xs text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-colors"
                      >
                        {cta.secondary.label}
                      </a>
                    )}
                  </div>

                  <div className="mt-6 pt-5 border-t border-neutral-100 space-y-3 text-xs">
                    <a
                      href="https://wa.me/6285183011318"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-neutral-600 hover:text-black font-medium transition-colors"
                    >
                      <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Konsultasi Teknis Pengembang
                    </a>

                    {portfolio.privacyPolicy && (
                      <Link
                        href={portfolio.privacyPolicy}
                        className="flex items-center gap-2 text-neutral-500 hover:text-black transition-colors"
                      >
                        <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Kebijakan Privasi Aplikasi
                      </Link>
                    )}
                  </div>
                </div>

                {/* Other Released Products */}
                {otherProducts.length > 0 && (
                  <div className="bg-neutral-50 rounded-3xl border border-neutral-200/80 p-6">
                    <h4 className="font-display font-semibold text-sm text-neutral-900 mb-4">
                      Produk Rilis Lainnya
                    </h4>
                    <div className="space-y-3">
                      {otherProducts.map((op) => (
                        <Link
                          key={op.id}
                          href={`/aplikasi/${op.id}`}
                          className="flex items-center gap-3 p-2 rounded-xl bg-white border border-neutral-100 hover:border-neutral-300 transition-all group"
                        >
                          <img
                            src={op.icon}
                            alt={op.name}
                            className="w-9 h-9 rounded-xl object-contain bg-neutral-50 p-1 border border-neutral-100 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-display font-semibold text-xs text-neutral-900 group-hover:text-black truncate block">
                              {op.name}
                            </span>
                            <span className="text-[11px] text-neutral-400">
                              {op.category}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
