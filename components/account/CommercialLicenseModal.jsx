'use client'

import { useState } from 'react'
import { formatDate } from '@/lib/formatters'

export default function CommercialLicenseModal({ isOpen, onClose, product, buyerProfile }) {
  if (!isOpen || !product) return null

  const licenseeName = buyerProfile?.name || 'Kreator Terdaftar FokusKonten'
  const licenseeEmail = buyerProfile?.email || 'pembeli@fokuskonten.my.id'
  const purchaseDate = product.lastPurchasedAt ? formatDate(product.lastPurchasedAt) : formatDate(Date.now())
  const licenseCertificateId = `FK-LIC-${(product.sku || 'SKU').toUpperCase()}-${Date.now().toString(36).toUpperCase()}`

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200/80 overflow-hidden animate-in fade-in zoom-in-95 duration-200 print:m-0 print:border-none print:shadow-none">
          
          {/* Certificate Header Banner */}
          <div className="bg-neutral-950 text-white p-6 sm:p-8 flex items-start justify-between border-b border-neutral-800">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 text-neutral-200 border border-neutral-700 text-[11px] font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Sertifikat Lisensi Komersial Resmi</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-sans tracking-tight text-white pt-2">
                Commercial Use Certificate
              </h2>
              <p className="text-xs text-neutral-400 font-sans">
                Diterbitkan secara sah oleh Fokus Konten Digital Marketplace
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors print:hidden cursor-pointer"
              aria-label="Tutup Sertifikat"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Certificate Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 text-xs">
              <div>
                <span className="text-neutral-400 font-medium">Pemegang Lisensi (Licensee):</span>
                <p className="font-bold text-neutral-950 text-sm mt-0.5">{licenseeName}</p>
                <p className="text-neutral-500 font-mono text-[11px]">{licenseeEmail}</p>
              </div>
              <div>
                <span className="text-neutral-400 font-medium">Tanggal Efektif Pembelian:</span>
                <p className="font-bold text-neutral-950 text-sm mt-0.5">{purchaseDate}</p>
                <p className="text-neutral-500 font-mono text-[11px]">{licenseCertificateId}</p>
              </div>
            </div>

            {/* Asset Details */}
            <div className="space-y-1.5 border-b border-neutral-100 pb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Aset Digital Berlisensi:</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-neutral-900 text-white text-xs font-mono font-bold">
                  {product.sku}
                </span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 text-xs font-mono font-bold uppercase">
                  .{product.format || 'CDR'}
                </span>
                <h3 className="font-bold text-neutral-950 text-sm sm:text-base line-clamp-1">
                  {product.title}
                </h3>
              </div>
            </div>

            {/* Scope of License (Syarat & Hak Cipta Komersial) */}
            <div className="space-y-3 text-xs text-neutral-600 font-sans leading-relaxed">
              <h4 className="font-bold text-neutral-950 text-xs uppercase tracking-wider">
                Cakupan Hak Penggunaan Komersial:
              </h4>
              <ul className="space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-neutral-950 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Produksi Cetak Fisik Tanpa Batas:</strong> Berhak digunakan untuk sablon kaos, konveksi garmen, merchandise, banner, nota, dan media cetak lainnya untuk diperjualbelikan kepada konsumen akhir tanpa royalti.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-neutral-950 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Proyek Desain Klien:</strong> Berhak disesuaikan untuk hasil akhir proyek komersial klien (End-Product).</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-neutral-950 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Masa Berlaku Seumur Hidup (Perpetual):</strong> Hak berlaku permanen tanpa biaya langganan tahunan berulang.</span>
                </li>
                <li className="flex items-start gap-2 text-neutral-400">
                  <svg className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span><strong>Batasan Distribusi Mentah:</strong> Dilarang menjual kembali, membagikan gratis, atau mengunggah ulang file master asli (mentahan) kepada pihak ketiga sebagai produk digital mentah.</span>
                </li>
              </ul>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3 print:hidden">
              <span className="text-[11px] text-neutral-400">
                Sertifikat ini sah secara digital &amp; terverifikasi di server Fokus Konten.
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
