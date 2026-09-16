import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import routes from '@/content/ebook/routes.json'
import categories from '@/content/ebook/categories.json'
import EbookDetailClient from '@/components/ebook/EbookDetailClient'

export const dynamicParams = true

/**
 * generateStaticParams() — Membangkitkan 2.471 rute statis O(1) dari routes.json ramping (< 90 KB)
 * Eksekusi cepat < 50ms tanpa memory overhead (Celah 6).
 */
export async function generateStaticParams() {
  return routes.map((r) => ({
    category: r.c,
    slug: r.u
  }))
}

/**
 * Membaca data item e-book secara atomik O(1) dari content/ebook/items/[slug].json
 */
function getEbookItem(slug) {
  if (!slug) return null
  try {
    const itemPath = path.resolve(process.cwd(), 'content/ebook/items', `${slug}.json`)
    if (fs.existsSync(itemPath)) {
      return JSON.parse(fs.readFileSync(itemPath, 'utf-8'))
    }
  } catch (err) {
    console.warn(`[getEbookItem] Gagal membaca item ${slug}:`, err.message)
  }
  return null
}

/**
 * Membaca 4 rekomendasi e-book terkait dari shard kategori
 */
function getRelatedEbooks(categorySlug, currentSku) {
  if (!categorySlug) return []
  try {
    const shardPath = path.resolve(process.cwd(), 'content/ebook/shards', `${categorySlug}.json`)
    if (fs.existsSync(shardPath)) {
      const shard = JSON.parse(fs.readFileSync(shardPath, 'utf-8'))
      const allItems = shard.items || []
      return allItems.filter((i) => i.sku !== currentSku).slice(0, 4)
    }
  } catch (_) {}
  return []
}

export async function generateMetadata({ params }) {
  const ebook = getEbookItem(params.slug)
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
      ebook.title, `ebook ${ebook.category?.toLowerCase()}`, 'download ebook pdf',
      ebook.authorDisplay || '', ebook.sku, 'buku digital', 'fokuskonten'
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
  const ebook = getEbookItem(params.slug)
  if (!ebook) {
    notFound()
  }

  const catInfo = categories.find((c) => c.slug === params.category) || {
    name: ebook.category || 'Kategori',
    slug: ebook.categorySlug || params.category
  }

  const relatedItems = getRelatedEbooks(params.category, ebook.sku)

  // Bilateral SEO Separation: Menggunakan Schema @type: "Book" (Celah 25)
  const jsonLd = {
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
  }

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
