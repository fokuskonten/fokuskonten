import Link from 'next/link'
import { notFound } from 'next/navigation'
import postsData from '@/content/blog/posts.json'
import postsContent from '@/content/blog/content.js'

export async function generateStaticParams() {
  return postsData.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const post = postsData.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — FokusKonten`,
    description: post.excerpt,
    alternates: { canonical: `https://fokuskonten.my.id/blog/${post.slug}` },
  }
}

export default function BlogDetailPage({ params }) {
  const post = postsData.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const htmlContent = postsContent[post.slug]

  return (
    <section className="pt-28 sm:pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white">
      <article className="container-page max-w-3xl mx-auto px-4 sm:px-6">
        {/* Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-neutral-800 truncate max-w-[200px]">{post.title}</span>
        </div>

        {/* Header */}
        <header className="mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 font-semibold text-xs mb-3">
            {post.category}
          </div>
          <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-3 text-balance">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime || '5 menit baca'}</span>
            <span>•</span>
            <span>Oleh {post.author || 'FokusKonten'}</span>
          </div>
        </header>

        {/* Lead Excerpt */}
        <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100/80 mb-8 text-neutral-700 text-sm sm:text-base leading-relaxed">
          {post.excerpt}
        </div>

        {/* Content Body */}
        {htmlContent ? (
          <div
            className="prose prose-neutral max-w-none text-neutral-700 text-sm sm:text-base leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ) : (
          <div className="text-neutral-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Artikel ini membahas tentang <strong>{post.title}</strong> dalam konteks {post.category}. FokusKonten terus berkomitmen menyajikan tutorial, standar rekayasa software terbaik, dan aset kreatif berkualitas bagi para kreator dan praktisi digital di Indonesia.
            </p>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 pt-4 border-t border-neutral-200">
                <span className="text-xs font-semibold text-neutral-500 mr-2">Topik Terkait:</span>
                <div className="inline-flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <span key={t} className="text-[11px] px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-600">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Call to Action Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-lg text-white mb-1">
              Butuh Software atau Aset Kreatif?
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm">
              Jelajahi produk digital siap pakai atau konsultasikan kebutuhan pembuatan aplikasi Anda.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/toko-digital"
              className="px-4 py-2.5 rounded-xl bg-white text-neutral-900 font-semibold text-xs hover:bg-neutral-100 transition-all"
            >
              Toko Digital
            </Link>
            <Link
              href="/aplikasi"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition-all"
            >
              Katalog Aplikasi
            </Link>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            &larr; Kembali ke Daftar Artikel
          </Link>
        </div>
      </article>
    </section>
  )
}
