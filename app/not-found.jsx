import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Halaman Tidak Ditemukan',
  description: 'Halaman yang Anda cari tidak ditemukan.',
}

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4" aria-label="Halaman tidak ditemukan">
        <div className="text-center max-w-md animate-fade-up">
          {/* 404 Display */}
          <div
            className="font-display font-black text-[8rem] sm:text-[10rem] leading-none mb-4 select-none"
            style={{
              background: 'linear-gradient(135deg, rgba(140, 31, 31, 0.12) 0%, rgba(140, 31, 31, 0.05) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            aria-hidden="true"
          >
            404
          </div>

          <div className="maroon-line mx-auto mb-6" aria-hidden="true" />
          <h1 className="font-display font-bold text-2xl text-charcoal-900 mb-3 animate-fade-up delay-100">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-charcoal-500 text-sm leading-relaxed mb-8 animate-fade-up delay-200">
            Halaman yang Anda cari tidak tersedia atau sudah dipindahkan. Kembali ke halaman utama untuk melanjutkan.
          </p>
          <div className="flex items-center justify-center gap-3 animate-fade-up delay-300">
            <Link href="/" className="btn-primary text-sm hover:scale-[1.02] transition-transform">
              Ke Beranda
            </Link>
            <Link href="/contact" className="btn-secondary text-sm hover:scale-[1.02] transition-transform">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
