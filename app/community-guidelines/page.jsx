import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Community Guidelines',
  description: 'Panduan komunitas untuk interaksi di platform FokusKonten.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/community-guidelines',
  },
}

export default function CommunityGuidelinesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20">
          
          <div className="max-w-3xl mx-auto mb-12 animate-fade-up">
            <span className="section-label">Legal</span>
            <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
              Community Guidelines
            </h1>
            <p className="text-charcoal-500 text-sm">
              Last updated: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="max-w-3xl mx-auto prose prose-sm prose-charcoal">
            <section className="mb-10 animate-fade-up delay-100">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Our Values</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                FokusKonten fosters a respectful, inclusive, and professional community. We expect all members to:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li>Treat others with respect and courtesy</li>
                <li>Share knowledge constructively</li>
                <li>Respect intellectual property</li>
                <li>Maintain professional communication</li>
              </ul>
            </section>

            <section className="mb-10 animate-fade-up delay-200">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Prohibited Behavior</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                The following are not allowed:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li>Harassment, hate speech, or discrimination</li>
                <li>Spam or unsolicited promotions</li>
                <li>Copyright infringement</li>
                <li>Sharing harmful or illegal content</li>
                <li>Impersonation or false representation</li>
              </ul>
            </section>

            <section className="mb-10 animate-fade-up delay-300">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Enforcement</h2>
              <p className="text-charcoal-600 leading-relaxed">
                Violations of these guidelines may result in content removal, account suspension, or banning from our community.
              </p>
            </section>

            <section className="animate-fade-up delay-400">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Contact</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                To report guideline violations:
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
