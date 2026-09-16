'use client'

/**
 * LiveStatsCard.jsx — Kartu Statistik Live Jumlah Model & Berkas Terverifikasi
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md: Font Mono Bold, White elevated card
 */
export default function LiveStatsCard({ stats }) {
  if (!stats) return null

  const items = [
    { label: 'Model Terverifikasi', value: (stats.totalCatalogModels || 4532).toLocaleString('id-ID') },
    { label: 'Berkas Master GDrive', value: (stats.totalFiles || 10372).toLocaleString('id-ID') },
    { label: 'Merek Smartphone', value: stats.totalHpBrands || 61 },
    { label: 'Merek Laptop & Board', value: stats.totalLaptopBrands || 16 }
  ]

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <h3 className="text-base font-extrabold text-neutral-950">Statistik Lumbung Master</h3>
        <span className="px-2.5 py-0.5 bg-neutral-950 text-white font-mono font-bold text-[10px] rounded uppercase">
          LIVE DATA
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((stat, idx) => (
          <div key={idx} className="p-3 bg-neutral-50 border border-neutral-100 rounded-xl space-y-1">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">{stat.label}</span>
            <span className="text-xl font-extrabold text-neutral-950 font-mono block">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
