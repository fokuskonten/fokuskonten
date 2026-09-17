import Link from 'next/link'
import EbookCover3D from './EbookCover3D'

/**
 * EbookRelatedGrid.jsx — Rekomendasi 4 E-Book Terkait dalam Silo Kategori Serupa
 */
export default function EbookRelatedGrid({ items = [], categoryName = '', categorySlug = '' }) {
  if (!items || items.length === 0) return null

  // Batasi maksimal 4 rekomendasi terbaik
  const displayItems = items.slice(0, 4)

  return (
    <section aria-labelledby="related-ebook-heading" className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 id="related-ebook-heading" className="font-extrabold text-base sm:text-lg text-neutral-950 tracking-tight font-sans">
          Rekomendasi Terkait {categoryName ? `di ${categoryName}` : ''}
        </h3>
        {categorySlug && (
          <Link
            href={`/ebook/${categorySlug}/`}
            className="text-xs font-mono font-bold text-neutral-600 hover:text-neutral-950 underline transition-colors"
          >
            Lihat Semua &rarr;
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {displayItems.map((item) => {
          const itemUrl = `/ebook/${item.categorySlug || categorySlug}/${item.slug || item.u}/`
          return (
            <Link
              key={item.sku || item.s}
              href={itemUrl}
              className="group bg-white text-neutral-900 border border-neutral-200/80 dark:bg-white dark:text-neutral-900 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:border-neutral-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <EbookCover3D
                  coverImage={item.coverImage}
                  title={item.title || item.t}
                  sku={item.sku || item.s}
                  category={categoryName}
                  variant="fullframe"
                  size="full"
                />
                <div className="p-3 sm:p-3.5 pb-2">
                  <h4 className="font-extrabold text-xs sm:text-sm text-neutral-950 leading-snug line-clamp-2 group-hover:underline">
                    {item.title || item.t}
                  </h4>
                  {(item.author || item.a) && (
                    <p className="text-[11px] text-neutral-500 line-clamp-1 mt-1 font-serif">
                      {item.author || item.a}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-3 sm:p-3.5 pt-0">
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>{item.pages ? `${item.pages} Hal` : 'PDF Lengkap'}</span>
                  <span className="font-bold text-neutral-900 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Baca</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
