'use client'

/**
 * ArticleEducationalGuide.jsx — Modul Artikel Edukasi Teknis Hardware & Firmware
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md:
 * - Pilar 1: Kontainer putih bershadow halus
 * - Pilar 2: Monokrom mutlak (neutral-950, neutral-600, border-neutral-200)
 * - Pilar 7: Tipografi Plus Jakarta Sans (heading), Inter (body), Mono (data/kode)
 * - Pilar 8: Bahasa teknisi profesional berbobot, zero istilah jeroan amatir
 */
export default function ArticleEducationalGuide({ model }) {
  if (!model) return null

  const brandName = model.brand || 'Smartphone'
  const modelName = model.model_name || model.modelName || 'Perangkat'
  const chipset = model.chipset || 'Qualcomm / MediaTek'
  const isQualcomm = chipset.toLowerCase().includes('qualcomm') || chipset.toLowerCase().includes('snapdragon')
  const isMtk = chipset.toLowerCase().includes('mediatek') || chipset.toLowerCase().includes('helio') || chipset.toLowerCase().includes('dimensity')

  return (
    <article className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-8">
      {/* Article Header */}
      <div className="pb-6 border-b border-neutral-100 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-neutral-950 text-white font-mono text-xs font-bold rounded uppercase tracking-wider">
            PANDUAN MEJA SERVIS
          </span>
          <span className="text-xs sm:text-sm font-mono text-neutral-400">
            Hardware & Firmware SOP
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-snug">
          Panduan Teknis Diagnosa, Pemulihan & SOP Hardware {brandName} {modelName}
        </h2>
        <p className="text-sm text-neutral-600 font-mono leading-relaxed">
          Dokumentasi operasional laboratorium teknisi: arsitektur sistem, jalur jumper testpoint, dan mitigasi risiko flashing.
        </p>
      </div>

      {/* Bagian 1: Analisis Arsitektur Board & Storage */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-5 bg-neutral-950 rounded-full"></span>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 font-mono tracking-tight">
            01. Analisis Arsitektur Platform & Manajemen Storage
          </h3>
        </div>

        <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-sans">
          Motherboard pada unit <strong>{brandName} {modelName}</strong> dirancang di atas platform arsitektur <strong>{chipset}</strong> yang mengintegrasikan pengontrol boot ROM perangkat keras pada level silikon. Sistem penyimpanan data mengadopsi partisi berstandar GPT (GUID Partition Table) dengan enkripsi partisi modern (FBE / File-Based Encryption).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2.5">
            <span className="text-sm font-bold text-neutral-950 font-mono uppercase block">Struktur Booting Silikon</span>
            <p className="text-sm text-neutral-700 leading-relaxed font-sans">
              {isQualcomm ? (
                <>Tahapan bootloader dimulai dari Primary Boot Loader (PBL) di ROM prosesor, dilanjutkan dengan verifikasi signature XBL (eXtensible Boot Loader) dan ABL sebelum memuat kernel Linux Android.</>
              ) : isMtk ? (
                <>Proses inisialisasi dikendalikan oleh Boot ROM (BROM) internal, dilanjutkan handshake Preloader untuk verifikasi kunci kriptografi SLA/DAA sebelum mengakses eMMC/UFS storage.</>
              ) : (
                <>Inisialisasi perangkat keras diawali oleh microcode bootloader internal SoC yang memvalidasi integritas partisi bootloader primer sebelum memberikan kendali ke kernel Android.</>
              )}
            </p>
          </div>

          <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2.5">
            <span className="text-sm font-bold text-neutral-950 font-mono uppercase block">Integritas Partisi Storage</span>
            <p className="text-sm text-neutral-700 leading-relaxed font-sans">
              Memori internal terbagi menjadi partisi sistem krusial: <code className="font-mono text-xs bg-neutral-200 px-1.5 py-0.5 rounded font-bold">boot</code>, <code className="font-mono text-xs bg-neutral-200 px-1.5 py-0.5 rounded font-bold">recovery</code>, <code className="font-mono text-xs bg-neutral-200 px-1.5 py-0.5 rounded font-bold">vbmeta</code>, dan blok radio frekuensi terenkripsi yang wajib dilindungi dari format manual.
            </p>
          </div>
        </div>
      </section>

      {/* Bagian 2: SOP Meja Servis (ESD & Testpoint Jumper) */}
      <section className="space-y-4 border-t border-neutral-100 pt-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-5 bg-neutral-950 rounded-full"></span>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 font-mono tracking-tight">
            02. Standar Operasional Prosedur (SOP) Meja Servis
          </h3>
        </div>

        <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-sans">
          Penanganan perangkat lunak tingkat rendah melalui mode darurat (Emergency Download) memerlukan kedisiplinan meja kerja agar tidak menimbulkan kerusakan fatal pada IC Power (PMIC) maupun CPU:
        </p>

        <div className="space-y-3.5">
          <div className="flex items-start gap-4 p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-xl">
            <span className="w-6 h-6 rounded-md bg-neutral-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
            <div className="space-y-1.5 text-sm sm:text-base">
              <strong className="text-neutral-950 block font-mono text-base font-extrabold">Pelepasan Baterai (Wajib)</strong>
              <span className="text-neutral-700 leading-relaxed block font-sans text-sm sm:text-base">
                Sebelum menghubungkan pinset jumper ke titik testpoint, lepaskan soket baterai dari motherboard. Melakukan shorting testpoint saat jalur VPH_PWR bertegangan berisiko merusak resistor pull-up dan merusak jalur sensing CPU.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-xl">
            <span className="w-6 h-6 rounded-md bg-neutral-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
            <div className="space-y-1.5 text-sm sm:text-base">
              <strong className="text-neutral-950 block font-mono text-base font-extrabold">Teknik Jumper Testpoint Presisi</strong>
              <span className="text-neutral-700 leading-relaxed block font-sans text-sm sm:text-base">
                Gunakan pinset anti-magnetik bersudut lancip. Sentuhkan satu ujung pinset ke titik Testpoint emas dan ujung lainnya ke Ground (kaleng shield). Colokkan kabel USB ke port PC, tahan selama 2 detik hingga terdengar deteksi hardware baru di Device Manager, lalu lepaskan pinset.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-xl">
            <span className="w-6 h-6 rounded-md bg-neutral-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
            <div className="space-y-1.5 text-sm sm:text-base">
              <strong className="text-neutral-950 block font-mono text-base font-extrabold">SOP Direct ISP (eMMC / UFS)</strong>
              <span className="text-neutral-700 leading-relaxed block font-sans text-sm sm:text-base">
                Bila menggunakan box flasher (UFI / EasyJTAG / Medusa), gunakan kawat jumper enamel ukuran 0.02 mm dengan panjang tidak melebihi 10 cm. Pastikan suplai daya VCC (2.8V / 3.3V) dan VCCQ (1.8V) stabil sebelum menjalankan perintah read CID/CSD.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian 3: Protokol Proteksi Radio Frekuensi (IMEI & Baseband) */}
      <section className="space-y-4 border-t border-neutral-100 pt-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-5 bg-neutral-950 rounded-full"></span>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 font-mono tracking-tight">
            03. Protokol Perlindungan Radio Frekuensi (Anti IMEI Hilang)
          </h3>
        </div>

        <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-sans">
          Kendala paling umum pasca-flashing adalah hilangnya nomor identitas perangkat (IMEI NULL) atau Baseband Unknown. Hal ini terjadi akibat kesalahan format blok partisi kalibrasi jaringan:
        </p>

        <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-4">
          <span className="text-sm font-bold text-neutral-950 font-mono uppercase block tracking-wider">Partisi Yang Dilarang Di-Wipe:</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
            <div className="p-3 bg-white border border-neutral-300 rounded-xl shadow-sm">
              <span className="font-extrabold text-neutral-950 block text-sm sm:text-base">{isQualcomm ? 'modemst1' : 'nvram'}</span>
              <span className="text-xs text-neutral-500 block mt-0.5">Radio NV Data</span>
            </div>
            <div className="p-3 bg-white border border-neutral-300 rounded-xl shadow-sm">
              <span className="font-extrabold text-neutral-950 block text-sm sm:text-base">{isQualcomm ? 'modemst2' : 'nvdata'}</span>
              <span className="text-xs text-neutral-500 block mt-0.5">IMEI / Security</span>
            </div>
            <div className="p-3 bg-white border border-neutral-300 rounded-xl shadow-sm">
              <span className="font-extrabold text-neutral-950 block text-sm sm:text-base">{isQualcomm ? 'fsg' : 'protect1'}</span>
              <span className="text-xs text-neutral-500 block mt-0.5">RF Gold Block</span>
            </div>
            <div className="p-3 bg-white border border-neutral-300 rounded-xl shadow-sm">
              <span className="font-extrabold text-neutral-950 block text-sm sm:text-base">{isQualcomm ? 'fsc' : 'protect2'}</span>
              <span className="text-xs text-neutral-500 block mt-0.5">Modem Config</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans pt-1">
            <strong>Aturan Emas:</strong> Sebelum mengeksekusi flashing <code className="font-mono bg-neutral-200 px-1.5 py-0.5 rounded font-bold">rawprogram0.xml</code> atau scatter firmware penuh, lakukan backup terlebih dahulu terhadap blok partisi di atas melalui tab Backup Partition Manager di software flasher.
          </p>
        </div>
      </section>

      {/* Bagian 4: Diagnosa Kode Error Flashing Umum */}
      <section className="space-y-4 border-t border-neutral-100 pt-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-5 bg-neutral-950 rounded-full"></span>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 font-mono tracking-tight">
            04. Diagnosa & Mitigasi Kode Error Flashing Umum
          </h3>
        </div>

        <div className="space-y-3 text-sm">
          <div className="p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
            <span className="font-mono font-bold text-neutral-950 block text-sm sm:text-base">Error: Sahara Protocol Handshake Timeout</span>
            <p className="text-neutral-700 leading-relaxed font-sans text-sm">
              <strong>Penyebab:</strong> Kabel USB mengalami drop tegangan (voltage dip) atau terhubung ke port USB 3.0 bertingkat.<br />
              <strong>Solusi:</strong> Pindahkan kabel ke port USB 2.0 motherboard belakang (Rear Port) dan pastikan driver Qualcomm QDLoader 9008 terinstal versi WHQL tanpa filter libusb.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
            <span className="font-mono font-bold text-neutral-950 block text-sm sm:text-base">Error: Firehose Storage Read / Write NACK</span>
            <p className="text-neutral-700 leading-relaxed font-sans text-sm">
              <strong>Penyebab:</strong> IC Flash eMMC/UFS telah mencapai batas umur pemakaian (Health Status 90% consumed / Read-Only mode).<br />
              <strong>Solusi:</strong> Buka jalur Direct ISP untuk memprogram ulang register firmware IC memori atau lakukan penggantian chip IC EMMC baru (Reballing / Replacement).
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}
