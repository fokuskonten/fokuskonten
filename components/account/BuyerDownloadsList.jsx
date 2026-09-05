'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/formatters'
import { createProductSlug } from '@/app/toko-digital/slugHelper'
import CommercialLicenseModal from './CommercialLicenseModal'
import HwidDeviceManagerModal from './HwidDeviceManagerModal'

export default function BuyerDownloadsList({ products = [], buyerProfile }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFormat, setSelectedFormat] = useState('ALL')
  const [licenseTargetProduct, setLicenseTargetProduct] = useState(null)
  const [hwidTargetProduct, setHwidTargetProduct] = useState(null)

  // Ambil daftar format unik dari produk yang dimiliki
  const availableFormats = useMemo(() => {
    const fmts = new Set()
    products.forEach(p => {
      if (p.format) fmts.add(p.format.toUpperCase())
    })
    return ['ALL', ...Array.from(fmts)]
  }, [products])

  // Filter berdasarkan search query dan format
  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      const matchFormat = selectedFormat === 'ALL' || (item.format || '').toUpperCase() === selectedFormat
      const q = searchQuery.toLowerCase().trim()
      const matchQuery = !q || 
        (item.title || '').toLowerCase().includes(q) || 
        (item.sku || '').toLowerCase().includes(q)
      return matchFormat && matchQuery
    })
  }, [products, searchQuery, selectedFormat])

  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-neutral-200 p-8 sm:p-12 text-center shadow-sm font-sans">
        <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-500 border border-neutral-200">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="font-sans font-bold text-lg text-neutral-900 mb-1">
          Belum Ada Produk
        </h3>
        <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6 font-sans">
          Anda belum memiliki produk yang dibeli. Jelajahi katalog untuk menemukan desain siap pakai.
        </p>
        <Link
          href="/toko-digital/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-sans font-bold text-sm shadow-soft hover:shadow-card transition-all"
        >
          <span>Buka Toko Digital</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-5 font-sans">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-sans font-extrabold text-lg sm:text-xl text-neutral-950 tracking-tight">
            File &amp; Unduhan ({products.length})
          </h3>
          <p className="text-xs text-neutral-500 font-medium">
            Akses file unduhan Google Drive Anda
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari desain atau SKU..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white border border-neutral-300 text-xs font-sans text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 shadow-soft"
          />
          <svg className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-neutral-400 hover:text-neutral-700 text-xs font-bold cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Format Filter Chips */}
      {availableFormats.length > 2 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider mr-1">Format:</span>
          {availableFormats.map(fmt => (
            <button
              key={fmt}
              type="button"
              onClick={() => setSelectedFormat(fmt)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedFormat === fmt
                  ? 'bg-neutral-950 text-white shadow-soft'
                  : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200'
              }`}
            >
              {fmt === 'ALL' ? 'Semua Format' : `.${fmt}`}
            </button>
          ))}
        </div>
      )}

      {/* Grid Products */}
      {filteredProducts.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-neutral-200 shadow-sm">
          <p className="text-xs text-neutral-500 font-sans">
            Tidak ada aset yang cocok dengan pencarian <strong>&ldquo;{searchQuery}&rdquo;</strong>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredProducts.map((item) => {
            const productSlug = createProductSlug(item.sku, item.title)
            const driveUrl = item.driveLink && item.driveLink !== '#' ? item.driveLink : null

            return (
              <div
                key={item.sku}
                className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-sm hover:shadow transition-all flex flex-col justify-between gap-4"
              >
                <div className="flex gap-4">
                  {/* Thumbnail Image */}
                  <Link
                    href={`/toko-digital/${productSlug}/`}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0 relative group"
                  >
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      draggable={false}
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const fb = e.currentTarget.parentElement.querySelector('.item-fallback')
                        if (fb) fb.style.display = 'flex'
                      }}
                      className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.02] transform-gpu"
                      style={{
                        imageRendering: '-webkit-optimize-contrast',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)'
                      }}
                    />
                    <div
                      className="item-fallback hidden w-full h-full items-center justify-center bg-neutral-900 text-white text-xs font-bold"
                    >
                      .{item.format || 'CDR'}
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 text-[10px] font-mono font-bold">
                        {item.sku}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-neutral-900 text-white text-[10px] font-mono font-bold uppercase">
                        .{item.format || 'CDR'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setLicenseTargetProduct(item)}
                        className="px-2 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-bold border border-neutral-200 cursor-pointer transition-colors"
                        title="Klik untuk membuka sertifikat lisensi"
                      >
                        ✓ Lisensi Standar
                      </button>
                    </div>

                    <Link href={`/toko-digital/${productSlug}/`}>
                      <h4 className="font-bold text-neutral-950 text-sm leading-snug line-clamp-2 hover:text-black transition-colors mb-1.5">
                        {item.title}
                      </h4>
                    </Link>

                    <p className="text-[11px] text-neutral-400 font-medium">
                      Dibeli: {formatDate(item.lastPurchasedAt)}
                    </p>

                    {/* License Key Quick Display */}
                    <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 font-mono">Lisensi:</span>
                      <span className="font-mono text-[11px] font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200 select-all">
                        {item.licenseKey || `FK-${(item.sku || 'DES').substring(0, 4).toUpperCase()}-${String(item.orderId || '0000').replace(/[^a-zA-Z0-9]/g, '').slice(-8).toUpperCase()}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    {item.orderId && (
                      <Link
                        href={`/toko-digital/user/invoice/?order_id=${item.orderId}`}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                      >
                        Nota
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => setLicenseTargetProduct(item)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                      Sertifikat
                    </button>
                    <button
                      type="button"
                      onClick={() => setHwidTargetProduct(item)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-800 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer flex items-center gap-1 font-mono"
                      title="Kelola slot aktivasi perangkat HWID"
                    >
                      <span>🔑</span>
                      <span>HWID</span>
                    </button>
                  </div>

                  {driveUrl ? (
                    <a
                      href={driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white font-sans font-bold text-xs shadow-soft hover:shadow-card transition-all"
                    >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
                      </svg>
                      <span>Unduh File Master (.ZIP)</span>
                    </a>
                  ) : (
                    <a
                      href={`https://wa.me/6285183011318?text=Halo%20Admin%20FokusKonten%2C%20saya%20sudah%20membeli%20SKU%20${item.sku}%20mohon%20kirimkan%20link%20akses%20Google%20Drive`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-black text-white font-sans font-bold text-xs transition-colors shadow-soft"
                    >
                      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.531 1.77.818 2.796.818 3.179 0 5.765-2.587 5.765-5.766.001-3.181-2.585-5.804-5.765-5.804zm3.394 8.204c-.144.405-.837.774-1.17.824-.312.045-.634.073-1.849-.434-.849-.354-1.469-.942-1.921-1.458-.236-.269-.731-.975-.731-1.859 0-.883.462-1.319.626-1.498.165-.179.359-.224.479-.224.12 0 .24.001.344.006.11.005.257-.042.403.308.15.358.51 1.246.555 1.337.045.09.075.195.015.314-.06.12-.09.195-.18.299-.089.105-.188.234-.269.314-.09.09-.184.187-.079.367.105.18.468.772.999 1.246.685.611 1.264.8 1.444.89.18.09.284.075.389-.045.105-.12.449-.523.569-.703.12-.179.24-.149.404-.09.165.06 1.048.494 1.228.584.18.09.3.135.344.21.045.075.045.434-.099.839z"/>
                      </svg>
                      <span>Klaim Link Drive</span>
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Commercial Standard License Modal */}
      <CommercialLicenseModal
        isOpen={Boolean(licenseTargetProduct)}
        onClose={() => setLicenseTargetProduct(null)}
        product={licenseTargetProduct}
        buyerProfile={buyerProfile}
      />

      {/* HWID Device Manager Modal */}
      <HwidDeviceManagerModal
        isOpen={Boolean(hwidTargetProduct)}
        onClose={() => setHwidTargetProduct(null)}
        product={hwidTargetProduct}
        buyerProfile={buyerProfile}
      />
    </div>
  )
}
