'use client'

import { useState, useEffect, useRef, useMemo } from 'react'

export default function PersonaPresentationSlider({
  slides = [],
  personaName = '',
  themeColor = 'emerald', // 'emerald' | 'sky'
}) {
  const isSky = themeColor === 'sky'
  const activeDotClass = isSky ? 'w-6 bg-sky-600' : 'w-6 bg-emerald-600'

  // Siapkan extended slides untuk seamless infinite loop: [Slide_Terakhir, ...slides, Slide_Pertama]
  const extendedSlides = useMemo(() => {
    if (!slides || slides.length <= 1) return slides || []
    return [slides[slides.length - 1], ...slides, slides[0]]
  }, [slides])

  // Track index menunjuk ke slide riil pertama pada posisi 1
  const [trackIndex, setTrackIndex] = useState(slides.length > 1 ? 1 : 0)
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

  // Indeks aktif untuk dots & counter (0 s/d slides.length - 1)
  const activeIndex = useMemo(() => {
    if (!slides || slides.length === 0) return 0
    if (slides.length === 1) return 0
    return (trackIndex - 1 + slides.length) % slides.length
  }, [trackIndex, slides.length])

  // Slide aktif saat ini untuk label caption
  const currentSlide = slides[activeIndex] || {}

  // Navigasi Next & Prev
  const goToNext = (e) => {
    e?.stopPropagation()
    if (slides.length <= 1) return
    setIsTransitioning(true)
    setTrackIndex((prev) => prev + 1)
  }

  const goToPrev = (e) => {
    e?.stopPropagation()
    if (slides.length <= 1) return
    setIsTransitioning(true)
    setTrackIndex((prev) => prev - 1)
  }

  const goToSlide = (slideIdx) => {
    if (slides.length <= 1) return
    setIsTransitioning(true)
    setTrackIndex(slideIdx + 1)
  }

  // Silent wrap-around reset saat mencapai clone ujung
  const handleTransitionEnd = () => {
    if (slides.length <= 1) return
    if (trackIndex === extendedSlides.length - 1) {
      // Sampai di clone Slide 1 -> reset diam-diam ke Slide 1 asli
      setIsTransitioning(false)
      setTrackIndex(1)
    } else if (trackIndex === 0) {
      // Sampai di clone Slide Terakhir -> reset diam-diam ke Slide Terakhir asli
      setIsTransitioning(false)
      setTrackIndex(slides.length)
    }
  }

  // Auto-play timer (5 detik, dijeda saat hover mouse, swipe aktif, atau modal terbuka)
  useEffect(() => {
    if (slides.length <= 1 || isPaused || isDragging || lightboxOpen) return

    timerRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTrackIndex((prev) => prev + 1)
    }, 5000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [slides.length, isPaused, isDragging, lightboxOpen])

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
  }, [lightboxOpen])

  // ── GESTUR SWIPE & MOUSE DRAG REALTIME BERSTANDAR TINGGI ───────────
  const handlePointerDown = (e) => {
    // Hanya tangani klik kiri mouse atau sentuhan jari
    if (e.button !== 0 && e.pointerType === 'mouse') return
    if (slides.length <= 1) return

    dragStartX.current = e.clientX
    dragStartY.current = e.clientY
    isDraggingRef.current = true
    hasDraggedRef.current = false
    isHorizontalRef.current = false
    setIsDragging(true)
    setIsPaused(true)
    setIsTransitioning(false) // Matikan transition animasi saat jari menempel
    setDragOffset(0)

    try {
      e.currentTarget.setPointerCapture?.(e.pointerId)
    } catch (_) {}
  }

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return

    const deltaX = e.clientX - dragStartX.current
    const deltaY = e.clientY - dragStartY.current

    // Cek arah gestur: Jika lebih dominan vertikal, biarkan halaman bergulir (native scroll)
    if (!isHorizontalRef.current) {
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        // Pengguna sedang scroll halaman ke bawah/atas
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
      // Kembali ke posisi slide saat ini jika tarikan kurang dari threshold
      setIsTransitioning(true)
    }

    setDragOffset(0)
  }

  const handlePointerCancel = (e) => {
    isDraggingRef.current = false
    setIsDragging(false)
    setIsPaused(false)
    setIsTransitioning(true)
    setDragOffset(0)
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId)
    } catch (_) {}
  }

  // Buka lightbox modal hanya jika benar-benar diklik/tap (bukan digeser)
  const handleCardClick = () => {
    if (hasDraggedRef.current) return
    setLightboxOpen(true)
  }

  if (!slides || slides.length === 0) return null

  return (
    <div
      className="relative w-full max-w-md mx-auto select-none flex flex-col group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => !isDragging && setIsPaused(false)}
    >
      {/* ── KARTU SLIDE BERJALAN: FRAMELESS, BERSHADOW TEGAS & FULL TOUCH/MOUSE SWIPE ── */}
      <div
        ref={containerRef}
        className={`relative w-full rounded-3xl overflow-hidden shadow-[0_16px_45px_-8px_rgba(0,0,0,0.18)] hover:shadow-[0_24px_55px_-10px_rgba(0,0,0,0.25)] border border-neutral-900/15 transition-all duration-300 hover:-translate-y-1 bg-white select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          aspectRatio: '768 / 1376',
          touchAction: 'pan-y', // Mengizinkan scroll vertikal halaman di handphone
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClick={handleCardClick}
        title="Geser ke samping dengan tangan atau klik untuk perbesar"
      >
        {/* REL GESER MULTI-SLIDE REALTIME */}
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
          {extendedSlides.map((slide, idx) => (
            <div key={idx} className="w-full h-full shrink-0 relative bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.alt || `${personaName} Slide`}
                draggable={false}
                className="w-full h-full object-contain block pointer-events-none select-none"
              />
            </div>
          ))}
        </div>

        {/* Tombol Panah Kiri Langsung di Atas Gambar */}
        <button
          type="button"
          onClick={goToPrev}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Slide Sebelumnya"
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
          aria-label="Slide Berikutnya"
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

      {/* ── NAVIGASI INDIKATOR TITIK & COUNTER SLIDE TANPA BOX FRAME ── */}
      <div className="w-full pt-3 px-1 flex items-center justify-between text-neutral-700">
        {/* Slide Counter */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono font-semibold text-neutral-600">
            Slide <span className="text-neutral-950 font-bold">{activeIndex + 1}</span> / {slides.length}
          </span>
          {isPaused && (
            <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200">
              Jeda
            </span>
          )}
        </div>

        {/* Dots Navigation */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goToSlide(idx)
              }}
              aria-label={`Buka slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                idx === activeIndex ? activeDotClass : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>

        {/* Caption Slide */}
        <div className="hidden sm:block text-right truncate max-w-[200px]">
          <span className="text-xs font-mono text-neutral-500 truncate block">
            {currentSlide.caption || currentSlide.title || ''}
          </span>
        </div>
      </div>

      {/* ── MODAL LIGHTBOX FULLSCREEN (MENDUKUNG GESTUR SWIPE JUGA) ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Header Lightbox */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-30">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/10 border border-white/20">
                {personaName} • Slide {activeIndex + 1} / {slides.length}
              </span>
              <span className="text-xs text-neutral-300 font-mono hidden md:inline">
                {currentSlide.caption}
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
            className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            style={{ touchAction: 'none' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slides[activeIndex]?.src}
              alt={slides[activeIndex]?.alt || ''}
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
    </div>
  )
}
