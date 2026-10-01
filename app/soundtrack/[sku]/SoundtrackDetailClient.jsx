'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import SoundtrackTraktirKopiModal from '@/components/soundtrack/SoundtrackTraktirKopiModal'
import { getSoundtrackSafelinkUrl, getSoundtrackStreamUrl } from '@/lib/soundtrackCdn'

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

export default function SoundtrackDetailClient({ track }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(track?.duration_sec || 0)
  const [traktirOpen, setTraktirOpen] = useState(false)
  const [traktirTrack, setTraktirTrack] = useState(null)
  const [copiedLink, setCopiedLink] = useState(false)
  const [activeCutIndex, setActiveCutIndex] = useState(null)

  const audioRef = useRef(null)

  const sku = track?.track_sku || 'ST'
  const title = track?.title || 'Soundtrack Master'
  const genre = track?.genre || 'Cinematic'
  const mood = track?.mood || 'Inspirational'
  const composer = track?.composer || 'AudioJungle Master Producer'
  const sizeBytes = track?.file_size_bytes || 0
  const cdnUrl = track?.cdn_url || ''
  const safelinkUrl = track?.safelink_url || '#'
  const variationsCount = track?.variations_count || 1
  const variationsList = track?.variationsList || []
  const rawItemCode = track?.item_code || (track?.cdn_url ? (track.cdn_url.match(/_(\d+)\.opus$/i)?.[1] || track.cdn_url.match(/_(\d+)_/)?.[1]) : null) || sku
  const itemCode = String(rawItemCode || '').replace(/[\[\]\s]/g, '') || sku

  const [audioSource, setAudioSource] = useState(() => {
    if (typeof window !== 'undefined') {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.')
      if (isLocal && sku) {
        return `/api/v1/soundtrack/stream/${sku}`
      }
    }
    return cdnUrl || (sku ? `/api/v1/soundtrack/stream/${sku}` : '')
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.')
      if (isLocal && sku) {
        setAudioSource(`/api/v1/soundtrack/stream/${sku}`)
      } else {
        setAudioSource(cdnUrl || `/api/v1/soundtrack/stream/${sku}`)
      }
    }
  }, [sku, cdnUrl])

  // Audio Event Handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration)
      }
    }
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleError = () => {
      const fallback = `/api/v1/soundtrack/stream/${sku}`
      if (audio.src !== fallback && !audio.src.endsWith(fallback)) {
        audio.src = fallback
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
        return
      }
      setIsPlaying(false)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [sku])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      if (activeCutIndex !== null) {
        setActiveCutIndex(null)
        audio.src = audioSource
        setCurrentTime(0)
      }
      audio.play().then(() => {
        setIsPlaying(true)
      }).catch((e) => {
        console.warn('Playback error:', e.message)
      })
    }
  }, [isPlaying, activeCutIndex, audioSource])

  const handlePlayCut = (idx, item) => {
    const audio = audioRef.current
    if (!audio) return

    if (activeCutIndex === idx && isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    setActiveCutIndex(idx)
    const cutUrl = getSoundtrackStreamUrl(track, idx)
    audio.pause()
    audio.src = cutUrl
    setCurrentTime(0)
    audio.play().then(() => {
      setIsPlaying(true)
    }).catch((err) => {
      console.warn('[SoundtrackDetail] Play cut error:', err.message)
      setIsPlaying(false)
    })
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newPct = Math.max(0, Math.min(1, clickX / rect.width))
    const newTime = newPct * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="space-y-8 sm:space-y-12">
      <audio ref={audioRef} src={audioSource} preload="none" />

      {/* ── BREADCRUMB ──────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 font-sans">
        <Link href="/" className="hover:text-neutral-950 transition">Beranda</Link>
        <span>/</span>
        <Link href="/soundtrack/" className="hover:text-neutral-950 transition">Direktori Soundtrack</Link>
        <span>/</span>
        <span className="font-mono text-neutral-950 font-bold">{itemCode}</span>
      </nav>

      {/* ── HERO PLAYER CARD (MONOKROM STANDAR BAKU) ────────────────────────── */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-8">
        {/* Header Metadata Chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-neutral-950 text-white font-mono font-bold text-xs rounded" title={`Kode Item Audio: ${itemCode}`}>
              {itemCode}
            </span>
            <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 rounded text-xs font-bold text-neutral-900 font-sans">
              {genre}
            </span>
            <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded text-xs text-neutral-600 font-sans">
              Suasana: {mood}
            </span>
            {variationsCount > 1 && (
              <span className="px-2.5 py-1 bg-neutral-950 text-white rounded text-xs font-mono font-bold">
                {variationsCount} Variasi Master
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-800 transition font-sans flex items-center gap-1.5 active:scale-95"
          >
            <span>{copiedLink ? 'Tautan Disalin!' : 'Bagikan Lagu'}</span>
            <span className="font-mono text-xs">🔗</span>
          </button>
        </div>

        {/* Title & Author */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 font-display tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-sans">
            Komposer / Lisensi Sumber: <strong className="text-neutral-900 font-medium">{composer}</strong>
          </p>
        </div>

        {/* Big Interactive Player Console */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? `Jeda ${title}` : `Putar ${title}`}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white flex items-center justify-center flex-shrink-0 shadow-md transition active:scale-95 ring-4 ring-neutral-950/10"
            >
              {isPlaying ? (
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Scrubber & Timers */}
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-700">
                <span>{formatDuration(currentTime)}</span>
                <span>{formatDuration(duration)}</span>
              </div>

              {/* Progress Track */}
              <div
                onClick={handleSeek}
                className="w-full h-3 bg-neutral-200 rounded-full cursor-pointer relative overflow-hidden group"
              >
                <div
                  className="h-full bg-neutral-950 transition-all duration-75 relative rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>Pratinjau Web: Streaming Instan</span>
                <span>Unduhan: Master Studio (WAV / MP3)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dual-Action Monetization & Download Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Action 1: Traktir Kopi Rp 2.000 */}
          <div className="p-5 bg-neutral-50 border border-neutral-300 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase font-sans text-neutral-900 tracking-wider">
                Unduh Cepat Tanpa Iklan
              </span>
              <span className="px-2 py-0.5 bg-neutral-950 text-white font-mono font-bold text-xs rounded">
                Rp 2.000
              </span>
            </div>
            <p className="text-xs text-neutral-600 font-sans leading-relaxed">
              Dapatkan tautan unduhan instan berkecepatan tinggi via QRIS Midtrans bebas jeda iklan Safelinku.
            </p>
            <button
              type="button"
              onClick={() => {
                setTraktirTrack(track)
                setTraktirOpen(true)
              }}
              className="w-full py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-extrabold rounded-lg transition font-sans flex items-center justify-center gap-2 shadow-sm active:scale-95"
            >
              <span>Traktir Kopi (Unduh Instan)</span>
              <span className="font-mono text-xs">→</span>
            </button>
          </div>

          {/* Action 2: Safelinku Free Download */}
          <div className="p-5 bg-white border border-neutral-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase font-sans text-neutral-900 tracking-wider">
                Unduh Gratis
              </span>
              <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-900 font-mono font-bold text-xs rounded">
                Rp 0
              </span>
            </div>
            <p className="text-xs text-neutral-600 font-sans leading-relaxed">
              Unduh berkas biner Opus gratis melalui portal tautan sponsor Safelinku.
            </p>
            <a
              href={safelinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-950 text-xs font-extrabold rounded-lg transition font-sans flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Unduh Gratis (Safelinku)</span>
              <span className="font-mono text-xs">↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── CARD ID MEGA BUNDLE ID-AUDIO-MASTER (KONTAINER HITAM EKSKLUSIF) ───── */}
      <div className="bg-neutral-950 text-white rounded-2xl p-6 sm:p-8 border border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.12)] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-white text-neutral-950 font-mono font-bold text-xs rounded uppercase tracking-wider">
              PAKET MASTER STUDIO WAV 24-BIT
            </span>
            <span className="font-mono text-xs text-neutral-400">
              SKU: ID-AUDIO-MASTER
            </span>
          </div>
          <span className="font-mono text-sm font-extrabold text-white">
            Rp 200.000 (Sekali Bayar)
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
            Butuh Berkas Master Uncompressed 24-bit 48kHz & Seluruh Variasi Lagu Ini?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
            Dapatkan akses penuh ke repositori <strong>120 GB</strong> berisi <strong>10.365 berkas WAV studio tanpa kompresi</strong>, termasuk seluruh variasi potongan (15 detik, 30 detik, 60 detik, acoustic version, stem instrumen, dan seamless loop) dengan lisensi komersial permanen via Google Drive.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/toko-digital/id-audio-master/"
            className="px-5 py-2.5 bg-white text-neutral-950 hover:bg-neutral-200 rounded-xl text-xs sm:text-sm font-extrabold transition font-sans flex items-center gap-2 active:scale-95 shadow-sm"
          >
            <span>Buka Mega Bundle ID-AUDIO-MASTER</span>
            <span className="font-mono text-xs">→</span>
          </Link>
          <span className="text-xs text-neutral-400 font-mono">
            Akses Cloud Google Drive Permanen
          </span>
        </div>
      </div>

      {/* ── VARIASI FILE TERSEDIA DI MASTER FOLDER ───────────────────────────── */}
      {variationsList && variationsList.length > 0 && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-950" />
            <h3 className="text-base sm:text-lg font-extrabold text-neutral-950 font-display">
              Variasi Berkas Studio Master ({variationsList.length} File Terdeteksi)
            </h3>
          </div>
          <p className="text-xs text-neutral-600 font-sans leading-relaxed">
            Lagu ini diproduksi dengan variasi pemotongan durasi dan format audio berikut yang disertakan utuh dalam paket master:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {variationsList.map((item, idx) => {
              const fileName = typeof item === 'string' ? item : (item.n || `Versi ${idx + 1}`)
              const cleanFileName = fileName.replace(/_/g, ' ')
              const formats = typeof item === 'object' && item.f ? item.f.join(' / ') : null
              const isCutActive = activeCutIndex === idx && isPlaying
              const varSafelinkUrl = getSoundtrackSafelinkUrl(sku, idx)

              return (
                <div
                  key={idx}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border text-xs transition-all gap-2.5 ${
                    isCutActive
                      ? 'bg-neutral-100 border-neutral-950 shadow-sm'
                      : 'bg-neutral-50 hover:bg-neutral-100/70 border-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => handlePlayCut(idx, item)}
                      aria-label={isCutActive ? `Jeda ${cleanFileName}` : `Putar variasi ${cleanFileName}`}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition active:scale-95 shadow-sm ${
                        isCutActive
                          ? 'bg-neutral-950 text-white ring-2 ring-neutral-950/20'
                          : 'bg-white hover:bg-neutral-950 hover:text-white text-neutral-900 border border-neutral-300'
                      }`}
                      title={isCutActive ? 'Jeda' : 'Putar'}
                    >
                      {isCutActive ? (
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
                    <span className="w-5 h-5 bg-white border border-neutral-300 rounded text-[10px] font-mono font-bold flex items-center justify-center text-neutral-800 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="truncate block font-bold text-neutral-950 font-display text-xs sm:text-sm" title={fileName}>
                        {cleanFileName}
                      </span>
                      {formats && (
                        <span className="font-mono text-[10px] text-neutral-500 font-bold uppercase">
                          {formats}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons: Traktir Kopi & Safelinku */}
                  <div className="flex items-center gap-1.5 flex-shrink-0 justify-end pt-1 sm:pt-0 border-t sm:border-t-0 border-neutral-200">
                    <button
                      type="button"
                      onClick={() => {
                        setTraktirTrack({
                          ...track,
                          vIdx: idx,
                          t: `${title} (${cleanFileName})`,
                          title: `${title} (${cleanFileName})`
                        })
                        setTraktirOpen(true)
                      }}
                      className="px-2 py-1 bg-neutral-950 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 active:scale-95 shadow-sm"
                      title={`Traktir Kopi Rp 2.000 (Unduh Instan ${cleanFileName} Bebas Iklan)`}
                    >
                      <span className="font-mono text-[11px]">Rp 2k</span>
                      <span className="hidden md:inline font-sans text-xs">Instan</span>
                    </button>

                    <a
                      href={varSafelinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-white hover:bg-neutral-200 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 transition flex items-center gap-1 active:scale-95"
                      title={`Unduh gratis berkas audio master ${cleanFileName} via Safelinku`}
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

      {/* ── STANDAR WORKFLOW ARTIKEL TEKNIS & LISENSI KOMERSIAL (HUKUM 15) ───── */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
        <div className="border-b border-neutral-100 pb-4">
          <h3 className="text-lg font-extrabold text-neutral-950 font-display">
            Spesifikasi & Panduan Lisensi Audio FokusKonten
          </h3>
          <p className="text-xs text-neutral-500 font-sans mt-1">
            Standar kurasi resmi laboratorium FokusKonten untuk penggunaan komersial dan digital creator.
          </p>
        </div>

        <div className="space-y-5 text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed">
          <div className="space-y-1.5">
            <strong className="text-neutral-950 font-bold font-sans uppercase tracking-wide text-xs block">
              RINGKASAN LISENSI & HAK PAKAI KOMERSIAL:
            </strong>
            <p>
              • Seluruh berkas audio dalam katalog ini bebas royalti untuk video YouTube, TikTok, siaran podcast, film independen, presentasi korporat, dan soundtrack video game.
            </p>
            <p>
              • Pembeli lisensi bebas menggunakan karya audio tanpa kewajiban membayar royalti berkala atau biaya langganan bulanan.
            </p>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-neutral-100">
            <strong className="text-neutral-950 font-bold font-sans uppercase tracking-wide text-xs block">
              SPESIFIKASI FORMAT MASTER & BINER:
            </strong>
            <p>
              • Kualitas Berkas Unduhan: Master Studio Asli Original (WAV 24-bit 44.1 kHz / MP3 320 kbps) kualitas penuh bebas kompresi untuk kebutuhan produksi profesional.
            </p>
            <p>
              • Pratinjau Streaming Web: Khusus dialirkan untuk pemutaran web instan tanpa jeda buffering di peramban.
            </p>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-neutral-100">
            <strong className="text-neutral-950 font-bold font-sans uppercase tracking-wide text-xs block">
              PANDUAN HAK CIPTA & YOUTUBE CONTENT ID:
            </strong>
            <p>
              • Gunakan trek musik sebagai latar belakang konten audio-visual Anda.
            </p>
            <p>
              • Simpan bukti transaksi atau faktur digital FokusKonten sebagai dokumen verifikasi resmi apabila terdapat sengketa klaim hak cipta platform.
            </p>
          </div>
        </div>
      </div>

      {/* Traktir Kopi Modal */}
      <SoundtrackTraktirKopiModal
        isOpen={traktirOpen}
        onClose={() => {
          setTraktirOpen(false)
          setTraktirTrack(null)
        }}
        track={traktirTrack || track}
      />
    </div>
  )
}
