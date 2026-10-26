'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

const categories = [
  'Semua',
  'Web & PWA Development',
  'Desktop Software & R&D',
  'Android Development',
  'Creative Digital',
  'Fotografi & Videografi',
  'Content Creator',
]

export default function PortfolioExplorer({ items }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua')

  const categoryCounts = useMemo(() => {
    const counts = { Semua: items.length }
    categories.forEach((cat) => {
      if (cat !== 'Semua') {
        counts[cat] = items.filter((p) => p.category === cat).length
      }
    })
    return counts
  }, [items])

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'Semua') return items
    return items.filter((p) => p.category === selectedCategory)
  }, [items, selectedCategory])

  return (
    <div>
      {/* ── CATEGORY FILTER TABS ─────────────────────────────────── */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const count = categoryCounts[cat] || 0
          if (cat !== 'Semua' && count === 0) return null
          const isActive = selectedCategory === cat

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-semibold transition-all ${
                isActive
                  ? 'bg-neutral-950 text-white shadow-md'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:border-neutral-300'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isActive
                    ? 'bg-neutral-800 text-neutral-200'
                    : 'bg-neutral-100 text-neutral-500'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── PORTFOLIO CARDS GRID ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:border-neutral-400 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Meta Top: Category Chip & Status */}
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 font-mono text-[11px] font-semibold uppercase tracking-wider border border-neutral-200/60">
                  {item.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-950 text-white font-mono text-[10px] font-semibold uppercase tracking-wider">
                  {item.status}
                </span>
              </div>

              {/* Title & Tagline */}
              <h2 className="font-display font-bold text-xl sm:text-2xl text-neutral-950 mb-1.5 group-hover:text-neutral-700 transition-colors">
                <Link href={'/portfolio/' + item.id}>
                  {item.title}
                </Link>
              </h2>

              {item.tagline && (
                <p className="text-neutral-500 text-xs font-medium mb-3 line-clamp-1">
                  {item.tagline}
                </p>
              )}

              {/* Description */}
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-5">
                {item.description}
              </p>

              {/* Highlights feature preview if available */}
              {item.features && item.features.length > 0 && (
                <div className="mb-5 p-3.5 rounded-xl bg-neutral-50/80 border border-neutral-100 text-xs text-neutral-700 space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                    Sorotan Fitur Utama
                  </span>
                  <div className="font-medium text-neutral-800 truncate">
                    • {item.features[0].title}
                  </div>
                  {item.features[1] && (
                    <div className="font-medium text-neutral-800 truncate">
                      • {item.features[1].title}
                    </div>
                  )}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-neutral-50 border border-neutral-200 text-neutral-700 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer: Year & Detail Action */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">Tahun {item.year}</span>
              <Link
                href={'/portfolio/' + item.id}
                className="font-semibold text-neutral-950 group-hover:text-neutral-600 inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Lihat Studi Kasus</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
