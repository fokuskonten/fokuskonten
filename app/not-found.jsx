import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-8xl sm:text-9xl font-display font-bold gradient-text">404</div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-display font-bold text-white">Halaman Tidak Ditemukan</h1>
          <p className="mt-3 text-dark-200 max-w-md mx-auto">
            Halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-500 to-vibrant-600 text-white font-semibold hover:shadow-xl hover:shadow-vibrant-500/25 transition-all duration-300"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
