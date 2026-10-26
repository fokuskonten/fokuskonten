'use client'

import { useRef, useState, useEffect } from 'react'

export default function AppScreenshotGallery({
  title = 'Galeri Antarmuka Apotek Pro',
  subtitle = 'Geser ke kanan atau kiri untuk melihat langsung alur kerja kasir, kalkulator racikan resep, hingga pembukuan obat.',
  label = '',
  items = []
}) {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftState, setScrollLeftState] = useState(0)

  // Cek batas scroll kiri dan kanan
  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 15)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15)

    // Hitung active item index berdasarkan scroll
    const child = el.children[0]
    if (child) {
      const itemWidth = child.getBoundingClientRect().width + 24 // 24px gap
      const index = Math.round(scrollLeft / itemWidth)
      setActiveIndex(Math.min(Math.max(index, 0), items.length - 1))
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [items.length])

  // Navigasi geser satu langkah
  const scrollByDirection = (direction) => {
    const el = scrollRef.current
    if (!el) return
    const child = el.children[0]
    const itemWidth = child ? child.getBoundingClientRect().width + 24 : 320
    el.scrollBy({
      left: direction === 'left' ? -itemWidth : itemWidth,
      behavior: 'smooth'
    })
  }

  // Lompat ke index tertentu
  const scrollToIndex = (index) => {
    const el = scrollRef.current
    if (!el) return
    const child = el.children[0]
    const itemWidth = child ? child.getBoundingClientRect().width + 24 : 320
    el.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    })
  }

  // Keyboard navigation untuk lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight' && lightboxIndex < items.length - 1) {
        setLightboxIndex(lightboxIndex + 1)
      }
      if (e.key === 'ArrowLeft' && lightboxIndex > 0) {
        setLightboxIndex(lightboxIndex - 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, items.length])

  // Mouse Drag to Scroll (Desktop Friendly)
  const handleMouseDown = (e) => {
    const el = scrollRef.current
    if (!el) return
    setIsDragging(true)
    setStartX(e.pageX - el.offsetLeft)
    setScrollLeftState(el.scrollLeft)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const el = scrollRef.current
    if (!el) return
    const x = e.pageX - el.offsetLeft
    const walk = (x - startX) * 1.5
    el.scrollLeft = scrollLeftState - walk
  }

  const handleMouseUpOrLeave = () => {
    setIsDragging(false)
  }

  if (!items || items.length === 0) return null

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-neutral-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* HEADER SECTION TENGAH PROPORSIONAL */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {label ? (
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3.5 block">{label}</span>
          ) : null}
          <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3 tracking-tight">
            {title}
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto mb-6">
            {subtitle}
          </p>

          {/* Navigasi Panah & Counter Slide Ditengah Sempurna */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollByDirection('left')}
              disabled={!canScrollLeft}
              aria-label="Geser ke kiri"
              className="w-10 h-10 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 hover:border-black disabled:opacity-30 disabled:hover:border-neutral-300 disabled:hover:bg-white flex items-center justify-center transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-800 text-xs font-mono font-semibold border border-neutral-200 shadow-sm flex items-center gap-1.5">
              <span>{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="text-neutral-400">/</span>
              <span>{String(items.length).padStart(2, '0')}</span>
            </div>

            <button
              type="button"
              onClick={() => scrollByDirection('right')}
              disabled={!canScrollRight}
              aria-label="Geser ke kanan"
              className="w-10 h-10 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 hover:border-black disabled:opacity-30 disabled:hover:border-neutral-300 disabled:hover:bg-white flex items-center justify-center transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* TRACK GALERI GESER HORIZONTAL */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 pt-2 select-none -mx-4 px-4 sm:mx-0 sm:px-0 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => !isDragging && setLightboxIndex(idx)}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start flex flex-col group cursor-pointer"
            >
              {/* Mockup Frame Handphone Otentik Bershadow */}
              <div className="relative rounded-[2.6rem] p-2 sm:p-2.5 bg-neutral-900 border-[3px] border-neutral-800 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.25)] group-hover:shadow-[0_28px_65px_-10px_rgba(0,0,0,0.38)] group-hover:-translate-y-2 transition-all duration-300">
                {/* Punch-hole kamera depan atas */}
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-neutral-700 mx-auto absolute top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none" />

                {/* Layar Smartphone Internal */}
                <div className="relative rounded-[2.1rem] overflow-hidden bg-white aspect-[9/19.5]">
                  <img
                    src={item.img}
                    alt={item.title}
                    draggable="false"
                    className="w-full h-full object-cover scale-[1.05] object-center transition-transform duration-300 group-hover:scale-[1.08]"
                  />
                  
                  {/* Overlay Hint Zoom saat Hover */}
                  <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-neutral-950 text-xs font-mono font-semibold shadow-lg backdrop-blur-sm flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      <span>Perbesar</span>
                    </span>
                  </div>
                </div>

                {/* Home Indicator Bar Bawah */}
                <div className="w-24 h-1 rounded-full bg-neutral-700/80 mx-auto mt-2 pointer-events-none" />
              </div>

              {/* Keterangan Teks Bersih & Padat di Bawah Mockup */}
              <div className="pt-4 px-2 text-center sm:text-left">
                <div className="text-[11px] font-mono text-neutral-400 font-bold mb-1">
                  LAYAR {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-neutral-950 mb-1 group-hover:text-black transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-xs leading-relaxed font-sans line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* INDIKATOR TITIK INTERAKTIF DI BAWAH */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Lihat layar ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? 'w-8 bg-black'
                  : 'w-2 bg-neutral-200 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>

      </div>

      {/* ── MODAL LIGHTBOX RESOLUSI PENUH ─────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[92vh] bg-white rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <div>
                <span className="text-[11px] font-mono text-neutral-500 font-bold uppercase">
                  Layar {lightboxIndex + 1} dari {items.length}
                </span>
                <h4 className="font-display font-bold text-lg text-neutral-950">
                  {items[lightboxIndex].title}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Tutup"
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-800 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Gambar Besar */}
            <div className="flex-1 overflow-auto flex items-center justify-center p-2 min-h-0">
              <img
                src={items[lightboxIndex].img}
                alt={items[lightboxIndex].title}
                className="max-h-[65vh] w-auto object-contain rounded-xl shadow-md border border-neutral-100"
              />
            </div>

            {/* Footer Modal dengan Deskripsi & Navigasi */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600">
              <p className="font-sans line-clamp-2 sm:line-clamp-none max-w-md">
                {items[lightboxIndex].desc}
              </p>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(Math.max(0, lightboxIndex - 1))}
                  disabled={lightboxIndex === 0}
                  className="px-3.5 py-1.5 rounded-lg border border-neutral-300 font-mono text-xs font-semibold hover:border-black disabled:opacity-30 disabled:hover:border-neutral-300 transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  &larr; Sebelumnya
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(Math.min(items.length - 1, lightboxIndex + 1))}
                  disabled={lightboxIndex === items.length - 1}
                  className="px-3.5 py-1.5 rounded-lg bg-black text-white font-mono text-xs font-semibold hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-black transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  Selanjutnya &rarr;
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}
