import Link from 'next/link'

export const metadata = {
  title: 'Terima Kasih',
  description: 'Pesan Anda telah terkirim. Tim FokusKonten akan segera merespon.',
}

export default function ThankYouPage() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="container-page text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-4">
          Terima Kasih!
        </h1>
        <p className="text-neutral-500 text-base max-w-md mx-auto mb-8">
          Pesan Anda telah berhasil dikirim. Tim FokusKonten akan segera menghubungi Anda melalui WhatsApp.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm text-white bg-gradient-brand hover:shadow-lg hover:shadow-brand-500/25 transition-all"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/aplikasi"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm text-neutral-700 bg-white border border-neutral-200 hover:border-brand-200 hover:text-brand-600 transition-all"
          >
            Jelajahi Aplikasi
          </Link>
        </div>
      </div>
    </section>
  )
}
