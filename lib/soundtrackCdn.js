/**
 * soundtrackCdn.js
 * Multi-Tier CDN Resolver & Link Generator untuk Direktori Soundtrack FokusKonten
 * Sesuai Standar:
 * Tier 1: jsDelivr Edge CDN (Global Cache, Ultra Fast, Zero Server Bandwidth)
 * Tier 2: Local / Express Backend API Stream (HTTP 206 Partial Content / Seekable)
 */

export const SOUNDTRACK_CDN_CONFIG = {
  vol1: 'https://cdn.jsdelivr.net/gh/mcjobs-id/fokuskonten-soundtrack-vol1@main',
  vol2: 'https://cdn.jsdelivr.net/gh/mcjobs-id/fokuskonten-soundtrack-vol2@main',
  vol1_variations: 'https://cdn.jsdelivr.net/gh/mcjobs-id/fokuskonten-soundtrack-vol1-variations@main',
  vol2_variations: 'https://cdn.jsdelivr.net/gh/mcjobs-id/fokuskonten-soundtrack-vol2-variations@main',
}

/**
 * Menghasilkan URL unduhan berkas master soundtrack via streaming endpoint aman
 * Mendukung lagu utama (vIdx = null) maupun variasi potongan spesifik (vIdx = 0, 1, ...)
 * Sesuai doktrin Zero Data Leak: Tidak membocorkan API key atau master cloud URL ke client
 */
export function getSoundtrackSafelinkUrl(sku, vIdx = null) {
  if (!sku) return '#'
  const cleanSku = String(sku).trim().toUpperCase()
  return (vIdx !== null && vIdx !== undefined)
    ? `https://api.fokuskonten.my.id/api/v1/soundtrack/download-stream/${cleanSku}/${vIdx}`
    : `https://api.fokuskonten.my.id/api/v1/soundtrack/download-stream/${cleanSku}`
}

/**
 * Mengurai URL streaming audio:
 * - Localhost / LAN: Langsung ke endpoint Express lokal untuk respons cepat & seekable
 * - Production: Mengarah ke CDN jsDelivr Edge
 */
export function getSoundtrackStreamUrl(track, vIdx = null) {
  if (!track) return ''
  const sku = track.s || track.track_sku
  const isVariation = vIdx !== null && vIdx !== undefined

  // Deteksi lingkungan browser lokal
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')
    if (isLocal && sku) {
      return isVariation
        ? `/api/v1/soundtrack/stream-variation/${sku}/${vIdx}`
        : `/api/v1/soundtrack/stream/${sku}`
    }
  }

  // Jika lagu utama dan CDN URL sudah ada di data sekoci
  if (!isVariation && (track.u || track.cdn_url)) {
    return track.u || track.cdn_url
  }

  // Untuk variasi di production: kalkulasi deterministik URL CDN jsDelivr
  if (isVariation) {
    const rawCode = track.ic || track.item_code || (() => {
      const url = track.u || track.cdn_url || ''
      const m = url.match(/_(\d+)\.opus$/i)
      if (m) return m[1]
      return sku
    })()
    const itemCode = String(rawCode || '').replace(/[\[\]\s]/g, '') || sku
    const vol = (track.v || track.source_volume || '').toUpperCase() === 'VOL2' ? 'vol2' : 'vol1'
    const cdnBase = vol === 'vol2' ? SOUNDTRACK_CDN_CONFIG.vol2_variations : SOUNDTRACK_CDN_CONFIG.vol1_variations
    return `${cdnBase}/${itemCode}_v${vIdx}.opus`
  }

  return sku ? `/api/v1/soundtrack/stream/${sku}` : ''
}
