import Link from 'next/link'
import AppIcon from './AppIcon'

const landingUrlMap = {
  apotekpro: '/landpage/apotekpro/',
  tokokelontongpro: '/landpage/tokokelontongpro/',
  bacaquran: '/landpage/bacaquran/',
  gamepuzzle: '/landpage/2048puzzle/',
  whatsappcrm: '/landpage/whatsappcrm/',
  jumptools: '/landpage/jumptools/',
  reimage: '/landpage/reimage/',
}

export default function AppCard({ app, index = 0 }) {
  const landingHref = landingUrlMap[app.id] || `/landpage/${app.id}/`
  const techHref = `/aplikasi/${app.id}`

  return (
    <div
      data-reveal
      data-spotlight
      style={{ '--reveal-i': index }}
      className="group relative bg-white rounded-3xl border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:border-neutral-400 transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
    >
      <div className="p-6 sm:p-7 relative">
        <div className="flex items-start gap-4">
          <Link href={landingHref} className="shrink-0 block">
            <AppIcon src={app.icon} name={app.name} size="large" />
          </Link>
          <div className="min-w-0 flex-1">
            <Link href={landingHref} className="block group/title">
              <h3 className="font-display font-semibold text-lg text-neutral-900 group-hover/title:text-black group-hover/title:underline transition-colors truncate">
                {app.name}
              </h3>
            </Link>
            <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
              <span className="inline-block text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-300">
                {app.category}
              </span>
              {app.id === 'reimage' && (
                <span className="inline-block text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-neutral-900 text-white">
                  Rilis Resmi v2.1.0
                </span>
              )}
            </div>
            <p className="text-neutral-600 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-2 font-sans">
              {app.description}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-neutral-100 flex items-center justify-between gap-3 bg-neutral-50/50">
        <Link
          href={techHref}
          className="text-[11px] font-mono text-neutral-400 hover:text-neutral-900 hover:underline transition-colors"
          title="Lihat lembar spesifikasi teknis dan kepatuhan Play Store"
        >
          v{app.version} • Spesifikasi
        </Link>
        <Link
          href={landingHref}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-display font-semibold text-xs text-white bg-black hover:bg-neutral-800 shadow-sm transition-all"
        >
          <span>Lihat produk</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
