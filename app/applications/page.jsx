import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const applications = [
  {
    id: 'fokuskonten-ecommerce',
    name: 'FokusKonten E-Commerce',
    description: 'Aplikasi belanja online native Android dengan fitur real-time tracking, integrasi payment gateway, dan push notification.',
    category: 'E-Commerce',
    version: '2.1.0',
    size: '25 MB',
    releaseDate: '2025-06-15',
    rating: 4.5,
    downloads: '10K+',
    features: [
      'Real-time order tracking',
      'Multiple payment methods',
      'Push notifications',
      'Wishlist & favorites',
      'Product reviews',
      'Dark mode support'
    ],
    status: 'Published',
    googlePlay: true,
    icon: '🛒'
  },
  {
    id: 'fokuskonten-dashboard',
    name: 'FokusKonten Dashboard',
    description: 'Aplikasi monitoring dan analitik media sosial multiplatform dengan statistik real-time dan laporan performa.',
    category: 'Analytics',
    version: '1.5.2',
    size: '18 MB',
    releaseDate: '2025-05-20',
    rating: 4.3,
    downloads: '5K+',
    features: [
      'Multi-platform analytics',
      'Real-time statistics',
      'Performance reports',
      'Custom dashboards',
      'Data export',
      'Scheduled reports'
    ],
    status: 'Published',
    googlePlay: true,
    icon: '📊'
  },
  {
    id: 'fokuskonten-notes',
    name: 'FokusKonten Notes',
    description: 'Aplikasi catatan produktivitas dengan sync cloud, rich text editor, dan organisasi kategori pintar.',
    category: 'Productivity',
    version: '3.0.1',
    size: '12 MB',
    releaseDate: '2025-04-10',
    rating: 4.7,
    downloads: '25K+',
    features: [
      'Cloud synchronization',
      'Rich text editor',
      'Smart categories',
      'Search & filters',
      'Voice notes',
      'Collaboration'
    ],
    status: 'Published',
    googlePlay: true,
    icon: '📝'
  },
  {
    id: 'fokuskonten-camera',
    name: 'FokusKonten Camera',
    description: 'Aplikasi kamera profesional dengan preset editing, manual controls, dan integrasi media sosial.',
    category: 'Photography',
    version: '1.2.0',
    size: '35 MB',
    releaseDate: '2025-03-25',
    rating: 4.4,
    downloads: '8K+',
    features: [
      'Manual camera controls',
      'Photo presets',
      'RAW support',
      'Social sharing',
      'Video recording',
      'Gallery integration'
    ],
    status: 'Published',
    googlePlay: true,
    icon: '📷'
  }
]

export const metadata = {
  title: 'Applications',
  description: 'Aplikasi Android resmi FokusKonten — solusi produktivitas, e-commerce, analitik, dan fotografi untuk pengguna Android.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/applications',
  },
}

export default function ApplicationsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        
        {/* Header */}
        <section className="section border-t border-black/[0.04] bg-canvas-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <span className="section-label">Applications</span>
              <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Aplikasi <span className="text-maroon-gradient">Android</span>
              </h1>
              <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed">
                Kumpulan aplikasi Android resmi FokusKonten yang dirancang untuk meningkatkan produktivitas, memudahkan aktivitas sehari-hari, dan memberikan pengalaman pengguna yang optimal.
              </p>
            </div>
          </div>
        </section>

        {/* Applications Grid */}
        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applications.map((app, index) => (
                <div
                  key={app.id}
                  className="card-outline p-6 shadow-mature hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                >
                  {/* App Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-canvas-100 border border-black/[0.05]">
                      {app.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-lg text-charcoal-900 mb-1">{app.name}</h3>
                      <p className="text-charcoal-500 text-sm mb-2">{app.description}</p>
                      <div className="flex items-center gap-3 text-xs text-charcoal-400">
                        <span className="px-2 py-0.5 bg-maroon-100 text-maroon-700 rounded-full">{app.category}</span>
                        <span>v{app.version}</span>
                        <span>{app.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-canvas-50 rounded-xl border border-black/[0.03]">
                    <div className="text-center">
                      <div className="font-display font-bold text-lg text-maroon-700">{app.rating}</div>
                      <div className="text-charcoal-400 text-xs">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display font-bold text-lg text-maroon-700">{app.downloads}</div>
                      <div className="text-charcoal-400 text-xs">Downloads</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display font-bold text-lg text-maroon-700">{app.status}</div>
                      <div className="text-charcoal-400 text-xs">Status</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-display font-semibold text-sm text-charcoal-900 mb-3">Fitur Utama</h4>
                    <ul className="space-y-2">
                      {app.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-charcoal-600 text-sm">
                          <svg className="w-4 h-4 text-maroon-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/applications/${app.id}`}
                      className="btn-primary flex-1 justify-center text-sm"
                    >
                      Detail Aplikasi
                    </Link>
                    {app.googlePlay && (
                      <a
                        href={`https://play.google.com/store/apps/details?id=com.fokuskonten.${app.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-10 rounded-xl flex items-center justify-center bg-canvas-100 border border-black/[0.05] hover:bg-canvas-200 transition-colors"
                        aria-label="Google Play"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section border-t border-black/[0.04] bg-white">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center p-10 rounded-2xl bg-canvas-50 border border-black/[0.05]">
              <h2 className="font-display font-semibold text-2xl text-charcoal-900 mb-3">
                Butuh Aplikasi Kustom?
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed mb-6">
                Kami dapat mengembangkan aplikasi Android sesuai kebutuhan spesifik bisnis Anda. Hubungi kami untuk konsultasi.
              </p>
              <a
                href="https://wa.me/6285183011318"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hubungi WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
