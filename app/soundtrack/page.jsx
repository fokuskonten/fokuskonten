import React from 'react'
import summaryData from '@/content/soundtrack/summary.json'
import { SoundtrackPlayerProvider } from '@/components/soundtrack/SoundtrackPlayerContext'
import SoundtrackCatalogClient from '@/components/soundtrack/SoundtrackCatalogClient'
import SoundtrackFloatingPlayer from '@/components/soundtrack/SoundtrackFloatingPlayer'

export const metadata = {
  title: 'Katalog 3.439+ Soundtrack & Musik Bebas Royalti Kualitas Studio | FokusKonten',
  description: 'Direktori lengkap 3.439 trek audio soundtrack, musik latar sinematik, korporat, indie rock, hingga efek suara berkualitas studio dengan unduhan langsung dan pratinjau instan.',
  keywords: [
    'soundtrack bebas royalti', 'stock music', 'download musik latar video',
    'cinematic soundtrack', 'corporate music', 'audiojungle master',
    'musik youtube bebas klaim', 'fokuskonten soundtrack'
  ],
  openGraph: {
    title: 'Katalog 3.439+ Soundtrack & Musik Bebas Royalti Kualitas Studio | FokusKonten',
    description: 'Jelajahi 3.439 trek soundtrack master kualitas studio dengan pemutar audio instan dan unduhan gratis.',
    url: 'https://fokuskonten.my.id/soundtrack/',
    siteName: 'FokusKonten',
    images: [
      {
        url: 'https://fokuskonten.my.id/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Katalog Master Soundtrack FokusKonten'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Katalog 3.439+ Soundtrack & Musik Bebas Royalti Kualitas Studio | FokusKonten',
    description: 'Jelajahi 3.439 trek soundtrack master kualitas studio dengan pemutar audio instan dan unduhan gratis.',
    images: ['https://fokuskonten.my.id/og-image.jpg']
  }
}

export default function SoundtrackPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Katalog Master Soundtrack & Musik Bebas Royalti FokusKonten',
    description: 'Repositori 3.439 trek soundtrack master studio (WAV 24-bit & MP3) dengan pratinjau streaming instan dan lisensi bebas royalti komersial.',
    url: 'https://fokuskonten.my.id/soundtrack/',
    numberOfItems: summaryData.totalTracks || 3439,
    publisher: {
      '@type': 'Organization',
      name: 'FokusKonten',
      url: 'https://fokuskonten.my.id'
    }
  }

  return (
    <SoundtrackPlayerProvider>
      <main className="min-h-screen bg-[#f8fafc] text-neutral-900 pb-32 sm:pb-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero Section Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8 sm:space-y-10">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4">
            <div className="max-w-3xl space-y-3">
              <span className="px-3 py-1 bg-neutral-950 text-white font-mono font-bold text-xs rounded-lg uppercase tracking-wider inline-block">
                DIREKTORI MASTER SOUNDTRACK RESMI
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight font-display">
                Koleksi 3.439+ Soundtrack Bebas Royalti Kualitas Studio
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
                Katalog musik latar dan efek suara kelas profesional untuk kreator konten, video editor, dan rumah produksi. Dilengkapi pratinjau instan pemutar web jernih serta unduhan berkas master studio original (WAV 24-bit & MP3 320 kbps).
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-4 border-t border-neutral-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-[11px] text-neutral-500 font-sans block">Total Koleksi</span>
                <span className="text-lg sm:text-xl font-extrabold font-mono text-neutral-950">
                  {summaryData.totalTracks || 3439} Lagu
                </span>
              </div>
              <div>
                <span className="text-[11px] text-neutral-500 font-sans block">Kualitas Unduhan</span>
                <span className="text-lg sm:text-xl font-extrabold font-mono text-neutral-950">
                  Master Studio
                </span>
              </div>
              <div>
                <span className="text-[11px] text-neutral-500 font-sans block">Format Berkas</span>
                <span className="text-lg sm:text-xl font-extrabold font-mono text-neutral-950">
                  WAV 24-bit / MP3
                </span>
              </div>
              <div>
                <span className="text-[11px] text-neutral-500 font-sans block">Pratinjau Web</span>
                <span className="text-lg sm:text-xl font-extrabold font-mono text-neutral-950">
                  Streaming Instan
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Catalog Section */}
          <SoundtrackCatalogClient initialSummary={summaryData} />
        </div>

        {/* Global Floating Audio Player */}
        <SoundtrackFloatingPlayer />
      </main>
    </SoundtrackPlayerProvider>
  )
}
