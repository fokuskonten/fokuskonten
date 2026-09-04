'use client'

import { useState, useEffect } from 'react'
import { getCartSummary, subscribeCartStore } from '@/lib/cartStore'

export default function CartFloat() {
  const [cartCount, setCartCount] = useState(0)
  const [isBumping, setIsBumping] = useState(false)

  useEffect(() => {
    const summary = getCartSummary()
    setCartCount(summary.totalItems || 0)

    const unsubCart = subscribeCartStore(() => {
      const updated = getCartSummary()
      setCartCount(updated.totalItems || 0)
    })

    const handleCartItemAdded = () => {
      setIsBumping(true)
      setTimeout(() => setIsBumping(false), 800)
    }

    window.addEventListener('cart-item-added', handleCartItemAdded)
    return () => {
      unsubCart()
      window.removeEventListener('cart-item-added', handleCartItemAdded)
    }
  }, [])

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-cart-drawer'))
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Keranjang Belanja"
      title="Keranjang Belanja"
      className={`fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-neutral-950 shadow-lg shadow-black/35 hover:shadow-2xl hover:shadow-black/50 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 border border-neutral-800 ${
        isBumping ? 'scale-125 ring-2 ring-white' : ''
      }`}
    >
      {/* Cart Icon */}
      <svg
        className={`w-6 h-6 fill-current transition-transform duration-200 ${isBumping ? 'scale-125 rotate-12' : ''}`}
        viewBox="0 0 24 24"
      >
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>

      {/* Badge Count */}
      {cartCount > 0 && (
        <span
          className={`absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-white text-neutral-950 text-[10px] font-black font-mono flex items-center justify-center shadow-md border border-neutral-200 transition-all duration-300 ${
            isBumping ? 'scale-125 animate-bounce' : ''
          }`}
        >
          {cartCount > 9 ? '9+' : cartCount}
        </span>
      )}
    </button>
  )
}
