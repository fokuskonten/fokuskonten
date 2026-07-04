import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Kebijakan Pengembalian Dana',
  description: 'Kebijakan pengembalian dana untuk produk digital dan layanan FokusKonten.',
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
              Kebijakan Pengembalian Dana
            </h1>
            <p className="text-charcoal-500 text-sm">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="max-w-3xl mx-auto prose prose-sm prose-charcoal">
            <section className="mb-10 animate-fade-up delay-100">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Produk Digital</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Karena sifat produk digital yang dapat diunduh dan disalin, produk digital FokusKonten bersifat non-refundable setelah berhasil diunduh atau diakses oleh pembeli.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Pengecualian diberikan jika file yang dikirim rusak (corrupted) atau salah jenis. Dalam kasus tersebut, FokusKonten akan memberikan penggantian file yang benar.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-200">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Layanan Kustom</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Untuk layanan kustom (pembuatan aplikasi, desain, fotografi, videografi, dan konten), pengembalian dana dibahas secara case-by-case tergantung pada:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li>Tingkat penyelesaian proyek</li>
                <li>Pelanggaran terhadap kesepakatan awal</li>
                <li>Kualitas hasil kerja yang tidak sesuai spesifikasi</li>
                <li>Kesepakatan bersama antara kedua belah pihak</li>
              </ul>
            </section>

            <section className="mb-10 animate-fade-up delay-300">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Cara Mengajukan</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Untuk mengajukan permohonan pengembalian dana atau penggantian file, silakan hubungi kami melalui:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li>Email: <a href="mailto:admin@fokuskonten.my.id" className="text-maroon-700 hover:underline">admin@fokuskonten.my.id</a></li>
                <li>WhatsApp: <a href="https://wa.me/6285183011318" className="text-maroon-700 hover:underline" target="_blank" rel="noopener noreferrer">+62 851-8301-1318</a></li>
              </ul>
              <p className="text-charcoal-600 leading-relaxed mt-4">
                Sertakan detail pesanan, bukti pembayaran, dan alasan pengajuan. Kami akan merespons dalam waktu maksimal 1x24 jam.
              </p>
            </section>

            <section className="animate-fade-up delay-400">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Kontak</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Untuk pertanyaan lebih lanjut tentang kebijakan pengembalian dana:
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
