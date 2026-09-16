'use client'

import { useState, useMemo } from 'react'

/**
 * EbookCover3D.jsx — Komponen Tampilan Cover E-Book Asli Berstandar Toko Digital
 * 
 * Standar Visual:
 * - Menampilkan 100% cover asli resolusi tinggi (800x800 px) bawaan toko digital.
 * - Zero artificial spine, zero fake page edges, zero redundant ribbon badges.
 * - Kontainer persegi (aspect-square) bersih dengan border netral dan hover zoom halus.
 * - Multi-tier CDN fallback: jsDelivr Edge CDN -> GitHub Raw -> Local -> Monokrom Fallback.
 */
export default function EbookCover3D({
  coverImage,
  title = 'E-Book',
  sku = '',
  category = '',
  className = '',
  aspectRatio = 'aspect-square',
  size = 'full' // 'full' | 'sm' | 'md' | 'lg'
}) {
  const cleanSku = (sku || '').trim().toUpperCase()

  // Skenario CDN multi-tier terdistribusi
  const cdnFallbackUrls = useMemo(() => {
    const urls = []
    
    // Prioritas 1: jsDelivr Edge CDN resmi jika SKU tersedia
    if (cleanSku) {
      urls.push(`https://cdn.jsdelivr.net/gh/mcjobs-id/fokuskonten-assets@main/ebook/${cleanSku}/${cleanSku}_cover.webp`)
      urls.push(`https://raw.githubusercontent.com/mcjobs-id/fokuskonten-assets/main/ebook/${cleanSku}/${cleanSku}_cover.webp`)
    }
    
    // Prioritas 2: Custom coverImage jika berupa URL eksternal penuh
    if (coverImage && (coverImage.startsWith('http://') || coverImage.startsWith('https://'))) {
      if (!urls.includes(coverImage)) {
        urls.unshift(coverImage)
      }
    }
    
    // Prioritas 3: Fallback lokal /covers/ jika berkas tersedia
    if (cleanSku) {
      urls.push(`/covers/${cleanSku}/${cleanSku}_cover.webp`)
    }
    
    return urls
  }, [coverImage, cleanSku])

  const [urlIndex, setUrlIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasExhausted, setHasExhausted] = useState(false)

  const currentSrc = !hasExhausted && cdnFallbackUrls.length > 0 ? cdnFallbackUrls[urlIndex] : null

  const handleImageError = () => {
    if (urlIndex + 1 < cdnFallbackUrls.length) {
      setUrlIndex((prev) => prev + 1)
      setIsLoaded(false)
    } else {
      setHasExhausted(true)
    }
  }

  // Dimensi visual fleksibel
  const sizeClasses = {
    full: 'w-full',
    sm: 'w-full max-w-[200px]',
    md: 'w-full max-w-[300px]',
    lg: 'w-full max-w-[400px]'
  }[size] || 'w-full'

  return (
    <div className={`relative inline-block ${sizeClasses} ${className}`}>
      {/* Kontainer Cover Elegan Bersih (Sesuai Standar Toko Digital) */}
      <div className={`relative w-full ${aspectRatio} rounded-xl bg-neutral-100 overflow-hidden flex items-center justify-center border border-neutral-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.04)] select-none group-hover:border-neutral-300 transition-all`}>
        {currentSrc ? (
          <img
            src={currentSrc}
            alt={`Sampul Resmi ${title}`}
            width={800}
            height={800}
            loading="lazy"
            decoding="async"
            onError={handleImageError}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-contain pointer-events-none select-none transition-all duration-300 group-hover:scale-[1.03] ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          /* SVG Fallback Monokrom Elegan jika gambar tidak tersedia */
          <div className="w-full h-full p-4 flex flex-col justify-between bg-neutral-900 text-white select-none relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full border border-neutral-700/40 pointer-events-none" />
            <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full border border-neutral-700/40 pointer-events-none" />
            
            <div className="z-10">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                {cleanSku || 'FOKUSKONTEN'}
              </span>
              <p className="text-[11px] text-neutral-400 font-mono mt-0.5 uppercase tracking-wide">
                {category || 'DIREKTORI E-BOOK'}
              </p>
            </div>

            <div className="z-10 my-auto py-2">
              <div className="w-8 h-1 bg-white mb-3" />
              <h3 className="font-extrabold text-sm sm:text-base leading-snug line-clamp-3 text-white">
                {title}
              </h3>
            </div>

            <div className="z-10 pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span>EDISI DIGITAL</span>
              <span>VERIFIKASI PDF</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
