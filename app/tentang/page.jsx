import Link from 'next/link'

export const metadata = {
  title: 'Tentang FokusKonten',
  description: 'FokusKonten adalah publisher aplikasi Android Indonesia yang berbasis di Cikarang, Jawa Barat. Publikasikan aplikasi Android berkualitas sejak 2020.',
  alternates: { canonical: 'https://fokuskonten.my.id/tentang' },
}

const milestones = [
  { year: '2020', title: 'Berdirinya FokusKonten', desc: 'Memulai perjalanan sebagai pengembang aplikasi Android dengan fokus pada solusi digital.' },
  { year: '2021', title: 'Aplikasi Pertama', desc: 'Aplikasi pertama berhasil dipublikasikan di Google Play Store.' },
  { year: '2022', title: 'Ekspansi Kategori', desc: 'Memperluas pengembangan ke berbagai kategori — game, edukasi, utilitas, dan bisnis.' },
  { year: '2025', title: '79+ Aplikasi', desc: 'Mencapai 79+ aplikasi Android yang tersedia di Google Play Store dengan target SDK 36.' },
  { year: '2026', title: 'Terus Berkembang', desc: 'Komitmen untuk terus menghadirkan aplikasi Android berkualitas untuk pengguna Indonesia dan global.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="pt-28 pb-20">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <div>
              <span className="label-brand mb-4 inline-block">Tentang</span>
              <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-6 text-balance">
                Membangun Aplikasi Android{' '}
                <span className="text-gradient-brand">Berkualitas</span>
              </h1>
              <p className="text-neutral-500 text-base leading-relaxed mb-6">
                FokusKonten adalah publisher aplikasi Android Indonesia yang berkomitmen menghadirkan aplikasi berkualitas untuk berbagai kebutuhan. 
                Berbasis di Cikarang, Jawa Barat, kami telah mengembangkan dan mempublikasikan 79+ aplikasi di Google Play Store.
              </p>
              <p className="text-neutral-500 text-base leading-relaxed mb-8">
                Setiap aplikasi dikembangkan dengan standar tinggi — antarmuka modern, performa optimal, 
                dan pengalaman pengguna yang menyenangkan. Kami percaya teknologi harus memberikan solusi nyata bagi masyarakat.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://play.google.com/store/apps/developer?id=FokusKonten"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-sm text-white bg-gradient-brand hover:shadow-lg hover:shadow-brand-500/25 transition-all"
                >
                  Lihat di Play Store
                </a>
                <Link
                  href="/aplikasi"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-sm text-neutral-700 bg-white border border-neutral-200 hover:border-brand-200 hover:text-brand-600 transition-all"
                >
                  Jelajahi Aplikasi
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-brand p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-dots opacity-10" />
                <span className="text-8xl font-display font-black text-white/20">FK</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-warm-500/10 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-500/10 rounded-full blur-2xl" />
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="label-brand mb-3 inline-block">Perjalanan</span>
              <h2 className="heading-xl text-3xl text-neutral-900">Perjalanan FokusKonten</h2>
            </div>
            <div className="relative">
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500 via-brand-300 to-transparent -translate-x-1/2 hidden sm:block" />
              <div className="space-y-8 sm:space-y-12">
                {milestones.map((m, i) => (
                  <div key={m.year} className={`relative flex flex-col sm:flex-row items-start gap-4 sm:gap-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                      <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-card p-5 sm:p-6">
                        <span className="text-brand-600 font-display font-bold text-sm">{m.year}</span>
                        <h3 className="font-display font-semibold text-neutral-900 mt-1">{m.title}</h3>
                        <p className="text-neutral-500 text-sm mt-2 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                    <div className="hidden sm:flex shrink-0 w-8 h-8 rounded-full bg-brand-500 border-4 border-white shadow-soft items-center justify-center relative z-10">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <div className="flex-1 hidden sm:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-neutral-50 border border-neutral-100 p-8 sm:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h2 className="heading-md text-lg text-neutral-900 mb-4">Informasi Perusahaan</h2>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-neutral-400">Nama</dt>
                    <dd className="text-neutral-700 font-medium">FokusKonten</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-400">Pendiri</dt>
                    <dd className="text-neutral-700 font-medium">Muharie</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-400">Lokasi</dt>
                    <dd className="text-neutral-700 font-medium">Cikarang, Jawa Barat, Indonesia</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-400">Berdiri</dt>
                    <dd className="text-neutral-700 font-medium">2020</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-400">Play Store</dt>
                    <dd className="text-neutral-700 font-medium">
                      <a href="https://play.google.com/store/apps/developer?id=FokusKonten" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                        FokusKonten
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h2 className="heading-md text-lg text-neutral-900 mb-4">Kontak</h2>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-neutral-400">Email</dt>
                    <dd className="text-neutral-700 font-medium">
                      <a href="mailto:admin@fokuskonten.my.id" className="text-brand-600 hover:underline">admin@fokuskonten.my.id</a>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-400">WhatsApp</dt>
                    <dd className="text-neutral-700 font-medium">
                      <a href="https://wa.me/6285183011318" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">+62 851-8301-1318</a>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-400">Website</dt>
                    <dd className="text-neutral-700 font-medium">
                      <a href="https://fokuskonten.my.id" className="text-brand-600 hover:underline">fokuskonten.my.id</a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
