import Link from 'next/link'
import AppIcon from './AppIcon'

const categoryColors = {
  Game: 'bg-accent-50 text-accent-700 border-accent-200',
  Edukasi: 'bg-brand-50 text-brand-700 border-brand-200',
  Religi: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Bisnis: 'bg-blue-50 text-blue-700 border-blue-200',
  Utilitas: 'bg-purple-50 text-purple-700 border-purple-200',
  Kesehatan: 'bg-rose-50 text-rose-700 border-rose-200',
  Produktivitas: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  Hiburan: 'bg-pink-50 text-pink-700 border-pink-200',
}

export default function AppCard({ app, index = 0 }) {
  const colorClass = categoryColors[app.category] || 'bg-neutral-50 text-neutral-700'

  return (
    <Link
      href={`/aplikasi/${app.id}`}
      className="group relative block bg-white rounded-2xl border border-neutral-200/60 shadow-card hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-brand opacity-0 group-hover:opacity-[0.04] rounded-full -translate-y-1/2 translate-x-1/2 transition-opacity duration-500 pointer-events-none" />
      <div className="p-5 sm:p-6 relative">
        <div className="flex items-start gap-4">
          <AppIcon src={app.icon} name={app.name} size="large" />
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-semibold text-base text-neutral-900 group-hover:text-brand-600 transition-colors truncate">
              {app.name}
            </h3>
            <span className={`inline-block mt-1.5 text-[11px] font-display font-semibold px-2.5 py-0.5 rounded-full ${colorClass}`}>
              {app.category}
            </span>
            <p className="text-neutral-500 text-sm mt-2 leading-relaxed line-clamp-2">
              {app.description}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            v{app.version}
          </span>
          <span className="text-xs font-medium text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
            Detail &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}
