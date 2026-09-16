'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import searchManifest from '@/content/technician/index.min.json'

/**
 * not-found.jsx — Halaman 404 Cerdas dengan Live Instant Search Bar
 * Sesuai STANDAR_UI_WEB_OFFICIAL.md: Monokrom, pencarian kilat nama model & chipset
 */
export default function ModelNotFoundPage() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([])
      return
    }

    const q = query.toLowerCase().trim()
    const all = searchManifest?.searchIndex || []
    
    // Cari yang cocok di nama model, brand, chipset, atau motherboard
    const matched = all.filter(item => {
      if (item.c !== 'hp') return false
      return (
        item.m.toLowerCase().includes(q) ||
        item.b.toLowerCase().includes(q) ||
        (item.mb && item.mb.toLowerCase().includes(q))
      )
    }).slice(0, 8)

    setSuggestions(matched)
  }, [query])

  return (
    <div className="max-w-2xl mx-auto my-12 space-y-6">
      <div className="bg-white border border-neutral-200 rounded-2xl p-8 sm:p-10 text-center space-y-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
        <span className="px-3 py-1 bg-neutral-950 text-white font-mono text-xs font-bold rounded uppercase tracking-wider">
          MODEL TIDAK DITEMUKAN (404)
        </span>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight font-mono">
            Cari Model Smartphone Lainnya
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-sans leading-relaxed">
            Perangkat yang Anda tuju mungkin menggunakan nama varian pasar atau chipset berbeda. Gunakan kolom pencarian langsung di bawah ini:
          </p>
        </div>

        {/* Live Instant Search Input */}
        <div className="relative text-left">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik nama model (contoh: Redmi Note 10, SM-A125F, POCO X3)..."
            className="w-full bg-white border border-neutral-300 focus:border-neutral-950 focus:ring-0 rounded-xl px-4 py-3 text-neutral-950 text-sm font-mono placeholder:text-neutral-400 shadow-sm transition-colors"
          />

          {/* Hasil Pencarian Realtime */}
          {suggestions.length > 0 && (
            <div className="mt-2 bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xl divide-y divide-neutral-100">
              {suggestions.map((item) => {
                const brandSlug = item.b.toLowerCase().replace(/[^a-z0-9]/g, '-')
                return (
                  <Link
                    key={item.i}
                    href={`/teknisi-hp/${brandSlug}/${item.s}/`}
                    className="p-3.5 hover:bg-neutral-50 flex items-center justify-between transition-colors block"
                  >
                    <div>
                      <div className="font-extrabold text-neutral-950 text-xs font-mono">{item.b} {item.m}</div>
                      <div className="text-[11px] text-neutral-500 font-sans truncate">{item.t}</div>
                    </div>
                    <span className="text-neutral-400 text-xs font-mono">➔</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Tombol Aksi Cepat */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/teknisi-hp/"
            className="px-6 py-2.5 bg-neutral-950 text-white font-extrabold text-xs rounded-xl hover:bg-neutral-800 transition-colors font-mono tracking-wider uppercase w-full sm:w-auto text-center"
          >
            Buka Direktori Teknisi HP
          </Link>
          <Link
            href="/teknisi-laptop/"
            className="px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-950 font-bold text-xs rounded-xl transition-colors font-mono w-full sm:w-auto text-center"
          >
            Direktori Skema Laptop
          </Link>
        </div>
      </div>
    </div>
  )
}
