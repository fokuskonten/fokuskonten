import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Services',
  description: 'Layanan profesional FokusKonten: Desain Grafis, Fotografi, Videografi, Aplikasi Android, Template Blogger, Kerajinan Kayu, dan Aset Digital.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/services',
  },
}

const services = [
  {
    id: 'desain-grafis-percetakan',
    title: 'Desain Grafis Percetakan',
    description: 'Layanan desain grafis untuk kebutuhan percetakan dan branding menggunakan CorelDraw dan software desain lainnya.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v16h16V4H4z" />
      </svg>
    ),
    pricing: [
      { item: 'ID Card / Kartu Nama', price: 'Rp25K' },
      { item: 'Banner (per meter)', price: 'Rp50K' },
      { item: 'Undangan / Stiker', price: 'Rp35K' },
      { item: 'Header / Logo', price: 'Rp75K' },
    ],
    features: [
      'CorelDraw X7',
      'File siap cetak (CMYK)',
      'Free revisi 2x',
      'Format AI/CDR/PDF',
    ],
  },
  {
    id: 'fotografi',
    title: 'Fotografi',
    description: 'Layanan fotografi profesional untuk berbagai kebutuhan: produk, dokumentasi, portrait, dan editing foto.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    pricing: [
      { item: 'Foto Produk (10 foto)', price: 'Rp150K' },
      { item: 'Dokumentasi Acara', price: 'Rp300K' },
      { item: 'Album Cetak', price: 'Rp200K' },
      { item: 'Editing Foto', price: 'Rp25K/foto' },
    ],
    features: [
      'Hasil resolusi tinggi',
      'Editing profesional',
      'File RAW opsional',
      'Cepat & tepat waktu',
    ],
  },
  {
    id: 'videografi',
    title: 'Videografi',
    description: 'Layanan videografi untuk video profil, dokumentasi acara, video senam hati, dan editing video.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    pricing: [
      { item: 'Video Profil (3 menit)', price: 'Rp500K' },
      { item: 'Dokumentasi Acara', price: 'Rp500K' },
      { item: 'Video Senam Hati', price: 'Rp350K' },
      { item: 'Editing Video', price: 'Rp150K/video' },
    ],
    features: [
      'Premiere Pro editing',
      'Color grading',
      'Musik background',
      'Format HD/Full HD',
    ],
  },
  {
    id: 'aplikasi-android',
    title: 'Aplikasi Android',
    description: 'Pengembangan aplikasi Android native menggunakan Android Studio, Kotlin, dengan integrasi AdMob dan publishing ke Play Store.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    pricing: [
      { item: 'Aplikasi Sederhana', price: 'Rp1,5JT' },
      { item: 'Aplikasi + AdMob', price: 'Rp2JT' },
      { item: 'Aplikasi Kompleks', price: 'Rp3JT+' },
    ],
    features: [
      'Native Android (Kotlin)',
      'AdMob Integration',
      'Google Play Console',
      'Material Design',
    ],
  },
  {
    id: 'template-blogger',
    title: 'Template Blogger',
    description: 'Template Blogger premium dengan desain SEO friendly, mobile first, dan dukungan dark mode.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    pricing: [
      { item: 'Template Simple', price: 'Rp150K' },
      { item: 'Template Premium', price: 'Rp300K' },
      { item: 'Template Custom', price: 'Rp500K+' },
    ],
    features: [
      'SEO Optimized',
      'Mobile First',
      'Dark Mode',
      'Fast Loading',
    ],
  },
  {
    id: 'kerajinan-kayu',
    title: 'Kerajinan Kayu / Kaila Mebel',
    description: 'Kerajinan tangan dari kayu pinus berkualitas: organizer meja, asbak, tempat lollipop, bangku, dan meja custom.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    pricing: [
      { item: 'Organizer Meja', price: 'Rp75K' },
      { item: 'Asbak Kayu', price: 'Rp35K' },
      { item: 'Tempat Lollipop', price: 'Rp45K' },
      { item: 'Bangku / Meja Custom', price: 'Rp150K+' },
    ],
    features: [
      'Kayu pinus berkualitas',
      'Handmade',
      'Finishing halus',
      'Custom ukuran',
    ],
  },
  {
    id: 'aset-digital',
    title: 'Aset Digital',
    description: 'Koleksi aset digital: preset Lightroom, overlay, tekstur, sound effects, dan desain kaos.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    pricing: [
      { item: 'Preset Lightroom', price: 'Hubungi' },
      { item: 'Overlay & Tekstur', price: 'Hubungi' },
      { item: 'Sound Effects', price: 'Hubungi' },
      { item: 'Desain Kaos', price: 'Hubungi' },
    ],
    features: [
      'Kualitas premium',
      'Format siap pakai',
      'Lisensi pribadi',
      'Update berkala',
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">

        {/* Header */}
        <section className="section border-t border-black/[0.04] bg-canvas-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <span className="section-label">Layanan</span>
              <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Layanan <span className="text-maroon-gradient">Profesional</span>
              </h1>
              <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed">
                Solusi digital dan kreatif lengkap untuk kebutuhan bisnis, branding, dan pengembangan Anda. Dari desain grafis hingga aplikasi Android.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start animate-fade-up delay-${(index + 1) * 100}`}
                >
                  {/* Icon */}
                  <div className="lg:col-span-2">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-maroon-700"
                      style={{ background: 'rgba(140,31,31,0.06)', border: '1px solid rgba(140,31,31,0.12)' }}
                    >
                      {service.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-10">
                    <h2 className="font-display font-semibold text-2xl text-charcoal-900 mb-3">
                      {service.title}
                    </h2>
                    <p className="text-charcoal-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Pricing */}
                      <div>
                        <h3 className="font-display font-semibold text-sm text-charcoal-900 mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-maroon-700 rounded-full" />
                          Harga
                        </h3>
                        <div className="space-y-2">
                          {service.pricing.map((p) => (
                            <div
                              key={p.item}
                              className="flex items-center justify-between p-3 rounded-xl bg-canvas-50 border border-black/[0.03]"
                            >
                              <span className="text-charcoal-600 text-sm">{p.item}</span>
                              <span className="font-display font-semibold text-sm text-maroon-700">{p.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h3 className="font-display font-semibold text-sm text-charcoal-900 mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-maroon-700 rounded-full" />
                          Keunggulan
                        </h3>
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="text-charcoal-600 text-sm flex items-start gap-2">
                              <svg className="w-4 h-4 text-maroon-700 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4">
                          <a
                            href="https://wa.me/6285183011318"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Pesan Sekarang
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section border-t border-black/[0.04] bg-white">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div
              className="rounded-3xl p-10 sm:p-16 relative overflow-hidden text-center bg-canvas-50 border border-black/[0.05] shadow-elevated"
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 blur-[60px] opacity-40 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(140,31,31,0.15) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <div className="relative">
                <div className="maroon-line mx-auto mb-6" aria-hidden="true" />
                <h2 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mb-4">
                  Siap Memesan Layanan?
                </h2>
                <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
                  Diskusikan kebutuhan Anda dengan kami dan dapatkan solusi yang tepat.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="https://wa.me/6285183011318"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-8 py-3.5 hover:scale-[1.02] transition-transform"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Hubungi via WhatsApp
                  </a>
                  <Link href="/contact" className="btn-secondary px-8 py-3.5 hover:scale-[1.02] transition-transform">
                    Form Kontak
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
