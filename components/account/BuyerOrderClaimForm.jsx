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
      const authEmail = (profile?.email || '').trim().toLowerCase()
      const res = await fetch(`${apiUrl}/digital-orders/${encodeURIComponent(cleanId)}?email=${encodeURIComponent(authEmail)}`)
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

  const waClaimUrl = `https://wa.me/6285183011318?text=Halo%20Admin%20FokusKonten%2C%20saya%20mengalami%20masalah%20dengan%20link%20unduhan%20produk.%20No.%20Invoice%3A%20${encodeURIComponent(orderId || '-')}`

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h3 className="font-sans font-extrabold text-lg sm:text-xl text-neutral-950 tracking-tight">
          Klaim Akses Produk
        </h3>
        <p className="text-xs text-neutral-500 font-sans mt-0.5">
          Gunakan fitur ini jika link unduhan produk yang Anda beli tidak aktif atau tidak ditemukan di akun Anda.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-6">
        <form onSubmit={handleClaim} className="space-y-5">
          {result && (
            <div className={`p-4 rounded-xl text-xs flex items-start gap-2.5 ${
              result.type === 'success'
                ? 'bg-neutral-100 text-neutral-900 border border-neutral-200'
                : 'bg-neutral-100 text-neutral-800 border border-neutral-300'
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
                className="px-6 py-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-50 cursor-pointer shrink-0"
              >
                {isLoading ? 'Memeriksa...' : 'Klaim Akses'}
              </button>
            </div>
            <p className="text-[11px] text-neutral-400 font-sans">
              Nomor invoice dapat ditemukan di email bukti transaksi atau riwayat konfirmasi admin WhatsApp.
            </p>
          </div>
        </form>

        {/* Apa itu klaim akses */}
        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5">
          <p className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Tentang Fitur Ini</p>
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            Klaim akses digunakan untuk memulihkan produk yang sudah Anda beli namun belum terhubung ke akun, atau apabila link unduhan tidak aktif. Setelah berhasil diverifikasi, produk akan muncul di tab <strong className="text-neutral-800">File &amp; Unduhan</strong>.
          </p>
          <p className="text-[11px] text-neutral-400 leading-relaxed pt-1 border-t border-neutral-200">
            Fitur ini <strong className="text-neutral-600">bukan</strong> sarana pengajuan pengembalian dana. Seluruh produk digital yang telah dibeli bersifat final dan tidak dapat dikembalikan.
          </p>
        </div>

        {/* Kebijakan + tombol WA */}
        <div className="rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-100">
            <div className="flex items-start gap-3">
              <svg className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <p className="text-xs font-bold text-neutral-900">Kebijakan Produk Digital</p>
                <p className="text-[11px] text-neutral-500 leading-relaxed mt-0.5">
                  Barang yang sudah dibeli <span className="font-semibold text-neutral-800">tidak dapat dikembalikan</span> dalam kondisi apapun. Pembelian dianggap final setelah pembayaran dikonfirmasi sistem.
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 py-4 flex items-center justify-between gap-4 flex-wrap bg-neutral-50">
            <div>
              <p className="text-xs font-bold text-neutral-900 mb-0.5">Masalah lain dengan produk Anda?</p>
              <p className="text-[11px] text-neutral-500">
                Laporkan langsung ke admin — kami siap membantu memulihkan akses Anda.
              </p>
            </div>
            <a
              href={waClaimUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold transition-colors shrink-0"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Hubungi Admin
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
