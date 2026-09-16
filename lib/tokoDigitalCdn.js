/**
 * tokoDigitalCdn.js
 * Multi-Tier CDN Resolver untuk Aset Visual Toko Digital (Cover & Slide Mockup)
 * 
 * Sesuai Standar:
 * Tier 1: jsDelivr Edge CDN (Global Cache, Ultra Fast)
 * Tier 2: GitHub Raw sekoci (High Availability Fallback)
 * Tier 3: Fallback lokal /covers/ (jika tersedia)
 */

export const CDN_CONFIG = {
  tier1: 'https://cdn.jsdelivr.net/gh/mcjobs-id/fokuskonten-assets@main/toko-digital',
  tier2: 'https://raw.githubusercontent.com/mcjobs-id/fokuskonten-assets/main/toko-digital',
  tier3: '/covers'
}

/**
 * Mengurai path gambar menjadi { sku, filename }
 */
export function parseImageSrc(src, defaultSku = '') {
  if (!src && !defaultSku) return { sku: '', filename: '' }
  
  const cleanSrc = (src || '').trim()
  const cleanDefaultSku = (defaultSku || '').trim().toUpperCase()

  // Jika berupa path URL lokal: /covers/[SKU]/[filename]
  if (cleanSrc.startsWith('/covers/')) {
    const parts = cleanSrc.replace(/^\/covers\//, '').split('/')
    if (parts.length >= 2) {
      return { sku: parts[0].toUpperCase(), filename: parts.slice(1).join('/') }
    }
    if (parts.length === 1) {
      return { sku: cleanDefaultSku || parts[0].toUpperCase(), filename: parts[0] }
    }
  }

  // Jika sudah berupa CDN URL toko-digital
  if (cleanSrc.includes('/toko-digital/')) {
    const match = cleanSrc.match(/\/toko-digital\/([^/]+)\/(.+)$/)
    if (match) {
      return { sku: match[1].toUpperCase(), filename: match[2] }
    }
  }

  // Jika hanya nama file (misal ID010425_cover.webp)
  if (cleanSrc && !cleanSrc.startsWith('http') && !cleanSrc.startsWith('/')) {
    const inferredSku = cleanDefaultSku || cleanSrc.split('_')[0].toUpperCase()
    return { sku: inferredSku, filename: cleanSrc }
  }

  return {
    sku: cleanDefaultSku,
    filename: cleanDefaultSku ? `${cleanDefaultSku}_cover.webp` : ''
  }
}

/**
 * Menghasilkan array Multi-Tier CDN fallback URLs untuk suatu gambar
 * Index 0: Tier 1 (jsDelivr)
 * Index 1: Tier 2 (GitHub Raw)
 * Index 2: Tier 3 (Local /covers/)
 */
export function getTokoDigitalCdnTiers(src, defaultSku = '') {
  const cleanSrc = (src || '').trim()
  
  // Jika URL eksternal selain CDN kita (misal Google Drive), kembalikan langsung
  if (cleanSrc.startsWith('http://') || cleanSrc.startsWith('https://')) {
    if (!cleanSrc.includes('mcjobs-id/fokuskonten-assets')) {
      return [cleanSrc]
    }
  }

  const { sku, filename } = parseImageSrc(src, defaultSku)
  if (!sku || !filename) {
    return cleanSrc ? [cleanSrc] : []
  }

  return [
    `${CDN_CONFIG.tier1}/${sku}/${filename}`,
    `${CDN_CONFIG.tier2}/${sku}/${filename}`,
    `${CDN_CONFIG.tier3}/${sku}/${filename}`
  ]
}

/**
 * Mendapatkan URL utama (Tier 1) untuk cover produk
 */
export function getTokoDigitalCoverUrl(product) {
  if (!product) return ''
  const sku = (product.sku || '').toUpperCase()
  const rawCover = product.coverImage || product.image || (sku ? `${sku}_cover.webp` : '')
  const tiers = getTokoDigitalCdnTiers(rawCover, sku)
  return tiers[0] || rawCover
}
