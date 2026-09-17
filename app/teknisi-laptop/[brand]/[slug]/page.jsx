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
  const initialModel = getStaticModel(params.brand, params.slug)
  return (
    <LaptopModelDetailClient
      initialBrand={params.brand}
      initialSlug={params.slug}
      initialModel={initialModel}
    />
  )
}
