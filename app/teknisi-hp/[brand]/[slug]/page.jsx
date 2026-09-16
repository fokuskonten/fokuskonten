import Link from 'next/link'

// Data sampel perangkat (Xiaomi Redmi Note 10 4G)
const sampleDeviceData = {
  id: 'xiaomi_redmi_note_10_4g',
  brand: 'Xiaomi',
  marketingName: 'Redmi Note 10 4G (Mojito / Sunny)',
  modelName: 'M2101K7AG / M2101K7AI',
  codename: 'Mojito / Sunny',
  chipset: 'Qualcomm Snapdragon 678 (SM6115 11nm Octa-Core)',
  mode: 'Qualcomm HS-USB QDLoader 9008 (EDL Mode)',
  sku: 'ID9008',
  category: 'Teknisi HP & Repair',
  readTime: '8 menit baca',
  lastUpdated: '16 September 2026',
  
  overview: `Panduan teknis mendalam pemulihan (unbrick), flashing firmware fastboot, bypass akun Mi, hapus proteksi FRP Google, dan perbaikan mati total pada smartphone Xiaomi Redmi Note 10 4G (Mojito / Sunny). Seluruh metode divalidasi menggunakan titik Test Point EDL 9008 hardware dan loader Firehose.`,

  symptoms: [
    'Mati Total (Matot) akibat gagal update OTA atau kerusakan bootloader.',
    'Stuck Logo (Bootloop membandel) yang tidak dapat diakses via Recovery Mode.',
    'Terkunci Akun Mi (Mi Cloud Lock) pasca hard reset.',
    'Terkunci FRP Google Account (Lupa Pola / PIN setelah factory reset).',
    'Gagal UBL (Unlock Bootloader) sehingga memerlukan akses jalur hardware EDL 9008.'
  ],

  testpoint: {
    instructions: [
      'Matikan smartphone Xiaomi Redmi Note 10 4G sepenuhnya.',
      'Buka casing belakang (backcover) dan lepaskan penutup mesin bagian atas.',
      'Lepaskan soket kabel fleksibel baterai dari motherboard (posisi tanpa baterai disarankan).',
      'Hubungkan 2 titik Test Point pada motherboard menggunakan pinset konduktif ke kaleng Ground PCB.',
      'Sambil menahan pinset pada titik Test Point, colokkan kabel USB dari HP ke PC.',
      'Tahan selama 2-3 detik hingga terdengar suara koneksi hardware di Windows, lalu lepaskan pinset.',
      'Buka Device Manager. Pastikan pada bagian Ports (COM & LPT) terdeteksi sebagai Qualcomm HS-USB QDLoader 9008.'
    ],
    imagePath: '/database/testpoint/xiaomi/xiaomi_redmi_note_10_4g_tp.jpg'
  },

  ispPinout: {
    type: 'eMMC / UFS Direct Memory Repair',
    signals: ['CLK', 'CMD', 'DAT0', 'VCC 2.8V', 'VCCQ 1.8V', 'GND'],
    instructions: [
      'Buka motherboard dari frame HP dan tempatkan pada dudukan PCB holder.',
      'Kerok perlahan lapisan cat PCB pada resistor jalur CLK, CMD, dan DAT0.',
      'Solder kawat email halus dari titik resistor ke adapter ISP box flasher (UFI / EasyJTAG).',
      'Hubungkan kawat GND ke kaleng Ground terdekat.',
      'Supply tegangan VCC 2.8V & VCCQ 1.8V melalui box adapter atau colokkan kabel USB HP tanpa baterai.',
      'Buka software box, lakukan pemindaian Identify untuk perbaikan IC memori atau direct dump.'
    ]
  },

  troubleshoots: [
    {
      problem: 'Terdeteksi sebagai Qualcomm HS-USB Diagnostics 900E (Bukan 9008)',
      solution: 'Hubungan jumper pinset kurang rapat atau baterai masih terpasang. Cabut kabel USB, lepas baterai, diamkan 10 detik, lalu ulangi proses jumper test point dengan rapat sebelum mencolokkan kabel USB.'
    },
    {
      problem: 'Port QDLoader 9008 Muncul Tanda Seru Kuning di Device Manager',
      solution: 'Driver Qualcomm di Windows belum terpasang dengan benar. Unduh dan install Qualcomm QDLoader Driver v2.1.2 di bawah, lalu restart PC dengan mode Disable Driver Signature Enforcement.'
    },
    {
      problem: 'Mi Flash Tool Meminta Akun Authorized saat Flashing',
      solution: 'Gunakan file Firehose Programmer Loader custom (prog_firehose_ddr.elf) yang disediakan di bawah. File ini sudah di-bypass auth sehingga tidak memerlukan login akun authorized Xiaomi.'
    }
  ],

  files: [
    {
      name: 'prog_firehose_ddr_RedmiNote10.elf',
      type: 'Firehose Programmer Loader (.elf)',
      size: '5.2 MB',
      description: 'Programmer loader bypass authentication khusus Xiaomi Redmi Note 10 4G untuk Mi Flash Tool, QPST, Hydratool, atau UFI.'
    },
    {
      name: 'Qualcomm HS-USB QDLoader 9008 Driver v2.1.2.exe',
      type: 'Driver USB Windows (.exe)',
      size: '14.8 MB',
      description: 'Installer driver resmi Windows 7/10/11 (32-bit & 64-bit) untuk menjamin konektivitas HP di mode EDL 9008.'
    },
    {
      name: 'Xiaomi Mi Flash Tool Official 2024.zip',
      type: 'Flashing Tool Software (.zip)',
      size: '68.5 MB',
      description: 'Aplikasi flashing resmi Xiaomi versi terbaru yang mendukung penambahan custom Firehose loader.'
    }
  ],

  hashtags: ['#Xiaomi', '#RedmiNote10', '#Mojito', '#TestPointEDL', '#Qualcomm9008', '#FirehoseLoader', '#ISPPinout', '#UnbrickHP', '#FRPBypass', '#MiCloudRemove']
}

export async function generateStaticParams() {
  return [
    { brand: 'xiaomi', slug: 'redmi-note-10-4g' }
  ]
}

export async function generateMetadata({ params }) {
  return {
    title: `Panduan Lengkap Test Point EDL 9008 & Firehose ${sampleDeviceData.marketingName} — FokusKonten`,
    description: sampleDeviceData.overview,
    alternates: { canonical: `https://fokuskonten.my.id/teknisi-hp/${params?.brand || 'xiaomi'}/${params?.slug || 'redmi-note-10-4g'}` },
  }
}

export default function TeknisiHPDetailPage() {
  const data = sampleDeviceData

  return (
    <section className="pt-28 sm:pt-32 pb-24 bg-neutral-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* BREADCRUMB NAV */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-neutral-600 font-medium">
          <Link href="/" className="hover:text-neutral-950 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/toko-digital" className="hover:text-neutral-950 transition-colors">Toko Digital</Link>
          <span>/</span>
          <span className="text-neutral-800">Teknisi HP</span>
          <span>/</span>
          <span className="text-neutral-800">{data.brand}</span>
          <span>/</span>
          <span className="text-neutral-950 font-extrabold">{data.marketingName}</span>
        </nav>

        {/* MAIN RESPONSIVE GRID (8 COLUMNS CONTENT + 4 COLUMNS SIDEBAR) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* MAIN COLUMN (COL-SPAN-8) */}
          <main className="lg:col-span-8 space-y-8">

            {/* HEADER ARTIKEL ELEGAN & TEGAS */}
            <header className="space-y-4 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-neutral-950 text-white font-mono font-extrabold text-xs tracking-wider uppercase">
                  SKU: {data.sku}
                </span>
                <span className="px-3 py-1 rounded-md bg-neutral-100 text-neutral-950 text-xs font-mono font-bold border border-neutral-300">
                  {data.category}
                </span>
                <span className="px-3 py-1 rounded-md bg-neutral-950 text-white text-xs font-mono font-bold">
                  Skema EDL & Firehose Loader
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight leading-[1.2]">
                Panduan Test Point EDL 9008, Firehose Loader & Pinout ISP {data.marketingName}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-700 font-medium pt-3 border-t border-neutral-100">
                <span className="font-mono">Diperbarui: <strong className="text-neutral-950 font-bold">{data.lastUpdated}</strong></span>
                <span>&bull;</span>
                <span className="font-mono">{data.readTime}</span>
                <span>&bull;</span>
                <span>Penulis: <strong className="text-neutral-950 font-bold">Tim Riset Hardware FokusKonten</strong></span>
              </div>
            </header>

            {/* KARTU SPESIFIKASI METADATA PERANGKAT (GRID 2x2 ELEGAN) */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-5">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-neutral-950 block border-b border-neutral-100 pb-2">
                SPESIFIKASI MODUL & PERANGKAT TARGET
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
                <div className="space-y-1 pb-4 sm:pb-0 border-b sm:border-b-0 border-neutral-100">
                  <span className="text-xs text-neutral-600 block font-semibold">Model Perangkat & Codename</span>
                  <strong className="font-extrabold text-neutral-950 block text-base leading-snug">{data.marketingName}</strong>
                  <span className="text-neutral-700 font-mono text-xs block font-medium">{data.modelName}</span>
                </div>
                <div className="space-y-1 pb-4 sm:pb-0 border-b sm:border-b-0 border-neutral-100">
                  <span className="text-xs text-neutral-600 block font-semibold">Chipset & Process Node</span>
                  <strong className="font-extrabold text-neutral-950 block text-base leading-snug">{data.chipset}</strong>
                  <span className="text-neutral-800 font-mono text-xs block font-medium">{data.mode}</span>
                </div>
                <div className="space-y-1 pt-2 sm:pt-4 border-t border-neutral-100">
                  <span className="text-xs text-neutral-600 block font-semibold">Status Akses File Server</span>
                  <strong className="font-extrabold text-neutral-950 block text-base leading-snug">MIRROR SERVER / SAFELINK</strong>
                  <span className="text-neutral-700 text-xs block font-mono font-medium">Akses File via Link Server Unduhan</span>
                </div>
                <div className="space-y-1 pt-2 sm:pt-4 border-t border-neutral-100">
                  <span className="text-xs text-neutral-600 block font-semibold">Sifat Prosedur Perbaikan</span>
                  <strong className="font-extrabold text-neutral-950 block text-base leading-snug">REFERENSI TEKNIS HARDWARE</strong>
                  <span className="text-neutral-700 text-xs block font-mono font-medium">Tergantung Keahlian & Kondisi IC Memori</span>
                </div>
              </div>
            </div>

            {/* OVERVIEW RINGKASAN TEKNIS */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-3">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-neutral-950 block border-b border-neutral-100 pb-2">
                RINGKASAN PROSEDUR REPAIR
              </span>
              <p className="text-sm sm:text-base text-neutral-900 leading-relaxed font-sans font-normal pt-1">
                Panduan teknis mendalam pemulihan (<strong className="font-extrabold text-neutral-950">unbrick</strong>), flashing firmware fastboot, bypass akun <strong className="font-extrabold text-neutral-950">Mi Cloud</strong>, hapus proteksi <strong className="font-extrabold text-neutral-950">FRP Google Account</strong>, dan perbaikan <strong className="font-extrabold text-neutral-950">mati total</strong> pada smartphone <strong className="font-extrabold text-neutral-950">Xiaomi Redmi Note 10 4G (Mojito / Sunny)</strong>. Seluruh metode disediakan sebagai referensi teknis menggunakan titik <strong className="font-extrabold text-neutral-950">Test Point EDL 9008 hardware</strong> dan loader Firehose.
              </p>
            </div>

            {/* INDIKASI KASUS KERUSAKAN */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-neutral-950 block border-b border-neutral-100 pb-2">
                INDIKASI KERUSAKAN YANG DAPAT DIATASI
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-neutral-950 font-semibold pt-1">
                {data.symptoms.map((sym, idx) => (
                  <li key={idx} className="flex items-start gap-3 leading-relaxed">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-950 mt-1 shrink-0" />
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ⚠️ KARTU PENOLAKAN TANGGUNG JAWAB / TECHNICAL DISCLAIMER (DWYOR) */}
            <div className="bg-neutral-950 text-white border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
                <span className="px-2.5 py-1 rounded bg-white text-neutral-950 font-mono font-extrabold text-xs uppercase tracking-wider">
                  DISCLAIMER TEKNIS
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  Penolakan Tanggung Jawab (Do At Your Own Risk - DWYOR)
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-white font-bold">Risiko Eksekusi Hardware:</strong> Segala bentuk tindakan perbaikan hardware (seperti jumper test point, soldering pinout ISP, serta flashing firmware EDL 9008) memiliki risiko kerusakan fisik PCB, mati total permanen, atau kehilangan data.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-white font-bold">Faktor Keberhasilan:</strong> Keberhasilan perbaikan bergantung sepenuhnya pada keahlian teknisi, kehati-hatian prosedur, serta kesehatan komponen fisik IC memori (eMMC/UFS) pada HP target.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-white font-bold">Pelepasan Klaim:</strong> Seluruh skema, diagram pinout, dan file programmer loader disediakan murni sebagai referensi informasi (<em className="text-white font-semibold">as-is</em>). FokusKonten tidak bertanggung jawab atas segala bentuk kegagalan perbaikan atau kerusakan perangkat yang timbul saat pengerjaan.
                  </span>
                </li>
              </ul>
            </div>

            {/* 📢 SLOT IKLAN BANNER ADSENSE #1 */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] text-center space-y-1">
              <span className="text-xs font-mono font-extrabold text-neutral-950 uppercase tracking-widest block">SLOT IKLAN SPONSOR TEKNISI (728 x 90)</span>
              <p className="text-xs text-neutral-700 font-medium">
                [ Space Banner Iklan Supplier Sparepart & Box Flashing HP ]
              </p>
            </div>

            {/* SEKSI 1: SKEMA GAMBAR TEST POINT EDL 9008 */}
            <section className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
              <div className="border-b border-neutral-100 pb-4">
                <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-neutral-950 block mb-1">BAGIAN 01</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
                  Skema Lokasi Test Point EDL 9008 Hardware
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                Untuk memicu motherboard <strong className="font-extrabold text-neutral-950">{data.marketingName}</strong> agar terdeteksi di Device Manager sebagai <em>Qualcomm HS-USB QDLoader 9008</em> saat kondisi mati total, lakukan shorting pada 2 titik PCB berikut:
              </p>

              {/* GAMBAR SKEMA UTAMA */}
              <div className="overflow-hidden rounded-xl bg-neutral-950 p-3 shadow-md border border-neutral-900">
                <img
                  src={data.testpoint.imagePath}
                  alt={`Skema Test Point EDL 9008 ${data.marketingName}`}
                  className="w-full max-h-[600px] object-contain rounded-lg mx-auto"
                />
              </div>

              <div className="space-y-4 pt-2">
                <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-neutral-950 block border-b border-neutral-100 pb-2">
                  LANGKAH EKSEKUSI JUMPER TEST POINT
                </span>
                <ol className="space-y-3 text-xs sm:text-sm text-neutral-950 font-semibold pt-1">
                  {data.testpoint.instructions.map((inst, idx) => (
                    <li key={idx} className="flex items-start gap-3 leading-relaxed">
                      <span className="px-2.5 py-1 rounded bg-neutral-950 text-white font-mono text-xs font-bold shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="pt-0.5">{inst}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* SEKSI 2: SKEMA PINOUT ISP eMMC / UFS */}
            <section className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
              <div className="border-b border-neutral-100 pb-4">
                <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-neutral-950 block mb-1">BAGIAN 02</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
                  Skema Jumper Pinout ISP {data.ispPinout.type}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                Jalur Direct ISP (In-System Programming) digunakan untuk pembacaan IC memori via Box Flashing (UFI Box, EasyJTAG Plus, atau MEDUSA Pro) jika jalur USB EDL tidak merespons:
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {data.ispPinout.signals.map((sig, idx) => (
                  <span key={idx} className="px-4 py-1.5 rounded-lg bg-neutral-950 text-white font-mono font-extrabold text-xs tracking-wider shadow-xs">
                    {sig}
                  </span>
                ))}
              </div>

              <div className="space-y-4 pt-2">
                <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-neutral-950 block border-b border-neutral-100 pb-2">
                  PROSEDUR SOLDERING ISP DIRECT MEMORY
                </span>
                <ol className="space-y-3 text-xs sm:text-sm text-neutral-950 font-semibold pt-1">
                  {data.ispPinout.instructions.map((inst, idx) => (
                    <li key={idx} className="flex items-start gap-3 leading-relaxed">
                      <span className="px-2.5 py-1 rounded bg-neutral-200 text-neutral-950 font-mono text-xs font-bold shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="pt-0.5">{inst}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* SEKSI 3: TROUBLESHOOTING */}
            <section className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
              <div className="border-b border-neutral-100 pb-4">
                <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-neutral-950 block mb-1">BAGIAN 03</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
                  Troubleshooting & Matrix Solusi Kendala
                </h2>
              </div>

              <div className="divide-y divide-neutral-100">
                {data.troubleshoots.map((tb, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-2">
                    <strong className="text-neutral-950 font-extrabold text-sm sm:text-base block">
                      {tb.problem}
                    </strong>
                    <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                      {tb.solution}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 📢 SLOT IKLAN PRE-DOWNLOAD */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] text-center space-y-1">
              <span className="text-xs font-mono font-extrabold text-neutral-950 uppercase tracking-widest block">SLOT IKLAN IN-ARTICLE (336 x 280)</span>
              <p className="text-xs text-neutral-700 font-medium">
                [ Unit Iklan Google AdSense Sebelum Tombol Unduhan File ]
              </p>
            </div>

            {/* SEKSI 4: PUSAT UNDUHAN FILE (FLAT DIVIDER LIST) */}
            <section className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
              <div className="border-b border-neutral-100 pb-4">
                <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-neutral-950 block mb-1">BAGIAN 04</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
                  Pusat Unduhan File Programmer & Driver USB
                </h2>
              </div>

              <div className="divide-y divide-neutral-100">
                {data.files.map((f, idx) => (
                  <div key={idx} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1 max-w-xl">
                      <span className="text-[11px] font-mono font-bold uppercase text-neutral-700 block tracking-wider">
                        {f.type} &bull; {f.size}
                      </span>
                      <h3 className="font-extrabold text-neutral-950 text-base">{f.name}</h3>
                      <p className="text-xs text-neutral-700 leading-relaxed font-medium">{f.description}</p>
                    </div>
                    <div className="shrink-0">
                      <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs shadow-md transition-all duration-200">
                        Ke Server Unduhan File
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* HASHTAG TERSTRUKTUR */}
            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <span className="text-xs font-mono font-extrabold text-neutral-950 uppercase tracking-widest block">
                TAGAR INDEXING TEKNIKAL
              </span>
              <div className="flex flex-wrap gap-2">
                {data.hashtags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-md bg-white border border-neutral-300 text-neutral-950 font-mono font-bold shadow-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </main>

          {/* SIDEBAR PSIKOLOGI PROMOSI & CONVERSION HOOKS (COL-SPAN-4) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">

            {/* CARD 1: SOFT-SELLING DESKTOP SOFTWARE FOKUSKONTEN HP TOOLS */}
            <div className="bg-neutral-950 text-white rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6 border border-neutral-800">
              <div className="space-y-3">
                {/* CHIP PUTIH BERSIH */}
                <div className="inline-block">
                  <span className="px-3 py-1 rounded-md bg-white text-neutral-950 font-mono font-extrabold text-[11px] uppercase tracking-wider shadow-sm">
                    SOFTWARE DESKTOP RESMI
                  </span>
                </div>
                <h3 className="font-extrabold text-2xl text-white tracking-tight leading-snug">
                  FokusKonten HP Tools v2.4 Desktop
                </h3>
                <p className="text-white text-xs sm:text-sm leading-relaxed font-normal">
                  Aplikasi Windows spesialis teknisi HP. Terintegrasi 3.078+ database Testpoint & Firehose otomatis 1-klik untuk mempercepat pengerjaan perbaikan.
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-neutral-800 text-xs sm:text-sm text-white font-semibold">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                  <span>Auto-detect Chipset & Select Firehose</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                  <span>Bypass FRP & Mi Account 1-Klik</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                  <span>3.078 Database Testpoint Offline</span>
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <button className="w-full py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-xl">
                  Download Software Desktop (.exe)
                </button>
                <span className="text-[11px] font-mono text-neutral-300 text-center block font-medium">
                  Koleksi Database & Utility Teknisi HP Windows
                </span>
              </div>
            </div>

            {/* CARD 2: LIVE DATABASE STATS & HEALTH */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-neutral-950 block border-b border-neutral-100 pb-2">
                DATABASE KERUSAKAN HP TERVERIFIKASI
              </span>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-800 font-semibold">Skema Testpoint EDL</span>
                  <strong className="font-mono font-extrabold text-neutral-950">3.078 Model</strong>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-800 font-semibold">Pinout ISP eMMC/UFS</span>
                  <strong className="font-mono font-extrabold text-neutral-950">1.565 Model</strong>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-800 font-semibold">Qualcomm Firehose Loader</span>
                  <strong className="font-mono font-extrabold text-neutral-950">3.823 File</strong>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-neutral-800 font-semibold">MediaTek Custom DA</span>
                  <strong className="font-mono font-extrabold text-neutral-950">230 File</strong>
                </div>
              </div>
            </div>

            {/* CARD 3: JAMINAN INTERGRITAS & AKSES SERVER MIRROR */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-3">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-neutral-950 block border-b border-neutral-100 pb-2">
                AKSES FILE & SERVER UNDUHAN
              </span>
              <p className="text-xs text-neutral-800 leading-relaxed font-medium">
                Seluruh file programmer loader dan driver disediakan sebagai berkas referensi melalui jaringan link server mirror unduhan. Pastikan membaca petunjuk eksekusi teknis terlebih dahulu.
              </p>
              <div className="pt-2 text-[11px] font-mono text-neutral-950 font-bold">
                &bull; Akses File via Halaman Safelink Mirror Server
              </div>
            </div>

          </aside>

        </div>

      </div>
    </section>
  )
}


