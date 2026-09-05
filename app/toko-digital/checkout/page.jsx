'use client'

import { Suspense, useState, useEffect, useMemo } from 'react'
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
import { 
  addBuyerOrder, 
  setBuyerProfile, 
  getBuyerProfile, 
  clearBuyerSession,
  subscribeBuyerStore,
  pushOrderToServer, 
  hasPurchasedSku,
  updateOrderStatus,
  registerBuyerAccount,
  loginBuyerWithPassword
} from '@/lib/buyerStore'
import { getApiBaseUrl, getMidtransClientKey, getMidtransSnapUrl } from '@/lib/apiConfig'
import { getCartItems, clearCart, removeFromCart } from '@/lib/cartStore'
import { useStoreHealth } from '@/lib/useStoreHealth'

function CheckoutContent() {
  const router = useRouter()
  const { isOffline, ctaText } = useStoreHealth()
  const searchParams = useSearchParams()
  const skuParam = searchParams.get('sku')

  const [singleProduct, setSingleProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [isMultiMode, setIsMultiMode] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isExistingAccount, setIsExistingAccount] = useState(false)
  const [voucher, setVoucher] = useState(null)
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [duplicateInfo, setDuplicateInfo] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // 1. Isi otomatis dari sesi profil jika ada & tentukan status login
    const applyProfile = () => {
      const existing = getBuyerProfile()
      if (existing && existing.email) {
        setIsLoggedIn(true)
        if (existing.name) setName(existing.name)
        if (existing.email) setEmail(existing.email)
        if (existing.phone) setPhone(existing.phone)
      } else {
        setIsLoggedIn(false)
      }
    }

    applyProfile()
    const unsubBuyer = subscribeBuyerStore(applyProfile)

    // 2. Tentukan mode checkout: Single SKU vs Multi-item Cart
    if (skuParam && Array.isArray(digitalProducts)) {
      const found = digitalProducts.find(
        (p) => String(p.sku).toUpperCase().trim() === String(skuParam).toUpperCase().trim()
      )
      if (found) {
        setSingleProduct(found)
        setIsMultiMode(false)
      }
    } else {
      // Tidak ada parameter SKU -> periksa isi keranjang belanja
      const itemsInCart = getCartItems()
      if (itemsInCart.length > 0) {
        setCartItems(itemsInCart)
        setIsMultiMode(true)
      }
    }

    setIsLoaded(true)
    return () => unsubBuyer()
  }, [skuParam])

  // Cek duplicate purchase untuk Single SKU maupun Multi-item Cart
  useEffect(() => {
    if (!isLoaded) return

    // 1. Mode Multi-item Cart
    if (isMultiMode) {
      if (!cartItems || cartItems.length === 0) {
        setDuplicateInfo(null)
        return
      }

      // 1a. Cek lokal di peramban akun perangkat ini
      const locallyOwned = cartItems.filter(it => hasPurchasedSku(it.sku))
      if (locallyOwned.length > 0) {
        setDuplicateInfo({
          alreadyPurchased: true,
          isMulti: true,
          isAllOwned: locallyOwned.length === cartItems.length,
          ownedItems: locallyOwned,
          message: `${locallyOwned.length} dari ${cartItems.length} produk di keranjang sudah ada di koleksi akun Anda.`
        })
        return
      }

      // 1b. Cek riwayat akun di server jika email valid telah diisi
      if (email && isValidEmail(email)) {
        const apiUrl = getApiBaseUrl()
        const controller = new AbortController()
        const timer = setTimeout(() => controller.abort(), 2000)

        fetch(`${apiUrl}/digital-orders/buyer/${encodeURIComponent(email)}`, {
          signal: controller.signal
        })
          .then(res => res.json())
          .then(data => {
            clearTimeout(timer)
            if (data.success && Array.isArray(data.orders)) {
              const settledSkus = new Set()
              data.orders.forEach(o => {
                const isSettled = (o.payment_status === 'SETTLEMENT' || o.payment_status === 'settlement' || o.payment_status === 'LUNAS' || o.payment_status === 'success')
                if (isSettled) {
                  if (o.sku_ordered && o.sku_ordered !== 'MULTI') settledSkus.add(String(o.sku_ordered).toUpperCase().trim())
                  if (Array.isArray(o.items)) {
                    o.items.forEach(it => {
                      if (it.sku) settledSkus.add(String(it.sku).toUpperCase().trim())
                    })
                  }
                }
              })
              const serverOwned = cartItems.filter(it => settledSkus.has(String(it.sku).toUpperCase().trim()))
              if (serverOwned.length > 0) {
                setDuplicateInfo({
                  alreadyPurchased: true,
                  isMulti: true,
                  isAllOwned: serverOwned.length === cartItems.length,
                  ownedItems: serverOwned,
                  message: `${serverOwned.length} dari ${cartItems.length} produk di keranjang sudah pernah dibeli dengan email ${email}.`
                })
                return
              }
            }
            setDuplicateInfo(null)
          })
          .catch(() => {})

        return () => clearTimeout(timer)
      } else {
        setDuplicateInfo(null)
      }
      return
    }

    // 2. Mode Single Product
    if (!singleProduct?.sku) {
      setDuplicateInfo(null)
      return
    }

    if (hasPurchasedSku(singleProduct.sku)) {
      setDuplicateInfo({
        alreadyPurchased: true,
        isMulti: false,
        isAllOwned: true,
        message: 'Produk ini sudah ada di koleksi akun perangkat ini.'
      })
      return
    }

    if (email && isValidEmail(email)) {
      const apiUrl = getApiBaseUrl()
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 2000)
      fetch(`${apiUrl}/digital-orders/check-duplicate?email=${encodeURIComponent(email)}&sku=${encodeURIComponent(singleProduct.sku)}`, {
        signal: controller.signal
      })
        .then(res => res.json())
        .then(data => {
          clearTimeout(timer)
          if (data.success && data.alreadyPurchased) {
            setDuplicateInfo({
              ...data,
              isMulti: false,
              isAllOwned: true
            })
          } else {
            setDuplicateInfo(null)
          }
        })
        .catch(() => {})

      return () => clearTimeout(timer)
    } else {
      setDuplicateInfo(null)
    }
  }, [email, singleProduct?.sku, isMultiMode, cartItems, isLoaded])

  const handleRemoveOwnedFromCart = () => {
    if (duplicateInfo?.ownedItems) {
      duplicateInfo.ownedItems.forEach(it => removeFromCart(it.sku))
      const remaining = getCartItems()
      setCartItems(remaining)
      setDuplicateInfo(null)
    }
  }

  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Toko Digital', href: '/toko-digital/' },
    { label: 'Checkout', href: '/toko-digital/checkout/' }
  ]

  if (!isLoaded) {
    return <div className="py-20 text-center text-sm text-neutral-400 font-sans">Memuat checkout...</div>
  }

  // Jika tidak ada single product dan keranjang kosong
  const hasItems = singleProduct || (isMultiMode && cartItems.length > 0)
  if (!hasItems) {
    return (
      <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-card font-sans">
        <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400 border border-neutral-200/60 shadow-soft">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="font-sans font-bold text-xl text-neutral-950 mb-2">
          Keranjang Belanja Masih Kosong
        </h2>
        <p className="text-xs text-neutral-500 mb-6 max-w-xs mx-auto leading-relaxed">
          Pilih master desain kaos, vektor, atau template grafis favorit Anda di katalog Toko Digital terlebih dahulu.
        </p>
        <Link
          href="/toko-digital/"
          className="inline-flex px-6 py-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs shadow-soft transition-all"
        >
          Jelajahi Katalog Toko Digital →
        </Link>
      </div>
    )
  }

  const basePrice = isMultiMode
    ? cartItems.reduce((acc, it) => acc + (Number(it.price) || 0), 0)
    : (Number(singleProduct?.price) || 0)

  const finalPrice = voucher ? voucher.finalPrice : basePrice

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!name.trim()) newErrors.name = 'Nama lengkap wajib diisi.'
    if (!email.trim()) newErrors.email = 'Alamat email wajib diisi.'
    else if (!isValidEmail(email)) newErrors.email = 'Format email tidak valid.'

    // Validasi password (HANYA jika belum login)
    if (!isLoggedIn) {
      if (!password) newErrors.password = 'Password akun wajib diisi (min. 6 karakter).'
      else if (password.length < 6) newErrors.password = 'Password minimal 6 karakter.'
      else if (!isExistingAccount && password !== confirmPassword) {
        newErrors.confirmPassword = 'Konfirmasi password tidak cocok.'
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsProcessing(true)

    // ── Step 1: Daftarkan akun otomatis atau login jika belum ada (HANYA untuk Guest) ──
    if (!isLoggedIn) {
      try {
        let authResult
        if (isExistingAccount) {
          // User sudah punya akun → login
          authResult = await loginBuyerWithPassword({ email: email.trim().toLowerCase(), password })
          if (!authResult.success) {
            setErrors({ password: authResult.message || 'Password salah. Coba lagi atau reset password.' })
            setIsProcessing(false)
            return
          }
        } else {
          // User baru → daftarkan akun
          authResult = await registerBuyerAccount({ name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), password })
          if (!authResult.success) {
            // Email sudah terdaftar → pindah ke mode login
            if (authResult.message && authResult.message.toLowerCase().includes('terdaftar')) {
              setIsExistingAccount(true)
              setErrors({ password: 'Email ini sudah terdaftar. Masukkan password akun Anda untuk melanjutkan.' })
            } else {
              setErrors({ submit: authResult.message || 'Gagal membuat akun. Silakan coba lagi.' })
            }
            setIsProcessing(false)
            return
          }
        }
      } catch (authErr) {
        // Offline fallback: lanjut tanpa akun server (data tersimpan lokal)
        console.warn('[Checkout] Auth offline, lanjut sebagai guest:', authErr.message)
      }
    }

    const orderId = generateInvoiceId()

    setBuyerProfile({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim()
    })

    let newOrder;

    if (isMultiMode) {
      // Checkout Multi-item dari Keranjang Belanja (Unified Parent Order)
      newOrder = {
        orderId: orderId,
        sku: 'MULTI',
        title: `${cartItems.length} Master Desain Premium (Bundle)`,
        format: 'BUNDLE',
        price: finalPrice,
        originalPrice: cartItems.reduce((acc, it) => acc + (Number(it.originalPrice) || Number(it.price) * 2 || 0), 0),
        discountAmount: voucher ? voucher.discountAmount : 0,
        voucherCode: voucher ? voucher.code : null,
        coverImage: cartItems[0]?.coverImage || `/covers/${cartItems[0]?.sku}/${cartItems[0]?.sku}_cover.webp`,
        driveLink: '',
        customerName: name.trim(),
        customerEmail: email.trim().toLowerCase(),
        customerPhone: phone.trim(),
        paymentType: 'QRIS / Midtrans',
        status: 'pending',
        items: cartItems.map(it => ({
          sku: it.sku,
          title: it.title,
          format: it.format || 'CDR',
          price: Number(it.price) || 0,
          originalPrice: Number(it.originalPrice) || (Number(it.price) * 2),
          coverImage: it.coverImage || `/covers/${it.sku}/${it.sku}_cover.webp`,
          driveLink: it.driveLink || '#'
        })),
        createdAt: Date.now()
      }
    } else {
      // Checkout Single Product
      newOrder = {
        orderId: orderId,
        sku: singleProduct.sku,
        title: singleProduct.title,
        format: singleProduct.format || 'CDR',
        price: finalPrice,
        originalPrice: singleProduct.originalPrice || basePrice * 2,
        discountAmount: voucher ? voucher.discountAmount : 0,
        voucherCode: voucher ? voucher.code : null,
        coverImage: singleProduct.coverImage || `/covers/${singleProduct.sku}/${singleProduct.sku}_cover.webp`,
        driveLink: '',
        customerName: name.trim(),
        customerEmail: email.trim().toLowerCase(),
        customerPhone: phone.trim(),
        paymentType: 'QRIS / Midtrans',
        status: 'pending',
        items: [{
          sku: singleProduct.sku,
          title: singleProduct.title,
          format: singleProduct.format || 'CDR',
          price: finalPrice,
          originalPrice: singleProduct.originalPrice || basePrice * 2,
          coverImage: singleProduct.coverImage || `/covers/${singleProduct.sku}/${singleProduct.sku}_cover.webp`,
          driveLink: null
        }],
        createdAt: Date.now()
      }
    }

    // Simpan pesanan awal dengan status pending
    addBuyerOrder(newOrder)

    // Kirim pesanan ke backend untuk mendapatkan token Midtrans Snap
    try {
      const serverRes = await pushOrderToServer(newOrder)
      const snapToken = serverRes?.midtrans?.token
      const isSandboxMock = serverRes?.midtrans?.isSandboxMock

      if (!serverRes) {
        setErrors({ submit: 'Koneksi ke server gagal. Pastikan jaringan internet Anda aktif dan coba lagi.' })
        setIsProcessing(false)
        return
      }

      if (isMultiMode) {
        clearCart()
      }

      // Ambil redirect URL dari Midtrans untuk navigasi langsung (lebih kompatibel dari popup)
      const redirectUrl = serverRes?.midtrans?.redirect_url

      if (redirectUrl && !isSandboxMock) {
        // Simpan orderId ke localStorage sebelum redirect agar invoice bisa ambil data
        addBuyerOrder(newOrder)
        // Navigasi ke halaman pembayaran Midtrans (redirect mode - bekerja di semua domain)
        window.location.href = redirectUrl
        return
      }

      // Fallback: Jika tidak ada redirect_url, coba snap popup
      if (snapToken && !isSandboxMock && typeof window !== 'undefined') {
        const loadSnapScript = () => {
          return new Promise((resolve) => {
            const correctSnapUrl = getMidtransSnapUrl()
            const clientKey = getMidtransClientKey()

            // Pastikan snap.js dari environment yang benar (sandbox vs production)
            const existingScript = document.querySelector('script[src*="midtrans.com/snap/snap.js"]')
            const existingIsCorrectEnv = existingScript && existingScript.src === correctSnapUrl

            if (existingIsCorrectEnv && window.snap) {
              return resolve(window.snap)
            }

            // Hapus snap.js lama dari environment yang berbeda
            if (existingScript) {
              existingScript.remove()
              delete window.snap
            }

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
          snapInstance.pay(snapToken, {
            onSuccess: function() {
              updateOrderStatus(orderId, 'settlement')
              router.push(`/toko-digital/user/invoice/${orderId}`)
            },
            onPending: function() {
              router.push(`/toko-digital/user/invoice/${orderId}`)
            },
            onError: function() {
              router.push(`/toko-digital/user/invoice/${orderId}`)
            },
            onClose: function() {
              router.push(`/toko-digital/user/invoice/${orderId}`)
            }
          })
          return
        }
      }
    } catch (err) {
      console.warn('Checkout push order info:', err)
      setErrors({ submit: 'Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.' })
      setIsProcessing(false)
      return
    }

    if (isMultiMode) {
      clearCart()
    }

    setIsProcessing(false)
    router.push(`/toko-digital/user/invoice/${orderId}`)
  }

  return (
    <div className="space-y-6 font-sans">
      <Breadcrumb items={breadcrumbs} />

      <div className="mb-6 flex items-center justify-between pb-4 border-b border-neutral-200">
        <div>
          <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-neutral-950 tracking-tight">
            Konfirmasi Pesanan &amp; Pembayaran
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-sans mt-0.5">
            Akses Google Drive otomatis dikirim ke email Anda setelah pembayaran berhasil.
          </p>
        </div>
        {!isMultiMode && singleProduct && (
          <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-bold bg-neutral-900 text-white font-mono uppercase">
            SKU: {singleProduct.sku}
          </span>
        )}
        {isMultiMode && (
          <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-bold bg-neutral-900 text-white font-mono">
            {cartItems.length} ITEM KERANJANG
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.05)] space-y-6">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-sans font-bold text-base text-neutral-950 mb-1">
                1. Data Pengiriman
              </h3>
              <p className="text-xs text-neutral-400 mb-4 font-sans">
                {isLoggedIn 
                  ? 'Akses file Google Drive akan otomatis masuk ke akun terhubung Anda.' 
                  : 'Akses file akan dikirimkan ke alamat email ini.'}
              </p>

              {/* Banner Akun Aktif untuk User yang Sudah Login */}
              {isLoggedIn && (
                <div className="mb-4 p-4 rounded-2xl bg-neutral-950 text-white flex items-center justify-between border border-neutral-800 shadow-sm animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center font-bold text-sm text-emerald-400 font-display">
                      {name ? name.charAt(0).toUpperCase() : (email ? email.charAt(0).toUpperCase() : 'U')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white font-sans">{name || 'Member FokusKonten'}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 font-sans">
                          Akun Aktif
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5">{email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      clearBuyerSession()
                      setIsLoggedIn(false)
                      setName('')
                      setEmail('')
                      setPhone('')
                    }}
                    className="text-xs text-neutral-400 hover:text-white underline transition-colors cursor-pointer font-sans"
                    title="Keluar dari akun ini untuk checkout sebagai akun lain"
                  >
                    Ganti Akun
                  </button>
                </div>
              )}

              <DeliveryEmailForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                errors={errors}
                isLoggedIn={isLoggedIn}
              />
            </div>

            {/* ── Section 2: Buat Akun / Login (HANYA TAMPIL UNTUK USER YANG BELUM LOGIN) ── */}
            {!isLoggedIn && (
              <div className="pt-4 border-t border-neutral-100">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-sans font-bold text-base text-neutral-950">
                    2. {isExistingAccount ? 'Login ke Akun Anda' : 'Buat Akun'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => { setIsExistingAccount(!isExistingAccount); setErrors({}) }}
                    className="text-xs text-blue-600 hover:underline font-sans cursor-pointer"
                  >
                    {isExistingAccount ? 'Belum punya akun?' : 'Sudah punya akun?'}
                  </button>
                </div>
                <p className="text-xs text-neutral-400 mb-4 font-sans">
                  {isExistingAccount
                    ? 'Masukkan password akun FokusKonten Anda.'
                    : 'Email ini akan jadi akun login permanen. Produk tersimpan aman di dashboard Anda.'}
                </p>

                <div className="space-y-3">
                  {/* Password */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5 font-sans uppercase tracking-wide">
                      PASSWORD <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Min. 6 karakter"
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-sans bg-white pr-12 transition-colors ${
                          errors.password ? 'border-red-400 bg-red-50' : 'border-neutral-200 focus:border-neutral-900'
                        } outline-none`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs font-sans cursor-pointer"
                      >
                        {showPassword ? 'Sembunyikan' : 'Tampilkan'}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500 mt-1 font-sans">{errors.password}</p>}
                  </div>

                  {/* Konfirmasi Password — hanya untuk akun baru */}
                  {!isExistingAccount && (
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5 font-sans uppercase tracking-wide">
                        KONFIRMASI PASSWORD <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Ulangi password di atas"
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-sans bg-white transition-colors ${
                          errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-neutral-200 focus:border-neutral-900'
                        } outline-none`}
                      />
                      {errors.confirmPassword && <p className="text-xs text-red-500 mt-1 font-sans">{errors.confirmPassword}</p>}
                    </div>
                  )}

                  {/* Info box */}
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <span className="text-blue-500 mt-0.5">🔒</span>
                    <p className="text-xs text-blue-700 font-sans leading-relaxed">
                      {isExistingAccount
                        ? 'Produk baru akan langsung masuk ke koleksi akun Anda.'
                        : 'Akun dibuat otomatis. Login kapan saja di /akun/ untuk akses semua produk Anda.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-neutral-100">
              <h3 className="font-sans font-bold text-base text-neutral-950 mb-1">
                {isLoggedIn ? '2. Kode Promo' : '3. Kode Promo'}
              </h3>
              <p className="text-xs text-neutral-400 mb-3 font-sans">
                Masukkan kode promo jika ada.
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
            <h3 className="font-sans font-bold text-base text-neutral-950">
              Ringkasan Pembayaran
            </h3>

            <OrderSummary
              product={singleProduct}
              items={isMultiMode ? cartItems : []}
              voucher={voucher}
              finalPrice={finalPrice}
            />

            {/* Duplicate Notice */}
            {duplicateInfo?.alreadyPurchased && (
              <div className={`p-4 rounded-2xl border text-xs space-y-2.5 animate-fade-in font-sans ${
                duplicateInfo.isAllOwned 
                  ? 'bg-neutral-100 border-neutral-200 text-neutral-900' 
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm text-neutral-950">
                  <span>{duplicateInfo.isAllOwned ? '✓' : '⚠️'}</span>
                  <span>{duplicateInfo.isAllOwned ? 'Desain Sudah Dimiliki!' : 'Sebagian Produk Sudah Ada di Koleksi'}</span>
                </div>
                <p className="text-neutral-600 leading-relaxed font-sans">
                  {duplicateInfo.message || (email ? `Email ${email} sudah tercatat memiliki produk ini.` : 'Produk ini sudah ada di koleksi perangkat Anda.')}
                </p>

                {duplicateInfo.isMulti && !duplicateInfo.isAllOwned && (
                  <div className="pt-1 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={handleRemoveOwnedFromCart}
                      className="w-full text-center py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-black text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      Hapus Produk yang Sudah Dimiliki ({duplicateInfo.ownedItems?.length || 0} Item)
                    </button>
                  </div>
                )}

                {duplicateInfo.isAllOwned && (
                  <div className="pt-2 flex flex-col gap-2">
                    <Link
                      href="/akun/"
                      className="w-full text-center py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-black text-white font-bold text-xs transition-colors"
                    >
                      Lihat di Akun Saya →
                    </Link>
                    {duplicateInfo.driveLink && (
                      <a
                        href={duplicateInfo.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center py-2 px-4 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
                        </svg>
                        <span>Buka Google Drive</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}

            {duplicateInfo?.isAllOwned ? (
              <Link
                href="/akun/"
                className="w-full py-4 px-6 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-sans font-extrabold text-sm sm:text-base shadow-lg shadow-black/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buka Koleksi Saya →</span>
              </Link>
            ) : isOffline ? (
              <div className="space-y-2">
                <div className="w-full py-4 px-6 rounded-2xl bg-neutral-200 text-neutral-500 font-sans font-extrabold text-sm sm:text-base border border-neutral-300 flex items-center justify-center gap-2 cursor-not-allowed select-none">
                  <svg className="w-4 h-4 shrink-0 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{ctaText}</span>
                </div>
                <p className="text-[11px] text-neutral-600 bg-neutral-100 border border-neutral-200 rounded-xl p-2.5 text-center font-sans">
                  Server transaksi sedang offline. Anda dapat menghubungi admin melalui menu <strong>Hubungi</strong> di navigasi atas.
                </p>
              </div>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-black hover:bg-neutral-800 active:scale-[0.99] text-white font-sans font-extrabold text-sm sm:text-base shadow-lg shadow-black/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Memproses Pembayaran...</span>
                ) : (
                  <>
                    <span>Bayar Sekarang</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            )}

            {/* Error koneksi server */}
            {errors.submit && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium text-center font-sans">
                ⚠️ {errors.submit}
              </div>
            )}

            <div className="text-center text-[11px] text-neutral-400 font-sans">
              Transaksi aman dan terverifikasi otomatis.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-neutral-50/60 pb-20 pt-24 sm:pt-28 font-sans">
      <div className="container-page max-w-5xl">
        <Suspense fallback={<div className="py-20 text-center text-sm text-neutral-400 font-sans">Memuat checkout...</div>}>
          <CheckoutContent />
        </Suspense>
      </div>
    </div>
  )
}
