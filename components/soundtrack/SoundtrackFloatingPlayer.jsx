'use client'

import React from 'react'
import Link from 'next/link'
import { useSoundtrackPlayer } from './SoundtrackPlayerContext'

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

export default function SoundtrackFloatingPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    isBuffering,
    playbackError,
    togglePlay,
    seek,
    closePlayer
  } = useSoundtrackPlayer()

  if (!currentTrack) return null

  const title = currentTrack.t || currentTrack.title || 'Soundtrack'
  const sku = currentTrack.s || currentTrack.track_sku || 'ST'
  const genre = currentTrack.g || currentTrack.genre || 'Cinematic'
  const safelinkUrl = currentTrack.l || currentTrack.safelink_url || '#'
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  const rawItemCode = currentTrack.ic || currentTrack.item_code || (() => {
    const url = currentTrack.u || currentTrack.cdn_url || ''
    const m = url.match(/_(\d+)\.opus$/i)
    if (m) return m[1]
    const m2 = url.match(/_(\d+)_/)
    if (m2) return m2[1]
    return sku
  })()
  const itemCode = String(rawItemCode || '').replace(/[\[\]\s]/g, '') || sku

  return (
    <aside aria-label="Pemutar Audio Soundtrack" className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-neutral-300 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
      {/* Progress Scrubber Top Line */}
      <div 
        className="w-full h-1.5 bg-neutral-200 cursor-pointer relative group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const clickX = e.clientX - rect.left
          const newTime = (clickX / rect.width) * duration
          seek(newTime)
        }}
      >
        <div 
          className="h-full bg-neutral-950 transition-all duration-75 relative"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-neutral-950 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Track Metadata Info */}
        <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
          <button
            onClick={() => togglePlay(currentTrack)}
            aria-label={isPlaying ? 'Jeda Audio' : 'Putar Audio'}
            className="w-11 h-11 flex-shrink-0 bg-neutral-950 text-white rounded-full flex items-center justify-center hover:bg-neutral-800 transition active:scale-95 shadow-sm"
          >
            {isBuffering ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Link
                href={`/soundtrack/${sku.toLowerCase()}/`}
                className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded text-neutral-950 transition"
                title={`Buka detail trek: ${itemCode}`}
              >
                {itemCode}
              </Link>
              <span className="text-xs text-neutral-500 font-sans truncate">
                {genre}
              </span>
            </div>
            <Link
              href={`/soundtrack/${sku.toLowerCase()}/`}
              className="text-sm font-extrabold text-neutral-950 hover:underline font-display truncate block"
              title={`Buka detail lagu ${title}`}
            >
              {title}
            </Link>
            {playbackError && (
              <p className="text-[11px] text-neutral-500 font-sans truncate">{playbackError}</p>
            )}
          </div>
        </div>

        {/* Center Progress & Scrubber (Desktop) */}
        <div className="flex items-center gap-3 w-full sm:w-80">
          <span className="font-mono text-xs text-neutral-500 w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={(e) => seek(parseFloat(e.target.value))}
            aria-label="Penggeser Durasi Audio"
            className="flex-1 h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-950"
          />
          <span className="font-mono text-xs text-neutral-500 w-10">
            {formatTime(duration)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <a
            href={safelinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-950 transition flex items-center gap-1.5 font-sans"
            title="Unduh gratis berkas Opus via Safelinku"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
            <span>Unduh Gratis</span>
          </a>

          <Link
            href="/toko-digital/id-audio-master/"
            className="px-3.5 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition font-sans flex items-center gap-1"
          >
            <span>Master 120 GB</span>
            <span className="text-[10px] font-mono opacity-80">→</span>
          </Link>

          <button
            onClick={closePlayer}
            aria-label="Tutup Pemutar Musik"
            className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-950 rounded-lg hover:bg-neutral-100 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}
