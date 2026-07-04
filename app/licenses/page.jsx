import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Licenses',
  description: 'Informasi lisensi dan penggunaan aset digital FokusKonten.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/licenses',
  },
}

export default function LicensesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20">
          
          <div className="max-w-3xl mx-auto mb-12 animate-fade-up">
            <span className="section-label">Legal</span>
            <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
              Licenses
            </h1>
            <p className="text-charcoal-500 text-sm">
              Last updated: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="max-w-3xl mx-auto prose prose-sm prose-charcoal">
            <section className="mb-10 animate-fade-up delay-100">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Software Licenses</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Software developed by FokusKonten is provided under specific licensing agreements depending on the project scope.
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li><strong>Custom Development:</strong> Client retains full ownership of custom software developed under contract.</li>
                <li><strong>Template Products:</strong> Licensed for use on unlimited projects after purchase.</li>
                <li><strong>Open Source Components:</strong> Used under their respective licenses (MIT, Apache, GPL, etc.).</li>
              </ul>
            </section>

            <section className="mb-10 animate-fade-up delay-200">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Digital Products</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Digital products including templates, presets, and assets are licensed as follows:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li><strong>Personal License:</strong> For personal and commercial projects.</li>
                <li><strong>Extended License:</strong> For resale and distribution.</li>
                <li>Redistribution of original files is prohibited.</li>
              </ul>
            </section>

            <section className="mb-10 animate-fade-up delay-300">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Third-Party Licenses</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                This website and our services utilize third-party software and libraries:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li><strong>React & Next.js:</strong> MIT License</li>
                <li><strong>Tailwind CSS:</strong> MIT License</li>
                <li><strong>Google Fonts:</strong> SIL Open Font License</li>
                <li><strong>Other libraries:</strong> As specified in package.json and documentation</li>
              </ul>
            </section>

            <section className="animate-fade-up delay-400">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Contact</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                For licensing inquiries or questions:
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
