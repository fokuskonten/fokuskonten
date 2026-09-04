'use client'

import { formatRupiah, formatDateTime } from '@/lib/formatters'

export default function InvoiceReceipt({ order }) {
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

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.06)] relative overflow-hidden">
      {/* Watermark Stempel Status */}
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 pointer-events-none select-none">
        {isSettled ? (
          <div className="rotate-[-12deg] border-2 border-neutral-900 text-neutral-950 px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl font-display font-black text-xs sm:text-sm tracking-widest uppercase bg-neutral-100/90 shadow-sm">
            ✓ LUNAS / VERIFIED
          </div>
        ) : (
          <div className="rotate-[-12deg] border-2 border-amber-600 text-amber-700 px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl font-display font-black text-xs sm:text-sm tracking-widest uppercase bg-amber-50/90 shadow-sm">
            ⏳ MENUNGGU PEMBAYARAN
          </div>
        )}
      </div>

      {/* Header Nota */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-neutral-100">
        <img
          src="/logo.webp"
          alt="FokusKonten"
          className="w-10 h-10 object-contain drop-shadow-sm"
        />
        <div>
          <h2 className="font-display font-black text-lg text-neutral-950 tracking-tight leading-none">
            Fokus<span className="text-neutral-900">Konten</span>
          </h2>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
            Bukti Transaksi Resmi
          </span>
        </div>
      </div>

      {/* Invoice Meta Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 text-xs">
        <div>
          <span className="text-neutral-400 font-bold uppercase text-[10px] tracking-wider block mb-1">
            No. Invoice
          </span>
          <span className="font-mono font-bold text-neutral-900 text-sm">
            {order.orderId}
          </span>
        </div>

        <div>
          <span className="text-neutral-400 font-bold uppercase text-[10px] tracking-wider block mb-1">
            Waktu Transaksi
          </span>
          <span className="text-neutral-700 font-medium">
            {formatDateTime(order.createdAt)}
          </span>
        </div>

        <div>
          <span className="text-neutral-400 font-bold uppercase text-[10px] tracking-wider block mb-1">
            Metode Bayar
          </span>
          <span className="text-neutral-900 font-bold uppercase">
            {order.paymentType || 'QRIS / Midtrans'}
          </span>
        </div>

        <div>
          <span className="text-neutral-400 font-bold uppercase text-[10px] tracking-wider block mb-1">
            Status
          </span>
          <span className={`inline-flex items-center font-bold ${isSettled ? 'text-neutral-950' : 'text-amber-700'}`}>
            {isSettled ? '● Pembayaran Berhasil' : '⏳ Menunggu Pembayaran'}
          </span>
        </div>
      </div>

      {/* Customer Info Card */}
      <div className="bg-neutral-50 rounded-2xl p-4 sm:p-5 mb-8 border border-neutral-200/60">
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
                  Commercial Use
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

      {/* Print Button */}
      <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
        <span className="text-[11px] text-neutral-400">
          Simpan nota ini sebagai bukti transaksi resmi FokusKonten.
        </span>
        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>🖨️</span>
          <span>Cetak / Simpan PDF</span>
        </button>
      </div>
    </div>
  )
}
