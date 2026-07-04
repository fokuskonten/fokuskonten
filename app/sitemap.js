import portfolioData from '../content/portfolio/portfolio.json'
import postsData    from '../content/blog/posts.json'

export default function sitemap() {
  const baseUrl = 'https://fokuskonten.my.id'

  const staticPages = [
    { url: baseUrl,                        lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/about`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/portfolio`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/blog`,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${baseUrl}/contact`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`,    lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const portfolioPages = portfolioData.map(item => ({
    url: `${baseUrl}/portfolio/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const blogPages = postsData.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...portfolioPages, ...blogPages]
}
