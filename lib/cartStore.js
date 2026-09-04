// ══════════════════════════════════════════════════════════════════════════════
// cartStore.js — Reactive Cart Store untuk Toko Digital Fokus Konten
// Model: Creative Market / Creative Fabrica (Multi-item Digital Assets)
// ══════════════════════════════════════════════════════════════════════════════
'use client'

const CART_KEY = 'fk_buyer_cart'
const listeners = new Set()

function isClient() {
  return typeof window !== 'undefined'
}

function notifyCartChange() {
  if (!isClient()) return
  const current = getCartItems()
  listeners.forEach(cb => {
    try {
      cb(current)
    } catch (e) {
      console.error('[CartStore] Listener error:', e)
    }
  })
}

/**
 * 1. Ambil seluruh item keranjang belanja dari localStorage
 */
export function getCartItems() {
  if (!isClient()) return []
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.error('[CartStore] Gagal parse cart items:', err)
    return []
  }
}

/**
 * 2. Cek apakah SKU tertentu sudah ada di keranjang
 */
export function hasInCart(sku) {
  if (!sku || !isClient()) return false
  const cleanSku = String(sku).toUpperCase().trim()
  const items = getCartItems()
  return items.some(item => String(item.sku).toUpperCase().trim() === cleanSku)
}

/**
 * 3. Tambah produk ke keranjang belanja
 * Mencegah duplikasi SKU produk digital
 */
export function addToCart(product) {
  if (!product || !product.sku || !isClient()) return { success: false, reason: 'invalid_product' }

  const cleanSku = String(product.sku).toUpperCase().trim()
  const items = getCartItems()

  // Jika sudah ada di keranjang, tidak perlu diduplikasi
  if (items.some(it => String(it.sku).toUpperCase().trim() === cleanSku)) {
    return { success: false, reason: 'already_in_cart', items }
  }

  const newItem = {
    sku: cleanSku,
    title: product.title || `Master Desain ${cleanSku}`,
    price: Number(product.price) || 0,
    originalPrice: Number(product.originalPrice) || (Number(product.price) * 2),
    format: (product.format || 'CDR').toUpperCase(),
    coverImage: product.coverImage || `/covers/${cleanSku}/${cleanSku}_cover.webp`,
    category: product.category || 'Graphic Design',
    addedAt: Date.now()
  }

  const updated = [newItem, ...items]
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(updated))
    notifyCartChange()
    return { success: true, item: newItem, items: updated }
  } catch (err) {
    console.error('[CartStore] Gagal menyimpan ke cart:', err)
    return { success: false, reason: 'storage_error' }
  }
}

/**
 * 4. Hapus satu item dari keranjang berdasarkan SKU
 */
export function removeFromCart(sku) {
  if (!sku || !isClient()) return []
  const cleanSku = String(sku).toUpperCase().trim()
  const items = getCartItems()
  const filtered = items.filter(it => String(it.sku).toUpperCase().trim() !== cleanSku)

  try {
    localStorage.setItem(CART_KEY, JSON.stringify(filtered))
    notifyCartChange()
    return filtered
  } catch (err) {
    console.error('[CartStore] Gagal update cart:', err)
    return items
  }
}

/**
 * 5. Kosongkan seluruh isi keranjang belanja
 */
export function clearCart() {
  if (!isClient()) return
  try {
    localStorage.removeItem(CART_KEY)
    notifyCartChange()
  } catch (err) {
    console.error('[CartStore] Gagal mengosongkan cart:', err)
  }
}

/**
 * 6. Dapatkan kalkulasi total harga & jumlah item
 */
export function getCartSummary() {
  const items = getCartItems()
  const totalItems = items.length
  const subtotal = items.reduce((acc, it) => acc + (Number(it.price) || 0), 0)
  const totalOriginal = items.reduce((acc, it) => acc + (Number(it.originalPrice) || 0), 0)
  const totalSavings = Math.max(0, totalOriginal - subtotal)

  return {
    items,
    totalItems,
    subtotal,
    totalOriginal,
    totalSavings
  }
}

/**
 * 7. Subscribe ke perubahan cart secara realtime
 */
export function subscribeCartStore(callback) {
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}
