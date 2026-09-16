'use client'

import { useState, useEffect, useMemo } from 'react'
import { getTokoDigitalCdnTiers } from '@/lib/tokoDigitalCdn'

/**
 * CdnImage.jsx — Komponen Gambar Multi-Tier CDN Resilien
 * Mengutamakan Tier 1 (jsDelivr Edge CDN), otomatis cascade fallback ke
 * Tier 2 (GitHub Raw Sekoci) dan Tier 3 (Lokal /covers/), dilengkapi
 * built-in monochrome placeholder sesuai STANDAR_UI_WEB_OFFICIAL.md.
 */
export default function CdnImage({
  src,
  sku = '',
  alt = '',
  className = '',
  style = {},
  width,
  height,
  priority = false,
  loading,
  fetchPriority,
  decoding = 'async',
  draggable = false,
  fallbackSelector = '',
  onFatalError,
  ...props
}) {
  const tiers = useMemo(() => getTokoDigitalCdnTiers(src, sku), [src, sku])
  const [tierIdx, setTierIdx] = useState(0)
  const [isExhausted, setIsExhausted] = useState(false)

  useEffect(() => {
    setTierIdx(0)
    setIsExhausted(false)
  }, [src, sku])

  const currentSrc = tiers[tierIdx] || src

  const handleError = (e) => {
    if (tierIdx + 1 < tiers.length) {
      setTierIdx((prev) => prev + 1)
    } else {
      setIsExhausted(true)
      if (onFatalError) {
        onFatalError(e)
      } else if (fallbackSelector) {
        e.currentTarget.style.display = 'none'
        const fallback = e.currentTarget.parentElement?.querySelector(fallbackSelector)
        if (fallback) fallback.style.display = 'flex'
      }
    }
  }

  // Jika semua tier CDN gagal dan tidak ada fallback khusus di luar
  if (isExhausted && !fallbackSelector && !onFatalError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-neutral-100 text-neutral-400 select-none ${className}`}
        style={style}
        role="img"
        aria-label={alt || 'Gambar tidak tersedia'}
      >
        <svg className="w-7 h-7 text-neutral-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        {sku && <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">{sku}</span>}
      </div>
    )
  }

  if (!currentSrc) return null

  return (
    <img
      key={currentSrc}
      src={currentSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      draggable={draggable}
      loading={priority ? 'eager' : (loading || 'lazy')}
      fetchPriority={priority ? 'high' : (fetchPriority || 'low')}
      decoding={decoding}
      width={width}
      height={height}
      onError={handleError}
      className={className}
      style={style}
      {...props}
    />
  )
}
