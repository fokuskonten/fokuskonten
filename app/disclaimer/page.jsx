import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Disclaimer',
  description: 'Penafian dan batasan tanggung jawab untuk website dan layanan FokusKonten.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/disclaimer',
  },
}

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20">
          
          <div className="max-w-3xl mx-auto mb-12 animate-fade-up">
            <span className="section-label">Legal</span>
            <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
              Disclaimer
            </h1>
            <p className="text-charcoal-500 text-sm">
              Last updated: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="max-w-3xl mx-auto prose prose-sm prose-charcoal">
            <section className="mb-10 animate-fade-up delay-100">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">General Disclaimer</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                The information provided by FokusKonten on this website is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the Site.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-200">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Professional Services</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                While we strive to provide high-quality services, we do not guarantee specific results. Project outcomes may vary based on client requirements, external factors, and other variables beyond our control.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-300">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">External Links</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Through this website you may be able to link to other websites which are not under the control of FokusKonten. We have no control over the nature, content and availability of those sites.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-400">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Technical Accuracy</h2>
              <p className="text-charcoal-600 leading-relaxed">
                Technical information, tutorials, and guides are provided for educational purposes. Always test thoroughly in your specific environment before implementation in production.
              </p>
            </section>

            <section className="animate-fade-up delay-500">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Contact</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                If you have any questions about this disclaimer:
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
