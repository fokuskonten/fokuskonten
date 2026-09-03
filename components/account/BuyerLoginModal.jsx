'use client'

import { useState } from 'react'
import { isValidEmail } from '@/lib/validators'

export default function BuyerLoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const cleanEmail = email.trim().toLowerCase()
    if (!cleanEmail) {
      setError('Silakan masukkan alamat email Anda.')
      return
    }

    if (!isValidEmail(cleanEmail)) {
      setError('Format email tidak valid. Pastikan penulisan benar (contoh: nama@gmail.com).')
      return
    }

    setLoading(true)
    setTimeout(() => {
      onLogin({
        email: cleanEmail,
        name: name.trim() || cleanEmail.split('@')[0]
      })
      setLoading(false)
      onClose()
    }, 400)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors text-sm font-bold"
          aria-label="Tutup"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-neutral-950 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
          <h3 className="font-display font-black text-xl text-neutral-950 tracking-tight">
            Akses Akun & Unduhan
          </h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
            Masukkan alamat Gmail yang Anda gunakan saat bertransaksi untuk membuka riwayat file master desain Anda.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
              Alamat Gmail Utama <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh: namaanda@gmail.com"
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-medium outline-none transition-all"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
              Nama Anda <span className="text-neutral-400 font-normal">(Opsional)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama panggilan atau bisnis"
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-medium outline-none transition-all"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-black hover:bg-neutral-800 active:scale-[0.99] text-white font-display font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Memuat Brankas Aset...</span>
              ) : (
                <>
                  <span>Buka Brankas Unduhan Saya</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-neutral-100 text-center text-xs text-neutral-400">
          🔒 Bebas repot tanpa password. Cukup gunakan Gmail yang sama saat membeli.
        </div>
      </div>
    </div>
  )
}
