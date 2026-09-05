'use client'

import { useState, useEffect } from 'react'
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

export default function CartDrawer({ isOpen, onClose }) {
  const router = useRouter()
  const { isOffline, ctaText } = useStoreHealth()
  const [items, setItems] = useState([])
  const [summary, setSummary] = useState({ totalItems: 0, subtotal: 0, totalSavings: 0 })
  const [mounted, setMounted] = useState(false)

  const updateCartState = () => {
    const it = getCartItems()
    const sm = getCartSummary()
    setItems(it)
    setSummary(sm)
  }

  useEffect(() => {
    setMounted(true)
    updateCartState()
    const unsubscribe = subscribeCartStore(() => {
      updateCartState()
    })
    return () => unsubscribe()
  }, [])

  // Mencegah scroll pada body saat drawer terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !mounted) return null

  const handleCheckoutClick = () => {
    onClose()
    router.push('/toko-digital/checkout/')
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10 z-[10000]">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-neutral-200/80 animate-in slide-in-from-right duration-300 h-full">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 flex items-center justify-center text-white shadow-soft">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-neutral-950 text-base leading-tight">
                  Keranjang Belanja
                </h3>
                <p className="text-xs text-neutral-500 font-medium">
                  {summary.totalItems} Produk
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="px-2.5 py-1 text-[11px] font-semibold text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Kosongkan
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Tutup Keranjang"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-neutral-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 mb-3 shadow-inner">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-neutral-900 text-sm mb-1">Keranjang Masih Kosong</h4>
                <p className="text-xs text-neutral-400 max-w-xs mb-5 leading-relaxed">
                  Pilih produk favorit Anda dari katalog dan tambahkan ke keranjang.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs shadow-soft transition-all cursor-pointer"
                >
                  Jelajahi Toko Digital
                </button>
              </div>
            ) : (
              items.map((item) => {
                const slug = createProductSlug(item.sku, item.title)
                const itemOrigPrice = item.originalPrice || item.price * 2
                return (
                  <div key={item.sku} className="pt-3.5 first:pt-0 flex gap-3.5 group">
                    {/* Thumbnail */}
                    <Link
                      href={`/toko-digital/${slug}/`}
                      onClick={onClose}
                      className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/60 shrink-0 relative"
                    >
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        draggable={false}
                        decoding="async"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200 transform-gpu"
                        style={{
                          WebkitBackfaceVisibility: 'hidden',
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0)'
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const fb = e.currentTarget.parentElement.querySelector('.item-fallback')
                          if (fb) fb.style.display = 'flex'
                        }}
                      />
                      <div className="item-fallback hidden w-full h-full items-center justify-center bg-neutral-900 text-white text-[10px] font-bold">
                        .{item.format || 'CDR'}
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-800 text-[9px] font-mono font-bold">
                            {item.sku}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-white text-[9px] font-mono font-bold uppercase">
                            .{item.format || 'CDR'}
                          </span>
                          {hasPurchasedSku(item.sku) && (
                            <span className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-800 text-[9px] font-mono font-bold">
                              ✓ Dimiliki
                            </span>
                          )}
                        </div>
                        <Link 
                          href={`/toko-digital/${slug}/`}
                          onClick={onClose}
                          className="font-bold text-neutral-950 text-xs leading-snug line-clamp-2 hover:text-black transition-colors"
                        >
                          {item.title}
                        </Link>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-extrabold text-neutral-950 text-sm font-sans">
                            {formatRupiah(item.price)}
                          </span>
                          {itemOrigPrice > item.price && (
                            <span className="text-[10px] text-neutral-400 line-through">
                              {formatRupiah(itemOrigPrice)}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.sku)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Hapus dari keranjang"
                          aria-label={`Hapus ${item.sku}`}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Drawer Footer / Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-200/80 bg-neutral-50/70 space-y-3">
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Total Produk ({summary.totalItems} item)</span>
                  <span className="font-semibold text-neutral-900">{formatRupiah(summary.subtotal)}</span>
                </div>
                {summary.totalSavings > 0 && (
                  <div className="flex justify-between text-neutral-900 font-semibold">
                    <span>Hemat Promo</span>
                    <span>-{formatRupiah(summary.totalSavings)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-neutral-200/60 flex justify-between items-baseline">
                  <span className="font-bold text-neutral-950 text-sm">Total Pembayaran</span>
                  <span className="font-extrabold text-neutral-950 text-lg font-sans">{formatRupiah(summary.subtotal)}</span>
                </div>
              </div>

              {isOffline ? (
                <div className="space-y-2">
                  <div className="w-full py-3.5 px-4 rounded-xl bg-neutral-200 text-neutral-500 font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed border border-neutral-300 select-none">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{ctaText}</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 bg-neutral-100 border border-neutral-200 rounded-xl p-2 text-center font-sans">
                    Server transaksi sedang offline. Anda dapat menghubungi admin melalui menu <strong>Hubungi</strong> di navigasi atas.
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm shadow-card hover:shadow-float transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Checkout ({summary.totalItems})</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              )}

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 font-medium">
                <svg className="w-3.5 h-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Pembayaran aman via QRIS &amp; Transfer Bank</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>,
    document.body
  )
}

