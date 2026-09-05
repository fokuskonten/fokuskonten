'use client'

import { useState } from 'react'
import { formatRupiah, formatDateTime, formatPaymentMethod } from '@/lib/formatters'

export default function InvoiceReceipt({ order }) {
  const [copiedKey, setCopiedKey] = useState(false)
  if (!order) return null

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  const status = (order.status || 'pending').toLowerCase()
  const isSettled = (
    status === 'settlement' || 
    status === 'lunas' || 
    status === 'success'
  )

  const items = (Array.isArray(order.items) && order.items.length > 0)
    ? order.items
    : [{
        sku: order.sku,
        title: order.title || order.productTitle || order.sku,
        format: order.format || 'CDR',
        price: order.price || order.grossAmount
      }]

  const resolvedLicenseKey = order.license_key || order.license?.licenseKey || (
    items.find(i => i.licenseKey)?.licenseKey
  ) || `FK-${(order.sku || 'DES').substring(0, 4).toUpperCase()}-${String(order.orderId || '0000').replace(/[^a-zA-Z0-9]/g, '').slice(-8).toUpperCase()}`

  return (
    <div className="invoice-receipt-container bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-sm print:border-neutral-300 print:shadow-none print:p-6 print:rounded-2xl">
      {/* Header Nota — Letterhead Profesional */}
      <div className="relative pb-8 mb-8 border-b border-neutral-200 flex flex-wrap items-end justify-between gap-4">
        {/* Brand / Pengirim */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-950 flex items-center justify-center shrink-0">
            <span className="text-white font-black text-sm font-sans tracking-tight">FK</span>
          </div>
          <div>
            <div className="font-extrabold text-neutral-950 text-base tracking-tight leading-tight">FokusKonten</div>
            <div className="text-[11px] text-neutral-400 font-medium mt-0.5">Pengembang &amp; Publisher Aset Digital Kreatif</div>
            <div className="text-[10px] text-neutral-400 font-mono">fokuskonte.my.id</div>
          </div>
        </div>

        {/* Stempel — absolute tengah-kanan header */}
        <img
          src={isSettled ? '/stamp-lunas.jpg' : '/stamp-menunggu.jpg'}
          alt={isSettled ? 'Lunas' : 'Menunggu'}
          className="absolute left-[55%] top-[38%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 object-contain pointer-events-none select-none rotate-[-20deg]"
          style={{ mixBlendMode: 'multiply' }}
          draggable={false}
        />

        {/* Judul Dokumen */}
        <div className="text-right">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-neutral-950 leading-none">
            Bukti Pembelian
          </h2>
          <p className="mt-1.5">
            <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">No. Invoice </span>
            <span className="font-mono text-neutral-900 font-bold text-sm">#{order.orderId}</span>
          </p>
        </div>
      </div>

      {/* Meta Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 text-xs sm:text-sm">
        <div>
          <span className="text-neutral-400 font-bold uppercase text-[10px] tracking-wider block mb-1">
            Tanggal Pesanan
          </span>
          <span className="text-neutral-900 font-bold">
            {formatDateTime(order.createdAt)}
          </span>
        </div>

        <div>
          <span className="text-neutral-400 font-bold uppercase text-[10px] tracking-wider block mb-1">
            No. Referensi
          </span>
          <span className="text-neutral-900 font-mono font-bold">
            {order.orderId}
          </span>
        </div>

        <div>
          <span className="text-neutral-400 font-bold uppercase text-[10px] tracking-wider block mb-1">
            Metode Pembayaran
          </span>
          <span className="text-neutral-900 font-bold">
            {formatPaymentMethod(order.paymentType)}
          </span>
        </div>

        <div>
          <span className="text-neutral-400 font-bold uppercase text-[10px] tracking-wider block mb-1">
            Status
          </span>
          <span className="font-bold text-neutral-900">
            {isSettled ? 'Pembayaran Berhasil' : 'Menunggu Pembayaran'}
          </span>
        </div>
      </div>

      {/* Instruksi Pembayaran — hanya tampil jika belum lunas */}
      {!isSettled && (
        <div className="mb-8 rounded-2xl border border-neutral-200 bg-neutral-50 overflow-hidden">
          <div className="px-4 sm:px-5 py-3 border-b border-neutral-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Instruksi Pembayaran
            </span>
          </div>

          {/* Nomor Pembayaran — tampil jika webhook sudah dikirim Midtrans */}
          {order.paymentCode && (
            <div className="px-4 sm:px-5 py-4 border-b border-neutral-200 bg-white">
              {/* Mandiri echannel: format "billerCode|billKey" */}
              {order.paymentCode.includes('|') ? (
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Kode Pembayaran Mandiri</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div>
                      <span className="text-[10px] text-neutral-400 block mb-0.5">Kode Perusahaan</span>
                      <span className="font-mono font-black text-neutral-950 text-lg tracking-widest">
                        {order.paymentCode.split('|')[0]}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block mb-0.5">Kode Tagihan</span>
                      <span className="font-mono font-black text-neutral-950 text-lg tracking-widest">
                        {order.paymentCode.split('|')[1]}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-neutral-400">Masukkan kode di atas melalui ATM, m-Banking, atau Mandiri Online &rarr; Bayar &rarr; Multi Payment.</p>
                </div>
              ) : order.paymentCode.startsWith('http') ? (
                /* QRIS URL */
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Kode QR Pembayaran</p>
                  <p className="text-[11px] text-neutral-500">Scan QR melalui aplikasi dompet digital atau m-Banking Anda.</p>
                </div>
              ) : (
                /* VA number biasa */
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Nomor Virtual Account</p>
                  <span className="font-mono font-black text-neutral-950 text-xl tracking-widest">
                    {order.paymentCode}
                  </span>
                  <p className="text-[11px] text-neutral-400 mt-1">Transfer ke nomor VA di atas sesuai nominal tagihan. Pembayaran otomatis terverifikasi.</p>
                </div>
              )}
            </div>
          )}

          <div className="px-4 sm:px-5 py-4 flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">1</span>
              <p className="text-neutral-700 text-xs leading-relaxed">
                {order.paymentCode
                  ? <>Gunakan kode di atas untuk menyelesaikan pembayaran via <span className="font-bold text-neutral-950">{order.paymentType || 'metode yang dipilih'}</span>.</>
                  : <>Selesaikan pembayaran melalui metode <span className="font-bold text-neutral-950">{order.paymentType || 'yang dipilih'}</span> pada halaman checkout Midtrans yang telah terbuka.</>
                }
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">2</span>
              <p className="text-neutral-700 text-xs leading-relaxed">
                Setelah pembayaran dikonfirmasi, file aset akan otomatis dikirim ke email terdaftar.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">3</span>
              <p className="text-neutral-700 text-xs leading-relaxed">
                Simpan nomor referensi <span className="font-mono font-bold text-neutral-950">{order.orderId}</span> sebagai bukti transaksi Anda.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Customer Info Card */}
      <div className="bg-neutral-50 rounded-2xl p-4 sm:p-5 mb-8 border border-neutral-200">
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
          Data Pembeli
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
          <div>
            <span className="font-bold text-neutral-950 block">{order.customerName || 'Pembeli FokusKonten'}</span>
            <span className="text-neutral-500 font-mono text-xs">{order.customerEmail}</span>
          </div>
          {order.customerPhone && (
            <div className="text-neutral-500 text-xs sm:text-right">
              WhatsApp: {order.customerPhone}
            </div>
          )}
        </div>
      </div>

      {/* Item Table */}
      <div className="mb-8 overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-neutral-400 font-bold uppercase text-[10px] tracking-wider">
              <th className="pb-3">Deskripsi Aset Master</th>
              <th className="pb-3 text-center">Format</th>
              <th className="pb-3 text-center">Lisensi</th>
              <th className="pb-3 text-right">Harga</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {items.map((it, idx) => (
              <tr key={it.sku || idx}>
                <td className="py-4 pr-4">
                  <div className="font-bold text-neutral-950 text-sm">
                    {it.title || `Master Desain ${it.sku}`}
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                    SKU: {it.sku}
                  </div>
                </td>
                <td className="py-4 text-center font-mono font-bold text-neutral-700">
                  .{it.format || 'CDR'}
                </td>
                <td className="py-4 text-center text-xs font-bold text-neutral-900">
                  Standard License
                </td>
                <td className="py-4 text-right font-bold font-display text-neutral-950 text-base">
                  {formatRupiah(it.price || (order.price / items.length))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Breakdown Total */}
      <div className="pt-4 border-t border-neutral-200 flex flex-col items-end gap-2 text-xs">
        {order.discountAmount > 0 && (
          <div className="flex justify-between w-full max-w-xs text-neutral-500">
            <span>Potongan Voucher</span>
            <span className="text-neutral-950 font-bold">- {formatRupiah(order.discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between w-full max-w-xs text-sm sm:text-base font-black font-display text-neutral-950 pt-2 border-t border-neutral-100">
          <span>{isSettled ? 'Total Lunas' : 'Total Tagihan'}</span>
          <span>{formatRupiah(order.price || order.grossAmount)}</span>
        </div>
      </div>

      {/* ── LISENSI KRIPTOGRAFI HWID & OTENTIKASI RESMI (HANYA MUNCUL JIKA SUDAH LUNAS) ── */}
      {isSettled && (
        <div className="mt-8 rounded-2xl border border-neutral-300 bg-neutral-50/70 p-5 sm:p-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-950 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 font-mono">
                  Sertifikasi Kriptografi HWID • HMAC-SHA256
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-neutral-950 mt-1">
                Kunci Lisensi Perangkat Resmi (Hardware License)
              </h3>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-neutral-900 text-white text-[11px] font-mono font-bold self-start sm:self-auto">
              Maks. 2 Perangkat Aktif
            </span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
                Nomor Kunci Lisensi (License Key):
              </span>
              <div className="inline-flex items-center gap-2">
                <span className="font-mono text-base sm:text-lg font-black text-neutral-950 tracking-wider bg-white px-3 py-1 rounded-xl border border-neutral-200 shadow-sm select-all">
                  {resolvedLicenseKey}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== 'undefined' && navigator.clipboard) {
                      navigator.clipboard.writeText(resolvedLicenseKey)
                      setCopiedKey(true)
                      setTimeout(() => setCopiedKey(false), 2000)
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold transition-all cursor-pointer shadow-sm no-print"
                >
                  {copiedKey ? '✓ Tersalin!' : 'Salin Kunci'}
                </button>
              </div>
            </div>

            <div className="text-xs text-neutral-500 max-w-xs space-y-1">
              <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                Status Kriptografi:
              </div>
              <p className="leading-snug">
                Terverifikasi secara kriptografis di server FokusKonten. Lisensi ini mengikat identitas motherboard &amp; CPU secara aman saat aktivasi.
              </p>
            </div>
          </div>

          {/* Quick Activation Guide */}
          <div className="mt-4 pt-3 border-t border-neutral-200/80 text-[11px] text-neutral-500 flex flex-col sm:flex-row gap-2 sm:gap-6">
            <div><strong>Langkah 1:</strong> Buka software di PC/Laptop kasir.</div>
            <div><strong>Langkah 2:</strong> Masukkan License Key pada menu aktivasi.</div>
            <div><strong>Langkah 3:</strong> Selesai! HWID terikat otomatis tanpa USB dongle.</div>
          </div>
        </div>
      )}

      {/* Print Button */}
      <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between no-print">
        <span className="text-[11px] text-neutral-400">
          Simpan nota ini sebagai bukti transaksi resmi FokusKonten.
        </span>
        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <svg className="w-4 h-4 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Cetak / Simpan PDF</span>
        </button>
      </div>
    </div>
  )
}
