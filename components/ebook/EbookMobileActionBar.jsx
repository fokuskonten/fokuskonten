'use client'

/**
 * EbookMobileActionBar.jsx — Floating Bottom Action Bar Khusus Layar Ponsel (sm:hidden)
 * Menyajikan tombol unduh gratis dan traktir kopi tepat dalam jangkauan jempol pembaca.
 * Bebas Emoji & Patuh Pilar 3 STANDAR_UI_WEB_OFFICIAL.md
 */
export default function EbookMobileActionBar({ ebook, onOpenTraktir, onScrollToDownload }) {
  if (!ebook) return null

  return (
    <aside
      aria-label="Aksi Cepat Unduhan Mobile"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-white text-neutral-900 dark:text-neutral-900 backdrop-blur-md border-t border-neutral-200 px-3 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
    >
      <div className="max-w-md mx-auto flex items-center gap-2">
        {/* Tombol 1: Unduh Gratis (Safelink) */}
        <button
          type="button"
          onClick={onScrollToDownload}
          className="flex-1 py-2.5 px-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-bold text-xs border border-neutral-300 font-mono tracking-wider uppercase text-center transition-colors truncate flex items-center justify-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Unduh Gratis</span>
        </button>

        {/* Tombol 2: Traktir Kopi Rp 2.000 */}
        <button
          type="button"
          onClick={() => onOpenTraktir && onOpenTraktir(ebook)}
          className="flex-1 py-2.5 px-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs font-mono tracking-wider uppercase text-center transition-colors shadow-sm flex items-center justify-center gap-1.5 truncate"
        >
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
          </svg>
          <span>Traktir Rp 2rb</span>
        </button>
      </div>
    </aside>
  )
}
