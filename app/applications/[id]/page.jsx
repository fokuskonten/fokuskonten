import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const applications = {
  'fokuskonten-ecommerce': {
    name: 'FokusKonten E-Commerce',
    description: 'Aplikasi belanja online native Android dengan fitur real-time tracking, integrasi payment gateway Midtrans, push notification Firebase, dan admin dashboard berbasis web.',
    category: 'E-Commerce',
    version: '2.1.0',
    size: '25 MB',
    releaseDate: '2025-06-15',
    rating: 4.5,
    downloads: '10K+',
    minAndroid: 'Android 8.0+',
    developer: 'FokusKonten',
    features: [
      'Real-time order tracking',
      'Multiple payment methods (Midtrans, GoPay, OVO, Dana)',
      'Push notifications Firebase',
      'Wishlist & favorites',
      'Product reviews & ratings',
      'Dark mode support',
      'Offline mode',
      'Multi-language support'
    ],
    screenshots: ['Screenshot 1', 'Screenshot 2', 'Screenshot 3'],
    changelog: [
      { version: '2.1.0', date: '2025-06-15', changes: ['Added dark mode', 'Improved checkout flow', 'Bug fixes'] },
      { version: '2.0.0', date: '2025-05-01', changes: ['Complete UI redesign', 'New payment integration', 'Performance improvements'] },
      { version: '1.5.0', date: '2025-03-15', changes: ['Added wishlist feature', 'Search improvements', 'Bug fixes'] }
    ],
    faq: [
      { q: 'Apakah aplikasi ini gratis?', a: 'Ya, aplikasi ini gratis untuk diunduh dan digunakan. Beberapa fitur premium mungkin tersedia di masa depan.' },
      { q: 'Bagaimana cara melacak pesanan?', a: 'Buka menu "Pesanan Saya" untuk melihat status dan melacak pesanan Anda secara real-time.' },
      { q: 'Metode pembayaran apa yang tersedia?', a: 'Kami mendukung Midtrans, GoPay, OVO, Dana, dan transfer bank.' }
    ]
  },
  'fokuskonten-dashboard': {
    name: 'FokusKonten Dashboard',
    description: 'Aplikasi monitoring dan analitik media sosial multiplatform. Menampilkan statistik real-time, grafik engagement, dan laporan performa konten.',
    category: 'Analytics',
    version: '1.5.2',
    size: '18 MB',
    releaseDate: '2025-05-20',
    rating: 4.3,
    downloads: '5K+',
    minAndroid: 'Android 8.0+',
    developer: 'FokusKonten',
    features: [
      'Multi-platform analytics (Instagram, TikTok, YouTube)',
      'Real-time statistics',
      'Performance reports',
      'Custom dashboards',
      'Data export (CSV, PDF)',
      'Scheduled reports',
      'Team collaboration',
      'API access'
    ],
    screenshots: ['Screenshot 1', 'Screenshot 2', 'Screenshot 3'],
    changelog: [
      { version: '1.5.2', date: '2025-05-20', changes: ['Bug fixes', 'Performance improvements'] },
      { version: '1.5.0', date: '2025-05-01', changes: ['Added TikTok analytics', 'New report templates'] },
      { version: '1.0.0', date: '2025-01-15', changes: ['Initial release'] }
    ],
    faq: [
      { q: 'Platform media sosial apa yang didukung?', a: 'Saat ini kami mendukung Instagram, TikTok, dan YouTube. Platform lain akan ditambahkan segera.' },
      { q: 'Apakah data saya aman?', a: 'Ya, kami menggunakan enkripsi end-to-end dan mematuhi kebijakan privasi yang ketat.' }
    ]
  },
  'fokuskonten-notes': {
    name: 'FokusKonten Notes',
    description: 'Aplikasi catatan produktivitas dengan sync cloud, rich text editor, dan organisasi kategori pintar.',
    category: 'Productivity',
    version: '3.0.1',
    size: '12 MB',
    releaseDate: '2025-04-10',
    rating: 4.7,
    downloads: '25K+',
    minAndroid: 'Android 7.0+',
    developer: 'FokusKonten',
    features: [
      'Cloud synchronization',
      'Rich text editor',
      'Smart categories',
      'Search & filters',
      'Voice notes',
      'Collaboration',
      'Reminders',
      'Tags & labels'
    ],
    screenshots: ['Screenshot 1', 'Screenshot 2', 'Screenshot 3'],
    changelog: [
      { version: '3.0.1', date: '2025-04-10', changes: ['Bug fixes', 'Performance improvements'] },
      { version: '3.0.0', date: '2025-03-01', changes: ['Complete redesign', 'New collaboration features', 'Voice notes'] },
      { version: '2.0.0', date: '2024-10-15', changes: ['Cloud sync', 'Rich text editor'] }
    ],
    faq: [
      { q: 'Apakah catatan saya tersinkronisasi di semua perangkat?', a: 'Ya, dengan akun FokusKonten, catatan Anda akan tersinkronisasi secara otomatis di semua perangkat.' },
      { q: 'Apakah ada batasan jumlah catatan?', a: 'Tidak, Anda dapat membuat catatan tanpa batas.' }
    ]
  },
  'fokuskonten-camera': {
    name: 'FokusKonten Camera',
    description: 'Aplikasi kamera profesional dengan preset editing, manual controls, dan integrasi media sosial.',
    category: 'Photography',
    version: '1.2.0',
    size: '35 MB',
    releaseDate: '2025-03-25',
    rating: 4.4,
    downloads: '8K+',
    minAndroid: 'Android 9.0+',
    developer: 'FokusKonten',
    features: [
      'Manual camera controls',
      'Photo presets',
      'RAW support',
      'Social sharing',
      'Video recording 4K',
      'Gallery integration',
      'HDR mode',
      'Night mode'
    ],
    screenshots: ['Screenshot 1', 'Screenshot 2', 'Screenshot 3'],
    changelog: [
      { version: '1.2.0', date: '2025-03-25', changes: ['Added night mode', 'Video improvements', 'Bug fixes'] },
      { version: '1.1.0', date: '2025-02-01', changes: ['RAW support', 'New presets'] },
      { version: '1.0.0', date: '2025-01-01', changes: ['Initial release'] }
    ],
    faq: [
      { q: 'Apakah aplikasi ini mendukung RAW?', a: 'Ya, aplikasi ini mendukung format RAW untuk perangkat yang kompatibel.' },
      { q: 'Bagaimana cara berbagi foto ke media sosial?', a: 'Setelah mengambil foto, Anda dapat langsung berbagi ke Instagram, Facebook, Twitter, dan lainnya melalui menu share.' }
    ]
  }
}

export async function generateStaticParams() {
  return Object.keys(applications).map((id) => ({
    id: id,
  }))
}

export async function generateMetadata({ params }) {
  const app = applications[params.id]
  if (!app) {
    return {
      title: 'Application Not Found',
    }
  }
  return {
    title: `${app.name} - FokusKonten`,
    description: app.description,
    alternates: {
      canonical: `https://fokuskonten.my.id/applications/${params.id}`,
    },
  }
}

export default function ApplicationDetailPage({ params }) {
  const app = applications[params.id]
  
  if (!app) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        
        {/* Header */}
        <section className="section border-t border-black/[0.04] bg-canvas-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <Link href="/applications" className="text-maroon-700 text-sm hover:underline mb-4 inline-block">
                ← Kembali ke Applications
              </Link>
              <div className="flex items-start gap-6 mt-4">
                <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl bg-white border border-black/[0.05] shadow-subtle">
                  {app.category === 'E-Commerce' && '🛒'}
                  {app.category === 'Analytics' && '📊'}
                  {app.category === 'Productivity' && '📝'}
                  {app.category === 'Photography' && '📷'}
                </div>
                <div className="flex-1">
                  <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mb-2">
                    {app.name}
                  </h1>
                  <p className="text-charcoal-500 text-sm leading-relaxed mb-4">
                    {app.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-charcoal-400">
                    <span className="px-3 py-1 bg-maroon-100 text-maroon-700 rounded-full">{app.category}</span>
                    <span>v{app.version}</span>
                    <span>{app.size}</span>
                    <span>{app.minAndroid}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section border-t border-black/[0.04] bg-white">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl grid grid-cols-4 gap-4">
              <div className="text-center p-6 bg-canvas-50 rounded-2xl border border-black/[0.05]">
                <div className="font-display font-bold text-2xl text-maroon-700 mb-1">{app.rating}</div>
                <div className="text-charcoal-500 text-xs">Rating</div>
              </div>
              <div className="text-center p-6 bg-canvas-50 rounded-2xl border border-black/[0.05]">
                <div className="font-display font-bold text-2xl text-maroon-700 mb-1">{app.downloads}</div>
                <div className="text-charcoal-500 text-xs">Downloads</div>
              </div>
              <div className="text-center p-6 bg-canvas-50 rounded-2xl border border-black/[0.05]">
                <div className="font-display font-bold text-2xl text-maroon-700 mb-1">{app.version}</div>
                <div className="text-charcoal-500 text-xs">Versi</div>
              </div>
              <div className="text-center p-6 bg-canvas-50 rounded-2xl border border-black/[0.05]">
                <div className="font-display font-bold text-2xl text-maroon-700 mb-1">{app.size}</div>
                <div className="text-charcoal-500 text-xs">Ukuran</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="font-display font-semibold text-2xl text-charcoal-900 mb-6">Fitur Utama</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {app.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-canvas-50 rounded-xl border border-black/[0.05]">
                    <svg className="w-5 h-5 text-maroon-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-charcoal-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Changelog */}
        <section className="section border-t border-black/[0.04] bg-white">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="font-display font-semibold text-2xl text-charcoal-900 mb-6">Riwayat Perubahan</h2>
              <div className="space-y-4">
                {app.changelog.map((entry, index) => (
                  <div key={index} className="p-6 bg-canvas-50 rounded-2xl border border-black/[0.05]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-display font-semibold text-maroon-700">v{entry.version}</span>
                      <span className="text-charcoal-400 text-sm">{entry.date}</span>
                    </div>
                    <ul className="space-y-2">
                      {entry.changes.map((change, i) => (
                        <li key={i} className="text-charcoal-600 text-sm flex items-start gap-2">
                          <span className="text-maroon-700">•</span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="font-display font-semibold text-2xl text-charcoal-900 mb-6">FAQ</h2>
              <div className="space-y-4">
                {app.faq.map((item, index) => (
                  <div key={index} className="p-6 bg-canvas-50 rounded-2xl border border-black/[0.05]">
                    <h3 className="font-display font-semibold text-charcoal-900 mb-2">{item.q}</h3>
                    <p className="text-charcoal-600 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <section className="section border-t border-black/[0.04] bg-white">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center p-10 rounded-2xl bg-maroon-50 border border-maroon-100">
              <h2 className="font-display font-semibold text-2xl text-charcoal-900 mb-3">
                Download {app.name}
              </h2>
              <p className="text-charcoal-600 text-sm leading-relaxed mb-6">
                Dapatkan aplikasi ini dari Google Play Store untuk pengalaman terbaik.
              </p>
              <a
                href={`https://play.google.com/store/apps/details?id=com.fokuskonten.${app.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                Google Play Store
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
