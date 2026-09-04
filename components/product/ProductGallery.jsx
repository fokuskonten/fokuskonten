'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function ProductGallery({
  product,
  activeImage,
  setActiveImage,
  isZoomOpen,
  setIsZoomOpen
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const galleryList = (product?.gallery && product.gallery.length > 0)
    ? product.gallery
    : [product?.coverImage || '']

  const currentImg = activeImage || galleryList[0] || ''
  const currentIdx = Math.max(0, galleryList.indexOf(currentImg))
  const totalSlides = galleryList.length

  const handlePrev = (e) => {
    if (e) e.stopPropagation()
    const prevIdx = (currentIdx - 1 + totalSlides) % totalSlides
    setActiveImage(galleryList[prevIdx])
  }

  const handleNext = (e) => {
    if (e) e.stopPropagation()
    const nextIdx = (currentIdx + 1) % totalSlides
    setActiveImage(galleryList[nextIdx])
  }

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isZoomOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsZoomOpen(false)
      } else if (e.key === 'ArrowRight' && totalSlides > 1) {
        handleNext()
      } else if (e.key === 'ArrowLeft' && totalSlides > 1) {
        handlePrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isZoomOpen, currentIdx, totalSlides])

  return (
    <>
      {/* Main Image Showcase Frame (1:1 Native Square) */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden p-2">
        <div 
          className="relative aspect-square w-full bg-neutral-100 rounded-xl overflow-hidden flex items-center justify-center group cursor-zoom-in select-none border border-neutral-200/60"
          onClick={() => setIsZoomOpen(true)}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Main Foreground Image (Utuh 100%, 100% HD Tajam & Presisi, Bebas Watermark) */}
          {currentImg ? (
            <img
              src={currentImg}
              alt={product?.title || 'Product Cover'}
              draggable={false}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const fallback = e.currentTarget.parentElement.querySelector('.detail-img-fallback')
                if (fallback) fallback.style.display = 'flex'
              }}
              className="relative z-0 w-full h-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.01]"
            />
          ) : null}

          {/* Fallback jika gambar error */}
          <div
            className="detail-img-fallback relative z-10 w-full h-full flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-white rounded-xl"
            style={{ display: currentImg ? 'none' : 'flex' }}
          >
            <span className="text-6xl mb-3">📦</span>
            <span className="text-sm font-mono font-bold text-neutral-300 uppercase tracking-widest">{product?.category}</span>
            <span className="text-sm text-neutral-400 mt-2 max-w-sm leading-relaxed">{product?.title}</span>
          </div>

          {/* Zoom Hint Badge */}
          <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900/85 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-semibold pointer-events-none flex items-center gap-1.5 shadow-md">
            <svg className="w-3.5 h-3.5 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            <span>Klik untuk Perbesar</span>
          </div>
        </div>

        {/* Gallery Thumbnails Strip */}
        {totalSlides > 1 && (
          <div className="mt-3 pt-3 border-t border-neutral-100 px-1">
            <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1">
              {galleryList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveImage(imgUrl)
                  }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg bg-neutral-100 border-2 overflow-hidden transition-all cursor-pointer ${
                    currentImg === imgUrl
                      ? 'border-black ring-2 ring-black/10'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Zoom Modal (Portal ke document.body agar menutup penuh Navbar & transparan halus) */}
      {mounted && isZoomOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[99999] bg-neutral-950/30 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 animate-in fade-in duration-200 select-none overflow-hidden"
          onClick={() => setIsZoomOpen(false)}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Top Header Bar */}
          <div 
            className="w-full max-w-5xl flex items-center justify-between z-30 pt-2 px-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white font-mono text-xs font-bold border border-white/20 shadow-md">
                SKU: {product?.sku}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md text-white text-xs font-medium border border-white/20 shadow-md">
                {product?.category}
              </span>
            </div>

            <button 
              type="button"
              className="w-11 h-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all backdrop-blur-md border border-white/25 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
              onClick={() => setIsZoomOpen(false)}
              aria-label="Tutup Zoom"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Center Stage: Floating HD Image with Nav Arrows */}
          <div 
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center p-2 my-auto"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* Nav Left Arrow */}
            {totalSlides > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Slide Sebelumnya"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Pure HD Image (Zero watermark, Zero blur) */}
            <div className="relative max-h-[62vh] sm:max-h-[68vh] flex items-center justify-center">
              <img
                src={currentImg}
                alt={product?.title || 'Preview Zoom'}
                draggable={false}
                className="max-w-full max-h-[62vh] sm:max-h-[68vh] object-contain rounded-2xl shadow-2xl drop-shadow-2xl select-none transition-all duration-300 border border-white/10"
              />
            </div>

            {/* Nav Right Arrow */}
            {totalSlides > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Slide Berikutnya"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Bottom Slide Text Card (Elegan & Informatif) */}
          <div 
            className="w-full max-w-2xl bg-black/65 backdrop-blur-xl rounded-2xl border border-white/20 p-4 sm:p-5 shadow-2xl text-white space-y-2 z-30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h4 className="font-display font-extrabold text-sm sm:text-base text-white tracking-tight line-clamp-1">
                {product?.title}
              </h4>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 rounded bg-emerald-500/25 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                  Format .{product?.format || 'CDR'}
                </span>
                {totalSlides > 1 && (
                  <span className="px-2 py-0.5 rounded bg-white/15 text-white/90 font-mono text-xs font-bold">
                    Slide {currentIdx + 1} / {totalSlides}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              {currentIdx === 0 
                ? 'Preview Master File Original. Kualitas resolusi tinggi HD vektor, siap cetak dan mudah dimodifikasi.'
                : `Detail komposisi & lembar kerja slide ke-${currentIdx + 1}. Elemen desain lengkap tersusun rapi.`}
            </p>

            {/* Thumbnail mini dots / preview switch if multiple slides */}
            {totalSlides > 1 && (
              <div className="flex items-center gap-2 pt-1">
                {galleryList.map((img, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveImage(img)
                    }}
                    className={`h-11 w-11 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      currentIdx === i 
                        ? 'border-white ring-2 ring-white/40 scale-105 opacity-100' 
                        : 'border-white/20 opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
