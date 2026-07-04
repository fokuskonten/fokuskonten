import Link from 'next/link'

export const metadata = {
  title: 'Tentang FokusKonten',
  description: 'FokusKonten adalah publisher aplikasi Android Indonesia yang berbasis di Cikarang, Jawa Barat. Publikasikan aplikasi Android berkualitas sejak 2020.',
  alternates: { canonical: 'https://fokuskonten.my.id/tentang' },
}

const milestones = [
  { year: '2020', title: 'Berdirinya FokusKonten', desc: 'Memulai perjalanan sebagai pengembang aplikasi Android dengan fokus pada solusi digital untuk masyarakat Indonesia.' },
  { year: '2021', title: 'Aplikasi Pertama', desc: 'Aplikasi pertama berhasil dipublikasikan di Google Play Store. Menjadi langkah awal mewujudkan visi sebagai publisher aplikasi Android terpercaya.' },
  { year: '2022', title: 'Ekspansi Kategori', desc: 'Memperluas pengembangan ke berbagai kategori — game, edukasi, utilitas, dan bisnis. Setiap aplikasi dirancang dengan standar kualitas tinggi.' },
  { year: '2025', title: '79+ Aplikasi', desc: 'Mencapai 79+ aplikasi Android yang tersedia di Google Play Store dengan target SDK 36. Terus berinovasi mengikuti perkembangan teknologi Android.' },
  { year: '2026', title: 'Terus Berkembang', desc: 'Komitmen untuk terus menghadirkan aplikasi Android berkualitas untuk pengguna Indonesia dan global.' },
]

export default function AboutPage() {
  return (
    <section className="pt-28 pb-20">
      <div className="container-page">
        <div className="max-w-3xl mx-auto mb-16">
          <span className="label-brand mb-4 inline-block">Tentang</span>
          <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-6 text-balance">
            FokusKonten —{' '}
            <span className="text-gradient-brand">Publisher Aplikasi Android</span>
          </h1>
          <p className="text-neutral-500 text-base leading-relaxed mb-4">
            FokusKonten adalah publisher aplikasi Android Indonesia yang berkomitmen menghadirkan aplikasi berkualitas 
            untuk berbagai kebutuhan — mulai dari game, edukasi, utilitas, kesehatan, produktivitas, religi, hiburan, 
            hingga solusi bisnis profesional. Berbasis di Cikarang, Jawa Barat, kami telah mengembangkan dan 
            mempublikasikan lebih dari 79 aplikasi di Google Play Store.
          </p>
          <p className="text-neutral-500 text-base leading-relaxed mb-4">
            Setiap aplikasi dikembangkan dengan standar tinggi — antarmuka modern, performa optimal, dan pengalaman 
            pengguna yang menyenangkan. Kami percaya teknologi harus memberikan solusi nyata bagi masyarakat. 
            Karena itu, setiap aplikasi dirancang untuk menyelesaikan masalah spesifik, membantu produktivitas, 
            atau memberikan hiburan yang bermakna.
          </p>
          <p className="text-neutral-500 text-base leading-relaxed">
            Visi kami adalah menjadi publisher aplikasi Android terdepan dari Indonesia yang dikenal akan kualitas, 
            inovasi, dan dedikasi dalam memberikan solusi digital. Misi kami adalah terus mengembangkan aplikasi 
            yang bermanfaat, mudah digunakan, dan dapat diakses oleh semua kalangan.
          </p>
        </div>

        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="label-brand mb-3 inline-block">Perjalanan</span>
            <h2 className="heading-xl text-3xl text-neutral-900">Perjalanan FokusKonten</h2>
            <p className="text-neutral-500 text-sm mt-3 max-w-lg mx-auto">
              Dari awal berdiri hingga menjadi publisher dengan 79+ aplikasi di Google Play Store.
            </p>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
            <h2 className="font-display font-semibold text-neutral-900 text-base mb-4">Visi</h2>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Menjadi publisher aplikasi Android terdepan dari Indonesia yang dikenal akan kualitas, 
              inovasi, dan dedikasi dalam memberikan solusi digital.
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
            <h2 className="font-display font-semibold text-neutral-900 text-base mb-4">Misi</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-neutral-500 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                Mengembangkan aplikasi berkualitas tinggi yang bermanfaat
              </li>
              <li className="flex items-start gap-2 text-neutral-500 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                Menjaga standar pengalaman pengguna yang optimal
              </li>
              <li className="flex items-start gap-2 text-neutral-500 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                Terus berinovasi mengikuti teknologi terkini
              </li>
              <li className="flex items-start gap-2 text-neutral-500 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                Memberikan solusi digital untuk masyarakat Indonesia
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display font-semibold text-neutral-900 text-base mb-4">Informasi Perusahaan</h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-neutral-100 pb-2">
                  <dt className="text-neutral-400">Nama</dt>
                  <dd className="text-neutral-700 font-medium">FokusKonten</dd>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-2">
                  <dt className="text-neutral-400">Pendiri</dt>
                  <dd className="text-neutral-700 font-medium">Muharie</dd>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-2">
                  <dt className="text-neutral-400">Lokasi</dt>
                  <dd className="text-neutral-700 font-medium">Cikarang, Jawa Barat, Indonesia</dd>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-2">
                  <dt className="text-neutral-400">Berdiri</dt>
                  <dd className="text-neutral-700 font-medium">2020</dd>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-2">
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
              <h2 className="font-display font-semibold text-neutral-900 text-base mb-4">Kontak</h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-neutral-100 pb-2">
                  <dt className="text-neutral-400">Email</dt>
                  <dd className="text-neutral-700 font-medium">
                    <a href="mailto:admin@fokuskonten.my.id" className="text-brand-600 hover:underline">admin@fokuskonten.my.id</a>
                  </dd>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-2">
                  <dt className="text-neutral-400">WhatsApp</dt>
                  <dd className="text-neutral-700 font-medium">
                    <a href="https://wa.me/6285183011318" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">+62 851-8301-1318</a>
                  </dd>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-2">
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
  )
}
