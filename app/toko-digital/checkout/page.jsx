'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import OrderSummary from '@/components/checkout/OrderSummary'
import DeliveryEmailForm from '@/components/checkout/DeliveryEmailForm'
import VoucherInput from '@/components/checkout/VoucherInput'
import PaymentSecurityBadge from '@/components/checkout/PaymentSecurityBadge'
import digitalProducts from '@/content/apps/digitalProducts.json'
import { isValidEmail } from '@/lib/validators'
import { generateInvoiceId } from '@/lib/formatters'
import { addBuyerOrder, setBuyerProfile, getBuyerProfile, pushOrderToServer, hasPurchasedSku } from '@/lib/buyerStore'

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sku = searchParams.get('sku')

  const [product, setProduct] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [voucher, setVoucher] = useState(null)
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [duplicateInfo, setDuplicateInfo] = useState(null)

  useEffect(() => {
    // Isi otomatis dari sesi profil jika ada
    const existing = getBuyerProfile()
    if (existing) {
      if (existing.name) setName(existing.name)
      if (existing.email) setEmail(existing.email)
      if (existing.phone) setPhone(existing.phone)
    }

    if (sku && Array.isArray(digitalProducts)) {
      const found = digitalProducts.find(
        (p) => String(p.sku).toUpperCase().trim() === String(sku).toUpperCase().trim()
      )
      if (found) setProduct(found)
    }
    setIsLoaded(true)
  }, [sku])

  useEffect(() => {
    if (!email || !isValidEmail(email) || !product?.sku) {
      setDuplicateInfo(null)
      return
    }

    if (hasPurchasedSku(product.sku)) {
      setDuplicateInfo({
        alreadyPurchased: true,
        message: 'Produk ini sudah ada di koleksi akun perangkat ini.'
      })
      return
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 1500)
    fetch(`http://localhost:8090/api/v1/digital-orders/check-duplicate?email=${encodeURIComponent(email)}&sku=${encodeURIComponent(product.sku)}`, {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => {
        clearTimeout(timer)
        if (data.success && data.alreadyPurchased) {
          setDuplicateInfo(data)
        } else {
          setDuplicateInfo(null)
        }
      })
      .catch(() => {})

    return () => clearTimeout(timer)
  }, [email, product?.sku])

  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Toko Digital', href: '/toko-digital/' },
    { label: 'Checkout', href: `/toko-digital/checkout/?sku=${sku || ''}` }
  ]

  if (!isLoaded) {
    return <div className="py-20 text-center text-sm text-neutral-400">Memuat data produk...</div>
  }

  if (!product) {
    return (
      <div className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm">
        <div className="text-3xl mb-3">🔍</div>
        <h2 className="font-display font-bold text-xl text-neutral-950 mb-2">
          Produk Tidak Ditemukan
        </h2>
        <p className="text-xs text-neutral-500 mb-6">
          SKU produk digital yang diminta tidak valid atau sudah tidak tayang.
        </p>
        <Link
          href="/toko-digital/"
          className="inline-flex px-5 py-2.5 rounded-xl bg-black text-white font-bold text-xs"
        >
          Kembali ke Katalog Toko →
        </Link>
      </div>
    )
  }

  const basePrice = Number(product.price) || 0
  const finalPrice = voucher ? voucher.finalPrice : basePrice

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!name.trim()) newErrors.name = 'Nama lengkap wajib diisi.'
    if (!email.trim()) newErrors.email = 'Alamat Gmail wajib diisi.'
    else if (!isValidEmail(email)) newErrors.email = 'Format email tidak valid.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsProcessing(true)

    const orderId = generateInvoiceId()

    setBuyerProfile({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim()
    })

    const newOrder = {
      orderId: orderId,
      sku: product.sku,
      title: product.title,
      format: product.format || 'CDR',
      price: finalPrice,
      originalPrice: product.originalPrice || basePrice * 2,
      discountAmount: voucher ? voucher.discountAmount : 0,
      voucherCode: voucher ? voucher.code : null,
      coverImage: product.coverImage || `/covers/${product.sku}/${product.sku}_cover.webp`,
      driveLink: product.driveLink || product.backupDriveLink || '#',
      customerName: name.trim(),
      customerEmail: email.trim().toLowerCase(),
      customerPhone: phone.trim(),
      paymentType: 'QRIS / Midtrans',
      status: 'settlement',
      createdAt: Date.now()
    }

    addBuyerOrder(newOrder)
    pushOrderToServer(newOrder)

    setTimeout(() => {
      setIsProcessing(false)
      router.push(`/toko-digital/invoice/?order_id=${orderId}`)
    }, 450)
  }

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />

      <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-neutral-950 tracking-tight">
            Checkout Pembelian Digital
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Pengiriman instan tautan Google Drive resmi langsung ke alamat Gmail Anda.
          </p>
        </div>
        <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-bold bg-neutral-900 text-white font-mono uppercase">
          SKU: {product.sku}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.05)] space-y-6">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-base text-neutral-950 mb-1">
                1. Data Pengiriman Aset Digital
              </h3>
              <p className="text-xs text-neutral-400 mb-4">
                Tautan Google Drive resmi akan dikaitkan dengan alamat email ini.
              </p>
              <DeliveryEmailForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                errors={errors}
              />
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <h3 className="font-display font-bold text-base text-neutral-950 mb-1">
                2. Kupon Voucher Diskon
              </h3>
              <p className="text-xs text-neutral-400 mb-3">
                Punya kode promo? Masukkan untuk mendapatkan potongan harga.
              </p>
              <VoucherInput
                currentPrice={basePrice}
                onApplyVoucher={(v) => setVoucher(v)}
                appliedVoucher={voucher}
              />
            </div>

            <PaymentSecurityBadge />
          </form>
        </div>

        {/* Right Sticky Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-[0_4px_25px_rgba(0,0,0,0.05)] space-y-5">
            <h3 className="font-display font-bold text-base text-neutral-950">
              Ringkasan Pembayaran
            </h3>

            <OrderSummary
              product={product}
              voucher={voucher}
              finalPrice={finalPrice}
            />

            {/* Duplicate Notice */}
            {duplicateInfo?.alreadyPurchased && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-2 animate-fade-in">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                  <span>✓</span>
                  <span>Anda Sudah Memiliki Desain Ini!</span>
                </div>
                <p className="text-emerald-700 leading-relaxed">
                  Email <strong>{email}</strong> sudah tercatat memiliki produk ini. Anda tidak perlu membayar ulang.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    href="/akun/"
                    className="w-full text-center py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors"
                  >
                    Buka di Brankas Akun Saya →
                  </Link>
                  {duplicateInfo.driveLink && (
                    <a
                      href={duplicateInfo.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-2 px-4 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs transition-colors"
                    >
                      📥 Buka Langsung di Google Drive
                    </a>
                  )}
                </div>
              </div>
            )}

            {duplicateInfo?.alreadyPurchased ? (
              <Link
                href="/akun/"
                className="w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-display font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Lihat di Koleksi Akun Saya →</span>
              </Link>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-black hover:bg-neutral-800 active:scale-[0.99] text-white font-display font-extrabold text-sm sm:text-base shadow-lg shadow-black/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Memproses Pembayaran...</span>
                ) : (
                  <>
                    <span>Bayar Sekarang & Buka Drive</span>
                    <span>→</span>
                  </>
                )}
              </button>
            )}

            <div className="text-center text-[11px] text-neutral-400">
              Transaksi aman dilindungi garansi lisensi komersial resmi FokusKonten.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-neutral-50/60 pb-20 pt-24 sm:pt-28">
      <div className="container-page max-w-5xl">
        <Suspense fallback={<div className="py-20 text-center text-sm text-neutral-400">Memuat checkout...</div>}>
          <CheckoutContent />
        </Suspense>
      </div>
    </div>
  )
}
