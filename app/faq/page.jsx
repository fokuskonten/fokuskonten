'use client'

import { useState } from 'react'
import Link from 'next/link'
import faqData from './faq.json'

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
        isOpen
          ? 'border-neutral-900 shadow-md ring-1 ring-neutral-900/5'
          : 'border-neutral-200/80 shadow-sm hover:border-neutral-400'
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer select-none"
        aria-expanded={isOpen}
      >
        <span className="font-display font-semibold text-sm sm:text-base text-neutral-900 pr-3 leading-snug">
          {question}
        </span>
        <span
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isOpen ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-500'
          }`}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 border-t border-neutral-100">
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleIndex = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <>
      <section className="pt-28 sm:pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-page">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 mb-8 font-mono">
            <Link href="/" className="hover:text-neutral-900 transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">Bantuan &amp; FAQ</span>
          </nav>

          {/* Main 12-Column Layout: Left Sticky Info + Right Vertical Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
            
            {/* Left: Sticky Title, Description & Support Card (5 cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="label-brand mb-3 inline-block">Bantuan &amp; Tanya Jawab</span>
              <h1 className="heading-xl text-3xl sm:text-4xl lg:text-[2.5rem] text-neutral-900 mb-4 text-balance">
                Pertanyaan yang Sering <span className="text-gradient-brand">Diajukan</span>
              </h1>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-8">
                Temukan jawaban praktis seputar keandalan arsitektur offline-first, privasi data, lisensi beli putus tanpa langganan, dan pembuatan software FokusKonten.
              </p>

              {/* Direct Support Card */}
              <div className="rounded-3xl bg-neutral-950 text-white p-6 sm:p-7 shadow-xl border border-neutral-800">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-neutral-300">Bantuan Langsung</span>
                </div>
                <h3 className="heading-md text-base sm:text-lg text-white mb-2">
                  Konsultasi Gratis via WhatsApp
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-5">
                  Tim kami siap menjawab pertanyaan teknis, mendiskusikan fitur aplikasi kasir, maupun pembuatan software baru untuk usaha Anda.
                </p>
                <div className="flex flex-col gap-2.5">
                  <a
                    href="https://wa.me/6285183011318"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl font-display font-semibold text-xs text-neutral-950 bg-white hover:bg-neutral-100 transition-all shadow-md"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat WhatsApp (+62 851-8301-1318)
                  </a>
                  <a
                    href="mailto:admin@fokuskonten.my.id"
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-display font-semibold text-xs text-neutral-950 bg-white hover:bg-neutral-100 transition-all shadow-md"
                  >
                    Kirim Email Resmi (admin@fokuskonten.my.id)
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Clean, Orderly Vertical Stack of Questions (7 cols) */}
            <div className="lg:col-span-7 space-y-3.5">
              {faqData.map((item, i) => (
                <FAQItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === i}
                  onClick={() => toggleIndex(i)}
                />
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
