/**
 * adblockDetector.js — Utilitas Deteksi Pemblokir Iklan (Adblocker) di Sisi Klien
 * Menggunakan teknik ganda (DOM Bait + Network Probe) untuk akurasi tinggi.
 */

export async function detectAdBlocker() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }

  // 1. DOM Bait Probe
  try {
    const bait = document.createElement('div')
    bait.className = 'adsbygoogle ad-banner pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ad-links'
    bait.style.position = 'absolute'
    bait.style.left = '-9999px'
    bait.style.top = '-9999px'
    bait.style.width = '1px'
    bait.style.height = '1px'
    bait.setAttribute('aria-hidden', 'true')
    document.body.appendChild(bait)

    const computed = window.getComputedStyle(bait)
    const isDomBlocked = computed.getPropertyValue('display') === 'none' ||
      bait.offsetHeight === 0 ||
      computed.getPropertyValue('visibility') === 'hidden'

    document.body.removeChild(bait)

    if (isDomBlocked) return true
  } catch (_) {}

  // 2. Network Bait Probe (Mencegat script Google Ads standar)
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 1500)

    await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    return false
  } catch (err) {
    // Jika diblokir oleh ekstensi browser (net::ERR_BLOCKED_BY_CLIENT)
    return true
  }
}
