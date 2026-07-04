import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Refund Policy',
  description: 'Kebijakan pengembalian dana untuk produk dan layanan FokusKonten.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/refund-policy',
  },
}

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20">
          
          <div className="max-w-3xl mx-auto mb-12 animate-fade-up">
            <span className="section-label">Legal</span>
            <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
              Refund Policy
            </h1>
            <p className="text-charcoal-500 text-sm">
              Last updated: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="max-w-3xl mx-auto prose prose-sm prose-charcoal">
            <section className="mb-10 animate-fade-up delay-100">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Digital Products</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Due to the nature of digital products, refunds are generally not offered once the product has been downloaded or accessed.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Exceptions may be made if the product is significantly different from its description or is non-functional.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-200">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Services</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                For custom development and creative services, refunds are handled on a case-by-case basis depending on:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li>Project completion status</li>
                <li>Breach of contract terms</li>
                <li>Quality of deliverables</li>
                <li>Mutual agreement between parties</li>
              </ul>
            </section>

            <section className="mb-10 animate-fade-up delay-300">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Refund Process</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                To request a refund, please contact us with:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li>Your order details</li>
                <li>Reason for refund request</li>
                <li>Any relevant documentation</li>
              </ul>
              <p className="text-charcoal-600 leading-relaxed mt-4">
                Refund requests are typically processed within 7-14 business days.
              </p>
            </section>

            <section className="animate-fade-up delay-400">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Contact</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                For refund inquiries:
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
