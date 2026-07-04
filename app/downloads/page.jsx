import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Downloads',
  description: 'Pusat download software, tools, dan resources dari FokusKonten.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/downloads',
  },
}

const downloadCategories = [
  {
    id: 'software',
    title: 'Software',
    description: 'Software dan aplikasi yang dikembangkan oleh FokusKonten.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    items:[
      { name: 'FokusKonten Portfolio App', status: 'Available', version: 'v1.0.0', description: 'Aplikasi portfolio digital untuk menampilkan karya' },
      { name: 'Simple Task Manager', status: 'Available', version: 'v0.5.0', description: 'Aplikasi manajemen tugas sederhana' },
    ],
  },
  {
    id: 'templates',
    title: 'Templates',
    description: 'Template gratis untuk website dan aplikasi.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    items: [
      { name: 'Personal Website Template', status: 'Available', version: 'v1.0', description: 'Template website personal minimalis' },
      { name: 'Business Landing Page', status: 'Available', version: 'v1.0', description: 'Template landing page untuk bisnis' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Utilities',
    description: 'Tools dan utilities untuk meningkatkan produktivitas.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    items: [
      { name: 'Color Palette Generator', status: 'Available', version: 'v1.0', description: 'Tool untuk generate palet warna' },
      { name: 'Image Compressor', status: 'Available', version: 'v0.8', description: 'Tool kompresi gambar web' },
    ],
  },
  {
    id: 'resources',
    title: 'Resources',
    description: 'Resources dan dokumentasi untuk pengembangan.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    items: [
      { name: 'Android Development Guide', status: 'Available', version: 'v1.0', description: 'Panduan pengembangan Android dengan Kotlin' },
      { name: 'UI/UX Best Practices', status: 'Available', version: 'v1.0', description: 'Praktik terbaik desain UI/UX' },
    ],
  },
]

export default function DownloadsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        
        {/* Header */}
        <section className="section border-t border-black/[0.04] bg-canvas-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <span className="section-label">Downloads</span>
              <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Download <span className="text-maroon-gradient">Center</span>
              </h1>
              <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed">
                Pusat download software, tools, templates, dan resources gratis dari FokusKonten.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {downloadCategories.map((category, index) => (
                <div
                  key={category.id}
                  className="p-8 bg-white rounded-2xl border border-black/[0.05] shadow-mature hover:shadow-elevated transition-all duration-300 animate-scale-in"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-maroon-700 shrink-0"
                      style={{ background: 'rgba(140,31,31,0.06)', border: '1px solid rgba(140,31,31,0.12)' }}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-xl text-charcoal-900 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-charcoal-500 text-sm leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-4 rounded-xl bg-canvas-50 border border-black/[0.03]"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-charcoal-900 text-sm">{item.name}</p>
                          <p className="text-charcoal-400 text-xs mt-0.5">{item.description}</p>
                          <p className="text-charcoal-400 text-xs mt-1">{item.version}</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">{item.status}</span>
                      </div>
                    ))}
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
                Hubungi kami jika Anda membutuhkan bantuan atau memiliki pertanyaan tentang download.
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
