'use client'

import { formatRupiah } from '@/lib/formatters'

export default function OrderSummary({
  product,
  voucher = null,
  finalPrice = null
}) {
  if (!product) return null

  const basePrice = Number(product.price) || 0
  const origPrice = Number(product.originalPrice) || basePrice * 2
  const currentTotal = finalPrice !== null ? finalPrice : basePrice
  const discountAmount = voucher?.discountAmount || 0

  return (
    <div className="bg-neutral-50 rounded-2xl border border-neutral-200/80 p-5 space-y-4">
      {/* Product Mini Card */}
      <div className="flex items-center gap-3.5 pb-4 border-b border-neutral-200/80">
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-200 shrink-0 border border-neutral-200">
          <img
            src={product.coverImage || `/covers/${product.sku}/${product.sku}_cover.webp`}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-mono text-[10px] font-bold bg-white text-neutral-800 px-1.5 py-0.5 rounded border border-neutral-200">
              {product.sku}
            </span>
            <span className="font-mono text-[10px] font-bold bg-black text-white px-1.5 py-0.5 rounded uppercase">
              .{product.format || 'CDR'}
            </span>
          </div>
          <h4 className="font-bold text-neutral-950 text-xs sm:text-sm line-clamp-2 leading-snug">
            {product.title}
          </h4>
        </div>
      </div>

      {/* Breakdown Items */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between text-neutral-500">
          <span>Harga Normal</span>
          <span className="line-through">{formatRupiah(origPrice)}</span>
        </div>

        <div className="flex items-center justify-between text-neutral-800">
          <span>Harga Master Promo</span>
          <span className="font-semibold">{formatRupiah(basePrice)}</span>
        </div>

        {voucher && voucher.valid && (
          <div className="flex items-center justify-between text-emerald-700 font-semibold bg-emerald-50 px-2 py-1.5 rounded-lg border border-emerald-200/60">
            <span>Kupon ({voucher.code})</span>
            <span>- {formatRupiah(discountAmount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-neutral-500">
          <span>Lisensi Komersial</span>
          <span className="font-bold text-emerald-700">GRATIS</span>
        </div>

        <div className="flex items-center justify-between text-neutral-500">
          <span>Biaya Pengiriman Cloud</span>
          <span className="font-bold text-emerald-700">Rp 0 (Instan)</span>
        </div>
      </div>

      {/* Total Due */}
      <div className="pt-3 border-t border-neutral-200 flex items-baseline justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
            Total Pembayaran
          </span>
          <span className="text-[10px] text-neutral-500">
            Termasuk PPN & Lisensi Komersial
          </span>
        </div>
        <div className="text-2xl font-black font-display text-neutral-950 tracking-tight">
          {formatRupiah(currentTotal)}
        </div>
      </div>
    </div>
  )
}
