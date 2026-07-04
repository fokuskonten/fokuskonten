import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const changelogData = [
  {
    date: '2025-06-15',
    version: '2.1.0',
    app: 'FokusKonten E-Commerce',
    type: 'feature',
    changes: [
      'Added dark mode support',
      'Improved checkout flow',
      'Fixed payment gateway issues',
      'Performance optimizations'
    ]
  },
  {
    date: '2025-05-20',
    version: '1.5.2',
    app: 'FokusKonten Dashboard',
    type: 'bugfix',
    changes: [
      'Fixed analytics sync issues',
      'Improved report generation speed',
      'Fixed login problems on some devices',
      'UI improvements'
    ]
  },
  {
    date: '2025-05-01',
    version: '2.0.0',
    app: 'FokusKonten E-Commerce',
    type: 'major',
    changes: [
      'Complete UI redesign',
      'New payment integration (Midtrans)',
      'Improved search functionality',
      'Added product comparison',
      'Performance improvements'
    ]
  },
  {
    date: '2025-04-10',
    version: '3.0.1',
    app: 'FokusKonten Notes',
    type: 'bugfix',
    changes: [
      'Fixed sync issues',
      'Improved rich text editor',
      'Fixed notification problems',
      'Security updates'
    ]
  },
  {
    date: '2025-03-25',
    version: '1.2.0',
    app: 'FokusKonten Camera',
    type: 'feature',
    changes: [
      'Added night mode',
      'Video recording improvements',
      'New photo presets',
      'RAW format support'
    ]
  },
  {
    date: '2025-03-01',
    version: '3.0.0',
    app: 'FokusKonten Notes',
    type: 'major',
    changes: [
      'Complete redesign',
      'New collaboration features',
      'Voice notes support',
      'Cloud sync improvements',
      'New categorization system'
    ]
  },
  {
    date: '2025-02-01',
    version: '1.1.0',
    app: 'FokusKonten Camera',
    type: 'feature',
    changes: [
      'RAW support added',
      'New photo presets',
      'Improved manual controls',
      'Gallery integration'
    ]
  },
  {
    date: '2025-01-15',
    version: '1.0.0',
    app: 'FokusKonten Dashboard',
    type: 'major',
    changes: [
      'Initial release',
      'Multi-platform analytics',
      'Real-time statistics',
      'Custom dashboards',
      'Data export features'
    ]
  },
  {
    date: '2025-01-01',
    version: '1.0.0',
    app: 'FokusKonten Camera',
    type: 'major',
    changes: [
      'Initial release',
      'Manual camera controls',
      'Photo presets',
      'Social sharing',
      'Video recording'
    ]
  },
  {
    date: '2024-10-15',
    version: '2.0.0',
    app: 'FokusKonten Notes',
    type: 'major',
    changes: [
      'Cloud sync added',
      'Rich text editor',
      'Smart categories',
      'Search improvements'
    ]
  }
]

const getTypeColor = (type) => {
  switch (type) {
    case 'major':
      return 'bg-purple-100 text-purple-700'
    case 'feature':
      return 'bg-blue-100 text-blue-700'
    case 'bugfix':
      return 'bg-green-100 text-green-700'
    default:
      return 'bg-charcoal-100 text-charcoal-700'
  }
}

const getTypeLabel = (type) => {
  switch (type) {
    case 'major':
      return 'Major'
    case 'feature':
      return 'Feature'
    case 'bugfix':
      return 'Bugfix'
    default:
      return 'Update'
  }
}

export const metadata = {
  title: 'Changelog',
  description: 'Riwayat perubahan dan pembaruan aplikasi FokusKonten — daftar lengkap versi, fitur baru, dan perbaikan bug.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/changelog',
  },
}

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        
        {/* Header */}
        <section className="section border-t border-black/[0.04] bg-canvas-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <span className="section-label">Changelog</span>
              <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Riwayat <span className="text-maroon-gradient">Perubahan</span>
              </h1>
              <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed">
                Daftar lengkap pembaruan, fitur baru, dan perbaikan bug untuk seluruh aplikasi FokusKonten. Pantau perkembangan aplikasi favorit Anda di sini.
              </p>
            </div>
          </div>
        </section>

        {/* Filter */}
        <section className="section border-t border-black/[0.04] bg-white">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-maroon-700 text-white rounded-lg text-sm font-medium">
                Semua
              </button>
              <button className="px-4 py-2 bg-canvas-100 text-charcoal-700 rounded-lg text-sm font-medium hover:bg-canvas-200 transition-colors">
                Major
              </button>
              <button className="px-4 py-2 bg-canvas-100 text-charcoal-700 rounded-lg text-sm font-medium hover:bg-canvas-200 transition-colors">
                Feature
              </button>
              <button className="px-4 py-2 bg-canvas-100 text-charcoal-700 rounded-lg text-sm font-medium hover:bg-canvas-200 transition-colors">
                Bugfix
              </button>
            </div>
          </div>
        </section>

        {/* Changelog Timeline */}
        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="space-y-6">
                {changelogData.map((entry, index) => (
                  <div key={index} className="relative pl-8 animate-fade-up">
                    {/* Timeline Line */}
                    {index < changelogData.length - 1 && (
                      <div className="absolute left-3 top-8 w-0.5 h-full bg-maroon-200" />
                    )}
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-maroon-700 border-4 border-white shadow-subtle" />
                    
                    {/* Content */}
                    <div className="p-6 bg-white rounded-2xl border border-black/[0.05] shadow-mature hover:shadow-elevated transition-all duration-300">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-charcoal-400 text-sm">{entry.date}</span>
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-maroon-100 text-maroon-700">
                          {entry.app}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full {getTypeColor(entry.type)}">
                          {getTypeLabel(entry.type)}
                        </span>
                        <span className="font-display font-semibold text-maroon-700">v{entry.version}</span>
                      </div>
                      <ul className="space-y-2">
                        {entry.changes.map((change, i) => (
                          <li key={i} className="text-charcoal-600 text-sm flex items-start gap-2">
                            <svg className="w-4 h-4 text-maroon-700 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section border-t border-black/[0.04] bg-white">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center p-10 rounded-2xl bg-canvas-50 border border-black/[0.05]">
              <h2 className="font-display font-semibold text-2xl text-charcoal-900 mb-3">
                Ingin Mengetahui Lebih Banyak?
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed mb-6">
                Kunjungi halaman Applications untuk melihat detail lengkap setiap aplikasi dan download versi terbaru.
              </p>
              <Link href="/applications" className="btn-secondary inline-flex items-center gap-2 px-6 py-3">
                Lihat Applications
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
