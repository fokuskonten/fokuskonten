import fs from 'fs'
import path from 'path'
import LaptopModelDetailClient from './LaptopModelDetailClient'

function getStaticModel(brandSlug, slug) {
  try {
    const brandsDir = path.join(process.cwd(), 'content/technician/brands')
    const brandFile = path.join(brandsDir, `laptop_${brandSlug}.json`)
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
  if (process.env.BUILD_SCOPE && !['all', 'technician', 'laptop'].includes(process.env.BUILD_SCOPE.toLowerCase())) {
    return [{ brand: 'acer', slug: 'laptop-acer-jm31-cp-3-0225-1047-acer-aspire-as3820-as3820g-as3820t-as3820tg-as3820tz-as3820' }]
  }
  const brandsDir = path.join(process.cwd(), 'content/technician/brands')
  if (!fs.existsSync(brandsDir)) return []

  const files = fs.readdirSync(brandsDir).filter(f => f.startsWith('laptop_') && f.endsWith('.json'))
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

  const brandName = (model?.brand || (brandSlug ? brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1) : 'Laptop')).trim()
  let rawModelName = (model?.modelName || model?.model_name || slug).trim()
  if (rawModelName.toLowerCase().startsWith(brandName.toLowerCase())) {
    rawModelName = rawModelName.substring(brandName.length).trim()
  }
  const modelName = rawModelName
  const fullModelName = `${brandName} ${modelName}`.trim()
  const mbCode = (model?.motherboardCode || model?.motherboard_code || '').trim()
  const title = model?.officialTitle || `${fullModelName} ${mbCode ? '(' + mbCode + ') ' : ''}— Skema PDF & Boardview CAD Free Download + Panduan Jalur 19V & Standby`

  return {
    title,
    description: `Unduh skematik diagram PDF dan boardview CAD motherboard laptop ${fullModelName} ${mbCode} terverifikasi bebas proteksi.`
  }
}

export default function Page({ params }) {
  const brandSlug = params.brand
  const slug = params.slug
  const initialModel = getStaticModel(brandSlug, slug)

  const brandName = (initialModel?.brand || (brandSlug ? brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1) : 'Laptop')).trim()
  let rawModelName = (initialModel?.modelName || initialModel?.model_name || slug).trim()
  if (rawModelName.toLowerCase().startsWith(brandName.toLowerCase())) {
    rawModelName = rawModelName.substring(brandName.length).trim()
  }
  const modelName = rawModelName
  const fullModelName = `${brandName} ${modelName}`.trim()
  const mbCode = (initialModel?.motherboardCode || initialModel?.motherboard_code || '').trim()
  const canonicalUrl = `https://fokuskonten.my.id/teknisi-laptop/${brandSlug}/${slug}`

  const laptopFaqItems = [
    {
      q: `Software apa yang diperlukan untuk membuka berkas skematik PDF dan boardview ${fullModelName}?`,
      a: 'Untuk dokumen skematik diagram rangkaian, Anda dapat membukanya menggunakan Adobe Acrobat Reader atau Foxit PDF Reader. Untuk berkas tata letak komponen boardview (.CAD, .BRD, .BDV, .FZ), disarankan menggunakan aplikasi gratis OpenBoardView atau BoardViewer pada PC Windows.'
    },
    {
      q: 'Bagaimana urutan pengukuran tegangan (power sequence) pada motherboard laptop yang mati total?',
      a: 'Langkah awal dimulai dari pengukuran jalur tegangan utama adaptor 19V (VIN/DCBATOUT) di resistor sensing arus. Selanjutnya pastikan tegangan standby 3V dan 5V telah hadir pada IC PWM regulator sebelum menekan tombol power, dilanjutkan dengan sinyal EC/KBC dan power good (PGOOD).'
    },
    {
      q: 'Mengapa tegangan standby 3V dan 5V tidak keluar pada pengukuran awal?',
      a: 'Pada banyak arsitektur motherboard laptop modern, tegangan 3V dan 5V bersifat always-on hanya sebagian, atau baru aktif setelah menerima sinyal enable (EN) dari Embedded Controller (EC/KBC). Pastikan juga tidak ada resistansi rendah atau short-circuit ke ground pada lilitan (inductor) 3V/5V.'
    },
    {
      q: 'Apakah skematik diagram dan boardview ini sesuai dengan kode motherboard laptop saya?',
      a: `Pastikan kode motherboard fisik yang tertera di PCB motherboard laptop Anda (${mbCode || 'kode motherboard pada spesifikasi'}) cocok dengan judul berkas. Seluruh berkas telah diverifikasi revisi jalurnya sesuai dengan cetak sirkuit PCB pabrikan.`
    }
  ]

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${canonicalUrl}#article`,
        headline: `${fullModelName} ${mbCode ? '(' + mbCode + ') ' : ''}— Skematik Diagram & Boardview`,
        description: `Panduan dan berkas teknis motherboard laptop ${fullModelName} ${mbCode}: skematik sirkuit PDF dan tata letak boardview CAD.`,
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
            { '@type': 'ListItem', position: 2, name: 'Direktori Teknisi Laptop', item: 'https://fokuskonten.my.id/teknisi-laptop' },
            { '@type': 'ListItem', position: 3, name: brandName, item: `https://fokuskonten.my.id/teknisi-laptop/${brandSlug}` },
            { '@type': 'ListItem', position: 4, name: fullModelName, item: canonicalUrl }
          ]
        }
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: laptopFaqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a
          }
        }))
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <LaptopModelDetailClient
        initialBrand={brandSlug}
        initialSlug={slug}
        initialModel={initialModel}
      />
    </>
  )
}
