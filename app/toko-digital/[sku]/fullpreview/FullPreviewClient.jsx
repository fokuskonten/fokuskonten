'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { addToCart, hasInCart, subscribeCartStore } from '@/lib/cartStore'

export default function FullPreviewClient({ product, images = [], returnSlug }) {
  const router = useRouter()
  const [lightboxImg, setLightboxImg] = useState(null)
  const [inCart, setInCart] = useState(false)
  const [isJustAdded, setIsJustAdded] = useState(false)

  useEffect(() => {
    if (!product?.sku) return
    setInCart(hasInCart(product.sku))

    const unsubCart = subscribeCartStore(() => {
      setInCart(hasInCart(product.sku))
    })

    return () => unsubCart()
  }, [product?.sku])

  // Keyboard navigation untuk fullscreen lightbox
  useEffect(() => {
    if (!lightboxImg) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxImg(null)
      } else if (e.key === 'ArrowRight') {
        const idx = images.indexOf(lightboxImg)
        if (idx !== -1 && idx < images.length - 1) {
          setLightboxImg(images[idx + 1])
        }
      } else if (e.key === 'ArrowLeft') {
        const idx = images.indexOf(lightboxImg)
        if (idx > 0) {
          setLightboxImg(images[idx - 1])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImg, images])

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
    setTimeout(() => setIsJustAdded(false), 2000)
  }

  const handleBuyNow = () => {
    if (!inCart) {
      addToCart(product)
    }
    router.push('/toko-digital/checkout/')
  }

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num || 0)
  }

  const backUrl = `/toko-digital/${returnSlug || product.sku}/`

  return (
    <div className="min-h-screen bg-[#f8fafc] text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white pt-24 sm:pt-28 pb-32">
      
      {/* ── 1. CLEAN TOP NAVIGATION & BREADCRUMB ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-neutral-200/80">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <Link
              href={backUrl}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-700 hover:text-neutral-950 text-xs font-bold border border-neutral-200/90 shadow-sm transition-all shrink-0"
            >
              <span>←</span>
              <span>Kembali ke Halaman Produk</span>
            </Link>

            <span className="text-neutral-300 hidden sm:inline">/</span>

            <span className="px-2.5 py-1 rounded-lg bg-neutral-950 text-white font-mono text-xs font-extrabold shadow-sm">
              {product.sku}
            </span>

            <span className="px-2 py-0.5 rounded-md bg-neutral-200/70 text-neutral-800 font-mono text-[11px] font-bold uppercase">
              .{product.format || 'CDR'}
            </span>

            <span className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-neutral-600 font-mono text-xs font-medium">
              {images.length} Slide Desain
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              type="button"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold border border-neutral-200 shadow-sm transition-all cursor-pointer"
            >
              {inCart ? '✓ Di Keranjang' : (isJustAdded ? '✓ Ditambahkan!' : '+ Keranjang')}
            </button>

            <button
              onClick={handleBuyNow}
              type="button"
              className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-extrabold transition-all shadow-sm cursor-pointer"
            >
              Beli Sekarang — {formatRupiah(product.price)}
            </button>
          </div>
        </div>

        {/* Header Title Section */}
        <div className="pt-2 sm:pt-4 max-w-4xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-neutral-950 leading-tight">
            {product.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed font-normal">
            Katalog Visual Lengkap ({images.length} Slide). Klik gambar mana pun untuk memperbesar (HD Fullscreen). Semua file master termasuk dalam paket pembelian berlisensi standar FokusKonten.
          </p>
        </div>
      </div>

      {/* ── 2. 6-COLUMN CRISP WHITE FRAME GRID ── */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {images.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-3xl border border-neutral-200/80 shadow-sm">
            <p className="text-neutral-500 text-sm font-medium">
              Mockup sedang disinkronkan ke server.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {images.map((src, idx) => (
              <div
                key={src}
                onClick={() => setLightboxImg(src)}
                className="group relative bg-white rounded-2xl p-2.5 sm:p-3 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.12)] hover:border-neutral-300 transition-all duration-200 cursor-zoom-in flex flex-col justify-between"
              >
                {/* Clean Frame Mockup (Square 1:1) */}
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-neutral-50/60 border border-neutral-100 flex items-center justify-center relative">
                  <img
                    src={src}
                    alt={`${product.title} - Slide ${idx + 1}`}
                    loading="lazy"
                    draggable={false}
                    className="w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Hover Overlay Accent */}
                  <div className="absolute inset-0 bg-neutral-950/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-2.5 py-1 rounded-full bg-neutral-950 text-white text-[10px] font-bold shadow-md tracking-tight">
                      🔍 Perbesar
                    </span>
                  </div>
                </div>

                {/* Footer Meta Badge */}
                <div className="pt-2 px-0.5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span className="font-semibold text-neutral-700">Slide #{idx + 1}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 font-bold uppercase">
                    .{product.format || 'CDR'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── 3. SLEEK FLOATING BOTTOM ACTION BAR (WHITE SHADOWED CARD) ── */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-200 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.14)] p-3 sm:p-3.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0 hidden sm:block">
            <img
              src={images[0] || product.coverImage}
              alt={product.title}
              className="w-full h-full object-contain p-0.5"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-neutral-950 truncate">
              {product.title}
            </h3>
            <p className="text-[11px] text-neutral-500 font-mono">
              {images.length} Mockup • Lisensi Standar
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="text-right mr-1 hidden xs:block">
            <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Harga</div>
            <div className="text-sm sm:text-base font-black text-neutral-950 font-display">
              {formatRupiah(product.price)}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            type="button"
            className={`px-3 sm:px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              inCart 
                ? 'bg-neutral-100 border-neutral-300 text-neutral-800' 
                : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800 shadow-sm'
            }`}
          >
            {inCart ? '✓ Di Keranjang' : (isJustAdded ? '✓ Ditambahkan!' : '+ Keranjang')}
          </button>

          <button
            onClick={handleBuyNow}
            type="button"
            className="px-4 sm:px-5 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-black transition-all shadow-md cursor-pointer"
          >
            Beli Sekarang
          </button>
        </div>
      </div>

      {/* ── 4. FULLSCREEN LIGHTBOX MODAL (CLEAN FROSTED WHITE LUXURY GLASS) ── */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-50 bg-white/85 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-6 select-none animate-in fade-in duration-150"
          onClick={() => setLightboxImg(null)}
        >
          {/* Lightbox Top Header */}
          <div className="w-full flex items-center justify-between max-w-6xl py-2 z-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/90 shadow-sm text-xs font-mono font-bold text-neutral-800">
              <span className="w-2 h-2 rounded-full bg-neutral-950" />
              <span>Slide {images.indexOf(lightboxImg) + 1} dari {images.length} Desain</span>
            </div>

            <button
              onClick={() => setLightboxImg(null)}
              type="button"
              className="px-4 py-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold cursor-pointer transition-all shadow-md flex items-center gap-1.5"
            >
              <span>✕</span>
              <span>Tutup Pratinjau (Esc)</span>
            </button>
          </div>

          {/* Lightbox Main Image with Pristine White Frame & Soft Shadow */}
          <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center p-2" onClick={(e) => e.stopPropagation()}>
            <div className="relative bg-white rounded-3xl p-3 sm:p-4 border border-neutral-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] max-h-[82vh] flex items-center justify-center">
              <img
                src={lightboxImg}
                alt="Fullscreen Preview"
                className="max-h-[75vh] max-w-full object-contain rounded-2xl"
              />
            </div>

            {/* Left Navigation Arrow */}
            {images.indexOf(lightboxImg) > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const idx = images.indexOf(lightboxImg)
                  setLightboxImg(images[idx - 1])
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white hover:bg-neutral-950 hover:text-white text-neutral-900 border border-neutral-200 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.15)] flex items-center justify-center text-2xl font-bold transition-all cursor-pointer"
                title="Slide Sebelumnya"
              >
                ‹
              </button>
            )}

            {/* Right Navigation Arrow */}
            {images.indexOf(lightboxImg) < images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const idx = images.indexOf(lightboxImg)
                  setLightboxImg(images[idx + 1])
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white hover:bg-neutral-950 hover:text-white text-neutral-900 border border-neutral-200 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.15)] flex items-center justify-center text-2xl font-bold transition-all cursor-pointer"
                title="Slide Berikutnya"
              >
                ›
              </button>
            )}
          </div>

          {/* Lightbox Footer */}
          <div className="w-full flex items-center justify-center py-2" onClick={(e) => e.stopPropagation()}>
            <div className="px-4 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm text-[11px] font-mono font-medium text-neutral-600">
              Gunakan tombol panah ◄ ► pada keyboard untuk berpindah slide
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
