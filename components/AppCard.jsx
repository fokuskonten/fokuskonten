import Link from 'next/link'
import AppIcon from './AppIcon'

const categoryColors = {
  Game: 'bg-warm-50 text-warm-700',
  Edukasi: 'bg-brand-50 text-brand-700',
  Religi: 'bg-emerald-50 text-emerald-700',
  Bisnis: 'bg-blue-50 text-blue-700',
  Utilitas: 'bg-purple-50 text-purple-700',
  Kesehatan: 'bg-rose-50 text-rose-700',
  Produktivitas: 'bg-cyan-50 text-cyan-700',
  Hiburan: 'bg-pink-50 text-pink-700',
}

export default function AppCard({ app, index = 0 }) {
  const colorClass = categoryColors[app.category] || 'bg-neutral-50 text-neutral-700'

  return (
    <Link
      href={`/aplikasi/${app.id}`}
      className="group block bg-white rounded-2xl border border-neutral-200/60 shadow-card hover:shadow-float transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="p-5 sm:p-6">
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
