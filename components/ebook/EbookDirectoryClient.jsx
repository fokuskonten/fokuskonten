'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import EbookCover3D from './EbookCover3D'

/**
 * EbookDirectoryClient.jsx — Client Component Pencarian Kilat & Penjelajah Silo
 * Menggunakan compact index routes.json (s, t, a, c, u) dengan debounce 150ms (Celah 11).
 */
export default function EbookDirectoryClient({ categories = [], initialRoutes = [] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [selectedCat, setSelectedCat] = useState('all')

  // Debounce input pencarian 150 milidetik (Celah 11: Mencegah stuttering di HP spesifikasi rendah)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim().toLowerCase())
    }, 150)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Filter hasil pencarian instan (maks 12 item tercepat)
  const searchResults = useMemo(() => {
    if (!debouncedQuery) return []
    const tokens = debouncedQuery.split(/\s+/).filter(Boolean)

    const matches = []
    for (const r of initialRoutes) {
      const matchAllTokens = tokens.every((token) => {
        return (
          (r.t && r.t.toLowerCase().includes(token)) ||
          (r.a && r.a.toLowerCase().includes(token)) ||
          (r.s && r.s.toLowerCase().includes(token))
        )
      })

      if (matchAllTokens) {
        matches.push(r)
        if (matches.length >= 12) break
      }
    }
    return matches
  }, [debouncedQuery, initialRoutes])

  // Filter kategori
  const filteredCategories = useMemo(() => {
    if (selectedCat === 'all') return categories
    return categories.filter((c) => c.slug === selectedCat)
  }, [categories, selectedCat])

  return (
    <div className="space-y-10">
      {/* ── SEARCH BAR & FILTER ROW ── */}
      <div className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
        <div className="relative">
          <label htmlFor="ebook-search-input" className="sr-only">
            Cari Judul E-Book, Penulis, atau SKU
          </label>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="ebook-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari dari 3.512+ judul e-book, nama penulis, atau kode SKU..."
            maxLength={60}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-neutral-950 text-xs sm:text-sm font-sans placeholder-neutral-400"
          />
        </div>

        {/* Filter Kategori Chips */}
        <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100">
          <button
            type="button"
            onClick={() => setSelectedCat('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
              selectedCat === 'all'
                ? 'bg-neutral-950 text-white'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
            }`}
          >
            Semua ({categories.length} Silo)
          </button>
          {categories.slice(0, 8).map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCat(cat.slug)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                selectedCat === cat.slug
                  ? 'bg-neutral-950 text-white font-bold'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* ── HASIL PENCARIAN INSTAN (JIKA USER SEDANG MENGETIK) ── */}
      {debouncedQuery && (
        <section aria-label="Hasil Pencarian E-Book" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-base sm:text-lg text-neutral-950 tracking-tight font-sans">
              Hasil Pencarian: &ldquo;{debouncedQuery}&rdquo;
            </h2>
            <span className="text-xs font-mono text-neutral-500 font-bold">
              {searchResults.length >= 12 ? '12+ Rekomendasi' : `${searchResults.length} Ditemukan`}
            </span>
          </div>

          {searchResults.length === 0 ? (
            <div className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-8 text-center space-y-2">
              <p className="font-bold text-neutral-950 text-sm">
                Tidak ada e-book yang cocok dengan kata kunci tersebut.
              </p>
              <p className="text-xs text-neutral-500">
                Coba gunakan kata kunci yang lebih umum atau jelajahi melalui rumpun kategori di bawah.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.map((r) => (
                <Link
                  key={r.s}
                  href={`/ebook/${r.c}/${r.u}/`}
                  className="group bg-white text-neutral-900 border border-neutral-200/80 dark:bg-white dark:text-neutral-900 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:border-neutral-300 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <EbookCover3D
                      coverImage={`https://cdn.jsdelivr.net/gh/mcjobs-id/fokuskonten-assets@main/ebook/${r.s}/${r.s}_cover.webp`}
                      title={r.t}
                      sku={r.s}
                      variant="fullframe"
                      size="full"
                    />
                    <div className="p-3.5 sm:p-4 pb-2">
                      <h3 className="font-extrabold text-xs sm:text-sm text-neutral-950 leading-snug line-clamp-2 group-hover:underline">
                        {r.t}
                      </h3>
                      {r.a && (
                        <p className="text-[11px] text-neutral-500 font-serif line-clamp-1 mt-1">
                          {r.a}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="p-3.5 sm:p-4 pt-0">
                    <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <span className="uppercase">{r.c}</span>
                      <span className="font-bold text-neutral-900 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        <span>Baca</span>
                        <span>&rarr;</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── 18 SILO KATEGORI DIREKTORI ── */}
      <section aria-labelledby="silo-categories-heading" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="silo-categories-heading" className="font-extrabold text-lg sm:text-xl text-neutral-950 tracking-tight font-sans">
              {categories.length} Rumpun Silo Keilmuan E-Book
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5 font-sans">
              Telusuri koleksi lengkap naskah digital berformat PDF terverifikasi per disiplin ilmu.
            </p>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 rounded bg-neutral-100 text-neutral-800 text-xs font-mono font-bold">
            {initialRoutes.length.toLocaleString('id-ID')} E-Book Terindeks
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/ebook/${cat.slug}/`}
              className="group bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-neutral-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <span className="px-2.5 py-0.5 rounded bg-neutral-100 text-neutral-900 text-[11px] font-mono font-bold">
                    {cat.count} Judul
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-400 group-hover:text-neutral-950 transition-colors">
                    &rarr;
                  </span>
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-neutral-950 mt-3 group-hover:underline">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono font-bold text-neutral-900">
                <span className="text-neutral-500">Akses Silo</span>
                <span>Buka Katalog &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
