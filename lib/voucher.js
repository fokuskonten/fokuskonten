/**
 * voucher.js - Mesin Kupon Promo & Kalkulasi Diskon Toko Digital FokusKonten
 */

const VOUCHER_DATABASE = {
  'FOKUSHEMAT': {
    type: 'percent',
    value: 15,
    description: 'Diskon Spesial 15% untuk Master Desain',
    minPurchase: 0
  },
  'DISKON10': {
    type: 'percent',
    value: 10,
    description: 'Diskon 10% Semua Format Master',
    minPurchase: 0
  },
  'DISKON20': {
    type: 'percent',
    value: 20,
    description: 'Diskon Eksklusif 20%',
    minPurchase: 30000
  },
  'MEMBERPRO': {
    type: 'fixed',
    value: 10000,
    description: 'Potongan Langsung Rp 10.000',
    minPurchase: 25000
  },
  'PROMO50': {
    type: 'percent',
    value: 50,
    description: 'Flash Sale Diskon 50%',
    minPurchase: 50000
  }
}

export function validateVoucher(code, currentPrice) {
  if (!code || typeof code !== 'string') {
    return { valid: false, message: 'Masukkan kode kupon voucher.' }
  }

  const cleanCode = code.trim().toUpperCase()
  const voucher = VOUCHER_DATABASE[cleanCode]

  if (!voucher) {
    return { valid: false, message: `Kode voucher "${cleanCode}" tidak ditemukan atau sudah kedaluwarsa.` }
  }

  const price = Number(currentPrice) || 0
  if (voucher.minPurchase && price < voucher.minPurchase) {
    return { 
      valid: false, 
      message: `Voucher ini memerlukan minimal pembelian Rp ${voucher.minPurchase.toLocaleString('id-ID')}.` 
    }
  }

  let discountAmount = 0
  if (voucher.type === 'percent') {
    discountAmount = Math.round((price * voucher.value) / 100)
  } else if (voucher.type === 'fixed') {
    discountAmount = Math.min(price, voucher.value)
  }

  const finalPrice = Math.max(0, price - discountAmount)

  return {
    valid: true,
    code: cleanCode,
    type: voucher.type,
    value: voucher.value,
    discountAmount,
    finalPrice,
    description: voucher.description,
    message: `Voucher "${cleanCode}" berhasil diterapkan! Hemat Rp ${discountAmount.toLocaleString('id-ID')}.`
  }
}

export function getAvailableVouchers() {
  return Object.entries(VOUCHER_DATABASE).map(([code, v]) => ({
    code,
    ...v
  }))
}
