import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'News',
  description: 'Berita dan update terbaru dari FokusKonten.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/news',
  },
}

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        
        <section className="section border-t border-black/[0.04] bg-canvas-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <span className="section-label">News</span>
              <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Berita <span className="text-maroon-gradient">Terbaru</span>
              </h1>
              <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed">
                Update terbaru tentang proyek, layanan, dan perkembangan FokusKonten.
              </p>
            </div>
          </div>
        </section>

        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="p-6 bg-white rounded-2xl border border-black/[0.05] shadow-mature hover:shadow-elevated transition-all duration-300 animate-fade-up">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs text-maroon-700 font-medium bg-maroon-50 px-3 py-1 rounded-full">Juli 2026</span>
                  <span className="text-xs text-charcoal-400">4 Juli 2026</span>
                </div>
                <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-3">
                  Website Resmi FokusKonten Diluncurkan
                </h2>
                <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
                  FokusKonten dengan bangga mengumumkan peluncuran website resmi kami. Website ini dirancang untuk memberikan informasi lengkap tentang layanan, portfolio, dan blog kami. Pengunjung dapat dengan mudah mengakses informasi tentang Android Development, Creative Digital, Fotografi & Videografi, dan Content Creation.
                </p>
                <Link href="/blog" className="text-maroon-700 text-sm font-medium hover:underline">
                  Baca selengkapnya →
                </Link>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-black/[0.05] shadow-mature hover:shadow-elevated transition-all duration-300 animate-fade-up delay-100">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs text-maroon-700 font-medium bg-maroon-50 px-3 py-1 rounded-full">Juni 2026</span>
                  <span className="text-xs text-charcoal-400">25 Juni 2026</span>
                </div>
                <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-3">
                  Ekspansi Layanan Fotografi Produk
                </h2>
                <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
                  FokusKonten memperluas layanan fotografi produk untuk mendukung UMKM dan bisnis online yang membutuhkan foto produk berkualitas tinggi untuk meningkatkan penjualan di marketplace dan e-commerce.
                </p>
                <Link href="/services" className="text-maroon-700 text-sm font-medium hover:underline">
                  Pelajari layanan →
                </Link>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-black/[0.05] shadow-mature hover:shadow-elevated transition-all duration-300 animate-fade-up delay-200">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs text-maroon-700 font-medium bg-maroon-50 px-3 py-1 rounded-full">Mei 2026</span>
                  <span className="text-xs text-charcoal-400">15 Mei 2026</span>
                </div>
                <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-3">
                  Kolaborasi dengan Local Business
                </h2>
                <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
                  FokusKonten memulai kolaborasi dengan beberapa bisnis lokal untuk menyediakan solusi digital terintegrasi, mulai dari pengembangan aplikasi hingga strategi konten media sosial.
                </p>
                <Link href="/portfolio" className="text-maroon-700 text-sm font-medium hover:underline">
                  Lihat portfolio →
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
