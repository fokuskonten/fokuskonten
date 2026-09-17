import fs from 'fs'
import path from 'path'
import LaptopBrandModelsClient from './BrandModelsClient'
import technicianIndex from '@/content/technician/index.json'

function getStaticBrandModels(brandSlug) {
  try {
    const brandFile = path.join(process.cwd(), `content/technician/brands/laptop_${brandSlug}.json`)
    if (fs.existsSync(brandFile)) {
      const data = JSON.parse(fs.readFileSync(brandFile, 'utf8'))
      const allModels = data.models || []
      return {
        success: true,
        category: 'laptop',
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
  if (process.env.BUILD_SCOPE && !['all', 'technician', 'laptop'].includes(process.env.BUILD_SCOPE.toLowerCase())) {
    return [{ brand: 'acer' }]
  }
  return (technicianIndex.laptopBrands || []).map((b) => ({
    brand: b.slug
  }))
}

export async function generateMetadata({ params }) {
  const brandSlug = params?.brand || ''
  const brandObj = (technicianIndex.laptopBrands || []).find((b) => b.slug === brandSlug)
  const brandName = brandObj?.brand || (brandSlug ? brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1) : 'Merek')

  return {
    title: `Katalog Skema Laptop ${brandName} — Direktori Teknisi Hardware FokusKonten`,
    description: `Daftar lengkap skema skematik PCB & boardview laptop ${brandName} terverifikasi.`
  }
}

export default function LaptopBrandPage({ params }) {
  const initialData = getStaticBrandModels(params.brand)
  return <LaptopBrandModelsClient initialBrand={params.brand} initialData={initialData} />
}
