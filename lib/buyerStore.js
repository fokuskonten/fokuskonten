/**
 * buyerStore.js - Client-Side Persistence & Session Store
 * Mengelola sesi pembeli, riwayat pembelian, dan tautan Google Drive
 * 100% aktif 24 jam di browser pengguna tanpa ketergantungan server lokal.
 */

const PROFILE_KEY = 'fk_buyer_profile'
const ORDERS_KEY = 'fk_buyer_orders'
const EVENT_NAME = 'fk_buyer_store_change'

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
      status: order.status || 'settlement',
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

export function hasPurchasedSku(sku) {
  if (!sku || !isClient()) return false
  const cleanSku = String(sku).toUpperCase().trim()
  const orders = getBuyerOrders()
  return orders.some(o => 
    String(o.sku).toUpperCase().trim() === cleanSku && 
    (o.status === 'settlement' || o.status === 'LUNAS' || o.status === 'success')
  )
}

export function getPurchasedProducts() {
  const orders = getBuyerOrders().filter(o => 
    o.status === 'settlement' || o.status === 'LUNAS' || o.status === 'success'
  )
  
  // Ambil list unik berdasarkan SKU
  const map = new Map()
  for (const o of orders) {
    const cleanSku = String(o.sku).toUpperCase().trim()
    if (!map.has(cleanSku)) {
      map.set(cleanSku, {
        sku: cleanSku,
        title: o.title || o.productTitle || `Master Desain ${cleanSku}`,
        format: o.format || o.productFormat || 'CDR',
        coverImage: o.coverImage || `/covers/${cleanSku}/${cleanSku}_cover.webp`,
        driveLink: o.driveLink || '#',
        lastPurchasedAt: o.createdAt,
        orderId: o.orderId,
        price: o.price || 0
      })
    }
  }
  return Array.from(map.values())
}

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:8090/api/v1'
  : 'https://server.fokuskonten.my.id/api/v1'

export async function syncBuyerOrdersFromServer(email) {
  if (!isClient() || !email) return []
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 2000)
    const res = await fetch(`${API_BASE_URL}/digital-orders/buyer/${encodeURIComponent(email)}`, {
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
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 2500)
    const res = await fetch(`${API_BASE_URL}/digital-orders/create`, {
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
        driveLink: order.driveLink
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
