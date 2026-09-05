/**
 * formatters.js - FokusKonten Storefront Formatter Utilities
 * Mendukung format mata uang Rupiah, tanggal lokal Indonesia, dan standarisasi invoice.
 */

export function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(num || 0)
}

export function formatDate(timestamp) {
  if (!timestamp) return '-'
  const date = new Date(timestamp)
  if (isNaN(date.getTime())) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatDateTime(timestamp) {
  if (!timestamp) return '-'
  const date = new Date(timestamp)
  if (isNaN(date.getTime())) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date) + ' WIB'
}

export function generateInvoiceId() {
  const now = new Date()
  const y = String(now.getFullYear()).slice(-2)
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `FK-${y}${m}${d}-${rand}`
}

/**
 * Format string teknis gateway pembayaran (Midtrans) menjadi nama resmi profesional
 * Contoh:
 * - 'ECHANNEL' / 'echannel' -> 'Mandiri Bill Payment'
 * - 'MIDTRANS_QRIS' / 'qris' -> 'QRIS'
 * - 'bank_transfer' -> 'Virtual Account'
 */
export function formatPaymentMethod(type) {
  if (!type) return 'QRIS / VA'
  const raw = String(type).trim().toLowerCase()

  if (raw === 'echannel' || raw.includes('echannel') || raw.includes('mandiri')) {
    return 'Mandiri Bill Payment'
  }
  if (raw.includes('qris')) {
    return 'QRIS'
  }
  if (raw.includes('bca')) {
    return 'BCA Virtual Account'
  }
  if (raw.includes('bni')) {
    return 'BNI Virtual Account'
  }
  if (raw.includes('bri')) {
    return 'BRI Virtual Account'
  }
  if (raw.includes('permata')) {
    return 'Permata Virtual Account'
  }
  if (raw.includes('cimb')) {
    return 'CIMB Niaga VA'
  }
  if (raw === 'bank_transfer' || raw.includes('bank_transfer') || raw.includes('va')) {
    return 'Virtual Account'
  }
  if (raw.includes('gopay')) {
    return 'GoPay'
  }
  if (raw.includes('shopee') || raw.includes('shopeepay')) {
    return 'ShopeePay'
  }
  if (raw.includes('cstore') || raw.includes('indomaret') || raw.includes('alfamart')) {
    return 'Indomaret / Alfamart'
  }
  if (raw.includes('credit_card') || raw.includes('card')) {
    return 'Kartu Kredit / Debit'
  }
  if (raw.includes('manual') || raw.includes('transfer')) {
    return 'Transfer Bank'
  }

  return raw
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}
