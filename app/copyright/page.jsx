import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Copyright',
  description: 'Informasi hak cipta dan penggunaan konten FokusKonten.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/copyright',
  },
}

export default function CopyrightPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20">
          
          <div className="max-w-3xl mx-auto mb-12 animate-fade-up">
            <span className="section-label">Legal</span>
            <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
              Copyright
            </h1>
            <p className="text-charcoal-500 text-sm">
              Last updated: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="max-w-3xl mx-auto prose prose-sm prose-charcoal">
            <section className="mb-10 animate-fade-up delay-100">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Ownership</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                All content on this website, including but not limited to text, graphics, logos, images, software, and code, is the property of FokusKonten or its content suppliers and is protected by international copyright laws.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-200">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Permitted Use</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                You may use our content for:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li>Personal, non-commercial purposes</li>
                <li>Educational purposes with proper attribution</li>
                <li>Social media sharing with credit to FokusKonten</li>
              </ul>
            </section>

            <section className="mb-10 animate-fade-up delay-300">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Prohibited Use</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                You may not:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li>Reproduce or distribute content without permission</li>
                <li>Use content for commercial purposes without license</li>
                <li>Modify or create derivative works without authorization</li>
                <li>Remove copyright notices or attributions</li>
              </ul>
            </section>

            <section className="animate-fade-up delay-400">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Contact</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                For copyright inquiries or permissions:
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
