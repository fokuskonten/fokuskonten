'use client'

/**
 * EbookSneakPeekReader.jsx — Cuplikan Pembaca Bab 1 In-Browser & Curiosity Gap
 * Menyajikan cuplikan naskah bab pembuka, kutipan pengarang, dan daftar isi terstruktur.
 */
export default function EbookSneakPeekReader({ ebook, onScrollToDownload }) {
  if (!ebook) return null

  const quote = ebook.quote
  const sneakPeek = ebook.sneakPeekText || ''
  const curiosityHook = ebook.curiosityHook || ''
  const tableOfContents = Array.isArray(ebook.tableOfContents) ? ebook.tableOfContents : []

  return (
    <section aria-labelledby="sneak-peek-heading" className="space-y-6">
      {/* 1. Kotak Kutipan Mutiara Pengarang (Jika Tersedia) */}
      {quote && (
        <blockquote className="relative p-5 sm:p-6 rounded-2xl bg-neutral-50 border-l-4 border-neutral-950 text-neutral-800 italic font-serif text-sm sm:text-base leading-relaxed shadow-xs">
          <div className="absolute top-2 left-3 text-neutral-300 font-serif text-4xl -z-0 select-none opacity-40">
            &ldquo;
          </div>
          <p className="relative z-10 font-medium">
            {quote}
          </p>
          {ebook.authorDisplay && (
            <cite className="block mt-2 text-xs font-mono font-semibold text-neutral-600 not-italic">
              — {ebook.authorDisplay}
            </cite>
          )}
        </blockquote>
      )}

      {/* 2. Lembaran Baca Bab 1 (In-Browser Reader) */}
      <div className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-950" />
            <h2 id="sneak-peek-heading" className="font-extrabold text-base sm:text-lg tracking-tight text-neutral-950 font-sans">
              Cuplikan Baca: Bab 1 Pembuka
            </h2>
          </div>
          <span className="px-3 py-1 rounded bg-neutral-100 text-neutral-800 text-xs font-mono font-bold tracking-wider uppercase">
            PRATINJAU LEGAL (FAIR USE)
          </span>
        </div>

        {/* Naskah Cuplikan — Tipografi Buku Nyaman Dibaca (Proporsional & Presisi) */}
        <div className="mt-6 text-sm sm:text-[15px] leading-[1.8] text-neutral-700 space-y-4 font-sans">
          {sneakPeek ? (
            <p className="whitespace-pre-line text-neutral-800">
              {sneakPeek}
            </p>
          ) : (
            <p className="italic text-neutral-500 font-sans text-sm sm:text-base">
              Cuplikan bab pembuka sedang disinkronisasi ke katalog bacaan.
            </p>
          )}
        </div>

        {/* Curiosity Gap Cliffhanger Hook */}
        {curiosityHook && (
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm sm:text-base text-neutral-800 leading-relaxed font-sans">
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-950 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="space-y-2">
                <strong className="block font-extrabold text-neutral-950 text-base sm:text-lg">
                  Penasaran dengan Kelanjutan Naskah Lengkapnya?
                </strong>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
                  {curiosityHook}
                </p>
                {onScrollToDownload && (
                  <button
                    type="button"
                    onClick={onScrollToDownload}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-xs"
                  >
                    <span>Buka Tautan Unduhan Lengkap</span>
                    <span>&darr;</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Daftar Isi / Struktur Bab */}
      {tableOfContents.length > 0 && (
        <div className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <h3 className="font-extrabold text-base sm:text-lg tracking-tight text-neutral-950 font-sans">
              Daftar Bab &amp; Struktur Naskah
            </h3>
            <span className="text-xs sm:text-sm font-mono text-neutral-600 font-bold">
              {tableOfContents.length} Bab Terstruktur
            </span>
          </div>

          <div className="mt-4 divide-y divide-neutral-100">
            {tableOfContents.map((item, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-900 font-mono font-bold text-xs sm:text-sm flex items-center justify-center shrink-0">
                    {item.chapter || idx + 1}
                  </span>
                  <span className="font-semibold text-neutral-900 text-sm sm:text-base line-clamp-1">
                    {item.title}
                  </span>
                </div>
                <span className={`px-2.5 py-1 rounded text-xs font-mono font-semibold shrink-0 ${
                  item.status?.includes('Sudah')
                    ? 'bg-neutral-200 text-neutral-900'
                    : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {item.status || 'Tersedia di E-Book'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
