import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Kebijakan Cookie',
  description: 'Kebijakan penggunaan cookie di website fokuskonten.my.id oleh FokusKonten.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/cookie-policy',
  },
}

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20">

          <div className="max-w-3xl mx-auto mb-12 animate-fade-up">
            <span className="section-label">Legal</span>
            <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
              Kebijakan Cookie
            </h1>
            <p className="text-charcoal-500 text-sm">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="max-w-3xl mx-auto prose prose-sm prose-charcoal">
            <section className="mb-10 animate-fade-up delay-100">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Apa Itu Cookie</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Cookie adalah file teks kecil yang ditempatkan di perangkat Anda saat Anda mengunjungi website. Cookie membantu kami memberikan pengalaman yang lebih baik dengan mengingat preferensi Anda dan memahami bagaimana Anda menggunakan situs kami.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-200">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Bagaimana Kami Menggunakan Cookie</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Kami menggunakan cookie untuk berbagai tujuan, termasuk:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li><strong>Preferensi:</strong> Mengingat pengaturan dan preferensi Anda</li>
                <li><strong>Analitik:</strong> Memahami bagaimana pengunjung menggunakan website kami</li>
                <li><strong>Iklan:</strong> Menampilkan iklan yang relevan melalui Google AdSense dan AdMob</li>
              </ul>
            </section>

            <section className="mb-10 animate-fade-up delay-300">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Jenis Cookie yang Digunakan</h2>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li><strong>Cookie Esensial:</strong> Diperlukan untuk website berfungsi dengan baik. Tanpa cookie ini, beberapa fitur mungkin tidak dapat diakses.</li>
                <li><strong>Cookie Analitik:</strong> Membantu kami memahami pola penggunaan website untuk meningkatkan layanan.</li>
                <li><strong>Cookie Iklan:</strong> Digunakan untuk menampilkan iklan yang relevan dan mengukur efektivitas kampanye iklan.</li>
              </ul>
            </section>

            <section className="mb-10 animate-fade-up delay-400">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Cookie Pihak Ketiga</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Kami menggunakan layanan pihak ketiga yang juga menempatkan cookie di perangkat Anda, termasuk:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li><strong>Google (AdSense, Analytics, AdMob):</strong> Untuk iklan dan analitik</li>
                <li><strong>Blogger:</strong> Untuk layanan blog yang mungkin tertanam di website</li>
              </ul>
              <p className="text-charcoal-600 leading-relaxed mt-4">
                Setiap pihak ketiga memiliki kebijakan cookie mereka sendiri yang dapat Anda pelajari di situs masing-masing.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-500">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Mengelola Cookie</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Anda dapat mengontrol dan mengelola cookie melalui pengaturan browser Anda. Sebagian besar browser memungkinkan Anda untuk menolak atau menghapus cookie.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Perhatikan bahwa menonaktifkan cookie tertentu dapat memengaruhi fungsionalitas website kami.
              </p>
            </section>

            <section className="animate-fade-up delay-600">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Kontak</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Jika Anda memiliki pertanyaan tentang kebijakan cookie ini, silakan hubungi:
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
