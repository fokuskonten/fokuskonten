import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import categories from '@/content/ebook/categories.json'
import CategorySiloClient from '@/components/ebook/CategorySiloClient'
import EbookBundleBanner from '@/components/ebook/EbookBundleBanner'

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const list = Array.isArray(categories) ? categories : []
    return list.map((cat) => ({
      category: cat.slug
    }))
  } catch (err) {
    console.error('[generateStaticParams error]', err)
    return []
  }
}

export async function generateMetadata({ params }) {
  const cat = categories.find((c) => c.slug === params.category)
  if (!cat) return { title: 'Kategori E-Book Tidak Ditemukan | FokusKonten' }

  const title = `Koleksi E-Book ${cat.name} PDF Lengkap | Direktori FokusKonten`
  const description = `${cat.description} Unduh dan baca koleksi ${cat.count} e-book resmi berformat PDF di FokusKonten.`

  return {
    title,
    description,
    keywords: [
      `ebook ${cat.name.toLowerCase()}`, `download ebook ${cat.name.toLowerCase()}`,
      `buku digital ${cat.name.toLowerCase()}`, 'fokuskonten ebook', 'pdf terverifikasi'
    ],
    openGraph: {
      title,
      description,
      url: `https://fokuskonten.my.id/ebook/${cat.slug}/`,
      siteName: 'FokusKonten',
      images: [
        {
          url: 'https://fokuskonten.my.id/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Koleksi E-Book ${cat.name}`
        }
      ],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://fokuskonten.my.id/og-image.jpg']
    }
  }
}

export default function EbookCategoryPage({ params }) {
  const catSlug = params.category
  const catInfo = categories.find((c) => c.slug === catSlug)

  if (!catInfo) {
    notFound()
  }

  // Baca berkas shard $O(1)$ untuk kategori ini
  let shardData = { items: [] }
  try {
    const shardPath = path.resolve(process.cwd(), 'content/ebook/shards', `${catSlug}.json`)
    if (fs.existsSync(shardPath)) {
      shardData = JSON.parse(fs.readFileSync(shardPath, 'utf-8'))
    }
  } catch (err) {
    console.warn(`[EbookCategoryPage] Gagal membaca shard ${catSlug}:`, err.message)
  }

  const items = shardData.items || []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Koleksi E-Book ${catInfo.name}`,
    description: catInfo.description,
    url: `https://fokuskonten.my.id/ebook/${catInfo.slug}/`,
    numberOfItems: items.length,
    publisher: {
      '@type': 'Organization',
      name: 'FokusKonten',
      url: 'https://fokuskonten.my.id'
    }
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-neutral-900 dark:bg-[#f8fafc] dark:text-neutral-900 pb-20 sm:pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 space-y-8">
        {/* ── BREADCRUMB ── */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500">
          <ol className="flex items-center gap-2">
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
            <li className="text-neutral-950 font-bold" aria-current="page">
              {catInfo.name}
            </li>
          </ol>
        </nav>

        {/* ── HEADER SILO KATEGORI ── */}
        <header className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 text-white text-[11px] font-mono font-bold tracking-wider uppercase">
            <span>SILO KEILMUAN</span>
            <span>&bull;</span>
            <span>{catInfo.count} JUDUL TERSEDIA</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 font-sans leading-tight">
            Koleksi E-Book {catInfo.name}
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
            {catInfo.description} Seluruh naskah digital berformat PDF utuh, dilengkapi cuplikan bab pembuka dan opsi unduhan berkecepatan tinggi.
          </p>
        </header>

        {/* ── PENJELAJAH ITEMS SILO ── */}
        <CategorySiloClient
          categoryName={catInfo.name}
          categorySlug={catInfo.slug}
          items={items}
        />

        {/* ── MEGA BUNDLE PROMO BANNER ── */}
        <EbookBundleBanner />
      </div>
    </main>
  )
}
