import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import routes from '@/content/ebook/routes.json'
import categories from '@/content/ebook/categories.json'
import EbookDetailClient from '@/components/ebook/EbookDetailClient'
import { enrichShardItem } from '@/lib/ebookArticleHelper'

export const dynamicParams = true

/**
 * generateStaticParams() — Membangkitkan rute statis O(1) dari routes.json ramping (< 90 KB)
 * Eksekusi cepat < 50ms tanpa memory overhead (Celah 6).
 */
export async function generateStaticParams() {
  if (process.env.BUILD_SCOPE && !['all', 'ebook', 'fast'].includes(process.env.BUILD_SCOPE.toLowerCase())) {
    return [{ category: 'agama-islam', slug: '10-kaidah-menghadapi-badai-fitnah-id507c' }]
  }
  return routes.map((r) => ({
    category: r.c,
    slug: r.u
  }))
}

/**
 * Membaca data item e-book secara atomik O(1)
 * Prioritas 1: Berkas item lama di content/ebook/items/[slug].json
 * Prioritas 2: Shard kategori di content/ebook/shards/[categorySlug].json (Zero 13.000 files)
 */
const _shardCache = new Map()
const _itemMapByCatSlug = new Map()

function getShard(categorySlug) {
  if (!categorySlug) return null
  if (_shardCache.has(categorySlug)) return _shardCache.get(categorySlug)
  try {
    const shardPath = path.resolve(process.cwd(), 'content/ebook/shards', `${categorySlug}.json`)
    if (fs.existsSync(shardPath)) {
      const shard = JSON.parse(fs.readFileSync(shardPath, 'utf-8'))
      _shardCache.set(categorySlug, shard)

      const itemMap = new Map()
      for (const item of shard.items || []) {
        if (item.slug) itemMap.set(item.slug.toLowerCase(), item)
        if (item.sku) itemMap.set(item.sku.toLowerCase(), item)
      }
      _itemMapByCatSlug.set(categorySlug, itemMap)
      return shard
    }
  } catch (err) {
    console.warn(`[getShard] Gagal membaca shard ${categorySlug}:`, err.message)
  }
  return null
}

/**
 * Membaca data item e-book secara atomik O(1)
 * Prioritas 1: Shard kategori di-cache in-memory O(1) Map
 * Prioritas 2: Berkas item lama di content/ebook/items/[slug].json
 */
function getEbookItem(slug, categorySlug) {
  if (!slug) return null

  if (categorySlug) {
    const shard = getShard(categorySlug)
    if (shard) {
      const itemMap = _itemMapByCatSlug.get(categorySlug)
      const item = itemMap ? itemMap.get(slug.toLowerCase()) : null
      if (item) {
        return enrichShardItem(item, shard.name, shard.slug)
      }
    }
  }

  try {
    const itemPath = path.resolve(process.cwd(), 'content/ebook/items', `${slug}.json`)
    if (fs.existsSync(itemPath)) {
      return JSON.parse(fs.readFileSync(itemPath, 'utf-8'))
    }
  } catch (_) {}

  return null
}

/**
 * Membaca 4 rekomendasi e-book terkait dari shard kategori
 */
function getRelatedEbooks(categorySlug, currentSku) {
  if (!categorySlug) return []
  const shard = getShard(categorySlug)
  if (shard && shard.items) {
    return shard.items.filter((i) => i.sku !== currentSku).slice(0, 4)
  }
  return []
}

export async function generateMetadata({ params }) {
  const ebook = getEbookItem(params.slug, params.category)
  if (!ebook) {
    return { title: 'Naskah E-Book Tidak Ditemukan | FokusKonten' }
  }

  const title = `${ebook.articleTitle || ebook.title} | Direktori FokusKonten`
  const description = `Baca sinopsis, cuplikan bab 1 dan unduh naskah e-book ${ebook.title} (${ebook.sku}) format PDF resmi di FokusKonten.`
  const coverUrl = ebook.coverImage?.startsWith('http')
    ? ebook.coverImage
    : `https://fokuskonten.my.id${ebook.coverImage || '/og-image.jpg'}`

  return {
    title,
    description,
    keywords: [
      ebook.title,
      `ebook ${ebook.category?.toLowerCase()}`,
      'download ebook pdf',
      ebook.authorDisplay || '',
      ebook.sku,
      'naskah digital',
      'literatur pdf resmi',
      'fokuskonten',
      ...(ebook.tags || [])
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      url: `https://fokuskonten.my.id/ebook/${ebook.categorySlug}/${params.slug}/`,
      siteName: 'FokusKonten',
      images: [
        {
          url: coverUrl,
          width: 800,
          height: 800,
          alt: ebook.title
        }
      ],
      type: 'book'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [coverUrl]
    }
  }
}

export default function EbookDetailPage({ params }) {
  const ebook = getEbookItem(params.slug, params.category)
  if (!ebook) {
    notFound()
  }

  const catInfo = categories.find((c) => c.slug === params.category) || {
    name: ebook.category || 'Kategori',
    slug: ebook.categorySlug || params.category
  }

  const relatedItems = getRelatedEbooks(params.category, ebook.sku)

  const ebookFaqItems = [
    {
      q: `Bagaimana cara membaca naskah e-book ${ebook.title}?`,
      a: 'Naskah e-book berformat PDF standar yang dapat dibuka di seluruh perangkat smartphone, tablet, laptop, dan komputer menggunakan aplikasi pembaca PDF seperti Adobe Acrobat Reader, Google Play Buku, atau peramban web modern.'
    },
    {
      q: 'Apakah naskah e-book ini bisa dicetak atau dibaca secara offline?',
      a: 'Ya. Berkas PDF yang diunduh bebas dari proteksi DRM yang membatasi, sehingga dapat disimpan secara permanen untuk dibaca offline maupun dicetak mandiri untuk kepentingan kajian pribadi.'
    },
    {
      q: 'Apa perbedaan antara opsi unduh Safelink (Gratis) dan Traktir Kopi?',
      a: 'Opsi unduh gratis mengarahkan Anda melalui halaman verifikasi sponsor iklan pihak ketiga. Opsi Traktir Kopi (Rp 2.000) memberikan akses unduh langsung berkecepatan tinggi dari server utama tanpa jeda iklan sponsor.'
    },
    {
      q: 'Apakah dokumen naskah ini memenuhi kaidah Fair Use?',
      a: 'Pratinjau bab pembuka dan kajian telaah editorial pada halaman ini disusun secara mandiri untuk tujuan edukasi dan apresiasi literatur (Fair Use). Tautan berkas merujuk pada repositori arsip digital publik untuk mempermudah akses rujukan ilmiah.'
    }
  ]

  // Bilateral SEO Separation: Menggunakan Schema @type: "Book" & "FAQPage" (Celah 25)
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: ebook.title,
      headline: ebook.articleTitle || ebook.title,
      author: ebook.hasAuthor && ebook.authorDisplay
        ? {
            '@type': 'Person',
            name: ebook.authorDisplay
          }
        : undefined,
      bookFormat: 'https://schema.org/EBook',
      numberOfPages: ebook.pages || undefined,
      inLanguage: 'id',
      image: ebook.coverImage?.startsWith('http')
        ? ebook.coverImage
        : `https://fokuskonten.my.id${ebook.coverImage}`,
      url: `https://fokuskonten.my.id/ebook/${ebook.categorySlug}/${params.slug}/`,
      publisher: {
        '@type': 'Organization',
        name: 'FokusKonten',
        url: 'https://fokuskonten.my.id'
      },
      offers: {
        '@type': 'Offer',
        price: '2000',
        priceCurrency: 'IDR',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'FokusKonten'
        }
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: ebookFaqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a
        }
      }))
    }
  ]

  return (
    <main className="min-h-screen bg-[#f8fafc] text-neutral-900 dark:bg-[#f8fafc] dark:text-neutral-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
        {/* ── BREADCRUMB ── */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-neutral-950 transition-colors">
                Beranda
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/ebook/" className="hover:text-neutral-950 transition-colors">
                Direktori E-Book
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/ebook/${catInfo.slug}/`} className="hover:text-neutral-950 transition-colors">
                {catInfo.name}
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-950 font-bold truncate max-w-[200px] sm:max-w-xs" aria-current="page">
              {ebook.title}
            </li>
          </ol>
        </nav>

        {/* ── DETAIL CLIENT ENGINE ── */}
        <EbookDetailClient
          ebook={ebook}
          relatedItems={relatedItems}
          categoryName={catInfo.name}
        />
      </div>
    </main>
  )
}
