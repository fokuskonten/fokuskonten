'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import postsData from '@/content/blog/posts.json'
import portfolioData from '@/content/portfolio/portfolio.json'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase()
    setQuery(q)
    
    if (q.length < 2) {
      setResults([])
      return
    }

    const blogResults = postsData
      .filter(post => 
        post.title.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.excerpt?.toLowerCase().includes(q)
      )
      .map(post => ({
        type: 'Blog',
        title: post.title,
        category: post.category,
        url: `/blog/${post.slug}`,
      }))

    const portfolioResults = portfolioData
      .filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      )
      .map(item => ({
        type: 'Portfolio',
        title: item.title,
        category: item.category,
        url: `/portfolio/${item.id}`,
      }))

    setResults([...blogResults, ...portfolioResults])
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        
        <section className="section border-t border-black/[0.04] bg-canvas-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <span className="section-label">Search</span>
              <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-6">
                Cari <span className="text-maroon-gradient">Konten</span>
              </h1>
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={handleSearch}
                  placeholder="Cari artikel, portfolio, atau layanan..."
                  className="w-full px-5 py-4 rounded-xl border border-black/[0.08] bg-white text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-maroon-700 focus:ring-2 focus:ring-maroon-700/10 transition-all"
                />
                <svg className="w-5 h-5 text-charcoal-400 absolute right-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {query.length < 2 ? (
                <div className="text-center py-20">
                  <p className="text-charcoal-400 text-sm">
                    Ketik minimal 2 karakter untuk mencari
                  </p>
                </div>
              ) : results.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-charcoal-500 text-sm mb-4">
                    Tidak ada hasil untuk &quot;{query}&quot;
                  </p>
                  <p className="text-charcoal-400 text-xs">
                    Coba kata kunci lain atau browse kategori kami
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-charcoal-400 text-sm mb-4">
                    {results.length} hasil ditemukan
                  </p>
                  {results.map((result, index) => (
                    <Link
                      key={index}
                      href={result.url}
                      className="flex items-center justify-between p-5 bg-white rounded-xl border border-black/[0.05] shadow-subtle hover:shadow-mature hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <span className="badge text-xs">{result.type}</span>
                        <div>
                          <h3 className="font-display font-semibold text-charcoal-900 group-hover:text-maroon-700 transition-colors">
                            {result.title}
                          </h3>
                          <p className="text-charcoal-400 text-xs mt-1">{result.category}</p>
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-charcoal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
