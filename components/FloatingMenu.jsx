'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getBuyerProfile, subscribeBuyerStore } from '@/lib/buyerStore'
import { getCartSummary, subscribeCartStore } from '@/lib/cartStore'
import { getWhatsAppContextUrl } from '@/lib/useStoreHealth'

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/aplikasi/', label: 'Aplikasi' },
  { href: '/toko-digital/', label: 'Toko Digital' },
  { href: '/layanan/', label: 'Layanan' },
  { href: '/portfolio/', label: 'Portfolio' },
  { href: '/tentang/', label: 'Tentang' },
  { href: '/kontak/', label: 'Kontak' },
]

const secondaryNavLinks = [
  { href: '/faq/', label: 'FAQ' },
  { href: '/panduan/', label: 'Panduan' },
  { href: '/dukungan/', label: 'Dukungan' },
]

const menuCardKeyframes = `
  @keyframes fkMenuCardLaunch {
    0%   { opacity: 0; transform: scale(0.95) translate3d(6px, 4px, 0); }
    70%  { opacity: 1; transform: scale(1.01) translate3d(-1px, -1px, 0); }
    100% { opacity: 1; transform: scale(1) translate3d(0, 0, 0); }
  }
`

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isKalilaOpen, setIsKalilaOpen] = useState(false)
  const [buyerProfile, setBuyerProfile] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const pathname = usePathname()
  const panelRef = useRef(null)

  // Sinkronisasi data pembeli
  useEffect(() => {
    setBuyerProfile(getBuyerProfile())
    const unsubscribe = subscribeBuyerStore(() => {
      setBuyerProfile(getBuyerProfile())
    })
    return () => unsubscribe()
  }, [])

  // Sinkronisasi jumlah keranjang
  useEffect(() => {
    const summary = getCartSummary()
    setCartCount(summary.totalItems || 0)
    const unsubCart = subscribeCartStore(() => {
      const updated = getCartSummary()
      setCartCount(updated.totalItems || 0)
    })
    return () => unsubCart()
  }, [])

  // Tutup menu otomatis saat berpindah halaman
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Tutup menu otomatis jika Kalila dibuka & pantau status Kalila agar tombol tidak tumpang tindih
  useEffect(() => {
    try {
      const savedIsOpen = localStorage.getItem('fk_chat_open_v3') || localStorage.getItem('fk_chat_open_v2')
      if (savedIsOpen === 'true') {
        setIsKalilaOpen(true)
      }
    } catch (e) {}

    const handleCloseMenu = () => setIsOpen(false)
    const handleKalilaState = (e) => {
      setIsKalilaOpen(!!e.detail?.isOpen)
    }
    const handleCloseChat = () => setIsKalilaOpen(false)

    window.addEventListener('close-floating-menu', handleCloseMenu)
    window.addEventListener('kalila-state-change', handleKalilaState)
    window.addEventListener('close-kalila-chat', handleCloseChat)
    return () => {
      window.removeEventListener('close-floating-menu', handleCloseMenu)
      window.removeEventListener('kalila-state-change', handleKalilaState)
      window.removeEventListener('close-kalila-chat', handleCloseChat)
    }
  }, [])

  // Tutup menu dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Buka/tutup menu navigasi dengan mutual exclusivity terhadap Kalila
  const handleToggleMenu = () => {
    const nextState = !isOpen
    setIsOpen(nextState)
    if (nextState && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('close-kalila-chat'))
      try {
        localStorage.setItem('fk_chat_open_v3', 'false')
      } catch (e) {}
    }
  }

  const handleOpenCart = () => {
    setIsOpen(false)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('close-kalila-chat'))
      window.dispatchEvent(new CustomEvent('open-cart-drawer'))
    }
  }

  return (
    <>
      <style>{menuCardKeyframes}</style>

      {/* Backdrop transparan murni untuk mendeteksi klik di luar tanpa efek blur */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-transparent cursor-default"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Popup Menu Card Ringkas Ber-Shadow (Tinggi Ideal bottom-36) */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed bottom-36 right-[5.25rem] z-50 w-60 sm:w-64 bg-white rounded-2xl border border-neutral-200 shadow-2xl font-sans overflow-hidden origin-bottom-right"
          style={{ animation: 'fkMenuCardLaunch 240ms cubic-bezier(0.16,1,0.3,1) both' }}
        >
          {/* Header Card Ringkas (Sticky) */}
          <div className="sticky top-0 z-10 px-3.5 py-2.5 border-b border-neutral-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-neutral-950 flex items-center justify-center text-white">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                </svg>
              </div>
              <span className="font-bold text-neutral-950 text-xs sm:text-sm">Menu Navigasi</span>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-5 h-5 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Tutup Menu"
              title="Tutup Menu"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Isi Menu Navigasi Lengkap (Navigasi Utama + Bantuan/FAQ + Akun & Keranjang) */}
          <div className="p-1.5 space-y-0.5 max-h-[calc(100vh-14rem)] overflow-y-auto [scrollbar-width:thin]">
            {/* Tautan Utama */}
            {navLinks.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs sm:text-[13px] transition-all ${
                    isActive
                      ? 'bg-neutral-100 text-neutral-950 font-bold'
                      : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 font-medium'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
                  )}
                </Link>
              )
            })}

            {/* Sub-header Informasi & Bantuan (FAQ, Panduan, Dukungan) */}
            <div className="pt-2 pb-1 px-3 text-[10px] font-mono uppercase tracking-wider text-neutral-400 border-t border-neutral-100 mt-1.5">
              Informasi & Bantuan
            </div>

            {secondaryNavLinks.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs sm:text-[13px] transition-all ${
                    isActive
                      ? 'bg-neutral-100 text-neutral-950 font-bold'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 font-medium'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
                  )}
                </Link>
              )
            })}

            {/* Garis Pemisah Akun & Keranjang */}
            <div className="h-px bg-neutral-100 my-1 mx-1.5" />

            {/* 👤 Masuk / Akun */}
            <Link
              href={buyerProfile?.email ? '/akun/' : '/login/'}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs sm:text-[13px] transition-all ${
                pathname === '/akun/' || pathname === '/login/'
                  ? 'bg-neutral-100 text-neutral-950 font-bold'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 font-medium'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <svg className="w-3.5 h-3.5 text-neutral-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="truncate">
                  {buyerProfile?.email ? `Dashboard (${buyerProfile.email.split('@')[0]})` : 'Masuk / Akun'}
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 shrink-0 ml-1">↗</span>
            </Link>

            {/* 🛒 Keranjang Belanja */}
            <button
              type="button"
              onClick={handleOpenCart}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs sm:text-[13px] text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 font-medium transition-all text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-neutral-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Keranjang Belanja</span>
              </div>
              {cartCount > 0 ? (
                <span className="min-w-[18px] h-[18px] px-1.5 rounded-full text-[10px] font-mono font-bold bg-neutral-950 text-white flex items-center justify-center">
                  {cartCount}
                </span>
              ) : (
                <span className="text-[11px] text-neutral-400">0</span>
              )}
            </button>

            {/* 💬 Hubungi WhatsApp Resmi */}
            <a
              href={getWhatsAppContextUrl({ pathname })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs sm:text-[13px] text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 font-medium transition-all"
            >
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Hubungi WhatsApp</span>
              </div>
              <span className="text-[11px] text-neutral-400">↗</span>
            </a>
          </div>
        </div>
      )}

      {/* Tombol Pemicu Bulat Tiga Titik — Di Atas Kalila Chat (Hanya Aktif di Mobile/Tablet < lg) */}
      <button
        type="button"
        onClick={handleToggleMenu}
        aria-label={isOpen ? 'Tutup navigasi' : 'Buka menu navigasi'}
        aria-expanded={isOpen}
        title={isOpen ? 'Tutup Menu' : 'Menu Navigasi'}
        className={`print:hidden lg:hidden fixed bottom-36 right-4 z-50 w-12 h-12 rounded-full bg-neutral-950 shadow-lg shadow-black/35 hover:shadow-2xl hover:shadow-black/50 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 border border-neutral-800 cursor-pointer ${
          isKalilaOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        } ${isOpen ? 'rotate-90 ring-2 ring-white/50' : ''}`}
      >
        {isOpen ? (
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </span>
        )}

        {/* Badge Notifikasi Keranjang pada Tombol Titik 3 */}
        {cartCount > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-white text-neutral-950 text-[10px] font-black font-mono flex items-center justify-center shadow-md border border-neutral-200">
            {cartCount > 9 ? '9+' : cartCount}
          </span>
        )}
      </button>
    </>
  )
}
