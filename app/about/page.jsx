import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const skills = [
  { name: 'Kotlin / Java', level: 90 },
  { name: 'Android SDK', level: 85 },
  { name: 'Jetpack Compose', level: 80 },
  { name: 'Firebase', level: 85 },
  { name: 'Adobe Photoshop', level: 85 },
  { name: 'Adobe Premiere Pro', level: 80 },
  { name: 'Lightroom', level: 85 },
  { name: 'Content Strategy', level: 80 },
]

const stats = [
  { label: 'Project Selesai', value: '50+' },
  { label: 'Klien Puas', value: '30+' },
  { label: 'Tahun Pengalaman', value: '5+' },
  { label: 'Platform', value: '10+' },
]

export const metadata = {
  title: 'Tentang',
  description: 'Tentang FokusKonten — Android Developer, Creative Digital & Content Creator, Fotograf & Videografi.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
          <div className="container-custom section-padding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase">Tentang</span>
                <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white text-balance">
                  Kenalan dengan <span className="gradient-text">FokusKonten</span>
                </h1>
                <p className="mt-6 text-dark-200 leading-relaxed">
                  FokusKonten adalah personal brand yang bergerak di bidang pengembangan Android, kreatif digital, 
                  fotografi & videografi, serta strategi konten. Berawal dari ketertarikan terhadap teknologi dan 
                  seni visual, FokusKonten hadir untuk memberikan solusi digital yang kreatif, fungsional, dan berdampak.
                </p>
                <p className="mt-4 text-dark-200 leading-relaxed">
                  Dengan pengalaman lebih dari 5 tahun di industri digital, FokusKonten telah membantu berbagai 
                  klien dalam mengembangkan aplikasi Android, menciptakan konten kreatif, hingga produksi foto 
                  dan video profesional.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-8">
                  <a
                    href="https://wa.me/6285183011318"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-500 to-vibrant-600 text-white font-semibold text-sm hover:shadow-xl hover:shadow-vibrant-500/25 transition-all duration-300"
                  >
                    Mari Diskusi
                  </a>
                  <Link
                    href="/portfolio"
                    className="px-6 py-3 rounded-xl border border-dark-400 text-dark-200 font-semibold text-sm hover:border-accent-500 hover:text-accent-400 transition-all duration-300"
                  >
                    Lihat Portfolio
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-dark-600 to-dark-700 border border-dark-400/20 flex items-center justify-center overflow-hidden">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-accent-400/20 via-vibrant-500/20 to-accent-600/20 animate-float flex items-center justify-center">
                    <span className="text-6xl sm:text-8xl font-display font-bold gradient-text">FK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-dark-800/50">
          <div className="container-custom">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-6 glass-card">
                  <div className="text-3xl sm:text-4xl font-display font-bold gradient-text">{stat.value}</div>
                  <div className="mt-2 text-dark-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase">Keahlian</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-white text-balance">
                Skill & <span className="gradient-text">Kompetensi</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {skills.map((skill) => (
                <div key={skill.name} className="glass-card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm">{skill.name}</span>
                    <span className="text-accent-400 text-sm font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-dark-500 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent-500 to-vibrant-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-dark-800/50">
          <div className="container-custom">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dark-700 via-dark-600 to-dark-700 border border-dark-400/20 p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white text-balance">
                Tertarik Bekerja Sama?
              </h2>
              <p className="mt-3 text-dark-200 max-w-xl mx-auto">
                Hubungi FokusKonten untuk konsultasi gratis dan diskusi proyek Anda.
              </p>
              <a
                href="https://wa.me/6285183011318"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-accent-500 to-vibrant-600 text-white font-semibold hover:shadow-xl hover:shadow-vibrant-500/25 transition-all duration-300"
              >
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
