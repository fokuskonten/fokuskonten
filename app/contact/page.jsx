import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const socialLinks = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/6285183011318',
    username: '+62 851-8301-1318',
    color: 'hover:bg-green-500 hover:border-green-500',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:admin@fokuskonten.my.id',
    username: 'admin@fokuskonten.my.id',
    color: 'hover:bg-accent-500 hover:border-accent-500',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@fokuskonten',
    username: '@fokuskonten',
    color: 'hover:bg-red-500 hover:border-red-500',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@fokuskonten',
    username: '@fokuskonten',
    color: 'hover:bg-dark-100 hover:border-dark-100 hover:text-dark-900',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/fokuskonten',
    username: '@fokuskonten',
    color: 'hover:bg-pink-500 hover:border-pink-500',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
]

export const metadata = {
  title: 'Kontak',
  description: 'Hubungi FokusKonten — WhatsApp, Email, atau media sosial. Tersedia untuk konsultasi dan kerja sama.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
          <div className="container-custom section-padding">
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase">Kontak</span>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white text-balance">
                Hubungi <span className="gradient-text">FokusKonten</span>
              </h1>
              <p className="mt-4 text-dark-200">
                Punya pertanyaan, ide, atau ingin kerja sama? Jangan ragu untuk menghubungi melalui platform di bawah ini.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`glass-card p-5 flex flex-col items-center text-center gap-3 hover-lift group ${social.color} transition-all duration-300`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-dark-600 flex items-center justify-center text-dark-200 group-hover:text-white transition-colors">
                      {social.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{social.name}</h3>
                      <p className="text-dark-300 text-xs mt-1">{social.username}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-10 glass-card p-8 sm:p-10">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white text-center mb-6">
                  Atau kirim pesan langsung
                </h2>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-dark-200 mb-2">Nama</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-xl bg-dark-600/50 border border-dark-400/20 text-white placeholder-dark-300 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all text-sm"
                        placeholder="Nama Anda"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-xl bg-dark-600/50 border border-dark-400/20 text-white placeholder-dark-300 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all text-sm"
                        placeholder="email@anda.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-dark-200 mb-2">Subjek</label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 rounded-xl bg-dark-600/50 border border-dark-400/20 text-white placeholder-dark-300 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all text-sm"
                      placeholder="Subjek pesan"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-dark-200 mb-2">Pesan</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-dark-600/50 border border-dark-400/20 text-white placeholder-dark-300 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all text-sm resize-none"
                      placeholder="Tulis pesan Anda di sini..."
                    />
                  </div>
                  <div className="text-center">
                    <a
                      href="https://wa.me/6285183011318"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-accent-500 to-vibrant-600 text-white font-semibold hover:shadow-xl hover:shadow-vibrant-500/25 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Kirim via WhatsApp
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
