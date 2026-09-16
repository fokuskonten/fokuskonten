'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { getApiBaseUrl, getMidtransSnapUrl, getMidtransClientKey } from '@/lib/apiConfig'

/**
 * TraktirKopiModal.jsx — Modal Pembayaran Mikro QRIS Midtrans Auto-Download
 * Semua React Hooks dipanggil sebelum early return (Rules of Hooks).
 */

const HEALTH_CHECK_TIMEOUT_MS = 2500
const DNS_BLOCK_PATTERNS = [
  'Failed to fetch', 'NetworkError', 'ERR_NAME_NOT_RESOLVED',
  'ERR_CONNECTION_REFUSED', 'ERR_BLOCKED_BY_CLIENT', 'ERR_DNS'
]

function isDnsBlocked(errorMsg) {
  return DNS_BLOCK_PATTERNS.some(p => (errorMsg || '').includes(p))
}

export default function TraktirKopiModal({ isOpen, onClose, file, modelName, brand }) {
  const [email, setEmail]               = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successData, setSuccessData]   = useState(null)
  const [backendMode, setBackendMode]   = useState('unknown')
  const [isDnsIssue, setIsDnsIssue]     = useState(false)
  const healthCheckedRef = useRef(false)

  // Health check — semua hooks di atas, gunakan useEffect
  useEffect(() => {
    if (!isOpen || healthCheckedRef.current) return
    healthCheckedRef.current = true

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), HEALTH_CHECK_TIMEOUT_MS)

    fetch(`${getApiBaseUrl()}/technician/summary`, {
      signal: controller.signal,
      method: 'HEAD'
    })
      .then(() => { clearTimeout(timer); setBackendMode('online') })
      .catch(() => { clearTimeout(timer); setBackendMode('degraded') })
  }, [isOpen])

  // useCallback selalu dipanggil — tidak conditional
  const handleManualDownload = useCallback(() => {
    if (!successData) return
    const url = successData.downloadUrl
      || (successData.downloadToken
        ? `${getApiBaseUrl()}/technician/shield/resolve/${successData.downloadToken}`
        : null)
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }, [successData])

  // Early return SETELAH semua hooks
  if (!isOpen || !file) return null

  const handlePay = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setErrorMessage('Masukkan alamat email yang valid.')
      return
    }
    if (backendMode === 'degraded') return

    setIsProcessing(true)
    setErrorMessage('')
    setIsDnsIssue(false)

    try {
      const apiUrl = getApiBaseUrl()
      const res = await fetch(`${apiUrl}/technician/traktir-kopi/create-snap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileId: file.id,
          fileName: file.file_name || file.name,
          email,
          brand: brand || '',
          model: modelName || ''
        })
      })

      const data = await res.json()
      if (!data.success || !data.snapToken) {
        throw new Error(data.message || 'Gagal menyiapkan sesi pembayaran QRIS.')
      }

      const { snapToken, orderId } = data

      const loadSnapScript = () => new Promise((resolve) => {
        const snapUrl = getMidtransSnapUrl()
        const clientKey = getMidtransClientKey()
        const existing = document.querySelector('script[src*="midtrans.com/snap/snap.js"]')
        if (existing && window.snap) return resolve(window.snap)
        const s = document.createElement('script')
        s.src = snapUrl
        s.setAttribute('data-client-key', clientKey)
        s.onload = () => resolve(window.snap)
        s.onerror = () => resolve(null)
        document.head.appendChild(s)
      })

      const snapInstance = await loadSnapScript()
      if (!snapInstance?.pay) throw new Error('Gagal memuat modul Midtrans Snap.')

      snapInstance.pay(snapToken, {
        onSuccess: async () => { await verifyAndShowDownload(orderId) },
        onPending: () => {
          setErrorMessage('Pembayaran masih pending. Selesaikan pemindaian QRIS di aplikasi Anda.')
          setIsProcessing(false)
        },
        onError: () => {
          setErrorMessage('Pembayaran dibatalkan atau gagal. Coba kembali.')
          setIsProcessing(false)
        },
        onClose: () => { setIsProcessing(false) }
      })

    } catch (err) {
      if (isDnsBlocked(err.message)) {
        setIsDnsIssue(true)
        setErrorMessage('')
      } else {
        setErrorMessage(err.message || 'Terjadi kesalahan sistem.')
      }
      setIsProcessing(false)
    }
  }

  const verifyAndShowDownload = async (orderId) => {
    try {
      const apiUrl = getApiBaseUrl()
      const res = await fetch(`${apiUrl}/technician/traktir-kopi/verify/${orderId}`)
      const json = await res.json()

      if (json.success && json.downloadUrl) {
        setSuccessData(json)
      } else {
        let attempts = 0
        const poll = setInterval(async () => {
          attempts++
          try {
            const r = await fetch(`${apiUrl}/technician/traktir-kopi/verify/${orderId}`)
            const j = await r.json()
            if (j.success && j.downloadUrl) { clearInterval(poll); setSuccessData(j) }
          } catch (_) {}
          if (attempts >= 5) {
            clearInterval(poll)
            setSuccessData({ fallback: true, downloadToken: file.download_token })
          }
        }, 3000)
      }
    } catch {
      setSuccessData({ fallback: true, downloadToken: file.download_token })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-sm">
      <div className="bg-white border border-neutral-200 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div>
            <span className="px-2.5 py-0.5 bg-neutral-950 text-white font-mono font-bold text-[10px] rounded uppercase tracking-wider">
              UNDUH CEPAT BEBAS IKLAN
            </span>
            <h3 className="text-lg font-extrabold text-neutral-950 tracking-tight mt-1">
              Traktir Kopi &amp; Unduh Langsung
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center text-sm font-mono transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Degraded Mode */}
        {backendMode === 'degraded' && !successData && (
          <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3">
            <p className="text-xs font-mono font-bold text-neutral-700">
              Sistem pembayaran sedang dalam pemeliharaan.
            </p>
            <p className="text-[11px] text-neutral-500 font-sans">
              Gunakan tombol Unduh via Safelink untuk sementara.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-neutral-950 text-white font-extrabold text-xs rounded-xl font-mono tracking-wider uppercase"
            >
              Tutup &amp; Gunakan Safelink
            </button>
          </div>
        )}

        {/* Sukses — tombol unduh manual (user gesture) */}
        {successData && (
          <div className="space-y-5 text-center py-4">
            <div className="w-14 h-14 bg-neutral-950 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-mono">
              ✓
            </div>
            <div className="space-y-1.5">
              <h4 className="text-base font-extrabold text-neutral-950">Traktiran Diterima!</h4>
              <p className="text-xs text-neutral-600 font-sans">
                Klik tombol di bawah untuk mengunduh berkas.
              </p>
            </div>
            <button
              onClick={handleManualDownload}
              className="w-full py-3 bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-sm rounded-xl transition-colors uppercase tracking-wider font-mono shadow-sm flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z"/>
                <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z"/>
              </svg>
              Unduh Berkas Sekarang
            </button>
            <button onClick={onClose} className="text-xs text-neutral-400 font-mono hover:text-neutral-600 transition-colors">
              Tutup modal
            </button>
          </div>
        )}

        {/* Form Pembayaran */}
        {backendMode !== 'degraded' && !successData && (
          <form onSubmit={handlePay} className="space-y-5">
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1.5">
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">Target Berkas:</div>
              <div className="font-extrabold text-neutral-950 text-xs truncate font-mono">
                {file.file_name || file.name}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] font-mono bg-neutral-200 text-neutral-800 px-2 py-0.5 rounded font-bold uppercase">
                  {file.file_type || file.type || 'FILE'}
                </span>
                <span className="text-[10px] font-mono text-neutral-500">
                  {file.file_size_formatted || file.size}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold text-neutral-800 uppercase tracking-wider">
                Alamat Email Penerima Berkas:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-white border border-neutral-300 focus:border-neutral-950 focus:ring-0 rounded-xl px-4 py-2.5 text-neutral-950 text-sm font-mono placeholder:text-neutral-400 transition-colors"
              />
              <p className="text-[11px] text-neutral-500 font-sans">
                Tautan unduhan permanen dikirim ke email ini.
              </p>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-neutral-100 rounded-xl border border-neutral-300">
              <span className="text-xs font-mono font-bold text-neutral-700">Nominal Traktir:</span>
              <span className="text-base font-extrabold text-neutral-950 font-mono">Rp 3.000</span>
            </div>

            {/* DNS Block Banner */}
            {isDnsIssue && (
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                <p className="text-xs font-bold text-neutral-800 font-mono">
                  Tautan terhambat oleh provider internet Anda?
                </p>
                <p className="text-[11px] text-neutral-600 font-sans">
                  Internet Positif atau filter ISP mungkin memblokir domain SafelinkU.
                  Coba aktifkan DNS publik <strong>1.1.1.1</strong> (Cloudflare) atau{' '}
                  <strong>8.8.8.8</strong> (Google) di pengaturan Wi-Fi Anda.
                </p>
                <a
                  href="https://1.1.1.1/id-ID/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[11px] font-mono font-bold text-neutral-950 underline hover:no-underline"
                >
                  Panduan Aktifkan DNS 1.1.1.1 →
                </a>
              </div>
            )}

            {/* Error umum — abu-abu netral, bukan merah mencolok */}
            {errorMessage && !isDnsIssue && (
              <div className="p-3 bg-neutral-50 border border-neutral-300 text-neutral-700 text-xs rounded-xl font-mono">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing || backendMode === 'degraded'}
              className="w-full py-3 bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs rounded-xl transition-colors uppercase tracking-wider font-mono shadow-sm disabled:opacity-50"
            >
              {isProcessing ? 'Menghubungkan ke QRIS...' : 'Traktir Kopi Rp 3.000 & Unduh Cepat'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
