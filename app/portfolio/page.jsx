'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState } from 'react'
import portfolioData from '@/content/portfolio/portfolio.json'

const categories = ['Semua', 'Android Development', 'Creative Digital', 'Fotografi & Videografi', 'Content Creator']

const categoryColors = {
  'Android Development':    { dot: '#c5a880', bg: 'rgba(197,168,128,0.06)', border: 'rgba(197,168,128,0.15)' },
  'Creative Digital':       { dot: '#dda855', bg: 'rgba(221,168,85,0.06)',  border: 'rgba(221,168,85,0.15)'  },
  'Fotografi & Videografi': { dot: '#9a7a3d', bg: 'rgba(154,122,61,0.06)', border: 'rgba(154,122,61,0.15)'  },
  'Content Creator':        { dot: '#b8924a', bg: 'rgba(184,146,74,0.06)', border: 'rgba(184,146,74,0.15)'  },
}

export default function PortfolioPage() {
  const [active, setActive] = useState('Semua')

  const filtered = active === 'Semua'
    ? portfolioData
    : portfolioData.filter(p => p.category === active)

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────── */}
        <section className="relative pt-32 sm:pt-40 pb-10 overflow-hidden" aria-label="Portfolio header">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] blur-[120px] opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(197,168,128,0.5) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="container-max section px-4 sm:px-6 lg:px-8 text-center">
            <span className="section-label">Portfolio</span>
            <h1 className="heading-xl text-4xl sm:text-5xl lg:text-6xl text-ivory-50 text-balance mb-5">
              Karya &{' '}
              <span className="text-copper-gradient">Proyek</span>
            </h1>
            <p className="text-ink-400 text-base max-w-xl mx-auto leading-relaxed">
              Setiap proyek dikerjakan dengan dedikasi penuh dan perhatian terhadap setiap detail — dari konsep hingga publikasi.
            </p>
          </div>
        </section>

        {/* ── Filter Tabs ───────────────────── */}
        <div className="container-max px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex items-center gap-2 flex-wrap justify-center" role="tablist" aria-label="Filter kategori portfolio">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={active === cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-display font-medium transition-all duration-200 ${
                  active === cat
                    ? 'text-ink-950'
                    : 'text-ink-400 hover:text-ivory-200'
                }`}
                style={
                  active === cat
                    ? { background: 'linear-gradient(135deg, #dda855, #c5a880)', boxShadow: '0 0 20px rgba(197,168,128,0.25)' }
                    : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grid ─────────────────────────── */}
        <section className="container-max px-4 sm:px-6 lg:px-8 pb-24" aria-label="Daftar portfolio">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => {
              const col = categoryColors[item.category] || { dot: '#c5a880', bg: 'rgba(197,168,128,0.06)', border: 'rgba(197,168,128,0.12)' }
              return (
                <Link
                  key={item.id}
                  href={`/portfolio/${item.id}`}
                  className="group block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: col.bg, border: `1px solid ${col.border}` }}
                >
                  {/* Top */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: col.dot }}
                        aria-hidden="true"
                      />
                      <span className="text-ink-500 text-xs font-display">{item.category}</span>
                    </div>
                    <span
                      className="text-xs font-display font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(197,168,128,0.10)', color: '#c5a880', border: '1px solid rgba(197,168,128,0.20)' }}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Content */}
                  <h2 className="font-display font-semibold text-lg text-ivory-100 group-hover:text-copper transition-colors duration-200 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-ink-400 text-sm leading-relaxed mb-5">{item.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <span className="text-ink-600 text-xs">{item.year}</span>
                    <span className="text-xs font-display font-medium text-copper flex items-center gap-1 group-hover:gap-2 transition-all">
                      Detail
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ── CTA ──────────────────────────── */}
        <section className="section border-t border-white/[0.05]" aria-label="Diskusi proyek baru">
          <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
            <div className="copper-line mx-auto mb-6" aria-hidden="true" />
            <h2 className="heading-xl text-3xl text-ivory-50 mb-3 text-balance">Punya Proyek?</h2>
            <p className="text-ink-400 text-sm max-w-sm mx-auto mb-7">
              Mari wujudkan ide Anda menjadi karya nyata bersama FokusKonten.
            </p>
            <a
              href="https://wa.me/6285183011318"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              Diskusikan Proyek
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
