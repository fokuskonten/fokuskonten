/**
 * validators.js - FokusKonten Form Validation Utilities
 * Validasi ketat untuk email Gmail (akses Google Drive) dan nomor WhatsApp.
 */

export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email.trim().toLowerCase())
}

export function isValidGmail(email) {
  if (!isValidEmail(email)) return false
  const cleaned = email.trim().toLowerCase()
  // Rekomendasi utama @gmail.com atau @googlemail.com untuk integrasi Google Drive tanpa hambatan
  return cleaned.endsWith('@gmail.com') || cleaned.endsWith('@googlemail.com')
}

export function isValidWhatsApp(phone) {
  if (!phone || typeof phone !== 'string') return false
  const digits = phone.replace(/\D/g, '')
  // Nomor HP Indonesia minimal 10 digit, maksimal 14 digit
  return (digits.startsWith('08') && digits.length >= 10 && digits.length <= 14) ||
         (digits.startsWith('628') && digits.length >= 11 && digits.length <= 15)
}

export function normalizeWhatsApp(phone) {
  if (!phone) return ''
  let digits = phone.replace(/\D/g, '')
  if (digits.startsWith('08')) {
    digits = '62' + digits.substring(1)
  }
  return digits
}
