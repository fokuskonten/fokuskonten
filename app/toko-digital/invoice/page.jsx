'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import InvoiceReceipt from '@/components/invoice/InvoiceReceipt'
import DriveAccessButton from '@/components/invoice/DriveAccessButton'
import { getBuyerOrders, addBuyerOrder } from '@/lib/buyerStore'
import { getApiBaseUrl } from '@/lib/apiConfig'

function InvoiceContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [order, setOrder] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPolling, setIsPolling] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  useEffect(() => {
    if (!orderId) {
      setIsLoaded(true)
      return
    }

    const orders = getBuyerOrders()
    const found = orders.find(
      (o) => String(o.orderId).toUpperCase() === String(orderId).toUpperCase() ||
             String(o.parentOrderId || '').toUpperCase() === String(orderId).toUpperCase()
    )

    if (found) {
      setOrder(found)
    } else {
      setOrder({
        orderId: orderId,
        title: 'Master Desain Digital FokusKonten',
        sku: 'MASTER-DIGITAL',
        format: 'CDR',
        price: 35000,
        customerName: 'Pelanggan Terhormat',
        customerEmail: 'Konfirmasi via Gmail',
        paymentType: 'QRIS / Midtrans',
        status: 'pending',
        createdAt: Date.now(),
        driveLink: null
      })
    }
    setIsLoaded(true)
  }, [orderId])

  // Real-time Status Polling: Cek otomatis ke server setiap 3 detik jika status belum settlement
  // Berhenti otomatis setelah MAX_POLL percobaan (±60 detik) untuk mencegah polling tak terbatas
  useEffect(() => {
    if (!orderId || !order) return

    const isSettled = (
      order.status === 'settlement' ||
      order.status === 'lunas' ||
      order.status === 'success'
    )
    const hasValidLink = order.driveLink && order.driveLink !== '#'

    if (isSettled && hasValidLink) {
      setIsPolling(false)
      return
    }

    setIsPolling(true)
    const apiUrl = getApiBaseUrl()
    const MAX_POLL = 20 // 20 × 3 detik = 60 detik maksimum
    let pollCount = 0

    const interval = setInterval(() => {
      pollCount++
      if (pollCount >= MAX_POLL) {
        setIsPolling(false)
        clearInterval(interval)
        return
      }

      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 2000)

      fetch(`${apiUrl}/digital-orders/${encodeURIComponent(orderId)}/status`, {
        signal: controller.signal
      })
        .then(res => res.json())
        .then(data => {
          clearTimeout(timeout)
          if (data.success && data.isSettlement) {
            setOrder(prev => {
              const updated = {
                ...(prev || {}),
                status: 'settlement',
                driveLink: data.deliveryLink || prev?.driveLink,
                items: data.items && data.items.length > 0 ? data.items : prev?.items,
                paymentType: data.paymentMethod || prev?.paymentType || 'QRIS'
              }
              addBuyerOrder(updated)
              return updated
            })
            // Stop polling jika drive link sudah ada
            if (data.deliveryLink && data.deliveryLink !== '#') {
              setIsPolling(false)
              clearInterval(interval)
            }
          }
        })
        .catch(() => {
          // Server sedang offline atau koneksi lambat, abaikan
        })
    }, 3000)

    return () => clearInterval(interval)
  }, [orderId, order?.status, order?.driveLink])

  const isDevOrLocal = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.')
  )

  const handleSimulatePayment = async () => {
    if (!orderId || isSimulating) return
    setIsSimulating(true)
    try {
      const apiUrl = getApiBaseUrl()
      const res = await fetch(`${apiUrl}/digital-orders/${encodeURIComponent(orderId)}/trigger-delivery`, {
        method: 'POST'
      })
      const data = await res.json()
      if (data.success) {
        const statusRes = await fetch(`${apiUrl}/digital-orders/${encodeURIComponent(orderId)}/status`)
        const statusData = await statusRes.json()
        if (statusData.success) {
          setOrder(prev => {
            const updated = {
              ...(prev || {}),
              status: 'settlement',
              driveLink: statusData.deliveryLink || data.zipResult?.driveLink || prev?.driveLink,
              items: statusData.items && statusData.items.length > 0 ? statusData.items : prev?.items,
              paymentType: statusData.paymentMethod || 'QRIS (Simulasi Lunas)'
            }
            addBuyerOrder(updated)
            return updated
          })
          setIsPolling(false)
        }
      } else {
        console.warn('Simulasi pembayaran ditolak:', data.error)
      }
    } catch (err) {
      console.warn('Gagal memverifikasi simulasi pembayaran:', err.message)
    } finally {
      setIsSimulating(false)
    }
  }

  const handleCopyClaimLink = () => {
    if (typeof window === 'undefined' || !order) return
    const claimUrl = `${window.location.origin}/akun/?claim_order=${encodeURIComponent(order.orderId)}&email=${encodeURIComponent(order.customerEmail || '')}`
    navigator.clipboard.writeText(claimUrl).then(() => {
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2500)
    }).catch(() => {})
  }

  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Toko Digital', href: '/toko-digital/' },
    { label: 'Nota Invoice', href: `/toko-digital/invoice/?order_id=${orderId || ''}` }
  ]

  if (!isLoaded) {
    return (
      <div className="py-20 text-center text-sm text-neutral-400 font-sans">
        Memuat data invoice resmi...
      </div>
    )
  }

  if (!orderId && !order) {
    return (
      <div className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm font-sans">
        <div className="text-3xl mb-3">📄</div>
        <h2 className="font-display font-bold text-xl text-neutral-950 mb-2">
          Nomor Invoice Tidak Ditemukan
        </h2>
        <p className="text-xs text-neutral-500 mb-6 font-sans">
          Silakan periksa kembali tautan yang Anda buka, atau akses brankas unduhan akun Anda.
        </p>
        <Link
          href="/akun/"
          className="inline-flex px-5 py-2.5 rounded-xl bg-black text-white font-bold text-xs"
        >
          Buka Halaman Akun Saya →
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbs} />

      {/* Live Polling Status Indicator */}
      {isPolling && (
        <div className="flex items-center justify-between p-3.5 px-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs shadow-sm animate-fade-in font-sans">
          <div className="flex items-center gap-2.5 font-medium">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span className="font-bold">Menunggu Verifikasi Pembayaran...</span>
          </div>
          <span className="text-[11px] text-amber-700 hidden sm:inline">Otomatis membuka tautan Google Drive saat lunas</span>
        </div>
      )}

      {/* Top Banner Access Google Drive */}
      <DriveAccessButton
        order={order}
        driveLink={order.driveLink}
        sku={order.sku}
        title={order.title}
        onSimulatePayment={isDevOrLocal ? handleSimulatePayment : null}
        isSimulating={isSimulating}
      />

      {/* Cross-Device Access Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 px-5 rounded-2xl bg-neutral-100/90 border border-neutral-200 text-neutral-800 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="text-base">💻</span>
          <span className="leading-tight">
            <strong>Buka di Laptop/PC?</strong> Gunakan tautan sinkronisasi untuk langsung membuka aset di komputer Anda tanpa login.
          </span>
        </div>
        <button
          onClick={handleCopyClaimLink}
          type="button"
          className="shrink-0 px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-black text-white font-bold text-[11px] transition-all cursor-pointer flex items-center gap-1.5"
        >
          {copiedLink ? (
            <>
              <span>✓ Tautan Disalin!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Salin Link Akses PC</span>
            </>
          )}
        </button>
      </div>

      {/* Formal Printable Receipt Card */}
      <InvoiceReceipt order={order} />

      {/* Bottom Navigation Links */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-neutral-200/80">
        <span className="text-xs text-neutral-500">
          Aset ini otomatis tersimpan di riwayat akun Anda.
        </span>
        <div className="flex items-center gap-2">
          <Link
            href="/akun/"
            className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition-colors"
          >
            Lihat Koleksi di Akun Saya
          </Link>
          <Link
            href="/toko-digital/"
            className="px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold transition-colors"
          >
            Belanja Lagi
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function InvoicePage() {
  return (
    <div className="min-h-screen bg-neutral-50/60 pb-20 pt-24 sm:pt-28">
      <div className="container-page max-w-4xl">
        <Suspense fallback={<div className="py-20 text-center text-sm text-neutral-400">Memuat nota...</div>}>
          <InvoiceContent />
        </Suspense>
      </div>
    </div>
  )
}
