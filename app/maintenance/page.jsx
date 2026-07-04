import Link from 'next/link'

export const metadata = {
  title: 'Maintenance',
  description: 'Website sedang dalam pemeliharaan.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas-100 px-4">
      <div className="text-center max-w-md animate-fade-up">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-maroon-700" style={{ background: 'rgba(140,31,31,0.06)' }}>
          <svg className="w-10 h-10 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h1 className="font-display font-semibold text-2xl text-charcoal-900 mb-3">
          Under Maintenance
        </h1>
        <p className="text-charcoal-500 text-sm leading-relaxed mb-8">
          Website sedang dalam pemeliharaan untuk meningkatkan pengalaman Anda. Kami akan kembali segera.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://youtube.com/@fokuskonten"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-charcoal-500 hover:text-maroon-700 hover:bg-maroon-50 transition-all"
            style={{ border: '1px solid rgba(0,0,0,0.06)' }}
            aria-label="YouTube"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a
            href="https://instagram.com/fokuskonten"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-charcoal-500 hover:text-maroon-700 hover:bg-maroon-50 transition-all"
            style={{ border: '1px solid rgba(0,0,0,0.06)' }}
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
