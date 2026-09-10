import digitalProducts from '@/content/apps/digitalProducts.json'
import ProductDetailClient from './ProductDetailClient'
import path from 'path'
import fs from 'fs'

import { extractSkuFromSlug, createProductSlug } from '../slugHelper'

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

  // 2. Fallback baca langsung dari SQLite DB product_digital.db
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
          gallery: [row.cover_image || `/covers/${row.sku}/${row.sku}_cover.webp`],
          description: row.description,
          driveLink: row.drive_link,
          backupDriveLink: row.backup_drive_link,
          isPublished: row.is_published === 1
        }
      }
    }
  } catch (err) {
    // Fallback silent
  }

  return null
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
    return { title: 'Produk Tidak Ditemukan | FokusKonten' }
  }

  const title = `${product.sku} — ${product.title || product.name} | Toko Digital FokusKonten`
  const description = product.description ? product.description.slice(0, 160) : 'Paket produk digital resmi FokusKonten'
  const imageUrl = product.coverImage ? (product.coverImage.startsWith('http') ? product.coverImage : `https://fokuskonten.my.id${product.coverImage}`) : 'https://fokuskonten.my.id/og-image.jpg'

  return {
    title,
    description,
    keywords: [product.title, product.category, 'download ebook', 'buku digital', 'fokuskonten', product.format || 'PDF'],
    openGraph: {
      title,
      description,
      url: `https://fokuskonten.my.id/toko-digital/${product.sku.toLowerCase()}/`,
      siteName: 'FokusKonten',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.title || product.sku
        }
      ],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    }
  }
}

export default function ProductDetailPage({ params }) {
  const product = getProductData(params.sku)
  if (!product) return <ProductDetailClient product={null} />

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title || product.name,
    image: product.coverImage ? (product.coverImage.startsWith('http') ? product.coverImage : `https://fokuskonten.my.id${product.coverImage}`) : undefined,
    description: product.description ? product.description.slice(0, 250) : '',
    sku: product.sku,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'FokusKonten'
    },
    offers: {
      '@type': 'Offer',
      url: `https://fokuskonten.my.id/toko-digital/${product.sku.toLowerCase()}/`,
      priceCurrency: 'IDR',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'FokusKonten'
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  )
}
