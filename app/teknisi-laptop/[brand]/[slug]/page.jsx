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

  const brandName = model?.brand || (brandSlug ? brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1) : 'Laptop')
  const modelName = model?.modelName || model?.model_name || slug
  const mbCode = model?.motherboardCode || model?.motherboard_code || ''
  const title = model?.officialTitle || `${brandName} ${modelName} ${mbCode ? '(' + mbCode + ') ' : ''}— Skema PDF & Boardview CAD Free Download + Panduan Jalur 19V & Standby`

  return {
    title,
    description: `Unduh skematik diagram PDF dan boardview CAD motherboard laptop ${brandName} ${modelName} ${mbCode} terverifikasi bebas proteksi.`
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
