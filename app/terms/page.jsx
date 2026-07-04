import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Terms & Conditions',
  description: 'Syarat dan ketentuan penggunaan website dan layanan FokusKonten.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/terms',
  },
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto mb-12 animate-fade-up">
            <span className="section-label">Legal</span>
            <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-charcoal-500 text-sm">
              Last updated: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto prose prose-sm prose-charcoal">
            <section className="mb-10 animate-fade-up delay-100">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">1. Introduction</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Welcome to FokusKonten. By accessing and using this website and our services, you agree to comply with and be bound by the following terms and conditions of use.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                If you disagree with any part of these terms, please do not use our website or services.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-200">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">2. Use License</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials on FokusKonten&apos;s website for personal, non-commercial transitory viewing only.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Remove any copyright or other proprietary notations</li>
                <li>Transfer the materials to another person</li>
              </ul>
            </section>

            <section className="mb-10 animate-fade-up delay-300">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">3. Services</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                FokusKonten provides various digital services including Android development, creative design, photography, videography, and content creation.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Specific terms may apply to individual services. These will be provided separately before service engagement.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-400">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">4. User Accounts</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                If you create an account on our website, you are responsible for maintaining the confidentiality of your account information.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                You agree to accept responsibility for all activities that occur under your account or password.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-500">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">5. Intellectual Property</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                All content, features, and functionality on this website are the exclusive property of FokusKonten.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                This includes but is not limited to text, graphics, logos, designs, images, software, and code.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-600">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                In no event shall FokusKonten be liable for any indirect, incidental, special, consequential or punitive damages.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                This includes but is not limited to loss of profits, data, use, goodwill, or other intangible losses resulting from your use of our services.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-700">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">7. Governing Law</h2>
              <p className="text-charcoal-600 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of Indonesia, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-800">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">8. Changes to Terms</h2>
              <p className="text-charcoal-600 leading-relaxed">
                FokusKonten reserves the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="animate-fade-up delay-900">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">9. Contact</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="space-y-2 text-charcoal-600">
                <p>Email: <a href="mailto:admin@fokuskonten.my.id" className="text-maroon-700 hover:underline">admin@fokuskonten.my.id</a></p>
                <p>WhatsApp: <a href="https://wa.me/6285183011318" className="text-maroon-700 hover:underline" target="_blank" rel="noopener noreferrer">+62 851-8301-1318</a></p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
