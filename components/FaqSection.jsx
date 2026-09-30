'use client'

import { useState } from 'react'

/**
 * FaqSection.jsx — Komponen FAQ Terpadu FokusKonten
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md (17 Pilar UI Baku Web):
 * - Anti-Nested Card: Pemisah antar butir menggunakan garis datar divide-neutral-100 tanpa kartu bertingkat.
 * - Monokrom Baku: Hanya neutral-950, neutral-100 s/d neutral-600, dan putih.
 * - Nomor Urut: Kotak bersudut tegas hitam pekat font mono (w-6 h-6 bg-neutral-950 text-white rounded-md).
 * - Tipografi: Plus Jakarta Sans (font-display font-bold) untuk tanya, Inter (font-sans text-neutral-600) untuk jawab.
 * - Zero Emoji & Zero Dev Jargon.
 */
export default function FaqSection({
  items = [],
  title = 'Pertanyaan yang Sering Diajukan',
  subtitle = 'Jawaban ringkas seputar layanan, keamanan berkas, dan penggunaan',
  className = ''
}) {
  const [openIndex, setOpenIndex] = useState(0)

  if (!Array.isArray(items) || items.length === 0) return null

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section
      aria-labelledby="faq-section-heading"
      className={`bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] ${className}`}
    >
      {/* Header FAQ */}
      <div className="pb-5 border-b border-neutral-100">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-950 shrink-0" aria-hidden="true" />
          <h2
            id="faq-section-heading"
            className="font-display font-extrabold text-lg sm:text-xl text-neutral-950 tracking-tight"
          >
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="mt-1 text-xs sm:text-sm font-sans text-neutral-500 pl-5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Daftar Pertanyaan & Jawaban (Anti-Nested Card) */}
      <div className="divide-y divide-neutral-100">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx
          const num = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`

          return (
            <div key={idx} className="py-4 sm:py-5 first:pt-4 last:pb-0">
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                aria-expanded={isOpen}
                className="w-full flex items-start justify-between gap-4 text-left group cursor-pointer select-none"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <span
                    className="w-6 h-6 bg-neutral-950 text-white rounded-md font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {num}
                  </span>
                  <span className="font-display font-bold text-neutral-950 text-sm sm:text-base leading-snug group-hover:text-neutral-700 transition-colors">
                    {item.q || item.question}
                  </span>
                </div>

                <span
                  className="w-7 h-7 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-700 flex items-center justify-center shrink-0 transition-colors group-hover:bg-neutral-950 group-hover:text-white"
                  aria-hidden="true"
                >
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <div className="mt-3 pl-9.5 pr-2 sm:pr-8 text-neutral-600 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {item.a || item.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
