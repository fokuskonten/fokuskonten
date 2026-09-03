'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import digitalProducts from '@/content/apps/digitalProducts.json'
import ProductCard from '@/components/product/ProductCard'
import { createProductSlug } from './slugHelper'

const ITEMS_PER_PAGE = 24

export default function TokoDigitalPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [selectedFormat, setSelectedFormat] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Realtime kategori & format HANYA dari produk aktif (bukan dummy!)
  const { realtimeCategories, realtimeFormats, totalActive } = useMemo(() => {
    const activeItems = digitalProducts.filter((p) => p.is_published !== 0 && p.isPublished !== false)
    const catCounts = {}
    const fmtCounts = {}

    activeItems.forEach((p) => {
      if (p.category && p.category.trim()) {
        const c = p.category.trim()
        catCounts[c] = (catCounts[c] || 0) + 1
      }
      if (p.format && p.format.trim()) {
        const f = p.format.trim().toUpperCase()
        fmtCounts[f] = (fmtCounts[f] || 0) + 1
      }
    })

    const cats = Object.entries(catCounts)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])

    const fmts = Object.entries(fmtCounts)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])

    return {
      realtimeCategories: cats,
      realtimeFormats: fmts,
      totalActive: activeItems.length,
    }
  }, [])

  const sortOptions = [
    { id: 'popular', label: '🌟 Terpopuler' },
    { id: 'price_asc', label: '🏷️ Harga: Termurah' },
    { id: 'price_desc', label: '💎 Harga: Tertinggi' },
    { id: 'newest', label: '🕒 Terbaru (SKU)' },
  ]

  const currentSortLabel = sortOptions.find((o) => o.id === sortBy)?.label || '🌟 Terpopuler'

  // Sync initial category & format & query from URL if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const catParam = params.get('cat')
      const fmtParam = params.get('format')
      const qParam = params.get('q')

      if (catParam) {
        setSelectedCategory(catParam)
        setSelectedFormat('Semua')
      }
      if (fmtParam) {
        setSelectedFormat(fmtParam.toUpperCase())
        setSelectedCategory('Semua')
      }
      if (qParam) {
        setSearchQuery(qParam)
      }
    }
  }, [])

  // Reset page to 1 when filters or sorting change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedFormat, searchQuery, sortBy])

  // Filter & Sort products realtime
  const filteredProducts = useMemo(() => {
    let result = digitalProducts.filter((p) => {
      const isActive = p.is_published !== 0 && p.isPublished !== false
      if (!isActive) return false

      const matchCat =
        selectedCategory === 'Semua' || p.category === selectedCategory

      const matchFmt =
        selectedFormat === 'Semua' ||
        (p.format && p.format.toUpperCase() === selectedFormat.toUpperCase())

      const title = (p.title || p.name || '').toLowerCase()
      const sku = (p.sku || '').toLowerCase()
      const category = (p.category || '').toLowerCase()
      const format = (p.format || '').toLowerCase()
      const query = searchQuery.toLowerCase().trim()

      const matchSearch =
        !query ||
        title.includes(query) ||
        sku.includes(query) ||
        category.includes(query) ||
        format.includes(query)

      return matchCat && matchFmt && matchSearch
    })

    // Apply Sorting
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.sku || '').localeCompare(a.sku || '', undefined, { numeric: true }))
    }

    return result
  }, [selectedCategory, selectedFormat, searchQuery, sortBy])

  // Pagination slice
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredProducts, currentPage])

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num)
  }

  const isFiltering = selectedCategory !== 'Semua' || selectedFormat !== 'Semua' || !!searchQuery

  const resetAllFilters = () => {
    setSelectedCategory('Semua')
    setSelectedFormat('Semua')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-24 bg-[#FAFAFA] text-neutral-900">
      
      {/* ── CATALOG HEADER & TOOLBAR SECTION ──────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 pb-6 border-b border-neutral-200">
          {/* Category Title & Counter */}
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Katalog Produk Digital
              </span>
              {isFiltering && (
                <>
                  <span className="text-neutral-300">•</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-neutral-900 text-white shadow-sm">
                    <span>{selectedFormat !== 'Semua' ? `Format .${selectedFormat}` : selectedCategory}</span>
                    <button
                      onClick={resetAllFilters}
                      className="hover:text-red-300 transition-colors ml-0.5"
                      title="Hapus filter"
                    >
                      ✕
                    </button>
                  </span>
                  <button
                    onClick={resetAllFilters}
                    className="text-xs font-semibold text-neutral-500 hover:text-black underline transition-colors"
                  >
                    Reset Filter
                  </button>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 font-display tracking-tight">
              {selectedFormat !== 'Semua'
                ? `Format Master .${selectedFormat}`
                : (selectedCategory === 'Semua' ? 'Pusat Template & Aset Kreatif' : selectedCategory)}
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Menampilkan <strong>{filteredProducts.length}</strong> aset digital siap pakai{' '}
              {selectedFormat !== 'Semua'
                ? `dengan format file .${selectedFormat}`
                : (selectedCategory !== 'Semua' ? `dalam kategori ${selectedCategory}` : 'resmi FokusKonten')}.
            </p>
          </div>

          {/* Integrated Search Bar & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Search Input Box */}
            <div className="relative w-full sm:w-72 lg:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Cari dari ${totalActive} produk...`}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-neutral-200 text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:border-black focus:ring-2 focus:ring-black/10 transition-all outline-none shadow-sm"
              />
              <svg
                className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-neutral-700 bg-neutral-100 px-1.5 py-0.5 rounded"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Custom Popover Sort Dropdown */}
            <div className="relative w-full sm:w-auto sm:min-w-[190px]">
              <button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full py-2.5 pl-4 pr-8 rounded-xl bg-white border border-neutral-200 text-sm font-bold text-neutral-800 hover:border-black transition-all shadow-sm flex items-center justify-between gap-2"
              >
                <span>{currentSortLabel}</span>
                <span className="text-neutral-400 text-xs">▼</span>
              </button>

              {isSortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsSortOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-neutral-200 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {sortOptions.map((opt) => {
                      const isSelected = sortBy === opt.id
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSortBy(opt.id)
                            setIsSortOpen(false)
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-left transition-colors ${
                            isSelected
                              ? 'bg-neutral-900 text-white'
                              : 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && <span>✓</span>}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. PRODUCT CATALOG GRID (STANDAR CREATIVE MARKET) ────────────── */}
      <div className="container-page max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 p-8 max-w-md mx-auto shadow-sm">
            <span className="text-4xl mb-2 block">📦</span>
            <h3 className="text-base font-bold text-neutral-900">Produk Tidak Ditemukan</h3>
            <p className="text-sm text-neutral-500 mt-1">
              Tidak ada produk yang cocok dengan filter yang dipilih.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-4 px-5 py-2.5 rounded-xl bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.sku} product={product} />
              ))}
            </div>

            {/* ── 4. PAGINATION CONTROLS ───────────────────────────────────── */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-neutral-200 bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-sm"
                >
                  &larr; Sebelumnya
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      return (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1
                      )
                    })
                    .map((page, idx, arr) => {
                      const prev = arr[idx - 1]
                      const showEllipsis = prev && page - prev > 1

                      return (
                        <span key={page} className="flex items-center">
                          {showEllipsis && (
                            <span className="px-1 text-xs text-neutral-400">...</span>
                          )}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                              currentPage === page
                                ? 'bg-black text-white shadow-sm'
                                : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                            }`}
                          >
                            {page}
                          </button>
                        </span>
                      )
                    })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-neutral-200 bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-sm"
                >
                  Selanjutnya &rarr;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
