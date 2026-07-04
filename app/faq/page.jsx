'use client'

import { useState } from 'react'
import faqData from './faq.json'

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-card overflow-hidden transition-all duration-200">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display font-semibold text-sm text-neutral-900 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
          <p className="text-neutral-500 text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <>
      <section className="pt-28 pb-20">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="label-brand mb-4 inline-block">FAQ</span>
            <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-6">
              Pertanyaan <span className="text-gradient-brand">Umum</span>
            </h1>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-lg mx-auto">
              Temukan jawaban atas pertanyaan yang sering diajukan tentang FokusKonten dan aplikasi Android kami.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqData.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
