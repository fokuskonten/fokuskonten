import Link from 'next/link'

export const metadata = {
  title: 'Layanan Pembuatan Aplikasi Android',
  description: 'FokusKonten melayani jasa pembuatan aplikasi Android profesional untuk apotek, toko retail, UMKM, dan bisnis kustom. Konsultasi langsung via WhatsApp.',
  alternates: { canonical: 'https://fokuskonten.my.id/layanan' },
}

const services = [
  {
    title: 'Aplikasi Kasir & POS Bisnis',
    desc: 'Pembuatan aplikasi kasir toko, apotek, retail, dan kafe yang bekerja 100% offline tanpa kuota internet. Dilengkapi cetak struk Bluetooth Thermal, scan barcode kamera cepat, hitung diskon dan pajak otomatis, serta rekap kas harian.',
    icon: (
      <svg className="w-6 h-6 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Aplikasi Inventaris & Manajemen Stok',
    desc: 'Sistem kendali inventori cerdas dengan deteksi kadaluarsa obat/produk berbasis tanggal edar (FEFO/FIFO), pelacakan mutasi stok gudang, batas peringatan stok menipis otomatis, multi-satuan bertingkat, serta laporan laba rugi harian yang rapi dan instan.',
    icon: (
      <svg className="w-6 h-6 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: 'Aplikasi Android & Software Kustom',
    desc: 'Pembuatan aplikasi khusus yang disesuaikan dengan alur kerja bisnis Anda. Mulai dari otomasi CRM prospek, aplikasi web atau desktop, hingga alat bantu operasional toko yang cepat dan praktis.',
    icon: (
      <svg className="w-6 h-6 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Bantuan Publikasi & Standar Google Play',
    desc: 'Pendampingan teknis menyeluruh dari tahap audit pra-rilis, kepatuhan kebijakan Google Play Console termutakhir (Target SDK 36, Android 15/16), penandatanganan Keystore kriptografis .jks resmi, penyusunan Kebijakan Privasi standar Play Store, hingga rilis siap unduh.',
    icon: (
      <svg className="w-6 h-6 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

const steps = [
  {
    step: '01',
    title: 'Konsultasi & Audit Kebutuhan',
    desc: 'Sesi pemetaan alur kerja operasional usaha Anda, analisis kebutuhan modul kasir/inventori, perancangan sistem kerja tanpa internet, serta estimasi jadwal pengerjaan yang terukur dan transparan.'
  },
  {
    step: '02',
    title: 'Perancangan Skema & UI/UX',
    desc: 'Penyusunan struktur database lokal yang rapi, pemodelan data toko, serta perancangan tampilan antarmuka (UI/UX) yang bersih, cepat, dan mudah dipahami staf kasir.'
  },
  {
    step: '03',
    title: 'Pengembangan Native & Uji Coba',
    desc: 'Pengkodean aplikasi menggunakan standar Kotlin modern, integrasi protokol printer Bluetooth Thermal, proteksi integritas transaksi kasir, serta uji kestabilan ketat pada berbagai spesifikasi perangkat Android fisik nyata.'
  },
  {
    step: '04',
    title: 'Penerbitan Lisensi & Serah Terima',
    desc: 'Kompilasi berkas rilis final siap pasang (APK/AAB Play Store), penerbitan lisensi hardware terenkripsi, penyerahan panduan operasional langkah-demi-langkah, dan jaminan pendampingan purna jual resmi FokusKonten.'
  },
]

export default function ServicesPage() {
  return (
    <>
      <section className="pt-28 sm:pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-page">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 mb-6 font-mono">
            <Link href="/" className="hover:text-neutral-900 transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">Layanan Software</span>
          </nav>

          {/* Header */}
          <div className="mb-14">
            <span className="label-brand mb-3 inline-block">Layanan Pengembangan Software</span>
            <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-4 text-balance">
              Jasa Pembuatan Software &amp; Aplikasi Android{' '}
              <span className="text-gradient-brand">Profesional &amp; Andal</span>
            </h1>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl">
              Tingkatkan efisiensi dan kedaulatan bisnis Anda dengan aplikasi Android, POS kasir, serta sistem desktop yang cepat, aman, dan dirancang khusus untuk operasional Anda.
            </p>
          </div>

          {/* 4-Column Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-20">
            {services.map((item, i) => (
              <div key={i} className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-7 shadow-card hover:shadow-xl hover:border-neutral-400 hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="font-display font-semibold text-base sm:text-lg text-neutral-900 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Transparent Workflow Steps (Full Width) */}
          <div className="w-full mb-20">
            <div className="mb-10">
              <span className="label-brand mb-3 inline-block">Alur Pengerjaan</span>
              <h2 className="heading-xl text-2xl sm:text-3xl text-neutral-900">Proses Pengerjaan Transparan</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((s) => (
                <div key={s.step} className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <span className="w-11 h-11 rounded-2xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center font-display font-black text-base sm:text-lg text-neutral-950 shrink-0 font-mono tracking-tight shadow-xs">
                        {s.step}
                      </span>
                      <h4 className="font-display font-bold text-base sm:text-lg text-neutral-900 leading-snug">
                        {s.title}
                      </h4>
                    </div>
                    <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full-Width CTA Banner */}
          <div className="rounded-3xl bg-neutral-950 p-8 sm:p-14 text-center text-white w-full shadow-2xl border border-neutral-800">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-display font-semibold bg-white text-neutral-950 shadow-sm mb-4">
              Konsultasi Langsung
            </span>
            <h3 className="heading-xl text-2xl sm:text-4xl mb-3 text-balance">
              Siap Mengembangkan Solusi Software untuk Usaha Anda?
            </h3>
            <p className="text-white text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed font-normal">
              Diskusikan alur transaksi, kebutuhan fitur, dan estimasi waktu pengerjaan langsung via WhatsApp bersama software engineer FokusKonten.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/6285183011318?text=${encodeURIComponent('Halo FokusKonten,\n\nSaya ingin konsultasi jasa pembuatan software / aplikasi Android kustom untuk kebutuhan usaha saya.\nMohon info estimasi alur dan proses kerjanya.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-display font-semibold text-sm bg-white text-neutral-950 hover:bg-neutral-100 transition-all shadow-lg"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Konsultasi WhatsApp Sekarang
              </a>
              <Link
                href="/aplikasi"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-display font-semibold text-sm bg-white text-neutral-950 hover:bg-neutral-100 transition-all shadow-lg"
              >
                Lihat Contoh Aplikasi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
