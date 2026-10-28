'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getBuyerProfile, subscribeBuyerStore } from '@/lib/buyerStore'
import { getCartSummary, subscribeCartStore } from '@/lib/cartStore'
import { getWhatsAppContextUrl } from '@/lib/useStoreHealth'
import CartDrawer from '@/components/cart/CartDrawer'

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/aplikasi/', label: 'Aplikasi' },
  { href: '/toko-digital/', label: 'Toko Digital' },
  { href: '/layanan/', label: 'Layanan' },
  { href: '/portfolio/', label: 'Portfolio' },
  { href: '/tentang/', label: 'Tentang' },
  { href: '/kontak/', label: 'Kontak' },
]

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [buyerProfile, setBuyerProfile] = useState(null)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

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
    window.addEventListener('open-cart-drawer', handleOpenCart)
    return () => {
      unsubscribeCart()
      window.removeEventListener('open-cart-drawer', handleOpenCart)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
                width={40}
                height={40}
                style={{ width: '40px', height: '40px', maxWidth: '40px', maxHeight: '40px' }}
                className="w-10 h-10 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-display font-extrabold text-lg text-neutral-900 tracking-tight">
                Fokus<span className="text-neutral-950">Konten</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav 
              key={mounted ? 'nav-mounted' : 'nav-static'} 
              suppressHydrationWarning 
              className="hidden lg:flex items-center gap-0.5 xl:gap-1"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-2.5 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
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
                className={`px-2.5 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                  (pathname === '/akun/' || pathname === '/login/')
                    ? 'text-neutral-950 bg-neutral-100 font-semibold'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/60'
                }`}
              >
                <svg width="16" height="16" className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                <span>{buyerProfile?.email ? 'Dashboard' : 'Masuk / Akun'}</span>
                {buyerProfile?.email && (
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 ml-0.5" />
                )}
              </Link>

              {/* Tombol Keranjang Belanja Desktop (Lega, Presisi & Berjarak Proporsional) */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative w-10 h-10 mx-2 rounded-xl bg-neutral-100/90 hover:bg-neutral-200/80 border border-neutral-200/80 text-neutral-800 hover:text-neutral-950 shadow-xs transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Keranjang Belanja"
                title="Keranjang Belanja"
              >
                <svg width="20" height="20" className="w-5 h-5 text-neutral-800 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-neutral-950 text-white text-[10px] font-black font-mono flex items-center justify-center shadow-md border-2 border-white">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              <a
                href={getWhatsAppContextUrl({ pathname })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 xl:px-4 py-2 rounded-xl text-xs xl:text-sm font-display font-semibold text-white bg-black hover:bg-neutral-800 shadow-sm shadow-black/20 transition-all duration-200 whitespace-nowrap"
              >
                <svg width="16" height="16" className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Hubungi
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Cart Slide-Over Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
