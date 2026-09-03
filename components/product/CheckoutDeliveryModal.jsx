'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import OrderSummary from '@/components/checkout/OrderSummary'
import DeliveryEmailForm from '@/components/checkout/DeliveryEmailForm'
import VoucherInput from '@/components/checkout/VoucherInput'
import PaymentSecurityBadge from '@/components/checkout/PaymentSecurityBadge'
import { isValidEmail } from '@/lib/validators'
import { generateInvoiceId } from '@/lib/formatters'
import { addBuyerOrder, setBuyerProfile, pushOrderToServer, hasPurchasedSku, getBuyerProfile } from '@/lib/buyerStore'

export default function CheckoutDeliveryModal({
  isOpen,
  onClose,
  product
}) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [voucher, setVoucher] = useState(null)
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [duplicateInfo, setDuplicateInfo] = useState(null)

  useEffect(() => {
    if (isOpen) {
      const prof = getBuyerProfile()
      if (prof) {
        if (prof.name && !name) setName(prof.name)
        if (prof.email && !email) setEmail(prof.email)
        if (prof.phone && !phone) setPhone(prof.phone)
      }
    }
  }, [isOpen])

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

  if (!isOpen || !product) return null

  const basePrice = Number(product.price) || 0
  const finalPrice = voucher ? voucher.finalPrice : basePrice

  const handleProceedToPayment = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi.'
    }
    if (!email.trim()) {
      newErrors.email = 'Alamat Gmail wajib diisi.'
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Format email tidak valid.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsProcessing(true)

    const orderId = generateInvoiceId()

    // 1. Simpan profil pembeli
    setBuyerProfile({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim()
    })

    // 2. Buat objek pesanan standar (mengadopsi standar fulfilled_orders Shopee bot)
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
      status: 'settlement', // Mode Sandbox instan success
      createdAt: Date.now()
    }

    // 3. Simpan ke brankas pembeli di peramban (client persistence) & sinkron ke server lokal
    addBuyerOrder(newOrder)
    pushOrderToServer(newOrder)

    // 4. Simulasi proses transaksi peramban (400ms) lalu alihkan ke nota resmi
    setTimeout(() => {
      setIsProcessing(false)
      onClose()
      router.push(`/toko-digital/invoice/?order_id=${orderId}`)
    }, 450)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)] my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors text-sm font-bold cursor-pointer"
          aria-label="Tutup"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-900 text-white font-mono uppercase">
              Form Delivery
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
              Pengiriman Instan 24 Jam
            </span>
          </div>
          <h3 className="font-display font-black text-xl sm:text-2xl text-neutral-950 tracking-tight">
            Checkout & Akses Google Drive
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Masukkan data pengiriman Anda untuk menerima tautan file master dan nota pembelian resmi.
          </p>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleProceedToPayment} className="space-y-5">
          {/* Order Summary Snapshot */}
          <OrderSummary
            product={product}
            voucher={voucher}
            finalPrice={finalPrice}
          />

          {/* Delivery Form (Gmail, Name, Phone) */}
          <DeliveryEmailForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            errors={errors}
          />

          {/* Voucher Input */}
          <VoucherInput
            currentPrice={basePrice}
            onApplyVoucher={(v) => setVoucher(v)}
            appliedVoucher={voucher}
          />

          {/* Security Badge */}
          <PaymentSecurityBadge />

          {/* Duplicate Purchase Notice */}
          {duplicateInfo?.alreadyPurchased && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                <span>✓</span>
                <span>Anda Sudah Memiliki Master Desain Ini!</span>
              </div>
              <p className="text-emerald-700 leading-relaxed">
                Alamat email <strong>{email}</strong> sudah tercatat pernah membeli produk ini. Anda tidak perlu membayar lagi untuk mencegah tagihan ganda.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <Link
                  href="/akun/"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors"
                >
                  Buka Brankas Unduhan Saya →
                </Link>
                {duplicateInfo.driveLink && (
                  <a
                    href={duplicateInfo.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs transition-colors"
                  >
                    📥 Unduh di Google Drive
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            {duplicateInfo?.alreadyPurchased ? (
              <Link
                href="/akun/"
                onClick={onClose}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-display font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Aset Sudah Dimiliki — Buka Koleksi Saya →</span>
              </Link>
            ) : (
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-black hover:bg-neutral-800 active:scale-[0.99] text-white font-display font-extrabold text-sm sm:text-base shadow-lg shadow-black/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Memproses Pembayaran Aman...</span>
                ) : (
                  <>
                    <span>Lanjut Bayar & Dapatkan Link Drive</span>
                    <span>→</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
