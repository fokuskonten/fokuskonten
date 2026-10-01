'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { getApiBaseUrl, getMidtransSnapUrl, getMidtransClientKey } from '@/lib/apiConfig'

export default function SoundtrackTraktirKopiModal({ isOpen, onClose, track }) {
  const [email, setEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successData, setSuccessData] = useState(null)
  const [snapLoaded, setSnapLoaded] = useState(false)

  const snapScriptRef = useRef(null)

  // Load Midtrans Snap JS Script Dinamis
  useEffect(() => {
    if (typeof window === 'undefined' || window.snap) {
      setSnapLoaded(true)
      return
    }

    const snapUrl = getMidtransSnapUrl()
    const clientKey = getMidtransClientKey()

    const script = document.createElement('script')
    script.src = snapUrl
    script.setAttribute('data-client-key', clientKey)
    script.async = true
    script.onload = () => setSnapLoaded(true)
    script.onerror = () => setErrorMessage('Gagal memuat sistem pembayaran Midtrans. Silakan periksa koneksi Anda.')
    document.body.appendChild(script)
    snapScriptRef.current = script

    return () => {
      // Keep script in head for future transactions
    }
  }, [])

  const handleManualDownload = useCallback(() => {
    if (!successData || !successData.downloadUrl) return
    window.open(successData.downloadUrl, '_blank', 'noopener,noreferrer')
  }, [successData])

  if (!isOpen || !track) return null

  const sku = track.s || track.track_sku || 'ST'
  const title = track.t || track.title || 'Soundtrack Master'
  const genre = track.g || track.genre || 'Cinematic'
  const vIdx = track.vIdx !== undefined && track.vIdx !== null ? track.vIdx : null
  const variationName = track.variationName || null

  const rawItemCode = track.ic || track.item_code || (() => {
    const url = track.u || track.cdn_url || ''
    const m = url.match(/_(\d+)\.opus$/i)
    if (m) return m[1]
    const m2 = url.match(/_(\d+)_/)
    if (m2) return m2[1]
    return sku
  })()
  const itemCode = String(rawItemCode || '').replace(/[\[\]\s]/g, '') || sku

  const handlePay = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    setErrorMessage('')

    try {
      const apiUrl = getApiBaseUrl()
      const res = await fetch(`${apiUrl}/soundtrack/traktir-kopi/create-snap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sku,
          title,
          vIdx,
          variationName,
          email: email.trim() || 'pendengar@fokuskonten.my.id'
        })
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Gagal membuat sesi pembayaran.')
      }

      const { snapToken, orderId, claimToken } = data

      if (!window.snap) {
        throw new Error('Midtrans Snap belum siap. Silakan klik bayar sekali lagi.')
      }

      window.snap.pay(snapToken, {
        onSuccess: async () => {
          verifyPayment(orderId, claimToken)
        },
        onPending: async () => {
          verifyPayment(orderId, claimToken)
        },
        onError: (err) => {
          setIsProcessing(false)
          setErrorMessage(err.status_message || 'Pembayaran gagal atau dibatalkan.')
        },
        onClose: () => {
          setIsProcessing(false)
        }
      })
    } catch (err) {
      setIsProcessing(false)
      setErrorMessage(err.message || 'Terjadi kesalahan sistem pembayaran.')
    }
  }

  const verifyPayment = async (orderId, claimToken) => {
    try {
      const apiUrl = getApiBaseUrl()
      const res = await fetch(`${apiUrl}/soundtrack/traktir-kopi/verify/${orderId}?claimToken=${claimToken}`)
      const json = await res.json()

      if (json.success && json.status === 'SETTLEMENT') {
        setSuccessData(json)
        setIsProcessing(false)
        // Auto trigger download
        if (json.downloadUrl) {
          window.open(json.downloadUrl, '_blank', 'noopener,noreferrer')
        }
      } else {
        // Polling retry
        setTimeout(async () => {
          const r2 = await fetch(`${apiUrl}/soundtrack/traktir-kopi/verify/${orderId}?claimToken=${claimToken}`)
          const j2 = await r2.json()
          if (j2.success && j2.status === 'SETTLEMENT') {
            setSuccessData(j2)
            setIsProcessing(false)
            if (j2.downloadUrl) window.open(j2.downloadUrl, '_blank', 'noopener,noreferrer')
          } else {
            setIsProcessing(false)
            setErrorMessage('Pembayaran belum terkonfirmasi oleh Midtrans. Jika Anda sudah membayar, muat ulang halaman ini.')
          }
        }, 3000)
      }
    } catch (e) {
      setIsProcessing(false)
      setErrorMessage('Gagal memverifikasi status pembayaran.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-2xl relative space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isProcessing}
          aria-label="Tutup Modal"
          className="absolute right-4 top-4 w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-neutral-950 text-white font-mono font-bold text-xs rounded" title={`Kode Item: ${itemCode}`}>
              {itemCode}
            </span>
            <span className="text-xs font-mono text-neutral-500">{genre}</span>
          </div>
          <h3 className="text-xl font-extrabold text-neutral-950 font-display">
            Traktir Kopi (Unduh Instan Bebas Iklan)
          </h3>
          <p className="text-xs text-neutral-600 font-sans leading-relaxed">
            Dukung server kami dengan donasi secangkir kopi <strong>Rp 2.000</strong>. Anda langsung mendapatkan tautan unduh berkecepatan tinggi tanpa jeda iklan sponsor Safelinku.
          </p>
        </div>

        {/* Success State */}
        {successData ? (
          <div className="p-4 bg-neutral-50 border border-neutral-300 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-neutral-950 font-bold text-sm font-sans">
              <span className="w-5 h-5 rounded-full bg-neutral-950 text-white flex items-center justify-center text-xs">✓</span>
              <span>Pembayaran QRIS Berhasil!</span>
            </div>
            <p className="text-xs text-neutral-600 font-sans">
              Unduhan telah dipicu secara otomatis. Jika berkas belum terunduh, klik tombol di bawah:
            </p>
            <button
              onClick={handleManualDownload}
              className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs rounded-lg transition font-sans flex items-center justify-center gap-2"
            >
              <span>Unduh Berkas Sekarang ({successData.fileName || 'Audio'})</span>
              <span className="font-mono">↓</span>
            </button>
          </div>
        ) : (
          /* Payment Form */
          <form onSubmit={handlePay} className="space-y-4">
            {/* Track Info Box */}
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1">
              <span className="text-[11px] text-neutral-500 font-sans block">Lagu & Versi Pilihan:</span>
              <span className="text-sm font-extrabold text-neutral-950 font-display block truncate">
                {title}
              </span>
              {variationName && (
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-1.5 py-0.5 bg-neutral-950 text-white font-mono font-bold text-[10px] rounded">
                    VARIASI #{vIdx + 1}
                  </span>
                  <span className="text-xs text-neutral-700 font-sans truncate">
                    {variationName}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-200 text-xs">
                <span className="text-neutral-600 font-sans">Nominal Traktir:</span>
                <span className="font-mono font-extrabold text-neutral-950">Rp 2.000</span>
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label htmlFor="traktir-email" className="text-xs font-bold text-neutral-900 font-sans block">
                Email Anda (untuk pengiriman bukti & link unduh):
              </label>
              <input
                id="traktir-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 focus:border-neutral-950 focus:bg-white rounded-xl text-xs font-sans text-neutral-950 outline-none transition"
              />
            </div>

            {errorMessage && (
              <p className="text-xs text-neutral-900 font-sans bg-neutral-100 border border-neutral-300 p-2.5 rounded-lg">
                {errorMessage}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing || !snapLoaded}
              className="w-full py-3 bg-neutral-950 hover:bg-neutral-800 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl transition font-sans flex items-center justify-center gap-2 shadow-sm active:scale-95"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Memproses Midtrans QRIS...</span>
                </>
              ) : (
                <>
                  <span>Bayar QRIS Rp 2.000</span>
                  <span className="font-mono text-xs">→</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer Note */}
        <div className="pt-2 text-center border-t border-neutral-100">
          <p className="text-[11px] text-neutral-400 font-sans">
            Mendukung QRIS (GoPay, OVO, Dana, ShopeePay, BCA, Mandiri, BRI). 100% Aman & Terverifikasi Midtrans.
          </p>
        </div>
      </div>
    </div>
  )
}
