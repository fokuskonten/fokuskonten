import fs from 'fs'
import path from 'path'
import SmartphoneModelDetailClient from './SmartphoneModelDetailClient'

function getStaticModel(brandSlug, slug) {
  try {
    const brandsDir = path.join(process.cwd(), 'content/technician/brands')
    const brandFile = path.join(brandsDir, `hp_${brandSlug}.json`)
    if (fs.existsSync(brandFile)) {
      const data = JSON.parse(fs.readFileSync(brandFile, 'utf8'))
      const found = (data.models || []).find(m => m.slug === slug)
      if (found) {
        return {
          ...found,
          brand: data.brand || found.brand,
          brandSlug: data.brandSlug || brandSlug,
          files: found.files || []
        }
      }
    }
  } catch (_) {}
  return null
}

export async function generateStaticParams() {
  const brandsDir = path.join(process.cwd(), 'content/technician/brands')
  if (!fs.existsSync(brandsDir)) return []

  const files = fs.readdirSync(brandsDir).filter(f => f.startsWith('hp_') && f.endsWith('.json'))
  const params = []

  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(brandsDir, file), 'utf8'))
      const brandSlug = data.brandSlug
      if (Array.isArray(data.models)) {
        for (const m of data.models) {
          if (m.slug) {
            params.push({ brand: brandSlug, slug: m.slug })
          }
        }
      }
    } catch (_) {}
  }

  return params
}

export async function generateMetadata({ params }) {
  const brandSlug = params?.brand || ''
  const slug = params?.slug || ''
  const model = getStaticModel(brandSlug, slug)

  const brandName = (model?.brand || (brandSlug ? brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1) : 'Smartphone')).trim()
  let rawModelName = (model?.modelName || model?.model_name || slug).trim()
  if (rawModelName.toLowerCase().startsWith(brandName.toLowerCase())) {
    rawModelName = rawModelName.substring(brandName.length).trim()
  }
  const modelName = rawModelName
  const fullModelName = `${brandName} ${modelName}`.trim()
  const title = model?.officialTitle || `${fullModelName} — Test Point EDL 9008 & Direct ISP Pinout Free Download + Panduan Flashing Anti Gagal`

  return {
    title,
    description: `Unduh gratis berkas titik test point EDL 9008, direct ISP pinout eMMC/UFS, dan firehose loader resmi ${fullModelName} terverifikasi bebas proteksi.`
  }
}

export default function Page({ params }) {
  const brandSlug = params.brand
  const slug = params.slug
  const initialModel = getStaticModel(brandSlug, slug)

  const brandName = (initialModel?.brand || (brandSlug ? brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1) : 'Smartphone')).trim()
  let rawModelName = (initialModel?.modelName || initialModel?.model_name || slug).trim()
  if (rawModelName.toLowerCase().startsWith(brandName.toLowerCase())) {
    rawModelName = rawModelName.substring(brandName.length).trim()
  }
  const modelName = rawModelName
  const fullModelName = `${brandName} ${modelName}`.trim()
  const canonicalUrl = `https://fokuskonten.my.id/teknisi-hp/${brandSlug}/${slug}`

  // ── Schema.org JSON-LD: unik per halaman, mencegah kanibalisasi SEO ──────
  // Gunakan SoftwareApplication untuk file unduhan + HowTo untuk panduan flashing
  // TIDAK menggunakan Product schema (menyebabkan Google menampilkan harga palsu)
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${canonicalUrl}#article`,
        headline: `${fullModelName} — Testpoint EDL 9008 & Direct ISP Pinout`,
        description: `Panduan dan berkas teknis terverifikasi: Titik Testpoint EDL 9008 dan Pinout Direct ISP eMMC/UFS untuk ${fullModelName}.`,
        url: canonicalUrl,
        inLanguage: 'id-ID',
        author: {
          '@type': 'Organization',
          name: 'FokusKonten',
          url: 'https://fokuskonten.my.id'
        },
        publisher: {
          '@type': 'Organization',
          name: 'FokusKonten',
          url: 'https://fokuskonten.my.id',
          logo: { '@type': 'ImageObject', url: 'https://fokuskonten.my.id/logo.png' }
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://fokuskonten.my.id' },
            { '@type': 'ListItem', position: 2, name: 'Direktori Teknisi HP', item: 'https://fokuskonten.my.id/teknisi-hp' },
            { '@type': 'ListItem', position: 3, name: brandName, item: `https://fokuskonten.my.id/teknisi-hp/${brandSlug}` },
            { '@type': 'ListItem', position: 4, name: fullModelName, item: canonicalUrl }
          ]
        }
      },
      {
        '@type': 'HowTo',
        '@id': `${canonicalUrl}#howto-edl`,
        name: `Cara Masuk Mode EDL 9008 ${fullModelName} via Testpoint`,
        description: `Langkah-langkah jumper titik testpoint untuk masuk Emergency Download Mode (EDL 9008) pada ${fullModelName}.`,
        url: `${canonicalUrl}#testpoint`,
        inLanguage: 'id-ID',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Matikan perangkat', text: 'Lepas soket baterai dari konektor PCB motherboard.' },
          { '@type': 'HowToStep', position: 2, name: 'Jumper Testpoint', text: `Hubungkan 2 titik Testpoint EDL pada motherboard ${fullModelName} menggunakan pinset presisi ke Ground.` },
          { '@type': 'HowToStep', position: 3, name: 'Hubungkan ke PC', text: 'Colokkan kabel USB. PC akan mendeteksi Qualcomm HS-USB QDLoader 9008 di Device Manager.' }
        ],
        tool: [
          { '@type': 'HowToTool', name: 'Pinset Presisi Anti-Statis' },
          { '@type': 'HowToTool', name: 'Kabel USB Data' },
          { '@type': 'HowToTool', name: 'Firehose Loader (.elf)' }
        ]
      }
    ]
  }

  return (
    <>
      {/* Schema.org JSON-LD — unik per slug, tidak duplikat antar halaman */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <SmartphoneModelDetailClient
        initialBrand={brandSlug}
        initialSlug={slug}
        initialModel={initialModel}
      />
    </>
  )
}

