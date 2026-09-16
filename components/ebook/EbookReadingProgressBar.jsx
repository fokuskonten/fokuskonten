'use client'

import { useState, useEffect } from 'react'

/**
 * EbookReadingProgressBar.jsx — Indikator Bar Kemajuan Membaca di Atas Layar
 * Memberikan feedback visual halus kepada pembaca saat menggulir artikel resensi e-book.
 */
export default function EbookReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          if (totalHeight > 0) {
            const currentScroll = window.scrollY
            const calculated = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100))
            setProgress(calculated)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (progress <= 0) return null

  return (
    <div
      role="progressbar"
      aria-label="Kemajuan Membaca Artikel"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-neutral-200 pointer-events-none"
    >
      <div
        className="h-full bg-neutral-950 transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
