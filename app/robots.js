export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: 'Googlebot', allow: '/' },
    ],
    sitemap: 'https://fokuskonten.my.id/sitemap.xml',
  }
}
