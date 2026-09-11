import Link from 'next/link'
import { notFound } from 'next/navigation'
import portfolioData from '@/content/portfolio/portfolio.json'

export async function generateStaticParams() {
  return portfolioData.map((item) => ({ id: item.id }))
}

export async function generateMetadata({ params }) {
  const item = portfolioData.find((p) => p.id === params.id)
  if (!item) return {}
  return {
    title: `${item.title} — Portofolio FokusKonten`,
    description: item.description,
    alternates: { canonical: `https://fokuskonten.my.id/portfolio/${item.id}` },
  }
}

export default function PortfolioDetailPage({ params }) {
  const item = portfolioData.find((p) => p.id === params.id)
  if (!item) notFound()

  return (
    <section className="pt-28 sm:pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container-page max-w-3xl mx-auto px-4 sm:px-6">
        {/* Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/portfolio" className="hover:text-indigo-600 transition-colors">Portfolio</Link>
          <span>/</span>
          <span className="text-neutral-800 truncate max-w-[200px]">{item.title}</span>
        </div>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 font-semibold text-xs">
              {item.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-xs">
              {item.status}
            </span>
          </div>
          <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-3">
            {item.title}
          </h1>
          <p className="text-neutral-400 text-xs">
            Diproduksi tahun {item.year} oleh FokusKonten
          </p>
        </header>

        <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm mb-8 space-y-6">
          <div>
            <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-2">
              Ikhtisar Proyek
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              {item.description}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-2">
              Teknologi &amp; Spesifikasi
            </h2>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-neutral-900 text-sm">
              Tertarik dengan solusi serupa?
            </h3>
            <p className="text-neutral-500 text-xs">
              Kami melayani jasa pengembangan aplikasi Android &amp; aset digital profesional.
            </p>
          </div>
          <a
            href="https://wa.me/6285183011318"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all shrink-0"
          >
            Konsultasi WhatsApp
          </a>
        </div>

        <div className="mt-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            &larr; Kembali ke Portfolio
          </Link>
        </div>
      </div>
    </section>
  )
}
