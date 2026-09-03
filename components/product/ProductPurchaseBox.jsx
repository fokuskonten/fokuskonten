function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(num || 0)
}

export default function ProductPurchaseBox({ product, fmtMeta, generateWhatsAppLink }) {
  if (!product) return null

  const origPrice = product.originalPrice || product.price * 2
  const discountPercent = origPrice > product.price
    ? Math.round(((origPrice - product.price) / origPrice) * 100)
    : 50

  const waUrl = typeof generateWhatsAppLink === 'function' ? generateWhatsAppLink() : '#'

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] space-y-6">
      {/* License Badge Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <span className="px-2.5 py-1 rounded-md bg-neutral-900 text-white text-[11px] font-bold uppercase tracking-wider">
          Commercial License
        </span>
        <span className="text-xs text-neutral-500 font-medium">
          Unlimited Projects
        </span>
      </div>

      {/* Price Display */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Harga Master:</span>
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
            Hemat {discountPercent}%
          </span>
        </div>
        <div className="flex items-baseline gap-2.5">
          <div className="text-3xl sm:text-4xl font-black text-neutral-950 font-display tracking-tight">
            {formatRupiah(product.price)}
          </div>
          <div className="text-sm text-neutral-400 line-through">
            {formatRupiah(origPrice)}
          </div>
        </div>
      </div>

      {/* Inclusion Checklist */}
      <div className="space-y-3 pt-4 border-t border-neutral-100 text-xs sm:text-sm text-neutral-700">
        <div className="flex items-start gap-2.5">
          <span className="text-emerald-600 font-bold mt-0.5">✓</span>
          <span><strong>File Master Original:</strong> Format {fmtMeta?.ext || 'Master'} siap edit dan siap produksi.</span>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="text-emerald-600 font-bold mt-0.5">✓</span>
          <span><strong>Lisensi Komersial:</strong> Bebas digunakan untuk klien, cetak kaos, dan proyek bisnis.</span>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="text-emerald-600 font-bold mt-0.5">✓</span>
          <span><strong>Penyimpanan Cloud:</strong> Akses Google Drive resmi berkecepatan tinggi.</span>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="text-emerald-600 font-bold mt-0.5">✓</span>
          <span><strong>Pengiriman Otomatis:</strong> Tautan akses langsung dikirim ke Email (Gmail) Anda.</span>
        </div>
      </div>

      {/* Primary High-Impact CTA Button */}
      <div className="pt-2">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-2.5 text-center cursor-pointer group"
        >
          <svg className="w-5 h-5 fill-[#25D366] shrink-0" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="whitespace-nowrap">Beli Sekarang via WhatsApp</span>
        </a>
      </div>

      {/* Trust Badges */}
      <div className="pt-1 flex flex-col gap-1 text-center text-xs text-neutral-500">
        <span className="flex items-center justify-center gap-1.5 text-neutral-700 font-semibold">
          <span>🔒</span>
          <span>Pembayaran Resmi (QRIS / Bank Transfer)</span>
        </span>
        <span>File Original 100% • Bebas Ongkir • Akses Seketika</span>
      </div>
    </div>
  )
}
