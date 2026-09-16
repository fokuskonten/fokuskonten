'use client'

import { useState, useEffect } from 'react'

/**
 * DualDownloadRow.jsx — Komponen Baris Berkas Datar dengan 2 Tombol Aksi
 * Semua React Hooks dipanggil di atas — tidak ada conditional hooks.
 */

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8090'

export default function DualDownloadRow({ file, onOpenTraktir }) {
  const [safelinkUrl, setSafelinkUrl] = useState(null)
  const [safelinkStatus, setSafelinkStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Semua hooks dipanggil di atas early return — wajib sesuai Rules of Hooks
  useEffect(() => {
    if (!file) return
    if (file.safelink_url && file.safelink_url.length > 5) {
      setSafelinkUrl(file.safelink_url)
      setSafelinkStatus('ready')
    }
  }, [file])

  // Early return SETELAH semua hooks
  if (!file) return null

  const fileDbId = file.id
  const fileName  = file.file_name || file.name || 'Berkas Teknisi'
  const fileType  = file.file_type || file.type || 'FILE'
  const fileSize  = file.file_size_formatted || file.size || 'TERVERIFIKASI'

  async function fetchSafelink() {
    if (!fileDbId) {
      setErrorMsg('ID berkas tidak tersedia.')
      setSafelinkStatus('error')
      return
    }
    setSafelinkStatus('loading')
    try {
      const res = await fetch(`${BACKEND}/api/v1/technician/shield/safelink?id=${fileDbId}`)
      const json = await res.json()
      if (json.success && json.url) {
        setSafelinkUrl(json.url)
        setSafelinkStatus('ready')
      } else if (json.fallback) {
        setSafelinkUrl(`${BACKEND}/api/v1/technician/shield/resolve/${json.fallback}`)
        setSafelinkStatus('ready')
      } else {
        throw new Error(json.error || 'Gagal mendapatkan link')
      }
    } catch (e) {
      setErrorMsg(e.message || 'Jaringan bermasalah, coba lagi.')
      setSafelinkStatus('error')
    }
  }

  function handleSafelinkClick(e) {
    if (safelinkStatus === 'ready' && safelinkUrl) return
    e.preventDefault()
    fetchSafelink()
  }

  return (
    <div className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 last:border-b-0">
      <div className="space-y-1 max-w-xl min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase text-neutral-600 tracking-wider">
            {fileType} &bull; {fileSize}
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-950 text-white text-[10px] font-mono font-bold">
            TESTED
          </span>
        </div>
        <h4 className="font-extrabold text-neutral-950 text-sm leading-snug truncate font-mono">
          {fileName}
        </h4>
        {file.checksum_sha256 && (
          <p className="text-[10px] font-mono text-neutral-400 truncate">
            SHA256: {file.checksum_sha256}
          </p>
        )}
        {safelinkStatus === 'error' && (
          <p className="text-[10px] text-red-600 font-mono">{errorMsg}</p>
        )}
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        {safelinkStatus === 'ready' && safelinkUrl ? (
          <a
            href={safelinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-extrabold text-xs border border-neutral-300 transition-colors font-mono tracking-wider uppercase text-center"
          >
            Unduh via Safelink
          </a>
        ) : safelinkStatus === 'loading' ? (
          <span className="px-4 py-2.5 rounded-xl bg-neutral-50 text-neutral-400 font-extrabold text-xs border border-neutral-200 font-mono tracking-wider uppercase text-center animate-pulse">
            Menyiapkan...
          </span>
        ) : (
          <button
            type="button"
            onClick={handleSafelinkClick}
            className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-extrabold text-xs border border-neutral-300 transition-colors font-mono tracking-wider uppercase text-center"
          >
            {safelinkStatus === 'error' ? 'Coba Lagi' : 'Unduh via Safelink'}
          </button>
        )}

        <button
          type="button"
          onClick={() => onOpenTraktir && onOpenTraktir(file)}
          className="px-4 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs transition-colors font-mono tracking-wider uppercase shadow-sm flex items-center gap-1.5"
        >
          <span>Unduh Cepat</span>
        </button>
      </div>
    </div>
  )
}
