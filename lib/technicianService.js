/**
 * technicianService.js — Data Access Layer (DAL) Frontend Portal Teknisi Hardware
 * Hybrid Strategy: Pembacaan Manifest Lokal saat ISR / Build-Time & Dynamic Fetch API Port 8090
 */
import { getApiBaseUrl } from './apiConfig'
import catalogManifest from '../content/apps/technician_catalog.json'

export async function getTechnicianSummary() {
  try {
    const res = await fetch(`${getApiBaseUrl()}/technician/summary`, { next: { revalidate: 3600 } })
    if (res.ok) {
      const json = await res.json()
      if (json.success) return json.data
    }
  } catch (err) {
    console.warn('[technicianService] Fallback to manifest stats:', err.message)
  }
  return catalogManifest.stats
}

export async function getTechnicianBrands(category = 'hp') {
  try {
    const res = await fetch(`${getApiBaseUrl()}/technician/brands/${category}`, { next: { revalidate: 3600 } })
    if (res.ok) {
      const json = await res.json()
      if (json.success) return json.data
    }
  } catch (err) {
    console.warn('[technicianService] Fallback to manifest brands:', err.message)
  }
  return category === 'laptop' ? catalogManifest.laptopBrands : catalogManifest.hpBrands
}

export async function getModelsByBrand(category = 'hp', brandSlug, page = 1, limit = 60) {
  try {
    const res = await fetch(`${getApiBaseUrl()}/technician/models/${brandSlug}?category=${category}&page=${page}&limit=${limit}`, { next: { revalidate: 3600 } })
    if (res.ok) {
      const json = await res.json()
      if (json.success) return json
    }
  } catch (err) {
    console.warn('[technicianService] API error getModelsByBrand:', err.message)
  }
  return { success: false, pagination: { totalItems: 0, currentPage: 1, totalPages: 1 }, data: [] }
}

export async function getModelDetail(category = 'hp', brandSlug, slug) {
  try {
    const res = await fetch(`${getApiBaseUrl()}/technician/detail/${brandSlug}/${slug}?category=${category}`, { next: { revalidate: 1800 } })
    if (res.ok) {
      const json = await res.json()
      if (json.success && json.data) return json.data
    }
  } catch (err) {
    // API backend offline, gunakan fallback sharded lokal
  }

  // Fallback membaca langsung dari file partisi sharded lokal
  try {
    const cleanBrand = (brandSlug || '').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    const partition = require(`../content/technician/brands/${category}_${cleanBrand}.json`)
    if (partition && partition.models) {
      const matched = partition.models.find(m => m.slug === slug)
      if (matched) return matched
    }
  } catch (_) {}

  return null
}

export async function searchTechnicianCatalog(query, category = null, limit = 50) {
  try {
    const catParam = category ? `&category=${category}` : ''
    const res = await fetch(`${getApiBaseUrl()}/technician/search?q=${encodeURIComponent(query)}${catParam}&limit=${limit}`, { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.success) return json.data
    }
  } catch (err) {
    console.warn('[technicianService] API error searchTechnicianCatalog:', err.message)
  }
  return []
}

export async function getDownloadFileDetail(fileId) {
  try {
    const res = await fetch(`${getApiBaseUrl()}/technician/download/${fileId}`, { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.success) return json.data
    }
  } catch (err) {
    console.warn('[technicianService] API error getDownloadFileDetail:', err.message)
  }
  return null
}

export async function getErrorCodes(query = '') {
  try {
    const res = await fetch(`${getApiBaseUrl()}/technician/errors?q=${encodeURIComponent(query)}`, { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.success) return json.data
    }
  } catch (err) {
    console.warn('[technicianService] API error getErrorCodes:', err.message)
  }
  return []
}

export async function verifyVipLicense(licenseKey) {
  try {
    const res = await fetch(`${getApiBaseUrl()}/technician/verify-license`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ licenseKey })
    })
    const json = await res.json()
    return json
  } catch (err) {
    return { success: false, message: 'Gagal terhubung ke server lisensi.' }
  }
}
