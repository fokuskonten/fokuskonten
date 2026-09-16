'use client'

import { useState, useEffect } from 'react'

// Memory fallback store untuk mode penyamaran / private browsing (Celah 30)
const memoryStore = new Map()

const safeStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key)
      }
    } catch (_) {}
    return memoryStore.get(key) || null
  },
  setItem: (key, val) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, val)
        return
      }
    } catch (_) {}
    memoryStore.set(key, val)
  }
}

const STORAGE_KEY = 'fk_ebook_bookmarks'

/**
 * EbookBookmarkButton.jsx — Tombol Tambah ke "Rak Bacaan Saya"
 * Dilengkapi SafeStorage Wrapper (Celah 30) anti-crash pada Incognito Mode.
 */
export default function EbookBookmarkButton({ ebook }) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    if (!ebook?.sku) return
    const raw = safeStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const list = JSON.parse(raw)
        if (Array.isArray(list) && list.some((item) => item.sku === ebook.sku)) {
          setIsBookmarked(true)
        }
      } catch (_) {}
    }
  }, [ebook?.sku])

  const handleToggle = () => {
    if (!ebook?.sku) return

    const raw = safeStorage.getItem(STORAGE_KEY)
    let list = []
    try {
      if (raw) list = JSON.parse(raw)
      if (!Array.isArray(list)) list = []
    } catch (_) {
      list = []
    }

    if (isBookmarked) {
      list = list.filter((item) => item.sku !== ebook.sku)
      setIsBookmarked(false)
    } else {
      list.push({
        sku: ebook.sku,
        title: ebook.title,
        author: ebook.authorDisplay || ebook.author || '',
        categorySlug: ebook.categorySlug || '',
        coverImage: ebook.coverImage || '',
        timestamp: Date.now()
      })
      setIsBookmarked(true)
    }

    safeStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
        isBookmarked
          ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
          : 'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50 dark:bg-white dark:text-neutral-900'
      }`}
      aria-label={isBookmarked ? 'Hapus dari Rak Bacaan Saya' : 'Simpan ke Rak Bacaan Saya'}
    >
      <span>{isBookmarked ? '★' : '☆'}</span>
      <span>{isBookmarked ? 'Tersimpan di Rak' : 'Simpan ke Rak'}</span>
    </button>
  )
}
