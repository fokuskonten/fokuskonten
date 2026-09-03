'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createProductSlug } from '@/app/toko-digital/slugHelper'
import { hasPurchasedSku, subscribeBuyerStore } from '@/lib/buyerStore'
import WatermarkShield from '@/components/product/WatermarkShield'

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(num || 0)
}

export default function ProductCard({ product, compact = false }) {
  const [isOwned, setIsOwned] = useState(false)

  useEffect(() => {
    setIsOwned(hasPurchasedSku(product?.sku))
    const unsubscribe = subscribeBuyerStore(() => {
      setIsOwned(hasPurchasedSku(product?.sku))
    })
    return () => unsubscribe()
  }, [product?.sku])

  if (!product) return null

  const origPrice = product.originalPrice || product.price * 2
  const discountPercent = origPrice > product.price
    ? Math.round(((origPrice - product.price) / origPrice) * 100)
    : null

  const productSlug = createProductSlug(product.sku, product.title)

  if (compact) {
    return (
      <div className="group bg-white rounded-xl border border-neutral-200/80 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between relative">
        {isOwned && (
          <div className="absolute top-2 left-2 z-10 px-1.5 py-0.5 rounded bg-neutral-950/90 text-emerald-400 text-[9px] font-bold tracking-wide border border-emerald-500/30 flex items-center gap-1 shadow-sm">
            <span>✓</span>
            <span>Di Koleksi</span>
          </div>
        )}
        <div>
          <Link
            href={`/toko-digital/${productSlug}/`}
            onContextMenu={(e) => e.preventDefault()}
            className="block relative aspect-square bg-neutral-100 overflow-hidden flex items-center justify-center border-b border-neutral-100 select-none"
          >
            <WatermarkShield patternId={`fk-wc-${product.sku.toLowerCase()}`} showBadge={false} />
            {product.coverImage ? (
              <img
                src={product.coverImage}
                alt={product.title}
                loading="lazy"
                draggable={false}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  const fallback = e.currentTarget.parentElement.querySelector('.compact-fallback')
                  if (fallback) fallback.style.display = 'flex'
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
              />
            ) : null}
            <div
              className="compact-fallback w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-white"
              style={{ display: product.coverImage ? 'none' : 'flex' }}
            >
              <span className="text-2xl mb-1">📦</span>
              <span className="text-[10px] text-neutral-400 line-clamp-2 px-1">{product.title}</span>
            </div>
          </Link>

          <div className="p-3 pb-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
              <span>{product.category}</span>
              <span className="font-mono text-neutral-500 bg-neutral-100 px-1 py-0.2 rounded font-semibold">{product.sku}</span>
            </div>
            <Link href={`/toko-digital/${productSlug}/`}>
              <h4 className="font-bold text-neutral-950 text-xs leading-snug group-hover:text-black transition-colors line-clamp-2 min-h-[32px]">
                {product.title}
              </h4>
            </Link>
          </div>
        </div>

        <div className="p-3 pt-0">
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-1">
            <div>
              {discountPercent && (
                <span className="text-[9px] text-neutral-400 line-through mr-1">
                  {formatRupiah(origPrice)}
                </span>
              )}
              <span className="text-xs font-black text-neutral-950 font-display">
                {formatRupiah(product.price)}
              </span>
            </div>
            <Link
              href={`/toko-digital/${productSlug}/`}
              className="px-2.5 py-1 rounded-lg bg-black text-white text-[11px] font-bold hover:bg-neutral-800 transition-colors shadow-sm hover:shadow"
            >
              Detail
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between relative">
      {isOwned && (
        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-lg bg-neutral-950/90 text-emerald-400 text-[10px] font-bold tracking-wide border border-emerald-500/30 flex items-center gap-1.5 shadow-md">
          <span>✓</span>
          <span>Di Koleksi Saya</span>
        </div>
      )}
      <div>
        {/* Thumbnail Image Frame */}
        <Link
          href={`/toko-digital/${productSlug}/`}
          onContextMenu={(e) => e.preventDefault()}
          className="block relative aspect-square bg-neutral-100 overflow-hidden flex items-center justify-center border-b border-neutral-100 select-none"
        >
          <WatermarkShield patternId={`fk-ws-${product.sku.toLowerCase()}`} showBadge={false} />
          {product.coverImage ? (
            <img
              src={product.coverImage}
              alt={product.title}
              loading="lazy"
              draggable={false}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const fallback = e.currentTarget.parentElement.querySelector('.card-img-fallback')
                if (fallback) fallback.style.display = 'flex'
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
            />
          ) : null}
          <div
            className="card-img-fallback w-full h-full flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-white"
            style={{ display: product.coverImage ? 'none' : 'flex' }}
          >
            <span className="text-3xl mb-1">📦</span>
            <span className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-widest">{product.category}</span>
            <span className="text-[11px] text-neutral-400 mt-1 line-clamp-2 px-2 leading-tight">{product.title}</span>
          </div>
        </Link>

        {/* Info Section */}
        <div className="p-4 pb-2">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
            <span>{product.category}</span>
            <span className="font-mono text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded font-semibold text-[11px]">{product.sku}</span>
          </div>
          <Link href={`/toko-digital/${productSlug}/`}>
            <h3 className="font-bold text-neutral-950 text-sm leading-snug group-hover:text-black transition-colors line-clamp-2 min-h-[40px]">
              {product.title}
            </h3>
          </Link>
        </div>
      </div>

      {/* Pricing & Action Section */}
      <div className="p-4 pt-0">
        <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            {/* Price Strikethrough + Discount */}
            <div className="flex items-center gap-1.5 leading-none mb-1">
              <span className="text-xs text-neutral-400 line-through">
                {formatRupiah(origPrice)}
              </span>
              {discountPercent && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-extrabold">
                  -{discountPercent}%
                </span>
              )}
            </div>
            {/* Final Price */}
            <div className="text-base font-black text-neutral-950 leading-tight font-display">
              {formatRupiah(product.price)}
            </div>
          </div>

          {/* CTA Detail Button */}
          <Link
            href={`/toko-digital/${productSlug}/`}
            className="px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs shadow-sm hover:shadow transition-all flex items-center gap-1 whitespace-nowrap"
          >
            <span>Buka Detail</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
