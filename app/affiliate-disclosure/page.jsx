import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Affiliate Disclosure',
  description: 'Disclosure kebijakan afiliasi FokusKonten.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/affiliate-disclosure',
  },
}

export default function AffiliateDisclosurePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20">
          
          <div className="max-w-3xl mx-auto mb-12 animate-fade-up">
            <span className="section-label">Legal</span>
            <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
              Affiliate Disclosure
            </h1>
            <p className="text-charcoal-500 text-sm">
              Last updated: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="max-w-3xl mx-auto prose prose-sm prose-charcoal">
            <section className="mb-10 animate-fade-up delay-100">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Affiliate Relationships</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                FokusKonten participates in various affiliate programs. This means we may earn commissions from purchases made through links on our website.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                This comes at no additional cost to you and helps support our content creation efforts.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-200">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Our Commitment</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                We only recommend products and services that:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li>We have personally used or researched</li>
                <li>We believe provide value to our audience</li>
                <li>Align with our professional standards</li>
              </ul>
              <p className="text-charcoal-600 leading-relaxed mt-4">
                Our editorial content is never influenced by affiliate relationships.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-300">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Identification</h2>
              <p className="text-charcoal-600 leading-relaxed">
                Affiliate links are clearly identified in our content. We maintain transparency about all affiliate relationships.
              </p>
            </section>

            <section className="animate-fade-up delay-400">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Contact</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                For questions about our affiliate relationships:
              </p>
              <div className="space-y-2 text-charcoal-600">
                <p>Email: <a href="mailto:admin@fokuskonten.my.id" className="text-maroon-700 hover:underline">admin@fokuskonten.my.id</a></p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
