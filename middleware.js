import { NextResponse } from 'next/server'
import routes from './content/ebook/routes.json'

// Index SKU map untuk pencarian O(1)
const skuMap = new Map()
for (const r of routes) {
  if (r && r.s) {
    skuMap.set(r.s.toLowerCase(), { category: r.c, slug: r.u })
  }
}

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Cek jika rute mengarah ke /toko-digital/detail/:sku atau /toko-digital/:sku
  const matchDetail = pathname.match(/^\/toko-digital\/detail\/([^\/]+)\/?$/i)
  const matchProduct = pathname.match(/^\/toko-digital\/([^\/]+)\/?$/i)

  const rawSku = matchDetail ? matchDetail[1] : matchProduct ? matchProduct[1] : null

  if (rawSku) {
    const cleanSku = rawSku.toLowerCase().trim()
    // Kecualikan IDEB00 (Mega bundle) dan halaman landing toko digital
    if (cleanSku !== 'ideb00' && cleanSku !== 'detail' && skuMap.has(cleanSku)) {
      const target = skuMap.get(cleanSku)
      const targetUrl = new URL(`/ebook/${target.category}/${target.slug}/`, request.url)
      return NextResponse.redirect(targetUrl, 301)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/toko-digital/:path*']
}
