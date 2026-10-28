'use client'

import { useState } from 'react'
import Link from 'next/link'

// Konsol etalase hero: memutar produk lintas platform secara otomatis.
// Timing digerakkan animasi CSS .fk-progress (onAnimationEnd) sehingga
// hover cukup mem-pause animasi, dan reduced-motion otomatis mematikan autoplay.
const pad = (n) => String(n).padStart(2, '0')
const toPath = (href) =>
  href.startsWith('http')
    ? href.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : `fokuskonten.my.id${href.replace(/\/$/, '')}`

export default function AppConsole({ items }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = items.length
  const item = items[active]
  const path = toPath(item.href)
  const next = () => setActive((i) => (i + 1) % total)

  const ctaClass =
    'group/btn inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display font-semibold text-xs text-white bg-black hover:bg-neutral-800 shadow-sm transition-all'
  const arrow = (
    <svg className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )

  return (
    <div
      className="relative mx-auto max-w-5xl text-left bg-white border border-neutral-200 rounded-3xl shadow-[0_20px_48px_-12px_rgba(0,0,0,0.12)] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Kepala konsol: label + penghitung, tanpa tombol jendela tiruan */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-100">
        <div className="flex items-center gap-2.5 text-[11px] font-mono font-semibold text-neutral-900">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-neutral-950 opacity-50 motion-safe:animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neutral-950" />
          </span>
          fokuskonten
        </div>
        <span className="text-[11px] font-mono text-neutral-400 tabular-nums">
          {pad(active + 1)} / {pad(total)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,260px)_1fr]">
        {/* Daftar item: horizontal ikon di mobile, vertikal di desktop */}
        <div role="tablist" aria-label="Produk unggulan" className="flex md:flex-col gap-1.5 p-3 border-b md:border-b-0 md:border-r border-neutral-100 overflow-x-auto md:max-h-[400px] md:overflow-y-auto">
          {items.map((it, i) => {
            const on = i === active
            return (
              <button
                key={it.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`relative shrink-0 flex items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors ${on ? 'bg-neutral-50' : 'hover:bg-neutral-50/70'}`}
              >
                <img src={it.icon} alt="" className="w-8 h-8 rounded-lg object-contain bg-white border border-neutral-100" />
                <span className="hidden md:flex flex-col min-w-0">
                  <span className={`text-sm font-display font-semibold truncate ${on ? 'text-neutral-950' : 'text-neutral-600'}`}>{it.name}</span>
                  <span className="text-[11px] font-mono text-neutral-400 truncate">{it.category}</span>
                </span>
                {on && (
                  <span className="absolute left-2.5 right-2.5 bottom-0.5 h-[2px] rounded-full bg-neutral-200 overflow-hidden">
                    <span
                      className="fk-progress block h-full bg-neutral-950"
                      style={{ animationPlayState: paused ? 'paused' : 'running' }}
                      onAnimationEnd={next}
                    />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Panel detail item aktif */}
        <div key={active} role="tabpanel" className="fk-swap p-6 sm:p-8 min-h-[300px] flex flex-col">
          <div className="text-[11px] sm:text-xs font-mono text-neutral-500 mb-5">
            <span className="fk-type" style={{ '--n': path.length }}>{path}</span>
          </div>
          <div className="flex items-center gap-3.5 mb-4">
            <img src={item.icon} alt={item.name} className="w-12 h-12 rounded-xl object-contain bg-neutral-50 p-1 border border-neutral-100 shadow-sm shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="heading-lg text-xl sm:text-2xl text-neutral-950">{item.name}</h3>
                <span className="shrink-0 inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-neutral-100 text-neutral-800 border border-neutral-300">
                  {item.category}
                </span>
              </div>
            </div>
          </div>
          <p className="text-neutral-600 text-sm leading-relaxed max-w-xl mb-6">{item.description}</p>
          <div className="mt-auto">
            {item.external ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={ctaClass}>
                {item.actionText}
                {arrow}
              </a>
            ) : (
              <Link href={item.href} className={ctaClass}>
                {item.actionText}
                {arrow}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
