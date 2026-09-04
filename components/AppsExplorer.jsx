'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import AppCard from './AppCard'

const categories = [
  'Semua',
  'Bisnis',
  'Edukasi',
  'Religi',
  'Utilitas',
  'Game',
  'Kesehatan',
  'Produktivitas',
  'Hiburan',
]

export default function AppsExplorer({ apps }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const isInitRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = sessionStorage.getItem('fk_apps_session')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.category) setSelectedCategory(parsed.category)
        if (parsed.searchQuery) setSearchQuery(parsed.searchQuery)
      }
    } catch (e) {}
    setTimeout(() => {
      isInitRef.current = true
    }, 50)
  }, [])

  useEffect(() => {
    if (!isInitRef.current) return
    try {
      sessionStorage.setItem('fk_apps_session', JSON.stringify({
        category: selectedCategory,
        searchQuery,
        t: Date.now()
      }))
    } catch (e) {}
  }, [selectedCategory, searchQuery])

  const categoryCounts = useMemo(() => {
    const counts = { Semua: apps.length }
    categories.forEach((cat) => {
      if (cat !== 'Semua') {
        counts[cat] = apps.filter((a) => a.category === cat).length
      }
    })
    return counts
  }, [apps])

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchCategory =
        selectedCategory === 'Semua' || app.category === selectedCategory
      const matchQuery =
        !searchQuery ||
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchQuery
    })
  }, [apps, selectedCategory, searchQuery])

  return (
    <div>
      {/* ── SEARCH & FILTER CONTROLS ─────────────────────────────────── */}
      <div className="mb-10 space-y-6">
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau fungsi aplikasi..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-800 placeholder-neutral-400 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all outline-none"
          />
          <svg
            className="w-5 h-5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400 hover:text-neutral-600"
            >
              Reset
            </button>
          )}
        </div>

        {/* ── CATEGORY PILLS ────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const count = categoryCounts[cat] || 0
            if (cat !== 'Semua' && count === 0) return null
            const isActive = selectedCategory === cat

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-display font-semibold transition-all ${
                  isActive
                    ? 'bg-black text-white shadow-sm shadow-black/20'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── APPS GRID ─────────────────────────────────────────────────── */}
      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredApps.map((app, index) => (
            <AppCard key={app.id} app={app} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-neutral-50 rounded-3xl border border-neutral-100 max-w-lg mx-auto">
          <svg
            className="w-12 h-12 text-neutral-300 mx-auto mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-display font-semibold text-neutral-700 text-base mb-1">
            Tidak ada aplikasi ditemukan
          </p>
          <p className="text-neutral-400 text-xs">
            Coba kata kunci pencarian lain atau pilih kategori &quot;Semua&quot;.
          </p>
        </div>
      )}
    </div>
  )
}
