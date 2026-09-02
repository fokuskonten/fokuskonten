/**
 * Helper untuk SEO-friendly URL Slug Produk Digital
 * Format: [SKU]-[minimal 3-5 kata judul]
 * Contoh: ID14001-100-desain-kaos-hunting
 */

export function createProductSlug(sku, title) {
  if (!sku) return ''
  const rawSku = sku.toLowerCase()
  if (!title) return rawSku

  const cleanWords = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 5)
    .join('-')

  return cleanWords.length > 0 ? `${rawSku}-${cleanWords}` : rawSku
}

export function extractSkuFromSlug(rawParam) {
  if (!rawParam) return ''
  const decoded = decodeURIComponent(rawParam).trim().toLowerCase()
  
  // 1. Ekstrak SKU dengan regex ID + angka
  const match = decoded.match(/^(id\d+)/i)
  if (match) return match[1].toLowerCase()

  // 2. Fallback split dash
  return decoded.split('-')[0].toLowerCase()
}
