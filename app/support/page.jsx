import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Support',
  description: 'Pusat bantuan dan dukungan FokusKonten untuk layanan dan produk.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/support',
  },
}

const supportChannels = [
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    description: 'Respon cepat untuk pertanyaan dan konsultasi.',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    action: 'Chat via WhatsApp',
    link: 'https://wa.me/6285183011318',
    responseTime: '1-2 jam',
  },
  {
    id: 'email',
    title: 'Email',
    description: 'Untuk pertanyaan detail dan dokumentasi.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    action: 'Kirim Email',
    link: 'mailto:admin@fokuskonten.my.id',
    responseTime: '1-2 hari kerja',
  },
  {
    id: 'contact-form',
    title: 'Form Kontak',
    description: 'Form terstruktur untuk permintaan proyek.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    action: 'Isi Form',
    link: '/contact',
    responseTime: '1-2 hari kerja',
  },
]

const supportTopics = [
  {
    title: 'Android Development',
    questions: [
      'Setup project baru',
      'Integrasi Firebase',
      'Optimasi performa',
      'Publish ke Play Store',
    ]
  },
  {
    title: 'Creative Design',
    questions: [
      'Logo dan branding',
      'UI/UX design',
      'Template customization',
      'File format conversion',
    ]
  },
  {
    title: 'Fotografi & Videografi',
    questions: [
      'Booking session',
      'Editing request',
      'File delivery',
      'Lisensi penggunaan',
    ]
  },
  {
    title: 'Content Creation',
    questions: [
      'Content strategy',
      'Social media management',
      'Copywriting',
      'Video production',
    ]
  },
]

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        
        {/* Header */}
        <section className="section border-t border-black/[0.04] bg-canvas-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <span className="section-label">Support</span>
              <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Pusat <span className="text-maroon-gradient">Bantuan</span>
              </h1>
              <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed">
                Tim support kami siap membantu Anda dengan pertanyaan dan masalah terkait layanan dan produk FokusKonten.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Channels */}
        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportChannels.map((channel, index) => (
                <div
                  key={channel.id}
                  className="p-8 bg-white rounded-2xl border border-black/[0.05] shadow-mature hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-maroon-700 mb-6"
                    style={{ background: 'rgba(140,31,31,0.06)', border: '1px solid rgba(140,31,31,0.12)' }}
                  >
                    {channel.icon}
                  </div>
                  <h3 className="font-display font-semibold text-xl text-charcoal-900 mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-charcoal-500 text-sm leading-relaxed mb-6">
                    {channel.description}
                  </p>
                  <a
                    href={channel.link}
                    target={channel.id === 'whatsapp' ? '_blank' : undefined}
                    rel={channel.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                    className="btn-primary w-full justify-center text-sm"
                  >
                    {channel.action}
                  </a>
                  <p className="text-charcoal-400 text-xs mt-4 text-center">
                    Response: {channel.responseTime}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Topics */}
        <section className="section border-t border-black/[0.04] bg-white">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-12 animate-fade-up">
              <h2 className="font-display font-semibold text-2xl text-charcoal-900 mb-4">
                Topik Bantuan
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed">
                Berikut adalah topik umum yang sering dibahas. Klik topik untuk informasi lebih lanjut.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportTopics.map((topic, index) => (
                <div
                  key={index}
                  className="p-6 bg-canvas-50 rounded-2xl border border-black/[0.05] animate-fade-up"
                >
                  <h3 className="font-display font-semibold text-lg text-charcoal-900 mb-4">
                    {topic.title}
                  </h3>
                  <ul className="space-y-2">
                    {topic.questions.map((question) => (
                      <li key={question} className="text-charcoal-600 text-sm flex items-center gap-2">
                        <svg className="w-4 h-4 text-maroon-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Link */}
        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center p-10 rounded-2xl bg-canvas-50 border border-black/[0.05]">
              <h2 className="font-display font-semibold text-2xl text-charcoal-900 mb-3">
                Cari Jawaban Sendiri?
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed mb-6">
                Kunjungi halaman FAQ kami untuk pertanyaan yang sering diajukan.
              </p>
              <Link href="/faq" className="btn-secondary inline-flex items-center gap-2 px-6 py-3">
                Lihat FAQ
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
