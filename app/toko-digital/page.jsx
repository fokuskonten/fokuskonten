'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import digitalProducts from '@/content/apps/digitalProducts.json'
import { createProductSlug } from './slugHelper'

const ITEMS_PER_PAGE = 24

const categories = [
  'Semua',
  'Kaos',
  'Desain Grafis',
  'Vektor',
  'Tekstur & Brush',
  'Video FX',
  'Mockup',
  'Font',
  'Preset & LUTs',
  'Presentasi',
  'Aplikasi',
  'E-Book'
]

const popularCategories = [
  'Semua',
  'Kaos',
  'Desain Grafis',
  'Vektor',
  'Tekstur & Brush',
  'Video FX',
  'Mockup',
  'Font',
  'Preset & LUTs',
  'Presentasi',
  'Aplikasi',
  'E-Book'
]

export default function TokoDigitalPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const sortOptions = [
    { id: 'popular', label: '🌟 Terpopuler' },
    { id: 'price_asc', label: '🏷️ Harga: Termurah' },
    { id: 'price_desc', label: '💎 Harga: Tertinggi' },
    { id: 'newest', label: '🕒 Terbaru (SKU)' }
  ]

  const currentSortLabel = sortOptions.find(o => o.id === sortBy)?.label || '🌟 Terpopuler'

  // Sync initial category & query from URL if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const catParam = params.get('cat')
      const qParam = params.get('q')
      if (catParam && categories.includes(catParam)) {
        setSelectedCategory(catParam)
      }
      if (qParam) {
        setSearchQuery(qParam)
      }
    }
  }, [])

  // Reset page to 1 when filters or sorting change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery, sortBy])

  // Count active items per category
  const categoryCounts = useMemo(() => {
    const activeItems = digitalProducts.filter(p => p.is_published !== 0 && p.isPublished !== false)
    const counts = { Semua: activeItems.length }
    categories.forEach((cat) => {
      if (cat !== 'Semua') {
        counts[cat] = activeItems.filter((p) => p.category === cat).length
      }
    })
    return counts
  }, [])

  // Filter & Sort products
  const filteredProducts = useMemo(() => {
    let result = digitalProducts.filter((p) => {
      const isActive = p.is_published !== 0 && p.isPublished !== false
      if (!isActive) return false

      const matchCat =
        selectedCategory === 'Semua' || p.category === selectedCategory
      const title = (p.title || p.name || '').toLowerCase()
      const sku = (p.sku || '').toLowerCase()
      const category = (p.category || '').toLowerCase()
      const query = searchQuery.toLowerCase().trim()

      const matchSearch =
        !query ||
        title.includes(query) ||
        sku.includes(query) ||
        category.includes(query)

      return matchCat && matchSearch
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
  }, [selectedCategory, searchQuery, sortBy])

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

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 bg-[#FAFAFA] text-neutral-900">
      
      {/* ── 1. CREATIVE MARKET CATEGORY SUB-NAV STRIP ────────────────────── */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 sm:top-20 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-3">
            {popularCategories
              .filter((cat) => cat === 'Semua' || (categoryCounts[cat] || 0) > 0)
              .map((cat) => {
                const count = categoryCounts[cat] || 0
                const isActive = selectedCategory === cat

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                      isActive
                        ? 'bg-neutral-950 text-white shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
          </div>
        </div>
      </div>

      {/* ── 2. CATALOG HEADER & TOOLBAR SECTION ──────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 pb-6 border-b border-neutral-200">
          {/* Category Title & Counter */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
              Katalog Produk Digital
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 font-display tracking-tight">
              {selectedCategory === 'Semua' ? 'Pusat Template & Aset Kreatif' : selectedCategory}
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Menampilkan <strong>{filteredProducts.length}</strong> aset digital siap pakai {selectedCategory !== 'Semua' ? `dalam kategori ${selectedCategory}` : ''}.
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
                placeholder={`Cari dari ${categoryCounts.Semua || 0} produk...`}
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
              Tidak ada produk yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {paginatedProducts.map((product) => {
                const origPrice = product.originalPrice || product.price * 2
                const discountPercent = origPrice > product.price
                  ? Math.round(((origPrice - product.price) / origPrice) * 100)
                  : null

                const productSlug = createProductSlug(product.sku, product.title)

                return (
                  <div
                    key={product.sku}
                    className="group bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Thumbnail Image Frame */}
                      <Link
                        href={`/toko-digital/${productSlug}/`}
                        className="block relative aspect-square bg-neutral-100 overflow-hidden flex items-center justify-center border-b border-neutral-100"
                      >
                        {product.coverImage ? (
                          <img
                            src={product.coverImage}
                            alt={product.title}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                              const fallback = e.currentTarget.parentElement.querySelector('.card-img-fallback')
                              if (fallback) fallback.style.display = 'flex'
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : null}
                        <div
                          className="card-img-fallback w-full h-full flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-white"
                          style={{ display: product.coverImage ? 'none' : 'flex' }}
                        >
                          <span className="text-3xl mb-1">📦</span>
                          <span className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-widest">{product.category}</span>
                          <span className="text-[11px] text-neutral-400 mt-1 line-clamp-2 px-2 leading-tight">{product.title}</span>
                        </div>
                      </Link>

                      {/* Info Section (Confident 14px Typography) */}
                      <div className="p-4 pb-2">
                        <div className="flex items-center justify-between text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                          <span>{product.category}</span>
                          <span className="font-mono text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded font-semibold text-[11px]">{product.sku}</span>
                        </div>
                        <Link href={`/toko-digital/${productSlug}/`}>
                          <h3 className="font-bold text-neutral-950 text-sm leading-snug group-hover:text-black transition-colors line-clamp-2 min-h-[40px]">
                            {product.title}
                          </h3>
                        </Link>
                      </div>
                    </div>

                    {/* Pricing & Action Section */}
                    <div className="p-4 pt-0">
                      <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between gap-2">
                        <div>
                          {/* Price Strikethrough + Discount */}
                          <div className="flex items-center gap-1.5 leading-none mb-1">
                            <span className="text-xs text-neutral-400 line-through">
                              {formatRupiah(origPrice)}
                            </span>
                            {discountPercent && (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-extrabold">
                                -{discountPercent}%
                              </span>
                            )}
                          </div>
                          {/* Final Price */}
                          <div className="text-base font-black text-neutral-950 leading-tight font-display">
                            {formatRupiah(product.price)}
                          </div>
                        </div>

                        {/* CTA Detail Button */}
                        <Link
                          href={`/toko-digital/${productSlug}/`}
                          className="px-3.5 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-sm hover:shadow flex items-center gap-1 shrink-0"
                        >
                          <span>Detail</span>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
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
