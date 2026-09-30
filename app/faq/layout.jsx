import faqData from './faq.json'

export const metadata = {
  title: 'FAQ — Pertanyaan Umum | FokusKonten',
  description: 'Pertanyaan yang sering diajukan tentang software kasir POS, aplikasi Android FokusKonten, lisensi digital, dan dukungan teknis.',
  alternates: { canonical: 'https://fokuskonten.my.id/faq/' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
}

export default function FAQLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}
