import Link from 'next/link'
import AppScreenshotGallery from '@/components/AppScreenshotGallery'

export const metadata = {
  title: 'JumperTools — Software Flasher & Diagnosa Smartphone Multi-Chipset',
  description: 'Software desktop Windows x64 native untuk teknisi ponsel profesional. Solusi terpadu perbaikan firmware Qualcomm EDL 9008, MediaTek Brom, Samsung Odin, dan UNISOC SPD dengan proteksi partisi sinyal IMEI serta operasional 100% offline.',
  alternates: { canonical: 'https://fokuskonten.my.id/landpage/jumptools/' },
  openGraph: {
    title: 'JumperTools — Universal Smartphone Hardware & Flasher Suite',
    description: 'Software desktop Windows x64 native untuk teknisi ponsel profesional. Flashing multi-chipset Qualcomm, MediaTek, Samsung, dan UNISOC tanpa ketergantungan box hardware mahal.',
    images: [{ url: '/screenshots/jumptools/header.png', width: 1286, height: 1032, alt: 'JumperTools Suite Antarmuka Resmi' }],
  },
}

export default function JumperToolsDedicatedLandingPage() {
  const waContactUrl = `https://wa.me/6285183011318?text=${encodeURIComponent('Halo FokusKonten,\n\nSaya tertarik dengan software desktop *JumperTools* (Universal Smartphone Flasher & Hardware Suite).\nMohon informasi aktivasi lisensi hardware, fitur multi-chipset, dan konsultasi teknisi.')}`
  const devMailUrl = 'mailto:admin@fokuskonten.my.id?subject=Inquiry%20JumperTools%20Pro%20Official%20Suite'

  // Galeri 11 Tangkapan Layar HD Otentik Antarmuka Desktop — Rasio Asli 1286x1032 Terjaga 100%
  const galleryScreenshots = [
    {
      id: '01',
      title: 'Pusat Operasi Khusus & Unlock Perangkat',
      desc: 'Bypass FRP Google Account, hapus kunci pola/PIN/password, reset Mi Account Xiaomi, serta factory reset aman tanpa risiko mati total (hard-brick).',
      img: '/screenshots/jumptools/screens/01_Unlock_dan_Servis_Bypass.png',
      aspectRatio: '1286 / 1032',
    },
    {
      id: '02',
      title: 'Flasher Firmware Multi-Chipset',
      desc: 'Flasher firmware terpadu multi-protokol: Qualcomm Emergency Download (EDL 9008 via rawprogram/patch XML), MediaTek Scatter, Samsung Odin TAR/MD5/PIT, dan UNISOC PAC.',
      img: '/screenshots/jumptools/screens/02_Flasher_Firmware_Multi_Chipset.png',
      aspectRatio: '1286 / 1032',
    },
    {
      id: '03',
      title: 'Manajer Partisi GPT (eMMC & UFS)',
      desc: 'Akses langsung tabel partisi fisik chip storage. Membaca, mencadangkan (dump) ke berkas .img, menghapus, atau menulis partisi tunggal dengan proteksi otomatis sektor radio/IMEI.',
      img: '/screenshots/jumptools/screens/03_Partisi_GPT_eMMC_UFS.png',
      aspectRatio: '1286 / 1032',
    },
    {
      id: '04',
      title: 'Ekstraktor Firmware & Unpacker ROM',
      desc: 'Membongkar paket firmware terenkripsi: OFP Oppo/Realme, Payload.bin Google/OnePlus/Xiaomi, berkas Sparse Super.img, serta mengekstrak rawprogram XML Qualcomm secara instan.',
      img: '/screenshots/jumptools/screens/04_Ekstrak_Firmware_ROM.png',
      aspectRatio: '1286 / 1032',
    },
    {
      id: '05',
      title: 'Pencari Loader Qualcomm Firehose (EDL 9008)',
      desc: 'Pangkalan data luring 1.416 programmer Firehose (.elf/.mbn) resmi. Dilengkapi filter HWID otomatis, deteksi chipset, dan protokol jabat tangan Sahara langsung ke bus USB.',
      img: '/screenshots/jumptools/screens/05_Firehose_EDL_Sahara_Protocol.png',
      aspectRatio: '1286 / 1032',
    },
    {
      id: '06',
      title: 'Katalog Test Point & Jalur ISP Pinout',
      desc: 'Diagram visual titik jumper darurat (Test Point BROM/EDL 9008) untuk 3.078+ model ponsel serta 1.565+ jalur solder langsung ISP eMMC/UFS (CLK, CMD, DAT0, VCC).',
      img: '/screenshots/jumptools/screens/06_Test_Point_dan_ISP_Pinout.png',
      aspectRatio: '1286 / 1032',
    },
    {
      id: '07',
      title: 'Manajemen Nota Servis & Kasir Servis CRM',
      desc: 'Sistem CRM meja servis terintegrasi dengan database SQLite lokal. Pencatatan nota servis masuk/keluar, status perbaikan, garansi, estimasi biaya, dan cetak struk thermal 58mm/80mm.',
      img: '/screenshots/jumptools/screens/07_Nota_Servis_Kasir_CRM.png',
      aspectRatio: '1286 / 1032',
    },
    {
      id: '08',
      title: 'Asisten Driver USB & Filter Windows',
      desc: 'Pemeriksa status driver port USB chipset smartphone secara berkala via Windows PnP. Dilengkapi tombol pasang filter UsbDk, LibUSB WinUSB, dan paket driver resmi sekali klik.',
      img: '/screenshots/jumptools/screens/08_Asisten_Driver_USB_Filter.png',
      aspectRatio: '1286 / 1032',
    },
    {
      id: '09',
      title: 'Perbaikan Sinyal, Baseband & Nomor IMEI',
      desc: 'Pembuka port diagnostik Qualcomm (Diag COM), pencadangan & pemulihan partisi QCN (.qcn), serta backup/restore partisi vital NVRAM dan NVDATA MediaTek anti-hilang sinyal.',
      img: '/screenshots/jumptools/screens/09_Sinyal_IMEI_dan_QCN.png',
      aspectRatio: '1286 / 1032',
    },
    {
      id: '10',
      title: 'Pemasang Custom Recovery Fastboot',
      desc: 'Pemasangan kustom recovery TWRP, OrangeFox, dan PBRP secara permanen melalui protokol Fastboot, serta fitur Boot RAM sementara untuk uji coba tanpa menimpa partisi recovery bawaan.',
      img: '/screenshots/jumptools/screens/10_Custom_Recovery_TWRP.png',
      aspectRatio: '1286 / 1032',
    },
    {
      id: '11',
      title: 'Inspeksi Forensik & Kesehatan Hardware Ponsel',
      desc: 'Pembacaan identitas mendalam ponsel (SoC, model komersial, versi pita basis, patch keamanan Android, estimasi kesehatan baterai, dan sisa umur memori eMMC/UFS Health).',
      img: '/screenshots/jumptools/screens/11_Read_Info_Forensik_Hardware.png',
      aspectRatio: '1286 / 1032',
    },
  ]

  // 11 Modul Lengkap Suite Teknisi Meja Kerja
  const fullSuiteModules = [
    {
      num: '01',
      title: 'Unlock & Bypass Akun Khusus',
      badge: 'Tab 1 — Unlock & Servis',
      desc: 'Eksekusi satu klik untuk bypass FRP Google Account, hapus kunci pola/PIN/password, reset Mi Account Xiaomi, serta factory reset aman tanpa risiko brick pada ponsel bootloop.',
    },
    {
      num: '02',
      title: 'Flasher Firmware Multi-Chipset',
      badge: 'Tab 2 — Flasher Firmware',
      desc: 'Menyatukan 4 protokol flashing manufaktur: Qualcomm EDL 9008 (RawProgram/Patch XML), MediaTek Scatter DA, Samsung Odin 4-File (BL, AP, CP, CSC, PIT), dan UNISOC PAC FDL.',
    },
    {
      num: '03',
      title: 'Manajer Partisi GPT (eMMC & UFS)',
      badge: 'Tab 3 — Partisi GPT',
      desc: 'Akses granular langsung ke tabel partisi chip memori fisik. Mendukung operasi Dump .img, Write/Flash sektor tunggal, serta Erase dengan proteksi otomatis sektor radio/IMEI.',
    },
    {
      num: '04',
      title: 'Ekstraktor & Unpacker ROM Resmi',
      badge: 'Tab 4 — Ekstrak Firmware',
      desc: 'Alat bedah firmware pabrikan terpadu untuk membuka paket terenkripsi: OFP Oppo/Realme, Payload.bin Google/OnePlus, Sparse Super.img, serta ekstraksi rawprogram XML Qualcomm.',
    },
    {
      num: '05',
      title: 'Firehose EDL Finder & Sahara Protocol',
      badge: 'Tab 5 — Firehose (EDL)',
      desc: 'Pangkalan data luring 1.416 programmer Firehose (.elf/.mbn) resmi. Dilengkapi sistem pencarian cerdas berbasis HWID, brand, model, dan pengiriman protokol jabat tangan Sahara langsung.',
    },
    {
      num: '06',
      title: 'Katalog Test Point & Jalur ISP Pinout',
      badge: 'Tab 6 — Test Point',
      desc: 'Panduan visual titik test point darurat (BROM / EDL 9008) untuk 3.078+ tipe ponsel serta 1.565+ diagram solder ISP eMMC/UFS (CLK, CMD, DAT0, VCC) untuk pemulihan hard-brick.',
    },
    {
      num: '07',
      title: 'Nota Servis Kasir CRM Meja Bengkel',
      badge: 'Tab 7 — Nota Servis',
      desc: 'Aplikasi kasir dan CRM meja kerja terintegrasi dengan database SQLite lokal. Catat data pelanggan, status pengerjaan, estimasi biaya, garansi, serta cetak struk thermal 58mm/80mm.',
    },
    {
      num: '08',
      title: 'Asisten Driver USB & Filter Windows',
      badge: 'Tab 8 — Driver USB',
      desc: 'Monitoring real-time status driver USB perangkat smartphone via Windows PnP. Pemasangan filter UsbDk, LibUSB WinUSB, dan paket installer resmi sekali klik anti-konflik.',
    },
    {
      num: '09',
      title: 'Perbaikan Sinyal, Baseband & Nomor IMEI',
      badge: 'Tab 9 — Sinyal & IMEI',
      desc: 'Pembuka port diagnostik Qualcomm Diag COM, pencadangan dan pemulihan partisi QCN (.qcn), serta backup/restore partisi vital NVRAM dan NVDATA MediaTek anti-hilang sinyal.',
    },
    {
      num: '10',
      title: 'Pemasang Custom Recovery Fastboot',
      badge: 'Tab 10 — Custom Recovery',
      desc: 'Instalasi recovery kustom TWRP, OrangeFox, dan PBRP secara permanen via Fastboot, ditambah fitur Boot RAM sementara untuk eksplorasi tanpa mengubah partisi recovery bawaan.',
    },
    {
      num: '11',
      title: 'Inspeksi Forensik Hardware & Read Info',
      badge: 'Tab 11 — Read Info',
      desc: 'Membaca rincian identitas mendalam ponsel: arsitektur SoC, model komersial, versi pita basis, patch keamanan Android, estimasi kesehatan baterai, dan sisa umur memori eMMC/UFS.',
    },
  ]

  // Keresahan Nyata Teknisi (Pain Points Meja Servis)
  const painPoints = [
    {
      title: 'Terbebani Biaya Dongle & Box Fisik Jutaan Rupiah',
      desc: 'Membeli berbagai macam alat box dan dongle perangkat keras terpisah untuk tiap merek ponsel sangat menguras modal meja kerja bengkel servis Anda.',
    },
    {
      title: 'Risiko Fatal Hilang Sinyal & Kerusakan Partisi IMEI',
      desc: 'Proses flashing manual sering kali secara tidak sengaja menimpa partisi radio jaringan (Modem/EFS/NVRAM), membuat ponsel pelanggan kehilangan nomor IMEI dan sinyal operator.',
    },
    {
      title: 'Software Pihak Ketiga Tercecer & Rentan Virus',
      desc: 'Mengunduh puluhan program flasher bajakan dari forum tidak resmi berisiko tinggi merusak sistem komputer Windows Anda dengan malware, adware, atau trojan berbahaya.',
    },
    {
      title: 'Servis Terhenti Saat Internet Mati & Biaya Sewa Bulanan',
      desc: 'Banyak software servis berbasis server cloud yang langsung macet saat jaringan internet padam, ditambah kewajiban membayar biaya kredit sewa bulanan yang terus membengkak.',
    },
  ]

  // 4 Protokol Chipset Utama
  const chipsetPillars = [
    {
      id: '01',
      brand: 'Qualcomm Snapdragon',
      badge: 'Mode Darurat EDL 9008',
      desc: 'Protokol darurat Emergency Download langsung ke prosesor ponsel. Membaca tabel partisi memori, menulis firmware per sektor, dan memulihkan ponsel yang mengalami mati total (hard-brick) secara aman.',
      specs: 'Dukungan Memori UFS & eMMC • Pemulihan Hard-Brick',
    },
    {
      id: '02',
      brand: 'MediaTek (MTK)',
      badge: 'Bypass Proteksi Brom',
      desc: 'Melewati proteksi perangkat keras pada chipset Dimensity dan Helio tanpa kendala otorisasi akun. Penulisan firmware via berkas scatter resmi, format partisi terkunci, dan perbaikan partisi sinyal.',
      specs: 'Kompatibel Dimensity & Helio • Penulisan Scatter Cepat',
    },
    {
      id: '03',
      brand: 'Samsung Exynos & Qualcomm',
      badge: 'Flashing Odin 4-Berkas',
      desc: 'Otomatisasi pembacaan dan flashing paket firmware resmi 4 berkas (BL, AP, CP, CSC). Ekstraksi tabel partisi PIT otomatis untuk memulihkan perangkat Samsung yang terjebak kondisi bootloop.',
      specs: 'Protokol Mode Unduhan • Parser Partisi PIT Terpadu',
    },
    {
      id: '04',
      brand: 'UNISOC / Spreadtrum (SPD)',
      badge: 'Flasher Berkas PAC',
      desc: 'Dukungan penuh prosesor UNISOC modern (SC9863A, T606, T612, T616). Ekstraksi paket berkas PAC resmi serta flashing aman tanpa risiko kegagalan sistem bootloader.',
      specs: 'Dukungan Seri T606/T616 • Ekstraksi Berkas PAC Instan',
    },
  ]

  // Komparasi Head-to-Head
  const comparisons = [
    {
      feature: 'Kebutuhan Perangkat Tambahan',
      oldWay: 'Wajib membeli belasan box dan dongle fisik bernilai jutaan rupiah',
      jumptools: 'Cukup menggunakan PC Windows dan kabel data USB standar yang berkualitas',
    },
    {
      feature: 'Keamanan Sinyal & IMEI',
      oldWay: 'Rentan salah menimpa partisi radio hingga ponsel kehilangan sinyal seluler',
      jumptools: 'Proteksi otomatis mengunci partisi Modem/EFS/NVRAM sebelum proses eksekusi dimulai',
    },
    {
      feature: 'Kelengkapan Modul Kerja',
      oldWay: 'Aplikasi terpisah-pisah (flasher sendiri, nota sendiri, pinout cari di Google)',
      jumptools: '11 modul servis terintegrasi dalam 1 software (flasher, partisi, pinout, kasir CRM)',
    },
    {
      feature: 'Konektivitas & Ketergantungan Jaringan',
      oldWay: 'Macet total saat koneksi internet lambat atau kuota akun server habis',
      jumptools: '100% Bekerja mandiri secara offline langsung dari komputer meja kerja Anda',
    },
    {
      feature: 'Model Biaya & Lisensi',
      oldWay: 'Sistem sewa tahunan atau pembelian kredit server yang terus menguras keuntungan',
      jumptools: 'Lisensi permanen beli-putus tanpa biaya langganan bulanan yang membebani kas',
    },
  ]

  // FAQ Teknisi
  const faqs = [
    {
      q: 'Apakah JumperTools membutuhkan dongle atau box hardware fisik?',
      a: 'Tidak. JumperTools adalah software biner native Windows x64 (.EXE). Anda hanya membutuhkan komputer Windows 64-bit dan kabel USB berkualitas tanpa perlu membeli box hardware tambahan yang bernilai jutaan rupiah.',
    },
    {
      q: 'Sistem operasi Windows versi berapa yang didukung?',
      a: 'JumperTools berjalan optimal pada sistem operasi Windows 10 (64-bit) dan Windows 11 (64-bit). Diperlukan pemasangan driver resmi USB chipset (Qualcomm QDLoader, MTK VCOM, Samsung USB, dan UNISOC) yang dapat dipasang langsung melalui Tab Asisten Driver.',
    },
    {
      q: 'Apakah seluruh fiturnya benar-benar bekerja secara offline?',
      a: 'Ya, 100% offline. Mulai dari database Firehose, katalog test point, ekstraktor firmware, hingga nota servis CRM kasir berjalan di database SQLite lokal komputer Anda tanpa memerlukan koneksi internet aktif.',
    },
    {
      q: 'Bagaimana mekanisme proteksi partisi sinyal dan IMEI bekerja?',
      a: 'Engine memiliki sistem SafetyNet internal yang mengklasifikasikan sektor memori menjadi CriticalRadio, Warning, dan Safe. Partisi sensitif seperti modemst1/2, nvram, nvdata, dan persist secara default dikunci dan di-backup otomatis sebelum penulisan dilakukan untuk mencegah hilangnya sinyal dan IMEI ponsel.',
    },
  ]

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans antialiased selection:bg-neutral-950 selection:text-white">
      <div className="fk-scroll-progress" aria-hidden="true" />

      {/* ── BREADCRUMB & NAVIGASI ATAS ─────────────────────────────────── */}
      <div className="pt-24 sm:pt-28 pb-4 bg-neutral-50/70 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-500">
            <Link href="/" className="hover:text-black transition-colors font-medium">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/aplikasi" className="hover:text-black transition-colors font-medium">
              Produk &amp; Aplikasi
            </Link>
            <span>/</span>
            <span className="text-neutral-950 font-semibold">JumperTools</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-950" />
            <span className="font-semibold text-neutral-950">APLIKASI DESKTOP WINDOWS (64-BIT)</span>
          </div>
        </div>
      </div>

      {/* ── HERO SALES SECTION (LANGSUNG H1 BERSIH SETARA APOTEK PRO) ──── */}
      <section className="pt-12 sm:pt-16 pb-16 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h1 className="fk-hero-in heading-xl text-3xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-tight sm:leading-none mb-6 text-balance max-w-5xl mx-auto" style={{ '--hero-i': 0 }}>
            Perbaikan Firmware &amp; Diagnosa Smartphone <br className="hidden sm:inline" />
            Tanpa Box Hardware Mahal
          </h1>

          <p className="fk-hero-in text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal" style={{ '--hero-i': 1 }}>
            Software desktop Windows 64-bit untuk meja servis teknisi ponsel profesional. Menyatukan protokol resmi flashing Qualcomm, MediaTek, Samsung, dan UNISOC dalam satu aplikasi praktis dengan pengaman partisi IMEI otomatis dan 100% bekerja offline.
          </p>

          {/* DUA TOMBOL AKSI UTAMA */}
          <div className="fk-hero-in flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14 max-w-xl mx-auto" style={{ '--hero-i': 2 }}>
            <a
              href={waContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-display font-bold text-sm sm:text-base text-white bg-neutral-950 hover:bg-neutral-800 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>Konsultasi &amp; Lisensi Teknisi</span>
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <Link
              href="/aplikasi/jumptools"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-neutral-800 bg-white border border-neutral-300 hover:border-black hover:bg-neutral-50 shadow-sm transition-all duration-200"
            >
              <span>Spesifikasi Modul</span>
            </Link>
          </div>

          {/* ── SASIS JENDELA DESKTOP WINDOWS CENTERPIECE (PUTIH BERSIH) ──── */}
          <div className="fk-hero-in max-w-5xl mx-auto rounded-3xl overflow-hidden border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] bg-white mb-12 text-left" style={{ '--hero-i': 3 }}>
            {/* Titlebar Jendela Windows */}
            <div className="px-5 py-3.5 bg-neutral-50 border-b border-neutral-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white p-0.5 border border-neutral-300 shrink-0">
                  <img
                    src="/app-icons/jumptools.png"
                    alt="JumperTools Icon"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-mono text-xs font-semibold text-neutral-900 tracking-wide truncate">
                  JumperTools v1.0.0 — Universal Flasher &amp; Hardware Suite (win-x64)
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neutral-100 text-neutral-800 border border-neutral-300">
                  ONLINE: COM4
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 inline-block" />
              </div>
            </div>

            {/* Ribbon Bar Protokol Chipset */}
            <div className="px-5 py-3 bg-white border-b border-neutral-200/80 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-neutral-950 text-white font-bold">
                Qualcomm EDL 9008
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200 font-medium">
                MediaTek Brom / DA
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200 font-medium">
                Samsung Odin / PIT
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200 font-medium">
                UNISOC SPD PAC
              </span>
            </div>

            {/* Konten Dashboard Sasis Bersih */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* 4 Kartu Parameter Servis */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                  <span className="text-[11px] font-mono font-bold text-neutral-500 block mb-1">PORT USB AKTIF</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-neutral-950">COM4 (QDLoader)</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                  <span className="text-[11px] font-mono font-bold text-neutral-500 block mb-1">STATUS PARTISI</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-neutral-950">Modem/EFS Aman</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                  <span className="text-[11px] font-mono font-bold text-neutral-500 block mb-1">MODE OPERASIONAL</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-neutral-950">100% Offline Lokal</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                  <span className="text-[11px] font-mono font-bold text-neutral-500 block mb-1">STATUS LISENSI</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-neutral-950">Permanen HWID</span>
                </div>
              </div>

              {/* Rincian Operasi Aman */}
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200 text-xs font-mono text-neutral-600">
                  <span className="font-semibold text-neutral-950">Status: Sistem Verifikasi Sektor Firmware Siaga</span>
                  <span>Protokol: Emergency Download (EDL) Mode</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-mono font-bold text-neutral-400 block mb-1">PERLINDUNGAN JARINGAN</span>
                    <p className="font-semibold text-neutral-950">Kunci Partisi Radio Otomatis</p>
                    <p className="text-neutral-500 mt-0.5">Mencegah ponsel kehilangan sinyal seluler dan nomor IMEI.</p>
                  </div>
                  <div>
                    <span className="font-mono font-bold text-neutral-400 block mb-1">VERIFIKASI INTEGRITAS</span>
                    <p className="font-semibold text-neutral-950">Pemeriksaan Keaslian Berkas</p>
                    <p className="text-neutral-500 mt-0.5">Memastikan tidak ada berkas corrupt yang terpasang ke memori ponsel.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 STATS GRID KEUNGGULAN UTAMA */}
          <div className="fk-hero-in grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]" style={{ '--hero-i': 4 }}>
            <div className="p-3 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-3">
                01
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">4 Protokol</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Multi-Chipset Terintegrasi</div>
            </div>
            <div className="p-3 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-3">
                02
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Aman Sinyal</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Proteksi Kunci Partisi IMEI</div>
            </div>
            <div className="p-3 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-3">
                03
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">100% Offline</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Mandiri Tanpa Internet</div>
            </div>
            <div className="p-3 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-3">
                04
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">Beli Putus</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Nol Biaya Sewa Bulanan</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALERI 11 TANGKAPAN LAYAR HD (STANDAR CRM) ─────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-neutral-50/50">
        <AppScreenshotGallery
          title="Galeri Antarmuka JumperTools"
          subtitle="Tinjauan visual langsung alur kerja flasher firmware, manajer partisi GPT, hingga nota servis CRM kasir meja kerja."
          label="DOKUMENTASI ANTARMUKA DESKTOP"
          items={galleryScreenshots}
          isDesktop={true}
        />
      </section>

      {/* ── 11 MODUL SPESIALIS MEJA SERVIS (TANPA EMOJI) ────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16" data-reveal>
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-300 mb-3 inline-block">
              ARSITEKTUR LENGKAP SUITE
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              11 Modul Spesialis Meja Servis Smartphone
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Seluruh fungsionalitas dirancang terpadu tanpa mengharuskan teknisi membuka aplikasi terpisah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {fullSuiteModules.map((m, idx) => (
              <div
                key={m.num}
                data-reveal
                data-spotlight
                style={{ '--reveal-i': idx }}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:border-neutral-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-sm shadow-sm">
                      {m.num}
                    </span>
                    <span className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">
                      {m.badge}
                    </span>
                  </div>
                  <h3 className="heading-lg text-lg text-neutral-950 mb-2 font-bold">
                    {m.title}
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KERESAHAN NYATA TEKNISI (PAIN POINTS) ───────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16" data-reveal>
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-950 text-white mb-3 inline-block">
              TANTANGAN MEJA KERJA
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              Keresahan Nyata yang Dihadapi Teknisi Servis
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Penanganan perbaikan software ponsel sering kali terhambat oleh kerumitan alat dan tingginya biaya yang harus dikeluarkan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {painPoints.map((point, idx) => (
              <div
                key={idx}
                data-reveal
                style={{ '--reveal-i': idx }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-xs font-bold text-neutral-400 mb-2">
                    MASALAH 0{idx + 1}
                  </div>
                  <h3 className="heading-lg text-lg sm:text-xl text-neutral-950 mb-3 font-bold">
                    {point.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed font-sans">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 PROTOKOL CHIPSET TERINTEGRASI ────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16" data-reveal>
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-300 mb-3 inline-block">
              DUKUNGAN LENGKAP MULTI-CHIPSET
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              4 Protokol Flashing Utama dalam Satu Aplikasi
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Mengeliminasi keharusan memasang puluhan program terpisah. Seluruh protokol resmi disatukan dalam satu aplikasi desktop yang stabil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {chipsetPillars.map((chip, idx) => (
              <div
                key={chip.id}
                data-reveal
                style={{ '--reveal-i': idx }}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:border-neutral-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-mono text-2xl font-extrabold text-neutral-400">
                      {chip.id}
                    </span>
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-neutral-950 text-white">
                      {chip.badge}
                    </span>
                  </div>

                  <h3 className="heading-lg text-xl sm:text-2xl text-neutral-950 mb-3 font-bold">
                    {chip.brand}
                  </h3>

                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                    {chip.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 font-mono text-xs text-neutral-500 font-semibold">
                  {chip.specs}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KOMPARASI HEAD-TO-HEAD (CARA LAMA VS JUMPTOOLS PRO) ─────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-neutral-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16" data-reveal>
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-950 text-white mb-3 inline-block">
              KOMPARASI MEJA SERVIS
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              Alat Konvensional vs JumperTools
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Perbandingan nyata efisiensi dan keamanan operasional servis antara cara konvensional dengan solusi terintegrasi.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] divide-y divide-neutral-100 overflow-hidden" data-reveal>
            {comparisons.map((c, idx) => (
              <div key={idx} className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-4">
                  <span className="text-xs font-mono font-bold text-neutral-400 block mb-1">ASPEK 0{idx + 1}</span>
                  <div className="font-display font-bold text-base text-neutral-950">{c.feature}</div>
                </div>
                <div className="lg:col-span-4 text-xs sm:text-sm text-neutral-500 font-sans">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 mb-1 font-semibold">Alat Konvensional</div>
                  {c.oldWay}
                </div>
                <div className="lg:col-span-4 text-xs sm:text-sm text-neutral-950 font-medium font-sans">
                  <div className="text-[11px] font-mono uppercase text-neutral-950 mb-1 font-bold">JumperTools</div>
                  {c.jumptools}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ TEKNISI ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-14" data-reveal>
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-950 text-white mb-3 inline-block">
              FAQ TEKNISI
            </span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3 tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Jawaban ringkas dan faktual mengenai pengoperasian software dan aktivasi lisensi.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                data-reveal
                style={{ '--reveal-i': idx }}
                className="bg-neutral-50/70 rounded-2xl p-6 sm:p-7 border border-neutral-200/80 shadow-sm"
              >
                <h3 className="font-display font-bold text-base sm:text-lg text-neutral-950 mb-2">
                  {faq.q}
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA PENUTUP (KONTAK & LISENSI) ───────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-reveal>
          <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
            Siap Mengoptimalkan Meja Kerja Servis Anda?
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Dapatkan akses software mandiri untuk kemudahan penanganan firmware ponsel dengan dukungan teknis langsung dari pengembang.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
            <a
              href={waContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-display font-bold text-sm sm:text-base text-white bg-neutral-950 hover:bg-neutral-800 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>Hubungi Pengembang via WhatsApp</span>
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href={devMailUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-neutral-800 bg-white border border-neutral-300 hover:border-black hover:bg-neutral-50 shadow-sm transition-all duration-200"
            >
              <span>Kirim Pesan Email</span>
            </a>
          </div>

          <div className="text-xs font-mono text-neutral-500">
            Dukungan Resmi Pengembang Tunggal FokusKonten (Muhari) • Bebas Biaya Langganan Bulanan
          </div>
        </div>
      </section>
    </div>
  )
}
