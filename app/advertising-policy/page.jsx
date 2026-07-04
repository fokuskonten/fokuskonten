import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Advertising Policy',
  description: 'Kebijakan periklanan dan sponsorship di FokusKonten.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/advertising-policy',
  },
}

export default function AdvertisingPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20">
          
          <div className="max-w-3xl mx-auto mb-12 animate-fade-up">
            <span className="section-label">Legal</span>
            <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
              Advertising Policy
            </h1>
            <p className="text-charcoal-500 text-sm">
              Last updated: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="max-w-3xl mx-auto prose prose-sm prose-charcoal">
            <section className="mb-10 animate-fade-up delay-100">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Advertising Standards</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                FokusKonten accepts advertising that aligns with our values and is relevant to our audience in technology, design, and creative industries.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                All advertisements must be truthful, not misleading, and comply with applicable laws.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-200">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Sponsored Content</h2>
              <p className="text-charcoal-600 leading-relaxed">
                Sponsored content is clearly labeled as such to maintain transparency with our audience. Editorial independence is maintained in all sponsored content.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-300">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Affiliate Links</h2>
              <p className="text-charcoal-600 leading-relaxed">
                When we use affiliate links, we disclose this clearly. We only recommend products and services we genuinely believe in.
              </p>
            </section>

            <section className="animate-fade-up delay-400">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Contact</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                For advertising inquiries:
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
