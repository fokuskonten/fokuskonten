'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState } from 'react'
import portfolioData from '@/content/portfolio/portfolio.json'

const categories = ['Semua', 'Android Development', 'Creative Digital', 'Fotografi & Videografi', 'Content Creator']

const categoryColors = {
  'Android Development':    { dot: '#8c1f1f', bg: 'rgba(140,31,31,0.03)', border: 'rgba(140,31,31,0.08)' },
  'Creative Digital':       { dot: '#ab3333', bg: 'rgba(171,51,51,0.03)', border: 'rgba(171,51,51,0.08)'  },
  'Fotografi & Videografi': { dot: '#751919', bg: 'rgba(117,25,25,0.03)', border: 'rgba(117,25,25,0.08)'  },
  'Content Creator':        { dot: '#5e1414', bg: 'rgba(94,20,20,0.03)',  border: 'rgba(94,20,20,0.08)'   },
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
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] blur-[120px] opacity-25 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(140,31,31,0.08) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="container-max section px-4 sm:px-6 lg:px-8 text-center animate-fade-up">
            <span className="section-label">Portfolio</span>
            <h1 className="heading-xl text-4xl sm:text-5xl lg:text-6xl text-charcoal-900 text-balance mb-5">
              Karya &{' '}
              <span className="text-maroon-gradient">Proyek</span>
            </h1>
            <p className="text-charcoal-500 text-base max-w-xl mx-auto leading-relaxed">
              Setiap proyek dikerjakan dengan dedikasi penuh dan perhatian terhadap setiap detail — dari konsep hingga publikasi.
            </p>
          </div>
        </section>

        {/* ── Filter Tabs ───────────────────── */}
        <div className="container-max px-4 sm:px-6 lg:px-8 mb-10 animate-fade-up delay-100">
          <div className="flex items-center gap-2 flex-wrap justify-center" role="tablist" aria-label="Filter kategori portfolio">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={active === cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-display font-semibold transition-all duration-350 hover:scale-105 ${
                  active === cat
                    ? 'text-white'
                    : 'text-charcoal-600 hover:text-maroon-700'
                }`}
                style={
                  active === cat
                    ? { background: 'linear-gradient(135deg, #ab3333, #751919)', boxShadow: '0 4px 14px rgba(122, 28, 28, 0.25)' }
                    : { background: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.06)' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grid ─────────────────────────── */}
        <section className="container-max px-4 sm:px-6 lg:px-8 pb-24" aria-label="Daftar portfolio">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => {
              const col = categoryColors[item.category] || { dot: '#8c1f1f', bg: 'rgba(140,31,31,0.03)', border: 'rgba(140,31,31,0.08)' }
              return (
                <Link
                  key={item.id}
                  href={`/portfolio/${item.id}`}
                  className="group block rounded-2xl p-6 bg-white border border-black/[0.05] shadow-mature hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 animate-scale-in"
                >
                  {/* Top */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: col.dot }}
                        aria-hidden="true"
                      />
                      <span className="text-charcoal-500 text-xs font-display font-semibold">{item.category}</span>
                    </div>
                    <span
                      className="text-xs font-display font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(122,28,28,0.06)', color: '#8c1f1f', border: '1px solid rgba(122,28,28,0.12)' }}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Content */}
                  <h2 className="font-display font-semibold text-lg text-charcoal-900 group-hover:text-maroon-700 transition-colors duration-200 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-charcoal-500 text-sm leading-relaxed mb-5">{item.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-black/[0.04]">
                    <span className="text-charcoal-400 text-xs">{item.year}</span>
                    <span className="text-xs font-display font-semibold text-maroon-700 flex items-center gap-1 group-hover:gap-2 transition-all">
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
        <section className="section border-t border-black/[0.04] bg-white animate-fade-up" aria-label="Diskusi proyek baru">
          <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
            <div className="maroon-line mx-auto mb-6" aria-hidden="true" />
            <h2 className="heading-xl text-3xl text-charcoal-900 mb-3 text-balance">Punya Proyek?</h2>
            <p className="text-charcoal-500 text-sm max-w-sm mx-auto mb-7">
              Mari wujudkan ide Anda menjadi karya nyata bersama FokusKonten.
            </p>
            <a
              href="https://wa.me/6285183011318"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex hover:scale-[1.02] transition-transform"
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
