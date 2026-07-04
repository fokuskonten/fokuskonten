import Link from 'next/link'

export const metadata = {
  title: 'Coming Soon',
  description: 'Halaman ini akan segera tersedia.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas-100 px-4">
      <div className="text-center max-w-md animate-fade-up">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-maroon-700" style={{ background: 'rgba(140,31,31,0.06)' }}>
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="font-display font-semibold text-2xl text-charcoal-900 mb-3">
          Coming Soon
        </h1>
        <p className="text-charcoal-500 text-sm leading-relaxed mb-8">
          Halaman ini sedang dalam pengembangan dan akan segera tersedia. Pantau update terbaru kami.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary px-6 py-3">
            Kembali ke Beranda
          </Link>
          <a
            href="https://youtube.com/@fokuskonten"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-6 py-3"
          >
            Ikuti Update
          </a>
        </div>
      </div>
    </div>
  )
}
