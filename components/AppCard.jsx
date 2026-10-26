import Link from 'next/link'
import AppIcon from './AppIcon'

export default function AppCard({ app, index = 0 }) {
  return (
    <Link
      href={`/aplikasi/${app.id}`}
      className="group relative block bg-white rounded-3xl border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:border-neutral-400 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="p-6 sm:p-7 relative">
        <div className="flex items-start gap-4">
          <AppIcon src={app.icon} name={app.name} size="large" />
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-semibold text-lg text-neutral-900 group-hover:text-black transition-colors truncate">
              {app.name}
            </h3>
            <span className="inline-block mt-1.5 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-300">
              {app.category}
            </span>
            <p className="text-neutral-600 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-2 font-sans">
              {app.description}
            </p>
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-xs font-mono text-neutral-400">
            v{app.version}
          </span>
          <span className="text-xs font-display font-semibold text-neutral-950 group-hover:underline">
            Lihat Detail &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}

