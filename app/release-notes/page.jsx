import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const releases = [
  {
    id: 'v2.1.0-ecommerce',
    version: '2.1.0',
    app: 'FokusKonten E-Commerce',
    date: '2025-06-15',
    type: 'Minor Release',
    status: 'Released',
    description: 'Update minor dengan peningkatan UI dan perbaikan bug penting untuk pengalaman belanja yang lebih baik.',
    highlights: [
      'Dark mode support untuk kenyamanan mata',
      'Checkout flow yang lebih cepat dan mudah',
      'Perbaikan masalah payment gateway',
      'Optimasi performa aplikasi'
    ],
    features: [
      {
        title: 'Dark Mode',
        description: 'Tampilan gelap yang nyaman untuk penggunaan di malam hari atau kondisi cahaya rendah.'
      },
      {
        title: 'Improved Checkout',
        description: 'Alur checkout yang disederhanakan dengan langkah yang lebih jelas dan cepat.'
      },
      {
        title: 'Payment Gateway Fix',
        description: 'Perbaikan kompatibilitas dengan Midtrans dan metode pembayaran lainnya.'
      }
    ],
    fixes: [
      'Fixed crash saat membuka detail produk',
      'Fixed notification tidak muncul di beberapa device',
      'Fixed loading spinner stuck saat checkout',
      'Fixed scroll issue di halaman kategori'
    ],
    knownIssues: [
      'Tidak ada known issue pada rilis ini'
    ],
    upgradeNotes: 'Update ini bersifat opsional namun sangat disarankan untuk pengalaman terbaik. Backup data tidak diperlukan.'
  },
  {
    id: 'v2.0.0-ecommerce',
    version: '2.0.0',
    app: 'FokusKonten E-Commerce',
    date: '2025-05-01',
    type: 'Major Release',
    status: 'Released',
    description: 'Redesign lengkap dengan integrasi payment baru dan fitur-fitur canggih untuk pengalaman belanja modern.',
    highlights: [
      'Complete UI redesign dengan Material Design 3',
      'Integrasi Midtrans untuk pembayaran',
      'Fitur pencarian yang ditingkatkan',
      'Perbandingan produk antar item',
      'Peningkatan performa signifikan'
    ],
    features: [
      {
        title: 'New UI Design',
        description: 'Antarmuka yang sepenuhnya didesain ulang dengan mengikuti prinsip Material Design 3 untuk tampilan yang modern dan konsisten.'
      },
      {
        title: 'Midtrans Integration',
        description: 'Integrasi payment gateway Midtrans yang mendukung berbagai metode pembayaran termasuk GoPay, OVO, Dana, dan transfer bank.'
      },
      {
        title: 'Product Comparison',
        description: 'Fitur baru untuk membandingkan hingga 4 produk sekaligus untuk membantu pengambilan keputusan pembelian.'
      },
      {
        title: 'Enhanced Search',
        description: 'Pencarian yang lebih cerdas dengan filter kategori, harga, dan rating untuk menemukan produk yang diinginkan dengan cepat.'
      }
    ],
    fixes: [
      'Fixed memory leak saat browsing produk',
      'Fixed crash saat loading gambar besar',
      'Fixed sync cart antar device'
    ],
    knownIssues: [
      'Dark mode akan hadir di update berikutnya',
      'Beberapa animasi mungkin tidak smooth di device lama'
    ],
    upgradeNotes: 'Update ini bersifat wajib. Versi lama tidak akan lagi mendapatkan dukungan. Pastikan koneksi internet stabil saat mengupdate.'
  },
  {
    id: 'v1.5.2-dashboard',
    version: '1.5.2',
    app: 'FokusKonten Dashboard',
    date: '2025-05-20',
    type: 'Patch Release',
    status: 'Released',
    description: 'Perbaikan bug dan peningkatan stabilitas untuk aplikasi dashboard analitik.',
    highlights: [
      'Perbaikan sync analytics',
      'Kecepatan generate report meningkat',
      'Perbaikan masalah login',
      'UI improvements'
    ],
    features: [],
    fixes: [
      'Fixed analytics data tidak sync real-time',
      'Fixed report generation timeout',
      'Fixed login gagal pada Android 10',
      'Fixed chart rendering error',
      'Fixed notification delay'
    ],
    knownIssues: [
      'Tidak ada known issue pada rilis ini'
    ],
    upgradeNotes: 'Update ini bersifat opsional namun disarankan untuk stabilitas yang lebih baik.'
  },
  {
    id: 'v3.0.0-notes',
    version: '3.0.0',
    app: 'FokusKonten Notes',
    date: '2025-03-01',
    type: 'Major Release',
    status: 'Released',
    description: 'Redesign lengkap dengan fitur kolaborasi dan voice notes untuk produktivitas yang lebih tinggi.',
    highlights: [
      'Complete redesign dengan tampilan modern',
      'Fitur kolaborasi real-time',
      'Voice notes support',
      'Cloud sync improvements',
      'Sistem kategorisasi baru'
    ],
    features: [
      {
        title: 'Collaboration',
        description: 'Berkolaborasi dengan tim atau rekan secara real-time pada catatan yang sama.'
      },
      {
        title: 'Voice Notes',
        description: 'Rekam dan simpan voice notes langsung dalam aplikasi untuk dokumentasi cepat.'
      },
      {
        title: 'Smart Categories',
        description: 'Sistem kategorisasi otomatis berdasarkan konten catatan untuk organisasi yang lebih baik.'
      },
      {
        title: 'Enhanced Cloud Sync',
        description: 'Sinkronisasi cloud yang lebih cepat dan andal dengan dukungan offline mode.'
      }
    ],
    fixes: [
      'Fixed sync conflict resolution',
      'Fixed text formatting issues',
      'Fixed attachment upload failures'
    ],
    knownIssues: [
      'Collaboration memerlukan koneksi internet yang stabil',
      'Voice notes tidak tersedia di device tanpa microphone'
    ],
    upgradeNotes: 'Update ini bersifat wajib. Versi lama akan dihentikan dukungannya dalam 3 bulan.'
  }
]

export const metadata = {
  title: 'Release Notes',
  description: 'Catatan rilis lengkap aplikasi FokusKonten — detail fitur baru, perbaikan bug, dan informasi upgrade untuk setiap versi.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/release-notes',
  },
}

export default function ReleaseNotesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        
        {/* Header */}
        <section className="section border-t border-black/[0.04] bg-canvas-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <span className="section-label">Release Notes</span>
              <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Catatan <span className="text-maroon-gradient">Rilis</span>
              </h1>
              <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed">
                Dokumentasi lengkap untuk setiap rilis aplikasi FokusKonten. Pelajari fitur baru, perbaikan bug, dan panduan upgrade untuk setiap versi.
              </p>
            </div>
          </div>
        </section>

        {/* Releases List */}
        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-8">
              {releases.map((release, index) => (
                <div key={release.id} className="animate-fade-up">
                  {/* Release Header */}
                  <div className="p-6 bg-white rounded-2xl border border-black/[0.05] shadow-mature mb-4">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-display font-bold text-2xl text-maroon-700">v{release.version}</span>
                          <span className="px-3 py-1 bg-maroon-100 text-maroon-700 rounded-full text-sm font-medium">
                            {release.type}
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            {release.status}
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-lg text-charcoal-900">{release.app}</h3>
                        <p className="text-charcoal-400 text-sm">{release.date}</p>
                      </div>
                    </div>
                    <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
                      {release.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {release.highlights.map((highlight, i) => (
                        <span key={i} className="px-3 py-1 bg-canvas-100 text-charcoal-600 rounded-full text-xs">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Release Details */}
                  <div className="space-y-4 pl-4 border-l-2 border-maroon-200">
                    {/* Features */}
                    {release.features.length > 0 && (
                      <div className="p-5 bg-canvas-50 rounded-xl border border-black/[0.03]">
                        <h4 className="font-display font-semibold text-sm text-maroon-700 mb-3 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Fitur Baru
                        </h4>
                        <div className="space-y-3">
                          {release.features.map((feature, i) => (
                            <div key={i}>
                              <h5 className="font-semibold text-charcoal-900 text-sm mb-1">{feature.title}</h5>
                              <p className="text-charcoal-500 text-xs leading-relaxed">{feature.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Fixes */}
                    {release.fixes.length > 0 && (
                      <div className="p-5 bg-canvas-50 rounded-xl border border-black/[0.03]">
                        <h4 className="font-display font-semibold text-sm text-maroon-700 mb-3 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Perbaikan Bug
                        </h4>
                        <ul className="space-y-2">
                          {release.fixes.map((fix, i) => (
                            <li key={i} className="text-charcoal-600 text-sm flex items-start gap-2">
                              <span className="text-green-600">✓</span>
                              {fix}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Known Issues */}
                    {release.knownIssues.length > 0 && (
                      <div className="p-5 bg-yellow-50 rounded-xl border border-yellow-200">
                        <h4 className="font-display font-semibold text-sm text-yellow-700 mb-3 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Known Issues
                        </h4>
                        <ul className="space-y-2">
                          {release.knownIssues.map((issue, i) => (
                            <li key={i} className="text-charcoal-600 text-sm flex items-start gap-2">
                              <span className="text-yellow-600">!</span>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Upgrade Notes */}
                    <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
                      <h4 className="font-display font-semibold text-sm text-blue-700 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Catatan Upgrade
                      </h4>
                      <p className="text-charcoal-600 text-sm leading-relaxed">{release.upgradeNotes}</p>
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
            <div className="max-w-2xl mx-auto text-center p-10 rounded-2xl bg-canvas-50 border border-black/[0.05]">
              <h2 className="font-display font-semibold text-2xl text-charcoal-900 mb-3">
                Butuh Bantuan?
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed mb-6">
                Jika Anda mengalami masalah setelah update atau memiliki pertanyaan tentang rilis, hubungi tim support kami.
              </p>
              <div className="flex items-center justify-center gap-3">
                <Link href="/support" className="btn-primary text-sm">
                  Hubungi Support
                </Link>
                <Link href="/changelog" className="btn-secondary text-sm">
                  Lihat Changelog
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
