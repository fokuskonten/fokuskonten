'use client'

import { useEffect } from 'react'
import WatermarkShield from '@/components/product/WatermarkShield'

export default function ProductGallery({
  product,
  activeImage,
  setActiveImage,
  isZoomOpen,
  setIsZoomOpen
}) {
  const currentImg = activeImage || product?.coverImage || ''

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isZoomOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsZoomOpen(false)
      } else if (e.key === 'ArrowRight' && product?.gallery?.length > 1) {
        const currIdx = product.gallery.indexOf(currentImg)
        const nextIdx = (currIdx + 1) % product.gallery.length
        setActiveImage(product.gallery[nextIdx])
      } else if (e.key === 'ArrowLeft' && product?.gallery?.length > 1) {
        const currIdx = product.gallery.indexOf(currentImg)
        const prevIdx = (currIdx - 1 + product.gallery.length) % product.gallery.length
        setActiveImage(product.gallery[prevIdx])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isZoomOpen, currentImg, product?.gallery, setActiveImage, setIsZoomOpen])

  return (
    <>
      {/* Main Image Showcase Frame (1:1 Native Square + Ambient Backdrop) */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden p-2">
        <div 
          className="relative aspect-square w-full bg-neutral-950 rounded-xl overflow-hidden flex items-center justify-center group cursor-zoom-in select-none border border-neutral-100"
          onClick={() => setIsZoomOpen(true)}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* 1. Ambient Blurred Backdrop */}
          {currentImg && (
            <img
              src={currentImg}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-40 transition-all duration-500 pointer-events-none"
            />
          )}

          {/* Subtle dark tint */}
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />

          {/* Dynamic Non-Destructive Watermark Shield */}
          <WatermarkShield patternId="fk-main-gallery" brandText="FOKUSKONTEN • OFFICIAL PREVIEW" subText="HAK CIPTA DILINDUNGI" showBadge={true} />

          {/* 2. Main Foreground Image (Utuh 100%, Pas di 1:1, Tajam & Presisi) */}
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

          {/* 3. Fallback jika gambar error */}
          <div
            className="detail-img-fallback relative z-10 w-full h-full flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-white rounded-xl"
            style={{ display: currentImg ? 'none' : 'flex' }}
          >
            <span className="text-6xl mb-3">📦</span>
            <span className="text-sm font-mono font-bold text-neutral-300 uppercase tracking-widest">{product?.category}</span>
            <span className="text-sm text-neutral-400 mt-2 max-w-sm leading-relaxed">{product?.title}</span>
          </div>

          {/* 4. Zoom Badge Hint */}
          <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[11px] font-medium pointer-events-none flex items-center gap-1.5 shadow-sm">
            <span>🔍</span>
            <span>Klik untuk Perbesar</span>
          </div>
        </div>

        {/* Gallery Thumbnails Strip */}
        {product?.gallery && product.gallery.length > 1 && (
          <div className="mt-3 pt-3 border-t border-neutral-100 px-1">
            <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveImage(imgUrl)
                  }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg bg-neutral-100 border-2 overflow-hidden transition-all ${
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

      {/* Lightbox Zoom Modal */}
      {isZoomOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out animate-in fade-in duration-200 select-none"
          onClick={() => setIsZoomOpen(false)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <button 
            type="button"
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors z-50 text-sm font-bold flex items-center justify-center w-10 h-10 shadow-lg"
            onClick={() => setIsZoomOpen(false)}
            aria-label="Tutup Zoom"
          >
            ✕
          </button>
          <div 
            className="relative max-w-full max-h-[90vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            <WatermarkShield patternId="fk-lightbox-zoom" brandText="FOKUSKONTEN • PREVIEW RESMI" subText="DILINDUNGI HAK CIPTA DIGITAL" showBadge={true} />
            <img
              src={currentImg}
              alt={product?.title || 'Preview Zoom'}
              draggable={false}
              className="max-w-full max-h-[90vh] object-contain select-none"
            />
          </div>
        </div>
      )}
    </>
  )
}
