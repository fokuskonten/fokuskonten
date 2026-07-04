import appsData from '@/content/apps/apps.json'
import AppCard from '@/components/AppCard'
import Breadcrumb from '@/components/Breadcrumb'
import SectionHeading from '@/components/SectionHeading'
import SkeletonCard from '@/components/SkeletonCard'

export const metadata = {
  title: 'Semua Aplikasi Android',
  description: 'Koleksi lengkap 79+ aplikasi Android FokusKonten. Temukan game, edukasi, utilitas, kesehatan, bisnis, dan aplikasi religi di Google Play Store.',
  alternates: { canonical: 'https://fokuskonten.my.id/aplikasi' },
}

const categoryData = {
  Game: { emoji: '🎮', color: 'bg-warm-50 text-warm-700 border-warm-200' },
  Edukasi: { emoji: '📚', color: 'bg-brand-50 text-brand-700 border-brand-200' },
  Utilitas: { emoji: '🔧', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  Bisnis: { emoji: '💼', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  Religi: { emoji: '🕌', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  Kesehatan: { emoji: '❤️', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  Produktivitas: { emoji: '📋', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  Hiburan: { emoji: '🎵', color: 'bg-pink-50 text-pink-700 border-pink-200' },
}

export default function AppsPage() {
  return (
    <>
      <section className="pt-28 pb-8">
        <div className="container-page">
          <Breadcrumb items={[{ label: 'Aplikasi' }]} />
          <SectionHeading
            label="Koleksi Aplikasi"
            title="Semua Aplikasi FokusKonten"
            description={`${appsData.length} aplikasi Android siap unduh di Google Play Store.`}
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <div className="flex flex-wrap gap-2 mb-8">
            {Object.entries(categoryData).map(([cat, style]) => {
              const count = appsData.filter(a => a.category === cat).length
              return (
                <span
                  key={cat}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold border ${style.color}`}
                >
                  <span>{style.emoji}</span>
                  {cat}
                  <span className="opacity-60">({count})</span>
                </span>
              )
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {appsData.map((app, i) => (
              <AppCard key={app.id} app={app} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
