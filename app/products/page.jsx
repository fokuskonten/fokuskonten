import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Products',
  description: 'Produk digital FokusKonten: Template, Preset, Mockup, Plugin, dan aset digital berkualitas.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/products',
  },
}

const productCategories = [
  {
    id: 'templates',
    title: 'Templates',
    description: 'Template profesional untuk website, aplikasi, dan dokumen.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    products: [
      { name: 'Personal Website Template', status: 'Available', price: 'Gratis' },
      { name: 'Business Landing Page', status: 'Available', price: 'Gratis' },
      { name: 'Portfolio Template', status: 'Available', price: 'Gratis' },
      { name: 'Blog Template', status: 'Coming Soon', price: '-' },
    ],
  },
  {
    id: 'presets',
    title: 'Presets',
    description: 'Preset editing untuk foto dan video.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    products: [
      { name: 'Lightroom Cinematic Presets', status: 'Available', price: 'Rp 50.000' },
      { name: 'Lightroom Food Presets', status: 'Coming Soon', price: '-' },
      { name: 'Premiere Pro Transitions', status: 'Coming Soon', price: '-' },
    ],
  },
  {
    id: 'mockups',
    title: 'Mockups',
    description: 'Mockup profesional untuk presentasi desain.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    products: [
      { name: 'Phone Mockup Bundle', status: 'Coming Soon', price: '-' },
      { name: 'Laptop Mockup', status: 'Coming Soon', price: '-' },
      { name: 'Packaging Mockup', status: 'Coming Soon', price: '-' },
    ],
  },
  {
    id: 'plugins',
    title: 'Plugins & Scripts',
    description: 'Plugin dan script untuk meningkatkan produktivitas.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    products: [
      { name: 'Figma Auto Layout Helper', status: 'Coming Soon', price: '-' },
      { name: 'VS Code Snippets', status: 'Coming Soon', price: '-' },
      { name: 'Android Studio Templates', status: 'Coming Soon', price: '-' },
    ],
  },
  {
    id: 'textures',
    title: 'Textures & Assets',
    description: 'Texture dan aset grafis untuk desain.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    products: [
      { name: 'Gradient Backgrounds', status: 'Available', price: 'Gratis' },
      { name: 'Minimalist Icons', status: 'Coming Soon', price: '-' },
      { name: 'Abstract Shapes', status: 'Coming Soon', price: '-' },
    ],
  },
  {
    id: 'ebooks',
    title: 'Ebooks',
    description: 'Ebook dan panduan digital.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    products: [
      { name: 'Android Development Basics', status: 'Available', price: 'Gratis' },
      { name: 'Photography Lighting Guide', status: 'Coming Soon', price: '-' },
      { name: 'Content Strategy Handbook', status: 'Coming Soon', price: '-' },
    ],
  },
]

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        
        {/* Header */}
        <section className="section border-t border-black/[0.04] bg-canvas-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <span className="section-label">Products</span>
              <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Produk <span className="text-maroon-gradient">Digital</span>
              </h1>
              <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed">
                Aset digital berkualitas tinggi untuk mempercepat workflow dan meningkatkan hasil karya Anda.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productCategories.map((category, index) => (
                <div
                  key={category.id}
                  className="group p-8 bg-white rounded-2xl border border-black/[0.05] shadow-mature hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-maroon-700 mb-6"
                    style={{ background: 'rgba(140,31,31,0.06)', border: '1px solid rgba(140,31,31,0.12)' }}
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-display font-semibold text-xl text-charcoal-900 mb-3 group-hover:text-maroon-700 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-charcoal-500 text-sm leading-relaxed mb-6">
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.products.map((product) => (
                      <li key={product.name} className="flex items-center justify-between text-sm">
                        <span className="text-charcoal-600">{product.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-charcoal-400">{product.price}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${product.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-charcoal-100 text-charcoal-500'}`}>{product.status}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
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
                Butuh Produk Kustom?
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed mb-6">
                Kami dapat membuat produk digital sesuai kebutuhan spesifik Anda. Hubungi kami untuk konsultasi.
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
