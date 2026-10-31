'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

export default function AppScreenshotGallery({
  title = 'Galeri Antarmuka Aplikasi',
  subtitle = 'Geser ke kanan atau kiri untuk melihat langsung alur kerja antarmuka aplikasi.',
  label = '',
  items = [],
  isDesktop = false,
}) {
  // Seamless infinite loop: [Slide_Terakhir, ...items, Slide_Pertama]
  const extendedItems = useMemo(() => {
    if (!items || items.length <= 1) return items || []
    return [items[items.length - 1], ...items, items[0]]
  }, [items])

  // Track index menunjuk ke slide riil pertama pada posisi 1
  const [trackIndex, setTrackIndex] = useState(items.length > 1 ? 1 : 0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const timerRef = useRef(null)
  const dragStartX = useRef(0)
  const dragStartY = useRef(0)
  const isDraggingRef = useRef(false)
  const hasDraggedRef = useRef(false)
  const isHorizontalRef = useRef(false)
  const containerRef = useRef(null)
  const dotsContainerRef = useRef(null)

  // Indeks aktif untuk dots & counter (0 s/d items.length - 1)
  const activeIndex = useMemo(() => {
    if (!items || items.length === 0) return 0
    if (items.length === 1) return 0
    return (trackIndex - 1 + items.length) % items.length
  }, [trackIndex, items])

  // Slide aktif saat ini
  const currentSlide = items[activeIndex] || {}

  // Navigasi Next & Prev
  const goToNext = useCallback((e) => {
    e?.stopPropagation()
    if (items.length <= 1) return
    setIsTransitioning(true)
    setTrackIndex((prev) => prev + 1)
  }, [items.length])

  const goToPrev = useCallback((e) => {
    e?.stopPropagation()
    if (items.length <= 1) return
    setIsTransitioning(true)
    setTrackIndex((prev) => prev - 1)
  }, [items.length])

  const goToSlide = (slideIdx) => {
    if (items.length <= 1) return
    setIsTransitioning(true)
    setTrackIndex(slideIdx + 1)
  }

  // Silent wrap-around reset saat mencapai clone ujung
  const handleTransitionEnd = () => {
    if (items.length <= 1) return
    if (trackIndex === extendedItems.length - 1) {
      setIsTransitioning(false)
      setTrackIndex(1)
    } else if (trackIndex === 0) {
      setIsTransitioning(false)
      setTrackIndex(items.length)
    }
  }

  // Auto-scroll ke dot aktif HANYA di dalam kontainer horizontal dots (bebas 100% dari window scroll)
  useEffect(() => {
    const container = dotsContainerRef.current
    if (!container) return
    const activeDot = container.children[activeIndex]
    if (!activeDot) return

    // Hitung posisi horizontal aktif relatif terhadap kontainer dots agar tidak menyentuh window scroll
    const targetLeft = activeDot.offsetLeft - (container.clientWidth / 2) + (activeDot.clientWidth / 2)
    container.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' })
  }, [activeIndex])

  // Auto-play timer (4 detik, otomatis bergulir, jeda saat hover/swipe/modal)
  useEffect(() => {
    if (items.length <= 1 || isPaused || isDragging || lightboxOpen) return

    timerRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTrackIndex((prev) => prev + 1)
    }, 4200)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [items.length, isPaused, isDragging, lightboxOpen])

  // Navigasi keyboard pada Lightbox modal
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'ArrowLeft') goToPrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, goToNext, goToPrev])

  // ── GESTUR SWIPE & POINTER DRAG REALTIME ──
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    if (items.length <= 1) return

    dragStartX.current = e.clientX
    dragStartY.current = e.clientY
    isDraggingRef.current = true
    hasDraggedRef.current = false
    isHorizontalRef.current = false
    setIsDragging(true)
    setIsPaused(true)
    setIsTransitioning(false)
    setDragOffset(0)

    try {
      e.currentTarget.setPointerCapture?.(e.pointerId)
    } catch (_) {}
  }

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return

    const deltaX = e.clientX - dragStartX.current
    const deltaY = e.clientY - dragStartY.current

    // Cek arah gestur: Jika dominan vertikal, delegasikan ke gulir native halaman
    if (!isHorizontalRef.current) {
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        isDraggingRef.current = false
        setIsDragging(false)
        setDragOffset(0)
        setIsTransitioning(true)
        return
      }
      if (Math.abs(deltaX) > 8) {
        isHorizontalRef.current = true
      }
    }

    if (isHorizontalRef.current) {
      hasDraggedRef.current = true
      setDragOffset(deltaX)
    }
  }

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDragging(false)
    setIsPaused(false)

    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId)
    } catch (_) {}

    const threshold = 35 // Ambang batas geser 35px
    if (dragOffset < -threshold) {
      goToNext()
    } else if (dragOffset > threshold) {
      goToPrev()
    } else {
      setIsTransitioning(true)
    }

    setDragOffset(0)
  }

  const handlePointerCancel = () => {
    isDraggingRef.current = false
    setIsDragging(false)
    setIsPaused(false)
    setIsTransitioning(true)
    setDragOffset(0)
  }

  const handleCardClick = () => {
    if (hasDraggedRef.current) return
    setLightboxOpen(true)
  }

  if (!items || items.length === 0) return null

  return (
    <section className="py-20 sm:py-24 bg-neutral-50/70 border-b border-neutral-200/80 overflow-hidden">
      {/* ── HEADER SECTION RESMI ─────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-12">
        {label ? (
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
            {label}
          </span>
        ) : null}
        <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3 tracking-tight font-display font-bold">
          {title}
        </h2>
        {subtitle && (
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* ── KONTEN SHOWCASE ENTERPRISE UTAMA ─────────────────────────── */}
      <div
        className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => !isDragging && setIsPaused(false)}
      >
        {/* KARTU INFO FITUR TERPADU (DI ATAS PONSEL — MEMBERIKAN KONTEKS LENGKAP) */}
        <div className="w-full max-w-md mx-auto mb-6 text-center px-2">
          {/* Badge Nomor Fitur */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-xs mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-800">
              Fitur {String(activeIndex + 1).padStart(2, '0')} dari {String(items.length).padStart(2, '0')}
            </span>
            {isPaused && (
              <span className="text-[9px] font-mono uppercase bg-neutral-100 text-neutral-500 px-1.5 py-0.2 rounded border border-neutral-200">
                Dijeda
              </span>
            )}
          </div>

          {/* Judul Fitur Aktif */}
          <h3 className="font-display font-bold text-lg sm:text-xl text-neutral-950 tracking-tight leading-snug line-clamp-1 min-h-[1.75rem]">
            {currentSlide.title || `Antarmuka ${activeIndex + 1}`}
          </h3>

          {/* Deskripsi Fitur */}
          {currentSlide.desc && (
            <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed line-clamp-2 mt-1 min-h-[2.5rem]">
              {currentSlide.desc}
            </p>
          )}
        </div>

        {/* ── BINGKAI SMARTPHONE ENTERPRISE (TITANIUM FRAME & EDGE-TO-EDGE) ── */}
        <div className="relative w-full flex items-center justify-center">
          {/* Tombol Panah Melayang Kiri Luar (Desktop & Layar Lebar) */}
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Layar Sebelumnya"
            className="hidden sm:flex absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white text-neutral-950 border border-neutral-300/80 shadow-[0_8px_25px_-4px_rgba(0,0,0,0.15)] items-center justify-center hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Wadah Bingkai Ponsel (Center Stage) */}
          <div
            className={
              isDesktop
                ? 'relative w-full max-w-3xl rounded-2xl p-2.5 sm:p-3 bg-neutral-900 border border-neutral-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]'
                : 'relative w-[280px] xs:w-[305px] sm:w-[325px] rounded-[2.75rem] p-2 sm:p-2.5 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black border-2 border-neutral-700/90 shadow-[0_25px_65px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset]'
            }
          >
            {/* Dynamic Island / Kamera Depan Smartphone (Khusus Mobile Frame) */}
            {!isDesktop && (
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-30 w-24 h-4 bg-black rounded-full flex items-center justify-end pr-2.5 pointer-events-none shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
              </div>
            )}

            {/* Title Bar Desktop (Khusus Desktop Frame) */}
            {isDesktop && (
              <div className="flex items-center justify-between pb-2 px-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 truncate max-w-[200px]">
                  {currentSlide.title || 'FokusKonten Desktop Pro'}
                </span>
                <span className="w-8" />
              </div>
            )}

            {/* Layar Internal Ponsel (Edge-to-Edge Screenshot, Bebas Gap Putih) */}
            <div
              ref={containerRef}
              className={`relative w-full overflow-hidden bg-neutral-950 select-none ${
                isDesktop ? 'rounded-xl aspect-[16/10]' : 'rounded-[2.25rem] aspect-[1080/2400]'
              } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{
                touchAction: 'pan-y', // Scroll halaman lancar saat disentuh ke arah vertikal
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              onClick={handleCardClick}
              title="Geser ke samping dengan tangan atau klik untuk layar penuh"
            >
              {/* Rel Track Slide Realtime */}
              <div
                className="flex w-full h-full will-change-transform"
                style={{
                  transform: `translateX(calc(-${trackIndex * 100}% + ${dragOffset}px))`,
                  transition: isTransitioning
                    ? 'transform 350ms cubic-bezier(0.25, 1, 0.5, 1)'
                    : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedItems.map((item, idx) => {
                  const imgSrc = item.img || item.src
                  const imgAlt = item.title || item.alt || `Layar Antarmuka ${idx}`
                  return (
                    <div key={idx} className="w-full h-full shrink-0 relative bg-neutral-950 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgSrc}
                        alt={imgAlt}
                        draggable={false}
                        loading={idx <= 2 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="w-full h-full object-cover block pointer-events-none select-none"
                        style={{
                          imageRendering: '-webkit-optimize-contrast',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                        }}
                      />
                    </div>
                  )
                })}
              </div>

              {/* Hint Tipis Geser di Pojok Kanan Atas */}
              <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                <span className="px-2 py-0.5 rounded-md bg-neutral-900/80 text-white text-[10px] font-mono tracking-wider backdrop-blur-sm border border-white/20 flex items-center gap-1 shadow-sm">
                  <span>Geser</span>
                </span>
              </div>
            </div>
          </div>

          {/* Tombol Panah Melayang Kanan Luar (Desktop & Layar Lebar) */}
          <button
            type="button"
            onClick={goToNext}
            aria-label="Layar Berikutnya"
            className="hidden sm:flex absolute -right-12 lg:-right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white text-neutral-950 border border-neutral-300/80 shadow-[0_8px_25px_-4px_rgba(0,0,0,0.15)] items-center justify-center hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ── BAR NAVIGASI BAWAH BERSIH & PROPOSIONAL (RAMAH HP & PC) ────── */}
        <div className="w-full max-w-md mx-auto pt-5 pb-2 flex flex-col items-center gap-3">
          {/* Kontrol Navigasi Utama: Prev • Counter • Next */}
          <div className="flex items-center justify-between w-full px-4 sm:px-6">
            {/* Tombol Panah Kiri Mobile */}
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Layar Sebelumnya"
              className="w-10 h-10 rounded-full bg-white text-neutral-950 border border-neutral-300 shadow-sm flex items-center justify-center hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Counter Tengah Elegan */}
            <div className="px-4 py-1.5 rounded-full bg-white border border-neutral-200 shadow-xs flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-neutral-600">
                Slide <span className="text-neutral-950 font-bold">{activeIndex + 1}</span> / {items.length}
              </span>
            </div>

            {/* Tombol Panah Kanan Mobile */}
            <button
              type="button"
              onClick={goToNext}
              aria-label="Layar Berikutnya"
              className="w-10 h-10 rounded-full bg-white text-neutral-950 border border-neutral-300 shadow-sm flex items-center justify-center hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator Minimalis Auto-Centering */}
          <div
            ref={dotsContainerRef}
            className={`flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-[260px] py-1 px-2 scrollbar-none ${
              items.length > 12 ? 'justify-start' : 'justify-center'
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Buka antarmuka ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-200 shrink-0 cursor-pointer ${
                  idx === activeIndex
                    ? 'w-5 bg-neutral-950'
                    : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── MODAL LIGHTBOX FULLSCREEN RESOLUSI TINGGI ────────────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Header Lightbox */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-30">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/10 border border-white/20">
                Layar {activeIndex + 1} / {items.length}
              </span>
              <span className="text-xs text-neutral-300 font-mono hidden md:inline truncate max-w-md">
                {currentSlide.title || ''}
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxOpen(false)
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Area Gambar Fullscreen */}
          <div
            className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center select-none"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={items[activeIndex]?.img || items[activeIndex]?.src}
              alt={items[activeIndex]?.title || 'Layar Antarmuka Fullscreen'}
              draggable={false}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl border border-white/20 pointer-events-none select-none transition-transform duration-200"
              style={{
                transform: `translateX(${dragOffset}px) translateZ(0)`,
                imageRendering: '-webkit-optimize-contrast',
              }}
            />
          </div>

          {/* Caption & Navigation Bawah Lightbox */}
          <div
            className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={goToPrev}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono transition-colors cursor-pointer"
            >
              ← Sebelumnya
            </button>
            <span className="text-xs font-mono text-neutral-400">
              Gunakan ← → keyboard atau geser layar
            </span>
            <button
              type="button"
              onClick={goToNext}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono transition-colors cursor-pointer"
            >
              Selanjutnya →
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
