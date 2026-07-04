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
        <div className="text-center max-w-md">
          {/* 404 Display */}
          <div
            className="font-display font-black text-[8rem] sm:text-[10rem] leading-none mb-4 select-none"
            style={{
              background: 'linear-gradient(135deg, rgba(197,168,128,0.12) 0%, rgba(197,168,128,0.06) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            aria-hidden="true"
          >
            404
          </div>

          <div className="copper-line mx-auto mb-6" aria-hidden="true" />
          <h1 className="font-display font-bold text-2xl text-ivory-50 mb-3">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-ink-400 text-sm leading-relaxed mb-8">
            Halaman yang Anda cari tidak tersedia atau sudah dipindahkan. Kembali ke halaman utama untuk melanjutkan.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/" className="btn-primary text-sm">
              Ke Beranda
            </Link>
            <Link href="/contact" className="btn-secondary text-sm">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
