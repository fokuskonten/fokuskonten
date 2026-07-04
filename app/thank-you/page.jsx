import Link from 'next/link'

export const metadata = {
  title: 'Thank You',
  description: 'Terima kasih telah menghubungi FokusKonten.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas-100 px-4">
      <div className="text-center max-w-md animate-fade-up">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-maroon-700" style={{ background: 'rgba(140,31,31,0.06)' }}>
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="font-display font-semibold text-2xl text-charcoal-900 mb-3">
          Terima Kasih!
        </h1>
        <p className="text-charcoal-500 text-sm leading-relaxed mb-8">
          Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda dalam 1-2 hari kerja.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary px-6 py-3">
            Kembali ke Beranda
          </Link>
          <a
            href="https://wa.me/6285183011318"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-6 py-3"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
