import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Editorial Policy',
  description: 'Kebijakan editorial untuk konten blog dan publikasi FokusKonten.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/editorial-policy',
  },
}

export default function EditorialPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20">
          
          <div className="max-w-3xl mx-auto mb-12 animate-fade-up">
            <span className="section-label">Legal</span>
            <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
              Editorial Policy
            </h1>
            <p className="text-charcoal-500 text-sm">
              Last updated: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="max-w-3xl mx-auto prose prose-sm prose-charcoal">
            <section className="mb-10 animate-fade-up delay-100">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Our Mission</h2>
              <p className="text-charcoal-600 leading-relaxed">
                FokusKonten is committed to providing accurate, helpful, and professionally curated content about Android development, creative design, photography, videography, and digital content creation.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-200">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Content Standards</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                All content published on our platform adheres to:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li>Accuracy and factual correctness</li>
                <li>Professional tone and language</li>
                <li>Proper attribution of sources</li>
                <li>Regular updates to maintain relevance</li>
              </ul>
            </section>

            <section className="mb-10 animate-fade-up delay-300">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Editorial Independence</h2>
              <p className="text-charcoal-600 leading-relaxed">
                Our editorial content is independent and not influenced by external parties. Sponsored content is clearly labeled as such.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-400">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Corrections</h2>
              <p className="text-charcoal-600 leading-relaxed">
                If you find errors in our content, please contact us. We will review and correct verified mistakes promptly.
              </p>
            </section>

            <section className="animate-fade-up delay-500">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Contact</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                For editorial matters:
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
