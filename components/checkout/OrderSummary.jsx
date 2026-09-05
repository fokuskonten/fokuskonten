'use client'

import { formatRupiah } from '@/lib/formatters'

export default function OrderSummary({
  product = null,
  items = [],
  voucher = null,
  finalPrice = null
}) {
  const isMulti = Array.isArray(items) && items.length > 0
  if (!product && !isMulti) return null

  const basePrice = isMulti
    ? items.reduce((acc, it) => acc + (Number(it.price) || 0), 0)
    : (Number(product?.price) || 0)

  const origPrice = isMulti
    ? items.reduce((acc, it) => acc + (Number(it.originalPrice) || Number(it.price) * 2), 0)
    : (Number(product?.originalPrice) || basePrice * 2)

  const currentTotal = finalPrice !== null ? finalPrice : basePrice
  const discountAmount = voucher?.discountAmount || 0

  return (
    <div className="bg-neutral-50 rounded-2xl border border-neutral-200/80 p-5 space-y-4 font-sans">
      {/* Product List Header */}
      <div className="space-y-3 pb-3 border-b border-neutral-200/80 max-h-60 overflow-y-auto divide-y divide-neutral-200/60">
        {isMulti ? (
          items.map((it) => (
            <div key={it.sku} className="pt-3 first:pt-0 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-200 shrink-0 border border-neutral-200">
                <img
                  src={it.coverImage || `/covers/${it.sku}/${it.sku}_cover.webp`}
                  alt={it.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-mono text-[9px] font-bold bg-white text-neutral-800 px-1 py-0.2 rounded border border-neutral-200">
                    {it.sku}
                  </span>
                  <span className="font-mono text-[9px] font-bold bg-black text-white px-1 py-0.2 rounded uppercase">
                    .{it.format || 'CDR'}
                  </span>
                </div>
                <h4 className="font-bold text-neutral-950 text-xs truncate leading-snug">
                  {it.title}
                </h4>
              </div>
              <div className="text-xs font-bold text-neutral-950 font-sans shrink-0">
                {formatRupiah(it.price)}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center gap-3.5">
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
        )}
      </div>

      {/* Breakdown Items */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between text-neutral-500">
          <span>Harga Normal</span>
          <span className="line-through">{formatRupiah(origPrice)}</span>
        </div>

        <div className="flex items-center justify-between text-neutral-800">
          <span>{isMulti ? `Harga Paket (${items.length} Item)` : 'Harga'}</span>
          <span className="font-semibold">{formatRupiah(basePrice)}</span>
        </div>

        {voucher && voucher.valid && (
          <div className="flex items-center justify-between text-neutral-900 font-semibold bg-neutral-100 px-2.5 py-1.5 rounded-lg border border-neutral-200">
            <span>Kupon ({voucher.code})</span>
            <span>- {formatRupiah(discountAmount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-neutral-600">
          <span>Lisensi</span>
          <span className="font-bold text-neutral-900">Lisensi Standar</span>
        </div>

        <div className="flex items-center justify-between text-neutral-600">
          <span>Pengiriman</span>
          <span className="font-bold text-neutral-900">Gratis (Instan via Email)</span>
        </div>
      </div>

      {/* Total Due */}
      <div className="pt-3 border-t border-neutral-200 flex items-baseline justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
            Total Pembayaran
          </span>
          <span className="text-[10px] text-neutral-500">
            Termasuk PPN &amp; Lisensi
          </span>
        </div>
        <div className="text-2xl font-black font-sans text-neutral-950 tracking-tight">
          {formatRupiah(currentTotal)}
        </div>
      </div>
    </div>
  )
}
