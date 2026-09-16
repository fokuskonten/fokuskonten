'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getTechnicianBrands, searchTechnicianCatalog } from '../../lib/technicianService'
import BrandLogo from '../../components/teknisi/BrandLogo'

export default function SmartphoneHubPage() {
  const [brands, setBrands] = useState([])
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    async function loadInitial() {
      const bData = await getTechnicianBrands('hp')
      setBrands(bData)
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
      setSearching(true)
      const results = await searchTechnicianCatalog(query, 'hp', 30)
      if (active) {
        setSearchResults(results)
        setSearching(false)
      }
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
            PORTAL TEKNISI SMARTPHONE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            Direktori Testpoint EDL 9008, Direct ISP Pinout & Firehose Loader Master
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed font-sans">
            Koleksi terverifikasi lumbung berkas master teknisi smartphone. Dilengkapi titik jumper EDL 9008, pinout memory eMMC/UFS, dan loader bebas auth.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative max-w-2xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari Model / Tipe (contoh: Redmi Note 10, SM-A125F, M2103K19G)..."
            className="w-full bg-white border border-neutral-300 focus:border-neutral-950 focus:ring-0 rounded-xl px-4 py-3.5 text-neutral-950 text-sm font-mono placeholder:text-neutral-400 shadow-sm transition-colors"
          />
          {query.length > 0 && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-3.5 text-xs text-neutral-400 hover:text-neutral-950 font-mono"
            >
              Reset
            </button>
          )}
        </div>

        {/* Diagnostic Error Quick Button */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link
            href="/teknisi-hp/error-lookup"
            className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-950 font-bold text-xs rounded-xl font-mono transition-colors"
          >
            Pencarian Kode Error (BROM / EDL)
          </Link>
          <Link
            href="/teknisi-laptop"
            className="px-4 py-2 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 font-medium text-xs rounded-xl font-mono transition-colors"
          >
            Pindah ke Direktori Laptop & Boardview
          </Link>
        </div>
      </div>

      {/* Main Content (Full-Width Clean Grid, Zero Promo Sidebar) */}
      <div className="space-y-8">
        {query.trim().length >= 2 ? (
          /* Search Results Section */
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h2 className="text-lg font-extrabold text-neutral-950 font-mono">
                Hasil Pencarian: `{query}` ({searchResults.length})
              </h2>
              {searching && <span className="text-xs text-neutral-400 font-mono">Mencari model...</span>}
            </div>

            {searchResults.length === 0 ? (
              <div className="p-6 text-center text-xs font-mono text-neutral-500 bg-neutral-50 rounded-xl">
                Tidak ada model smartphone yang cocok dengan kata kunci `{query}`. Coba gunakan nama model atau varian chipset lain.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    href={`/teknisi-hp/${item.brand_slug}/${item.slug}`}
                    className="flex flex-col justify-between p-4 bg-white border border-neutral-200 hover:border-neutral-950 rounded-xl transition-all group hover:shadow-sm"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block font-mono">{item.brand}</span>
                      <h3 className="text-sm font-extrabold text-neutral-950 group-hover:underline font-mono mt-0.5">{item.model_name}</h3>
                      <span className="text-[11px] text-neutral-400 font-mono">{item.chipset || item.type}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-100 mt-2">
                      <div className="flex items-center space-x-1.5">
                        {item.has_testpoint === 1 && (
                          <span className="px-1.5 py-0.5 bg-neutral-950 text-white font-mono text-[9px] font-bold rounded">TP</span>
                        )}
                        {item.has_isp === 1 && (
                          <span className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-950 font-mono text-[9px] font-bold rounded">ISP</span>
                        )}
                      </div>
                      <span className="text-xs text-neutral-400 font-mono group-hover:text-neutral-950">Detail &rarr;</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Brand Grid Section */
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <h2 className="text-xl font-extrabold text-neutral-950 tracking-tight">Katalog Merek Smartphone</h2>
                <p className="text-xs text-neutral-500 font-mono">Pilih merek HP untuk membuka lumbung data model terverifikasi</p>
              </div>
              <span className="px-3 py-1 bg-neutral-100 border border-neutral-300 text-neutral-950 font-mono font-bold text-xs rounded-lg uppercase">
                {brands.length} MEREK
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5">
              {brands.map((b) => (
                <Link
                  key={b.slug}
                  href={`/teknisi-hp/${b.slug}`}
                  className="p-4 bg-white border border-neutral-200 hover:border-neutral-950 rounded-xl transition-all group flex flex-col justify-between space-y-3 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <BrandLogo brand={b.slug} size="md" />
                    <span className="text-sm font-extrabold text-neutral-950 group-hover:underline font-mono leading-tight">{b.name}</span>
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">{b.count} Model &rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
