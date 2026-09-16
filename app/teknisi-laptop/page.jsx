'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getTechnicianBrands, getTechnicianSummary, searchTechnicianCatalog } from '../../lib/technicianService'
import BrandLogo from '../../components/teknisi/BrandLogo'

export default function LaptopHubPage() {
  const [brands, setBrands] = useState([])
  const [stats, setStats] = useState(null)
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    async function loadInitial() {
      const [bData, sData] = await Promise.all([
        getTechnicianBrands('laptop'),
        getTechnicianSummary()
      ])
      setBrands(bData)
      setStats(sData)
    }
    loadInitial()
  }, [])

  useEffect(() => {
    if (query.trim().length < 2) {
      setSearchResults([])
      return
    }

    let active = true
    const doSearch = async () => {
      const results = await searchTechnicianCatalog(query, 'laptop', 30)
      if (active) setSearchResults(results)
    }

    const timer = setTimeout(doSearch, 300)
    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [query])

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
        <div className="max-w-3xl space-y-3">
          <span className="px-3 py-1 bg-neutral-950 text-white font-mono font-bold text-xs rounded-lg uppercase tracking-wider">
            PORTAL SKEMA & BOARDVIEW LAPTOP
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            Direktori Skema Diagram PDF & Boardview CAD Laptop Master
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed font-sans">
            Lumbung data 950+ berkas skema motherboard laptop, layout komponen Boardview (.BDV, .BRD, .FZ, .CAD), dan BIOS dump terverifikasi.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative max-w-2xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari Tipe Laptop / Kode Board (contoh: LA-D671P, Aspire ES1-572, 820-2879)..."
            className="w-full bg-white border border-neutral-300 focus:border-neutral-950 focus:ring-0 rounded-xl px-4 py-3.5 text-neutral-950 text-sm font-mono placeholder:text-neutral-400 shadow-sm transition-colors"
          />
        </div>
      </div>

      {/* Hasil Pencarian / Katalog Merek Laptop (Full-Width Clean Grid) */}
      {query.trim().length >= 2 ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h2 className="text-lg font-extrabold text-neutral-950 font-mono">
              Hasil Pencarian Laptop: `{query}` ({searchResults.length})
            </h2>
            <button
              onClick={() => setQuery('')}
              className="text-xs font-mono text-neutral-500 hover:text-neutral-950 underline transition-colors"
            >
              Reset
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-neutral-500 bg-neutral-50 rounded-xl">
              Tidak ada skema laptop yang cocok dengan kata kunci `{query}`.
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  href={`/teknisi-laptop/${item.brand_slug}/${item.slug}`}
                  className="flex items-center justify-between py-3.5 px-3 hover:bg-neutral-50 rounded-xl transition-colors group"
                >
                  <div>
                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">{item.brand}</span>
                    <h3 className="text-sm font-extrabold text-neutral-950 group-hover:underline font-mono">{item.model_name}</h3>
                    <span className="text-[11px] text-neutral-400 font-mono">{item.type || 'SCHEMATIC / BOARDVIEW'}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-600 group-hover:text-neutral-950">
                    Lihat Skema &rarr;
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div>
              <h2 className="text-xl font-extrabold text-neutral-950 tracking-tight">Katalog Merek Laptop</h2>
              <p className="text-xs text-neutral-500 font-mono">Pilih pabrikan laptop untuk membuka skema sirkuit &amp; boardview CAD</p>
            </div>
            <span className="px-3 py-1 bg-neutral-100 border border-neutral-300 text-neutral-950 font-mono font-bold text-xs rounded-lg uppercase">
              {brands.length} MEREK
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {brands.map((b) => (
              <Link
                key={b.slug}
                href={`/teknisi-laptop/${b.slug}`}
                className="p-5 bg-white border border-neutral-200 hover:border-neutral-950 rounded-xl transition-all group flex flex-col justify-between space-y-3 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <BrandLogo brand={b.slug} size="md" />
                  <span className="text-sm font-extrabold text-neutral-950 group-hover:underline font-mono leading-tight">{b.name}</span>
                </div>
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-mono">{b.count} Berkas Skema</span>
                  <span className="text-xs font-bold font-mono text-neutral-400 group-hover:text-neutral-950">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
