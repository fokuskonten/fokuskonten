'use client'

import { useState } from 'react'
import { addBuyerOrder, syncBuyerOrdersFromServer } from '@/lib/buyerStore'
import { getApiBaseUrl } from '@/lib/apiConfig'

export default function BuyerOrderClaimForm({ profile, onClaimSuccess }) {
  const [orderId, setOrderId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleClaim = async (e) => {
    e.preventDefault()
    setResult(null)
    const cleanId = orderId.trim()
    if (!cleanId) return

    setIsLoading(true)
    try {
      const apiUrl = getApiBaseUrl()
      const res = await fetch(`${apiUrl}/digital-orders/${encodeURIComponent(cleanId)}`)
      if (!res.ok) {
        setResult({
          type: 'error',
          message: 'Nomor nota / invoice tidak ditemukan di sistem Fokus Konten. Periksa kembali ID pesanan Anda.'
        })
        return
      }

      const data = await res.json()
      if (!data.success || !data.order) {
        setResult({
          type: 'error',
          message: 'Data pesanan tidak valid atau belum tercatat.'
        })
        return
      }

      const ord = data.order
      const isPaid = (
        ord.payment_status === 'SETTLEMENT' ||
        ord.payment_status === 'settlement' ||
        ord.payment_status === 'LUNAS' ||
        ord.payment_status === 'success'
      )

      if (!isPaid) {
        setResult({
          type: 'warning',
          message: `Pesanan #${ord.order_id} masih berstatus ${ord.payment_status}. Hanya pesanan lunas yang dapat diklaim.`
        })
        return
      }

      // Hubungkan pesanan ini ke akun pembeli saat ini
      addBuyerOrder({
        orderId: ord.order_id,
        sku: ord.sku_ordered,
        title: ord.product_title,
        format: ord.product_format || 'CDR',
        price: ord.amount,
        driveLink: ord.delivery_link,
        items: ord.items || [],
        customerName: profile?.name || ord.buyer_name,
        customerEmail: profile?.email || ord.buyer_email,
        customerPhone: profile?.phone || ord.buyer_phone,
        paymentType: ord.payment_method,
        status: ord.payment_status.toLowerCase(),
        createdAt: ord.created_at
      })

      if (profile?.email) {
        await syncBuyerOrdersFromServer(profile.email)
      }

      setResult({
        type: 'success',
        message: `Berhasil! Produk "${ord.product_title}" (${ord.sku_ordered}) telah ditambahkan ke akun Anda.`
      })
      setOrderId('')

      if (typeof onClaimSuccess === 'function') {
        onClaimSuccess(ord)
      }
    } catch (err) {
      setResult({
        type: 'error',
        message: 'Gagal menghubungkan ke server untuk verifikasi nota. Pastikan koneksi internet aktif.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h3 className="font-sans font-extrabold text-lg sm:text-xl text-neutral-950 tracking-tight">
          Klaim Pesanan
        </h3>
        <p className="text-xs text-neutral-500 font-sans mt-0.5">
          Punya nomor invoice dari transaksi sebelumnya? Masukkan di sini untuk menambahkan produk ke akun Anda.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-card space-y-6">
        <form onSubmit={handleClaim} className="space-y-5">
          {result && (
            <div className={`p-4 rounded-xl text-xs flex items-start gap-2.5 animate-in fade-in ${
              result.type === 'success'
                ? 'bg-neutral-100 text-neutral-900 border border-neutral-200'
                : result.type === 'warning'
                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {result.type === 'success' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                )}
              </svg>
              <span className="font-medium leading-relaxed">{result.message}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Nomor Nota / Invoice ID
            </label>
            <div className="flex gap-2.5">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Contoh: FK-INV-1788... atau TEST-ORDER-..."
                className="flex-1 px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:border-transparent transition-all"
                required
              />
              <button
                type="submit"
                disabled={isLoading || !orderId.trim()}
                className="px-6 py-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm shadow-soft hover:shadow-card transition-all disabled:opacity-50 cursor-pointer shrink-0"
              >
                {isLoading ? 'Memeriksa...' : 'Klaim Aset'}
              </button>
            </div>
            <p className="text-[11px] text-neutral-400 font-sans">
              Nomor invoice dapat ditemukan di email bukti transaksi atau riwayat konfirmasi admin WhatsApp.
            </p>
          </div>
        </form>

        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 text-xs text-neutral-600 space-y-2">
          <h5 className="font-bold text-neutral-900 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Petunjuk Klaim Pembelian:</span>
          </h5>
          <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
            Setelah diklaim, seluruh hak unduh file master ZIP dan sertifikat lisensi komersial seumur hidup akan langsung muncul di tab <strong>Brankas File &amp; Unduhan</strong> akun Anda secara permanen.
          </p>
        </div>
      </div>
    </div>
  )
}
