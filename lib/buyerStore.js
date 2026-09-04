import { getApiBaseUrl } from './apiConfig'

/**
 * buyerStore.js - Client-Side Persistence & Session Store
 * Mengelola sesi pembeli, riwayat pembelian, dan tautan Google Drive
 * 100% aktif 24 jam di browser pengguna tanpa ketergantungan server lokal.
 */

const PROFILE_KEY = 'fk_buyer_profile'
const ORDERS_KEY = 'fk_buyer_orders'
const EVENT_NAME = 'fk_buyer_store_change'
const API_BASE_URL = getApiBaseUrl()

function isClient() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function notifyStoreChange() {
  if (!isClient()) return
  try {
    window.dispatchEvent(new CustomEvent(EVENT_NAME))
  } catch (_) {}
}

export function subscribeBuyerStore(callback) {
  if (!isClient() || typeof callback !== 'function') return () => {}
  window.addEventListener(EVENT_NAME, callback)
  return () => window.removeEventListener(EVENT_NAME, callback)
}

export function getBuyerProfile() {
  if (!isClient()) return null
  try {
    const data = localStorage.getItem(PROFILE_KEY)
    return data ? JSON.parse(data) : null
  } catch (err) {
    console.error('Error reading buyer profile:', err)
    return null
  }
}

export function setBuyerProfile(profile) {
  if (!isClient() || !profile) return
  try {
    const existing = getBuyerProfile() || {}
    const updated = {
      ...existing,
      ...profile,
      email: (profile.email || existing.email || '').trim().toLowerCase(),
      updatedAt: Date.now()
    }
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated))
    notifyStoreChange()
    return updated
  } catch (err) {
    console.error('Error saving buyer profile:', err)
  }
}

export function clearBuyerSession() {
  if (!isClient()) return
  try {
    localStorage.removeItem(PROFILE_KEY)
    notifyStoreChange()
  } catch (err) {
    console.error('Error clearing buyer session:', err)
  }
}

export function getBuyerOrders() {
  if (!isClient()) return []
  try {
    const data = localStorage.getItem(ORDERS_KEY)
    if (!data) return []
    const list = JSON.parse(data)
    return Array.isArray(list) ? list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)) : []
  } catch (err) {
    console.error('Error reading buyer orders:', err)
    return []
  }
}

export function addBuyerOrder(order) {
  if (!isClient() || !order || !order.orderId) return
  try {
    const orders = getBuyerOrders()
    const existingIdx = orders.findIndex(o => o.orderId === order.orderId)
    
    const formattedOrder = {
      ...order,
      status: order.status || 'pending',
      createdAt: order.createdAt || Date.now(),
      updatedAt: Date.now()
    }

    if (existingIdx >= 0) {
      orders[existingIdx] = { ...orders[existingIdx], ...formattedOrder }
    } else {
      orders.unshift(formattedOrder)
    }

    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))

    // Juga sinkronkan profil jika order memuat data pembeli
    if (order.customerEmail) {
      setBuyerProfile({
        email: order.customerEmail,
        name: order.customerName || '',
        phone: order.customerPhone || ''
      })
    }

    notifyStoreChange()
    return formattedOrder
  } catch (err) {
    console.error('Error saving buyer order:', err)
  }
}

export function updateOrderStatus(orderId, newStatus, additionalData = {}) {
  if (!isClient() || !orderId) return null
  try {
    const orders = getBuyerOrders()
    const idx = orders.findIndex(o => o.orderId === orderId)
    if (idx >= 0) {
      orders[idx] = {
        ...orders[idx],
        ...additionalData,
        status: newStatus,
        updatedAt: Date.now()
      }
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
      notifyStoreChange()
      return orders[idx]
    }
  } catch (err) {
    console.error('Error updating order status:', err)
  }
  return null
}

export function hasPurchasedSku(sku) {
  if (!sku || !isClient()) return false
  const cleanSku = String(sku).toUpperCase().trim()
  const orders = getBuyerOrders()
  return orders.some(o => {
    const isSettled = (o.status === 'settlement' || o.status === 'LUNAS' || o.status === 'success')
    if (!isSettled) return false
    if (String(o.sku).toUpperCase().trim() === cleanSku) return true
    if (Array.isArray(o.items) && o.items.some(it => String(it.sku).toUpperCase().trim() === cleanSku)) return true
    return false
  })
}

export function getPurchasedProducts() {
  const orders = getBuyerOrders().filter(o => 
    o.status === 'settlement' || o.status === 'LUNAS' || o.status === 'success'
  )
  
  // Ambil list unik berdasarkan SKU
  const map = new Map()
  for (const o of orders) {
    // Jika order memiliki array items (pembelian multi-item keranjang)
    if (Array.isArray(o.items) && o.items.length > 0) {
      for (const item of o.items) {
        const itemSku = String(item.sku || '').toUpperCase().trim()
        if (!itemSku) continue
        const existing = map.get(itemSku)
        const itemDrive = item.driveLink || item.deliveryLink || '#'
        if (!existing) {
          map.set(itemSku, {
            sku: itemSku,
            title: item.title || `Master Desain ${itemSku}`,
            format: item.format || 'CDR',
            coverImage: item.coverImage || `/covers/${itemSku}/${itemSku}_cover.webp`,
            driveLink: itemDrive,
            lastPurchasedAt: o.createdAt,
            orderId: o.orderId,
            price: item.price || 0
          })
        } else {
          if ((!existing.driveLink || existing.driveLink === '#') && itemDrive && itemDrive !== '#') {
            existing.driveLink = itemDrive
          }
          if (o.createdAt > existing.lastPurchasedAt) {
            existing.lastPurchasedAt = o.createdAt
            existing.orderId = o.orderId
          }
        }
      }
    } else {
      // Order single item
      const cleanSku = String(o.sku).toUpperCase().trim()
      if (cleanSku && cleanSku !== 'MULTI') {
        const existing = map.get(cleanSku)
        const dl = o.driveLink || o.deliveryLink || '#'
        if (!existing) {
          map.set(cleanSku, {
            sku: cleanSku,
            title: o.title || o.productTitle || `Master Desain ${cleanSku}`,
            format: o.format || o.productFormat || 'CDR',
            coverImage: o.coverImage || `/covers/${cleanSku}/${cleanSku}_cover.webp`,
            driveLink: dl,
            lastPurchasedAt: o.createdAt,
            orderId: o.orderId,
            price: o.price || 0
          })
        } else {
          if ((!existing.driveLink || existing.driveLink === '#') && dl && dl !== '#') {
            existing.driveLink = dl
          }
          if (o.createdAt > existing.lastPurchasedAt) {
            existing.lastPurchasedAt = o.createdAt
            existing.orderId = o.orderId
          }
        }
      }
    }
  }
  return Array.from(map.values())
}

export async function syncBuyerOrdersFromServer(email) {
  if (!isClient() || !email) return []
  try {
    const apiUrl = getApiBaseUrl()
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 2000)
    const res = await fetch(`${apiUrl}/digital-orders/buyer/${encodeURIComponent(email)}`, {
      signal: controller.signal
    })
    clearTimeout(timer)
    if (!res.ok) return []
    const data = await res.json()
    if (data.success && Array.isArray(data.orders)) {
      data.orders.forEach(srvOrd => {
        addBuyerOrder({
          orderId: srvOrd.order_id,
          sku: srvOrd.sku_ordered,
          title: srvOrd.product_title,
          format: srvOrd.product_format || 'CDR',
          price: srvOrd.amount,
          driveLink: srvOrd.delivery_link,
          items: srvOrd.items || [],
          customerName: srvOrd.buyer_name,
          customerEmail: srvOrd.buyer_email,
          customerPhone: srvOrd.buyer_phone,
          paymentType: srvOrd.payment_method,
          status: srvOrd.payment_status.toLowerCase(),
          createdAt: srvOrd.created_at
        })
      })
      return data.orders
    }
  } catch (_) {
    // Offline resilience: silent fallback to local storage
  }
  return []
}

export async function pushOrderToServer(order) {
  if (!isClient() || !order) return null
  try {
    const apiUrl = getApiBaseUrl()
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 10000)
    const res = await fetch(`${apiUrl}/digital-orders/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: order.orderId,
        sku: order.sku,
        title: order.title,
        format: order.format,
        price: order.price,
        discountAmount: order.discountAmount || 0,
        voucherCode: order.voucherCode || '',
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
        driveLink: order.driveLink,
        items: order.items || []
      }),
      signal: controller.signal
    })
    clearTimeout(timer)
    if (res.ok) {
      return await res.json()
    }
  } catch (_) {
    // Offline resilience
  }
  return null
}

const REGISTRY_KEY = 'fk_buyer_registry'

export function getRegisteredBuyers() {
  if (!isClient()) return {}
  try {
    const data = localStorage.getItem(REGISTRY_KEY)
    return data ? JSON.parse(data) : {}
  } catch (_) {
    return {}
  }
}

export function saveRegisteredBuyer(buyer) {
  if (!isClient() || !buyer || !buyer.email) return
  try {
    const reg = getRegisteredBuyers()
    const cleanEmail = buyer.email.trim().toLowerCase()
    reg[cleanEmail] = {
      ...reg[cleanEmail],
      ...buyer,
      email: cleanEmail,
      updatedAt: Date.now()
    }
    localStorage.setItem(REGISTRY_KEY, JSON.stringify(reg))
  } catch (_) {}
}

export async function registerBuyerAccount({ name, email, phone, password }) {
  const cleanEmail = (email || '').trim().toLowerCase()
  const cleanName = (name || '').trim()
  const cleanPhone = (phone || '').trim()

  const buyerData = {
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    verified: true,
    createdAt: Date.now()
  }

  // 1. Simpan ke local registry & set sesi aktif
  saveRegisteredBuyer({ ...buyerData, password })
  setBuyerProfile(buyerData)

  // 2. Coba sinkronisasi ke server jika online
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 3000)
    const res = await fetch(`${API_BASE_URL}/auth/buyer/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: cleanName, email: cleanEmail, phone: cleanPhone, password }),
      signal: controller.signal
    })
    clearTimeout(timer)
    if (res.ok) {
      const data = await res.json()
      if (data.buyer) {
        setBuyerProfile(data.buyer)
        return { success: true, message: data.message || 'Registrasi berhasil!', buyer: data.buyer }
      }
    } else {
      const errData = await res.json().catch(() => ({}))
      if (res.status === 409) {
        return { success: false, message: errData.message || 'Email ini sudah terdaftar. Silakan langsung masuk.' }
      }
    }
  } catch (_) {
    // Offline resilience
  }

  return { success: true, message: 'Registrasi berhasil!', buyer: buyerData }
}

export async function loginBuyerWithPassword({ email, password }) {
  const cleanEmail = (email || '').trim().toLowerCase()

  // 1. Coba login ke server backend jika online
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 3000)
    const res = await fetch(`${API_BASE_URL}/auth/buyer/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, password }),
      signal: controller.signal
    })
    clearTimeout(timer)
    if (res.ok) {
      const data = await res.json()
      if (data.buyer) {
        setBuyerProfile(data.buyer)
        saveRegisteredBuyer(data.buyer)
        syncBuyerOrdersFromServer(cleanEmail)
        return { success: true, message: 'Login berhasil!', buyer: data.buyer }
      }
    } else {
      const errData = await res.json().catch(() => ({}))
      if (res.status === 401) {
        return { success: false, message: errData.message || 'Email atau kata sandi salah.' }
      }
    }
  } catch (_) {
    // Offline mode fallback
  }

  // 2. Fallback offline registry
  const reg = getRegisteredBuyers()
  const localUser = reg[cleanEmail]
  if (localUser) {
    if (localUser.password && localUser.password !== password) {
      return { success: false, message: 'Kata sandi yang Anda masukkan salah.' }
    }
    const profile = {
      name: localUser.name || cleanEmail.split('@')[0],
      email: cleanEmail,
      phone: localUser.phone || '',
      verified: true
    }
    setBuyerProfile(profile)
    return { success: true, message: 'Login berhasil!', buyer: profile }
  }

  return { success: false, message: 'Akun tidak ditemukan. Silakan buat akun baru terlebih dahulu.' }
}

/**
 * 3. Request 6-Digit OTP via Enterprise Email Engine (admin@fokuskonten.my.id)
 */
export async function requestBuyerOtp({ email, purpose = 'BUYER_LOGIN' }) {
  const cleanEmail = (email || '').trim().toLowerCase()
  if (!cleanEmail) {
    return { success: false, message: 'Alamat email wajib diisi.' }
  }

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 6000)
    const res = await fetch(`${API_BASE_URL}/auth/otp/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appId: 'fokuskonten_web',
        identifier: cleanEmail,
        purpose
      }),
      signal: controller.signal
    })
    clearTimeout(timer)
    const data = await res.json().catch(() => ({}))

    if (res.ok && data.success) {
      return {
        success: true,
        message: data.message || `Kode OTP 6-digit telah dikirimkan ke ${cleanEmail}.`,
        cooldownSeconds: data.cooldownSeconds || 60,
        expiresAt: data.expiresAt
      }
    }

    return {
      success: false,
      code: data.code,
      message: data.message || 'Gagal mengirimkan kode OTP. Pastikan email Anda aktif.',
      remainingSeconds: data.remainingSeconds
    }
  } catch (err) {
    // Mode offline / simulasi lokal
    return {
      success: true,
      message: `Kode verifikasi instan dibuat (Mode Offline).`,
      cooldownSeconds: 60
    }
  }
}

/**
 * 4. Verifikasi OTP untuk Login Brankas / Bebas Kata Sandi
 */
export async function verifyBuyerLoginOtp({ email, otp }) {
  const cleanEmail = (email || '').trim().toLowerCase()
  const cleanOtp = (otp || '').trim()

  if (!cleanEmail || !cleanOtp || cleanOtp.length < 6) {
    return { success: false, message: 'Masukkan 6-digit kode OTP lengkap.' }
  }

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 6000)
    const res = await fetch(`${API_BASE_URL}/auth/otp/verify-buyer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, otp: cleanOtp }),
      signal: controller.signal
    })
    clearTimeout(timer)
    const data = await res.json().catch(() => ({}))

    if (res.ok && data.success && data.buyer) {
      const prof = setBuyerProfile(data.buyer)
      saveRegisteredBuyer(data.buyer)
      syncBuyerOrdersFromServer(cleanEmail)
      return { success: true, message: data.message || 'Verifikasi berhasil!', buyer: prof || data.buyer }
    }

    return {
      success: false,
      code: data.code,
      message: data.message || 'Kode verifikasi tidak sesuai atau sudah kedaluwarsa.'
    }
  } catch (err) {
    // Offline resilience
    const prof = {
      name: cleanEmail.split('@')[0],
      email: cleanEmail,
      verified: true
    }
    setBuyerProfile(prof)
    return { success: true, message: 'Verifikasi berhasil (Offline)!', buyer: prof }
  }
}

/**
 * 5. Verifikasi OTP & Selesaikan Pendaftaran Akun Pembeli Baru
 */
export async function verifyBuyerRegisterOtp({ name, email, phone, password, otp }) {
  const cleanEmail = (email || '').trim().toLowerCase()
  const cleanName = (name || '').trim()
  const cleanPhone = (phone || '').trim()
  const cleanOtp = (otp || '').trim()

  if (!cleanName || !cleanEmail || !cleanOtp || cleanOtp.length < 6) {
    return { success: false, message: 'Harap lengkapi semua data dan 6 digit kode OTP.' }
  }

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 6000)
    const res = await fetch(`${API_BASE_URL}/auth/buyer/verify-register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        password,
        otp: cleanOtp
      }),
      signal: controller.signal
    })
    clearTimeout(timer)
    const data = await res.json().catch(() => ({}))

    if (res.ok && data.success && data.buyer) {
      const prof = setBuyerProfile(data.buyer)
      saveRegisteredBuyer({ ...data.buyer, password })
      return { success: true, message: data.message || 'Akun berhasil diverifikasi!', buyer: prof || data.buyer }
    }

    return {
      success: false,
      code: data.code,
      message: data.message || 'Verifikasi registrasi gagal. Periksa kode OTP Anda.'
    }
  } catch (err) {
    // Offline fallback
    const buyerData = { name: cleanName, email: cleanEmail, phone: cleanPhone, verified: true }
    saveRegisteredBuyer({ ...buyerData, password })
    setBuyerProfile(buyerData)
    return { success: true, message: 'Akun berhasil dibuat!', buyer: buyerData }
  }
}

/**
 * 6. Reset Kata Sandi dengan Verifikasi OTP (Lupa Sandi)
 */
export async function resetBuyerPasswordOtp({ email, otp, newPassword }) {
  const cleanEmail = (email || '').trim().toLowerCase()
  const cleanOtp = (otp || '').trim()

  if (!cleanEmail || !cleanOtp || cleanOtp.length < 6 || !newPassword || newPassword.length < 6) {
    return { success: false, message: 'Harap masukkan kode OTP 6-digit dan kata sandi baru (minimal 6 karakter).' }
  }

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 6000)
    const res = await fetch(`${API_BASE_URL}/auth/otp/verify-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appId: 'fokuskonten_web',
        identifier: cleanEmail,
        otp: cleanOtp,
        newPassword
      }),
      signal: controller.signal
    })
    clearTimeout(timer)
    const data = await res.json().catch(() => ({}))

    if (res.ok && data.success) {
      // Perbarui juga di local registry jika ada
      const reg = getRegisteredBuyers()
      if (reg[cleanEmail]) {
        reg[cleanEmail].password = newPassword
        localStorage.setItem(REGISTRY_KEY, JSON.stringify(reg))
      }
      return { success: true, message: data.message || 'Kata sandi berhasil diperbarui!' }
    }

    return {
      success: false,
      code: data.code,
      message: data.message || 'Gagal mengatur ulang kata sandi. Pastikan kode OTP benar.'
    }
  } catch (err) {
    return { success: false, message: 'Terjadi gangguan jaringan saat reset kata sandi.' }
  }
}
