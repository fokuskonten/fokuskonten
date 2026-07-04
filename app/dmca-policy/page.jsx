import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Kebijakan DMCA',
  description: 'Kebijakan DMCA (Digital Millennium Copyright Act) untuk website fokuskonten.my.id dan aplikasi Android FokusKonten.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/dmca-policy',
  },
}

export default function DmcaPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20">

          <div className="max-w-3xl mx-auto mb-12 animate-fade-up">
            <span className="section-label">Legal</span>
            <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
              Kebijakan DMCA
            </h1>
            <p className="text-charcoal-500 text-sm">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="max-w-3xl mx-auto prose prose-sm prose-charcoal">
            <section className="mb-10 animate-fade-up delay-100">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Penghormatan terhadap Hak Cipta</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                FokusKonten menghormati hak kekayaan intelektual pihak lain dan berkomitmen untuk mematuhi ketentuan Digital Millennium Copyright Act (DMCA) serta peraturan perundang-undangan hak cipta yang berlaku di Indonesia.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Jika Anda yakin bahwa konten di website fokuskonten.my.id atau aplikasi Android FokusKonten melanggar hak cipta Anda, silakan ajukan pemberitahuan DMCA kepada kami.
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-200">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Cara Mengajukan Pemberitahuan DMCA</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Kirim pemberitahuan tertulis ke alamat email kami dengan menyertakan informasi berikut:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li>Identifikasi karya berhak cipta yang diduga dilanggar</li>
                <li>Bukti kepemilikan hak cipta atau wewenang untuk bertindak atas nama pemilik hak cipta</li>
                <li>Nama, alamat, nomor telepon, dan alamat email Anda</li>
                <li>Pernyataan bahwa Anda memiliki itikad baik bahwa penggunaan konten tersebut tidak diizinkan oleh pemilik hak cipta</li>
                <li>Pernyataan bahwa informasi dalam pemberitahuan ini akurat</li>
                <li>Tanda tangan fisik atau elektronik Anda</li>
              </ul>
              <p className="text-charcoal-600 leading-relaxed mt-4">
                Kirim pemberitahuan ke: <a href="mailto:admin@fokuskonten.my.id" className="text-maroon-700 hover:underline">admin@fokuskonten.my.id</a>
              </p>
            </section>

            <section className="mb-10 animate-fade-up delay-300">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Counter-Notification</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Jika Anda yakin bahwa konten Anda telah dihapus atau dinonaktifkan akibat kesalahan atau salah identifikasi, Anda dapat mengajukan counter-notification dengan menyertakan:
              </p>
              <ul className="list-disc list-inside text-charcoal-600 leading-relaxed mt-3 space-y-2">
                <li>Identifikasi konten yang telah dihapus atau dinonaktifkan</li>
                <li>Pernyataan di bawah sumpah bahwa Anda memiliki itikad baik bahwa konten dihapus akibat kesalahan</li>
                <li>Nama, alamat, dan tanda tangan Anda</li>
                <li>Persetujuan terhadap yurisdiksi pengadilan di Indonesia</li>
              </ul>
            </section>

            <section className="animate-fade-up delay-400">
              <h2 className="font-display font-semibold text-xl text-charcoal-900 mb-4">Hukum yang Berlaku</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Kebijakan DMCA ini tunduk pada hukum Republik Indonesia serta ketentuan DMCA Amerika Serikat sepanjang relevan dengan platform digital.
              </p>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                Untuk pertanyaan lebih lanjut, silakan hubungi:
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
