'use client'

import { useState } from 'react'

/**
 * EbookSneakPeekReader.jsx — Cuplikan Pembaca Bab 1 In-Browser & Struktur Naskah
 * Menyajikan lembar baca naskah pembuka dengan fitur expandable, kutipan pengarang, dan daftar isi terstruktur.
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md (Anti-Nested Card, Zero-Icon Amatir, Monokrom Baku).
 */
export default function EbookSneakPeekReader({ ebook }) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!ebook) return null

  const quote = ebook.quote
  const sneakPeek = ebook.sneakPeekText || ''
  const tableOfContents = Array.isArray(ebook.tableOfContents) ? ebook.tableOfContents : []
  const isLongSneakPeek = sneakPeek.length > 350

  return (
    <section aria-labelledby="sneak-peek-heading" className="space-y-8">
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
      <div className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-950" />
            <h2 id="sneak-peek-heading" className="font-extrabold text-base sm:text-lg tracking-tight text-neutral-950 font-sans">
              Cuplikan Baca: Bab 1 Pembuka
            </h2>
          </div>
          <span className="px-3 py-1 rounded bg-neutral-100 text-neutral-800 text-xs font-mono font-bold tracking-wider uppercase border border-neutral-200">
            PRATINJAU LEGAL (FAIR USE)
          </span>
        </div>

        {/* Naskah Cuplikan — Tipografi Nyaman & Expandable */}
        <div className="relative">
          <div
            className={`text-sm sm:text-[15px] leading-[1.8] text-neutral-800 font-sans whitespace-pre-line transition-all duration-300 ${
              isLongSneakPeek && !isExpanded ? 'max-h-72 overflow-hidden' : 'max-h-none'
            }`}
          >
            {sneakPeek || 'Cuplikan bab pembuka sedang disinkronisasi ke katalog bacaan.'}
          </div>

          {/* Fade Gradient Overlay saat Cuplikan Diringkas */}
          {isLongSneakPeek && !isExpanded && (
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
          )}
        </div>

        {/* Tombol Aksi Expand / Ringkas Cuplikan */}
        {isLongSneakPeek && (
          <div className="pt-2 flex justify-center border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-6 py-2.5 rounded-xl border border-neutral-300 hover:border-neutral-950 bg-neutral-100 hover:bg-neutral-950 text-neutral-900 hover:text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <span>{isExpanded ? 'Ringkas Cuplikan Naskah' : 'Baca Cuplikan Selengkapnya'}</span>
              <span className="text-sm font-mono">{isExpanded ? '↑' : '↓'}</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. Daftar Isi / Struktur Bab */}
      {tableOfContents.length > 0 && (
        <div className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-950" />
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight text-neutral-950 font-sans">
                Daftar Bab &amp; Struktur Naskah
              </h3>
            </div>
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
                  item.status?.includes('Sudah') || item.status?.includes('Bab 1')
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

