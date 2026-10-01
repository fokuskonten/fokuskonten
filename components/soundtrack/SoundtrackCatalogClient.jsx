'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import SoundtrackTrackRow from './SoundtrackTrackRow'
import SoundtrackTraktirKopiModal from './SoundtrackTraktirKopiModal'
import { useSoundtrackPlayer } from './SoundtrackPlayerContext'

export default function SoundtrackCatalogClient({ initialSummary }) {
  const { currentTrack, isPlaying, togglePlay } = useSoundtrackPlayer()

  // State Filter & Pencarian
  const [activeGenre, setActiveGenre] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [jumpInput, setJumpInput] = useState('')

  // State Traktir Kopi Modal
  const [traktirTrack, setTraktirTrack] = useState(null)

  // Cache Dataset Volume Penuh (Loaded on demand & on mount)
  const [vol1Tracks, setVol1Tracks] = useState(null)
  const [vol2Tracks, setVol2Tracks] = useState(null)
  const [isLoadingChunk, setIsLoadingChunk] = useState(false)

  // Debounce input pencarian 200ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim().toLowerCase())
      setCurrentPage(1)
    }, 200)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Lazy Fetcher Dataset Volume Penuh saat Dibutuhkan (Cache-Busting Anti Stale)
  const loadFullDataset = useCallback(async () => {
    if (vol1Tracks && vol2Tracks) return
    setIsLoadingChunk(true)
    try {
      const vTag = initialSummary?.lastUpdated ? encodeURIComponent(initialSummary.lastUpdated) : Date.now()
      const [res1, res2] = await Promise.all([
        vol1Tracks ? Promise.resolve(vol1Tracks) : fetch(`/content/soundtrack/catalog_vol1.json?v=${vTag}`, { cache: 'no-store' }).then(r => r.json()),
        vol2Tracks ? Promise.resolve(vol2Tracks) : fetch(`/content/soundtrack/catalog_vol2.json?v=${vTag}`, { cache: 'no-store' }).then(r => r.json())
      ])
      setVol1Tracks(res1)
      setVol2Tracks(res2)
    } catch (err) {
      console.warn('[SoundtrackCatalog] Gagal memuat chunk penuh, menggunakan dataset awal:', err.message)
    } finally {
      setIsLoadingChunk(false)
    }
  }, [vol1Tracks, vol2Tracks, initialSummary])

  // Muat otomatis seluruh katalog saat pertama kali komponen terpasang di browser
  useEffect(() => {
    loadFullDataset()
  }, [loadFullDataset])

  // Pemicu Lazy Load saat pengguna berinteraksi (search, ganti genre, ganti volume)
  const handleInteractionTrigger = useCallback(() => {
    if (!vol1Tracks || !vol2Tracks) {
      loadFullDataset()
    }
  }, [vol1Tracks, vol2Tracks, loadFullDataset])

  // Gabungan Seluruh Dataset Aktif (3.439 trek)
  const pool = useMemo(() => {
    if (!vol1Tracks && !vol2Tracks) {
      // Gunakan featured 24 lagu awal untuk first paint
      return initialSummary?.featured || []
    }
    const list1 = vol1Tracks || []
    const list2 = vol2Tracks || []
    return [...list1, ...list2]
  }, [vol1Tracks, vol2Tracks, initialSummary])

  // Pemfilteran Komputasi Berdasarkan Query & Genre
  const filteredTracks = useMemo(() => {
    let result = pool

    // Filter Genre
    if (activeGenre !== 'ALL') {
      result = result.filter(item => (item.g || item.genre) === activeGenre)
    }

    // Filter Query Pencarian
    if (debouncedQuery) {
      const cleanTokens = debouncedQuery.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean)
      result = result.filter(item => {
        const title = (item.t || item.title || '').toLowerCase()
        const sku = (item.s || item.track_sku || '').toLowerCase()
        const itemCode = (item.ic || item.item_code || '').toLowerCase()
        const genre = (item.g || item.genre || '').toLowerCase()
        const composer = (item.c || item.composer || '').toLowerCase()
        
        return cleanTokens.every(token => 
          title.includes(token) || sku.includes(token) || itemCode.includes(token) || genre.includes(token) || composer.includes(token)
        )
      })
    }

    return result
  }, [pool, activeGenre, debouncedQuery])

  // Total Items & Pagination Calculation
  const isFullDataLoaded = Boolean(vol1Tracks && vol2Tracks)
  const totalItems = useMemo(() => {
    if (isFullDataLoaded) return filteredTracks.length
    if (debouncedQuery || activeGenre !== 'ALL') return filteredTracks.length
    return initialSummary?.totalTracks || 3439
  }, [isFullDataLoaded, filteredTracks.length, debouncedQuery, activeGenre, initialSummary])

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  const paginatedTracks = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredTracks.slice(start, start + pageSize)
  }, [filteredTracks, currentPage, pageSize])

  const handlePageChange = useCallback((newPage) => {
    const target = Math.max(1, Math.min(totalPages, newPage))
    setCurrentPage(target)
    if (!vol1Tracks || !vol2Tracks) {
      loadFullDataset()
    }
    const el = document.getElementById('soundtrack-catalog-list')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [totalPages, vol1Tracks, vol2Tracks, loadFullDataset])

  const handleJumpSubmit = (e) => {
    e.preventDefault()
    const p = parseInt(jumpInput, 10)
    if (!isNaN(p) && p >= 1 && p <= totalPages) {
      handlePageChange(p)
      setJumpInput('')
    }
  }

  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('...')
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  const genresList = initialSummary?.genres || []
  const totalMasterTracks = initialSummary?.totalTracks || 3439

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* ── BANNER UPSELL: DWYOR BLACK BOX MASTER STUDIO 120 GB ────────────────── */}
      <div className="bg-neutral-950 text-white rounded-2xl p-6 sm:p-8 border border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-white text-neutral-950 font-mono font-bold text-xs rounded uppercase tracking-wider">
              PAKET MASTER STUDIO WAV 24-BIT
            </span>
            <span className="text-xs font-mono text-neutral-400">
              SKU: ID-AUDIO-MASTER
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-white">
            Mega Repositori Stock Music & Audio SFX Master (120 GB)
          </h2>

          <p className="text-sm text-neutral-300 leading-relaxed font-sans">
            Membutuhkan berkas master original uncompressed 24-bit 44.1kHz untuk kebutuhan siaran TV, film komersial, atau proyek agensi? Akses 10.365 berkas WAV studio utuh bebas kompresi dengan lisensi permanen.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/toko-digital/id-audio-master/"
              className="px-5 py-2.5 bg-white text-neutral-950 hover:bg-neutral-200 rounded-xl text-sm font-extrabold transition font-sans shadow-sm flex items-center gap-2 active:scale-95"
            >
              <span>Dapatkan Lisensi Master (Rp 200.000)</span>
              <span className="font-mono text-xs">→</span>
            </Link>
            <span className="text-xs text-neutral-400 font-mono">
              Akses Langsung Cloud Google Drive
            </span>
          </div>
        </div>
      </div>

      {/* ── SEARCH & FILTER CONTROLS ─────────────────────────────────────────── */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-5">
        {/* Search Input Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onFocus={handleInteractionTrigger}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              handleInteractionTrigger()
            }}
            placeholder="Cari judul musik, genre, suasana (contoh: Cinematic, Corporate, Guitar, Epic)..."
            className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-300 focus:border-neutral-950 focus:bg-white rounded-xl text-sm font-sans text-neutral-950 outline-none transition placeholder:text-neutral-400"
          />
          <svg className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-neutral-950 px-1.5 py-0.5"
            >
              ✕
            </button>
          )}
        </div>

        {/* Genre Chips Filter */}
        <div className="space-y-2 pt-1 border-t border-neutral-100">
          <span className="text-xs font-bold text-neutral-900 font-sans">Kategori Genre:</span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                setActiveGenre('ALL')
                setCurrentPage(1)
                handleInteractionTrigger()
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition font-sans ${
                activeGenre === 'ALL'
                  ? 'bg-neutral-950 text-white'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200'
              }`}
            >
              Semua ({totalMasterTracks})
            </button>

            {genresList.map((g) => (
              <button
                key={g.genre}
                onClick={() => {
                  setActiveGenre(g.genre)
                  setCurrentPage(1)
                  handleInteractionTrigger()
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition font-sans ${
                  activeGenre === g.genre
                    ? 'bg-neutral-950 text-white font-bold'
                    : 'bg-neutral-50 hover:bg-neutral-150 text-neutral-600 border border-neutral-200'
                }`}
              >
                {g.genre} ({g.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TRACK LISTING CONTAINER ──────────────────────────────────────────── */}
      <div id="soundtrack-catalog-list" className="space-y-4">
        <div className="flex items-center justify-between text-xs text-neutral-500 font-sans px-1">
          <span>
            Menampilkan <strong className="text-neutral-900 font-mono">{paginatedTracks.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</strong> - <strong className="text-neutral-900 font-mono">{Math.min(currentPage * pageSize, totalItems)}</strong> dari <strong className="text-neutral-900 font-mono">{totalItems.toLocaleString('id-ID')}</strong> trek lagu
          </span>
          {isLoadingChunk && (
            <span className="text-neutral-400 font-mono animate-pulse">
              Memuat katalog lengkap...
            </span>
          )}
        </div>

        {/* Rows List */}
        {paginatedTracks.length > 0 ? (
          <div className="space-y-2">
            {paginatedTracks.map((track, idx) => {
              const currentSku = currentTrack ? (currentTrack.s || currentTrack.track_sku) : null
              const thisSku = track.s || track.track_sku
              const isThisCurrent = currentSku === thisSku

              return (
                <SoundtrackTrackRow
                  key={thisSku || idx}
                  track={track}
                  index={(currentPage - 1) * pageSize + idx}
                  isCurrent={isThisCurrent}
                  isPlaying={isThisCurrent && isPlaying}
                  onTogglePlay={togglePlay}
                  onTraktirKopi={setTraktirTrack}
                />
              )
            })}
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center space-y-3">
            <p className="text-base font-extrabold text-neutral-950 font-display">
              Tidak ada lagu yang cocok dengan pencarian
            </p>
            <p className="text-xs text-neutral-500 font-sans max-w-sm mx-auto">
              Coba gunakan kata kunci yang lebih umum atau pilih kategori genre &quot;Semua&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveGenre('ALL')
              }}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-950 transition font-sans"
            >
              Reset Filter Pencarian
            </button>
          </div>
        )}

        {/* Full-Featured Numeric & Jump Pagination Bar */}
        {totalPages > 1 && (
          <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4 mt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Left / Center: Navigation Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                {/* First Page */}
                <button
                  type="button"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-white hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 transition font-sans"
                  title="Halaman Pertama"
                >
                  «
                </button>

                {/* Previous Page */}
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 sm:px-3.5 sm:py-2 bg-white hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 transition font-sans flex items-center gap-1"
                >
                  <span>‹</span>
                  <span className="hidden sm:inline">Sebelumnya</span>
                </button>

                {/* Numeric Page Pills */}
                {getPageNumbers().map((p, idx) => {
                  if (p === '...') {
                    return (
                      <span key={`ellipsis-${idx}`} className="px-2 py-1 text-xs font-mono text-neutral-400 select-none">
                        •••
                      </span>
                    )
                  }
                  const isCurrent = p === currentPage
                  return (
                    <button
                      key={`page-${p}`}
                      type="button"
                      onClick={() => handlePageChange(p)}
                      className={`min-w-[34px] sm:min-w-[38px] h-8 sm:h-9 px-2 rounded-lg font-mono text-xs font-bold transition ${
                        isCurrent
                          ? 'bg-neutral-950 text-white shadow-sm ring-1 ring-neutral-950'
                          : 'bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300'
                      }`}
                    >
                      {p}
                    </button>
                  )
                })}

                {/* Next Page */}
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 sm:px-3.5 sm:py-2 bg-white hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 transition font-sans flex items-center gap-1"
                >
                  <span className="hidden sm:inline">Berikutnya</span>
                  <span>›</span>
                </button>

                {/* Last Page */}
                <button
                  type="button"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-white hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 transition font-sans"
                  title="Halaman Terakhir"
                >
                  »
                </button>
              </div>

              {/* Right: Quick Jump & Per Page Selector */}
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-neutral-100">
                {/* Page Size Selector */}
                <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-sans">
                  <span className="hidden lg:inline text-[11px] text-neutral-500">Tampilkan:</span>
                  {[25, 50, 100].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setPageSize(size)
                        setCurrentPage(1)
                        if (!vol1Tracks || !vol2Tracks) loadFullDataset()
                      }}
                      className={`px-2 py-1 rounded font-mono text-xs font-bold transition ${
                        pageSize === size
                          ? 'bg-neutral-950 text-white'
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Jump to Page Form */}
                <form onSubmit={handleJumpSubmit} className="flex items-center gap-1.5">
                  <label htmlFor="jump-page-input" className="text-[11px] text-neutral-500 font-sans">
                    Lompat:
                  </label>
                  <input
                    id="jump-page-input"
                    type="number"
                    min="1"
                    max={totalPages}
                    value={jumpInput}
                    onChange={(e) => setJumpInput(e.target.value)}
                    placeholder={String(currentPage)}
                    className="w-14 px-2 py-1 bg-neutral-50 border border-neutral-300 rounded text-center text-xs font-mono font-bold text-neutral-950 outline-none focus:border-neutral-950"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1 bg-neutral-950 hover:bg-neutral-800 text-white rounded text-xs font-bold font-sans transition"
                  >
                    Buka
                  </button>
                </form>
              </div>
            </div>

            <div className="text-center pt-2 border-t border-neutral-100 text-[11px] font-mono text-neutral-500">
              Halaman {currentPage} dari {totalPages} • Total {totalItems.toLocaleString('id-ID')} Trek Audio Kualitas Master
            </div>
          </div>
        )}
      </div>

      {/* Traktir Kopi Rp 2.000 Modal */}
      <SoundtrackTraktirKopiModal
        isOpen={Boolean(traktirTrack)}
        onClose={() => setTraktirTrack(null)}
        track={traktirTrack}
      />
    </div>
  )
}
