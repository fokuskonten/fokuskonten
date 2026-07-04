import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="container-page text-center">
        <div className="mb-8">
          <span className="text-8xl sm:text-9xl font-display font-black text-gradient-brand">404</span>
        </div>
        <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-4">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-neutral-500 text-base max-w-md mx-auto mb-8">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan. Kembali ke beranda untuk melanjutkan.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm text-white bg-gradient-brand hover:shadow-lg hover:shadow-brand-500/25 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  )
}
