'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import InvoiceReceipt from '@/components/invoice/InvoiceReceipt'
import DriveAccessButton from '@/components/invoice/DriveAccessButton'
import { getBuyerOrders } from '@/lib/buyerStore'

function InvoiceContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [order, setOrder] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPolling, setIsPolling] = useState(false)

  useEffect(() => {
    if (!orderId) {
      setIsLoaded(true)
      return
    }

    const orders = getBuyerOrders()
    const found = orders.find(
      (o) => String(o.orderId).toUpperCase() === String(orderId).toUpperCase()
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

  // Real-time Status Polling: Cek otomatis ke server setiap 3 detik jika link Drive belum ada
  useEffect(() => {
    if (!orderId || !order) return
    const isCompleted = (
      order.status === 'settlement' || 
      order.status === 'LUNAS' || 
      order.status === 'success'
    ) && order.driveLink && order.driveLink !== '#'

    if (isCompleted) {
      setIsPolling(false)
      return
    }

    setIsPolling(true)
    const interval = setInterval(() => {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 2000)

      fetch(`http://localhost:8090/api/v1/digital-orders/${encodeURIComponent(orderId)}/status`, {
        signal: controller.signal
      })
        .then(res => res.json())
        .then(data => {
          clearTimeout(timeout)
          if (data.success && data.isSettlement && data.deliveryLink) {
            setOrder(prev => {
              const updated = {
                ...(prev || {}),
                status: 'settlement',
                driveLink: data.deliveryLink,
                paymentType: data.paymentMethod || prev?.paymentType || 'QRIS'
              }
              addBuyerOrder(updated)
              return updated
            })
            setIsPolling(false)
            clearInterval(interval)
          }
        })
        .catch(() => {
          // Server sedang offline atau koneksi lambat, abaikan
        })
    }, 3000)

    return () => clearInterval(interval)
  }, [orderId, order?.status, order?.driveLink])

  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Toko Digital', href: '/toko-digital/' },
    { label: 'Nota Invoice', href: `/toko-digital/invoice/?order_id=${orderId || ''}` }
  ]

  if (!isLoaded) {
    return (
      <div className="py-20 text-center text-sm text-neutral-400">
        Memuat data invoice resmi...
      </div>
    )
  }

  if (!orderId && !order) {
    return (
      <div className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm">
        <div className="text-3xl mb-3">📄</div>
        <h2 className="font-display font-bold text-xl text-neutral-950 mb-2">
          Nomor Invoice Tidak Ditemukan
        </h2>
        <p className="text-xs text-neutral-500 mb-6">
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
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbs} />

      {/* Live Polling Status Indicator */}
      {isPolling && (
        <div className="flex items-center justify-between p-3.5 px-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs shadow-sm animate-fade-in">
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
        driveLink={order.driveLink}
        sku={order.sku}
        title={order.title}
      />

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
