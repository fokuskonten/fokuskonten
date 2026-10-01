import fs from 'fs'
import path from 'path'
import SoundtrackDetailClient from './SoundtrackDetailClient'

export const dynamicParams = true

function getTrackData(rawSku) {
  if (!rawSku) return null
  const cleanSku = rawSku.toUpperCase().trim()

  // 1. Prioritas Utama: Baca langsung dari SQLite soundtrack.db jika tersedia (Lokal Master)
  try {
    const { DatabaseSync } = require('node:sqlite')
    const dbPath = path.resolve(process.cwd(), '../../Server-Fokuskonten/soundtrack.db')
    if (fs.existsSync(dbPath)) {
      const db = new DatabaseSync(dbPath)
      const row = db.prepare('SELECT * FROM audio_tracks WHERE (UPPER(track_sku) = ? OR UPPER(item_code) = ?) AND is_published = 1').get(cleanSku, cleanSku)
      db.close()
      if (row) {
        let variationsList = []
        if (row.variations_json) {
          try {
            variationsList = JSON.parse(row.variations_json)
          } catch (_) {}
        }
        return {
          ...row,
          variationsList
        }
      }
    }
  } catch (_) {}

  // 2. Fallback Sekoci: Cek dari sekoci JSON siaga jika DB tidak ada (GitHub Actions / Cloud)
  try {
    const sekociDir = path.resolve(process.cwd(), 'content/soundtrack')
    const vol1File = path.join(sekociDir, 'catalog_vol1.json')
    const vol2File = path.join(sekociDir, 'catalog_vol2.json')

    let allTracks = []
    if (fs.existsSync(vol1File)) allTracks.push(...JSON.parse(fs.readFileSync(vol1File, 'utf8')))
    if (fs.existsSync(vol2File)) allTracks.push(...JSON.parse(fs.readFileSync(vol2File, 'utf8')))

    const found = allTracks.find(item => 
      (item.s || item.track_sku || '').toUpperCase() === cleanSku ||
      (item.ic || item.item_code || '').toUpperCase() === cleanSku
    )
    if (found) {
      return {
        track_sku: found.s || found.track_sku,
        item_code: found.ic || found.item_code,
        title: found.t || found.title,
        composer: found.c || found.composer,
        duration_sec: found.d || found.duration_sec,
        file_size_bytes: found.z || found.file_size_bytes,
        genre: found.g || found.genre,
        mood: found.m || found.mood,
        cdn_url: found.u || found.cdn_url,
        safelink_url: found.l || found.safelink_url,
        variations_count: found.vc || 1,
        variationsList: found.vl || []
      }
    }
  } catch (_) {}

  return null
}

export async function generateStaticParams() {
  if (process.env.BUILD_SCOPE && !['all', 'soundtrack', 'audio'].includes(process.env.BUILD_SCOPE.toLowerCase())) {
    return [{ sku: 'st1-0001' }]
  }

  const params = []

  // Ambil dari SQLite jika ada
  try {
    const { DatabaseSync } = require('node:sqlite')
    const dbPath = path.resolve(process.cwd(), '../../Server-Fokuskonten/soundtrack.db')
    if (fs.existsSync(dbPath)) {
      const db = new DatabaseSync(dbPath)
      const rows = db.prepare('SELECT track_sku FROM audio_tracks WHERE is_published = 1').all()
      db.close()
      for (const r of rows) {
        if (r && r.track_sku) {
          params.push({ sku: r.track_sku.toLowerCase() })
        }
      }
      return params
    }
  } catch (_) {}

  // Fallback dari sekoci JSON
  try {
    const sekociDir = path.resolve(process.cwd(), 'content/soundtrack')
    const vol1File = path.join(sekociDir, 'catalog_vol1.json')
    const vol2File = path.join(sekociDir, 'catalog_vol2.json')

    if (fs.existsSync(vol1File)) {
      const v1 = JSON.parse(fs.readFileSync(vol1File, 'utf8'))
      v1.forEach(t => params.push({ sku: (t.s || t.track_sku).toLowerCase() }))
    }
    if (fs.existsSync(vol2File)) {
      const v2 = JSON.parse(fs.readFileSync(vol2File, 'utf8'))
      v2.forEach(t => params.push({ sku: (t.s || t.track_sku).toLowerCase() }))
    }
  } catch (_) {}

  return params
}

export async function generateMetadata({ params }) {
  const rawSku = params?.sku || ''
  const track = getTrackData(rawSku)

  if (!track) {
    return {
      title: 'Trek Audio Tidak Ditemukan — FokusKonten',
      description: 'Lagu atau berkas soundtrack tidak ditemukan dalam direktori master AudioJungle FokusKonten.'
    }
  }

  const title = track.title || 'Soundtrack Master'
  const sku = track.track_sku || rawSku.toUpperCase()
  const itemCode = String(track.item_code || sku).replace(/[\[\]\s]/g, '')
  const genre = track.genre || 'Cinematic'
  const pageTitle = `${title} (${itemCode}) — Stock Music Bebas Royalti | FokusKonten`
  const pageDesc = `Dengarkan dan unduh audio master ${title} (${genre}). Format streaming Opus instan bebas jeda iklan & master studio WAV 24-bit bebas royalti untuk YouTube dan konten komersial.`
  const canonicalUrl = `https://fokuskonten.my.id/soundtrack/${sku.toLowerCase()}/`

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: canonicalUrl,
      type: 'music.song',
      siteName: 'FokusKonten'
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc
    }
  }
}

export default function SoundtrackDetailPage({ params }) {
  const rawSku = params?.sku || ''
  const track = getTrackData(rawSku)

  if (!track) {
    return (
      <div className="min-h-screen bg-[#fafafa] py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white border border-neutral-200 rounded-2xl p-10 text-center space-y-4 shadow-sm">
          <span className="font-mono text-xs font-bold px-2 py-1 bg-neutral-100 rounded text-neutral-800">
            404 NOT FOUND
          </span>
          <h1 className="text-2xl font-extrabold text-neutral-950 font-display">
            Trek Lagu Tidak Ditemukan
          </h1>
          <p className="text-sm text-neutral-600 font-sans">
            Berkas soundtrack dengan SKU &quot;{rawSku}&quot; tidak terdaftar dalam katalog master kami.
          </p>
        </div>
      </div>
    )
  }

  const sku = track.track_sku || rawSku.toUpperCase()
  const canonicalUrl = `https://fokuskonten.my.id/soundtrack/${sku.toLowerCase()}/`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      name: track.title,
      description: `Stock music ${track.title} genre ${track.genre}. Master audio komersial bebas royalti.`,
      url: canonicalUrl,
      duration: `PT${Math.floor(track.duration_sec / 60)}M${track.duration_sec % 60}S`,
      genre: track.genre,
      byArtist: {
        '@type': 'MusicGroup',
        name: track.composer || 'AudioJungle Master'
      },
      offers: {
        '@type': 'Offer',
        price: '2000',
        priceCurrency: 'IDR',
        availability: 'https://schema.org/InStock',
        url: canonicalUrl
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Beranda',
          item: 'https://fokuskonten.my.id/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Direktori Soundtrack',
          item: 'https://fokuskonten.my.id/soundtrack/'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: track.title,
          item: canonicalUrl
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-neutral-950 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <SoundtrackDetailClient track={track} />
      </div>
    </div>
  )
}
