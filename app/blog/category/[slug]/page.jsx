import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import postsData from '@/content/blog/posts.json'

export async function generateStaticParams() {
  const categories = [...new Set(postsData.map(post => post.category.toLowerCase()))]
  return categories.map((category) => ({
    slug: category,
  }))
}

export async function generateMetadata({ params }) {
  return {
    title: `Category: ${params.slug}`,
    description: `Artikel kategori ${params.slug} di blog FokusKonten.`,
    alternates: {
      canonical: `https://fokuskonten.my.id/blog/category/${params.slug}`,
    },
  }
}

export default function CategoryPage({ params }) {
  const categoryPosts = postsData.filter(post => post.category.toLowerCase() === params.slug.toLowerCase())

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
              <span className="section-label">Category</span>
              <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                {params.slug}
              </h1>
              <p className="text-charcoal-500 text-sm">
                {categoryPosts.length} artikel
              </p>
            </div>
          </div>
        </section>

        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-4">
              {categoryPosts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-charcoal-500 text-sm">Tidak ada artikel di kategori ini</p>
                </div>
              ) : (
                categoryPosts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white border border-black/[0.04] rounded-2xl shadow-subtle hover:shadow-mature hover:-translate-y-0.5 transition-all duration-300 gap-4 group animate-fade-up"
                  >
                    <div className="flex items-start gap-5">
                      <span className="font-display font-bold text-2xl text-charcoal-300 group-hover:text-maroon-200 transition-colors mt-0.5 shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <span className="badge text-xs mb-2">{post.category}</span>
                        <h3 className="font-display font-semibold text-charcoal-800 group-hover:text-maroon-700 transition-colors duration-200 text-base">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 pl-9 sm:pl-0">
                      <span className="text-charcoal-400 text-xs">{post.readTime}</span>
                      <svg className="w-4 h-4 text-charcoal-400 group-hover:text-maroon-700 group-hover:translate-x-0.5 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
