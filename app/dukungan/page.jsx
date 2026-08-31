import Link from 'next/link'

export const metadata = {
  title: 'Pusat Dukungan',
  description: 'Pusat bantuan FokusKonten. Temukan jawaban atas pertanyaan umum atau hubungi tim dukungan kami.',
  alternates: { canonical: 'https://fokuskonten.my.id/dukungan' },
}

const supportTopics = [
  {
    icon: (
      <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Kendala Aplikasi',
    desc: 'Bantuan jika aplikasi mengalami force close, kendala printer Bluetooth, atau error transaksi.',
    action: 'https://wa.me/6285183011318',
    label: 'Lapor via WhatsApp',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    title: 'PIN & Akses Pengguna',
    desc: 'Panduan reset PIN kasir atau pengaturan hak akses staff di aplikasi Apotek Pro & Bisnis.',
    action: 'https://wa.me/6285183011318',
    label: 'Bantuan Akses',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: 'Lisensi & Layanan',
    desc: 'Pertanyaan seputar aktivasi lisensi pro, fitur tambahan, atau pembelian custom.',
    action: 'https://wa.me/6285183011318',
    label: 'Info Lisensi',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: 'Permintaan Fitur Baru',
    desc: 'Punya saran fitur yang dibutuhkan untuk apotek atau toko Anda? Kami siap mendengarkan.',
    action: 'https://wa.me/6285183011318',
    label: 'Kirim Masukan',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Privasi & Keamanan Data',
    desc: 'Informasi komitmen perlindungan privasi dan enkripsi data lokal pada aplikasi.',
    href: '/kebijakan-privasi',
    label: 'Baca Kebijakan Privasi',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Konsultasi Teknis',
    desc: 'Pertanyaan lain seputar kompatibilitas perangkat atau jasa pembuatan aplikasi.',
    action: 'https://wa.me/6285183011318',
    label: 'Hubungi Pengembang',
  },
]

export default function SupportPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="label-brand mb-4 inline-block">Pusat Bantuan</span>
            <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-6">
              Dukungan Teknis <span className="text-gradient-brand">FokusKonten</span>
            </h1>
            <p className="text-neutral-600 text-base leading-relaxed max-w-lg mx-auto">
              Kami siap membantu kelancaran operasional aplikasi Anda. Pilih kategori bantuan di bawah atau hubungi tim kami langsung.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto mb-16">
            {supportTopics.map((topic, i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-200/80 shadow-card p-6 hover:shadow-lg hover:border-neutral-400 transition-all">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-4">
                  {topic.icon}
                </div>
                <h3 className="font-display font-semibold text-base text-neutral-900 mb-1.5">{topic.title}</h3>
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed mb-4">{topic.desc}</p>
                {topic.href ? (
                  <Link href={topic.href} className="text-xs font-semibold text-neutral-900 hover:text-neutral-700 underline transition-colors inline-flex items-center gap-1">
                    {topic.label} &rarr;
                  </Link>
                ) : (
                  <a href={topic.action} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-neutral-900 hover:text-neutral-700 underline transition-colors inline-flex items-center gap-1">
                    {topic.label} &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-neutral-950 p-8 sm:p-12 text-white text-center max-w-2xl mx-auto">
            <h2 className="heading-md text-xl sm:text-2xl mb-3">Butuh Bantuan Langsung?</h2>
            <p className="text-neutral-400 text-sm mb-6 max-w-md mx-auto">
              Tim pengembang kami siap membantu menjawab pertanyaan Anda melalui WhatsApp.
            </p>
            <a
              href="https://wa.me/6285183011318"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-display font-semibold text-sm bg-white text-neutral-950 hover:bg-neutral-100 shadow-lg transition-all"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
