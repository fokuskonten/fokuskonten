'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createProductSlug } from '@/app/toko-digital/slugHelper'
import { hasPurchasedSku, subscribeBuyerStore } from '@/lib/buyerStore'
import { addToCart, hasInCart, subscribeCartStore } from '@/lib/cartStore'

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(num || 0)
}

export default function ProductCard({ product, compact = false }) {
  const [isOwned, setIsOwned] = useState(false)
  const [inCart, setInCart] = useState(false)
  const [isJustAdded, setIsJustAdded] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (inCart) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('open-cart-drawer'))
      }
      return
    }
    addToCart(product)
    setIsJustAdded(true)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cart-item-added', { detail: product }))
    }
    setTimeout(() => {
      setIsJustAdded(false)
    }, 1200)
  }

  useEffect(() => {
    setIsOwned(hasPurchasedSku(product?.sku))
    setInCart(hasInCart(product?.sku))

    const unsubBuyer = subscribeBuyerStore(() => {
      setIsOwned(hasPurchasedSku(product?.sku))
    })
    const unsubCart = subscribeCartStore(() => {
      setInCart(hasInCart(product?.sku))
    })

    return () => {
      unsubBuyer()
      unsubCart()
    }
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
          <div className="absolute top-2 left-2 z-10 px-1.5 py-0.5 rounded bg-neutral-950 text-white text-[9px] font-bold tracking-wide border border-neutral-800 flex items-center gap-1 shadow-sm">
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
            {product.coverImage ? (
              <img
                src={product.coverImage}
                alt={product.title}
                draggable={false}
                decoding="async"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  const fallback = e.currentTarget.parentElement.querySelector('.compact-fallback')
                  if (fallback) fallback.style.display = 'flex'
                }}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02] pointer-events-none transform-gpu"
                style={{
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
              />
            ) : null}
            <div
              className="compact-fallback w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-white"
              style={{ display: product.coverImage ? 'none' : 'flex' }}
            >
              <svg className="w-6 h-6 text-neutral-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
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
            <div className="flex items-center">
              {!isOwned ? (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-8 h-8 rounded-lg border transition-all duration-200 cursor-pointer flex items-center justify-center ${
                    inCart 
                      ? 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-900 shadow-sm active:scale-95' 
                      : isJustAdded
                      ? 'bg-neutral-950 text-white border-neutral-950 scale-110 ring-2 ring-neutral-900 shadow-md'
                      : 'bg-neutral-950 hover:bg-neutral-800 text-white border-neutral-950 shadow-sm active:scale-95'
                  }`}
                  title={inCart ? 'Lihat Keranjang' : 'Tambah ke keranjang'}
                  aria-label={inCart ? 'Lihat Keranjang' : 'Tambah ke keranjang'}
                >
                  {inCart ? (
                    <svg className={`w-3.5 h-3.5 text-white ${isJustAdded ? 'animate-in zoom-in-50 duration-300' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/>
                    </svg>
                  )}
                </button>
              ) : (
                <span className="text-[10px] font-bold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded-lg border border-neutral-200">
                  Dimiliki
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between relative">
      {isOwned && (
        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-lg bg-neutral-950 text-white text-[10px] font-bold tracking-wide border border-neutral-800 flex items-center gap-1.5 shadow-md">
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
          {product.coverImage ? (
            <img
              src={product.coverImage}
              alt={product.title}
              draggable={false}
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const fallback = e.currentTarget.parentElement.querySelector('.card-img-fallback')
                if (fallback) fallback.style.display = 'flex'
              }}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02] pointer-events-none transform-gpu"
              style={{
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
            />
          ) : null}
          <div
            className="card-img-fallback w-full h-full flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-white"
            style={{ display: product.coverImage ? 'none' : 'flex' }}
          >
            <svg className="w-8 h-8 text-neutral-400 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
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
                <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-white text-[10px] font-extrabold">
                  -{discountPercent}%
                </span>
              )}
            </div>
            {/* Final Price */}
            <div className="text-base font-black text-neutral-950 leading-tight font-display">
              {formatRupiah(product.price)}
            </div>
          </div>

          <div className="flex items-center">
            {!isOwned ? (
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-10 h-10 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  inCart 
                    ? 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-900 shadow-sm hover:shadow active:scale-95' 
                    : isJustAdded
                    ? 'bg-neutral-950 text-white border-neutral-950 scale-110 ring-2 ring-neutral-900 shadow-md'
                    : 'bg-neutral-950 hover:bg-neutral-800 text-white border-neutral-950 shadow-sm hover:shadow active:scale-95'
                }`}
                title={inCart ? 'Lihat Keranjang' : 'Tambah ke Keranjang'}
                aria-label={inCart ? 'Lihat Keranjang' : 'Tambah ke Keranjang'}
              >
                {inCart ? (
                  <svg className={`w-4 h-4 text-white ${isJustAdded ? 'animate-in zoom-in-50 duration-300' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/>
                  </svg>
                )}
              </button>
            ) : (
              <span className="text-xs font-bold text-neutral-800 bg-neutral-100 px-2.5 py-1 rounded-xl border border-neutral-200">
                Dimiliki
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
