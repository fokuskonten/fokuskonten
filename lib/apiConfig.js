/**
 * apiConfig.js — Central API Configuration Helper for FokusKonten Web
 * Otomatis mendeteksi environment lokal (localhost / 127.0.0.1:8090) vs server live.
 */

export function getApiBaseUrl() {
  if (typeof window === 'undefined') {
    return 'http://localhost:8090/api/v1'
  }

  const hostname = window.location.hostname
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')

  if (isLocal) {
    return 'http://localhost:8090/api/v1'
  }

  // Jika web dibuka di domain resmi ofisial, gunakan relative path /api/v1
  // sehingga komunikasi selalu SAME-ORIGIN, instan, bebas dari blokir CORS/CORP browser
  if (hostname.includes('fokuskonten.my.id') || hostname.includes('fokuskonte.my.id')) {
    return '/api/v1'
  }

  return 'https://api.fokuskonten.my.id/api/v1'
}

export function getMidtransClientKey() {
  return process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-eDuQvBRQowEHksi3'
}

export function isMidtransProduction() {
  const key = getMidtransClientKey()
  return (
    process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true' ||
    (Boolean(key) && !key.startsWith('SB-'))
  )
}

export function getMidtransSnapUrl() {
  return isMidtransProduction()
    ? 'https://app.midtrans.com/snap/snap.js'
    : 'https://app.sandbox.midtrans.com/snap/snap.js'
}
