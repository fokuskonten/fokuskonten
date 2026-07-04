import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Syarat & Ketentuan',
  description: 'Syarat dan ketentuan penggunaan website fokuskonten.my.id dan aplikasi Android FokusKonten.',
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
              Syarat & Ketentuan
            </h1>
            <p className="text-charcoal-500 text-sm">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto prose prose-sm prose-charcoal">
            <section className="mb-10 animate-fade-up delay-100">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">1. Ketentuan Umum</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Dengan mengakses dan menggunakan website fokuskonten.my.id serta aplikasi Android yang dikembangkan oleh FokusKonten, Anda menyetujui untuk terikat dengan syarat dan ketentuan berikut.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Jika Anda tidak menyetujui sebagian atau seluruh syarat ini, harap tidak menggunakan website atau aplikasi kami.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-200">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">2. Produk Digital</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Produk digital yang dibeli dari FokusKonten (seperti template, desain, kode, dan aset digital lainnya) bersifat non-refundable setelah diunduh atau diakses.
              </p>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Semua produk digital dilindungi hak cipta dan tidak boleh didistribusikan kembali, dijual kembali, atau dibagikan kepada pihak lain tanpa izin tertulis dari FokusKonten.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Pelanggaran terhadap ketentuan ini dapat mengakibatkan tindakan hukum sesuai dengan peraturan perundang-undangan yang berlaku di Indonesia.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-300">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">3. Aplikasi Android</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Aplikasi Android FokusKonten tersedia di Google Play Store dan tunduk pada Persyaratan Layanan Google Play serta kebijakan Google Play Console.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Pengguna bertanggung jawab penuh atas penggunaan aplikasi di perangkat masing-masing. FokusKonten tidak bertanggung jawab atas kerusakan atau kehilangan data akibat penggunaan aplikasi.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-400">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">4. Hak Kekayaan Intelektual</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Seluruh konten, fitur, dan fungsi di website dan aplikasi FokusKonten merupakan milik eksklusif FokusKonten dan dilindungi oleh undang-undang hak cipta serta kekayaan intelektual Indonesia.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Ini mencakup namun tidak terbatas pada teks, grafik, logo, desain, gambar, perangkat lunak, dan kode.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-500">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">5. Layanan Kustom</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Untuk layanan kustom seperti pembuatan aplikasi, desain, fotografi, videografi, dan pembuatan konten, ketentuan spesifik akan dibahas dan disepakati bersama sebelum pekerjaan dimulai.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Biaya, jadwal pengerjaan, dan ruang lingkup pekerjaan akan dituangkan dalam perjanjian terpisah antara FokusKonten dan klien.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-600">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">6. Pembayaran</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Semua transaksi dilakukan dalam mata uang Rupiah (IDR). FokusKonten menerima pembayaran melalui:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li>Transfer Bank: BCA, Mandiri, BRI, BNI</li>
                <li>E-Wallet: GoPay, OVO, DANA, LinkAja</li>
              </ul>
              <p className="text-charcoal-600 leading-relaxed mt-4">
                Pembayaran harus dilunasi sesuai dengan kesepakatan sebelum produk atau layanan diberikan, kecuali disepakati lain.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-700">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">7. Batasan Tanggung Jawab</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                FokusKonten tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, khusus, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan website, aplikasi, atau layanan kami.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Ini mencakup namun tidak terbatas pada kehilangan keuntungan, data, penggunaan, reputasi, atau kerugian tidak berwujud lainnya.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-800">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">8. Hukum yang Berlaku</h2>
              <p className="text-charcoal-600 leading-relaxed">
                Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-900">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">9. Perubahan Syarat</h2>
              <p className="text-charcoal-600 leading-relaxed">
                FokusKonten berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Penggunaan website atau aplikasi secara berkelanjutan setelah perubahan merupakan bentuk penerimaan Anda terhadap syarat yang baru.
              </p>
            </section>

            <section className="animate-fade-up delay-1000">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">10. Kontak</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi:
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
