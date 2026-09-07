import Link from 'next/link'
import portfolioData from '@/content/portfolio/portfolio.json'

export const metadata = {
  title: 'Portofolio Karya & Proyek — FokusKonten',
  description: 'Portofolio proyek rekayasa software Android native, web platform, dan aset digital produksi FokusKonten.',
  alternates: { canonical: 'https://fokuskonten.my.id/portfolio' },
}

export default function PortfolioPage() {
  return (
    <section className="pt-28 sm:pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container-page max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="label-brand mb-3 inline-block">Karya &amp; Rekayasa</span>
          <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-3">
            Portofolio <span className="text-gradient-brand">Software &amp; Digital</span>
          </h1>
          <p className="text-neutral-500 text-sm sm:text-base max-w-xl mx-auto">
            Kumpulan proyek rekayasa aplikasi, solusi bisnis, dan produk digital resmi karya studio FokusKonten.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 font-semibold text-[11px]">
                    {item.category}
                  </span>
                  <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                    {item.status}
                  </span>
                </div>
                <h2 className="font-display font-bold text-lg text-neutral-900 mb-2 hover:text-indigo-600 transition-colors">
                  <Link href={'/portfolio/' + item.id}>
                    {item.title}
                  </Link>
                </h2>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-neutral-50 border border-neutral-200 text-neutral-600">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Tahun: {item.year}</span>
                <Link
                  href={'/portfolio/' + item.id}
                  className="font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
                >
                  Detail Proyek &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
