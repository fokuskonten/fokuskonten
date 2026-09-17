'use client'

import { useEffect } from 'react'

/**
 * EbookAdblockModal.jsx — Modal Peringatan Pemblokir Iklan (Adblocker)
 * Muncul secara halus saat pengguna ber-adblocker mengklik tautan sponsor Safelinku.
 * Memandu pengguna memilih antara Traktir Kopi Rp 2.000 (unduh langsung) atau tetap buka tautan sponsor.
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md (Monokrom, Zero-Icon Amatir, Anti-Redundansi).
 */
export default function EbookAdblockModal({ isOpen, onClose, onProceedToSafelink, onOpenTraktir, ebook }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="adblock-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white text-neutral-900 border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-4">
          <div className="space-y-1.5">
            <span className="px-2.5 py-0.5 rounded bg-neutral-100 text-neutral-800 text-[10px] font-mono font-bold tracking-wider uppercase border border-neutral-200">
              PEMBLOKIR IKLAN TERDETEKSI
            </span>
            <h3 id="adblock-modal-title" className="font-extrabold text-lg sm:text-xl text-neutral-950 font-sans tracking-tight">
              Adblocker Aktif di Perangkat Anda
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Dialog"
            className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-950 flex items-center justify-center text-sm font-mono transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Deskripsi Edukasi Tenang & Lugas */}
        <div className="space-y-3 text-xs sm:text-[13.5px] leading-relaxed text-neutral-600 font-sans">
          <p>
            Tautan unduhan gratis disubsidi oleh jaringan sponsor Safelinku. Karena peramban Anda menggunakan pemblokir iklan (AdBlock / Brave Shields), halaman sponsor mungkin gagal diverifikasi atau tautan unduhan tidak dapat diteruskan.
          </p>
          <p className="font-semibold text-neutral-900">
            Silakan pilih solusi yang paling nyaman bagi Anda:
          </p>
        </div>

        {/* 2 Opsi Aksi Tegas */}
        <div className="space-y-3 pt-1">
          {/* Opsi 1: Rekomendasi Utama — Traktir Kopi Rp 2.000 */}
          <button
            type="button"
            onClick={() => {
              onClose()
              if (onOpenTraktir) onOpenTraktir(ebook)
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center justify-between shadow-xs"
          >
            <span>☕ Traktir Kopi Rp 2.000 (Unduh Langsung)</span>
            <span className="font-mono text-xs text-neutral-400">Rekomendasi</span>
          </button>

          {/* Opsi 2: Tetap Lanjut ke Tautan Sponsor */}
          <button
            type="button"
            onClick={() => {
              onClose()
              if (onProceedToSafelink) onProceedToSafelink()
            }}
            className="w-full py-3 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-mono font-bold text-xs uppercase tracking-wider border border-neutral-300 transition-colors flex items-center justify-center gap-2"
          >
            <span>Tetap Buka Tautan Sponsor Safelinku</span>
            <span>&rarr;</span>
          </button>
        </div>

        {/* Footer Catatan Kecil */}
        <p className="text-[11px] font-mono text-neutral-400 text-center pt-2 border-t border-neutral-100">
          Opsi Traktir Kopi menyediakan berkas langsung dari server utama tanpa antrean iklan.
        </p>
      </div>
    </div>
  )
}
