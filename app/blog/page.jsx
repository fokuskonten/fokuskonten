import Link from 'next/link'
import postsData from '@/content/blog/posts.json'

export const metadata = {
  title: 'Blog & Artikel Digital — FokusKonten',
  description: 'Artikel, wawasan, dan panduan seputar Android development, desain grafis, fotografi, dan teknologi kreatif dari FokusKonten.',
  alternates: { canonical: 'https://fokuskonten.my.id/blog' },
}

export default function BlogPage() {
  return (
    <section className="pt-28 sm:pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container-page max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="label-brand mb-3 inline-block">Wawasan &amp; Edukasi</span>
          <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-3">
            Artikel &amp; <span className="text-gradient-brand">Panduan Kreatif</span>
          </h1>
          <p className="text-neutral-500 text-sm sm:text-base max-w-xl mx-auto">
            Kumpulan artikel dan panduan praktis dari studio FokusKonten seputar teknologi, desain, dan pengembangan konten.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {postsData.map((post) => (
            <div
              key={post.slug}
              className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 font-semibold text-[11px]">
                    {post.category}
                  </span>
                  <span>{post.readTime || '5 menit'}</span>
                </div>
                <h2 className="font-display font-bold text-lg text-neutral-900 mb-2 hover:text-indigo-600 transition-colors">
                  <Link href={'/blog/' + post.slug}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-400">{post.date}</span>
                <Link
                  href={'/blog/' + post.slug}
                  className="font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
                >
                  Baca Selengkapnya &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
