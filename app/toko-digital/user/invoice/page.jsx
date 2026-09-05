'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import InvoiceReceipt from '@/components/invoice/InvoiceReceipt'
import DriveAccessButton from '@/components/invoice/DriveAccessButton'
import { getBuyerProfile, getBuyerOrders, setBuyerProfile, addBuyerOrder } from '@/lib/buyerStore'
import { getApiBaseUrl } from '@/lib/apiConfig'
import NotFound from '@/app/not-found'

function UserInvoiceContent() {
  const searchParams = useSearchParams()
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isPolling, setIsPolling] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 1. Ekstrak orderId dari query param (?order_id=...) ATAU dari URL path (/toko-digital/user/invoice/:orderId)
  useEffect(() => {
    setMounted(true)
    let extractedId = searchParams.get('order_id') || searchParams.get('id') || ''
    if (!extractedId && typeof window !== 'undefined') {
      const match = window.location.pathname.match(/\/toko-digital\/user\/invoice\/([^\/\?]+)/i)
      if (match && match[1] && match[1] !== 'index' && match[1] !== 'page') {
        extractedId = decodeURIComponent(match[1])
      }
    }
    setOrderId(extractedId)
  }, [searchParams])

  // 2. Verifikasi kepemilikan dan load data pesanan
  useEffect(() => {
    if (!mounted) return
    if (!orderId) {
      setIsLoaded(true)
      setIsAuthorized(false)
      return
    }

    const prof = getBuyerProfile()
    const localOrders = getBuyerOrders()
    const matchingLocalOrder = localOrders.find(
      o => o.orderId && o.orderId.toUpperCase() === orderId.toUpperCase()
    )

    // Deteksi identitas pemilik:
    // a. Dari akun profil pembeli aktif di browser
    // b. Dari riwayat transaksi lokal brankas perangkat ini (perangkat asli pembuat order)
    const activeEmail = (prof?.email || matchingLocalOrder?.customerEmail || '').trim().toLowerCase()

    // STRICT CHECK: Jika sama sekali tidak ada email pembeli (profil asing, perangkat orang lain tanpa login)
    // -> Kembalikan 404 (Ghost Not Found)
    if (!activeEmail) {
      setIsLoaded(true)
      setIsAuthorized(false)
      return
    }

    // Jika perangkat ini memiliki riwayat order lokal tapi profil belum terisi, sinkronkan
    if (matchingLocalOrder?.customerEmail && !prof?.email) {
      setBuyerProfile({
        name: matchingLocalOrder.customerName || '',
        email: matchingLocalOrder.customerEmail,
        phone: matchingLocalOrder.customerPhone || ''
      })
    }

    // Verifikasi ke backend dengan menyertakan email pembeli aktif
    const apiUrl = getApiBaseUrl()
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 6000)

    fetch(`${apiUrl}/digital-orders/${encodeURIComponent(orderId)}/status?email=${encodeURIComponent(activeEmail)}`, {
      signal: controller.signal
    })
      .then(res => {
        if (!res.ok) throw new Error('Not authorized or not found')
        return res.json()
      })
      .then(data => {
        clearTimeout(timer)
        if (data.success) {
          const ordData = {
            orderId: data.orderId,
            sku: data.sku,
            title: data.title,
            format: data.format || 'CDR',
            price: data.amount,
            customerName: data.buyerName || matchingLocalOrder?.customerName || prof?.name || '-',
            customerEmail: data.buyerEmail || activeEmail,
            paymentType: data.paymentMethod,
            status: (data.paymentStatus || 'pending').toLowerCase(),
            createdAt: data.createdAt,
            driveLink: data.deliveryLink,
            items: (data.items && data.items.length > 0) ? data.items : (matchingLocalOrder?.items || [])
          }
          setOrder(ordData)
          setIsAuthorized(true)
          addBuyerOrder(ordData)
        } else {
          setIsAuthorized(false)
        }
      })
      .catch((err) => {
        console.warn('[UserInvoice] Notice:', err.message)
        // Jika jaringan sedang gangguan tapi perangkat ini memegang pesanan asli secara lokal
        if (matchingLocalOrder) {
          setOrder(matchingLocalOrder)
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
        }
      })
      .finally(() => {
        setIsLoaded(true)
      })
  }, [mounted, orderId])

  // 3. Polling otomatis saat menunggu verifikasi pembayaran
  useEffect(() => {
    if (!isAuthorized || !order || !orderId) return
    const isSettled = order.status === 'settlement' || order.status === 'lunas' || order.status === 'success'
    if (isSettled && order.driveLink) return

    setIsPolling(true)
    const apiUrl = getApiBaseUrl()
    const interval = setInterval(() => {
      const prof = getBuyerProfile()
      const localOrders = getBuyerOrders()
      const matchingLocalOrder = localOrders.find(
        o => o.orderId && o.orderId.toUpperCase() === orderId.toUpperCase()
      )
      const currentEmail = (prof?.email || matchingLocalOrder?.customerEmail || order.customerEmail || '').trim().toLowerCase()
      if (!currentEmail) return

      fetch(`${apiUrl}/digital-orders/${encodeURIComponent(orderId)}/status?email=${encodeURIComponent(currentEmail)}`)
        .then(r => r.json())
        .then(data => {
          if (data.success && data.isSettlement) {
            setOrder(prev => ({
              ...prev,
              status: 'settlement',
              driveLink: data.deliveryLink || prev?.driveLink,
              items: data.items && data.items.length > 0 ? data.items : prev?.items
            }))
            setIsPolling(false)
            clearInterval(interval)
          }
        })
        .catch(() => {})
    }, 3000)

    return () => clearInterval(interval)
  }, [isAuthorized, order, orderId])

  if (!mounted || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50/60 font-sans text-sm text-neutral-400">
        Memverifikasi hak kepemilikan invoice...
      </div>
    )
  }

  // JIKA TIDAK DIIZINKAN (Profil lain, belum login, atau akun beda) -> 404 NOT FOUND MUTLAK
  if (!isAuthorized || !order) {
    return <NotFound />
  }

  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Toko Digital', href: '/toko-digital/' },
    { label: 'Nota Invoice', href: `/toko-digital/user/invoice/${encodeURIComponent(orderId)}` }
  ]

  return (
    <div className="min-h-screen bg-neutral-50/60 pb-20 pt-24 sm:pt-28 font-sans">
      <div className="container-page max-w-4xl space-y-6">
        <Breadcrumb items={breadcrumbs} />

        {isPolling && (
          <div className="flex items-center justify-between p-3.5 px-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs shadow-sm font-sans">
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

        <DriveAccessButton
          order={order}
          driveLink={order.driveLink}
          sku={order.sku}
          title={order.title}
        />

        <InvoiceReceipt order={order} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-neutral-200/80">
          <span className="text-xs text-neutral-500">
            Aset ini resmi terikat dengan akun Anda ({order.customerEmail}).
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
    </div>
  )
}

export default function UserInvoicePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-neutral-50/60 font-sans text-sm text-neutral-400">Memuat nota resmi...</div>}>
      <UserInvoiceContent />
    </Suspense>
  )
}
