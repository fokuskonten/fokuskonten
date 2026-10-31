'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function normalizeKey(path) {
  if (!path) return '/'
  const [pathname, search] = path.split('?')
  const cleanPath = pathname.replace(/\/+$/, '') || '/'
  return cleanPath + (search ? `?${search}` : '')
}

function isPageReload() {
  try {
    const navEntries = performance.getEntriesByType?.('navigation')
    if (navEntries && navEntries.length > 0) {
      return navEntries[0].type === 'reload'
    }
    return performance.navigation?.type === 1
  } catch (e) {
    return false
  }
}

export default function SessionScrollRestorer() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isRestoringRef = useRef(false)
  const isUnloadingRef = useRef(false)
  const lastKnownXRef = useRef(0)
  const lastKnownYRef = useRef(0)
  const isInitialMountRef = useRef(true)

  const queryString = searchParams?.toString()
  const rawKey = pathname + (queryString ? `?${queryString}` : '')
  const pageKey = normalizeKey(rawKey)

  // 1. PENCATATAN & PENYIMPANAN POSISI SCROLL (ANTI-OVERWRITE 0 SAAT UNLOAD/RELOAD)
  useEffect(() => {
    if (typeof window === 'undefined') return

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    let saveRaf = null

    const savePositionToStorage = (overrideX = null, overrideY = null) => {
      if (isRestoringRef.current) return

      const scrollX = overrideX !== null ? overrideX : (window.scrollX || window.pageXOffset || 0)
      const scrollY = overrideY !== null ? overrideY : (window.scrollY || window.pageYOffset || 0)

      if (scrollY > 0) {
        lastKnownYRef.current = scrollY
      }
      if (scrollX > 0) {
        lastKnownXRef.current = scrollX
      }

      // Proteksi krusial: browser mobile sering mereset scrollY ke 0 sesaat sebelum unload/reload
      if (isUnloadingRef.current && scrollY === 0 && lastKnownYRef.current > 50) {
        return
      }

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
      if (isRestoringRef.current || isUnloadingRef.current) return

      const currentY = window.scrollY || window.pageYOffset || 0
      const currentX = window.scrollX || window.pageXOffset || 0

      if (currentY > 0) {
        lastKnownYRef.current = currentY
      }
      if (currentX > 0) {
        lastKnownXRef.current = currentX
      }

      if (saveRaf) cancelAnimationFrame(saveRaf)
      saveRaf = requestAnimationFrame(() => savePositionToStorage())
    }

    const handleBeforeUnloadOrHide = () => {
      isUnloadingRef.current = true
      // Gunakan posisi positif terakhir yang diketahui agar posisi tetap tersimpan saat di-refresh
      const finalX = lastKnownXRef.current || window.scrollX || 0
      const finalY = lastKnownYRef.current || window.scrollY || 0
      savePositionToStorage(finalX, finalY)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleBeforeUnloadOrHide()
      } else {
        isUnloadingRef.current = false
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('beforeunload', handleBeforeUnloadOrHide)
    window.addEventListener('pagehide', handleBeforeUnloadOrHide)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      if (saveRaf) cancelAnimationFrame(saveRaf)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', handleBeforeUnloadOrHide)
      window.removeEventListener('pagehide', handleBeforeUnloadOrHide)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // 2. PEMULIHAN POSISI SCROLL FLEKSIBEL (USER-FRIENDLY & BEBAS FIGHTING DENGAN SENTUHAN JARI)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const isReload = isPageReload()
    const isInitial = isInitialMountRef.current
    isInitialMountRef.current = false

    // Jika bukan reload dan ada hash URL, navigasikan ke hash elemen
    if (!isReload && window.location.hash) {
      const targetId = window.location.hash.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }

    let retryTimer = null
    let removeUserCancelListeners = null

    const finishRestoration = () => {
      isRestoringRef.current = false
      if (retryTimer) clearTimeout(retryTimer)
      if (removeUserCancelListeners) removeUserCancelListeners()
      try {
        document.documentElement.style.scrollBehavior = ''
      } catch (_) {}
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
        lastKnownXRef.current = savedPos.x || 0
        lastKnownYRef.current = savedPos.y || 0

        // Matikan sementara smooth scroll global agar tidak ada animasi gulir yang melawan saat refresh
        try {
          document.documentElement.style.scrollBehavior = 'auto'
        } catch (_) {}

        // Pasang sensor pembatalan: Begitu jari menyentuh layar, langsung serahkan kendali penuh ke user
        const cancelOnUserInteraction = () => {
          if (isRestoringRef.current) {
            finishRestoration()
          }
        }

        const events = ['touchstart', 'touchmove', 'wheel', 'pointerdown', 'keydown']
        events.forEach((ev) => window.addEventListener(ev, cancelOnUserInteraction, { passive: true, capture: true }))
        removeUserCancelListeners = () => {
          events.forEach((ev) => window.removeEventListener(ev, cancelOnUserInteraction, { capture: true }))
        }

        const targetY = savedPos.y
        const targetX = savedPos.x
        let attempts = 0
        const maxAttempts = 14 // ~900ms maksimum polling untuk menunggu layout/gambar render

        const tryScroll = () => {
          if (!isRestoringRef.current) return
          attempts++

          const scrollableHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
          ) - window.innerHeight

          const currentY = Math.min(targetY, Math.max(0, scrollableHeight))
          window.scrollTo({ left: targetX, top: currentY, behavior: 'instant' })

          // Jika posisi sudah tercapai atau batas polling habis, selesaikan pemulihan
          if (Math.abs(window.scrollY - targetY) < 15 || attempts >= maxAttempts) {
            finishRestoration()
          } else {
            retryTimer = setTimeout(tryScroll, 65)
          }
        }

        tryScroll()
      }
    }

    // Jalankan pemulihan dengan jeda mikro agar DOM awal terpasang
    const timer = setTimeout(doRestore, isInitial ? 25 : 50)

    const handlePopState = () => {
      setTimeout(doRestore, 40)
    }
    window.addEventListener('popstate', handlePopState)

    return () => {
      clearTimeout(timer)
      finishRestoration()
      window.removeEventListener('popstate', handlePopState)
    }
  }, [pageKey, pathname])

  return null
}
