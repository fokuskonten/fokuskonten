'use client'

/**
 * DeviceSpecsGrid.jsx — Panel Spesifikasi Perangkat 2x2 Datar Monokrom
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md: Zero Nested Card, Pembatas divide-neutral-100
 */
export default function DeviceSpecsGrid({ model }) {
  if (!model) return null

  const specs = [
    { label: 'Merek / Pabrikan', value: model.brand || 'Perangkat Hardware' },
    { label: 'Tipe / Nama Model', value: model.model_name || model.slug },
    { label: 'Chipset / Arsitektur', value: model.chipset || 'Arsitektur Terverifikasi' },
    { label: 'Kode Board / Varian', value: model.motherboard_code || 'Universal Board Variant' },
    { label: 'Mode Operasional', value: model.type || 'EDL 9008 / BROM Direct' },
    { label: 'Status Pengujian', value: model.has_testpoint ? 'Testpoint Hardware Verified' : 'Skema Sirkuit Verified' }
  ]

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <h2 className="text-xl font-extrabold text-neutral-950 tracking-tight">Spesifikasi Landasan Hardware</h2>
        <span className="px-3 py-1 bg-neutral-950 text-white font-mono font-bold text-xs rounded-lg uppercase tracking-wider">
          {model.category === 'laptop' ? 'SKEMA LAPTOP' : 'SMARTPHONE HARDWARE'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-100 mt-4">
        <div className="pr-0 md:pr-6 space-y-4">
          {specs.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b border-neutral-100 last:border-0">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{item.label}</span>
              <span className="text-sm font-bold text-neutral-950 font-mono text-right">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="pl-0 md:pl-6 pt-4 md:pt-0 space-y-4">
          {specs.slice(3, 6).map((item, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b border-neutral-100 last:border-0">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{item.label}</span>
              <span className="text-sm font-bold text-neutral-950 font-mono text-right">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
