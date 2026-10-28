'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Pengamat tunggal untuk seluruh situs: memicu [data-reveal] saat masuk layar
// dan mengisi koordinat kursor untuk kartu [data-spotlight].
// Halaman tetap Server Component; cukup tambahkan atribut data-reveal.
export default function MotionProvider() {
  const pathname = usePathname()

  useEffect(() => {
    // Tandai sistem gerak aktif agar failsafe di <head> tidak mematikan animasi
    window.__fkMotionReady = true

    const revealAll = () =>
      document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => el.classList.add('is-revealed'))

    // Spotlight kursor (desktop dengan mouse saja)
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const onMove = (ev) => {
      const card = ev.target instanceof Element ? ev.target.closest('[data-spotlight]') : null
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${ev.clientX - r.left}px`)
      card.style.setProperty('--my', `${ev.clientY - r.top}px`)
    }
    if (finePointer) document.addEventListener('pointermove', onMove, { passive: true })

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      revealAll()
      return () => document.removeEventListener('pointermove', onMove)
    }

    // Pre-trigger 60px sebelum masuk viewport bawah agar konten katalog & etalase sudah siap saat dilihat
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '60px 0px -5% 0px', threshold: 0.02 }
    )

    const scan = () =>
      document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => io.observe(el))
    scan()

    // Tangkap elemen yang dirender belakangan oleh client component (katalog toko digital, filter format).
    // Debounce dipercepat (16ms / 1 frame) agar kartu langsung tampil responsif seketika.
    let timer
    const mo = new MutationObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(scan, 16)
    })
    mo.observe(document.querySelector('main') || document.body, { childList: true, subtree: true })

    return () => {
      clearTimeout(timer)
      io.disconnect()
      mo.disconnect()
      document.removeEventListener('pointermove', onMove)
    }
  }, [pathname])

  return null
}
