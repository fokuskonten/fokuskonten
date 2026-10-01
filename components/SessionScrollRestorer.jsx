'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function normalizeKey(path) {
  if (!path) return '/'
  const [pathname, search] = path.split('?')
  const cleanPath = pathname.replace(/\/+$/, '') || '/'
  return cleanPath + (search ? `?${search}` : '')
}

export default function SessionScrollRestorer() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isRestoringRef = useRef(false)
  const lastKeyRef = useRef('')

  const queryString = searchParams?.toString()
  const rawKey = pathname + (queryString ? `?${queryString}` : '')
  const pageKey = normalizeKey(rawKey)

  useEffect(() => {
    if (typeof window === 'undefined') return

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    let saveTimeout = null
    const saveCurrentPosition = (isUnload = false) => {
      if (isRestoringRef.current) return
      const scrollX = window.scrollX || window.pageXOffset || 0
      const scrollY = window.scrollY || window.pageYOffset || 0

      // Proteksi krusial: jangan timpa posisi positif dengan 0 saat unload/reload
      if (isUnload && scrollY === 0) return

      const currentPath = window.location.pathname
      const currentSearch = window.location.search
      const normKey = normalizeKey(currentPath + currentSearch)
      const normPath = normalizeKey(currentPath)
      const data = JSON.stringify({ x: scrollX, y: scrollY, t: Date.now() })

      try {
        sessionStorage.setItem(`fk_pos_${normKey}`, data)
        sessionStorage.setItem(`fk_pos_${normPath}`, data)
      } catch (err) {}
    }

    const handleScroll = () => {
      if (isRestoringRef.current) return
      if (saveTimeout) cancelAnimationFrame(saveTimeout)
      saveTimeout = requestAnimationFrame(() => saveCurrentPosition(false))
    }

    const handleBeforeUnload = () => {
      saveCurrentPosition(true)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('pagehide', handleBeforeUnload)

    return () => {
      saveCurrentPosition(false)
      if (saveTimeout) cancelAnimationFrame(saveTimeout)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('pagehide', handleBeforeUnload)
    }
  }, [])

  // Restore scroll position when pageKey changes, on mount, or on popstate (back/forward)
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }

    const doRestore = () => {
      const currentPath = normalizeKey(window.location.pathname)
      const currentFull = normalizeKey(window.location.pathname + window.location.search)

      let savedPos = null
      try {
        const rawExact = sessionStorage.getItem(`fk_pos_${currentFull}`)
        const rawPath = sessionStorage.getItem(`fk_pos_${currentPath}`)
        const raw = rawExact || rawPath
        if (raw) savedPos = JSON.parse(raw)
      } catch (e) {}

      if (savedPos && (savedPos.y > 0 || savedPos.x > 0)) {
        isRestoringRef.current = true
        const targetY = savedPos.y
        const targetX = savedPos.x

        let attempts = 0
        const maxAttempts = 25 // Poll hingga ~2 detik agar menunggu render daftar ebook selesai

        const tryScroll = () => {
          attempts++
          const scrollableHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
          ) - window.innerHeight

          // Gulir sejauh mungkin yang sudah tersedia di DOM
          const currentY = Math.min(targetY, Math.max(0, scrollableHeight))
          window.scrollTo({ left: targetX, top: currentY, behavior: 'instant' })

          if (Math.abs(window.scrollY - targetY) < 15 || attempts >= maxAttempts) {
            // Berhasil mencapai target atau batas waktu habis
            isRestoringRef.current = false
          } else {
            setTimeout(tryScroll, 80)
          }
        }

        tryScroll()
      }
    }

    // Eksekusi pemulihan posisi
    const timer = setTimeout(doRestore, 40)

    const handlePopState = () => {
      setTimeout(doRestore, 50)
    }
    window.addEventListener('popstate', handlePopState)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [pageKey, pathname])

  return null
}
