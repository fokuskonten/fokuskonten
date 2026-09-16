/**
 * quarantineHelper.js — Pemeriksa Status Karantina Berkas Non-PCB & Foto Iklan Komersial
 * Menjamin tidak ada foto iklan komersial HP atau motor yang lolos ke penampil skema teknisi
 */
import quarantinedData from '../content/technician/quarantined_files.json'

const blacklistedSet = new Set(
  (quarantinedData.blacklisted_file_names || []).map(f => f.toLowerCase())
)

export function isImageQuarantined(fileName) {
  if (!fileName) return false
  const clean = fileName.toLowerCase().trim()
  if (blacklistedSet.has(clean)) return true
  
  // Periksa variasi ekstensi
  const noExt = clean.replace(/\.(webp|jpg|jpeg|png)$/i, '')
  if (blacklistedSet.has(`${noExt}.webp`)) return true
  if (blacklistedSet.has(`${noExt}.jpg`)) return true
  if (blacklistedSet.has(`${noExt}.png`)) return true

  return false
}
