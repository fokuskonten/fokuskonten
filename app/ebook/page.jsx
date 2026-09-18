import categories from '@/content/ebook/categories.json'
import routes from '@/content/ebook/routes.json'
import EbookDirectoryClient from '@/components/ebook/EbookDirectoryClient'
import EbookBundleBanner from '@/components/ebook/EbookBundleBanner'
import Link from 'next/link'

export const metadata = {
  title: 'Direktori & Perpustakaan Digital 3.500+ E-Book PDF Resmi | FokusKonten',
  description: 'Katalog literatur digital lengkap, naskah kajian keilmuan, novel fiksi, agama, pengembangan diri, dan referensi akademik berformat PDF resmi terverifikasi.',
  keywords: [
    'direktori ebook', 'download ebook pdf', 'buku digital', 'perpustakaan digital',
    'katalog ebook', 'baca ebook online', 'fokuskonten ebook', 'resensi buku'
  ],
  openGraph: {
    title: 'Direktori & Perpustakaan Digital 3.500+ E-Book PDF Resmi | FokusKonten',
    description: 'Jelajahi 3.500+ judul naskah digital PDF terverifikasi dari 25 rumpun keilmuan dengan cuplikan baca dan unduhan langsung.',
    url: 'https://fokuskonten.my.id/ebook/',
    siteName: 'FokusKonten',
    images: [
      {
        url: 'https://fokuskonten.my.id/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Direktori E-Book FokusKonten'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Direktori & Perpustakaan Digital 3.500+ E-Book PDF Resmi | FokusKonten',
    description: 'Jelajahi 3.500+ judul naskah digital PDF terverifikasi dari 25 rumpun keilmuan.',
    images: ['https://fokuskonten.my.id/og-image.jpg']
  }
}

export default function EbookDirectoryPage() {
  const totalEbooks = routes.length
  const totalCategories = categories.length

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Direktori & Perpustakaan Digital E-Book Resmi FokusKonten',
    description: 'Koleksi komprehensif 3.512+ judul e-book PDF terverifikasi lintas 18 rumpun silo keilmuan.',
    url: 'https://fokuskonten.my.id/ebook/',
    numberOfItems: totalEbooks,
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 space-y-10">
        {/* ── BREADCRUMB ── */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-neutral-950 transition-colors">
                Beranda
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-950 font-bold" aria-current="page">
              Direktori E-Book
            </li>
          </ol>
        </nav>

        {/* ── HERO HEADER ── */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 text-white text-[11px] font-mono font-bold tracking-wider uppercase">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>PERPUSTAKAAN DIGITAL FOKUSKONTEN</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 font-sans leading-tight">
            Direktori {totalEbooks > 0 ? `${(Math.floor(totalEbooks / 100) * 100).toLocaleString('id-ID')}+` : '3.500+'} E-Book PDF Resmi Terverifikasi
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
            Pusat kajian literatur, risalah keilmuan, dan karya fiksi terpilih. Dilengkapi pratinjau bab pembuka, kutipan asli pengarang, dan opsi unduhan langsung berkecepatan tinggi.
          </p>

          {/* Key Metrics Row */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-950" />
              <strong className="text-neutral-950">{totalEbooks.toLocaleString('id-ID')}</strong>
              <span className="text-neutral-500">Judul E-Book</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-950" />
              <strong className="text-neutral-950">{totalCategories}</strong>
              <span className="text-neutral-500">Rumpun Silo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-950" />
              <strong className="text-neutral-950">100% PDF</strong>
              <span className="text-neutral-500">Dokumen Utuh</span>
            </div>
          </div>
        </header>

        {/* ── INTERACTIVE SEARCH & CATEGORIES CLIENT ── */}
        <EbookDirectoryClient
          categories={categories}
          initialRoutes={routes}
        />

        {/* ── MEGA BUNDLE PROMO BANNER ── */}
        <EbookBundleBanner />

        {/* ── KOTAK DISCLAIMER HAK CIPTA & FAIR USE (Celah 4) ── */}
        <footer className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-6 sm:p-7 text-xs text-neutral-600 leading-relaxed space-y-2 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-950" />
            <h3 className="font-extrabold text-xs sm:text-sm text-neutral-950 font-sans uppercase tracking-wider">
              Pernyataan Hak Cipta &amp; Ketentuan Fair Use Literasi
            </h3>
          </div>
          <p>
            Seluruh sinopsis, intisari bab pembuka, dan kutipan yang dimuat di direktori ini disusun untuk tujuan edukasi, resensi literatur, dan apresiasi wawasan (Doktrin <em>Fair Use</em>). Tautan unduhan berkas merujuk pada arsip digital yang sah dan terdistribusi untuk kebutuhan pembelajaran non-komersial.
          </p>
          <p>
            Jika Anda merupakan pemegang hak cipta sah atas suatu naskah dan menghendaki penonaktifan tayangan, silakan hubungi tim kami melalui korespondensi legal resmi di{' '}
            <a href="mailto:legal@fokuskonten.my.id" className="text-neutral-950 underline font-bold">
              legal@fokuskonten.my.id
            </a>
            . Permohonan valid akan diselesaikan dalam waktu maksimal 1x24 jam kerja.
          </p>
        </footer>
      </div>
    </main>
  )
}
