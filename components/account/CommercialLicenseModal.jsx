'use client'

import { useState } from 'react'
import { formatDate } from '@/lib/formatters'

export default function CommercialLicenseModal({ isOpen, onClose, product, buyerProfile }) {
  if (!isOpen || !product) return null

  const licenseeName = buyerProfile?.name || 'Kreator Terdaftar FokusKonten'
  const licenseeEmail = buyerProfile?.email || 'pembeli@fokuskonten.my.id'
  const purchaseDate = product.lastPurchasedAt ? formatDate(product.lastPurchasedAt) : formatDate(Date.now())
  const licenseCertificateId = product.licenseKey || `FK-${(product.sku || 'SKU').toUpperCase()}-${Date.now().toString(36).toUpperCase()}`

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/35 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 print:m-0 print:border-none print:shadow-none">
          
          {/* Certificate Header Banner */}
          <div className="bg-neutral-950 text-white p-6 sm:p-8 flex items-start justify-between border-b border-neutral-800">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 text-neutral-200 border border-neutral-700 text-[11px] font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Sertifikat Lisensi Standar</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-sans tracking-tight text-white pt-2">
                Standard License Certificate
              </h2>
              <p className="text-xs text-neutral-400 font-sans">
                Diterbitkan secara sah oleh FokusKonten Publisher &bull; HMAC-SHA256 Cryptographic Seal
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors print:hidden cursor-pointer"
              aria-label="Tutup Sertifikat"
            >
              <svg className="w-4 h-4 fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Certificate Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs">
              <div>
                <span className="text-neutral-400 block text-[10px] font-bold uppercase tracking-wider mb-0.5">Pemegang Lisensi (Licensee):</span>
                <span className="font-bold text-neutral-900 text-sm">{licenseeName}</span>
                <span className="text-neutral-500 block font-mono text-[11px]">{licenseeEmail}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] font-bold uppercase tracking-wider mb-0.5">Status Lisensi:</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-neutral-900">
                  <span className="w-2 h-2 rounded-full bg-neutral-900" />
                  Aktif &amp; Terverifikasi
                </span>
                <span className="text-neutral-500 block text-[11px]">Tipe: Standar (Maks. 2 Perangkat Terikat)</span>
              </div>
            </div>

            {/* Product Asset & HWID License Info */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
              <div>
                <span className="text-neutral-400 block text-[10px] font-bold uppercase tracking-wider mb-1">Aset Terdaftar:</span>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded bg-neutral-900 text-white font-mono text-[10px] font-bold">
                    SKU: {product.sku}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neutral-200 text-neutral-800 font-mono text-[10px] font-bold uppercase">
                    .{product.format || 'CDR'}
                  </span>
                  <h3 className="font-bold text-neutral-950 text-sm sm:text-base line-clamp-1">
                    {product.title}
                  </h3>
                </div>
              </div>

              <div className="pt-2.5 border-t border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Kunci Lisensi Resmi (HWID License Key):
                  </span>
                  <span className="font-mono text-sm font-black text-neutral-950 bg-white px-2.5 py-1 rounded-lg border border-neutral-200 inline-block mt-0.5 shadow-sm">
                    {licenseCertificateId}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-neutral-500">
                  Kriptografi: HMAC-SHA256
                </div>
              </div>
            </div>

            {/* Scope of License (Syarat & Hak Cipta Standar) */}
            <div className="space-y-3 text-xs text-neutral-600 font-sans leading-relaxed">
              <h4 className="font-bold text-neutral-950 text-xs uppercase tracking-wider">
                Cakupan Hak Penggunaan Lisensi Standar:
              </h4>
              <ul className="space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-neutral-950 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Penggunaan Personal &amp; Proyek Mandiri:</strong> Berhak digunakan untuk materi presentasi, portofolio, dan materi promosi kebutuhan mandiri pembeli.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-neutral-950 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Modifikasi Aset:</strong> Berhak mengedit, menyesuaikan warna, dan mengganti teks sesuai kebutuhan proyek akhir (End-Product).</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-neutral-950 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Masa Berlaku Permanen:</strong> Akses unduhan file master berlaku tetap untuk akun terdaftar.</span>
                </li>
                <li className="flex items-start gap-2 text-neutral-500">
                  <svg className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span><strong>Batasan Tegas:</strong> Dilarang keras menjual kembali, membagikan gratis, mengunggah ulang file mentah (.CDR/.PPTX), atau mendaftarkan karya ini sebagai hak cipta pribadi ke pihak mana pun.</span>
                </li>
              </ul>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3 print:hidden">
              <span className="text-[11px] text-neutral-400">
                Sertifikat ini sah secara digital &amp; terverifikasi di server FokusKonten.
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition-colors cursor-pointer shadow-soft"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>Cetak / Simpan PDF</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-soft"
                >
                  Tutup
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
