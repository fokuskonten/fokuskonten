'use client'

import { useState, useEffect } from 'react'
import { getApiBaseUrl } from '@/lib/apiConfig'

/**
 * EbookDownloadRow.jsx — Komponen Baris Unduhan Dual Aksi (Safelink + Traktir Kopi)
 * Menyediakan opsi unduhan gratis via tautan sponsor iklan atau jalur cepat tanpa iklan.
 */
export default function EbookDownloadRow({ ebook, onOpenTraktir }) {
  const [safelinkUrl, setSafelinkUrl] = useState(ebook?.safelinkUrl || null)
  const [safelinkStatus, setSafelinkStatus] = useState(ebook?.safelinkUrl ? 'ready' : 'idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    if (ebook?.safelinkUrl) {
      setSafelinkUrl(ebook.safelinkUrl)
      setSafelinkStatus('ready')
    }
  }, [ebook?.safelinkUrl])

  if (!ebook) return null

  const sku = ebook.sku || ''
  const sizeMb = ebook.sizeMb || '1.0 MB'
  const pages = ebook.pages || 0
  const format = ebook.format || 'PDF'

  async function handleSafelinkClick(e) {
    if (safelinkStatus === 'ready' && safelinkUrl) {
      trackDownload('SAFELINK')
      return
    }

    setSafelinkStatus('loading')
    setErrorMsg('')

    try {
      const apiUrl = getApiBaseUrl()
      const res = await fetch(`${apiUrl}/ebook/safelink-instant/${sku}`)
      const json = await res.json()

      if (json.success && json.safelinkUrl) {
        setSafelinkUrl(json.safelinkUrl)
        setSafelinkStatus('ready')
        trackDownload('SAFELINK')
        window.open(json.safelinkUrl, '_blank', 'noopener,noreferrer')
      } else {
        throw new Error(json.message || 'Tautan sponsor belum tersedia saat ini.')
      }
    } catch (err) {
      setErrorMsg('Gagal memuat link. Silakan pilih opsi Unduh Cepat atau coba kembali.')
      setSafelinkStatus('error')
    }
  }

  function trackDownload(type) {
    try {
      const apiUrl = getApiBaseUrl()
      fetch(`${apiUrl}/ebook/track-download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sku, type })
      }).catch(() => {})
    } catch (_) {}
  }

  return (
    <div className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
      {/* Header Info Berkas */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-neutral-950 text-white text-[11px] font-mono font-bold tracking-wider">
            {format} RESMI
          </span>
          <span className="text-xs font-mono text-neutral-500 font-semibold">
            {pages > 0 ? `${pages} Halaman` : 'Lengkap'} &bull; {sizeMb}
          </span>
        </div>
        <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
          SKU: {sku}
        </span>
      </div>

      {/* Aksi Unduhan Utama */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Tombol 1: Unduh via Safelink (Gratis Beriklan) */}
        <div className="flex flex-col">
          {safelinkStatus === 'ready' && safelinkUrl ? (
            <a
              href={safelinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDownload('SAFELINK')}
              className="w-full py-3 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-bold text-xs sm:text-sm border border-neutral-300 transition-all text-center font-mono flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Unduh via Safelink (Gratis)</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={handleSafelinkClick}
              disabled={safelinkStatus === 'loading'}
              className="w-full py-3 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-bold text-xs sm:text-sm border border-neutral-300 transition-all text-center font-mono flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>
                {safelinkStatus === 'loading'
                  ? 'Menyiapkan Tautan...'
                  : safelinkStatus === 'error'
                    ? 'Coba Tautan Lagi'
                    : 'Unduh via Safelink (Gratis)'}
              </span>
            </button>
          )}
          <span className="text-[10px] text-neutral-400 font-mono text-center mt-1.5">
            Melewati halaman sponsor iklan CPM
          </span>
        </div>

        {/* Tombol 2: Traktir Kopi Rp 2.000 (Unduh Cepat Bebas Iklan) */}
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => onOpenTraktir && onOpenTraktir(ebook)}
            className="w-full py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs sm:text-sm transition-all text-center font-mono flex items-center justify-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
            </svg>
            <span>Traktir Kopi Rp 2.000</span>
          </button>
          <span className="text-[10px] text-neutral-500 font-mono font-medium text-center mt-1.5">
            Akses langsung server utama &bull; Tanpa iklan
          </span>
        </div>
      </div>

      {errorMsg && (
        <div className="mt-3 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
          {errorMsg}
        </div>
      )}

      {/* Catatan Edukasi Anti-AdBlocker & Internet Positif (Celah 3 & 20) */}
      <div className="mt-4 pt-3.5 border-t border-neutral-100 text-[11px] text-neutral-500 leading-relaxed space-y-1">
        <p className="flex items-start gap-1.5">
          <span className="text-neutral-950 font-bold">•</span>
          <span>
            <strong className="text-neutral-900">Menggunakan AdBlocker / Brave?</strong> Jika halaman sponsor tidak terbuka, gunakan tombol <strong>Traktir Kopi Rp 2.000</strong> untuk unduh langsung tanpa jeda iklan.
          </span>
        </p>
        <p className="flex items-start gap-1.5">
          <span className="text-neutral-950 font-bold">•</span>
          <span>
            <strong className="text-neutral-900">Tautan Terblokir Provider?</strong> Aktifkan DNS 1.1.1.1 atau pilih opsi Traktir Kopi untuk bypass batasan jaringan operator secara aman.
          </span>
        </p>
      </div>
    </div>
  )
}
