import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const posts = [
  {
    title: 'Memulai Pengembangan Aplikasi Android dengan Kotlin',
    excerpt: 'Panduan lengkap untuk memulai development Android native menggunakan Kotlin dan Android Studio.',
    date: '1 Juli 2026',
    category: 'Android Dev',
    readTime: '5 menit',
    gradient: 'from-accent-500/10 to-accent-700/5',
    border: 'border-accent-500/20',
  },
  {
    title: 'Tips Fotografi Produk untuk E-Commerce',
    excerpt: 'Teknik dasar fotografi produk yang bisa meningkatkan nilai jual dan konversi di toko online.',
    date: '25 Juni 2026',
    category: 'Fotografi',
    readTime: '4 menit',
    gradient: 'from-pink-500/10 to-rose-700/5',
    border: 'border-pink-500/20',
  },
  {
    title: 'Strategi Konten Media Sosial 2026',
    excerpt: 'Cara menyusun strategi konten yang efektif untuk meningkatkan engagement dan reach organik.',
    date: '18 Juni 2026',
    category: 'Content Creator',
    readTime: '6 menit',
    gradient: 'from-yellow-500/10 to-orange-700/5',
    border: 'border-yellow-500/20',
  },
  {
    title: 'Desain UI/UX untuk Aplikasi Android',
    excerpt: 'Prinsip desain antarmuka yang baik untuk menciptakan pengalaman pengguna yang optimal.',
    date: '10 Juni 2026',
    category: 'Creative Digital',
    readTime: '7 menit',
    gradient: 'from-vibrant-500/10 to-vibrant-700/5',
    border: 'border-vibrant-500/20',
  },
  {
    title: 'Mengoptimalkan Performa Aplikasi Android',
    excerpt: 'Tips dan trik untuk meningkatkan performa aplikasi Android agar lebih ringan dan responsif.',
    date: '2 Juni 2026',
    category: 'Android Dev',
    readTime: '5 menit',
    gradient: 'from-accent-500/10 to-accent-700/5',
    border: 'border-accent-500/20',
  },
  {
    title: 'Editing Video dengan Premiere Pro untuk Pemula',
    excerpt: 'Langkah-langkah dasar editing video menggunakan Adobe Premiere Pro untuk content creator pemula.',
    date: '25 Mei 2026',
    category: 'Videografi',
    readTime: '8 menit',
    gradient: 'from-pink-500/10 to-rose-700/5',
    border: 'border-pink-500/20',
  },
]

export const metadata = {
  title: 'Blog',
  description: 'Blog FokusKonten — Artikel tentang Android Development, Creative Digital, Fotografi, Videografi, dan Content Creator.',
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
          <div className="container-custom section-padding">
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase">Blog</span>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white text-balance">
                Artikel & <span className="gradient-text">Konten</span>
              </h1>
              <p className="mt-4 text-dark-200">
                Berbagai artikel seputar Android development, desain kreatif, fotografi, videografi, dan strategi konten.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <article
                  key={index}
                  className={`relative rounded-2xl overflow-hidden border ${post.border} bg-gradient-to-br ${post.gradient} p-6 hover-lift group cursor-pointer`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-accent-400 bg-accent-500/10 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-dark-300">{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-display font-semibold text-white mb-2 group-hover:text-accent-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-dark-200 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark-300">{post.date}</span>
                    <span className="text-xs text-accent-400 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Baca <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="text-dark-300 text-sm">
                Artikel lainnya akan segera hadir. Pantau terus FokusKonten untuk konten terbaru.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
