import Link from 'next/link'
import AppVideoWalkthrough from '@/components/AppVideoWalkthrough'

export const metadata = {
  title: 'WhatsApp Lead CRM Pro — Mesin Otomasi Database Calon Pembeli & Follow-Up Penjualan',
  description: 'Software desktop Windows (.EXE) resmi karya FokusKonten. Tarik ribuan kontak tertarget dari Google Maps per kota, kirim broadcast promo massal dengan jeda acak aman, dan layani pelanggan 24 jam dengan robot AI lokal tanpa biaya sewa bulanan.',
  alternates: { canonical: 'https://fokuskonten.my.id/landpage/whatsappcrm' },
  openGraph: {
    title: 'WhatsApp Lead CRM Pro — Solusi Otomasi WhatsApp Bisnis & Follow-Up Penjualan',
    description: 'Tinggalkan cara manual simpan kontak satu per satu. Tarik ribuan nomor calon pembeli dari Google Maps, broadcast promo otomatis, dan pantau closingan penjualan di laptop sendiri.',
    images: [{ url: '/screenshots/whatsappcrm/laptop_mockup.jpg', width: 1376, height: 768, alt: 'WhatsApp Lead CRM Pro Mesin Otomasi Penjualan' }],
  },
}

export default function WhatsAppCrmDedicatedSalesPage() {
  const waOrderUrl = 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20mau%20pesan%20Kunci%20Lisensi%20Resmi%20WhatsApp%20Lead%20CRM%20Pro'
  const waConsultUrl = 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20mau%20tanya-tanya%20dulu%20tentang%20fitur%20WhatsApp%20Lead%20CRM%20Pro'
  const demoVideoUrl = 'https://www.youtube-nocookie.com/embed/hdsWgj9GdLc?rel=0'
  const officialEmail = 'admin@fokuskonten.my.id'

  // Keresahan Nyata Pebisnis — Bahasa Praktis, Tegas & Bebas Pleonasme
  const painPoints = [
    {
      num: '01',
      title: 'Jari Pegal Catat Nomor Manual',
      desc: 'Setiap malam menghabiskan berjam-jam mencatat dan menyimpan ratusan nomor calon pembeli satu per satu ke buku kontak handphone. Waktu istirahat Anda habis untuk tugas manual yang membosankan.',
    },
    {
      num: '02',
      title: 'Calon Pembeli Menghilang (PHP)',
      desc: 'Banyak calon pembeli yang bertanya lalu kabur ke toko kompetitor hanya karena balasan tindak lanjut terlambat dan catatan prospek tercecer di lembaran kertas tanpa pengingat.',
    },
    {
      num: '03',
      title: 'Ketik Promo yang Sama Berulang Kali',
      desc: 'Lelah menyalin dan mengirim teks promosi yang sama berulang-ulang ke banyak kontak sampai waktu produktif Anda untuk memikirkan strategi pengembangan usaha habis terbuang.',
    },
    {
      num: '04',
      title: 'Terjebak Biaya Langganan Bulanan',
      desc: 'Aplikasi broadcast online di luaran memungut biaya sewa ratusan ribu hingga jutaan rupiah per bulan yang terus membebani arus kas dan menggerus keuntungan bersih bisnis Anda.',
    },
  ]

  // 6 Modul Mesin Penjualan Lengkap — Sesuai MASTER_PROMPT_DAN_NARASI_PROMOSI_CRM.md
  const coreModules = [
    {
      num: '01',
      headline: 'Penarik Kontak Google Maps (Lead Scraper)',
      subHeadline: 'Kumpulkan ribuan nomor calon pembeli potensial per kota dan kategori usaha dalam 1 klik',
      features: [
        'Cukup ketik nama kota dan jenis usaha target (misal: Toko Baju Surabaya, Kuliner Bandung, Salon Medan)',
        'Otomatis mengumpulkan nama bisnis, alamat fisik, dan nomor WhatsApp calon pembeli aktif',
        'Tanpa perlu membeli database kontak luar yang mahal dan tidak jelas asal-usulnya',
        'Data tersimpan rapi dan siap dikelompokkan ke dalam daftar target promosi penjualan',
      ],
    },
    {
      num: '02',
      headline: 'Sistem Broadcast Pesan Personal Terjadwal',
      subHeadline: 'Kirim penawaran promosi massal tanpa perlu simpan nomor di buku kontak handphone',
      features: [
        'Sapaan nama otomatis personal (Halo Kak [Nama]) agar pesan terasa akrab dan dihargai',
        'Jeda waktu acak dinamis (random delay) untuk menjaga keamanan nomor dari risiko pemblokiran',
        'Mendukung lampiran gambar produk dan dokumen katalog penawaran bisnis Anda',
        'Laporan pengiriman pesan transparan: status terkirim, tertunda, atau gagal terpantau jelas',
      ],
    },
    {
      num: '03',
      headline: 'Papan Pantau Penjualan (Visual Kanban Pipeline)',
      subHeadline: 'Awasi perjalanan setiap calon pembeli dari tahap bertanya hingga pembayaran selesai',
      features: [
        'Kolom visual terstruktur: Prospek Baru, Tertarik, Negosiasi, hingga Pembayaran Selesai',
        'Geser kartu calon pembeli (drag and drop) dengan mudah mengikuti kemajuan komunikasi',
        'Catat riwayat kebutuhan dan kesepakatan harga setiap pembeli dalam satu tempat teratur',
        'Mencegah peluang closing bernilai tinggi terlewat atau terlupakan oleh tim penjualan',
      ],
    },
    {
      num: '04',
      headline: 'Asisten Robot AI Lokal 24 Jam Nonstop',
      subHeadline: 'Toko tetap melayani pembeli di malam hari tanpa biaya kuota token bulanan',
      features: [
        'Menjawab pertanyaan seputar harga, spesifikasi, dan stok barang secara ramah dan otomatis',
        'Berjalan mandiri langsung di laptop Windows Anda tanpa biaya API tambahan pihak ketiga',
        'Merespon seketika saat Anda sedang istirahat, tidur, atau mengurus operasional usaha',
        'Menghemat pengeluaran sewa staf admin layanan pelanggan hingga jutaan rupiah per bulan',
      ],
    },
    {
      num: '05',
      headline: 'Pengelola Database Kontak Excel & CSV',
      subHeadline: 'Impor dan ekspor ribuan kontak pelanggan dalam hitungan detik tanpa hambatan',
      features: [
        'Pindahkan data prospek dari file spreadsheet Excel atau CSV ke sistem CRM dalam sekejap',
        'Bebas pasang label kategori kustom (Pelanggan VIP, Grosir, Reseller, atau Prospek Baru)',
        'Ekspor daftar kontak tertarget kapan saja untuk keperluan arsip maupun promosi berkala',
        'Pembersihan nomor ganda otomatis untuk mencegah pengiriman pesan promo berulang',
      ],
    },
    {
      num: '06',
      headline: 'Lisensi Permanen Seumur Hidup (Offline Key FKACT1)',
      subHeadline: 'Cukup bayar satu kali saat membeli, software aktif selamanya tanpa iuran bulanan',
      features: [
        'Kunci lisensi kriptografi offline mandiri yang aman dan melekat pada perangkat Windows Anda',
        'Tidak bergantung pada koneksi server cloud luar untuk memverifikasi lisensi harian',
        'Bebas dari risiko tagihan perpanjangan sewa atau kenaikan tarif sewa tahunan',
        'Dilengkapi buku panduan instalasi resmi dan bimbingan langsung tim dukungan FokusKonten',
      ],
    },
  ]

  // Target Pengguna Resmi — Dual Persona Presentation Standar Emas
  const targetAudiences = [
    {
      role: 'Pebisnis Online Shop, Reseller & Brand Owner',
      badge: 'Pebisnis Online Shop, Reseller & Toko Mandiri',
      badgeColor: 'text-emerald-700',
      img: '/screenshots/whatsappcrm/seller_happy.jpg',
      alt: 'Pebisnis Online Shop WhatsApp Lead CRM Pro',
      gradient: 'from-emerald-50/80 via-emerald-50/30 to-white',
      floatingBadge: 'Otomasi Broadcast Promo & Follow-Up Terjadwal',
      floatingPill: 'Papan Kanban Closing Penjualan & Follow-Up',
      desc: 'Sangat cocok bagi pemilik toko online, reseller, dan pemilik merek yang ingin melipatgandakan closingan harian tanpa lelah mengetik dan mengirim pesan promosi satu per satu.',
      tags: [
        'Scraper Google Maps',
        'Broadcast Sekali Klik',
        'Jeda Anti-Blokir',
        'Kanban Prospek',
        'AI Balas 24 Jam',
      ],
      points: [
        'Tarik kontak calon pembeli baru dari Google Maps tanpa harus membeli database luar yang tidak akurat',
        'Kirim penawaran diskon dan katalog baru ke ratusan pelanggan lama cukup dengan satu kali klik dari laptop',
        'Toko tetap melayani pertanyaan pembeli di malam hari secara otomatis melalui asisten robot AI lokal',
        'Seluruh calon pembeli terpantau rapi di papan Kanban sehingga tidak ada lagi transaksi yang terlewat',
      ],
      metric: 'Omzet Naik 3x Lipat • Menghemat Biaya Sewa Admin Rp 2-3 Juta Setiap Bulan',
    },
    {
      role: 'Tim Sales Lapangan, Agen Properti & Pelaku UMKM',
      badge: 'Tim Penjualan, Agen Pemasaran & Distributor B2B',
      badgeColor: 'text-sky-700',
      img: '/screenshots/whatsappcrm/team_presentation.jpg',
      alt: 'Tim Sales WhatsApp Lead CRM Pro',
      gradient: 'from-sky-50/80 via-sky-50/30 to-white',
      floatingBadge: 'Manajemen Database Prospek Ribuan Kontak',
      floatingPill: 'Segmentasi Kontak Excel & Arsip Tertarget',
      desc: 'Dirancang untuk agen properti, asuransi, distributor, dan penyedia jasa yang mengelola ratusan prospek bernilai tinggi dan membutuhkan catatan tindak lanjut yang rapi.',
      tags: [
        'Tarik Kontak Kota',
        'Ekspor Impor CSV',
        'Label Segmentasi',
        'Sapaan Nama Personal',
        'Lisensi Permanen',
      ],
      points: [
        'Kelola ratusan kontak prospek tertarget berdasarkan kota dan kategori bisnis dalam satu layar monitor',
        'Pantau tahapan negosiasi setiap klien di papan penjualan agar tahu kapan waktu yang tepat untuk menghubungi kembali',
        'Sapa calon klien secara personal dengan nama lengkap mereka agar komunikasi bisnis lebih berbobot',
        'Seluruh data calon pembeli tersimpan privat di laptop sendiri, aman dari risiko kebocoran data pihak ketiga',
      ],
      metric: 'Pipeline Negosiasi Terpantau Rapi • Tidak Ada Lagi Calon Pembeli yang Bocor',
    },
  ]

  // Komparasi Nyata Solusi — Tegas, Objektif, Format Kartu Monokrom Bebas Tabel Kaku
  const comparisons = [
    {
      feature: 'Pencarian Nomor Calon Pembeli Baru',
      oldWay: 'Cari manual satu per satu di internet, lambat dan melelahkan',
      crmPro: 'Tarik ribuan nomor kontak dari Google Maps per kota dalam 1 klik',
    },
    {
      feature: 'Pengiriman Pesan Penawaran Promosi',
      oldWay: 'Ketik dan kirim pesan manual berulang kali hingga jari pegal',
      crmPro: 'Broadcast otomatis personal dengan sapaan nama dan jeda acak aman',
    },
    {
      feature: 'Penyimpanan Nomor di Buku Kontak',
      oldWay: 'Wajib simpan satu per satu ke buku kontak handphone sebelum chat',
      crmPro: 'Kirim langsung tanpa perlu menyimpan nomor di kontak handphone Anda',
    },
    {
      feature: 'Pencatatan & Tindak Lanjut Prospek',
      oldWay: 'Di buku catatan kertas atau ingatan biasa, rawan lupa dan tercecer',
      crmPro: 'Papan Kanban visual terstruktur memantau status prospek hingga transfer',
    },
    {
      feature: 'Pelayanan Chat di Luar Jam Kerja',
      oldWay: 'Chat malam hari tidak terbalas, pembeli kabur ke toko kompetitor',
      crmPro: 'Robot AI lokal menjawab otomatis seputar harga dan produk 24 jam nonstop',
    },
    {
      feature: 'Biaya Pemakaian Software',
      oldWay: 'Wajib bayar sewa langganan ratusan ribu hingga jutaan rupiah per bulan',
      crmPro: 'Beli sekali pakai selamanya, Rp 0 biaya langganan bulanan seumur hidup',
    },
    {
      feature: 'Keamanan & Privasi Database Usaha',
      oldWay: 'Data kontak tersimpan di cloud luar yang rawan bocor ke pihak lain',
      crmPro: '100% database tersimpan lokal dan privat di laptop Windows Anda sendiri',
    },
  ]

  // 3 Langkah Alur Aktivasi Lisensi Resmi
  const activationSteps = [
    {
      step: '01',
      title: 'Unduh & Pasang di Laptop Windows',
      sub: 'Instalasi Cepat',
      img: '/screenshots/whatsappcrm/steps/01_Langkah_Instalasi_CRM.png',
      alt: 'Langkah 01 Instalasi WhatsApp Lead CRM Pro',
      desc: 'Unduh berkas installer resmi WhatsApp Lead CRM Pro dan pasang di komputer atau laptop dengan sistem operasi Windows 10 atau Windows 11 (64-bit).',
      note: 'Kompatibel Windows 10 & 11 (x64)',
    },
    {
      step: '02',
      title: 'Pesan Kunci Lisensi Resmi via WhatsApp',
      sub: 'Aktivasi Lisensi',
      img: '/screenshots/whatsappcrm/steps/02_Langkah_Aktivasi_Lisensi.png',
      alt: 'Langkah 02 Pemesanan Lisensi WhatsApp Lead CRM Pro',
      desc: 'Hubungi admin resmi FokusKonten untuk memesan Kunci Lisensi Resmi Seumur Hidup. Kunci lisensi diterbitkan instan untuk laptop Anda.',
      note: 'Lisensi Resmi Melekat pada Laptop',
    },
    {
      step: '03',
      title: 'Aktivasi Lisensi & Mulai Otomasi Penjualan',
      sub: 'Mulai Otomasi',
      img: '/screenshots/whatsappcrm/steps/03_Langkah_Mulai_Otomasi.png',
      alt: 'Langkah 03 Mulai Otomasi Penjualan',
      desc: 'Masukkan kunci serial lisensi ke aplikasi, hubungkan WhatsApp Web dengan scan QR satu kali, dan nikmati otomasi mesin penjualan seketika!',
      note: 'Siap Tarik Prospek & Broadcast',
    },
  ]

  // Pertanyaan yang Sering Diajukan (FAQ)
  const faqs = [
    {
      q: 'Apakah saya yang pemula atau gaptek bisa mengoperasikannya?',
      a: 'Sangat mudah digunakan. Seluruh menu dan tombol menggunakan bahasa Indonesia yang lugas dan teratur. Kami juga menyediakan buku petunjuk bergambar lengkap serta bimbingan langsung dari tim dukungan via WhatsApp sampai Anda lancar menggunakannya.',
    },
    {
      q: 'Apakah ada biaya tambahan atau iuran langganan bulanan?',
      a: 'Sama sekali tidak ada. WhatsApp Lead CRM Pro menganut prinsip Zero Monthly Recurring Cost. Anda cukup membayar satu kali saat pembelian untuk mendapatkan lisensi resmi yang aktif seumur hidup tanpa tagihan perpanjangan.',
    },
    {
      q: 'Spesifikasi laptop atau komputer seperti apa yang dibutuhkan?',
      a: 'Aplikasi berjalan ringan pada laptop atau komputer dengan sistem operasi Windows 10 atau Windows 11 (64-bit), prosesor standar dual-core, dan RAM minimal 4 GB. Seluruh data diproses secara mandiri di perangkat Anda.',
    },
    {
      q: 'Apakah pengiriman pesan massal aman dari risiko pemblokiran nomor?',
      a: 'WhatsApp Lead CRM Pro dilengkapi fitur proteksi jeda waktu acak dinamis (random delay) yang meniru pola pengiriman manusia, serta pemanggil sapaan nama otomatis agar isi pesan tidak seragam. Kami juga menyertakan panduan praktik terbaik pengiriman promo yang aman.',
    },
    {
      q: 'Bagaimana cara menerima software dan kunci lisensi setelah transaksi?',
      a: 'Setelah transaksi terkonfirmasi, tim admin resmi FokusKonten akan langsung mengirimkan tautan unduhan berkas instalasi resmi beserta Kunci Serial Lisensi Resmi dan buku panduan PDF langsung ke nomor WhatsApp Anda.',
    },
  ]

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans antialiased">

      {/* ── BREADCRUMB & STATUS NAVIGASI RESMI ─────────────────────────── */}
      <div className="pt-24 sm:pt-28 pb-4 bg-neutral-50/70 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-500">
            <Link href="/" className="hover:text-black transition-colors">Beranda</Link>
            <span>/</span>
            <Link href="/aplikasi" className="hover:text-black transition-colors">Produk &amp; Aplikasi</Link>
            <span>/</span>
            <span className="text-neutral-900 font-semibold inline-flex items-center gap-1.5">
              <img
                src="/app-icons/whatsappcrm.png"
                alt="Logo WhatsApp Lead CRM Pro"
                className="w-4 h-4 object-contain inline-block"
              />
              <span>WhatsApp Lead CRM Pro</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-neutral-600 font-mono text-[11px] sm:text-xs">
              Lisensi Offline Permanen FKACT1 • Windows 10/11 x64
            </span>
          </div>
        </div>
      </div>

      {/* ── HERO SALES SECTION (WIDESCREEN MAX-W-7XL) ─────────────────── */}
      <section className="pt-12 sm:pt-16 pb-16 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Lencana Identitas Software Desktop */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-900 text-xs font-mono font-semibold mb-6 border border-neutral-200 shadow-xs">
            <img
              src="/app-icons/whatsappcrm.png"
              alt="Logo Resmi CRM"
              className="w-5 h-5 object-contain"
            />
            <span>Software Desktop Windows (.EXE)</span>
            <span className="text-neutral-300">•</span>
            <span>Beli Sekali Pakai Selamanya</span>
          </div>

          {/* Judul Utama Persuasif Berwibawa */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight leading-tight sm:leading-none mb-6 text-balance max-w-5xl mx-auto">
            Mesin Otomasi Database Calon Pembeli &amp; Follow-Up Penjualan <br className="hidden sm:inline" />
            Bebas Biaya Langganan Bulanan
          </h1>

          {/* Deskripsi Nilai Bisnis Nyata */}
          <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            Tinggalkan cara lama mencatat nomor manual. Tarik ribuan kontak tertarget dari Google Maps per kota, kirim broadcast promo massal dengan sapaan nama otomatis dan jeda acak aman, serta layani chat calon pembeli 24 jam nonstop di laptop sendiri.
          </p>

          {/* Dua Tombol Aksi Utama */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14 max-w-xl mx-auto">
            <a
              href={waOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-neutral-950 hover:bg-neutral-800 shadow-md hover:shadow-lg transition-all duration-200 group"
            >
              <span>Pesan Kunci Lisensi Resmi</span>
              <svg className="w-4 h-4 text-white shrink-0 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href={waConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm sm:text-base text-neutral-800 bg-neutral-100/90 border border-neutral-300 hover:border-black hover:bg-neutral-100 shadow-xs transition-all duration-200"
            >
              <svg className="w-5 h-5 text-neutral-900 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Konsultasi Fitur WhatsApp</span>
            </a>
          </div>

          {/* Panggung Visual Laptop Mockup Centerpiece */}
          <div className="relative rounded-3xl overflow-hidden border border-neutral-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18)] max-w-6xl mx-auto mb-12 bg-neutral-900 group">
            {/* Lencana Status Mesin Mengambang */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-neutral-900 text-xs font-mono font-semibold shadow-md backdrop-blur-sm border border-neutral-200/80 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Mesin Otomasi Aktif • Jeda Waktu Acak Protektif</span>
              </span>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-neutral-950/80 text-white text-[11px] font-mono tracking-wider shadow-sm backdrop-blur-sm">
                100% Database Lokal di Laptop
              </span>
            </div>

            <img
              src="/screenshots/whatsappcrm/laptop_mockup.jpg"
              alt="WhatsApp Lead CRM Pro Laptop Mockup"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>

          {/* 4 Stats Grid Berwibawa */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
            <div className="p-3 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white font-mono font-bold text-sm flex items-center justify-center mb-3">
                01
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-mono">100% Privat</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Data Tersimpan di Laptop Sendiri</div>
            </div>

            <div className="p-3 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white font-mono font-bold text-sm flex items-center justify-center mb-3">
                02
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-mono">3x Lipat</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Peluang Closing Lebih Cepat</div>
            </div>

            <div className="p-3 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white font-mono font-bold text-sm flex items-center justify-center mb-3">
                03
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-mono">Rp 0 Iuran</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Tanpa Biaya Langganan Bulanan</div>
            </div>

            <div className="p-3 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white font-mono font-bold text-sm flex items-center justify-center mb-3">
                04
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-mono">Permanen</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Lisensi Seumur Hidup Melekat di PC</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION: MASALAH OPERASIONAL PEBISNIS (MAX-W-6XL) ──────────── */}
      <section className="py-20 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
              Tantangan Operasional
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-4">
              4 Masalah yang Sering Membuat Penjualan Bocor
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Jika proses pencarian kontak dan tindak lanjut calon pembeli masih dijalankan manual, waktu berharga Anda habis untuk hal teknis yang menguras tenaga:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((item, i) => (
              <div
                key={i}
                className="p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between hover:border-neutral-400 transition-colors"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-mono font-bold text-xs mb-5">
                    {item.num}
                  </div>
                  <h3 className="font-bold text-base text-neutral-950 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: TARGET PENGGUNA RESMI (DUAL PERSONA LAPANG MAX-W-7XL) */}
      <section className="py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
              Target Pengguna
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 mb-4 tracking-tight">
              Sangat Tepat Digunakan Untuk Siapa Saja?
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Dirancang khusus untuk mendukung percepatan omzet pengusaha mandiri, tim pemasaran, dan pelaku bisnis di seluruh Indonesia:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {targetAudiences.map((aud, i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden border border-neutral-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.07)] bg-white flex flex-col justify-between hover:shadow-2xl hover:border-neutral-400 transition-all duration-300 group"
              >
                {/* Visual Model Persona Proporsional Tinggi Menonjol */}
                <div className={`bg-gradient-to-b ${aud.gradient} pt-8 px-6 flex justify-center items-end border-b border-neutral-100 relative overflow-hidden h-[420px] sm:h-[480px] lg:h-[500px]`}>
                  {/* Floating Status Badge di Atas */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-neutral-900 text-xs font-mono font-semibold shadow-md backdrop-blur-sm border border-neutral-200/80 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-emerald-500' : 'bg-sky-500'} animate-pulse`}></span>
                      <span>{aud.floatingBadge}</span>
                    </span>
                  </div>

                  {/* Foto Model Persona */}
                  <img
                    src={aud.img}
                    alt={aud.alt}
                    className="h-full w-full object-cover object-top drop-shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  {/* Floating Pill Kategori di Bawah Foto */}
                  <div className="absolute bottom-3 left-4 right-4 text-center pointer-events-none z-10">
                    <span className="px-3.5 py-1 rounded-full bg-neutral-950/80 text-white text-[11px] font-mono tracking-wider shadow-sm backdrop-blur-sm">
                      {aud.floatingPill}
                    </span>
                  </div>
                </div>

                {/* Deskripsi, Workflow Tags & Poin Peran Komprehensif */}
                <div className="p-7 sm:p-9 flex-1 flex flex-col justify-between">
                  <div>
                    <div className={`text-xs font-mono font-bold uppercase tracking-wider mb-2.5 ${aud.badgeColor}`}>
                      {aud.badge}
                    </div>
                    <h3 className="font-bold text-neutral-950 text-xl sm:text-2xl mb-3 leading-snug">
                      {aud.role}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5">
                      {aud.desc}
                    </p>

                    {/* Alur Kerja & Modul Terkait (Workflow Tags) */}
                    <div className="mb-6">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2">
                        Alur Kerja &amp; Kapabilitas Harian:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {aud.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 text-[11px] font-mono font-medium border border-neutral-200/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Poin Tanggung Jawab Operasional */}
                    <div className="pt-5 border-t border-neutral-100 space-y-2.5 mb-6">
                      {aud.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                          <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Ringkasan Hasil Nyata */}
                    <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs font-mono text-neutral-700 flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{aud.metric}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: 6 MODUL MESIN PENJUALAN (MAX-W-7XL) ───────────────── */}
      <section className="py-24 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
              Mesin Penjualan Lengkap
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 mb-4 tracking-tight">
              6 Modul Otomasi Terintegrasi dalam 1 Software
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Seluruh kebutuhan mulai dari akuisisi prospek baru, broadcast promo, hingga pengawalan closingan tersedia lengkap di laptop Anda:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {coreModules.map((m) => (
              <div
                key={m.num}
                className="rounded-3xl border border-neutral-200/90 bg-white p-7 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:border-neutral-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                      MODUL {m.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-900 font-mono font-bold text-xs flex items-center justify-center border border-neutral-200">
                      {m.num}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-neutral-950 leading-snug mb-2 group-hover:text-black transition-colors">
                    {m.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 pb-4 border-b border-neutral-100">
                    {m.subHeadline}
                  </p>

                  <div className="space-y-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-1">
                      Kemampuan Utama:
                    </span>
                    {m.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 shrink-0 mt-2"></span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: VIDEO DEMONSTRASI BEDAH FITUR (MAX-W-6XL) ─────────── */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
            Demonstrasi Produk
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Tonton Video Demo &amp; Cara Kerja WhatsApp Lead CRM Pro
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Saksikan bagaimana software ini menarik ribuan kontak bisnis dari Google Maps, menyusun alur penjualan di papan Kanban, dan mengirim broadcast promo massal secara mandiri:
          </p>

          <div className="mb-10 max-w-4xl mx-auto">
            <AppVideoWalkthrough
              video={demoVideoUrl}
              name="WhatsApp Lead CRM Pro"
              isDesktop={true}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-neutral-950 hover:bg-neutral-800 shadow-sm transition-all"
            >
              Pesan Kunci Lisensi via WhatsApp
            </a>
            <a
              href={waConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-neutral-800 bg-neutral-100 border border-neutral-300 hover:border-black transition-all"
            >
              Konsultasi WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION: KOMPARASI CARA LAMA VS CRM PRO (MAX-W-6XL) ────────── */}
      <section className="py-20 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
              Perbandingan Nyata
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 mb-4 tracking-tight">
              Bandingkan: Cara Manual Lama vs WhatsApp Lead CRM Pro
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Ketahui alasan mengapa beralih ke software desktop otomatis jauh lebih menghemat waktu, mengamankan data pelanggan, dan melipatgandakan closingan toko Anda:
            </p>
          </div>

          <div className="space-y-4">
            {comparisons.map((item, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-neutral-400 transition-colors"
              >
                <span className="font-bold text-neutral-950 text-sm sm:w-1/3">
                  {item.feature}
                </span>
                <div className="flex-1 text-xs sm:text-sm text-neutral-400 line-through sm:pr-4">
                  {item.oldWay}
                </div>
                <div className="flex-1 text-xs sm:text-sm font-semibold text-neutral-950 flex items-center gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{item.crmPro}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: 3 LANGKAH AKTIVASI LISENSI RESMI (MAX-W-7XL) ──────── */}
      <section className="py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
            Alur Aktivasi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 mb-4 tracking-tight">
            3 Langkah Mudah Memulai Otomasi Penjualan Anda
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto mb-14 leading-relaxed">
            Tanpa prosedur teknis yang rumit. Ikuti langkah sederhana ini untuk mengubah laptop Windows Anda menjadi mesin penjualan otomatis hari ini:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
            {activationSteps.map((s, i) => (
              <div
                key={i}
                className={`p-7 rounded-3xl border ${i === 1 ? 'border-2 border-neutral-950 bg-white shadow-xl' : 'border-neutral-200/90 bg-neutral-50/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]'} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-mono font-extrabold text-neutral-950 block">
                        {s.step}
                      </span>
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
                        {s.sub}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-neutral-200/80 mb-5 bg-white shadow-xs">
                    <img
                      src={s.img}
                      alt={s.alt}
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <h3 className="font-bold text-lg text-neutral-950 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200/60 mt-2">
                  <span className="text-[11px] font-mono text-neutral-700 font-medium">
                    ✓ {s.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: PENAWARAN RESMI & PEMESANAN LISENSI (MAX-W-6XL) ────── */}
      <section className="py-20 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-300 shadow-xl text-center">
            
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-50 border border-neutral-200/90 shadow-sm flex items-center justify-center p-2.5">
                <img
                  src="/app-icons/whatsappcrm.png"
                  alt="Logo Resmi WhatsApp Lead CRM Pro"
                  className="max-w-full max-h-full object-contain drop-shadow-sm"
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-mono font-bold bg-neutral-950 text-white mb-6 uppercase tracking-wider">
              <span>Penawaran Lisensi Resmi Seumur Hidup</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 mb-4 tracking-tight">
              Miliki WhatsApp Lead CRM Pro Hari Ini
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Investasi paling efisien dan cerdas untuk kemajuan bisnis Anda. Cukup satu kali bayar saat membeli, gunakan selamanya tanpa iuran bulanan.
            </p>

            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-50 border border-neutral-200 max-w-lg mx-auto mb-8 text-left space-y-3.5 shadow-xs">
              <div className="flex items-center gap-3 text-sm font-semibold text-neutral-900">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Kunci Lisensi Resmi Permanen Seumur Hidup (1 Perangkat Windows)</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-neutral-900">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Akses Penuh Fitur: Scraper Maps, Broadcast Personal, Kanban &amp; AI</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-neutral-900">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Bebas Biaya Kuota Token &amp; Rp 0 Iuran Langganan Bulanan</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-neutral-900">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Buku Panduan PDF Resmi &amp; Bimbingan Tim Dukungan WhatsApp</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <a
                href={waOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl font-bold text-base text-white bg-neutral-950 hover:bg-neutral-800 shadow-md transition-all duration-200 group"
              >
                <span>Pesan Kunci Lisensi via WhatsApp</span>
                <svg className="w-5 h-5 text-white shrink-0 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            <p className="text-xs font-mono text-neutral-500">
              Layanan Bantuan Resmi: WhatsApp <b>+62 851-8301-1318</b> • Surel: <b>{officialEmail}</b>
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION: TANYA JAWAB UMUM (FAQ) (MAX-W-6XL) ─────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-2 block">
              Pusat Informasi
            </span>
            <h2 className="text-3xl font-extrabold text-neutral-950 tracking-tight">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-neutral-50/80 border border-neutral-200/90 shadow-xs"
              >
                <h3 className="text-base font-bold text-neutral-950 mb-2.5">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
