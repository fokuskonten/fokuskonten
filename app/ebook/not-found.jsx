import Link from 'next/link'

/**
 * app/ebook/not-found.jsx — Halaman 404 Khusus Direktori E-Book
 */
export default function EbookNotFound() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-neutral-900 dark:bg-[#f8fafc] dark:text-neutral-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white dark:bg-white text-neutral-900 dark:text-neutral-900 border border-neutral-200 rounded-2xl p-8 shadow-sm space-y-4">
        <span className="px-3 py-1 rounded bg-neutral-100 text-neutral-800 text-xs font-mono font-bold tracking-widest uppercase">
          KODE 404 &bull; E-BOOK
        </span>
        
        <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-950 font-sans">
          Naskah E-Book Tidak Ditemukan
        </h1>

        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
          Judul e-book yang Anda cari mungkin telah dipindahkan atau tautan yang Anda tuju sudah diperbarui ke format direktori baru.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/ebook/"
            className="py-2.5 px-5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors inline-block"
          >
            Pusat Direktori E-Book
          </Link>
          <Link
            href="/toko-digital/"
            className="py-2.5 px-5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-mono font-bold text-xs uppercase tracking-wider transition-colors inline-block border border-neutral-300"
          >
            Katalog Toko Digital
          </Link>
        </div>
      </div>
    </main>
  )
}
