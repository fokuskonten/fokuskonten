'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/about', label: 'Tentang' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Kontak' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-900/90 backdrop-blur-xl border-b border-dark-400/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-400 to-vibrant-500 flex items-center justify-center text-white font-bold text-sm">
              F
            </span>
            <span className="font-display font-bold text-lg text-white group-hover:text-accent-400 transition-colors">
              Fokus<span className="text-accent-400">Konten</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-accent-500/20 text-accent-400'
                    : 'text-dark-200 hover:text-white hover:bg-dark-600/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/6285183011318"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-5 py-2 rounded-lg bg-gradient-to-r from-accent-500 to-vibrant-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-vibrant-500/25 transition-all duration-300"
            >
              WhatsApp
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-dark-200 hover:text-white hover:bg-dark-600/50 transition-colors"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-dark-800/95 backdrop-blur-xl border-t border-dark-400/20">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  pathname === link.href
                    ? 'bg-accent-500/20 text-accent-400'
                    : 'text-dark-200 hover:text-white hover:bg-dark-600/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/6285183011318"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 mt-2 rounded-lg bg-gradient-to-r from-accent-500 to-vibrant-600 text-white text-sm font-semibold text-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
