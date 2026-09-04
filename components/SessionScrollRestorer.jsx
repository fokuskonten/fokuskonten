'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function SessionScrollRestorer() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isRestoringRef = useRef(false)
  const lastKeyRef = useRef('')

  // Build unique page key based on pathname & search params
  const queryString = searchParams?.toString()
  const pageKey = pathname + (queryString ? `?${queryString}` : '')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Prevent browser default scroll jumping so we have full control over restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    let saveTimeout = null
    const saveCurrentPosition = () => {
      if (isRestoringRef.current) return
      const scrollX = window.scrollX || window.pageXOffset || 0
      const scrollY = window.scrollY || window.pageYOffset || 0

      // We only save valid coordinates
      const currentPath = window.location.pathname
      const currentSearch = window.location.search
      const keyExact = currentPath + currentSearch
      const data = JSON.stringify({ x: scrollX, y: scrollY, t: Date.now() })

      try {
        sessionStorage.setItem(`fk_pos_${keyExact}`, data)
        sessionStorage.setItem(`fk_pos_${currentPath}`, data)
      } catch (err) {
        // Safe fail if storage is restricted
      }
    }

    const handleScroll = () => {
      if (isRestoringRef.current) return
      if (saveTimeout) cancelAnimationFrame(saveTimeout)
      saveTimeout = requestAnimationFrame(saveCurrentPosition)
    }

    const handleBeforeUnload = () => {
      saveCurrentPosition()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('pagehide', handleBeforeUnload)

    return () => {
      saveCurrentPosition()
      if (saveTimeout) cancelAnimationFrame(saveTimeout)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('pagehide', handleBeforeUnload)
    }
  }, [])

  // Restore scroll position when pageKey changes or on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    // If anchor hash exists in URL, scroll to hash instead of restoring numeric position
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }

    let savedPos = null
    try {
      const rawExact = sessionStorage.getItem(`fk_pos_${pageKey}`)
      const rawPath = sessionStorage.getItem(`fk_pos_${pathname}`)
      const raw = rawExact || rawPath
      if (raw) {
        savedPos = JSON.parse(raw)
      }
    } catch (err) {
      savedPos = null
    }

    // Save previous page position before switching
    if (lastKeyRef.current && lastKeyRef.current !== pageKey) {
      try {
        const lastData = JSON.stringify({
          x: window.scrollX || 0,
          y: window.scrollY || 0,
          t: Date.now(),
        })
        sessionStorage.setItem(`fk_pos_${lastKeyRef.current}`, lastData)
      } catch (e) {}
    }
    lastKeyRef.current = pageKey

    if (savedPos && (savedPos.y > 0 || savedPos.x > 0)) {
      isRestoringRef.current = true

      const targetY = savedPos.y
      const targetX = savedPos.x

      // Multi-pass restoration to account for dynamic render & image loading
      const restoreScroll = () => {
        window.scrollTo({ left: targetX, top: targetY, behavior: 'instant' })
      }

      restoreScroll()
      const t1 = setTimeout(restoreScroll, 60)
      const t2 = setTimeout(restoreScroll, 180)
      const t3 = setTimeout(() => {
        restoreScroll()
        isRestoringRef.current = false
      }, 360)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
        isRestoringRef.current = false
      }
    } else {
      // New unvisited page: start at top
      window.scrollTo({ left: 0, top: 0, behavior: 'instant' })
    }
  }, [pageKey, pathname])

  return null
}
