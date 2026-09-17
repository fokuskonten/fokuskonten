'use client'

/**
 * ArticleEducationalGuide.jsx — Panduan Edukasi Teknis Meja Servis Smartphone
 * Dikhususkan untuk Teknisi Perbaikan Handphone (Hardware, Testpoint, Flashing, & ISP)
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md:
 * - Monokrom mutlak (neutral-950, neutral-700, border-neutral-200)
 * - Kontainer putih bersih bershadow halus
 * - Tipografi Plus Jakarta Sans & JetBrains Mono
 * - Zero kata redundan, zero bahasa amatir
 */
export default function ArticleEducationalGuide({ model }) {
  if (!model) return null

  const brandName = (model.brand || 'Smartphone').trim()
  let rawModelName = (model.model_name || model.modelName || 'Perangkat').trim()
  if (rawModelName.toLowerCase().startsWith(brandName.toLowerCase())) {
    rawModelName = rawModelName.substring(brandName.length).trim()
  }
  const modelName = rawModelName
  const fullDeviceName = `${brandName} ${modelName}`.trim()
  const chipset = model.chipset || 'Qualcomm Snapdragon / MediaTek'
  const isQualcomm = chipset.toLowerCase().includes('qualcomm') || chipset.toLowerCase().includes('snapdragon')
  const isMtk = chipset.toLowerCase().includes('mediatek') || chipset.toLowerCase().includes('helio') || chipset.toLowerCase().includes('dimensity')

  return (
    <article className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-8">
      {/* Header Panduan Servis */}
      <div className="pb-6 border-b border-neutral-100 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-neutral-950 text-white font-mono text-xs font-bold rounded uppercase tracking-wider">
            PANDUAN MEJA SERVIS
          </span>
          <span className="text-xs sm:text-sm font-mono text-neutral-400">
            Hardware &amp; Firmware SOP
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-snug">
          Panduan Teknis Servis &amp; Pemulihan {fullDeviceName}
        </h2>
        <p className="text-sm text-neutral-600 font-mono leading-relaxed">
          Standar operasional meja servis: identifikasi mode bootloader, prosedur jumper testpoint, proteksi partisi sinyal, dan mitigasi kendala perbaikan.
        </p>
      </div>

      {/* Bagian 1: Karakteristik Hardware & Mode Bootloader */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-5 bg-neutral-950 rounded-full"></span>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 font-mono tracking-tight">
            01. Karakteristik Hardware &amp; Mode Bootloader
          </h3>
        </div>

        <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-sans">
          Motherboard pada <strong>{fullDeviceName}</strong> menggunakan arsitektur <strong>{chipset}</strong> dengan media penyimpanan internal terenkripsi. Sebelum melakukan proses penulisan firmware atau perbaikan partisi, pahami jalur inisialisasi bootloader perangkat berikut:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
            <span className="text-sm font-bold text-neutral-950 font-mono uppercase block">Mode Komunikasi Darurat</span>
            <p className="text-sm text-neutral-700 leading-relaxed font-sans">
              {isQualcomm ? (
                <>Perangkat dilengkapi mode darurat EDL 9008 (Emergency Download) yang diakses langsung melalui titik testpoint untuk bypass otorisasi saat perangkat mati total atau terkunci bootloader.</>
              ) : isMtk ? (
                <>Inisialisasi perangkat dikendalikan oleh Boot ROM (BROM) internal dan Preloader. Mode ini memungkinkan penulisan firmware penuh tanpa memerlukan perangkat dalam kondisi menyala normal.</>
              ) : (
                <>Perangkat menyediakan mode pemulihan tingkat rendah bawaan chipset untuk memulihkan sistem saat mengalami gagal booting atau kerusakan partisi sistem primer.</>
              )}
            </p>
          </div>

          <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
            <span className="text-sm font-bold text-neutral-950 font-mono uppercase block">Tata Kelola Partisi Sistem</span>
            <p className="text-sm text-neutral-700 leading-relaxed font-sans">
              Memori penyimpanan internal tersusun atas partisi sistem utama: <code className="font-mono text-xs bg-neutral-200 px-1.5 py-0.5 rounded font-bold">boot</code>, <code className="font-mono text-xs bg-neutral-200 px-1.5 py-0.5 rounded font-bold">recovery</code>, <code className="font-mono text-xs bg-neutral-200 px-1.5 py-0.5 rounded font-bold">vbmeta</code>, serta sektor kalibrasi radio yang wajib dilindungi dari format menyeluruh.
            </p>
          </div>
        </div>
      </section>

      {/* Bagian 2: Standar Prosedur Jumper Testpoint */}
      <section className="space-y-4 border-t border-neutral-100 pt-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-5 bg-neutral-950 rounded-full"></span>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 font-mono tracking-tight">
            02. Standar Prosedur Jumper Testpoint &amp; Direct ISP
          </h3>
        </div>

        <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-sans">
          Untuk mencegah korsleting pada jalur daya motherboard saat menghubungkan titik jumper ke komputer, terapkan tahapan teknis berikut:
        </p>

        <div className="space-y-3.5">
          <div className="flex items-start gap-4 p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-xl">
            <span className="w-6 h-6 rounded-md bg-neutral-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
            <div className="space-y-1.5 text-sm sm:text-base">
              <strong className="text-neutral-950 block font-mono text-base font-extrabold">Lepaskan Baterai Terlebih Dahulu</strong>
              <span className="text-neutral-700 leading-relaxed block font-sans text-sm sm:text-base">
                Cabut soket fleksibel baterai dari konektor motherboard sebelum menyentuhkan pinset jumper. Menghubungkan titik testpoint saat sirkuit masih bertegangan berisiko merusak resistor pembatas dan jalur deteksi prosesor.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-xl">
            <span className="w-6 h-6 rounded-md bg-neutral-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
            <div className="space-y-1.5 text-sm sm:text-base">
              <strong className="text-neutral-950 block font-mono text-base font-extrabold">Hubungkan Titik Emas ke Ground</strong>
              <span className="text-neutral-700 leading-relaxed block font-sans text-sm sm:text-base">
                Gunakan pinset anti-statis berujung lancip. Sentuhkan satu ujung pinset ke titik emas Testpoint dan ujung lainnya ke kaleng pelindung motherboard (Ground/GND). Colokkan kabel USB ke komputer, tahan selama 1&ndash;2 detik hingga terdengar bunyi koneksi baru di Device Manager, lalu lepaskan pinset.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-xl">
            <span className="w-6 h-6 rounded-md bg-neutral-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
            <div className="space-y-1.5 text-sm sm:text-base">
              <strong className="text-neutral-950 block font-mono text-base font-extrabold">Opsi Direct ISP (eMMC / UFS)</strong>
              <span className="text-neutral-700 leading-relaxed block font-sans text-sm sm:text-base">
                Bila port USB tidak terdeteksi akibat kerusakan konektor atau jalur data prosesor putus, gunakan jalur Direct ISP dengan menyolder kawat jumper enamel ke titik CLK, CMD, DAT0, serta suplai tegangan VCC (2.8V) dan VCCQ (1.8V) menggunakan box flasher terstandar.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian 3: Proteksi Sinyal & Nomor Identitas (Anti IMEI Hilang) */}
      <section className="space-y-4 border-t border-neutral-100 pt-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-5 bg-neutral-950 rounded-full"></span>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 font-mono tracking-tight">
            03. Proteksi Sinyal &amp; Nomor Identitas (Anti IMEI Hilang)
          </h3>
        </div>

        <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-sans">
          Kendala sinyal tidak muncul (Baseband Unknown) atau nomor identitas perangkat terhapus (IMEI NULL) umumnya terjadi akibat kesalahan pemilihan opsi format saat proses instalasi firmware. Amankan partisi kalibrasi radio berikut:
        </p>

        <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-4">
          <span className="text-sm font-bold text-neutral-950 font-mono uppercase block tracking-wider">Partisi Vital Yang Dilarang Di-Wipe:</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
            <div className="p-3 bg-white border border-neutral-300 rounded-xl shadow-xs">
              <span className="font-extrabold text-neutral-950 block text-sm sm:text-base">{isQualcomm ? 'modemst1' : 'nvram'}</span>
              <span className="text-xs text-neutral-500 block mt-0.5">Radio NV Data</span>
            </div>
            <div className="p-3 bg-white border border-neutral-300 rounded-xl shadow-xs">
              <span className="font-extrabold text-neutral-950 block text-sm sm:text-base">{isQualcomm ? 'modemst2' : 'nvdata'}</span>
              <span className="text-xs text-neutral-500 block mt-0.5">IMEI Security</span>
            </div>
            <div className="p-3 bg-white border border-neutral-300 rounded-xl shadow-xs">
              <span className="font-extrabold text-neutral-950 block text-sm sm:text-base">{isQualcomm ? 'fsg' : 'protect1'}</span>
              <span className="text-xs text-neutral-500 block mt-0.5">RF Golden Data</span>
            </div>
            <div className="p-3 bg-white border border-neutral-300 rounded-xl shadow-xs">
              <span className="font-extrabold text-neutral-950 block text-sm sm:text-base">{isQualcomm ? 'fsc' : 'protect2'}</span>
              <span className="text-xs text-neutral-500 block mt-0.5">Modem Config</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans pt-1">
            <strong>Rekomendasi Teknisi:</strong> Buat cadangan (backup) partisi di atas melalui software servis sebelum mengeksekusi flashing penuh, terutama saat menangani unit yang mengalami restart berulang (bootloop).
          </p>
        </div>
      </section>

      {/* Bagian 4: Diagnosa & Solusi Kendala Flashing Umum */}
      <section className="space-y-4 border-t border-neutral-100 pt-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-5 bg-neutral-950 rounded-full"></span>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 font-mono tracking-tight">
            04. Diagnosa &amp; Solusi Kendala Flashing Umum
          </h3>
        </div>

        <div className="space-y-3 text-sm">
          <div className="p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
            <span className="font-mono font-bold text-neutral-950 block text-sm sm:text-base">Kendala: Handshake Timeout / Port USB Tiba-Tiba Putus</span>
            <p className="text-neutral-700 leading-relaxed font-sans text-sm">
              <strong>Penyebab:</strong> Kabel data mengalami penurunan voltase, konektor USB longgar, atau menggunakan port USB depan casing komputer.<br />
              <strong>Solusi:</strong> Pindahkan kabel USB ke port belakang motherboard komputer (Rear USB 2.0 Port) dan pastikan driver terpasang versi resmi tanpa konflik libusb.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
            <span className="font-mono font-bold text-neutral-950 block text-sm sm:text-base">Kendala: Write Storage Error / Flash Gagal di Tengah Proses</span>
            <p className="text-neutral-700 leading-relaxed font-sans text-sm">
              <strong>Penyebab:</strong> Berkas firehose programmer tidak sesuai dengan tipe IC memori, atau chip eMMC/UFS telah masuk mode proteksi baca (Read-Only).<br />
              <strong>Solusi:</strong> Gunakan loader firehose teruji yang sesuai dengan kode papan, atau lakukan pengecekan status kesehatan memori internal menggunakan box flasher.
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}
