'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  getCartItems,
  removeFromCart,
  clearCart,
  getCartSummary,
  subscribeCartStore
} from '@/lib/cartStore'
import { hasPurchasedSku } from '@/lib/buyerStore'
import { formatRupiah } from '@/lib/formatters'
import { createProductSlug } from '@/app/toko-digital/slugHelper'
import { useStoreHealth } from '@/lib/useStoreHealth'

const VISIBLE_LIMIT = 3 // Item terlihat sebelum "Lihat selengkapnya"

const dropKeyframes = `
  @keyframes cartDropIn {
    0%   { opacity: 0; transform: translateY(-6px); }
    65%  { opacity: 1; transform: translateY(2px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`

export default function CartDrawer({ isOpen, onClose }) {
  const router = useRouter()
  const { isOffline, ctaText } = useStoreHealth()
  const [items, setItems] = useState([])
  const [summary, setSummary] = useState({ totalItems: 0, subtotal: 0, totalSavings: 0 })
  const [mounted, setMounted] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const panelRef = useRef(null)

  const updateCartState = () => {
    setItems(getCartItems())
    setSummary(getCartSummary())
  }

  useEffect(() => {
    setMounted(true)
    updateCartState()
    const unsubscribe = subscribeCartStore(updateCartState)
    return () => unsubscribe()
  }, [])

  // Reset expanded saat tutup
  useEffect(() => {
    if (!isOpen) setExpanded(false)
  }, [isOpen])

  // TIDAK mengunci body scroll — dropdown tidak fullscreen, page shift tidak boleh terjadi

  // Klik di luar panel → tutup
  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose()
      }
    }
    // Delay sedikit agar klik pembuka tidak langsung menutup
    const timeout = setTimeout(() => {
      document.addEventListener('mousedown', handleClick)
    }, 50)
    return () => {
      clearTimeout(timeout)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [isOpen, onClose])

  if (!isOpen || !mounted) return null

  const handleCheckoutClick = () => {
    onClose()
    router.push('/toko-digital/checkout/')
  }

  const visibleItems = expanded ? items : items.slice(0, VISIBLE_LIMIT)
  const hiddenCount = items.length - VISIBLE_LIMIT
  const hasMore = !expanded && hiddenCount > 0

  return createPortal(
    <>
      <style>{dropKeyframes}</style>

      {/* Panel dropdown — posisi top-right di bawah navbar */}
      <div
        ref={panelRef}
        className="fixed top-16 right-4 z-[9999] w-80 sm:w-96 bg-white rounded-2xl border border-neutral-200 shadow-2xl font-sans overflow-hidden"
        style={{ animation: 'cartDropIn 300ms cubic-bezier(0.16,1,0.3,1) both' }}
      >

        {/* ── Header ── */}
        <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-neutral-950 flex items-center justify-center">
              <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </div>
            <span className="font-bold text-neutral-950 text-sm">Keranjang Belanja</span>
            {summary.totalItems > 0 && (
              <span className="text-[10px] text-neutral-400 font-medium">· {summary.totalItems} produk</span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="px-2 py-0.5 text-[10px] font-semibold text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
              >
                Kosongkan
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-6 h-6 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer flex items-center justify-center"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Item List ── */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center px-6 py-10">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400 mb-3">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </div>
            <p className="font-bold text-neutral-900 text-xs mb-1">Keranjang Masih Kosong</p>
            <p className="text-[11px] text-neutral-400 mb-4 leading-relaxed">Pilih produk dari katalog dan tambahkan ke keranjang.</p>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Jelajahi Toko Digital
            </button>
          </div>
        ) : (
          <>
            {/* List item — max-height 50vh saat expanded, auto saat collapsed */}
            <div
              className="divide-y divide-neutral-100 overflow-y-auto"
              style={{ maxHeight: expanded ? '50vh' : 'none' }}
            >
              {visibleItems.map((item) => {
                const slug = createProductSlug(item.sku, item.title)
                const origPrice = item.originalPrice || item.price * 2
                return (
                  <div key={item.sku} className="px-4 py-3 flex gap-3 group">
                    <Link
                      href={`/toko-digital/${slug}/`}
                      onClick={onClose}
                      className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0"
                    >
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        draggable={false}
                        decoding="async"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                        style={{ transform: 'translateZ(0)' }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const fb = e.currentTarget.parentElement?.querySelector('.item-fallback')
                          if (fb) fb.style.display = 'flex'
                        }}
                      />
                      <div className="item-fallback hidden w-full h-full items-center justify-center bg-neutral-900 text-white text-[9px] font-bold">
                        .{item.format || 'CDR'}
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className="px-1 py-0.5 rounded bg-neutral-100 text-neutral-500 text-[9px] font-mono font-bold">{item.sku}</span>
                          <span className="px-1 py-0.5 rounded bg-neutral-900 text-white text-[9px] font-mono font-bold uppercase">.{item.format || 'CDR'}</span>
                          {hasPurchasedSku(item.sku) && (
                            <span className="px-1 py-0.5 rounded bg-neutral-200 text-neutral-600 text-[9px] font-bold">✓</span>
                          )}
                        </div>
                        <Link
                          href={`/toko-digital/${slug}/`}
                          onClick={onClose}
                          className="font-semibold text-neutral-900 text-xs leading-snug line-clamp-2 hover:text-neutral-600 transition-colors"
                        >
                          {item.title}
                        </Link>
                      </div>

                      <div className="flex items-center justify-between mt-1.5">
                        <div className="flex items-baseline gap-1">
                          <span className="font-extrabold text-neutral-950 text-sm">{formatRupiah(item.price)}</span>
                          {origPrice > item.price && (
                            <span className="text-[10px] text-neutral-400 line-through">{formatRupiah(origPrice)}</span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.sku)}
                          className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Lihat selengkapnya */}
            {hasMore && (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="w-full px-4 py-2.5 text-xs font-semibold text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 border-t border-neutral-100 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Lihat {hiddenCount} produk lainnya</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}

            {/* ── Footer / Summary ── */}
            <div className="px-4 py-3 border-t border-neutral-100 space-y-2.5">
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-neutral-500">{summary.totalItems} produk</span>
                <div className="flex items-baseline gap-1">
                  {summary.totalSavings > 0 && (
                    <span className="text-neutral-400 line-through text-[10px]">{formatRupiah(summary.subtotal + summary.totalSavings)}</span>
                  )}
                  <span className="font-extrabold text-neutral-950 text-base">{formatRupiah(summary.subtotal)}</span>
                </div>
              </div>

              {isOffline ? (
                <div className="w-full py-2.5 px-4 rounded-xl bg-neutral-100 text-neutral-400 font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed border border-neutral-200">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{ctaText}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Checkout ({summary.totalItems})</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              )}
            </div>
          </>
        )}

      </div>
    </>,
    document.body
  )
}
