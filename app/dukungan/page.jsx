import Link from 'next/link'

export const metadata = {
  title: 'Pusat Dukungan',
  description: 'Pusat bantuan FokusKonten. Temukan jawaban atas pertanyaan umum atau hubungi tim dukungan kami.',
  alternates: { canonical: 'https://fokuskonten.my.id/dukungan' },
}

const supportTopics = [
  {
    icon: '📱',
    title: 'Masalah Aplikasi',
    desc: 'Aplikasi force close, tidak bisa diinstal, atau error saat digunakan.',
    action: 'https://wa.me/6285183011318',
    label: 'Lapor via WhatsApp',
  },
  {
    icon: '🔑',
    title: 'Akun & Login',
    desc: 'Jika aplikasi memerlukan akun, hubungi kami untuk bantuan.',
    action: 'https://wa.me/6285183011318',
    label: 'Bantuan Akun',
  },
  {
    icon: '💰',
    title: 'Pembayaran & Pembelian',
    desc: 'Untuk pembelian dalam aplikasi atau pertanyaan terkait transaksi.',
    action: 'https://wa.me/6285183011318',
    label: 'Bantuan Pembayaran',
  },
  {
    icon: '📝',
    title: 'Saran & Masukan',
    desc: 'Punya ide atau saran untuk pengembangan aplikasi? Kami dengar.',
    action: 'https://wa.me/6285183011318',
    label: 'Kirim Saran',
  },
  {
    icon: '🔒',
    title: 'Privasi & Keamanan',
    desc: 'Pertanyaan tentang data pribadi dan kebijakan privasi.',
    href: '/kebijakan-privasi',
    label: 'Baca Kebijakan Privasi',
  },
  {
    icon: '❓',
    title: 'Pertanyaan Lain',
    desc: 'Tidak menemukan yang Anda cari? Hubungi tim dukungan kami.',
    action: 'https://wa.me/6285183011318',
    label: 'Tanya Langsung',
  },
]

export default function SupportPage() {
  return (
    <>
      <section className="pt-28 pb-20">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="label-brand mb-4 inline-block">Dukungan</span>
            <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-6">
              Pusat <span className="text-gradient-brand">Bantuan</span>
            </h1>
            <p className="text-neutral-500 text-base leading-relaxed max-w-lg mx-auto">
              Kami siap membantu Anda. Pilih topik di bawah atau hubungi kami langsung.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            {supportTopics.map((topic, i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-200/60 shadow-card p-6 hover:shadow-float transition-shadow">
                <span className="text-2xl block mb-3">{topic.icon}</span>
                <h3 className="font-display font-semibold text-sm text-neutral-900 mb-2">{topic.title}</h3>
                <p className="text-neutral-500 text-xs leading-relaxed mb-4">{topic.desc}</p>
                {topic.href ? (
                  <Link href={topic.href} className="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors">
                    {topic.label} &rarr;
                  </Link>
                ) : (
                  <a href={topic.action} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors">
                    {topic.label} &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-gradient-brand p-8 sm:p-10 text-white text-center max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="heading-md text-xl mb-3">Masih Butuh Bantuan?</h2>
              <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
                Tim dukungan kami siap merespon pesan Anda secepat mungkin.
              </p>
              <a
                href="https://wa.me/6285183011318"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-sm bg-white text-brand-700 hover:bg-white/90 transition-all"
              >
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
