'use client'

import { useState, useEffect } from 'react'
import { getApiBaseUrl } from '@/lib/apiConfig'
import { detectAdBlocker } from '@/lib/adblockDetector'
import EbookAdblockModal from './EbookAdblockModal'

/**
 * EbookDownloadRow.jsx — Komponen Baris Unduhan Dual Aksi (Safelink + Traktir Kopi)
 * Menyediakan opsi unduhan gratis via tautan sponsor iklan atau jalur cepat tanpa iklan.
 * Dilengkapi deteksi adblocker di sisi klien untuk mengarahkan pengguna ke opsi Traktir Kopi.
 */
export default function EbookDownloadRow({ ebook, onOpenTraktir }) {
  const [safelinkUrl, setSafelinkUrl] = useState(ebook?.safelinkUrl || null)
  const [safelinkStatus, setSafelinkStatus] = useState(ebook?.safelinkUrl ? 'ready' : 'idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)
  const [isAdblockModalOpen, setIsAdblockModalOpen] = useState(false)

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

  async function resolveSafelinkTarget() {
    if (safelinkStatus === 'ready' && safelinkUrl) {
      return safelinkUrl
    }
    const apiUrl = getApiBaseUrl()
    const res = await fetch(`${apiUrl}/ebook/safelink-instant/${sku}`)
    const json = await res.json()
    if (json.success && json.safelinkUrl) {
      setSafelinkUrl(json.safelinkUrl)
      setSafelinkStatus('ready')
      return json.safelinkUrl
    }
    throw new Error(json.message || 'Tautan sponsor belum tersedia saat ini.')
  }

  async function handleSafelinkClick(e) {
    if (e && e.preventDefault) e.preventDefault()
    setErrorMsg('')
    setSafelinkStatus('loading')

    try {
      // 1. Cek Pemblokir Iklan (Adblocker) secara cepat
      const isBlocked = await detectAdBlocker()

      const targetUrl = await resolveSafelinkTarget()

      if (isBlocked) {
        // Tampilkan modal pemblokir iklan (tutup celah adblocker)
        setIsAdblockModalOpen(true)
        setSafelinkStatus('ready')
        return
      }

      // 2. Jika tidak ada adblocker, buka Safelinku seperti biasa
      trackDownload('SAFELINK')
      window.open(targetUrl, '_blank', 'noopener,noreferrer')
      setSafelinkStatus('ready')
    } catch (err) {
      setErrorMsg('Gagal memuat link. Silakan pilih opsi Traktir Kopi atau coba kembali.')
      setSafelinkStatus('error')
    }
  }

  function proceedDirectToSafelink() {
    if (safelinkUrl) {
      trackDownload('SAFELINK_BYPASS')
      window.open(safelinkUrl, '_blank', 'noopener,noreferrer')
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
                ? 'Memeriksa Tautan...'
                : 'Unduh via Safelink (Gratis)'}
            </span>
          </button>
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
            <strong className="text-neutral-900">Tautan Terkendala Operator?</strong> Pilih opsi Traktir Kopi untuk mengunduh langsung dari server utama.
          </span>
        </p>
      </div>

      {/* Modal Peringatan Pemblokir Iklan (Adblocker) */}
      <EbookAdblockModal
        isOpen={isAdblockModalOpen}
        onClose={() => setIsAdblockModalOpen(false)}
        onProceedToSafelink={proceedDirectToSafelink}
        onOpenTraktir={onOpenTraktir}
        ebook={ebook}
      />
    </div>
  )
}
