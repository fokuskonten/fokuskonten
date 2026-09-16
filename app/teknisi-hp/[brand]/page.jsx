import fs from 'fs'
import path from 'path'
import BrandModelsClient from './BrandModelsClient'
import technicianIndex from '@/content/technician/index.json'

function getStaticBrandModels(brandSlug) {
  try {
    const brandFile = path.join(process.cwd(), `content/technician/brands/hp_${brandSlug}.json`)
    if (fs.existsSync(brandFile)) {
      const data = JSON.parse(fs.readFileSync(brandFile, 'utf8'))
      const allModels = data.models || []
      return {
        success: true,
        category: 'hp',
        brandSlug,
        brandName: data.brand || brandSlug,
        pagination: {
          totalItems: data.totalModels || allModels.length,
          currentPage: 1,
          totalPages: Math.ceil(allModels.length / 60) || 1,
          limit: 60
        },
        data: allModels.slice(0, 60)
      }
    }
  } catch (_) {}
  return null
}

export async function generateStaticParams() {
  return (technicianIndex.hpBrands || []).map((b) => ({
    brand: b.slug
  }))
}

export async function generateMetadata({ params }) {
  const brandSlug = params?.brand || ''
  const brandObj = (technicianIndex.hpBrands || []).find((b) => b.slug === brandSlug)
  const brandName = brandObj?.brand || (brandSlug ? brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1) : 'Merek')

  return {
    title: `Katalog Perangkat ${brandName} — Direktori Teknisi Hardware FokusKonten`,
    description: `Daftar lengkap model smartphone ${brandName} terverifikasi dengan Testpoint EDL 9008 & Direct ISP Pinout.`
  }
}

export default function BrandPage({ params }) {
  const initialData = getStaticBrandModels(params.brand)
  return <BrandModelsClient initialBrand={params.brand} initialData={initialData} />
}
