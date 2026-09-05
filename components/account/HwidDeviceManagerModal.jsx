'use client'

import { useState, useEffect } from 'react'
import { getApiBaseUrl } from '@/lib/apiConfig'

export default function HwidDeviceManagerModal({ isOpen, onClose, product, buyerProfile }) {
  const [loading, setLoading] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [licenseInfo, setLicenseInfo] = useState(null)
  const [copiedKey, setCopiedKey] = useState(false)
  const [feedbackMsg, setFeedbackMsg] = useState(null)

  const resolvedLicenseKey = product?.licenseKey || `FK-${(product?.sku || 'DES').substring(0, 4).toUpperCase()}-${String(product?.orderId || '0000').replace(/[^a-zA-Z0-9]/g, '').slice(-8).toUpperCase()}`

  useEffect(() => {
    if (!isOpen || !resolvedLicenseKey) return

    setFeedbackMsg(null)
    setLoading(true)
    const apiBase = getApiBaseUrl()

    fetch(`${apiBase}/hardware-license/info?licenseKey=${encodeURIComponent(resolvedLicenseKey)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.license) {
          setLicenseInfo(data.license)
        } else {
          setLicenseInfo({
            licenseKey: resolvedLicenseKey,
            maxDevices: 2,
            activeDevicesCount: 0,
            devices: [],
            status: 'ACTIVE'
          })
        }
      })
      .catch(() => {
        setLicenseInfo({
          licenseKey: resolvedLicenseKey,
          maxDevices: 2,
          activeDevicesCount: 0,
          devices: [],
          status: 'ACTIVE'
        })
      })
      .finally(() => setLoading(false))
  }, [isOpen, resolvedLicenseKey])

  if (!isOpen || !product) return null

  const handleCopyKey = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(resolvedLicenseKey)
      setCopiedKey(true)
      setTimeout(() => setCopiedKey(false), 2000)
    }
  }

  const handleResetSlots = async () => {
    if (!confirm('Apakah Anda yakin ingin melepaskan semua slot perangkat aktif?\nSetelah ini, Anda dapat mengaktivasi kembali di komputer baru.')) {
      return
    }

    setResetting(true)
    setFeedbackMsg(null)
    try {
      const apiBase = getApiBaseUrl()
      const res = await fetch(`${apiBase}/hardware-license/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey: resolvedLicenseKey })
      })
      const data = await res.json()
      if (data.success) {
        setFeedbackMsg({ type: 'success', text: 'Semua slot perangkat berhasil dibebaskan! Anda dapat langsung aktivasi di komputer baru.' })
        setLicenseInfo(prev => prev ? { ...prev, activeDevicesCount: 0, devices: [] } : null)
      } else {
        setFeedbackMsg({ type: 'error', text: data.message || 'Gagal mereset perangkat.' })
      }
    } catch (err) {
      setFeedbackMsg({ type: 'error', text: 'Koneksi ke server lisensi terganggu. Silakan hubungi CS.' })
    } finally {
      setResetting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-950/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header */}
          <div className="p-6 sm:p-7 border-b border-neutral-100 flex items-start justify-between bg-neutral-50/70">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-neutral-950 text-white text-[10px] font-mono font-bold tracking-wider">
                <span>KRIPTOGRAFI HWID</span>
                <span>•</span>
                <span>HMAC-SHA256</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-neutral-950 pt-1">
                Kelola Lisensi &amp; Perangkat
              </h3>
              <p className="text-xs text-neutral-500 font-medium">
                {product.title} (SKU: {product.sku})
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-7 space-y-6">
            {/* Feedback Alert */}
            {feedbackMsg && (
              <div className={`p-3.5 rounded-2xl text-xs font-medium border flex items-center gap-2 ${
                feedbackMsg.type === 'success' 
                  ? 'bg-neutral-950 text-white border-neutral-900' 
                  : 'bg-red-50 text-red-900 border-red-200'
              }`}>
                <span>{feedbackMsg.type === 'success' ? '✓' : '⚠️'}</span>
                <span>{feedbackMsg.text}</span>
              </div>
            )}

            {/* License Key Box */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Nomor Kunci Lisensi (License Key):
                </span>
                <span className="text-[11px] font-mono font-bold text-neutral-700">
                  Maks. {licenseInfo?.maxDevices || 2} Perangkat
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex-1 font-mono text-sm sm:text-base font-black text-neutral-950 bg-white px-3 py-2 rounded-xl border border-neutral-200 select-all shadow-sm">
                  {resolvedLicenseKey}
                </span>
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold transition-all cursor-pointer shadow-sm shrink-0"
                >
                  {copiedKey ? '✓ Tersalin!' : 'Salin'}
                </button>
              </div>
            </div>

            {/* Device Slot Status */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  Slot Perangkat Terdaftar ({licenseInfo?.activeDevicesCount || 0} / {licenseInfo?.maxDevices || 2})
                </h4>
                {loading && <span className="text-xs text-neutral-400">Memuat...</span>}
              </div>

              {licenseInfo?.devices && licenseInfo.devices.length > 0 ? (
                <div className="space-y-2">
                  {licenseInfo.devices.map((dev) => (
                    <div 
                      key={dev.id} 
                      className="p-3 rounded-xl border border-neutral-200 bg-white flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>{dev.deviceName}</span>
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400">
                          HWID: {dev.hwidShort}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[10px] font-mono font-bold">
                        AKTIF
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-neutral-300 text-center text-xs text-neutral-500 bg-white">
                  Belum ada perangkat yang mengaktifkan kunci ini. Kuota siap digunakan di komputer/laptop Anda.
                </div>
              )}
            </div>

            {/* How to activate */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 space-y-1.5 leading-relaxed">
              <div className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-1">
                Petunjuk Pindah Komputer Kasir:
              </div>
              <p>1. Jika Anda mengganti laptop atau instal ulang Windows, klik tombol <strong>&ldquo;Reset / Lepas Slot Perangkat&rdquo;</strong> di bawah.</p>
              <p>2. Kuota akan otomatis dibebaskan dan siap digunakan di komputer baru Anda.</p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetSlots}
              disabled={resetting}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 text-xs font-bold transition-all cursor-pointer shadow-sm disabled:opacity-50"
            >
              {resetting ? 'Mereset...' : '🔄 Reset / Lepas Slot Perangkat'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              Selesai
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
