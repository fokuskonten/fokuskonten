import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import postsData from '@/content/blog/posts.json'

export const metadata = {
  title: 'Archives',
  description: 'Arsip semua artikel blog FokusKonten.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/blog/archives',
  },
}

export default function ArchivesPage() {
  const groupedByMonth = postsData.reduce((acc, post) => {
    const date = new Date(post.date)
    const monthKey = date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })
    if (!acc[monthKey]) acc[monthKey] = []
    acc[monthKey].push(post)
    return acc
  }, {})

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        
        <section className="section border-t border-black/[0.04] bg-canvas-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <Link href="/blog" className="text-charcoal-400 text-sm hover:text-maroon-700 transition-colors inline-flex items-center gap-2 mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Kembali ke Blog
              </Link>
              <span className="section-label">Archives</span>
              <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Arsip <span className="text-maroon-gradient">Blog</span>
              </h1>
              <p className="text-charcoal-500 text-sm">
                {postsData.length} artikel total
              </p>
            </div>
          </div>
        </section>

        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-10">
              {Object.entries(groupedByMonth).map(([month, posts]) => (
                <div key={month} className="animate-fade-up">
                  <h2 className="font-display font-semibold text-lg text-charcoal-900 mb-4">
                    {month}
                  </h2>
                  <div className="space-y-3">
                    {posts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="flex items-center justify-between p-4 bg-white border border-black/[0.04] rounded-xl hover:border-maroon-700/20 transition-all group"
                      >
                        <div>
                          <h3 className="font-display font-medium text-charcoal-900 group-hover:text-maroon-700 transition-colors text-sm">
                            {post.title}
                          </h3>
                          <p className="text-charcoal-400 text-xs mt-1">{post.category}</p>
                        </div>
                        <span className="text-charcoal-400 text-xs">{post.readTime}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
