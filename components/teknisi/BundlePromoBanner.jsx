'use client'

import Link from 'next/link'

/**
 * BundlePromoBanner.jsx — Banner Promosi Resmi Paket Bundle SKU Toko Digital
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md: Monokrom, badge SKU solid, zero nested cards
 */
export default function BundlePromoBanner({ category = 'hp', onOpenCheckout }) {
  const isLaptop = category === 'laptop'

  const bundleData = isLaptop ? {
    sku: 'ID107002',
    badge: 'PAKET LENGKAP BUNDLE LAPTOP',
    title: 'Full Schematic & Boardview Laptop Premium (Ribuan Skema Master)',
    description: 'Akses 1 folder utuh Google Drive berisi 1.000+ skema PDF dan boardview CAD Asus, Acer, Lenovo, HP, Dell, Apple MacBook. Hemat waktu tanpa perlu unduh satu per satu via iklan.',
    originalPrice: 'Rp 99.000',
    price: 'Rp 39.000',
    coverImage: '/covers/ID107002/cover.webp'
  } : {
    sku: 'ID-TEK-MEGA',
    badge: 'PAKET LENGKAP BUNDLE SMARTPHONE',
    title: 'Mega Cloud Teknisi Smartphone Master (Testpoint EDL, ISP Pinout & Firehose)',
    description: 'Akses 1 folder utuh Google Drive berisi 8.400+ berkas sakti teknisi HP (Xiaomi, Vivo, Samsung, Oppo, Realme, Infinix). Koleksi teruji anti-matot langsung sinkron ke Drive Anda.',
    originalPrice: 'Rp 149.000',
    price: 'Rp 49.000',
    coverImage: '/covers/ID107002/cover.webp'
  }

  const handleAction = () => {
    if (typeof onOpenCheckout === 'function') {
      onOpenCheckout(bundleData)
    }
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 bg-neutral-950 text-white font-mono font-bold text-xs rounded-lg uppercase tracking-wider">
            {bundleData.badge}
          </span>
          <span className="px-2.5 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-800 font-mono text-xs font-bold rounded">
            SKU: {bundleData.sku}
          </span>
        </div>
        <span className="text-xs text-neutral-500 font-mono">
          Akses 1 Folder Utuh Cloud Master
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-3">
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            {bundleData.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
            {bundleData.description}
          </p>
          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs line-through text-neutral-400 font-mono">
              {bundleData.originalPrice}
            </span>
            <span className="text-2xl font-black text-neutral-950 font-mono">
              {bundleData.price}
            </span>
            <span className="px-2 py-0.5 bg-neutral-100 text-neutral-900 border border-neutral-300 text-[10px] font-mono font-bold rounded">
              LIFETIME ACCESS
            </span>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-2.5">
          {onOpenCheckout ? (
            <button
              type="button"
              onClick={handleAction}
              className="w-full py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white text-center font-extrabold text-xs rounded-xl transition-colors uppercase tracking-wider font-mono shadow-md"
            >
              Beli Paket Lengkap Sekarang
            </button>
          ) : (
            <Link
              href={`/toko-digital/${bundleData.sku.toLowerCase()}/`}
              className="w-full py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white text-center font-extrabold text-xs rounded-xl transition-colors uppercase tracking-wider font-mono shadow-md"
            >
              Beli Paket Lengkap Sekarang
            </Link>
          )}

          <div className="text-[11px] text-center text-neutral-500 font-mono">
            Garansi Google Drive 1 Folder Bebas Iklan
          </div>
        </div>
      </div>
    </div>
  )
}
