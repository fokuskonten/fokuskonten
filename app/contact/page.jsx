'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'

const contacts = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: '+62 851-8301-1318',
    desc: 'Respons tercepat. Tersedia setiap hari.',
    href: 'https://wa.me/6285183011318',
    color: '#25D366',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    id: 'email',
    name: 'Email',
    handle: 'admin@fokuskonten.my.id',
    desc: 'Untuk keperluan formal dan kerjasama.',
    href: 'mailto:admin@fokuskonten.my.id',
    color: '#8c1f1f',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@fokuskonten',
    desc: 'Konten video dan tutorial.',
    href: 'https://youtube.com/@fokuskonten',
    color: '#FF0000',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@fokuskonten',
    desc: 'Konten pendek kreatif.',
    href: 'https://tiktok.com/@fokuskonten',
    color: '#111111',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@fokuskonten',
    desc: 'Karya visual dan behind the scenes.',
    href: 'https://instagram.com/fokuskonten',
    color: '#E1306C',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.002 6.002 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, subject, message } = form
    const text = `Halo FokusKonten,%0A%0ANama: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0ASubjek: ${encodeURIComponent(subject)}%0A%0APesan:%0A${encodeURIComponent(message)}`
    window.open(`https://wa.me/6285183011318?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────── */}
        <section className="relative pt-32 sm:pt-40 pb-10 overflow-hidden" aria-label="Halaman kontak">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] blur-[120px] opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(140,31,31,0.08) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="container-max section px-4 sm:px-6 lg:px-8 text-center animate-fade-up">
            <span className="section-label">Kontak</span>
            <h1 className="heading-xl text-4xl sm:text-5xl text-charcoal-900 mb-4 text-balance">
              Hubungi{' '}
              <span className="text-maroon-gradient">FokusKonten</span>
            </h1>
            <p className="text-charcoal-500 text-base max-w-md mx-auto leading-relaxed">
              Punya pertanyaan, ide kreatif, atau ingin bekerja sama? Pilih saluran komunikasi yang paling nyaman untuk Anda.
            </p>
          </div>
        </section>

        {/* ── Social Channels ──────────────── */}
        <section className="container-max px-4 sm:px-6 lg:px-8 pb-10" aria-label="Saluran kontak">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.map(c => (
              <a
                key={c.id}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                id={`contact-${c.id}`}
                className="group card-outline p-5 flex items-center gap-4 shadow-mature hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 animate-scale-in"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                  style={{ background: 'rgba(0,0,0,0.03)', color: '#71717a' }}
                >
                  <div className="group-hover:scale-115 transition-transform duration-300" style={{ color: c.color }}>
                    {c.icon}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="font-display font-semibold text-sm text-charcoal-900 mb-0.5">{c.name}</div>
                  <div className="text-maroon-700 text-xs font-mono truncate">{c.handle}</div>
                  <div className="text-charcoal-500 text-xs mt-0.5">{c.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Contact Form ─────────────────── */}
        <section className="container-max px-4 sm:px-6 lg:px-8 pb-24 animate-fade-up" aria-label="Formulir kontak">
          <div className="max-w-2xl mx-auto">
            <div
              className="rounded-2xl p-8 sm:p-10 bg-white border border-black/[0.04] shadow-elevated"
            >
              <div className="mb-8">
                <div className="maroon-line mb-4" aria-hidden="true" />
                <h2 className="font-display font-bold text-xl text-charcoal-900">Kirim Pesan</h2>
                <p className="text-charcoal-500 text-sm mt-1">
                  Isi formulir di bawah — pesan Anda akan terformat otomatis dan dikirimkan via WhatsApp.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-display font-bold text-charcoal-500 mb-2 uppercase tracking-wide">
                      Nama <span className="text-maroon-700" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Nama lengkap Anda"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-display font-bold text-charcoal-500 mb-2 uppercase tracking-wide">
                      Email <span className="text-maroon-700" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="email@anda.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-display font-bold text-charcoal-500 mb-2 uppercase tracking-wide">
                    Subjek <span className="text-maroon-700" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Perihal pesan Anda"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-display font-bold text-charcoal-500 mb-2 uppercase tracking-wide">
                    Pesan <span className="text-maroon-700" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="input-field resize-none"
                    placeholder="Ceritakan tentang proyek atau pertanyaan Anda..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="text-charcoal-500 text-xs leading-relaxed">
                    Pesan akan dikirim via WhatsApp dengan format yang rapi dan lengkap.
                  </p>
                  <button
                    type="submit"
                    className="btn-primary shrink-0 hover:scale-[1.02] transition-transform"
                    id="contact-submit"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Kirim via WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
