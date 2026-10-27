import Link from 'next/link'

export const metadata = {
  title: 'JumperTools Pro — Software Flashing & Diagnosa Smartphone Multi-Chipset (.NET 8 WPF)',
  description: 'Software desktop Windows x64 native (C# .NET 8 WPF Ribbon UI) untuk teknisi ponsel profesional. Multi-chipset flashing Qualcomm EDL 9008, MediaTek Brom/DA Bypass, Samsung Odin/PIT, UNISOC SPD, serta diagnosa hardware tingkat rendah.',
  alternates: { canonical: 'https://fokuskonten.my.id/landpage/jumptools/' },
  openGraph: {
    title: 'JumperTools Pro — Universal Smartphone Hardware & Flasher Suite',
    description: 'Software desktop Windows x64 native untuk teknisi ponsel profesional. Multi-chipset flashing Qualcomm EDL 9008, MediaTek Brom/DA Bypass, Samsung Odin, dan UNISOC SPD.',
    images: [{ url: '/screenshots/jumptools/header.jpg', width: 1200, height: 630, alt: 'JumperTools Pro Banner' }],
  },
}

export default function JumperToolsDedicatedLandingPage() {
  const waContactUrl = `https://wa.me/6285183011318?text=${encodeURIComponent('Halo FokusKonten,\n\nSaya tertarik dengan software desktop *JumperTools Pro* (Universal Smartphone Flasher & Hardware Suite).\nMohon informasi aktivasi lisensi hardware, fitur multi-chipset, dan konsultasi teknisi.')}`
  const devMailUrl = 'mailto:admin@fokuskonten.my.id?subject=Inquiry%20JumperTools%20Pro%20Official%20Suite'

  // 4 Pilar Chipset Protokol
  const chipsetPillars = [
    {
      id: '01',
      brand: 'Qualcomm Snapdragon',
      badge: 'EDL 9008 Sahara / Firehose',
      desc: 'Protokol darurat Emergency Download (EDL 9008) langsung ke CPU. Membaca GPT partition table, flashing RawProgram0.xml & Patch0.xml, backup partisi radio EFS/QCN, dan unbrick mati total tanpa tes poin rumit.',
      specs: 'Sahara v2 Handshake • Firehose XML • UFS & eMMC Support',
    },
    {
      id: '02',
      brand: 'MediaTek (MTK)',
      badge: 'Brom SLA/DAA Hardware Bypass',
      desc: 'Bypass proteksi otentikasi perangkat keras SLA/DAA pada chipset Dimensity & Helio secara instan. Menulis firmware via Scatter file resmi, format partisi terkunci, serta perbaikan partisi NVRAM/NVDATA.',
      specs: 'Brom Auth Bypass • High-Speed DA Agent • Fix Null Baseband',
    },
    {
      id: '03',
      brand: 'Samsung Exynos & Qualcomm',
      badge: 'Odin PIT & 4-File Firmware',
      desc: 'Otomasi pembacaan dan flashing firmware resmi 4 berkas (BL, AP, CP, CSC). Ekstraksi dan penulisan tabel partisi PIT otomatis untuk memulihkan perangkat Samsung yang terjebak soft-brick atau bootloop.',
      specs: 'Download Mode Protocol • PIT Partition Parser • FRP Guide',
    },
    {
      id: '04',
      brand: 'UNISOC / Spreadtrum (SPD)',
      badge: 'FDL1/FDL2 Bootloader Handshake',
      desc: 'Dukungan penuh arsitektur chipset UNISOC modern (SC9863A, T606, T612, T616). Handshake bootloader via FDL1/FDL2, ekstraksi berkas paket PAC resmi, serta flashing aman tanpa resiko bootloader corrupt.',
      specs: 'FDL Handshake • PAC Firmware Flasher • NV Item Backup',
    },
  ]

  // Fitur Unggulan Teknisi
  const technicianFeatures = [
    {
      title: 'Auto-Detect Port USB COM Real-Time',
      desc: 'Sistem polling cerdas mendeteksi seketika saat ponsel dihubungkan via kabel USB (Qualcomm 9008, MTK USB Port, Samsung Mobile USB, atau Android ADB/Fastboot) tanpa perlu membuka Device Manager secara manual.',
    },
    {
      title: 'Terminal Log Interaktif & Pemeriksaan Hash',
      desc: 'Setiap blok sektor firmware yang ditulis ke memori eMMC/UFS diverifikasi dengan hash SHA-256 secara langsung di terminal log untuk memastikan integritas data biner 100% utuh.',
    },
    {
      title: 'Proteksi Partisi Radio & IMEI (Anti-Hilang Sinyal)',
      desc: 'Tombol pengaman otomatis mengunci partisi kritis (Modem, EFS, QCN, NVRAM, Protect_F/Protect_S) sebelum proses flashing dimulai, melindungi perangkat pelanggan dari resiko hilang sinyal atau Baseband Unknown.',
    },
    {
      title: 'Antarmuka Ribbon Modern C# .NET 8 WPF',
      desc: 'Didesain khusus untuk meja kerja teknisi servis. Menghilangkan kerumitan menghafal baris perintah command-line (CLI) menjadi tombol grafis intuitif dengan responsivitas tinggi.',
    },
    {
      title: '100% Offline First Tanpa Ketergantungan Cloud',
      desc: 'Seluruh algoritma parsing PIT, burner Firehose, dan protokol USB berjalan sepenuhnya di komputer lokal Anda. Operasional servis bengkel Anda tetap lancar saat internet mati.',
    },
    {
      title: 'Lisensi Perangkat Keras Mandiri (FKACT1)',
      desc: 'Sistem aktivasi kriptografi Ed25519 mengunci lisensi ke hardware ID (HWID) PC teknisi. Beli putus sekali aktivasi tanpa tagihan biaya langganan server bulanan yang membebani.',
    },
  ]

  // 3 Langkah Alur Kerja Teknisi
  const workflowSteps = [
    {
      step: '01',
      title: 'Hubungkan Perangkat & Deteksi Port',
      desc: 'Pasang kabel USB ponsel dalam mode EDL 9008, Brom, Download Mode, atau Fastboot. JumperTools Pro otomatis mengenali chipset dan nomor port COM yang aktif.',
    },
    {
      step: '02',
      title: 'Pilih Berkas Firmware / Operasi',
      desc: 'Arahkan berkas firmware (Scatter MTK, RawProgram Qualcomm, Tar Samsung, atau PAC UNISOC). Sistem otomatis memverifikasi kecocokan partisi dengan spesifikasi ponsel.',
    },
    {
      step: '03',
      title: 'Eksekusi Flashing & Verifikasi',
      desc: 'Klik tombol Flash. Pantau proses penulisan per partisi via terminal progress bar. Setelah sukses 100%, ponsel otomatis di-reboot ke sistem normal.',
    },
  ]

  // FAQ Teknisi
  const faqs = [
    {
      q: 'Apakah JumperTools Pro membutuhkan dongle atau box hardware fisik tambahan?',
      a: 'Tidak. JumperTools Pro adalah software mandiri (.EXE) berbasis arsitektur C# .NET 8 WPF. Anda hanya membutuhkan PC/Laptop Windows (64-bit) dan kabel data USB Type-C / Micro-USB standar berkualitas baik tanpa perlu membeli box hardware mahal.',
    },
    {
      q: 'Sistem operasi Windows versi berapa yang didukung?',
      a: 'JumperTools Pro berjalan optimal pada Windows 10 (64-bit) dan Windows 11 (64-bit). Diperlukan instalasi driver resmi chipset (Qualcomm QDLoader Driver, MTK VCOM Driver, Samsung USB Driver, dan Spreadtrum Driver) yang dapat diunduh langsung melalui menu utilitas di dalam software.',
    },
    {
      q: 'Bagaimana lisensi diaktifkan dan apakah ada biaya bulanan?',
      a: 'Lisensi JumperTools Pro bersifat beli-putus tanpa biaya langganan bulanan. Kunci lisensi diverifikasi via tanda tangan digital kriptografi Ed25519 (protokol FKACT1) yang terikat pada Hardware ID (HWID) komputer meja kerja Anda.',
    },
    {
      q: 'Apakah aman digunakan untuk ponsel yang mengalami bootloop atau mati total (hard-brick)?',
      a: 'Sangat aman. Selama perangkat keras CPU dan eMMC/UFS ponsel masih dapat menerima daya dan terdeteksi port COM (misal Qualcomm 9008 atau MTK Preloader/Brom), protokol darurat tingkat rendah JumperTools Pro dapat menulis ulang partisi bootloader hingga perangkat hidup kembali.',
    },
  ]

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-950 selection:text-white">
      {/* ── HEADER STATUS & BREADCRUMB ─────────────────────────────────── */}
      <div className="border-b border-neutral-200/80 bg-neutral-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-600">
            <Link href="/" className="hover:text-neutral-950 font-semibold underline">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/aplikasi" className="hover:text-neutral-950 font-semibold underline">
              Portofolio Produk
            </Link>
            <span>/</span>
            <span className="text-neutral-950 font-bold">JumperTools Pro</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-neutral-950">DESKTOP SUITE • NATIVE C# .NET 8 WPF</span>
          </div>
        </div>
      </div>

      {/* ── HERO SALES SECTION ─────────────────────────────────────────── */}
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-neutral-200/80 bg-gradient-to-b from-white via-neutral-50/40 to-neutral-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950 text-white text-xs font-mono font-semibold mb-6 shadow-sm">
            <span>UNIVERSAL SMARTPHONE HARDWARE &amp; FLASHER SUITE</span>
          </div>

          <h1 className="heading-xl text-3xl sm:text-5xl lg:text-6xl text-neutral-950 mb-6 tracking-tight text-balance">
            JumperTools Pro
          </h1>

          <p className="text-base sm:text-xl text-neutral-600 max-w-3xl mx-auto mb-10 leading-relaxed text-balance">
            Software desktop Windows x64 native dengan antarmuka Ribbon UI modern untuk teknisi ponsel profesional. Menyatukan protokol flashing multi-chipset (Qualcomm EDL 9008, MediaTek Brom/DA, Samsung Odin, dan UNISOC SPD) dalam satu aplikasi tangguh, cepat, dan 100% offline.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
            <a
              href={waContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-white bg-neutral-950 hover:bg-neutral-800 shadow-md transition-all duration-200"
            >
              <span>Konsultasi &amp; Lisensi Teknisi</span>
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <Link
              href="/aplikasi/jumptools"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-neutral-800 bg-white border border-neutral-300 hover:border-neutral-950 hover:bg-neutral-50 shadow-sm transition-all duration-200"
            >
              <span>Spesifikasi Modul</span>
            </Link>
          </div>

          {/* ── SASIS JENDELA DESKTOP WINDOWS MOCKUP ─────────────────────── */}
          <div className="max-w-5xl mx-auto bg-neutral-950 rounded-2xl sm:rounded-3xl p-2 sm:p-3 shadow-2xl border border-neutral-800 text-left">
            {/* Titlebar Windows */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-neutral-800 text-neutral-400 text-xs font-mono">
              <div className="flex items-center gap-2 truncate">
                <img src="/app-icons/jumptools.png" alt="JumperTools Icon" className="w-4 h-4 rounded object-contain shrink-0" />
                <span className="font-bold text-white truncate">JumperTools Pro v1.0.0 — Universal Flasher &amp; Hardware Suite</span>
                <span className="hidden md:inline-block px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
                  CONNECTED: COM4 (Qualcomm 9008)
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-3 h-3 rounded-full bg-neutral-700" />
                <span className="w-3 h-3 rounded-full bg-neutral-700" />
                <span className="w-3 h-3 rounded-full bg-neutral-700" />
              </div>
            </div>

            {/* Ribbon Bar Windows WPF */}
            <div className="bg-neutral-900 border-b border-neutral-800 p-2 sm:p-3">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono">
                <button className="px-3 py-1.5 rounded-lg bg-white text-neutral-950 font-bold shadow-sm">
                  Qualcomm EDL 9008
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors">
                  MediaTek Brom / DA
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors">
                  Samsung Odin / PIT
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors">
                  UNISOC SPD PAC
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors">
                  ADB &amp; Fastboot Terminal
                </button>
              </div>
            </div>

            {/* Sasis Panel Kerja & Terminal Log */}
            <div className="p-4 sm:p-6 bg-neutral-950 grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs font-mono">
              {/* Kolom Kiri: Parameter & Konfigurasi Flash */}
              <div className="lg:col-span-5 bg-neutral-900/90 rounded-xl p-4 border border-neutral-800/80 space-y-3">
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-bold border-b border-neutral-800 pb-2">
                  Target Device Configuration
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="text-neutral-500 text-[10px] block mb-1">PROG FIREHOSE ELF / MBN</label>
                    <div className="p-2 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 truncate">
                      prog_firehose_ddr_sm7150.elf
                    </div>
                  </div>
                  <div>
                    <label className="text-neutral-500 text-[10px] block mb-1">RAWPROGRAM XML</label>
                    <div className="p-2 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 truncate">
                      rawprogram0_unsparse.xml (38 Partitions)
                    </div>
                  </div>
                  <div>
                    <label className="text-neutral-500 text-[10px] block mb-1">PATCH XML</label>
                    <div className="p-2 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 truncate">
                      patch0.xml (GPT Checksum Valid)
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] text-emerald-400 font-semibold">Radio / EFS Protection: LOCKED</span>
                </div>
              </div>

              {/* Kolom Kanan: Realtime Diagnostic Terminal */}
              <div className="lg:col-span-7 bg-black rounded-xl p-4 border border-neutral-800 text-[11px] leading-relaxed text-neutral-300 flex flex-col justify-between overflow-x-auto">
                <div className="space-y-1">
                  <div className="text-neutral-500">[09:54:12] JumperTools Pro Hardware Detection Engine Ready.</div>
                  <div className="text-neutral-400">[09:54:13] Enumerating USB serial devices on Windows host...</div>
                  <div className="text-emerald-400 font-semibold">[09:54:14] USB COM4 CONNECTED: Qualcomm HS-USB QDLoader 9008 (VID: 05C6, PID: 9008)</div>
                  <div className="text-neutral-300">[09:54:15] Executing Sahara v2 Protocol Handshake... OK (Target CPU: SM7150)</div>
                  <div className="text-neutral-300">[09:54:16] Sending Programmer: prog_firehose_ddr_sm7150.elf [100% OK]</div>
                  <div className="text-neutral-300">[09:54:17] Firehose Protocol Handshake Received: XML Storage Mode Engaged.</div>
                  <div className="text-neutral-300">[09:54:18] Reading GPT Table from UFS LUN 0 (Capacity: 128 GB, Sector Size: 4096B)...</div>
                  <div className="text-neutral-400">[09:54:19] Partitions verified: boot, recovery, system_a, vendor_a, userdata.</div>
                  <div className="text-emerald-400 font-bold">[09:54:20] READY TO FLASH — Safe Partition Guard Active.</div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>TRANSFER RATE: 38.4 MB/s (USB 3.1 GEN1)</span>
                  <span className="text-white bg-neutral-900 px-2 py-1 rounded border border-neutral-700">STATUS: STANDBY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 PILAR CHIPSET PROTOKOL ───────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-200 mb-3 inline-block">
              MULTI-CHIPSET ARCHITECTURE
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              4 Protokol Hardware Tingkat Rendah Terintegrasi
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              JumperTools Pro mengeliminasi keharusan memasang belasan software flasher pihak ketiga yang tercecer dan rentan virus. Seluruh protokol resmi multi-chipset disatukan dalam satu antarmuka desktop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {chipsetPillars.map((chip) => (
              <div
                key={chip.id}
                className="bg-neutral-50/70 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-neutral-200/80 hover:border-neutral-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
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

                <div className="pt-4 border-t border-neutral-200/70 font-mono text-xs text-neutral-500 font-semibold">
                  {chip.specs}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 FITUR UNGGULAN TEKNISI ───────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-950 text-white mb-3 inline-block">
              ENGINEER-GRADE STABILITY
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              Dirancang untuk Keamanan Meja Kerja Servis
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Prioritas utama JumperTools Pro adalah mencegah resiko kesalahan fatal (*brick*) pada ponsel pelanggan dengan menghadirkan sistem verifikasi dan penguncian partisi otomatis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicianFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/80 shadow-sm hover:shadow-md hover:border-neutral-400 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-sm mb-5 shadow-sm">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </div>
                <h3 className="heading-lg text-lg text-neutral-950 mb-2 font-bold">
                  {feat.title}
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALUR KERJA TEKNISI 3 LANGKAH ───────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-200 mb-3 inline-block">
              FAST WORKFLOW
            </span>
            <h2 className="heading-xl text-3xl sm:text-4xl text-neutral-950 mb-4 tracking-tight">
              3 Langkah Praktis Penanganan Ponsel
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Alur kerja terstandarisasi untuk mempercepat antrean servis di konter atau laboratorium reparasi Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {workflowSteps.map((wf) => (
              <div key={wf.step} className="bg-neutral-50/70 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 text-center relative">
                <div className="font-mono text-3xl font-extrabold text-neutral-300 mb-4">
                  {wf.step}
                </div>
                <h3 className="heading-lg text-lg text-neutral-950 mb-3 font-bold">
                  {wf.title}
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {wf.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-neutral-200/80 bg-neutral-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-14">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-neutral-950 text-white mb-3 inline-block">
              FAQ TEKNISI
            </span>
            <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3 tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm">
              Informasi teknis seputar lisensi, kompatibilitas driver, dan keamanan perangkat.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm">
                <h3 className="font-display font-bold text-sm sm:text-base text-neutral-950 mb-2">
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

      {/* ── CALL TO ACTION / PENAWARAN LISENSI ──────────────────────────── */}
      <section className="py-20 sm:py-24 bg-neutral-950 text-white text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-mono text-xs font-semibold px-3.5 py-1.5 rounded-full bg-neutral-800 text-neutral-200 border border-neutral-700 mb-6 inline-block">
            AKTIVASI LISENSI RESMI FKACT1
          </span>

          <h2 className="heading-xl text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight text-balance">
            Tingkatkan Kecepatan &amp; Kapasitas Servis Konter Anda
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Dapatkan akses penuh ke seluruh protokol flashing multi-chipset JumperTools Pro dengan lisensi permanen hardware PC tanpa biaya langganan bulanan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href={waContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-neutral-950 bg-white hover:bg-neutral-100 shadow-lg transition-all"
            >
              <span>Hubungi Pengembang via WhatsApp</span>
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href={devMailUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-neutral-300 bg-neutral-900 border border-neutral-700 hover:border-white transition-all"
            >
              <span>Kirim Inquiry via Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER BREADCRUMB ──────────────────────────────────────────── */}
      <div className="py-8 bg-neutral-50 text-center border-t border-neutral-200/60 text-xs text-neutral-500 font-mono">
        <span>FokusKonten Desktop Software Suite</span>
        <span className="mx-2">·</span>
        <Link href="/aplikasi" className="hover:text-neutral-950 underline font-semibold">
          Katalog Produk
        </Link>
        <span className="mx-2">·</span>
        <Link href="/" className="hover:text-neutral-950 underline font-semibold">
          Beranda
        </Link>
      </div>
    </div>
  )
}
