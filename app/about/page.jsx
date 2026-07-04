import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const skills = [
  { category: 'Android Development', items: ['Kotlin', 'Java', 'Jetpack Compose', 'Android SDK', 'Firebase', 'AdMob', 'Play Store'] },
  { category: 'Creative Digital',    items: ['CorelDraw', 'Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Figma', 'Brand Identity'] },
  { category: 'Fotografi & Videografi', items: ['Sony A7III / DSLR / Mirrorless', 'Lightroom PC', 'Adobe Premiere Pro', 'After Effects', 'CapCut'] },
  { category: 'Content Creator',     items: ['Strategi Konten', 'Copywriting', 'SEO Dasar', 'YouTube', 'TikTok', 'Instagram'] },
  { category: 'Operasional Digital', items: ['Google Admin', 'Firebase Console', 'Google Ads', 'Marketplace (Shopee, Tokopedia)', 'Domain & Hosting'] },
  { category: 'Teknis & Hardware',   items: ['Rakitan PC', 'Maintenance Printer', 'Setup Live Studio', 'Woodworking & Furnitur', 'Elektronik Konvensional'] },
]

const stats = [
  { value: '50+', label: 'Proyek Selesai' },
  { value: '30+', label: 'Klien Puas' },
  { value: '5+',  label: 'Tahun Pengalaman' },
  { value: '10+', label: 'Platform Dikuasai' },
]

export const metadata = {
  title: 'Tentang',
  description: 'Kenalan dengan FokusKonten — studio kreatif digital Indonesia yang menggabungkan Android Development, Fotografi, Videografi, dan Creative Digital dalam satu platform.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────── */}
        <section className="relative pt-32 sm:pt-40 pb-16 overflow-hidden" aria-label="Tentang FokusKonten">
          {/* Ambient */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-25 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(140,31,31,0.06) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <div className="container-max section px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

              {/* Text */}
              <div className="animate-fade-up">
                <span className="section-label">Tentang</span>
                <h1 className="heading-xl text-4xl sm:text-5xl text-charcoal-900 mb-6 text-balance">
                  Kenalan dengan{' '}
                  <span className="text-maroon-gradient">FokusKonten</span>
                </h1>
                <div className="space-y-4 text-charcoal-600 text-[15px] leading-relaxed">
                  <p>
                    <strong className="text-charcoal-900 font-semibold">FokusKonten</strong> adalah personal brand dan studio kreatif digital yang bergerak di bidang Android Development, desain grafis, fotografi & videografi, serta strategi konten. Didirikan oleh <strong className="text-charcoal-900 font-semibold">Muhari</strong>, seorang praktisi digital yang telah menekuni industri teknologi dan kreatif selama lebih dari 5 tahun.
                  </p>
                  <p>
                    Kami percaya bahwa karya digital terbaik lahir dari kombinasi antara ketelitian teknis, kepekaan estetis, dan pemahaman mendalam terhadap kebutuhan klien.
                  </p>
                  <p>
                    Dengan pengalaman lintas disiplin — dari membangun aplikasi Android hingga merekam momen sakral pernikahan, dari merancang brand identity hingga woodworking — FokusKonten menghadirkan sudut pandang yang unik dan komprehensif dalam setiap proyek.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-8">
                  <a
                    href="https://wa.me/6285183011318"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm hover:scale-[1.02] transition-transform"
                  >
                    Diskusi Proyek
                  </a>
                  <Link href="/portfolio" className="btn-secondary text-sm hover:scale-[1.02] transition-transform">
                    Lihat Portfolio
                  </Link>
                </div>
              </div>

              {/* Visual Card */}
              <div className="relative animate-scale-in delay-200">
                <div
                  className="aspect-square rounded-3xl flex items-center justify-center relative overflow-hidden bg-white shadow-elevated"
                  style={{ border: '1px solid rgba(140,31,31,0.12)' }}
                >
                  <div className="text-center">
                    <div
                      className="w-28 h-28 sm:w-36 sm:h-36 rounded-full mx-auto mb-5 flex items-center justify-center animate-float"
                      style={{ background: 'rgba(140,31,31,0.05)', border: '1px solid rgba(140,31,31,0.15)' }}
                    >
                      <span className="font-display font-black text-5xl sm:text-6xl text-maroon-gradient">FK</span>
                    </div>
                    <p className="text-charcoal-600 text-sm font-display font-semibold">Muhari · Founder</p>
                    <p className="text-charcoal-400 text-xs mt-1">FokusKonten</p>
                  </div>
                  {/* Decorative corner lines */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-maroon/20 rounded-tl-lg" aria-hidden="true" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-maroon/20 rounded-br-lg" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ────────────────────────── */}
        <section className="border-t border-black/[0.04] bg-white" aria-label="Statistik">
          <div className="container-max px-4 sm:px-6 lg:px-8 py-14">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="bg-canvas-100 p-8 text-center rounded-2xl border border-black/[0.04] shadow-subtle hover:scale-105 transition-transform duration-200 animate-scale-in">
                  <div className="font-display font-bold text-4xl text-maroon-700 mb-1">{s.value}</div>
                  <div className="text-charcoal-500 text-xs font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Skills ───────────────────────── */}
        <section className="section border-t border-black/[0.04]" aria-label="Keahlian">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="mb-12 animate-fade-up">
              <span className="section-label">Keahlian</span>
              <h2 className="heading-xl text-3xl sm:text-4xl text-charcoal-900">
                Skill & <span className="text-maroon-gradient">Kompetensi</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill) => (
                <div key={skill.category} className="card-outline p-6 shadow-mature hover:shadow-elevated transition-all duration-300 animate-scale-in">
                  <h3 className="font-display font-semibold text-sm text-maroon-700 mb-4">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map(item => (
                      <span key={item} className="tag text-xs">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────── */}
        <section className="section border-t border-black/[0.04] bg-white animate-fade-up" aria-label="Ajakan kerjasama">
          <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
            <div
              className="rounded-2xl p-10 sm:p-14 text-center bg-canvas-100 border border-black/[0.04] shadow-mature"
            >
              <div className="maroon-line mx-auto mb-6" aria-hidden="true" />
              <h2 className="heading-xl text-3xl text-charcoal-900 mb-3 text-balance">
                Tertarik Bekerja Sama?
              </h2>
              <p className="text-charcoal-500 text-sm max-w-sm mx-auto mb-7">
                Konsultasi awal gratis. Diskusikan proyek Anda bersama FokusKonten sekarang.
              </p>
              <a
                href="https://wa.me/6285183011318"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex hover:scale-[1.02] transition-transform"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
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
