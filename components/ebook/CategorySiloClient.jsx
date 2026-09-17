'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import EbookCover3D from './EbookCover3D'

const ITEMS_PER_PAGE = 24

/**
 * CategorySiloClient.jsx — Penjelajah E-Book Silo Kategori dengan Filter Instan & Paginasi
 */
export default function CategorySiloClient({ categoryName = '', categorySlug = '', items = [] }) {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter instan dalam kategori
  const filteredItems = useMemo(() => {
    if (!search.trim()) return items
    const q = search.trim().toLowerCase()
    return items.filter((item) => {
      const title = (item.title || '').toLowerCase()
      const author = (item.author || '').toLowerCase()
      const sku = (item.sku || '').toLowerCase()
      return title.includes(q) || author.includes(q) || sku.includes(q)
    })
  }, [items, search])

  // Hitung total halaman
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1

  // Item pada halaman aktif
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredItems.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredItems, currentPage])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      {/* ── SEARCH & STATS ROW ── */}
      <div className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:max-w-md relative">
          <input
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder={`Cari dalam kategori ${categoryName}...`}
            className="w-full pl-4 pr-4 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-hidden focus:ring-2 focus:ring-neutral-950"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-neutral-500">
          <span className="font-bold text-neutral-950">
            {filteredItems.length}
          </span>
          <span>Judul Terfilter</span>
          <span>&bull;</span>
          <span>Hal {currentPage} dari {totalPages}</span>
        </div>
      </div>

      {/* ── GRID E-BOOK ── */}
      {paginatedItems.length === 0 ? (
        <div className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-12 text-center space-y-2">
          <p className="font-bold text-neutral-950 text-sm">
            Tidak ada e-book yang cocok dengan pencarian Anda.
          </p>
          <button
            type="button"
            onClick={() => setSearch('')}
            className="mt-2 text-xs font-mono font-bold text-neutral-950 underline"
          >
            Reset Pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {paginatedItems.map((item) => (
            <Link
              key={item.sku}
              href={`/ebook/${categorySlug}/${item.slug}/`}
              className="group bg-white text-neutral-900 border border-neutral-200/80 dark:bg-white dark:text-neutral-900 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:border-neutral-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <EbookCover3D
                  coverImage={item.coverImage}
                  title={item.title}
                  sku={item.sku}
                  category={categoryName}
                  variant="fullframe"
                  size="full"
                />

                <div className="p-3.5 sm:p-4 pb-2">
                  <h3 className="font-extrabold text-xs sm:text-sm text-neutral-950 leading-snug line-clamp-2 group-hover:underline">
                    {item.title}
                  </h3>

                  {item.author && (
                    <p className="text-[11px] text-neutral-500 font-serif line-clamp-1 mt-1">
                      {item.author}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-3.5 sm:p-4 pt-0">
                <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>{item.pages ? `${item.pages} Hal` : 'PDF Lengkap'}</span>
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

      {/* ── PAGINASI KONTROL ── */}
      {totalPages > 1 && (
        <nav aria-label="Navigasi Halaman Silo" className="flex items-center justify-center gap-2 pt-6">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => {
              setCurrentPage((p) => Math.max(1, p - 1))
              window.scrollTo({ top: 300, behavior: 'smooth' })
            }}
            className="px-3.5 py-2 rounded-xl border border-neutral-300 text-xs font-mono font-bold hover:bg-neutral-100 disabled:opacity-40 transition-colors"
          >
            &larr; Sebelumnya
          </button>

          <span className="px-4 py-2 text-xs font-mono font-bold text-neutral-950">
            Halaman {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => {
              setCurrentPage((p) => Math.min(totalPages, p + 1))
              window.scrollTo({ top: 300, behavior: 'smooth' })
            }}
            className="px-3.5 py-2 rounded-xl border border-neutral-300 text-xs font-mono font-bold hover:bg-neutral-100 disabled:opacity-40 transition-colors"
          >
            Berikutnya &rarr;
          </button>
        </nav>
      )}
    </div>
  )
}
