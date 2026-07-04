'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import appsData from '@/content/apps/apps.json'

const categories = ['Semua', 'Utilitas', 'Edukasi', 'Game', 'Bisnis', 'Religi', 'Kesehatan', 'Produktivitas', 'Hiburan']

const categoryColors = {
  Utilitas: 'bg-blue-100 text-blue-700',
  Edukasi: 'bg-green-100 text-green-700',
  Game: 'bg-purple-100 text-purple-700',
  Bisnis: 'bg-orange-100 text-orange-700',
  Religi: 'bg-teal-100 text-teal-700',
  Kesehatan: 'bg-red-100 text-red-700',
  Produktivitas: 'bg-indigo-100 text-indigo-700',
  Hiburan: 'bg-pink-100 text-pink-700',
}

export default function ApplicationsPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredApps = useMemo(() => {
    return appsData.filter((app) => {
      const matchesCategory = activeCategory === 'Semua' || app.category === activeCategory
      const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.package.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <>
      <Navbar />
      <main className="min-h-screen">

        {/* Header */}
        <section className="section border-t border-black/[0.04] bg-canvas-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <span className="section-label">Aplikasi</span>
              <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Aplikasi <span className="text-maroon-gradient">Android</span>
              </h1>
              <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed">
                Kumpulan {appsData.length} aplikasi Android resmi FokusKonten — dari utilitas, edukasi, game, bisnis, religi, kesehatan, hingga produktivitas.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-t border-black/[0.04] bg-white sticky top-0 z-10">
          <div className="container-max px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari aplikasi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-black/[0.08] bg-canvas-50 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-maroon-700/20 focus:border-maroon-700/30"
                />
              </div>
              {/* Count */}
              <span className="text-sm text-charcoal-400">
                {filteredApps.length} dari {appsData.length} aplikasi
              </span>
            </div>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-maroon-700 text-white shadow-sm'
                      : 'bg-canvas-100 text-charcoal-500 hover:bg-canvas-200 border border-black/[0.05]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Apps Grid */}
        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            {filteredApps.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-charcoal-400">Tidak ada aplikasi yang ditemukan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredApps.map((app, index) => (
                    <div
                      key={app.id}
                      className="group card-outline p-4 shadow-mature hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl overflow-hidden shrink-0 bg-canvas-100 ring-1 ring-black/[0.06]">
                          <Image
                            src={app.icon}
                            alt={app.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-display font-semibold text-sm text-charcoal-900 truncate">
                            {app.name}
                          </h3>
                          <p className="text-charcoal-400 text-xs truncate">{app.package}</p>
                        </div>
                      </div>
                      <p className="text-charcoal-500 text-xs leading-relaxed mb-3 line-clamp-2">
                        {app.description}
                      </p>
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColors[app.category] || 'bg-canvas-100 text-charcoal-500'}`}>
                          {app.category}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                          {app.status}
                        </span>
                      </div>
                      <a
                        href={`https://play.google.com/store/apps/details?id=${app.package}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full justify-center text-xs py-2.5 gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                        Lihat di Play Store
                      </a>
                    </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="section border-t border-black/[0.04] bg-white">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center p-10 rounded-2xl bg-canvas-50 border border-black/[0.05]">
              <h2 className="font-display font-semibold text-2xl text-charcoal-900 mb-3">
                Butuh Aplikasi Kustom?
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed mb-6">
                Kami dapat mengembangkan aplikasi Android sesuai kebutuhan spesifik bisnis Anda. Hubungi kami untuk konsultasi.
              </p>
              <a
                href="https://wa.me/6285183011318"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hubungi WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
