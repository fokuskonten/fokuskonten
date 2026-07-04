import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Disclaimer',
  description: 'Penafian dan batasan tanggung jawab untuk website fokuskonten.my.id, aplikasi Android, dan layanan FokusKonten.',
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
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="max-w-3xl mx-auto prose prose-sm prose-charcoal">
            <section className="mb-10 animate-fade-up delay-100">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Informasi Umum</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Seluruh informasi yang disediakan oleh FokusKonten di website fokuskonten.my.id dan aplikasi Android adalah untuk tujuan informasi dan pendidikan umum. Informasi disediakan dengan itikad baik, namun kami tidak memberikan pernyataan atau jaminan dalam bentuk apa pun, tersurat maupun tersirat, mengenai keakuratan, kecukupan, validitas, keandalan, ketersediaan, atau kelengkapan informasi apa pun.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-200">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Produk Digital</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Produk digital yang disediakan oleh FokusKonten diberikan &quot;sebagaimana adanya&quot; (as is) tanpa jaminan dalam bentuk apa pun. Kami tidak menjamin bahwa produk digital akan bebas dari kesalahan, virus, atau gangguan lainnya.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Pengguna bertanggung jawab untuk memeriksa dan menguji produk sebelum digunakan untuk keperluan komersial atau produksi.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-300">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Aplikasi Android</h2>
              <p className="text-charcoal-600 leading-relaxed">
                Aplikasi Android yang dikembangkan oleh FokusKonten digunakan sepenuhnya atas risiko pengguna. FokusKonten tidak bertanggung jawab atas kerusakan perangkat, kehilangan data, atau masalah lain yang timbul dari penggunaan aplikasi kami. Pengguna disarankan untuk membuat cadangan data sebelum menggunakan aplikasi.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-400">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Tautan Eksternal</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Website dan aplikasi kami dapat memuat tautan ke situs web pihak ketiga yang tidak berada di bawah kendali FokusKonten. Kami tidak memiliki kendali atas sifat, konten, dan ketersediaan situs-situs tersebut.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Penyertaan tautan tidak serta-merta berarti rekomendasi atau dukungan terhadap pandangan yang disampaikan di dalamnya.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-500">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Produk Kerajinan Kayu</h2>
              <p className="text-charcoal-600 leading-relaxed">
                Untuk produk kerajinan tangan berbahan kayu, variasi alami seperti perbedaan serat kayu, warna, tekstur, dan ukuran adalah hal yang wajar dan merupakan ciri khas produk handmade. Hal ini tidak dianggap sebagai cacat atau kerusakan produk.
              </p>
            </section>

            <section className="animate-fade-up delay-600">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Kontak</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Jika Anda memiliki pertanyaan tentang disclaimer ini, silakan hubungi:
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
