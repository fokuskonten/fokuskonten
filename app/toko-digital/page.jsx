'use client'

import { useState, useMemo, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import digitalProducts from '@/content/apps/digitalProducts.json'
import storeCategories from '@/content/apps/store_categories.json'
import ProductCard from '@/components/product/ProductCard'
import { createProductSlug } from './slugHelper'

const ITEMS_PER_PAGE = 24

function TokoDigitalContent() {
  const searchParams = useSearchParams()

  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [selectedFormat, setSelectedFormat] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
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
    { id: 'newest', label: 'Terbaru' },
    { id: 'price_asc', label: 'Harga: Termurah' },
    { id: 'price_desc', label: 'Harga: Tertinggi' },
  ]

  const currentSortLabel = sortOptions.find((o) => o.id === sortBy)?.label || 'Terbaru'

  const isInitializedRef = useRef(false)

  // 1. Sync from URL search params (on mount, Next.js client routing, or browser back/forward)
  useEffect(() => {
    const catParam = searchParams.get('cat')
    const fmtParam = searchParams.get('format')
    const qParam = searchParams.get('q')
    const sortParam = searchParams.get('sort')
    const pageParam = parseInt(searchParams.get('page'), 10)

    setSelectedCategory(catParam || 'Semua')
    setSelectedFormat(fmtParam ? fmtParam.toUpperCase() : 'Semua')
    setSearchQuery(qParam || '')
    setSortBy(sortParam || 'newest')
    setCurrentPage((!isNaN(pageParam) && pageParam > 0) ? pageParam : 1)

    isInitializedRef.current = true
  }, [searchParams])

  // 2. Custom event listener from Navbar for zero-latency, instant in-page filter switches
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleFilterChange = (e) => {
      const { category, format } = e.detail || {}
      if (category !== undefined) setSelectedCategory(category)
      if (format !== undefined) setSelectedFormat(format)
      setSearchQuery('')
      setCurrentPage(1)
    }

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const catParam = params.get('cat')
      const fmtParam = params.get('format')
      const qParam = params.get('q')
      const sortParam = params.get('sort')
      const pageParam = parseInt(params.get('page'), 10)

      setSelectedCategory(catParam || 'Semua')
      setSelectedFormat(fmtParam ? fmtParam.toUpperCase() : 'Semua')
      setSearchQuery(qParam || '')
      setSortBy(sortParam || 'newest')
      setCurrentPage((!isNaN(pageParam) && pageParam > 0) ? pageParam : 1)
    }

    window.addEventListener('fk_filter_change', handleFilterChange)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('fk_filter_change', handleFilterChange)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // 3. Keep URL in sync when filter or page state changes
  useEffect(() => {
    if (!isInitializedRef.current) return

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams()
      if (currentPage > 1) params.set('page', String(currentPage))
      if (selectedCategory && selectedCategory !== 'Semua') params.set('cat', selectedCategory)
      if (selectedFormat && selectedFormat !== 'Semua') params.set('format', selectedFormat)
      if (searchQuery && searchQuery.trim()) params.set('q', searchQuery.trim())
      if (sortBy && sortBy !== 'newest') params.set('sort', sortBy)

      const qs = params.toString()
      const newUrl = qs ? `/toko-digital/?${qs}` : '/toko-digital/'
      const currentFull = window.location.pathname + window.location.search
      if (currentFull !== newUrl) {
        window.history.replaceState(null, '', newUrl)
      }
    }
  }, [selectedCategory, selectedFormat, searchQuery, sortBy, currentPage])

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
    } else {
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

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat)
    setSelectedFormat('Semua')
    setCurrentPage(1)
    setIsCategoryOpen(false)
  }

  const handleFormatSelect = (fmt) => {
    setSelectedFormat(fmt)
    setSelectedCategory('Semua')
    setCurrentPage(1)
    setIsCategoryOpen(false)
  }

  const handleSortSelect = (sortId) => {
    setSortBy(sortId)
    setCurrentPage(1)
    setIsSortOpen(false)
  }

  const handleSearchChange = (val) => {
    setSearchQuery(val)
    setCurrentPage(1)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    if (typeof window !== 'undefined') {
      const headerEl = document.getElementById('katalog-header')
      if (headerEl) {
        const topPos = headerEl.getBoundingClientRect().top + window.pageYOffset - 90
        window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' })
      }
    }
  }

  const resetAllFilters = () => {
    setSelectedCategory('Semua')
    setSelectedFormat('Semua')
    setSearchQuery('')
    setCurrentPage(1)
    try {
      sessionStorage.removeItem('fk_toko_session')
    } catch (e) {}
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/toko-digital/')
    }
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-24 bg-[#FAFAFA] text-neutral-900">
      
      {/* ── CATALOG HEADER & TOOLBAR SECTION ──────────────────────────── */}
      <div id="katalog-header" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 pb-6 border-b border-neutral-200">
          {/* Category Title & Counter */}
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Katalog Desain
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
                ? `Format .${selectedFormat}`
                : (selectedCategory === 'Semua' ? 'Katalog Template & Desain' : selectedCategory)}
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Menampilkan <strong>{filteredProducts.length}</strong> produk{' '}
              {selectedFormat !== 'Semua'
                ? `format .${selectedFormat}`
                : (selectedCategory !== 'Semua' ? `kategori ${selectedCategory}` : 'siap pakai')}.
            </p>
          </div>

          {/* Integrated Category Dropdown, Sort Dropdown & Search Bar (Aligned Right) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 w-full lg:w-auto ml-auto">
            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              {/* 1. Category Dropdown (Berdasarkan Kategori yang Sudah Ada) */}
              <div className="relative flex-1 sm:flex-initial">
                <button
                  type="button"
                  onClick={() => {
                    setIsCategoryOpen(!isCategoryOpen)
                    setIsSortOpen(false)
                  }}
                  className="w-full sm:w-auto py-2.5 pl-3.5 pr-8 rounded-xl bg-white border border-neutral-200 text-xs sm:text-sm font-bold text-neutral-800 hover:border-black transition-all shadow-sm flex items-center justify-between gap-2"
                >
                  <span>{selectedCategory === 'Semua' ? 'Semua Kategori' : selectedCategory}</span>
                  <span className="text-neutral-400 text-xs">▼</span>
                </button>

                {isCategoryOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsCategoryOpen(false)}
                    />
                    <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-neutral-200 shadow-2xl p-1.5 z-50 max-h-72 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden animate-in fade-in zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => handleCategorySelect('Semua')}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-left transition-colors ${
                        selectedCategory === 'Semua' ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
                      }`}
                    >
                      <span>Semua Kategori</span>
                      <span className="font-mono text-xs opacity-75">({totalActive})</span>
                    </button>
                    {realtimeCategories.map(([cat, count]) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleCategorySelect(cat)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-left transition-colors ${
                          selectedCategory === cat ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
                        }`}
                      >
                        <span>{cat}</span>
                        <span className="font-mono text-xs opacity-75">({count})</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* 2. Custom Popover Sort Dropdown (Clean, Professional, No Emojis) */}
            <div className="relative flex-1 sm:flex-initial">
              <button
                type="button"
                onClick={() => {
                  setIsSortOpen(!isSortOpen)
                  setIsCategoryOpen(false)
                }}
                className="w-full sm:w-auto py-2.5 pl-3.5 pr-8 rounded-xl bg-white border border-neutral-200 text-xs sm:text-sm font-bold text-neutral-800 hover:border-black transition-all shadow-sm flex items-center justify-between gap-2"
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
                  <div className="absolute right-0 sm:right-0 sm:left-auto top-full mt-2 w-52 bg-white rounded-2xl border border-neutral-200 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {sortOptions.map((opt) => {
                      const isSelected = sortBy === opt.id
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSortSelect(opt.id)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-left transition-colors ${
                            isSelected
                              ? 'bg-neutral-900 text-white font-bold'
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

          {/* 3. Search Input Box */}
          <div className="relative w-full sm:w-64 lg:w-72 flex-shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={`Cari dari ${totalActive} produk...`}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs sm:text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:border-black focus:ring-2 focus:ring-black/10 transition-all outline-none shadow-sm"
              />
              <svg
                className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-neutral-700 bg-neutral-100 px-1.5 py-0.5 rounded"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. PRODUCT CATALOG GRID (STANDAR CREATIVE MARKET) ────────────── */}
      <div className="container-page max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 p-8 max-w-md mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 mx-auto mb-3 border border-neutral-200/60">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
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
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
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
                            onClick={() => handlePageChange(page)}
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
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
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

export default function TokoDigitalPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-28 pb-24 bg-[#FAFAFA] flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-neutral-900 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <TokoDigitalContent />
    </Suspense>
  )
}
