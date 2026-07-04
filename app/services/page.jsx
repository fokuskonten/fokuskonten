import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Services',
  description: 'Layanan profesional FokusKonten: Android Development, Creative Design, Fotografi, Videografi, dan Content Creation.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/services',
  },
}

const services = [
  {
    id: 'android-development',
    title: 'Android Development',
    description: 'Pengembangan aplikasi Android native dengan teknologi modern dan best practice industri.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      'Kotlin & Jetpack Compose',
      'Clean Architecture',
      'Firebase Integration',
      'Google Play Console',
      'Room Database',
      'MVVM Pattern',
      'Material Design',
      'Push Notifications',
      'Performance Optimization',
      'Security Best Practices',
    ],
    deliverables: [
      'Source Code Lengkap',
      'Signed AAB/APK',
      'Documentation',
      'Play Store Publishing',
      '3 Bulan Support',
    ],
  },
  {
    id: 'creative-digital',
    title: 'Creative Digital',
    description: 'Desain grafis profesional untuk branding, marketing, dan kebutuhan digital Anda.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8 17.926 17.926 0 00-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8" />
      </svg>
    ),
    features: [
      'Logo Design',
      'Brand Identity',
      'Social Media Graphics',
      'UI/UX Design',
      'Marketing Materials',
      'Banner & Poster',
      'Business Card',
      'Mockup Design',
      'Icon Design',
      'Visual Guidelines',
    ],
    deliverables: [
      'High-Resolution Files',
      'Source Files (AI/PSD/Figma)',
      'Multiple Formats',
      'Brand Guidelines',
      'Revision Rounds',
    ],
  },
  {
    id: 'photography',
    title: 'Fotografi & Videografi',
    description: 'Layanan fotografi dan videografi profesional untuk berbagai kebutuhan.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    features: [
      'Product Photography',
      'Portrait Photography',
      'Event Coverage',
      'Pre-wedding',
      'Commercial Video',
      'Documentary',
      'Social Media Content',
      'Drone Footage',
      'Professional Editing',
      'Color Grading',
    ],
    deliverables: [
      'Edited Photos/Video',
      'Raw Files (Optional)',
      'Multiple Resolutions',
      'Online Gallery',
      'Fast Turnaround',
    ],
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    description: 'Strategi konten dan pembuatan konten untuk media sosial dan platform digital.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      'Content Strategy',
      'Copywriting',
      'Script Writing',
      'Video Production',
      'Social Media Management',
      'Blog Writing',
      'SEO Content',
      'Content Calendar',
      'Analytics & Reports',
      'Trend Analysis',
    ],
    deliverables: [
      'Content Calendar',
      'Published Content',
      'Performance Reports',
      'Strategy Document',
      'Ongoing Consultation',
    ],
  },
  {
    id: 'web-development',
    title: 'Website Development',
    description: 'Pengembangan website modern dengan Next.js dan teknologi terkini.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    features: [
      'Next.js Development',
      'Responsive Design',
      'SEO Optimization',
      'Performance Tuning',
      'CMS Integration',
      'E-commerce',
      'Custom Features',
      'Analytics Setup',
      'Security Hardening',
      'Modern UI/UX',
    ],
    deliverables: [
      'Source Code',
      'Deployed Website',
      'Documentation',
      'Admin Panel',
      'Support Period',
    ],
  },
  {
    id: 'consultation',
    title: 'Digital Consultation',
    description: 'Konsultasi strategi digital untuk bisnis dan proyek Anda.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    features: [
      'Digital Strategy',
      'Technical Consultation',
      'Project Planning',
      'Technology Stack Selection',
      'Process Optimization',
      'Team Training',
      'Code Review',
      'Architecture Design',
      'Best Practices',
      'Problem Solving',
    ],
    deliverables: [
      'Consultation Report',
      'Action Plan',
      'Recommendations',
      'Follow-up Sessions',
      'Resource List',
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
                Solusi digital komprehensif untuk kebutuhan bisnis dan proyek Anda. Dari pengembangan aplikasi hingga strategi konten.
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
                      {/* Features */}
                      <div>
                        <h3 className="font-display font-semibold text-sm text-charcoal-900 mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-maroon-700 rounded-full" />
                          Fitur
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
                      </div>

                      {/* Deliverables */}
                      <div>
                        <h3 className="font-display font-semibold text-sm text-charcoal-900 mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-maroon-700 rounded-full" />
                          Deliverables
                        </h3>
                        <ul className="space-y-2">
                          {service.deliverables.map((deliverable) => (
                            <li key={deliverable} className="text-charcoal-600 text-sm flex items-start gap-2">
                              <svg className="w-4 h-4 text-maroon-700 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {deliverable}
                            </li>
                          ))}
                        </ul>
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
                  Siap Memulai Proyek?
                </h2>
                <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
                  Diskusikan kebutuhan Anda dengan kami dan dapatkan solusi yang tepat untuk bisnis Anda.
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
