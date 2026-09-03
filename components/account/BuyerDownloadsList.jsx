'use client'

import Link from 'next/link'
import { formatDate } from '@/lib/formatters'
import { createProductSlug } from '@/app/toko-digital/slugHelper'

export default function BuyerDownloadsList({ products = [] }) {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-8 sm:p-12 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-2xl text-neutral-400">
          📦
        </div>
        <h3 className="font-display font-bold text-lg text-neutral-900 mb-1">
          Belum Ada Aset Digital
        </h3>
        <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
          Anda belum memiliki file master desain yang dibeli dengan akun ini. Jelajahi ribuan master desain kaos, vektor, dan grafis siap pakai.
        </p>
        <Link
          href="/toko-digital/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-sm shadow-sm transition-all"
        >
          <span>Jelajahi Katalog Toko Digital</span>
          <span>→</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-extrabold text-lg sm:text-xl text-neutral-950 tracking-tight">
          Brankas File & Unduhan ({products.length})
        </h3>
        <span className="text-xs text-neutral-500 font-medium">
          Akses Google Drive Permanen
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {products.map((item) => {
          const productSlug = createProductSlug(item.sku, item.title)
          const driveUrl = item.driveLink && item.driveLink !== '#' ? item.driveLink : null

          return (
            <div
              key={item.sku}
              className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)] transition-all flex flex-col justify-between gap-4"
            >
              <div className="flex gap-4">
                {/* Thumbnail Image */}
                <Link
                  href={`/toko-digital/${productSlug}/`}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-100 shrink-0 relative group"
                >
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const fb = e.currentTarget.parentElement.querySelector('.item-fallback')
                      if (fb) fb.style.display = 'flex'
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className="item-fallback hidden w-full h-full items-center justify-center bg-neutral-900 text-white text-xs font-bold"
                  >
                    .{item.format || 'CDR'}
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 text-[10px] font-mono font-bold">
                      {item.sku}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-neutral-900 text-white text-[10px] font-mono font-bold uppercase">
                      .{item.format || 'CDR'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/50">
                      Commercial
                    </span>
                  </div>

                  <Link href={`/toko-digital/${productSlug}/`}>
                    <h4 className="font-bold text-neutral-950 text-sm leading-snug line-clamp-2 hover:text-black transition-colors mb-1.5">
                      {item.title}
                    </h4>
                  </Link>

                  <p className="text-[11px] text-neutral-400 font-medium">
                    Dibeli: {formatDate(item.lastPurchasedAt)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                {item.orderId ? (
                  <Link
                    href={`/toko-digital/invoice/?order_id=${item.orderId}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                  >
                    Lihat Nota
                  </Link>
                ) : (
                  <span />
                )}

                {driveUrl ? (
                  <a
                    href={driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs shadow-sm hover:shadow transition-all"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
                    </svg>
                    <span>Unduh di Google Drive</span>
                  </a>
                ) : (
                  <a
                    href={`https://wa.me/6285183011318?text=Halo%20Admin%20FokusKonten%2C%20saya%20sudah%20membeli%20SKU%20${item.sku}%20mohon%20kirimkan%20link%20akses%20Google%20Drive`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                  >
                    <span>Klaim Link Drive</span>
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
