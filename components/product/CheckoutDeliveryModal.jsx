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
import { addBuyerOrder, setBuyerProfile, pushOrderToServer, hasPurchasedSku, getBuyerProfile, updateOrderStatus } from '@/lib/buyerStore'
import { getApiBaseUrl, getMidtransSnapUrl, getMidtransClientKey } from '@/lib/apiConfig'

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

    const apiUrl = getApiBaseUrl()
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 2000)
    fetch(`${apiUrl}/digital-orders/check-duplicate?email=${encodeURIComponent(email)}&sku=${encodeURIComponent(product.sku)}`, {
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

    // 2. Buat objek pesanan standar dengan status PENDING
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
      status: 'pending',
      items: [{
        sku: product.sku,
        title: product.title,
        format: product.format || 'CDR',
        price: finalPrice,
        originalPrice: product.originalPrice || basePrice * 2,
        coverImage: product.coverImage || `/covers/${product.sku}/${product.sku}_cover.webp`,
        driveLink: product.driveLink || product.backupDriveLink || '#'
      }],
      createdAt: Date.now()
    }

    // 3. Simpan ke brankas pembeli di peramban (client persistence)
    addBuyerOrder(newOrder)

    // 4. Kirim ke backend untuk transaksi Midtrans Snap
    try {
      const serverRes = await pushOrderToServer(newOrder)
      const snapToken = serverRes?.midtrans?.token
      const isSandboxMock = serverRes?.midtrans?.isSandboxMock

      if (snapToken && !isSandboxMock && typeof window !== 'undefined') {
        const loadSnapScript = () => {
          return new Promise((resolve) => {
            const correctSnapUrl = getMidtransSnapUrl()
            const clientKey = getMidtransClientKey()

            const existingScript = document.querySelector('script[src*="midtrans.com/snap/snap.js"]')
            if (existingScript && existingScript.src === correctSnapUrl && window.snap) {
              return resolve(window.snap)
            }
            if (existingScript && existingScript.src !== correctSnapUrl) {
              existingScript.remove()
              delete window.snap
            }

            if (window.snap) return resolve(window.snap)
            const script = document.createElement('script')
            script.src = correctSnapUrl
            script.setAttribute('data-client-key', clientKey)
            script.onload = () => resolve(window.snap)
            script.onerror = () => resolve(null)
            document.head.appendChild(script)
          })
        }

        const snapInstance = await loadSnapScript()
        if (snapInstance && typeof snapInstance.pay === 'function') {
          setIsProcessing(false)
          onClose()
          snapInstance.pay(snapToken, {
            onSuccess: function() {
              updateOrderStatus(orderId, 'settlement')
              router.push(`/toko-digital/user/invoice/?order_id=${orderId}`)
            },
            onPending: function() {
              router.push(`/toko-digital/user/invoice/?order_id=${orderId}`)
            },
            onError: function() {
              router.push(`/toko-digital/user/invoice/?order_id=${orderId}`)
            },
            onClose: function() {
              router.push(`/toko-digital/user/invoice/?order_id=${orderId}`)
            }
          })
          return
        }
      }
    } catch (err) {
      console.warn('Checkout modal push order note:', err)
    }

    setIsProcessing(false)
    onClose()
    router.push(`/toko-digital/user/invoice/?order_id=${orderId}`)
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
            <span className="text-xs font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
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
            <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200 text-neutral-900 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-bold text-sm text-neutral-950">
                <span>✓</span>
                <span>Produk Sudah Anda Miliki</span>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                Email <strong>{email}</strong> sudah terdaftar memiliki produk ini. Anda tidak perlu membayar ulang.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <Link
                  href="/akun/"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-black text-white font-bold text-xs transition-colors"
                >
                  Lihat di Akun Saya →
                </Link>
                {duplicateInfo.driveLink && (
                  <a
                    href={duplicateInfo.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs transition-colors"
                  >
                    Buka Google Drive
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
                className="w-full py-4 px-6 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-display font-extrabold text-sm sm:text-base shadow-lg shadow-black/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buka Koleksi Saya →</span>
              </Link>
            ) : (
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-black hover:bg-neutral-800 active:scale-[0.99] text-white font-display font-extrabold text-sm sm:text-base shadow-lg shadow-black/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Memproses...</span>
                ) : (
                  <>
                    <span>Lanjut ke Pembayaran</span>
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
