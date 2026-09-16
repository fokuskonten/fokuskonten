'use client'

import { useState } from 'react'

/**
 * EbookDmcaModal.jsx — Formulir Pengajuan Takedown Hak Cipta Cepat 1x24 Jam (Celah 4)
 * Menjamin kepatuhan penuh terhadap standar Fair Use dan proteksi domain dari penalti DMCA.
 */
export default function EbookDmcaModal({ isOpen, onClose, ebook }) {
  const [claimantName, setClaimantName] = useState('')
  const [claimantEmail, setClaimantEmail] = useState('')
  const [proofUrl, setProofUrl] = useState('')
  const [statementChecked, setStatementChecked] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen || !ebook) return null

  const sku = ebook.sku || ''
  const title = ebook.title || ''

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!statementChecked) return

    // Konstruksi pesan formal permohonan takedown
    const subject = encodeURIComponent(`[DMCA NOTICE] Permohonan Takedown E-Book: ${title} (${sku})`)
    const body = encodeURIComponent(
      `Yth. Tim Legal FokusKonten,\n\n` +
      `Saya yang bertanda tangan di bawah ini:\n` +
      `Nama Pemegang Hak Cipta / Kuasa: ${claimantName}\n` +
      `Email Kontak Resmi: ${claimantEmail}\n` +
      `Tautan Bukti Hak Cipta: ${proofUrl}\n\n` +
      `Menyatakan dengan itikad baik bahwa penayangan naskah e-book berikut:\n` +
      `Judul: ${title}\n` +
      `SKU: ${sku}\n\n` +
      `Memerlukan penonaktifan dari direktori publik fokuskonte.my.id sesuai ketentuan 1x24 jam kerja.\n\n` +
      `Hormat saya,\n${claimantName}`
    )

    window.open(`mailto:legal@fokuskonten.my.id?subject=${subject}&body=${body}`, '_blank')
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl shadow-2xl p-6 sm:p-7 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center font-bold text-base transition-colors"
          aria-label="Tutup Formulir"
        >
          &times;
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-neutral-950 text-white flex items-center justify-center text-xl font-bold">
              ✓
            </div>
            <h3 className="font-extrabold text-base text-neutral-950">
              Laporan Takedown Terkirim
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm mx-auto">
              Terima kasih atas pemberitahuannya. Tim redaksi dan kepatuhan hukum FokusKonten akan memvalidasi dan menonaktifkan naskah terkait dalam waktu maksimal 1x24 jam kerja.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-5 rounded-xl bg-neutral-950 text-white font-mono font-bold text-xs uppercase tracking-wider"
            >
              Tutup Jendela
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-neutral-100 text-neutral-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                Fair Use &amp; Hak Cipta
              </span>
              <h3 className="font-extrabold text-lg text-neutral-950 mt-1">
                Formulir Pemberitahuan Takedown 1x24 Jam
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                FokusKonten menghormati hak kekayaan intelektual penulis dan penerbit. Formulir ini diproses secara prioritas dalam 1x24 jam kerja.
              </p>
            </div>

            {/* Target E-Book Info */}
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-mono">
              <div className="text-neutral-500">Naskah yang Dilaporkan:</div>
              <div className="font-bold text-neutral-950 mt-0.5 line-clamp-1">{title}</div>
              <div className="text-[11px] text-neutral-500">SKU: {sku}</div>
            </div>

            {/* Input Nama Lengkap */}
            <div className="space-y-1">
              <label htmlFor="claimant-name" className="block text-xs font-bold text-neutral-800">
                Nama Lengkap Pemilik Hak Cipta / Kuasa Sah
              </label>
              <input
                id="claimant-name"
                type="text"
                required
                value={claimantName}
                onChange={(e) => setClaimantName(e.target.value)}
                placeholder="Contoh: Nama Penulis / Penerbit Resmi"
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-neutral-950 font-sans"
              />
            </div>

            {/* Input Email Kontak */}
            <div className="space-y-1">
              <label htmlFor="claimant-email" className="block text-xs font-bold text-neutral-800">
                Alamat Email Resmi Korespondensi
              </label>
              <input
                id="claimant-email"
                type="email"
                required
                value={claimantEmail}
                onChange={(e) => setClaimantEmail(e.target.value)}
                placeholder="kontak@penerbit.com"
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-neutral-950 font-sans"
              />
            </div>

            {/* Input URL Bukti Kepemilikan */}
            <div className="space-y-1">
              <label htmlFor="claimant-proof" className="block text-xs font-bold text-neutral-800">
                Tautan Bukti Kepemilikan Hak Cipta / Katalog Penerbit
              </label>
              <input
                id="claimant-proof"
                type="url"
                required
                value={proofUrl}
                onChange={(e) => setProofUrl(e.target.value)}
                placeholder="https://penerbit.com/buku-resmi"
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-neutral-950 font-sans"
              />
            </div>

            {/* Checkbox Pernyataan Itikad Baik */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="dmca-statement"
                required
                checked={statementChecked}
                onChange={(e) => setStatementChecked(e.target.checked)}
                className="mt-0.5 rounded border-neutral-300 text-neutral-950 focus:ring-neutral-950"
              />
              <label htmlFor="dmca-statement" className="text-[11px] text-neutral-600 leading-tight">
                Saya menyatakan dengan itikad baik bahwa saya adalah pemegang hak cipta sah atau perwakilan berwenang, dan informasi yang disampaikan adalah akurat.
              </label>
            </div>

            <button
              type="submit"
              disabled={!statementChecked}
              className="w-full py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>Kirim Permohonan Takedown (1x24 Jam)</span>
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
