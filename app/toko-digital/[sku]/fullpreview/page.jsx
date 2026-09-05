import digitalProducts from '@/content/apps/digitalProducts.json'
import FullPreviewClient from './FullPreviewClient'
import path from 'path'
import fs from 'fs'
import { extractSkuFromSlug, createProductSlug } from '../../slugHelper'

export const dynamicParams = true

function getProductData(rawParam) {
  if (!rawParam) return null
  const targetSku = extractSkuFromSlug(rawParam)

  // 1. Cek dari digitalProducts.json
  const fromJson = digitalProducts.find((p) => {
    const pSku = (p.sku || '').toLowerCase()
    return pSku === targetSku
  })
  if (fromJson) return fromJson

  // 2. Fallback baca dari product_digital.db
  try {
    const { DatabaseSync } = require('node:sqlite')
    const dbPath = path.resolve(process.cwd(), '../../Server-Fokuskonten/product_digital.db')
    if (fs.existsSync(dbPath)) {
      const db = new DatabaseSync(dbPath)
      const row = db.prepare('SELECT * FROM digital_products WHERE LOWER(sku) = ?').get(targetSku)
      if (row) {
        return {
          sku: row.sku,
          title: row.title,
          name: row.title,
          category: row.category,
          format: row.format,
          badge: row.badge,
          price: row.price,
          originalPrice: row.original_price,
          coverImage: row.cover_image || `/covers/${row.sku}/${row.sku}_cover.webp`,
          image: row.cover_image || `/covers/${row.sku}/${row.sku}_cover.webp`,
          description: row.description,
          driveLink: row.drive_link,
          isPublished: row.is_published === 1
        }
      }
    }
  } catch (_) {}

  return null
}

/**
 * Memindai seluruh file .webp mockup yang tersedia di folder SKU produk
 */
function getAllSkuImages(sku) {
  if (!sku) return []
  const cleanSku = sku.toUpperCase().trim()

  // 1. Cek folder lokal public/covers/[SKU]
  const targetDir = path.resolve(process.cwd(), 'public/covers', cleanSku)
  if (fs.existsSync(targetDir)) {
    try {
      const files = fs.readdirSync(targetDir)
      const webpFiles = files.filter((f) => f.toLowerCase().endsWith('.webp'))

      if (webpFiles.length > 0) {
        // Urutkan: cover.webp terlebih dahulu, disusul slide_01, slide_02...
        webpFiles.sort((a, b) => {
          const aLow = a.toLowerCase()
          const bLow = b.toLowerCase()
          if (aLow.includes('cover')) return -1
          if (bLow.includes('cover')) return 1
          return aLow.localeCompare(bLow, undefined, { numeric: true })
        })

        return webpFiles.map((f) => `/covers/${cleanSku}/${f}`)
      }
    } catch (_) {}
  }

  // 2. Fallback jika ada array gallery di data produk
  const prod = getProductData(cleanSku)
  if (prod?.gallery && prod.gallery.length > 0) {
    return prod.gallery
  }

  return prod?.coverImage ? [prod.coverImage] : []
}

export async function generateStaticParams() {
  const params = []
  const added = new Set()

  const allItems = [...digitalProducts]

  try {
    const { DatabaseSync } = require('node:sqlite')
    const dbPath = path.resolve(process.cwd(), '../../Server-Fokuskonten/product_digital.db')
    if (fs.existsSync(dbPath)) {
      const db = new DatabaseSync(dbPath)
      const rows = db.prepare('SELECT sku, title FROM digital_products WHERE is_published = 1').all()
      for (const r of rows) {
        if (r && r.sku) allItems.push(r)
      }
      db.close()
    }
  } catch (_) {}

  for (const product of allItems) {
    if (product.sku && (product.isPublished !== false)) {
      const lowerSku = product.sku.toLowerCase()
      const upperSku = product.sku.toUpperCase()
      const slug = createProductSlug(product.sku, product.title)

      if (!added.has(lowerSku)) { params.push({ sku: lowerSku }); added.add(lowerSku); }
      if (!added.has(upperSku)) { params.push({ sku: upperSku }); added.add(upperSku); }
      if (slug && !added.has(slug)) { params.push({ sku: slug }); added.add(slug); }
    }
  }
  return params
}

export async function generateMetadata({ params }) {
  const product = getProductData(params.sku)
  if (!product) {
    return { title: 'Koleksi Desain Tidak Ditemukan | FokusKonten' }
  }
  return {
    title: `Katalog Visual Lengkap: ${product.sku} — ${product.title} | FokusKonten`,
    description: `Lihat seluruh mockup dan pratinjau desain master ${product.title} (${product.sku}) resolusi tinggi di FokusKonten.`,
  }
}

export default function FullPreviewPage({ params }) {
  const product = getProductData(params.sku)

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-neutral-900 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold mb-2 text-neutral-950">Produk Tidak Ditemukan</h1>
        <p className="text-neutral-500 text-sm mb-6">SKU produk ini belum terdaftar di katalog FokusKonten.</p>
        <a href="/toko-digital/" className="px-5 py-2.5 rounded-xl bg-neutral-950 text-white font-bold text-xs hover:bg-neutral-800 transition-all shadow-sm">
          Kembali ke Toko Digital
        </a>
      </div>
    )
  }

  const images = getAllSkuImages(product.sku)
  const returnSlug = createProductSlug(product.sku, product.title)

  return (
    <FullPreviewClient
      product={product}
      images={images}
      returnSlug={returnSlug}
    />
  )
}
