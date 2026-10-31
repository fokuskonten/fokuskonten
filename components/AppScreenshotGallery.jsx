'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

export default function AppScreenshotGallery({
  title = 'Galeri Antarmuka Aplikasi',
  subtitle = 'Geser ke kanan atau kiri untuk melihat langsung alur kerja antarmuka aplikasi.',
  label = '',
  items = [],
  isDesktop = false,
}) {
  // Bersihkan hash URL agar saat pengguna me-refresh halaman, browser tidak melompat ke bawah
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

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

  // Auto-scroll ke dot aktif jika dots melebihi lebar kontainer
  useEffect(() => {
    if (dotsContainerRef.current) {
      const activeDot = dotsContainerRef.current.children[activeIndex]
      if (activeDot) {
        activeDot.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
      }
    }
  }, [activeIndex])

  // Auto-play timer (5 detik, dijeda saat hover mouse, swipe aktif, atau modal terbuka)
  useEffect(() => {
    if (items.length <= 1 || isPaused || isDragging || lightboxOpen) return

    timerRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTrackIndex((prev) => prev + 1)
    }, 5000)

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

  // ── GESTUR SWIPE & POINTER DRAG REALTIME (SAMA DENGAN PRESENTASI SLIDER) ──
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

    // Cek arah gestur: Jika dominan vertikal, biarkan halaman bergulir (native page scroll)
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

    const threshold = 40 // Ambang batas geser 40px
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

  // Dimensi & Style Kartu (Sama Persis dengan PersonaPresentationSlider)
  const containerMaxWidth = isDesktop
    ? 'max-w-4xl'
    : 'max-w-md'

  const cardAspectRatio = isDesktop
    ? (items[0]?.aspectRatio || '1024 / 863')
    : '768 / 1376'

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-neutral-200/80 overflow-hidden">
      {/* ── HEADER SECTION TERSTRUKTUR RAPI ─────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-12">
        {label ? (
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
            {label}
          </span>
        ) : null}
        <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* ── KONTEN SLIDER TUNGGAL ELEGAN BEBAS DARI REDUNDANSI ───────── */}
      <div
        className={`relative w-full ${containerMaxWidth} mx-auto px-4 sm:px-0 select-none flex flex-col group`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => !isDragging && setIsPaused(false)}
      >
        {/* KARTU SLIDER: FRAMELESS, SHADOW TEGAS, POINTER SWIPE (HP & DESKTOP) */}
        <div
          ref={containerRef}
          className={`relative w-full rounded-3xl overflow-hidden shadow-[0_16px_45px_-8px_rgba(0,0,0,0.18)] hover:shadow-[0_24px_55px_-10px_rgba(0,0,0,0.25)] border border-neutral-900/15 transition-all duration-300 hover:-translate-y-1 bg-white select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            aspectRatio: cardAspectRatio,
            touchAction: 'pan-y', // Mengizinkan scroll vertikal halaman di handphone
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onClick={handleCardClick}
          title="Geser ke samping dengan tangan atau klik untuk memperbesar layar penuh"
        >
          {/* TRACK SLIDE REALTIME */}
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
                <div key={idx} className="w-full h-full shrink-0 relative bg-white flex items-center justify-center p-2 sm:p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgSrc}
                    alt={imgAlt}
                    draggable={false}
                    loading={idx <= 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-contain block pointer-events-none select-none"
                  />
                </div>
              )
            })}
          </div>

          {/* Tombol Panah Kiri Langsung di Atas Gambar */}
          <button
            type="button"
            onClick={goToPrev}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="Layar Sebelumnya"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-neutral-950 border border-neutral-300 shadow-lg flex items-center justify-center backdrop-blur-sm transition-all duration-150 active:scale-95 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Tombol Panah Kanan Langsung di Atas Gambar */}
          <button
            type="button"
            onClick={goToNext}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="Layar Berikutnya"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-neutral-950 border border-neutral-300 shadow-lg flex items-center justify-center backdrop-blur-sm transition-all duration-150 active:scale-95 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Hint Petunjuk Geser & Zoom Tipis di Pojok Atas */}
          <div className="absolute top-3 right-3 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="px-2.5 py-1 rounded-lg bg-neutral-900/80 text-white text-[11px] font-mono tracking-wider backdrop-blur-sm border border-white/20 flex items-center gap-1.5 shadow-sm">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
              <span>Geser / Klik</span>
            </span>
          </div>
        </div>

        {/* ── NAVIGASI INDIKATOR TITIK & COUNTER (SAMA PERSIS DENGAN PRESENTASI SLIDER) ── */}
        <div className="w-full pt-3 px-1 flex items-center justify-between text-neutral-700">
          {/* Slide Counter */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono font-semibold text-neutral-600">
              Slide <span className="text-neutral-950 font-bold">{activeIndex + 1}</span> / {items.length}
            </span>
            {isPaused && (
              <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200">
                Jeda
              </span>
            )}
          </div>

          {/* Dots Navigation */}
          <div
            ref={dotsContainerRef}
            className="flex items-center gap-1.5 overflow-x-auto max-w-[140px] sm:max-w-[200px] py-1 px-1 justify-center scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goToSlide(idx)
                }}
                aria-label={`Buka slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-200 shrink-0 cursor-pointer ${
                  idx === activeIndex
                    ? 'w-6 bg-neutral-950'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

          {/* Caption Slide */}
          <div className="hidden sm:block text-right truncate max-w-[180px] sm:max-w-[240px]">
            <span className="text-xs font-mono text-neutral-500 truncate block">
              {currentSlide.title || currentSlide.caption || ''}
            </span>
          </div>
        </div>
      </div>

      {/* ── MODAL LIGHTBOX FULLSCREEN RESOLUSI TINGGI ────────────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Header Lightbox */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-30">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/10 border border-white/20">
                Slide {activeIndex + 1} / {items.length}
              </span>
              <span className="text-xs text-neutral-300 font-mono hidden md:inline truncate max-w-md">
                {currentSlide.title || currentSlide.caption}
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
            style={{ touchAction: 'none' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentSlide.img || currentSlide.src}
              alt={currentSlide.title || currentSlide.alt || ''}
              draggable={false}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl border border-white/20 pointer-events-none select-none transition-transform duration-200"
              style={{
                transform: `translateX(${dragOffset}px)`,
              }}
            />
          </div>

          {/* Tombol Navigasi Lightbox Kiri */}
          <button
            type="button"
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm cursor-pointer z-30"
            aria-label="Sebelumnya"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Tombol Navigasi Lightbox Kanan */}
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm cursor-pointer z-30"
            aria-label="Berikutnya"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
