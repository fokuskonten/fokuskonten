'use client'

import Link from 'next/link'
import { formatRupiah, formatDateTime, formatPaymentMethod } from '@/lib/formatters'

export default function BuyerOrderHistory({ orders = [] }) {
  if (!orders || orders.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-sans font-extrabold text-lg sm:text-xl text-neutral-950 tracking-tight">
          Riwayat Pesanan ({orders.length})
        </h3>
        <span className="text-xs text-neutral-500 font-medium">
          Daftar transaksi akun Anda
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-5">No. Invoice</th>
                <th className="py-3 px-4">Tanggal Transaksi</th>
                <th className="py-3 px-4">Produk</th>
                <th className="py-3 px-4">Metode</th>
                <th className="py-3 px-4">Total Tagihan</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {orders.map((ord) => {
                const isPaid = ord.status === 'settlement' || ord.status === 'LUNAS' || ord.status === 'success'

                return (
                  <tr key={ord.orderId} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3.5 px-5 font-mono font-bold text-neutral-900">
                      {ord.orderId}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap text-xs">
                      {formatDateTime(ord.createdAt)}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-neutral-950 line-clamp-1 max-w-xs">
                        {ord.title || ord.productTitle || ord.sku}
                      </div>
                      <div className="font-mono text-[10px] text-neutral-400">
                        SKU: {ord.sku} • Format: .{ord.format || 'CDR'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-neutral-700 text-xs whitespace-nowrap">
                      {formatPaymentMethod(ord.paymentType)}
                    </td>
                    <td className="py-3.5 px-4 font-bold font-sans text-neutral-950">
                      {formatRupiah(ord.price || ord.grossAmount)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1.5 text-xs font-medium">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isPaid ? 'bg-emerald-600' : 'bg-amber-500'}`} />
                        <span className={isPaid ? 'text-neutral-900 font-semibold' : 'text-neutral-500'}>
                          {isPaid ? 'Lunas' : 'Menunggu'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <Link
                        href={`/toko-digital/user/invoice/?order_id=${ord.orderId}`}
                        className="px-3 py-1.5 rounded-lg bg-neutral-50 hover:bg-neutral-100 text-neutral-700 hover:text-neutral-950 text-xs font-medium border border-neutral-200 transition-colors inline-block"
                      >
                        Lihat Invoice
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-neutral-200">
          {orders.map((ord) => {
            const isPaid = ord.status === 'settlement' || ord.status === 'LUNAS' || ord.status === 'success'

            return (
              <div key={ord.orderId} className="p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-neutral-900">{ord.orderId}</span>
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isPaid ? 'bg-emerald-600' : 'bg-amber-500'}`} />
                    <span className={isPaid ? 'text-neutral-900 font-semibold' : 'text-neutral-500'}>
                      {isPaid ? 'Lunas' : 'Menunggu'}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-950 text-sm leading-snug line-clamp-2">
                    {ord.title || ord.productTitle || ord.sku}
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    {formatDateTime(ord.createdAt)} • {formatPaymentMethod(ord.paymentType)}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Total Pembayaran</span>
                    <span className="font-bold font-sans text-sm text-neutral-950">
                      {formatRupiah(ord.price || ord.grossAmount)}
                    </span>
                  </div>

                  <Link
                    href={`/toko-digital/user/invoice/?order_id=${ord.orderId}`}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    Buka Nota
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
