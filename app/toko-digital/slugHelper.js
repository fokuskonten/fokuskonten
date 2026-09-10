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
  
  // 1. Format standar: [SKU]-[judul], ambil segmen pertama sebelum dash
  const parts = decoded.split('-')
  if (parts[0] && /^id[a-z0-9]+$/i.test(parts[0])) {
    return parts[0].toLowerCase()
  }

  // 2. Format alternatif: [judul]-[SKU], ambil segmen terakhir jika berupa SKU
  const lastPart = parts[parts.length - 1]
  if (lastPart && /^id[a-z0-9]+$/i.test(lastPart)) {
    return lastPart.toLowerCase()
  }

  // 3. Fallback regex pencarian pola SKU di mana saja dalam slug
  const match = decoded.match(/(id[a-z0-9]+)/i)
  if (match) return match[1].toLowerCase()

  return parts[0].toLowerCase()
}
