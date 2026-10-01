'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSoundtrackPlayer } from './SoundtrackPlayerContext'
import { getSoundtrackSafelinkUrl } from '@/lib/soundtrackCdn'

function formatDuration(seconds) {
  if (isNaN(seconds) || seconds <= 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

function formatBytes(bytes) {
  if (!bytes || bytes <= 0) return '0 KB'
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(0)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

export default function SoundtrackTrackRow({
  track,
  index,
  isCurrent = false,
  isPlaying = false,
  onTogglePlay,
  onTraktirKopi
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeVariationIndex, setActiveVariationIndex] = useState(0)

  // Akses context pemutar global untuk status presisi per-variasi
  const { currentTrack, isPlaying: globalPlaying, togglePlay } = useSoundtrackPlayer()

  if (!track) return null

  const sku = track.s || track.track_sku || `ST-${index + 1}`
  const title = track.t || track.title || 'Untitled Track'
  const duration = track.d || track.duration_sec || 0
  const size = track.z || track.file_size_bytes || 0
  const genre = track.g || track.genre || 'Cinematic'
  const safelinkUrl = track.l || track.safelink_url || '#'
  const variationsCount = track.vc || track.variations_count || 1

  // Ekstraksi Kode Unik Bawaan Asli dari Folder Audio (contoh: 5450489)
  const rawCode = track.ic || track.item_code || (() => {
    const url = track.u || track.cdn_url || ''
    const m = url.match(/_(\d+)\.opus$/i)
    if (m) return m[1]
    const m2 = url.match(/_(\d+)_/)
    if (m2) return m2[1]
    return sku
  })()
  const itemCode = String(rawCode || '').replace(/[\[\]\s]/g, '') || sku

  // Daftar variasi distinct
  let variationsList = track.vl || track.variationsList || []
  if (variationsList.length === 0 && track.variations_json) {
    try {
      variationsList = typeof track.variations_json === 'string' ? JSON.parse(track.variations_json) : track.variations_json
    } catch (_) {}
  }

  // Cek apakah trek ini dan variasi spesifik yang sedang aktif bermain
  const currentSku = currentTrack ? (currentTrack.s || currentTrack.track_sku) : null
  const isThisTrackActive = currentSku === sku
  const isMainPlaying = isThisTrackActive && globalPlaying && (currentTrack?.vIdx === null || currentTrack?.vIdx === undefined)
  const isVariationPlaying = (vIdx) => isThisTrackActive && globalPlaying && currentTrack?.vIdx === vIdx

  // Handler Putar Lagu Utama
  const handleToggleMain = () => {
    const playFn = onTogglePlay || togglePlay
    if (playFn) {
      playFn({
        ...track,
        vIdx: null,
        variationName: null,
        title: title,
        audioUrl: `/api/v1/soundtrack/stream/${sku}`
      })
    }
  }

  // Handler Putar Variasi Potongan Fisik Spesifik
  const handleToggleVariation = (vIdx, v) => {
    const vName = typeof v === 'string' ? v : (v?.n || `Versi ${vIdx + 1}`)
    const cleanVName = vName.replace(/_/g, ' ')
    setActiveVariationIndex(vIdx)

    const playFn = onTogglePlay || togglePlay
    if (playFn) {
      playFn({
        ...track,
        vIdx: vIdx,
        variationName: cleanVName,
        title: `${title} (${cleanVName})`,
        audioUrl: `/api/v1/soundtrack/stream-variation/${sku}/${vIdx}`
      })
    }
  }

  return (
    <div
      className={`group flex flex-col p-3.5 sm:p-4 rounded-xl border transition-all ${
        isThisTrackActive
          ? 'bg-neutral-50 border-neutral-950 shadow-sm'
          : 'bg-white border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50/60'
      }`}
    >
      {/* Baris Utama: Pemutar, Judul, Durasi, dan Tombol Unduh */}
      <div className="flex items-center justify-between w-full">
        {/* Left: Play Control & Metadata */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1 pr-2">
          {/* Play/Pause Button Utama */}
          <button
            type="button"
            onClick={handleToggleMain}
            aria-label={isMainPlaying ? `Jeda lagu ${title}` : `Putar lagu ${title}`}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-95 ${
              isMainPlaying
                ? 'bg-neutral-950 text-white shadow-sm ring-2 ring-neutral-950/20'
                : 'bg-neutral-100 group-hover:bg-neutral-950 group-hover:text-white text-neutral-900 border border-neutral-300'
            }`}
          >
            {isMainPlaying ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="w-4 h-4 fill-current translate-x-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Info Text */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
              <Link
                href={`/soundtrack/${sku.toLowerCase()}/`}
                className="font-mono text-[10px] sm:text-xs font-bold px-1.5 py-0.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded text-neutral-950 transition"
                title={`Kode Item: ${itemCode}`}
              >
                {itemCode}
              </Link>
              <span className="text-[11px] sm:text-xs font-medium text-neutral-600 bg-neutral-100/80 px-2 py-0.5 rounded border border-neutral-200">
                {genre}
              </span>
              {variationsCount > 1 && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition flex items-center gap-1 active:scale-95 ${
                    isExpanded
                      ? 'bg-neutral-950 text-white ring-2 ring-neutral-950/20'
                      : 'bg-neutral-950 hover:bg-neutral-800 text-white'
                  }`}
                  title={isExpanded ? 'Tutup daftar variasi' : `Buka ${variationsCount} variasi versi master`}
                >
                  <span>{variationsCount} Versi</span>
                  <span className={`text-[9px] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>▾</span>
                </button>
              )}
            </div>

            <div>
              <Link
                href={`/soundtrack/${sku.toLowerCase()}/`}
                className="group/title inline-flex items-center gap-1.5 max-w-full text-left"
                title={`Buka halaman detail lagu ${title}`}
              >
                <h3
                  className={`text-sm sm:text-base font-extrabold truncate transition-colors ${
                    isCurrent
                      ? 'text-neutral-950 underline decoration-neutral-950'
                      : 'text-neutral-900 group-hover/title:text-neutral-950 group-hover/title:underline'
                  }`}
                >
                  {title}
                </h3>
                <span className="text-neutral-400 group-hover/title:text-neutral-950 text-xs font-bold transition flex-shrink-0">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Technical Stats & Download Action */}
        <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
          {/* Duration Meta */}
          <div className="hidden sm:flex items-center">
            <span className="font-mono text-xs font-bold text-neutral-800">
              {formatDuration(duration)}
            </span>
          </div>

          {/* Download Buttons: Safelinku & Traktir Kopi */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => onTraktirKopi && onTraktirKopi(track)}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 active:scale-95 shadow-sm"
              title="Traktir Kopi Rp 2.000 (Unduh Instan Master Bebas Iklan)"
            >
              <span className="font-mono text-[11px]">Rp 2k</span>
              <span className="hidden md:inline font-sans text-xs">Instan</span>
            </button>

            <a
              href={safelinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 transition flex items-center gap-1 active:scale-95"
              title="Unduh gratis berkas audio master via Safelinku"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              <span className="hidden sm:inline font-sans">Gratis</span>
            </a>
          </div>
        </div>
      </div>

      {/* Accordion Dropdown Variasi Versi */}
      {isExpanded && variationsCount > 1 && (
        <div className="w-full border-t border-neutral-200 mt-3 pt-3 space-y-2 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans pb-1">
            <span className="font-extrabold text-neutral-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-950 inline-block" />
              <span>Daftar Variasi Master Studio ({variationsList.length || variationsCount} Versi):</span>
            </span>
            <Link
              href={`/soundtrack/${sku.toLowerCase()}/`}
              className="text-xs font-bold text-neutral-900 hover:underline flex items-center gap-1"
            >
              <span>Buka Spesifikasi & Lisensi Master</span>
              <span>→</span>
            </Link>
          </div>

          <div className="space-y-1.5">
            {(variationsList.length > 0 ? variationsList : [{ n: `${title} (Master Studio)`, f: ['WAV', 'MP3'] }]).map((v, vIdx) => {
              const vName = typeof v === 'string' ? v : (v.n || `Versi ${vIdx + 1}`)
              const cleanVName = vName.replace(/_/g, ' ')
              const vFormats = typeof v === 'object' && v.f ? v.f.join(' / ') : 'WAV / MP3'
              const isCutPlaying = isVariationPlaying(vIdx)
              const varSafelinkUrl = getSoundtrackSafelinkUrl(sku, vIdx)

              return (
                <div
                  key={vIdx}
                  className={`flex items-center justify-between p-2 sm:p-2.5 rounded-xl border transition-all ${
                    isCutPlaying
                      ? 'bg-neutral-100/90 border-neutral-950 shadow-sm'
                      : 'bg-neutral-50 hover:bg-neutral-100/70 border-neutral-200'
                  }`}
                >
                  {/* Left: Play Icon (DI KIRI) + Number + BOLD Title */}
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 pr-2 sm:pr-3">
                    {/* Play/Pause Button Icon-Only on the LEFT */}
                    <button
                      type="button"
                      onClick={() => handleToggleVariation(vIdx, v)}
                      aria-label={isCutPlaying ? `Jeda lagu ${cleanVName}` : `Putar variasi ${cleanVName}`}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition active:scale-95 shadow-sm ${
                        isCutPlaying
                          ? 'bg-neutral-950 text-white ring-2 ring-neutral-950/20'
                          : 'bg-white hover:bg-neutral-950 hover:text-white text-neutral-900 border border-neutral-300'
                      }`}
                      title={isCutPlaying ? 'Jeda' : 'Putar'}
                    >
                      {isCutPlaying ? (
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                          <rect x="6" y="5" width="4" height="14" rx="1" />
                          <rect x="14" y="5" width="4" height="14" rx="1" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3 fill-current translate-x-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    {/* Number badge */}
                    <span className="w-5 h-5 bg-white border border-neutral-300 rounded text-[10px] font-mono font-bold flex items-center justify-center text-neutral-800 flex-shrink-0">
                      {vIdx + 1}
                    </span>

                    {/* BOLD Title like the others */}
                    <span
                      className="text-xs sm:text-sm font-extrabold text-neutral-950 truncate font-display"
                      title={vName}
                    >
                      {cleanVName}
                    </span>
                  </div>

                  {/* Right: Master Studio Format Tag + Download Buttons */}
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <span className="hidden sm:inline px-2 py-0.5 bg-white border border-neutral-300 rounded font-mono text-[10px] text-neutral-700 font-bold uppercase tracking-wider">
                      {vFormats}
                    </span>

                    {/* Tombol Traktir Kopi Rp 2k Variasi */}
                    <button
                      type="button"
                      onClick={() => onTraktirKopi && onTraktirKopi({
                        ...track,
                        vIdx,
                        title: `${title} (${cleanVName})`
                      })}
                      className="px-2 py-1 bg-neutral-950 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 active:scale-95 shadow-sm"
                      title={`Traktir Kopi Rp 2.000 (Unduh Instan ${cleanVName} Bebas Iklan)`}
                    >
                      <span className="font-mono text-[11px]">Rp 2k</span>
                      <span className="hidden md:inline font-sans text-xs">Instan</span>
                    </button>

                    {/* Tombol Unduh Safelinku Variasi */}
                    <a
                      href={varSafelinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-white hover:bg-neutral-200 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 transition flex items-center gap-1 active:scale-95"
                      title={`Unduh gratis berkas audio master ${cleanVName} via Safelinku`}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                      </svg>
                      <span className="hidden sm:inline font-sans text-xs">Gratis</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

