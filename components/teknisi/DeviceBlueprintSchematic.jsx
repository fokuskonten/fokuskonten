'use client'

/**
 * DeviceBlueprintSchematic.jsx — Blueprint Vektor Skematik Meja Servis & SOP Testpoint
 * Desain Ultra-Presisi Patuh STANDAR_UI_WEB_OFFICIAL.md:
 * - Pilar 1: Kontainer Putih Bersih Bershadow Halus
 * - Pilar 2: Monokrom Mutlak + Aksen Titik Emas Presisi (Amber Gold)
 * - Pilar 3: Zero Icon Amatir, Nomor Mono Box Hitam Pekat
 * - Pilar 7: Tipografi Plus Jakarta Sans (heading) & JetBrains Mono (data teknis)
 * - Pilar 8: Bahasa Meja Servis Laboratorium Faktual (Anti Bahasa Developer)
 */
export default function DeviceBlueprintSchematic({ model }) {
  if (!model) return null

  const brand = (model.brand || 'Smartphone').toUpperCase()
  const modelName = model.model_name || model.modelName || 'Perangkat'
  const chipset = model.chipset || 'Qualcomm Snapdragon / MediaTek'
  const isQualcomm = chipset.toLowerCase().includes('qualcomm') || chipset.toLowerCase().includes('snapdragon')
  const isMtk = chipset.toLowerCase().includes('mediatek') || chipset.toLowerCase().includes('helio') || chipset.toLowerCase().includes('dimensity')

  const targetMode = isQualcomm ? 'EDL 9008 (Qualcomm)' : isMtk ? 'BROM (MediaTek)' : 'Emergency Boot ROM'
  const portDevice = isQualcomm ? 'Qualcomm HS-USB QDLoader 9008' : isMtk ? 'MediaTek USB Port (VCOM)' : 'Emergency USB Serial'

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-5">
      {/* 1. Header Blueprint Presisi */}
      <div className="space-y-1.5 pb-3.5 border-b border-neutral-100">
        <div className="flex items-center justify-between gap-2">
          <span className="px-2 py-0.5 bg-neutral-950 text-white font-mono text-[9px] font-bold rounded uppercase tracking-wider">
            BLUEPRINT MEJA SERVIS
          </span>
          <span className="text-[10px] font-mono text-neutral-500 font-bold">
            SOP EDL 9008 / BROM
          </span>
        </div>
        <h3 className="text-base font-extrabold text-neutral-950 tracking-tight leading-snug">
          Skematik Titik Testpoint {brand} {modelName}
        </h3>
        <p className="text-[11px] text-neutral-500 font-mono leading-relaxed">
          Diagram jalur jumper darurat untuk bypass proteksi otorisasi dan unbrick perangkat.
        </p>
      </div>

      {/* 2. Diagram CAD Vektor Motherboard Bersih (Light Blueprint Style) */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 relative overflow-hidden">
        {/* Subtle CAD Grid Background */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '12px 12px',
          }}
        />

        {/* Layout Motherboard Vektor Bersih */}
        <div className="relative space-y-3 z-10">
          {/* Label Blok Atas */}
          <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500 border-b border-neutral-200 pb-1.5">
            <span className="font-bold uppercase tracking-wider">PCB LAYOUT — UPPER MAINBOARD</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block animate-pulse"></span>
              AKTIF
            </span>
          </div>

          {/* Area Kaleng Shield & Titik Emas Testpoint */}
          <div className="bg-white border border-neutral-200 rounded-lg p-3 shadow-sm space-y-3">
            {/* Kaleng Processor / EMI Shield */}
            <div className="bg-neutral-100 border border-neutral-300 rounded-md p-2.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-extrabold text-neutral-950 block uppercase">
                  {isQualcomm ? 'QUALCOMM SNAPDRAGON' : isMtk ? 'MEDIATEK CORE' : 'PROCESSOR CHIPSET'}
                </span>
                <span className="text-[9px] font-mono text-neutral-500 block">
                  Kaleng Penutup EMI Shield (Ground GND)
                </span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-800 font-mono text-[8px] font-bold">
                GND
              </span>
            </div>

            {/* Visualisasi Titik Jumper Testpoint Emas */}
            <div className="p-3 bg-neutral-50 border border-amber-200 rounded-lg flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {/* Titik Emas TP1 */}
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-5 h-5 rounded-full bg-amber-400 opacity-60 animate-ping" />
                  <div className="w-3 h-3 rounded-full bg-amber-400 border-2 border-amber-600 shadow-sm" />
                </div>
                {/* Garis Jumper */}
                <span className="text-xs font-mono font-bold text-amber-700">&rarr;</span>
                {/* Titik GND */}
                <div className="w-3 h-3 rounded-full bg-neutral-900 border-2 border-neutral-700" />
                <div>
                  <span className="text-[10px] font-mono font-extrabold text-neutral-950 block">
                    TP1 (Testpoint) &rarr; Ground (Shield)
                  </span>
                  <span className="text-[9px] font-mono text-neutral-600 block">
                    Hubungkan kedua titik dengan pinset lancip
                  </span>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-950 font-mono text-[8px] font-extrabold shrink-0">
                JUMPER
              </span>
            </div>

            {/* Peringatan Konektor Baterai */}
            <div className="p-2.5 bg-neutral-950 text-white rounded-md flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono font-extrabold tracking-wider uppercase text-amber-400 block">
                  PERINGATAN POWER
                </span>
                <span className="text-[10px] font-sans text-neutral-300 block">
                  Konektor baterai wajib dilepas (0 Volt)
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-white font-mono text-[9px] font-bold">
                0V
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Parameter Ringkas 2x2 Datar */}
      <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
        <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl">
          <span className="text-neutral-500 block text-[9px] uppercase font-bold">Mode Target</span>
          <strong className="text-neutral-950 block text-xs mt-0.5 truncate">
            {targetMode}
          </strong>
        </div>

        <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl">
          <span className="text-neutral-500 block text-[9px] uppercase font-bold">Metode Jumper</span>
          <strong className="text-neutral-950 block text-xs mt-0.5 truncate">
            TP1 &rarr; Ground (GND)
          </strong>
        </div>

        <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl">
          <span className="text-neutral-500 block text-[9px] uppercase font-bold">Kondisi Daya</span>
          <strong className="text-neutral-950 block text-xs mt-0.5 truncate">
            Baterai Wajib Lepas
          </strong>
        </div>

        <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl">
          <span className="text-neutral-500 block text-[9px] uppercase font-bold">Alat Jumper</span>
          <strong className="text-neutral-950 block text-xs mt-0.5 truncate">
            Pinset Anti-Magnetik
          </strong>
        </div>
      </div>

      {/* 4. SOP Langkah Eksekusi Meja Kerja */}
      <div className="space-y-2 pt-1 border-t border-neutral-100">
        <h4 className="text-[11px] font-mono font-bold text-neutral-950 uppercase tracking-wider">
          SOP Eksekusi Jumper Meja Servis:
        </h4>

        <div className="space-y-1.5 font-sans text-xs text-neutral-700">
          <div className="flex items-start gap-2.5 p-2 bg-neutral-50 border border-neutral-100 rounded-lg">
            <span className="w-4 h-4 bg-neutral-950 text-white rounded font-mono text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <p className="text-[11px] leading-snug">
              <strong>Lepas Konektor Baterai:</strong> Pastikan motherboard bebas dari arus listrik sebelum menyentuh komponen sensitif.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-2 bg-neutral-50 border border-neutral-100 rounded-lg">
            <span className="w-4 h-4 bg-neutral-950 text-white rounded font-mono text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <p className="text-[11px] leading-snug">
              <strong>Hubungkan 2 Titik:</strong> Sentuhkan ujung pinset antara titik testpoint emas (TP1) dan kaleng pelindung CPU (GND).
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-2 bg-neutral-50 border border-neutral-100 rounded-lg">
            <span className="w-4 h-4 bg-neutral-950 text-white rounded font-mono text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <p className="text-[11px] leading-snug">
              <strong>Colok Kabel USB ke PC:</strong> Masukkan kabel data Type-C. Begitu terdengar bunyi deteksi USB, segera lepaskan pinset.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Status Verifikasi Port Device Manager */}
      <div className="p-3 bg-neutral-950 text-white rounded-xl space-y-1 font-mono">
        <div className="flex items-center justify-between text-[9px]">
          <span className="text-neutral-400 uppercase tracking-wider">DEVICE MANAGER STATUS</span>
          <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[8px] font-bold">
            DRIVER SIAP
          </span>
        </div>
        <p className="text-[10px] text-neutral-200 font-bold truncate">
          Ports (COM &amp; LPT) &rarr; {portDevice}
        </p>
      </div>
    </div>
  )
}
