'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const faqCategories = [
  {
    id: 'general',
    title: 'Umum',
    questions: [
      {
        q: 'Apa itu FokusKonten?',
        a: 'FokusKonten adalah studio kreatif digital yang bergerak di bidang Android Development, Creative Design, Fotografi & Videografi, dan Content Creation. Kami membantu klien mengembangkan solusi digital yang fungsional dan estetis.'
      },
      {
        q: 'Berapa lama pengalaman FokusKonten?',
        a: 'FokusKonten telah beroperasi selama lebih dari 5 tahun dengan menangani berbagai proyek digital untuk klien dari berbagai industri.'
      },
      {
        q: 'Di mana lokasi FokusKonten?',
        a: 'FokusKonten berbasis di Indonesia dan melayani klien secara online di seluruh Indonesia maupun internasional.'
      },
    ]
  },
  {
    id: 'services',
    title: 'Layanan',
    questions: [
      {
        q: 'Bagaimana cara memesan layanan?',
        a: 'Anda dapat menghubungi kami melalui WhatsApp di +62 851-8301-1318 atau melalui form kontak di website. Kami akan mendiskusikan kebutuhan Anda dan memberikan penawaran.'
      },
      {
        q: 'Berapa lama waktu pengerjaan proyek?',
        a: 'Waktu pengerjaan bervariasi tergantung kompleksitas proyek. Untuk estimasi lebih akurat, silakan diskusikan kebutuhan Anda dengan kami.'
      },
      {
        q: 'Apakah ada garansi untuk layanan?',
        a: 'Ya, kami memberikan periode support untuk setiap proyek sesuai dengan kesepakatan kontrak. Detail garansi akan dijelaskan dalam proposal.'
      },
      {
        q: 'Apakah source code diberikan?',
        a: 'Untuk proyek custom development, source code lengkap akan diberikan kepada klien sesuai dengan kesepakatan kontrak.'
      },
    ]
  },
  {
    id: 'products',
    title: 'Produk',
    questions: [
      {
        q: 'Kapan produk digital akan tersedia?',
        a: 'Produk digital kami sedang dalam tahap pengembangan. Ikuti media sosial kami untuk mendapatkan notifikasi saat produk tersedia.'
      },
      {
        q: 'Apakah ada lisensi untuk produk?',
        a: 'Setiap produk akan memiliki ketentuan lisensi yang jelas. Lisensi personal dan extended akan tersedia sesuai kebutuhan penggunaan.'
      },
      {
        q: 'Bagaimana cara mendapatkan update produk?',
        a: 'Update produk akan tersedia untuk pembeli sesuai dengan ketentuan lisensi masing-masing produk.'
      },
    ]
  },
  {
    id: 'payment',
    title: 'Pembayaran',
    questions: [
      {
        q: 'Metode pembayaran apa yang diterima?',
        a: 'Kami menerima pembayaran melalui transfer bank dan e-wallet. Detail akan diberikan dalam invoice.'
      },
      {
        q: 'Bagaimana sistem pembayaran untuk proyek?',
        a: 'Sistem pembayaran biasanya dibagi menjadi beberapa tahap: DP (down payment) saat awal proyek, pembayaran tengah, dan pelunasan saat handover.'
      },
      {
        q: 'Apakah ada invoice resmi?',
        a: 'Ya, kami menyediakan invoice resmi untuk setiap transaksi sesuai permintaan.'
      },
    ]
  },
  {
    id: 'support',
    title: 'Support',
    questions: [
      {
        q: 'Bagaimana cara mendapatkan support?',
        a: 'Anda dapat menghubungi kami melalui WhatsApp atau email untuk mendapatkan support. Response time kami adalah 1-2 hari kerja.'
      },
      {
        q: 'Apakah ada biaya tambahan untuk support?',
        a: 'Support dalam periode garansi adalah gratis. Untuk support tambahan di luar periode garansi, akan ada biaya sesuai dengan kompleksitas masalah.'
      },
      {
        q: 'Apakah training disediakan?',
        a: 'Training dapat disediakan sesuai permintaan dan akan dikenakan biaya tambahan. Detail akan didiskusikan dalam proposal.'
      },
    ]
  },
]

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState('general')
  const [openQuestion, setOpenQuestion] = useState(null)

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        
        {/* Header */}
        <section className="section border-t border-black/[0.04] bg-canvas-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <span className="section-label">FAQ</span>
              <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Frequently Asked <span className="text-maroon-gradient">Questions</span>
              </h1>
              <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed">
                Pertanyaan yang sering diajukan tentang layanan dan produk FokusKonten.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-8 animate-fade-up delay-100">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => { setOpenCategory(category.id); setOpenQuestion(null) }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      openCategory === category.id
                        ? 'bg-maroon-700 text-white'
                        : 'bg-white text-charcoal-600 hover:bg-canvas-50 border border-black/[0.05]'
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>

              {/* Questions */}
              <div className="space-y-3 animate-fade-up delay-200">
                {faqCategories.find(c => c.id === openCategory)?.questions.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-black/[0.05] shadow-subtle overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-canvas-50 transition-colors"
                      aria-expanded={openQuestion === index}
                    >
                      <span className="font-medium text-charcoal-900 pr-4">{faq.q}</span>
                      <svg
                        className={`w-5 h-5 text-maroon-700 shrink-0 transition-transform ${
                          openQuestion === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openQuestion === index && (
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-charcoal-600 text-sm leading-relaxed pt-2 border-t border-black/[0.04]">
                          {faq.a}
                        </p>
                      </div>
                    )}
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
                Masih Ada Pertanyaan?
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed mb-6">
                Jangan ragu untuk menghubungi kami. Tim kami siap membantu menjawab pertanyaan Anda.
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
        </section>

      </main>
      <Footer />
    </>
  )
}
