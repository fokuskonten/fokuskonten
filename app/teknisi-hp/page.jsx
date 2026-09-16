'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

// Sample Database Koleksi Generic (3.078 Testpoint & 1.565 ISP Pinout)
const sampleDatabase = [
  {
    id: 'tp_xiaomi_redmi_note_10_4g',
    brand: 'Xiaomi',
    marketingName: 'Redmi Note 10 4G (Mojito / Sunny)',
    modelName: 'M2101K7AG / M2101K7AI',
    chipset: 'Qualcomm Snapdragon 678 (SM6115)',
    type: 'Testpoint EDL 9008',
    mode: 'Qualcomm HS-USB QDLoader 9008',
    imagePath: '/database/testpoint/xiaomi/xiaomi_redmi_note_10_4g_tp.jpg',
    instructions: [
      'Matikan HP & lepas kabel baterai dari motherboard.',
      'Hubungkan 2 titik Test Point PCB menggunakan pinset konduktif ke Ground.',
      'Colokkan kabel USB ke PC sambil menahan pinset selama 2-3 detik.',
      'Pastikan di Device Manager terdeteksi port Qualcomm HS-USB QDLoader 9008.'
    ],
    files: [
      { name: 'prog_firehose_ddr_RedmiNote10.elf', size: '5.2 MB', type: 'Firehose Loader' },
      { name: 'Qualcomm QDLoader Driver v2.1.2.exe', size: '14.8 MB', type: 'USB Driver' }
    ]
  },
  {
    id: 'tp_vivo_y20_2021',
    brand: 'Vivo',
    marketingName: 'Vivo Y20 2021 (V2043)',
    modelName: 'V2043',
    chipset: 'MediaTek Helio P35 (MT6765)',
    type: 'Testpoint & BROM',
    mode: 'MediaTek Preloader / BROM Mode',
    imagePath: '/database/testpoint/xiaomi/xiaomi_redmi_note_10_4g_tp.jpg',
    instructions: [
      'Matikan smartphone Vivo Y20 2021 sepenuhnya.',
      'Tahan tombol Volume Up (+) dan Volume Down (-) secara bersamaan.',
      'Colokkan kabel USB dari HP ke PC hingga terdeteksi port MediaTek USB Port / Preloader.',
      'Gunakan SP Flash Tool atau UFI Box dengan Custom DA MT6765.'
    ],
    files: [
      { name: 'MTK_AllInOne_DA_Vivo_Y20.bin', size: '3.8 MB', type: 'Custom DA File' },
      { name: 'MediaTek_USB_Driver_v1.0.8.exe', size: '11.2 MB', type: 'USB Driver' }
    ]
  },
  {
    id: 'isp_samsung_a12',
    brand: 'Samsung',
    marketingName: 'Samsung Galaxy A12 (SM-A125F)',
    modelName: 'SM-A125F / DS',
    chipset: 'MediaTek Helio P35 (MT6765)',
    type: 'ISP Pinout eMMC',
    mode: 'eMMC Direct Memory ISP',
    imagePath: '/database/testpoint/xiaomi/xiaomi_redmi_note_10_4g_tp.jpg',
    instructions: [
      'Buka motherboard dari frame dan pasang pada PCB holder.',
      'Solder kawat email halus ke titik resistor CLK, CMD, DAT0, GND.',
      'Supply VCC 2.8V / VCCQ 1.8V via box adapter (UFI / EasyJTAG).',
      'Lakukan scan Identify di software box flasher.'
    ],
    files: [
      { name: 'Samsung_A125F_ISP_Pinout_Diagram.png', size: '1.4 MB', type: 'Pinout Diagram' }
    ]
  },
  {
    id: 'tp_oppo_a53',
    brand: 'Oppo',
    marketingName: 'Oppo A53 (CPH2127)',
    modelName: 'CPH2127',
    chipset: 'Qualcomm Snapdragon 460 (SM4250)',
    type: 'Testpoint EDL 9008',
    mode: 'Qualcomm HS-USB QDLoader 9008',
    imagePath: '/database/testpoint/xiaomi/xiaomi_redmi_note_10_4g_tp.jpg',
    instructions: [
      'Lepas backcover dan penutup mesin bagian atas.',
      'Hubungkan 2 titik TP dekat IC Power ke Ground dengan pinset.',
      'Colokkan kabel USB hingga muncul Qualcomm 9008 di Device Manager.'
    ],
    files: [
      { name: 'prog_firehose_ddr_OppoA53_CPH2127.elf', size: '4.9 MB', type: 'Firehose Loader' }
    ]
  },
  {
    id: 'tp_realme_c11',
    brand: 'Realme',
    marketingName: 'Realme C11 2021 (RMX3231)',
    modelName: 'RMX3231',
    chipset: 'Unisoc / Spreadtrum SC9863A',
    type: 'Spreadtrum FDL Boot',
    mode: 'SPRD U2S Diag / FDL Mode',
    imagePath: '/database/testpoint/xiaomi/xiaomi_redmi_note_10_4g_tp.jpg',
    instructions: [
      'Matikan HP sepenuhnya.',
      'Tahan tombol Volume Down (-) saat mencolokkan kabel USB ke PC.',
      'Gunakan SPD ResearchDownload dengan berkas FDL1 & FDL2.'
    ],
    files: [
      { name: 'Realme_C11_RMX3231_FDL1_FDL2.zip', size: '2.1 MB', type: 'FDL Loader' }
    ]
  }
]

const brands = ['Semua', 'Xiaomi', 'Vivo', 'Oppo', 'Samsung', 'Realme']

export default function GenericTeknisiHPCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('Semua')
  const [activeModalItem, setActiveModalItem] = useState(null)

  // Filter Data Client-Side (< 1ms)
  const filteredData = useMemo(() => {
    return sampleDatabase.filter((item) => {
      const matchBrand = selectedBrand === 'Semua' || item.brand.toLowerCase() === selectedBrand.toLowerCase()
      const q = searchQuery.toLowerCase().trim()
      const matchQuery = !q || 
        item.marketingName.toLowerCase().includes(q) || 
        item.modelName.toLowerCase().includes(q) || 
        item.chipset.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q)

      return matchBrand && matchQuery
    })
  }, [searchQuery, selectedBrand])

  return (
    <section className="pt-28 sm:pt-32 pb-24 bg-neutral-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* BREADCRUMB NAV */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-neutral-600 font-medium">
          <Link href="/" className="hover:text-neutral-950 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/toko-digital" className="hover:text-neutral-950 transition-colors">Toko Digital</Link>
          <span>/</span>
          <span className="text-neutral-950 font-extrabold">Katalog Teknisi HP</span>
        </nav>

        {/* HEADER GENERIK & DESKRIPSI UTAMA */}
        <header className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-neutral-950 text-white font-mono font-extrabold text-xs tracking-wider uppercase">
              DATABASE UNIFIED V2.4
            </span>
            <span className="px-3 py-1 rounded-md bg-neutral-100 text-neutral-950 text-xs font-mono font-bold border border-neutral-300">
              3.078+ Skema Testpoint & ISP
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight leading-[1.2]">
            Katalog Skema Test Point EDL 9008, Loader & Pinout ISP Teknisi HP
          </h1>

          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed max-w-4xl">
            Pusat direktori referensi teknis perbaikan hardware HP. Cari skema titik jumper <strong className="font-bold text-neutral-950">Testpoint Qualcomm EDL 9008</strong>, <strong className="font-bold text-neutral-950">Custom DA MediaTek</strong>, <strong className="font-bold text-neutral-950">Loader Firehose</strong>, dan <strong className="font-bold text-neutral-950">Pinout ISP Direct Memory</strong> untuk berbagai merek smartphone.
          </p>
        </header>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4">
          <div>
            <label className="text-xs font-mono font-extrabold text-neutral-950 uppercase tracking-widest block mb-2">
              CARI PERANGKAT / MODEL / CHIPSET
            </label>
            <input
              type="text"
              placeholder="Ketik nama HP, codename, atau chipset (misal: Redmi Note 10, MT6765, Vivo Y20)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-950 placeholder-neutral-500 text-sm font-medium focus:outline-none focus:border-neutral-950 transition-colors"
            />
          </div>

          {/* BRAND PILLS */}
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <span className="text-[11px] font-mono font-bold text-neutral-600 uppercase tracking-wider block">FILTER MEREK SMARTPHONE:</span>
            <div className="flex flex-wrap gap-2">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 ${
                    selectedBrand === b
                      ? 'bg-neutral-950 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-200/80'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN LAYOUT GRID (LIST CONTENT + SIDEBAR) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* MAIN LIST COLUMN (COL-SPAN-8) */}
          <main className="lg:col-span-8 space-y-6">

            {/* DISCLAIMER DWYOR CARD */}
            <div className="bg-neutral-950 text-white border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex items-center gap-2.5 border-b border-neutral-800 pb-2.5">
                <span className="px-2.5 py-0.5 rounded bg-white text-neutral-950 font-mono font-extrabold text-[11px] uppercase">
                  DISCLAIMER TEKNIS
                </span>
                <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                  Penolakan Tanggung Jawab Perbaikan (DWYOR)
                </h2>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                Seluruh skema testpoint dan file programmer loader disediakan murni sebagai referensi teknis (<em className="text-white font-semibold">as-is</em>). Eksekusi jumper hardware dan flashing memiliki risiko kerusakan fisik PCB. Risiko pengerjaan ditanggung sepenuhnya oleh teknisi.
              </p>
            </div>

            {/* KARTU DAFTAR ITEM SKEMA KATALOG */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-neutral-950 block">
                  DAFTAR PERANGKAT ({filteredData.length} HASIL DITEMUKAN)
                </span>
                <span className="text-xs font-mono text-neutral-600 font-semibold">
                  Direct Mirror File Access
                </span>
              </div>

              {filteredData.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <p className="text-sm text-neutral-800 font-bold">Tidak ada perangkat yang cocok dengan kata kunci pencarian Anda.</p>
                  <p className="text-xs text-neutral-600">Coba ubah filter merek atau kata kunci model HP di atas.</p>
                </div>
              ) : (
                <div className="divide-y divide-neutral-100">
                  {filteredData.map((item) => (
                    <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded bg-neutral-950 text-white font-mono font-extrabold text-[10px] uppercase tracking-wider">
                            {item.brand}
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-neutral-100 text-neutral-950 font-mono font-bold text-[10px] border border-neutral-300">
                            {item.type}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-neutral-950 text-base sm:text-lg leading-snug">
                          {item.marketingName}
                        </h3>
                        <div className="text-xs text-neutral-700 font-mono space-x-2">
                          <span>Model: <strong className="text-neutral-950 font-semibold">{item.modelName}</strong></span>
                          <span>&bull;</span>
                          <span>{item.chipset}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          onClick={() => setActiveModalItem(item)}
                          className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-extrabold text-xs border border-neutral-300 transition-all duration-200"
                        >
                          Lihat Skema & Langkah
                        </button>
                        <button className="px-4 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs shadow-md transition-all duration-200">
                          Ke Server Unduhan File
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </main>

          {/* SIDEBAR PROMOSI SOFTWARE DESKTOP & STATS (COL-SPAN-4) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">

            {/* CARD 1: SOFT-SELLING SOFTWARE DESKTOP */}
            <div className="bg-neutral-950 text-white rounded-2xl p-6 shadow-2xl space-y-5 border border-neutral-800">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-md bg-white text-neutral-950 font-mono font-extrabold text-[11px] uppercase tracking-wider inline-block">
                  SOFTWARE DESKTOP RESMI
                </span>
                <h3 className="font-extrabold text-xl text-white tracking-tight leading-snug">
                  FokusKonten HP Tools v2.4
                </h3>
                <p className="text-white text-xs leading-relaxed font-normal">
                  Aplikasi Windows khusus teknisi HP Indonesia. Terintegrasi 3.078+ database Testpoint & Firehose otomatis 1-klik tanpa ribet command line.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-neutral-800 text-xs text-white font-semibold">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                  <span>Auto-detect Chipset & Select Firehose</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                  <span>Bypass FRP & Mi Account 1-Klik</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                  <span>3.078 Database Testpoint Offline</span>
                </div>
              </div>

              <button className="w-full py-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-extrabold text-xs transition-all duration-200 shadow-xl">
                Download Software Desktop (.exe)
              </button>
            </div>

            {/* CARD 2: DATABASE STATS */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-neutral-950 block border-b border-neutral-100 pb-2">
                DATABASE KERUSAKAN HP TERVERIFIKASI
              </span>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-neutral-100">
                  <span className="text-neutral-800 font-semibold">Skema Testpoint EDL</span>
                  <strong className="font-mono font-extrabold text-neutral-950">3.078 Model</strong>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-neutral-100">
                  <span className="text-neutral-800 font-semibold">Pinout ISP eMMC/UFS</span>
                  <strong className="font-mono font-extrabold text-neutral-950">1.565 Model</strong>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-neutral-100">
                  <span className="text-neutral-800 font-semibold">Qualcomm Firehose Loader</span>
                  <strong className="font-mono font-extrabold text-neutral-950">3.823 File</strong>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-neutral-800 font-semibold">MediaTek Custom DA</span>
                  <strong className="font-mono font-extrabold text-neutral-950">230 File</strong>
                </div>
              </div>
            </div>

          </aside>

        </div>

      </div>

      {/* MODAL DETAIL SKEMA & INSKTRUKSI */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-neutral-950 text-white font-mono font-extrabold text-[10px] uppercase">
                  {activeModalItem.brand} &bull; {activeModalItem.type}
                </span>
                <h3 className="text-lg font-extrabold text-neutral-950 mt-1">
                  {activeModalItem.marketingName}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-mono font-bold text-xs"
              >
                ✕ Tutup
              </button>
            </div>

            {/* GAMBAR SKEMA */}
            <div className="overflow-hidden rounded-xl bg-neutral-950 p-2 border border-neutral-900">
              <img
                src={activeModalItem.imagePath}
                alt={activeModalItem.marketingName}
                className="w-full max-h-[350px] object-contain rounded-lg mx-auto"
              />
            </div>

            {/* INTI PETUNJUK */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-neutral-950 block border-b border-neutral-100 pb-1">
                LANGKAH EKSEKUSI TEKNIS
              </span>
              <ol className="space-y-2 text-xs sm:text-sm text-neutral-900 font-semibold list-decimal list-inside">
                {activeModalItem.instructions.map((inst, idx) => (
                  <li key={idx} className="leading-relaxed">{inst}</li>
                ))}
              </ol>
            </div>

            {/* DAFTAR FILE */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-neutral-950 block border-b border-neutral-100 pb-1">
                BERKAS PROGRAMMER TERSEDIA
              </span>
              <div className="divide-y divide-neutral-100">
                {activeModalItem.files.map((f, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-neutral-950 font-bold block">{f.name}</strong>
                      <span className="text-neutral-600 font-mono text-[11px]">{f.type} &bull; {f.size}</span>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-neutral-950 text-white font-extrabold text-xs">
                      Ke Server Unduhan
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}
