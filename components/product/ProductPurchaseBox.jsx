'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { hasPurchasedSku, subscribeBuyerStore } from '@/lib/buyerStore'
import { addToCart, hasInCart, subscribeCartStore } from '@/lib/cartStore'
import { useStoreHealth } from '@/lib/useStoreHealth'

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(num || 0)
}

export default function ProductPurchaseBox({ product, fmtMeta }) {
  const [isOwned, setIsOwned] = useState(false)
  const [inCart, setInCart] = useState(false)
  const [isJustAdded, setIsJustAdded] = useState(false)
  const { isOffline, ctaText } = useStoreHealth()

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
    : 50

  const handleAddToCart = () => {
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

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-7 shadow-card space-y-6">
      {/* Already Owned Alert */}
      {isOwned && (
        <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold font-display">
            <svg className="w-4 h-4 text-neutral-950 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Anda sudah membeli produk ini!</span>
          </div>
          <p className="text-[11px] text-neutral-600 font-sans">
            Produk ini sudah Anda miliki. Akses file tersedia di akun Anda.
          </p>
          <div className="pt-1 flex gap-2">
            <Link
              href="/akun/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950 text-white font-display font-bold text-xs hover:bg-neutral-800 transition-colors shadow-soft"
            >
              <span>Lihat di Akun Saya</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* License Badge Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <span className="px-2.5 py-1 rounded-md bg-neutral-950 text-white text-[11px] font-display font-bold uppercase tracking-wider">
          Commercial License
        </span>
        <span className="text-xs text-neutral-500 font-medium font-sans">
          Bebas Penggunaan
        </span>
      </div>

      {/* Price Display */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-neutral-400">Harga:</span>
          <span className="px-2 py-0.5 rounded bg-neutral-900 text-white text-[11px] font-display font-extrabold">
            Hemat {discountPercent}%
          </span>
        </div>
        <div className="flex items-baseline gap-2.5">
          <div className="text-3xl sm:text-4xl font-black text-neutral-950 font-display tracking-tight">
            {formatRupiah(product.price)}
          </div>
          <div className="text-sm text-neutral-400 line-through font-sans">
            {formatRupiah(origPrice)}
          </div>
        </div>
      </div>

      {/* Inclusion Checklist */}
      <div className="space-y-3 pt-4 border-t border-neutral-100 text-xs sm:text-sm text-neutral-700 font-sans">
        <div className="flex items-start gap-2.5">
          <svg className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span><strong>Format .{fmtMeta?.ext || 'CDR'}:</strong> Siap pakai dan mudah diedit.</span>
        </div>
        <div className="flex items-start gap-2.5">
          <svg className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span><strong>Lisensi Komersial:</strong> Bebas untuk kebutuhan personal maupun komersial.</span>
        </div>
        <div className="flex items-start gap-2.5">
          <svg className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span><strong>Akses Google Drive:</strong> Unduh kapan saja tanpa batas.</span>
        </div>
        <div className="flex items-start gap-2.5">
          <svg className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span><strong>Pengiriman Instan:</strong> Link otomatis dikirim ke email setelah bayar.</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 space-y-2.5">
        {isOwned ? (
          <Link
            href="/akun/"
            className="w-full py-3.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 active:scale-[0.99] text-white font-display font-extrabold text-sm sm:text-base shadow-card hover:shadow-float transition-all flex items-center justify-center gap-2 text-center"
          >
            <svg className="w-5 h-5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Buka di Akun Saya</span>
          </Link>
        ) : (
          <>
            {/* 1. Primary Professional Checkout CTA Button */}
            {isOffline ? (
              <div className="w-full py-3.5 px-4 rounded-xl bg-neutral-300 text-neutral-500 font-display font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 text-center cursor-not-allowed border border-neutral-300">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{ctaText}</span>
              </div>
            ) : (
              <Link
                href={`/toko-digital/checkout/?sku=${encodeURIComponent(product.sku)}`}
                className="w-full py-3.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 active:scale-[0.99] text-white font-display font-extrabold text-sm sm:text-base shadow-card hover:shadow-float transition-all flex items-center justify-center gap-2 text-center group cursor-pointer"
              >
                <span>Beli Sekarang</span>
                <svg className="w-4 h-4 text-white shrink-0 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            )}

            {/* 2. Secondary Add to Cart Button */}
            <button
              type="button"
              disabled={isOffline}
              onClick={handleAddToCart}
              className={`w-full py-3 px-4 rounded-xl font-display font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 border ${
                isOffline
                  ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed'
                  : inCart
                  ? 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-900 shadow-sm active:scale-[0.99] cursor-pointer'
                  : isJustAdded
                  ? 'bg-neutral-950 text-white border-neutral-950 scale-[1.02] ring-2 ring-neutral-900 shadow-md cursor-pointer'
                  : 'bg-white hover:bg-neutral-50 text-neutral-900 border-neutral-300 shadow-soft hover:shadow-card active:scale-[0.99] cursor-pointer'
              }`}
            >
              {inCart ? (
                <>
                  <svg className={`w-4 h-4 text-white shrink-0 ${isJustAdded ? 'animate-in zoom-in-50 duration-300' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Lihat Keranjang</span>
                  <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/>
                  </svg>
                  <span>+ Keranjang</span>
                </>
              )}
            </button>
          </>
        )}
      </div>

      {/* Trust Badges */}
      <div className="pt-1 flex flex-col gap-1 text-center text-xs text-neutral-500 font-sans">
        <span className="flex items-center justify-center gap-1.5 text-neutral-700 font-semibold font-display">
          <svg className="w-3.5 h-3.5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Akses Selamanya • Pembayaran Aman &amp; Otomatis</span>
        </span>
        <span className="text-[11px] text-neutral-400">Link unduhan Google Drive otomatis dikirim setelah pembayaran</span>
      </div>
    </div>
  )
}
