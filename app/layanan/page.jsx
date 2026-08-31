import Link from 'next/link'

export const metadata = {
  title: 'Layanan Pembuatan Aplikasi Android',
  description: 'FokusKonten melayani jasa pembuatan aplikasi Android profesional untuk apotek, toko retail, UMKM, dan bisnis kustom. Konsultasi langsung via WhatsApp.',
  alternates: { canonical: 'https://fokuskonten.my.id/layanan' },
}

const services = [
  {
    title: 'Aplikasi Kasir & POS Bisnis',
    desc: 'Pembuatan software kasir untuk apotek, toko kelontong, retail, dan kafe. Dilengkapi fitur cetak struk Bluetooth thermal, scanner barcode, dan manajemen transaksi offline-first.',
    icon: (
      <svg className="w-6 h-6 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Aplikasi Inventaris & Stok',
    desc: 'Sistem pencatatan barang masuk dan keluar, deteksi kadaluarsa obat/produk, peringatan stok menipis, serta rekap laba rugi otomatis.',
    icon: (
      <svg className="w-6 h-6 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: 'Aplikasi Android Kustom',
    desc: 'Pengembangan aplikasi Android dari awal (scratch) sesuai kebutuhan operasional spesifik perusahaan, organisasi, atau personal branding Anda.',
    icon: (
      <svg className="w-6 h-6 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Bantuan Publikasi Google Play',
    desc: 'Pendampingan dan penyiapan berkas rilis (Target SDK 36, App Bundle AAB, aset grafis, dan Kebijakan Privasi) hingga aplikasi resmi tayang di Google Play Store.',
    icon: (
      <svg className="w-6 h-6 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

const steps = [
  { step: '01', title: 'Konsultasi Kebutuhan', desc: 'Diskusikan fitur, alur kerja, dan target operasional aplikasi Anda secara langsung via WhatsApp.' },
  { step: '02', title: 'Perancangan & UI/UX', desc: 'Penyusunan struktur database, alur transaksi, dan desain antarmuka pengguna yang ergonomis.' },
  { step: '03', title: 'Pengembangan & Uji Coba', desc: 'Pengkodean aplikasi menggunakan standar Kotlin modern serta pengujian kestabilan di berbagai tipe perangkat.' },
  { step: '04', title: 'Serah Terima & Rilis', desc: 'Pemasangan aplikasi di perangkat Anda atau publikasi resmi ke Google Play Store siap pakai.' },
]

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="label-brand mb-4 inline-block">Layanan Pengembangan Software</span>
            <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-6 text-balance">
              Jasa Pembuatan Aplikasi Android{' '}
              <span className="text-gradient-brand">Profesional &amp; Andal</span>
            </h1>
            <p className="text-neutral-600 text-base leading-relaxed max-w-2xl mx-auto">
              Tingkatkan efisiensi bisnis Anda dengan aplikasi Android yang cepat, mudah digunakan, dan dirancang khusus untuk alur kerja operasional Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
            {services.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-200/80 p-7 shadow-card hover:shadow-lg hover:border-neutral-400 transition-all">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold text-lg text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mb-20">
            <div className="text-center mb-12">
              <span className="label-brand mb-3 inline-block">Alur Pengerjaan</span>
              <h2 className="heading-xl text-2xl sm:text-3xl text-neutral-900">Proses Pengerjaan Transparan</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((s) => (
                <div key={s.step} className="bg-white rounded-2xl border border-neutral-200/80 p-6">
                  <span className="font-display font-bold text-2xl text-neutral-950 block mb-2">{s.step}</span>
                  <h4 className="font-display font-semibold text-sm text-neutral-900 mb-1.5">{s.title}</h4>
                  <p className="text-neutral-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-neutral-950 p-8 sm:p-12 text-center text-white max-w-3xl mx-auto">
            <h3 className="heading-xl text-2xl sm:text-3xl mb-3">Siap Memulai Pengembangan?</h3>
            <p className="text-neutral-400 text-sm sm:text-base mb-8 max-w-md mx-auto">
              Hubungi kami langsung melalui WhatsApp untuk konsultasi awal tanpa komitmen.
            </p>
            <a
              href="https://wa.me/6285183011318"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-display font-semibold text-sm bg-white text-neutral-950 hover:bg-neutral-100 transition-all shadow-lg"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Konsultasi WhatsApp Sekarang
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
