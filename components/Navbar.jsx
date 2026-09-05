'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import digitalProducts from '@/content/apps/digitalProducts.json'
import { getBuyerProfile, subscribeBuyerStore } from '@/lib/buyerStore'
import { getCartSummary, subscribeCartStore } from '@/lib/cartStore'
import CartDrawer from '@/components/cart/CartDrawer'

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/aplikasi/', label: 'Aplikasi' },
  { href: '/toko-digital/', label: 'Toko', isDropdown: true },
  { href: '/tentang/', label: 'Tentang' },
  { href: '/layanan/', label: 'Layanan' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/kontak/', label: 'Kontak' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTokoOpen, setIsTokoOpen] = useState(false)
  const [isMobileTokoOpen, setIsMobileTokoOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [isCartBumping, setIsCartBumping] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [buyerProfile, setBuyerProfile] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    setBuyerProfile(getBuyerProfile())
    const unsubscribe = subscribeBuyerStore(() => {
      setBuyerProfile(getBuyerProfile())
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const summary = getCartSummary()
    setCartCount(summary.totalItems || 0)
    const unsubscribeCart = subscribeCartStore(() => {
      const updated = getCartSummary()
      setCartCount(updated.totalItems || 0)
    })
    const handleOpenCart = () => setIsCartOpen(true)
    const handleCartItemAdded = () => {
      setIsCartBumping(true)
      setTimeout(() => setIsCartBumping(false), 800)
    }
    window.addEventListener('open-cart-drawer', handleOpenCart)
    window.addEventListener('cart-item-added', handleCartItemAdded)
    return () => {
      unsubscribeCart()
      window.removeEventListener('open-cart-drawer', handleOpenCart)
      window.removeEventListener('cart-item-added', handleCartItemAdded)
    }
  }, [])


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { 
    setIsOpen(false)
    setIsTokoOpen(false)
    setIsMobileTokoOpen(false)
  }, [pathname])

  // Realtime kategori & format dari produk aktif (bukan dummy!)
  const { realtimeCategories, realtimeFormats, totalActiveProducts } = useMemo(() => {
    const catMap = new Map()
    const fmtMap = new Map()
    let total = 0

    if (Array.isArray(digitalProducts)) {
      digitalProducts.forEach((p) => {
        if (p.is_published !== 0 && p.isPublished !== false) {
          total++
          if (p.category) {
            const c = p.category.trim()
            catMap.set(c, (catMap.get(c) || 0) + 1)
          }
          if (p.format) {
            const f = p.format.trim()
            fmtMap.set(f, (fmtMap.get(f) || 0) + 1)
          }
        }
      })
    }

    const categories = Array.from(catMap.entries())
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])

    const formats = Array.from(fmtMap.entries())
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])

    return {
      realtimeCategories: categories,
      realtimeFormats: formats,
      totalActiveProducts: total
    }
  }, [])

  const handleTokoFilterClick = (e, { category = 'Semua', format = 'Semua' } = {}) => {
    setIsTokoOpen(false)
    setIsMobileTokoOpen(false)
    setIsOpen(false)

    if (pathname && pathname.startsWith('/toko-digital')) {
      if (!e || (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey)) {
        if (e && e.preventDefault) e.preventDefault()
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('fk_filter_change', {
              detail: { category, format }
            })
          )
          const params = new URLSearchParams()
          if (category && category !== 'Semua') params.set('cat', category)
          if (format && format !== 'Semua') params.set('format', format)
          const qs = params.toString()
          const newUrl = qs ? `/toko-digital/?${qs}` : '/toko-digital/'
          window.history.pushState(null, '', newUrl)

          const headerEl = document.getElementById('katalog-header')
          if (headerEl) {
            const topPos = headerEl.getBoundingClientRect().top + window.pageYOffset - 90
            window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' })
          }
        }
      }
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-soft' : 'bg-transparent'
        }`}
      >
      <div className="container-page">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group" aria-label="FokusKonten">
            <img
              src="/logo.webp"
              alt="FokusKonten Logo"
              className="w-10 h-10 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display font-extrabold text-lg text-neutral-900 tracking-tight">
              Fokus<span className="text-neutral-950">Konten</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div 
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setIsTokoOpen(true)}
                    onMouseLeave={() => setIsTokoOpen(false)}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleTokoFilterClick(e, { category: 'Semua', format: 'Semua' })}
                      className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                        pathname.startsWith('/toko-digital')
                          ? 'text-neutral-950 bg-neutral-100 font-semibold'
                          : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/60'
                      }`}
                    >
                      <span>{link.label}</span>
                      <svg 
                        className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${isTokoOpen ? 'rotate-180 text-neutral-900' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    {/* Dropdown Menu Popover */}
                    {isTokoOpen && (
                      <div className="absolute left-0 top-full pt-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="w-[460px] bg-white/95 backdrop-blur-xl rounded-2xl border border-neutral-200/80 shadow-2xl p-3 text-xs">
                          {/* 1. Header: Semua Produk */}
                          <Link
                            href="/toko-digital/"
                            onClick={(e) => handleTokoFilterClick(e, { category: 'Semua', format: 'Semua' })}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-neutral-950 text-white font-bold hover:bg-neutral-800 transition-colors shadow-sm"
                          >
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                                <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/>
                              </svg>
                              <span>Semua Produk</span>
                            </div>
                            <span suppressHydrationWarning className="bg-white/20 text-white text-[11px] px-2 py-0.5 rounded-full font-mono">
                              {totalActiveProducts}
                            </span>
                          </Link>

                          {/* 2. Kategori (2 Kolom Grid) */}
                          {realtimeCategories.length > 0 && (
                            <div className="mt-2.5 pt-2.5 border-t border-neutral-100">
                              <div className="px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                                <span>Kategori Desain</span>
                                <span suppressHydrationWarning className="font-mono text-[9px] text-neutral-400">{realtimeCategories.length} Kategori</span>
                              </div>
                              <div className="grid grid-cols-2 gap-x-1.5 gap-y-0.5 mt-1 max-h-[55vh] overflow-y-auto pr-1 [scrollbar-width:thin]">
                                {realtimeCategories.map(([cat, count]) => (
                                  <Link
                                    key={cat}
                                    href={`/toko-digital/?cat=${encodeURIComponent(cat)}`}
                                    onClick={(e) => handleTokoFilterClick(e, { category: cat, format: 'Semua' })}
                                    className="flex items-center justify-between px-2.5 py-1.5 rounded-xl text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 font-medium transition-colors group"
                                  >
                                    <span className="truncate pr-1 text-[11.5px] group-hover:font-semibold">{cat}</span>
                                    <span suppressHydrationWarning className="text-neutral-400 group-hover:text-neutral-900 font-mono text-[10px] bg-neutral-100 px-1.5 py-0.5 rounded shrink-0">
                                      {count}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 3. Format File */}
                          {realtimeFormats.length > 0 && (
                            <div className="mt-2.5 pt-2 border-t border-neutral-100">
                              <div className="px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
                                Format File
                              </div>
                              <div className="flex flex-wrap gap-1.5 px-1 py-1">
                                {realtimeFormats.map(([fmt, count]) => (
                                  <Link
                                    key={fmt}
                                    href={`/toko-digital/?format=${encodeURIComponent(fmt)}`}
                                    onClick={(e) => handleTokoFilterClick(e, { category: 'Semua', format: fmt })}
                                    className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-bold font-mono transition-colors flex items-center gap-1"
                                  >
                                    <span>.{fmt}</span>
                                    <span className="text-[9px] text-neutral-500 font-normal">({count})</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'text-neutral-950 bg-neutral-100 font-semibold'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/60'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href={buyerProfile?.email ? '/akun/' : '/login/'}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                (pathname === '/akun/' || pathname === '/login/')
                  ? 'text-neutral-950 bg-neutral-100 font-semibold'
                  : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/60'
              }`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              <span>{buyerProfile?.email ? 'Dashboard' : 'Masuk / Akun'}</span>
              {buyerProfile?.email && (
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 ml-0.5" />
              )}
            </Link>



            <a
              href="https://wa.me/6285183011318"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-display font-semibold text-white bg-black hover:bg-neutral-800 shadow-sm shadow-black/20 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Hubungi
            </a>
          </nav>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1 rounded-xl text-neutral-600 hover:text-neutral-900 transition-colors"
              aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={isOpen}
            >
              <span className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[36rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass border-t border-neutral-200/50 px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            if (link.isDropdown) {
              return (
                <div key={link.href} className="space-y-1">
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium">
                    <Link
                      href={link.href}
                      onClick={(e) => handleTokoFilterClick(e, { category: 'Semua', format: 'Semua' })}
                      className="font-semibold text-neutral-900 flex items-center gap-2"
                    >
                      <span>{link.label}</span>
                      <span className="text-xs bg-neutral-200 px-2 py-0.5 rounded-full font-mono text-neutral-700">
                        {totalActiveProducts}
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsMobileTokoOpen(!isMobileTokoOpen)}
                      className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isMobileTokoOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  {isMobileTokoOpen && (
                    <div className="pl-4 pr-2 space-y-1 pb-2">
                      <Link
                        href="/toko-digital/"
                        onClick={(e) => handleTokoFilterClick(e, { category: 'Semua', format: 'Semua' })}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-neutral-900 bg-neutral-100"
                      >
                        <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/>
                        </svg>
                        <span>Semua Produk <span suppressHydrationWarning>({totalActiveProducts})</span></span>
                      </Link>
                      <div className="space-y-0.5 max-h-72 overflow-y-auto pr-1 mt-1 [scrollbar-width:thin]">
                        {realtimeCategories.map(([cat, count]) => (
                          <Link
                            key={cat}
                            href={`/toko-digital/?cat=${encodeURIComponent(cat)}`}
                            onClick={(e) => handleTokoFilterClick(e, { category: cat, format: 'Semua' })}
                            className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
                          >
                            <span>{cat}</span>
                            <span suppressHydrationWarning className="font-mono text-[10px] text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">({count})</span>
                          </Link>
                        ))}
                      </div>
                      {realtimeFormats.length > 0 && (
                        <div className="pt-2 mt-1 border-t border-neutral-100 flex flex-wrap gap-1 px-1">
                          {realtimeFormats.map(([fmt, count]) => (
                            <Link
                              key={fmt}
                              href={`/toko-digital/?format=${encodeURIComponent(fmt)}`}
                              onClick={(e) => handleTokoFilterClick(e, { category: 'Semua', format: fmt })}
                              className="px-2 py-0.5 rounded bg-neutral-100 text-[10px] font-mono font-bold text-neutral-700 hover:bg-neutral-200"
                            >
                              .{fmt} ({count})
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  pathname === link.href
                    ? 'bg-neutral-100 text-neutral-950 font-semibold'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/60'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href={buyerProfile?.email ? '/akun/' : '/login/'}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              (pathname === '/akun/' || pathname === '/login/')
                ? 'bg-neutral-100 text-neutral-950 font-semibold'
                : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/60'
            }`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            <span>{buyerProfile?.email ? `Dashboard (${buyerProfile.email.split('@')[0]})` : 'Masuk / Akun'}</span>
          </Link>

          {/* Cart Mobile Nav Item */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false)
              setIsCartOpen(true)
            }}
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              <span>Keranjang Belanja</span>
            </div>
            {cartCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold font-mono bg-neutral-900 text-white">
                {cartCount} item
              </span>
            )}
          </button>

          <a
            href="https://wa.me/6285183011318"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-2 w-full px-4 py-2.5 rounded-xl text-sm font-display font-semibold text-white bg-black hover:bg-neutral-800"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Hubungi WhatsApp
          </a>
        </div>
      </div>

      </header>

      {/* Cart Slide-Over Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
