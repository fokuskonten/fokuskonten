'use client'

/**
 * LaptopEducationalGuide.jsx — Panduan Edukasi Teknis Analisis Skematik & Motherboard Laptop
 * Dikhususkan untuk Insinyur Hardware & Teknisi Motherboard Laptop
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md:
 * - Monokrom mutlak (neutral-950, neutral-700, border-neutral-200)
 * - Kontainer putih bersih bershadow halus
 * - Tipografi Plus Jakarta Sans & JetBrains Mono
 * - Zero kata redundan, zero bahasa amatir
 */
export default function LaptopEducationalGuide({ model }) {
  if (!model) return null

  const brandName = (model.brand || 'Laptop').trim()
  let rawModelName = (model.modelName || model.model_name || 'Motherboard').trim()
  if (rawModelName.toLowerCase().startsWith(brandName.toLowerCase())) {
    rawModelName = rawModelName.substring(brandName.length).trim()
  }
  const modelName = rawModelName
  const mbCode = (model.motherboardCode || model.motherboard_code || '').trim()
  const chipset = model.chipset || 'Intel / AMD Architecture'

  return (
    <article className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-8">
      {/* Header Artikel */}
      <div className="pb-6 border-b border-neutral-100 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-neutral-950 text-white font-mono text-xs font-bold rounded uppercase tracking-wider">
            SOP HARDWARE ENGINEER
          </span>
          <span className="text-xs sm:text-sm font-mono text-neutral-400">
            Motherboard Power Sequence &amp; Signal Tracing
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-snug">
          Panduan Analisis Skema Rangkaian &amp; Jalur Daya {brandName} {modelName}
        </h2>
        <p className="text-sm text-neutral-600 font-mono leading-relaxed">
          Dokumentasi pengukuran teknis motherboard {mbCode ? `kode part [${mbCode}]` : 'perangkat'}: pelacakan tegangan utama 19V, regulator standby 3.3V/5V, dan diagnosa mati total.
        </p>
      </div>

      {/* Bagian 1: Distribusi Daya Utama 19V (VIN / B+) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-5 bg-neutral-950 rounded-full"></span>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 font-mono tracking-tight">
            01. Analisis Jalur Distribusi Daya Utama 19V (VIN / B+)
          </h3>
        </div>

        <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-sans">
          Jalur tegangan primer pada motherboard <strong>{brandName} {modelName}</strong> mengalirkan suplai daya 19V dari adaptor DC-IN atau 11V–12V dari baterai. Tegangan ini didistribusikan ke seluruh regulator penurun tegangan (Buck Converter) melalui titik pengukuran utama:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
            <span className="text-sm font-bold text-neutral-950 font-mono uppercase block">Rangkaian Sakelar Masuk (DC-IN FET)</span>
            <p className="text-sm text-neutral-700 leading-relaxed font-sans">
              Periksa gerbang (Gate) pada dua MOSFET switching pertama setelah soket DC jack. IC pengisi daya (Charging IC) harus menghasilkan tegangan kemudi (biasanya ~25V untuk N-Channel) agar tegangan 19V dapat melintas sempurna ke resistor sensor arus.
            </p>
          </div>

          <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
            <span className="text-sm font-bold text-neutral-950 font-mono uppercase block">Titik Ukur Resistor Sensor (PR Shunt)</span>
            <p className="text-sm text-neutral-700 leading-relaxed font-sans">
              Ukur tegangan pada kedua kaki resistor sensor arus utama (Current Sense Resistor). Jika tegangan terukur drop di bawah 19V atau terjadi denyut (pulsing), periksa potensi korsleting pada jalur rail B+ sebelum melanjutkan ke tahap berikutnya.
            </p>
          </div>
        </div>
      </section>

      {/* Bagian 2: Regulator Standby 3.3V & 5V ALWAYS */}
      <section className="space-y-4 border-t border-neutral-100 pt-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-5 bg-neutral-950 rounded-full"></span>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 font-mono tracking-tight">
            02. Urutan Regulator Siaga Standby 3.3V &amp; 5V
          </h3>
        </div>

        <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-sans">
          Sebelum tombol daya ditekan, sistem wajib mengaktifkan tegangan siaga untuk menghidupkan chip Embedded Controller (KBC/EC) dan sirkuit pendukung:
        </p>

        <div className="space-y-3.5">
          <div className="flex items-start gap-4 p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-xl">
            <span className="w-6 h-6 rounded-md bg-neutral-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
            <div className="space-y-1.5 text-sm sm:text-base">
              <strong className="text-neutral-950 block font-mono text-base font-extrabold">Tegangan LDO Rendah (Linear Regulator)</strong>
              <span className="text-neutral-700 leading-relaxed block font-sans text-sm sm:text-base">
                IC regulator standby menghasilkan tegangan LDO 3.3V (VREG3) dan 5.0V (VREG5). Tegangan VREG3 wajib langsung masuk menyuplai pin VCC pada chip KBC/EC dan tombol power switch.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-xl">
            <span className="w-6 h-6 rounded-md bg-neutral-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
            <div className="space-y-1.5 text-sm sm:text-base">
              <strong className="text-neutral-950 block font-mono text-base font-extrabold">Induktor / Lilitan PWM Standby</strong>
              <span className="text-neutral-700 leading-relaxed block font-sans text-sm sm:text-base">
                Ukur resistansi pada kedua lilitan koil (PL 3.3V dan PL 5V) terhadap Ground menggunakan multimeter mode hambatan. Nilai normal berada di atas 500 Ohm. Nilai di bawah 10 Ohm menandakan beban ic atau kapasitor filter mengalami kebocoran.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-xl">
            <span className="w-6 h-6 rounded-md bg-neutral-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
            <div className="space-y-1.5 text-sm sm:text-base">
              <strong className="text-neutral-950 block font-mono text-base font-extrabold">Osilator Detak Jam RTC (Real-Time Clock)</strong>
              <span className="text-neutral-700 leading-relaxed block font-sans text-sm sm:text-base">
                Pastikan kristal osilator 32.768 kHz di sekitar chipset PCH/SoC menghasilkan frekuensi stabil dengan tegangan baterai CMOS minimal 2.8V untuk memicu sinyal inisialisasi awal.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian 3: Prosedur Aman Pelacakan Korsleting Jalur (Short Tracing) */}
      <section className="space-y-4 border-t border-neutral-100 pt-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-5 bg-neutral-950 rounded-full"></span>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 font-mono tracking-tight">
            03. Prosedur Aman Pelacakan Korsleting Sirkuit (Short Tracing)
          </h3>
        </div>

        <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-sans">
          Jika jalur B+ atau coil sekunder terukur short circuit ke ground, terapkan langkah injeksi arus terkendali menggunakan DC Power Supply:
        </p>

        <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-center">
            <div className="p-3 bg-white border border-neutral-300 rounded-xl shadow-xs">
              <span className="text-xs text-neutral-500 block">Batas Tegangan Injeksi</span>
              <strong className="font-extrabold text-neutral-950 text-base block mt-0.5">1.0V &ndash; 2.0V</strong>
            </div>
            <div className="p-3 bg-white border border-neutral-300 rounded-xl shadow-xs">
              <span className="text-xs text-neutral-500 block">Batas Arus Maksimal</span>
              <strong className="font-extrabold text-neutral-950 text-base block mt-0.5">1.5A &ndash; 3.0A</strong>
            </div>
            <div className="p-3 bg-white border border-neutral-300 rounded-xl shadow-xs">
              <span className="text-xs text-neutral-500 block">Metode Deteksi Panas</span>
              <strong className="font-extrabold text-neutral-950 text-base block mt-0.5">Kamera Termal / Rosin</strong>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans pt-1">
            <strong>Peringatan Khusus:</strong> Jangan pernah menyuntikkan tegangan melebihi batas nominal jalur. Pada jalur suplai prosesor (VCC_CORE) atau RAM, batas tegangan injeksi maksimal adalah 1.0 Volt untuk melindungi inti silikon CPU dari kerusakan permanen.
          </p>
        </div>
      </section>

      {/* Bagian 4: Alur Power Sequence & Solusi Kasus No Display */}
      <section className="space-y-4 border-t border-neutral-100 pt-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-5 bg-neutral-950 rounded-full"></span>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 font-mono tracking-tight">
            04. Urutan Sinyal Daya (Power Sequence) &amp; Solusi No Display
          </h3>
        </div>

        <div className="space-y-3 text-sm">
          <div className="p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
            <span className="font-mono font-bold text-neutral-950 block text-sm sm:text-base">Gejala: Lampu Indikator Menyala, Kipas Berputar, Layar Gelap (No Display)</span>
            <p className="text-neutral-700 leading-relaxed font-sans text-sm">
              <strong>Pemeriksaan Sinyal:</strong> Pantau sinyal <code>DRAMRST#</code> pada slot RAM dan sinyal <code>PLTRST#</code> (Platform Reset) dari chipset. Jika seluruh tegangan sekunder (1.2V RAM, 1.05V VCCIO/VCCSA, VCC_CORE) sudah hadir namun PLTRST# tidak naik ke logika tinggi (3.3V), kemungkinan besar data pada IC BIOS/SPI Flash mengalami korupsi.
            </p>
            <p className="text-neutral-700 leading-relaxed font-sans text-sm">
              <strong>Solusi Teruji:</strong> Baca isi file BIOS lama menggunakan programmer EEPROM, ekstrak data ME Region / DMI, lalu flash ulang file BIOS resmi dengan region ME bersih (Clean ME) yang sesuai dengan kode part motherboard.
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}
