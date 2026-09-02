import Link from 'next/link'

export const metadata = {
  title: 'WhatsApp Lead CRM Pro — Mesin Otomasi Database Prospek & Follow-Up Penjualan',
  description: 'Software desktop Windows (.EXE) resmi untuk mempermudah pebisnis, UMKM, dan olshop menarik ribuan nomor calon pembeli dari Google Maps, broadcast promo otomatis, dan balas chat 24 jam nonstop tanpa biaya langganan bulanan.',
  alternates: { canonical: 'https://fokuskonten.my.id/landpage/whatsappcrm' },
  openGraph: {
    title: 'WhatsApp Lead CRM Pro — Solusi Otomasi WhatsApp Bisnis No. 1',
    description: 'Capek simpan nomor calon pembeli manual? Gunakan WhatsApp Lead CRM Pro untuk kelola prospek, broadcast promo otomatis, dan banjir orderan tiap hari!',
    images: [{ url: '/screenshots/whatsappcrm/promo_cover_female.jpg', width: 1200, height: 630, alt: 'WhatsApp Lead CRM Pro' }],
  },
}

export default function WhatsAppCrmDedicatedSalesPage() {
  const waOrderUrl = 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20mau%20pesan%20Kunci%20Lisensi%20Resmi%20WhatsApp%20Lead%20CRM%20Pro%20(Promo%20Seumur%20Hidup)'
  const waConsultUrl = 'https://wa.me/6285183011318?text=Halo%20FokusKonten,%20saya%20mau%20tanya-tanya%20dulu%20tentang%20fitur%20WhatsApp%20Lead%20CRM%20Pro'
  const demoVideoUrl = 'https://www.youtube.com/embed/hdsWgj9GdLc'

  const painPoints = [
    {
      num: '01',
      title: 'Jari Keriting Simpan Nomor Manual',
      desc: 'Menghabiskan waktu berjam-jam setiap hari hanya untuk mencatat dan menyimpan ratusan nomor calon pembeli satu per satu ke kontak HP.',
    },
    {
      num: '02',
      title: 'Sering Lupa Follow-Up Pembeli',
      desc: 'Banyak calon pembeli yang cuma bertanya lalu menghilang (PHP) gara-gara terlambat Anda hubungi kembali.',
    },
    {
      num: '03',
      title: 'Kirim Pesan Promo Satu Per Satu',
      desc: 'Capek mengetik dan mengirim kalimat promosi yang sama berulang-ulang sampai waktu produktif jualan Anda habis terbuang.',
    },
    {
      num: '04',
      title: 'Aplikasi Lain Ada Iuran Bulanan',
      desc: 'Aplikasi broadcast di luaran meminta biaya langganan ratusan ribu hingga jutaan rupiah per bulan yang terus membebani bisnis.',
    },
  ]

  const modules = [
    {
      title: '1. Scraper Kontak Prospek Google Maps',
      desc: 'Tinggal ketik nama kota dan jenis usaha target (misal: Toko Baju Surabaya, Kuliner Bandung, Salon Medan), sistem otomatis mengumpulkan ribuan nomor WhatsApp calon pembeli siap promosi!',
    },
    {
      title: '2. Broadcast Promo Massal Sekali Klik',
      desc: 'Kirim penawaran produk ke ratusan nomor sekaligus tanpa perlu simpan nomor di kontak HP. Dilengkapi pemanggil nama otomatis (Halo Kak [Nama]) dan jeda waktu acak aman anti-blokir.',
    },
    {
      title: '3. Papan Pantau Pembeli (Kanban Pipeline)',
      desc: 'Ketahui secara visual tahapan setiap pembeli: siapa yang baru tanya, siapa yang sedang mikir-mikir, dan siapa yang sudah transfer agar tidak ada closingan yang bocor.',
    },
    {
      title: '4. Robot AI Pintar Balas Chat 24 Jam',
      desc: 'Toko online Anda tetap melayani pembeli meski Anda sedang tidur atau istirahat. Robot AI lokal menjawab pertanyaan harga dan spesifikasi produk secara ramah dan otomatis.',
    },
    {
      title: '5. Ekspor & Impor Database Excel / CSV',
      desc: 'Pindahkan ribuan data kontak dari file spreadsheet ke dalam sistem CRM dalam hitungan detik. Kelola label kategori pelanggan untuk promosi yang tepat sasaran.',
    },
    {
      title: '6. Sekali Bayar, Pakai Selamanya (Tanpa Iuran)',
      desc: 'Bebas dari biaya langganan bulanan yang bikin pusing. Cukup bayar satu kali saat membeli, software dan seluruh fiturnya jadi milik Anda seumur hidup!',
    },
  ]

  const comparison = [
    {
      feature: 'Pencarian Nomor Calon Pembeli',
      oldWay: 'Cari manual satu per satu, capek dan lambat',
      crmPro: 'Tarik ribuan nomor dari Google Maps dalam 1 klik',
    },
    {
      feature: 'Pengiriman Pesan Promosi',
      oldWay: 'Ketik dan kirim manual berulang kali',
      crmPro: 'Broadcast otomatis personal dengan jeda aman',
    },
    {
      feature: 'Pencatatan & Follow-Up Prospek',
      oldWay: 'Di catatan biasa, sering lupa dan hilang',
      crmPro: 'Papan Kanban visual rapi, jadwal terpantau jelas',
    },
    {
      feature: 'Pelayanan Chat di Luar Jam Kerja',
      oldWay: 'Chat malam tidak terbalas, pembeli kabur',
      crmPro: 'Robot AI lokal menjawab otomatis 24 jam nonstop',
    },
    {
      feature: 'Biaya Pemakaian Software',
      oldWay: 'Bayar sewa langganan mahal tiap bulan',
      crmPro: 'Sekali beli aktif permanen seumur hidup (Rp 0 iuran)',
    },
  ]

  const faqs = [
    {
      q: 'Apakah saya yang pemula / gaptek bisa menggunakannya?',
      a: 'Sangat bisa. Tampilan aplikasi dirancang simpel dengan bahasa Indonesia yang jelas. Disediakan panduan lengkap dan tim dukungan kami siap membantu via WhatsApp sampai lancar.',
    },
    {
      q: 'Apakah ada biaya tambahan atau langganan tiap bulan?',
      a: 'Tidak ada. Sekali Anda membeli lisensi resmi, software WhatsApp Lead CRM Pro aktif seumur hidup (Lifetime License) tanpa biaya bulanan.',
    },
    {
      q: 'Komputer atau laptop seperti apa yang dibutuhkan?',
      a: 'Aplikasi berjalan ringan pada laptop atau komputer dengan sistem operasi Windows 10 atau Windows 11 (64-bit) dengan RAM minimal 4 GB.',
    },
    {
      q: 'Bagaimana cara menerima software setelah pembayaran?',
      a: 'Setelah pembayaran terkonfirmasi, Admin resmi kami akan langsung mengirimkan link download resmi beserta Kunci Serial Lisensi Resmi Anda melalui WhatsApp.',
    },
  ]

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans antialiased">

      {/* ── HERO SALES SECTION ─────────────────────────────────────────── */}
      <section className="pt-28 pb-16 bg-white border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold mb-6 border border-neutral-200">
            <span>Software Desktop Windows</span>
            <span className="text-neutral-300">•</span>
            <span>Sekali Bayar Seumur Hidup</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight leading-tight sm:leading-none mb-6">
            Capek Ngetik Chat Satu-Satu? <br />
            Biar WhatsApp Lead CRM Pro yang Kerjakan Otomatis!
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
            Tarik ribuan nomor calon pembeli dari Google Maps, kirim pesan promo massal sekali klik, dan lipatgandakan closingan toko Anda tanpa perlu sewa admin mahal.
          </p>

          {/* CTA Buttons Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href={waOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all duration-200"
            >
              Pesan Kunci Lisensi via WhatsApp
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href={waConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-base text-neutral-800 bg-white border border-neutral-300 hover:border-neutral-900 transition-all"
            >
              Konsultasi WhatsApp
            </a>
          </div>

          {/* Dual Banner Covers Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-50">
              <img
                src="/screenshots/whatsappcrm/promo_cover_female.jpg"
                alt="WhatsApp Lead CRM Pro Banner Resmi"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-50">
              <img
                src="/screenshots/whatsappcrm/promo_cover.jpg"
                alt="Banjir Orderan WhatsApp CRM Pro"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* 4 Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950">100%</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Data di PC Sendiri</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950">3x Lipat</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Peluang Closing</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950">Rp 0</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Tanpa Iuran Bulanan</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950">Lifetime</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Aktif Seumur Hidup</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION: MASALAH PEBISNIS ──────────────────────────────────── */}
      <section className="py-16 bg-neutral-50 border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
              Keresahan Pebisnis &amp; Olshop
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 mb-3">
              4 Masalah yang Sering Bikin Closingan Bocor
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base">
              Jika Anda masih melakukan proses penjualan secara manual, banyak waktu dan potensi pembeli yang terbuang:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {painPoints.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center font-bold text-xs text-neutral-800 mb-4">
                    {item.num}
                  </div>
                  <h3 className="font-bold text-base text-neutral-950 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: SOLUSI DENGAN MOCKUP LAPTOP ───────────────────────── */}
      <section className="py-16 bg-white border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-2">
                Solusi Praktis &amp; Efisien
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight leading-tight mb-4">
                Ubah Laptop Anda Menjadi Mesin Penjualan Otomatis 24 Jam Nonstop
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                Tidak perlu sewa admin mahal atau pusing ngetik berjam-jam. Dengan WhatsApp Lead CRM Pro, seluruh database calon pembeli terkelola rapi dan pesan promosi terkirim otomatis dengan satu klik.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                  <div className="text-sm font-medium text-neutral-800">Tarik nomor calon pembeli dari Google Maps berdasarkan kota &amp; kategori bisnis.</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                  <div className="text-sm font-medium text-neutral-800">Kirim broadcast pesan personal dengan jeda waktu acak anti-blokir.</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                  <div className="text-sm font-medium text-neutral-800">Robot AI lokal cerdas siap menjawab pertanyaan pembeli kapan saja.</div>
                </div>
              </div>

              <a
                href={waOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-neutral-950 hover:bg-neutral-800 transition-all"
              >
                Miliki Software Sekarang
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md bg-neutral-50">
              <img
                src="/screenshots/whatsappcrm/laptop_mockup.jpg"
                alt="Mockup Layar WhatsApp Lead CRM Pro"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: VIDEO DEMO ───────────────────────────────────────── */}
      <section className="py-16 bg-neutral-50 border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
            Demonstrasi Produk
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-3">
            Tonton Video Demo &amp; Cara Kerja WhatsApp Lead CRM Pro
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Lihat langsung kemudahan menarik kontak prospek, menyusun pipeline Kanban, dan mengirim broadcast otomatis:
          </p>

          <div className="w-full rounded-2xl overflow-hidden border border-neutral-200 shadow-md bg-black aspect-video mb-8">
            <iframe
              src={demoVideoUrl}
              title="WhatsApp Lead CRM Pro Video Demo"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div>
            <a
              href={waOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all"
            >
              Order Lisensi Resmi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION: 6 MODUL FITUR ────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
              Modul Lengkap
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-3">
              Semua Fitur yang Anda Butuhkan dalam 1 Aplikasi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((m, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:border-neutral-900 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-base text-neutral-950 mb-2">
                    {m.title}
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: TARGET PENGGUNA ──────────────────────────────────── */}
      <section className="py-16 bg-neutral-50 border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 mb-2">
              Cocok Digunakan oleh Siapa Saja?
            </h2>
            <p className="text-neutral-600 text-sm">Dirancang fleksibel untuk berbagai lini bisnis:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm bg-white">
              <img
                src="/screenshots/whatsappcrm/seller_happy.jpg"
                alt="Pebisnis Online Shop"
                className="w-full h-auto object-cover"
              />
              <div className="p-6">
                <h4 className="font-bold text-neutral-950 text-base mb-1">Pebisnis Olshop &amp; Reseller</h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Cocok untuk jualan fashion, kecantikan, kuliner, dan produk digital yang ingin closingan mengalir setiap hari tanpa repot.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm bg-white">
              <img
                src="/screenshots/whatsappcrm/team_presentation.jpg"
                alt="Tim Sales & Marketing"
                className="w-full h-auto object-cover"
              />
              <div className="p-6">
                <h4 className="font-bold text-neutral-950 text-base mb-1">Tim Sales &amp; Agen Marketing</h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Pas untuk agen asuransi, agen properti, distributor, dan jasa b2b yang butuh mengelola ratusan kontak prospek secara rapi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: TABEL PERBANDINGAN ────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 mb-2">
              Bandingkan: Cara Lama vs WhatsApp CRM Pro
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-neutral-950 text-white">
                  <th className="p-4 font-bold">Aktivitas</th>
                  <th className="p-4 font-normal text-neutral-400">Cara Lama (Manual)</th>
                  <th className="p-4 font-bold text-emerald-400">WhatsApp Lead CRM Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {comparison.map((row, i) => (
                  <tr key={i} className="hover:bg-neutral-50/60">
                    <td className="p-4 font-bold text-neutral-900">{row.feature}</td>
                    <td className="p-4 text-neutral-500">{row.oldWay}</td>
                    <td className="p-4 font-semibold text-emerald-700 bg-emerald-50/30">{row.crmPro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SECTION: 3 LANGKAH MUDAH ───────────────────────────────────── */}
      <section className="py-16 bg-neutral-50 border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 mb-8">
            Cara Pakai Cuma 3 Langkah Mudah:
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white font-bold text-sm flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="font-bold text-base text-neutral-950 mb-2">Buka Aplikasi di Laptop</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">Jalankan aplikasi di laptop/komputer Windows Anda dan scan QR WhatsApp Web.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white font-bold text-sm flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="font-bold text-base text-neutral-950 mb-2">Tarik / Impor Kontak</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">Tarik nomor dari Google Maps per kota atau impor daftar nomor dari file Excel.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white font-bold text-sm flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="font-bold text-base text-neutral-950 mb-2">Klik Mulai &amp; Kirim Promo</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">Kirim promo otomatis sekali klik dan nikmati closingan yang terus berdatangan!</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: PENAWARAN SPESIAL & ORDER WA ──────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-50 border border-neutral-300 shadow-lg text-center">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-neutral-950 text-white inline-block mb-4 uppercase tracking-wider">
              Penawaran Lisensi Resmi Seumur Hidup
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 mb-3">
              Miliki WhatsApp Lead CRM Pro Hari Ini
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto mb-8">
              Investasi paling efisien untuk bisnis Anda. Cukup sekali bayar, pakai selamanya tanpa tagihan bulanan.
            </p>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 max-w-md mx-auto mb-8 text-left space-y-3 shadow-xs">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-neutral-900">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Lisensi Resmi Permanen Seumur Hidup (1 PC)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-neutral-900">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Akses Fitur Lengkap Scraper Maps, Broadcast &amp; AI</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-neutral-900">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Bebas Biaya Kuota &amp; Langganan Bulanan Selamanya</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-neutral-900">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Buku Panduan Lengkap &amp; Bimbingan VIP Support WA</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl font-bold text-base text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all duration-200"
              >
                Pesan Kunci Lisensi via WhatsApp
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-neutral-500 mt-4">
              Layanan Bantuan Resmi: WhatsApp <b>+62 851-8301-1318</b> • Email: <b>support@fokuskonten.com</b>
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION: FAQ ───────────────────────────────────────────────── */}
      <section className="py-16 bg-neutral-50 border-t border-neutral-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 text-center mb-8">
            Pertanyaan yang Sering Ditanyakan (FAQ)
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs">
                <h3 className="text-base font-bold text-neutral-950 mb-2">{faq.q}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
