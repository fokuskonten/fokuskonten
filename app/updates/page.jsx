import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Updates',
  description: 'Update dan changelog layanan dan produk FokusKonten.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/updates',
  },
}

export default function UpdatesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        
        <section className="section border-t border-black/[0.04] bg-canvas-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <span className="section-label">Updates</span>
              <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Update <span className="text-maroon-gradient">Center</span>
              </h1>
              <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed">
                Changelog dan update terbaru untuk layanan dan produk FokusKonten.
              </p>
            </div>
          </div>
        </section>

        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="animate-fade-up">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-maroon-700 text-white text-xs font-medium rounded-full">v1.0.0</span>
                  <span className="text-sm text-charcoal-400">4 Juli 2026</span>
                </div>
                <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-3">
                  Website Resmi Diluncurkan
                </h2>
                <ul className="space-y-2 text-sm text-charcoal-600">
                  <li className="flex items-start gap-2">
                    <span className="text-maroon-700 mt-1">✓</span>
                    <span>Peluncuran website resmi FokusKonten dengan desain modern dan responsif</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-maroon-700 mt-1">✓</span>
                    <span>Integrasi layanan Android Development, Creative Digital, Fotografi & Videografi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-maroon-700 mt-1">✓</span>
                    <span>Portfolio dan blog dengan konten edukatif</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-black/[0.06] pt-8 animate-fade-up delay-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-charcoal-100 text-charcoal-600 text-xs font-medium rounded-full">v0.9.0</span>
                  <span className="text-sm text-charcoal-400">25 Juni 2026</span>
                </div>
                <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-3">
                  Beta Testing
                </h2>
                <ul className="space-y-2 text-sm text-charcoal-600">
                  <li className="flex items-start gap-2">
                    <span className="text-maroon-700 mt-1">✓</span>
                    <span>Pengujian fitur dan optimasi performa website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-maroon-700 mt-1">✓</span>
                    <span>Validasi SEO dan aksesibilitas</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-black/[0.06] pt-8 animate-fade-up delay-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-charcoal-100 text-charcoal-600 text-xs font-medium rounded-full">v0.5.0</span>
                  <span className="text-sm text-charcoal-400">15 Mei 2026</span>
                </div>
                <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-3">
                  Development Phase
                </h2>
                <ul className="space-y-2 text-sm text-charcoal-600">
                  <li className="flex items-start gap-2">
                    <span className="text-maroon-700 mt-1">✓</span>
                    <span>Pengembangan struktur website dan komponen dasar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-maroon-700 mt-1">✓</span>
                    <span>Integrasi sistem konten dan portfolio</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
