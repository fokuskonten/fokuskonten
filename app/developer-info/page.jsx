import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Info Pengembang',
  description: 'Informasi pengembang aplikasi Android FokusKonten — Muharie, untuk keperluan Google Play Console dan kepatuhan AdMob.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/developer-info',
  },
}

export default function DeveloperInfoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20">

          <div className="max-w-3xl mx-auto mb-12 animate-fade-up">
            <span className="section-label">Informasi</span>
            <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
              Info Pengembang
            </h1>
          </div>

          <div className="max-w-3xl mx-auto prose prose-sm prose-charcoal">
            <section className="mb-10 animate-fade-up delay-100">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Identitas Pengembang</h2>
              <div className="space-y-2 text-charcoal-600">
                <p><strong>Nama:</strong> Muharie (FokusKonten)</p>
                <p><strong>Email:</strong> <a href="mailto:admin@fokuskonten.my.id" className="text-maroon-700 hover:underline">admin@fokuskonten.my.id</a></p>
                <p><strong>Website:</strong> <a href="https://fokuskonten.my.id" className="text-maroon-700 hover:underline" target="_blank" rel="noopener noreferrer">fokuskonten.my.id</a></p>
                <p><strong>Alamat:</strong> Indonesia</p>
                <p><strong>WhatsApp:</strong> <a href="https://wa.me/6285183011318" className="text-maroon-700 hover:underline" target="_blank" rel="noopener noreferrer">+62 851-8301-1318</a></p>
              </div>
            </section>

            <section className="mb-10 animate-fade-up delay-200">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Tentang Pengembang</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Muharie (FokusKonten) adalah pengembang aplikasi Android yang berfokus pada pengembangan aplikasi berkualitas tinggi dan kepatuhan terhadap kebijakan Google Play Console serta Google AdMob.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Kami berkomitmen untuk menghadirkan aplikasi yang aman, andal, dan sesuai dengan standar industri terbaru.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-300">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Kepatuhan Google Play Console</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Seluruh aplikasi Android FokusKonten dikembangkan sesuai dengan kebijakan Google Play Console, termasuk kebijakan privasi pengguna, keamanan data, dan persyaratan iklan.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Setiap aplikasi dilengkapi dengan kebijakan privasi yang jelas dan transparan mengenai pengumpulan serta penggunaan data pengguna.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-400">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Kepatuhan Google AdMob</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Aplikasi FokusKonten yang menampilkan iklan menggunakan Google AdMob dan mematuhi kebijakan AdMob, termasuk:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li>Kebijakan privasi yang menjelaskan penggunaan ID iklan</li>
                <li>Kepatuhan terhadap kebijakan konten iklan</li>
                <li>Pengaturan iklan yang sesuai dengan usia pengguna</li>
                <li>Transparansi dalam pengumpulan data</li>
              </ul>
            </section>

            <section className="animate-fade-up delay-500">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Kebijakan Privasi</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Untuk informasi lebih lanjut tentang bagaimana kami mengelola data pengguna, silakan lihat kebijakan privasi kami:
              </p>
              <p>
                <Link href="/privacy-policy" className="text-maroon-700 hover:underline">
                  Kebijakan Privasi FokusKonten
                </Link>
              </p>
            </section>

            <section className="animate-fade-up delay-600">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Kontak</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Untuk keperluan bisnis, kerja sama, atau pertanyaan terkait aplikasi:
              </p>
              <div className="space-y-2 text-charcoal-600">
                <p>Email: <a href="mailto:admin@fokuskonten.my.id" className="text-maroon-700 hover:underline">admin@fokuskonten.my.id</a></p>
                <p>WhatsApp: <a href="https://wa.me/6285183011318" className="text-maroon-700 hover:underline" target="_blank" rel="noopener noreferrer">+62 851-8301-1318</a></p>
                <p>Website: <a href="https://fokuskonten.my.id" className="text-maroon-700 hover:underline" target="_blank" rel="noopener noreferrer">fokuskonten.my.id</a></p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
