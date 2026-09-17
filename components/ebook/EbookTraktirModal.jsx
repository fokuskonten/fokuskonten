'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { getApiBaseUrl, getMidtransSnapUrl, getMidtransClientKey } from '@/lib/apiConfig'

const HEALTH_CHECK_TIMEOUT_MS = 2500

/**
 * EbookTraktirModal.jsx — Modal Traktir Kopi QRIS Rp 2.000 E-Book
 * Terintegrasi: Circuit Breaker Port 8090, Active Polling, Cryptographic Claim Token,
 * Masked Ephemeral Download Gateway, dan User-Initiated Download Gate (Anti-Popup Blocker).
 */
export default function EbookTraktirModal({ isOpen, onClose, ebook }) {
  const [email, setEmail]               = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successData, setSuccessData]   = useState(null)
  const [backendMode, setBackendMode]   = useState('unknown') // 'online' | 'degraded' | 'unknown'
  const [activeOrderId, setActiveOrderId] = useState(null)
  const [claimToken, setClaimToken]     = useState(null)
  
  const healthCheckedRef = useRef(false)
  const pollingRef = useRef(null)

  // 1. Circuit Breaker UX Health Check Port 8090 (Celah 19)
  useEffect(() => {
    if (!isOpen || healthCheckedRef.current) return
    healthCheckedRef.current = true

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), HEALTH_CHECK_TIMEOUT_MS)

    fetch(`${getApiBaseUrl()}/ebook/summary`, {
      signal: controller.signal,
      method: 'HEAD'
    })
      .then(() => {
        clearTimeout(timer)
        setBackendMode('online')
      })
      .catch(() => {
        clearTimeout(timer)
        setBackendMode('degraded')
      })
  }, [isOpen])

  // Pembersihan polling saat modal ditutup
  useEffect(() => {
    if (!isOpen) {
      if (pollingRef.current) clearInterval(pollingRef.current)
      setIsProcessing(false)
      setErrorMessage('')
      setSuccessData(null)
      setActiveOrderId(null)
      setClaimToken(null)
      healthCheckedRef.current = false
    }
  }, [isOpen])

  // Verifikasi Settlement via Backend dengan Secret Claim Token (Celah 7, 41, 42)
  const verifyPayment = useCallback(async (orderId, cToken) => {
    try {
      const apiUrl = getApiBaseUrl()
      const headers = { 'Content-Type': 'application/json' }
      if (cToken) {
        headers['x-claim-token'] = cToken
      }

      const res = await fetch(`${apiUrl}/ebook/traktir-kopi/verify/${orderId}`, {
        headers
      })
      const json = await res.json()

      if (json.success && json.isPaid && json.downloadUrl) {
        if (pollingRef.current) clearInterval(pollingRef.current)
        setSuccessData(json)
        setIsProcessing(false)
        return true
      }
      return false
    } catch (err) {
      console.warn('[EbookTraktirModal] Verify polling check:', err.message)
      return false
    }
  }, [])

  // User-Initiated Download Click (Celah 22: Mencegah pop-up blocker di browser ponsel)
  const handleDownloadClick = useCallback(() => {
    if (!successData?.downloadUrl) return
    const targetUrl = successData.downloadUrl.startsWith('http')
      ? successData.downloadUrl
      : `${getApiBaseUrl().replace('/api/v1', '')}${successData.downloadUrl}`
    
    window.open(targetUrl, '_blank', 'noopener,noreferrer')
  }, [successData])

  if (!isOpen || !ebook) return null

  const sku = ebook.sku || ''
  const title = ebook.title || 'E-Book'
  const price = 2000

  const handlePay = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setErrorMessage('Silakan masukkan alamat email yang valid.')
      return
    }

    if (backendMode === 'degraded') {
      setErrorMessage('Layanan Traktir Kopi sedang dalam pemeliharaan. Silakan unduh via Safelink.')
      return
    }

    setIsProcessing(true)
    setErrorMessage('')

    try {
      const apiUrl = getApiBaseUrl()
      // Server-Side Price Locking: Besaran nominal dikunci 2000 di server (Celah 21)
      const res = await fetch(`${apiUrl}/ebook/traktir-kopi/create-snap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sku,
          email,
          title
        })
      })

      const data = await res.json()
      if (!data.success || !data.snapToken) {
        throw new Error(data.message || 'Gagal menyiapkan sesi pembayaran QRIS.')
      }

      const { snapToken, orderId, claimToken: generatedClaimToken } = data
      setActiveOrderId(orderId)
      setClaimToken(generatedClaimToken)

      // Muat library Midtrans Snap
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
      if (!snapInstance?.pay) {
        throw new Error('Gagal memuat sistem pembayaran QRIS.')
      }

      // Jalankan polling setiap 2 detik (Active Inquiry Polling - Celah 7)
      pollingRef.current = setInterval(async () => {
        await verifyPayment(orderId, generatedClaimToken)
      }, 2000)

      snapInstance.pay(snapToken, {
        onSuccess: async () => {
          await verifyPayment(orderId, generatedClaimToken)
        },
        onPending: () => {
          setErrorMessage('Menunggu pembayaran QRIS diselesaikan di aplikasi m-banking / e-wallet Anda.')
        },
        onError: () => {
          setErrorMessage('Pembayaran dibatalkan atau waktu habis. Silakan coba kembali.')
          setIsProcessing(false)
          if (pollingRef.current) clearInterval(pollingRef.current)
        },
        onClose: () => {
          // Tetap biarkan polling berjalan selama beberapa saat jika popup ditutup pembeli setelah scan
          setTimeout(() => {
            if (!successData && pollingRef.current) {
              clearInterval(pollingRef.current)
              setIsProcessing(false)
            }
          }, 30000)
        }
      })

    } catch (err) {
      setErrorMessage(err.message || 'Terjadi kesalahan sistem, silakan coba beberapa saat lagi.')
      setIsProcessing(false)
    }
  }

  // Pesan WhatsApp bantuan jika terjadi kendala
  const waPrefill = encodeURIComponent(
    `Halo FokusKonten, saya sudah traktir kopi untuk E-Book: ${title} (SKU: ${sku}, Order ID: ${activeOrderId || '-'}), mohon bantuan verifikasi tautan.`
  )
  const waHelpUrl = `https://wa.me/6285747761000?text=${waPrefill}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl shadow-2xl p-6 sm:p-7 overflow-hidden">
        
        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center font-bold text-base transition-colors"
          aria-label="Tutup"
        >
          &times;
        </button>

        {/* ── LAYAR SUKSES PEMBAYARAN: User-Initiated Download Gate (Celah 22) ── */}
        {successData ? (
          <div className="text-center py-2 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-neutral-950 text-white flex items-center justify-center text-2xl font-bold shadow-md">
              ✓
            </div>
            <div>
              <span className="px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 text-[11px] font-mono font-bold uppercase tracking-wider">
                Pembayaran Terverifikasi
              </span>
              <h3 className="font-extrabold text-lg text-neutral-950 mt-2">
                Terima Kasih atas Traktir Kopinya!
              </h3>
              <p className="text-xs text-neutral-600 mt-1 max-w-xs mx-auto">
                Tautan unduhan privat Anda telah aktif dan siap disimpan ke perangkat.
              </p>
            </div>

            {/* Tombol Unduh Utama Berdenyut (Lolos Pop-up Blocker HP) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleDownloadClick}
                className="w-full py-3.5 px-5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-sm transition-all text-center font-mono flex items-center justify-center gap-2 shadow-lg animate-pulse"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>SIMPAN E-BOOK KE PERANGKAT</span>
              </button>
              <p className="text-[11px] text-neutral-500 font-mono mt-2">
                Berkas akan tersimpan di folder &quot;Download&quot; perangkat Anda.
              </p>
            </div>

            {/* Info Cadangan WhatsApp jika terjadi hambatan unduh */}
            <div className="pt-3 border-t border-neutral-100">
              <a
                href={waHelpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-neutral-600 hover:text-neutral-950 underline font-mono"
              >
                Butuh bantuan link manual? Hubungi CS WhatsApp
              </a>
            </div>
          </div>
        ) : backendMode === 'degraded' ? (
          /* ── CIRCUIT BREAKER FALLBACK UX (Celah 19) ── */
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-neutral-100 text-neutral-900 flex items-center justify-center text-xl font-bold">
              ℹ
            </div>
            <div>
              <h3 className="font-extrabold text-base text-neutral-950">
                Layanan Unduh Cepat Sedang Pemeliharaan
              </h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Jalur pembayaran instan QRIS sedang sinkronisasi server berkala. Anda tetap dapat mengunduh naskah lengkap secara <strong>GRATIS</strong> melalui tautan sponsor di bawah ini.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-neutral-950 text-white font-bold text-xs font-mono uppercase tracking-wider"
            >
              Kembali & Unduh via Safelink
            </button>
          </div>
        ) : (
          /* ── FORM PEMBAYARAN TRAKTIR KOPI UTAMA ── */
          <form onSubmit={handlePay} className="space-y-4">
            <div className="pr-6">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-neutral-950 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                  Traktir Kopi
                </span>
                <span className="text-xs font-mono font-bold text-neutral-950">
                  Rp 2.000
                </span>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-neutral-950 mt-1 line-clamp-2">
                {title}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5 font-mono">
                SKU: {sku} &bull; Akses Server Utama Bebas Iklan
              </p>
            </div>

            {/* Input Alamat Email untuk Arsip Nota */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="traktir-email" className="block text-xs font-bold text-neutral-800">
                Alamat Email Penerima Nota
              </label>
              <input
                id="traktir-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-neutral-950 text-xs sm:text-sm font-sans"
              />
              <span className="text-[10px] text-neutral-400 font-mono">
                Tautan unduhan cadangan akan dikirimkan otomatis ke email ini.
              </span>
            </div>

            {/* Metode Pembayaran QRIS Info */}
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-left">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-900">
                <span>Metode Pembayaran</span>
                <span>QRIS / GoPay / ShopeePay</span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                Scan kode QRIS langsung melalui BCA, Mandiri, BRI, BNI, GoPay, OVO, Dana, ShopeePay, atau aplikasi m-banking lainnya.
              </p>
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-mono text-left">
                {errorMessage}
              </div>
            )}

            {/* Tombol Lanjut ke QRIS */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs sm:text-sm transition-all font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin text-sm">⟳</span>
                  <span>Menyiapkan QRIS...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
                  </svg>
                  <span>Rp 2.000 via QRIS</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
