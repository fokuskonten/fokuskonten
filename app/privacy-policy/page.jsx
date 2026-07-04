import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan privasi FokusKonten — Informasi tentang pengumpulan, penggunaan, dan perlindungan data pribadi.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="container-custom section-padding">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase">Kebijakan Privasi</span>
                <h1 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-white text-balance">
                  Kebijakan Privasi <span className="gradient-text">FokusKonten</span>
                </h1>
                <p className="mt-4 text-dark-200 text-sm">Terakhir diperbarui: 4 Juli 2026</p>
              </div>

              <div className="prose prose-invert prose-sm max-w-none space-y-6 text-dark-200">
                <div className="glass-card p-6">
                  <h2 className="text-white font-display font-semibold text-lg mb-3">1. Informasi yang Dikumpulkan</h2>
                  <p className="leading-relaxed">
                    Kami mengumpulkan informasi yang Anda berikan secara sukarela saat menghubungi kami melalui formulir kontak, email, atau WhatsApp. Informasi tersebut dapat mencakup nama, alamat email, nomor telepon, dan pesan yang Anda kirimkan.
                  </p>
                  <p className="leading-relaxed mt-3">
                    Kami juga dapat mengumpulkan informasi non-pribadi secara otomatis seperti alamat IP, jenis browser, halaman yang dikunjungi, dan data analitik lainnya untuk meningkatkan pengalaman pengguna.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <h2 className="text-white font-display font-semibold text-lg mb-3">2. Penggunaan Informasi</h2>
                  <p className="leading-relaxed">Informasi yang kami kumpulkan digunakan untuk:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Menanggapi pertanyaan, permintaan, atau pesan yang Anda kirimkan</li>
                    <li>Mengirimkan informasi terkait layanan dan pembaruan</li>
                    <li>Meningkatkan kualitas website dan layanan</li>
                    <li>Keperluan analitik dan statistik pengunjung</li>
                    <li>Mematuhi kewajiban hukum yang berlaku</li>
                  </ul>
                </div>

                <div className="glass-card p-6">
                  <h2 className="text-white font-display font-semibold text-lg mb-3">3. Penggunaan Cookie</h2>
                  <p className="leading-relaxed">
                    Website ini menggunakan cookie untuk meningkatkan pengalaman pengguna, menganalisis traffic, dan untuk keperluan iklan (Google AdSense). Cookie adalah file kecil yang disimpan di perangkat Anda. Anda dapat mengatur preferensi cookie melalui pengaturan browser Anda.
                  </p>
                  <p className="leading-relaxed mt-3">
                    Pihak ketiga, termasuk Google, menggunakan cookie untuk menayangkan iklan berdasarkan kunjungan sebelumnya ke website ini atau website lain. Anda dapat memilih untuk tidak menerima iklan yang dipersonalisasi melalui pengaturan iklan Google.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <h2 className="text-white font-display font-semibold text-lg mb-3">4. Google AdSense</h2>
                  <p className="leading-relaxed">
                    Website ini menggunakan Google AdSense untuk menampilkan iklan. Google AdSense menggunakan cookie DART (DoubleClick for Publishers) untuk menayangkan iklan yang relevan berdasarkan kunjungan Anda ke website ini dan website lain di internet.
                  </p>
                  <p className="leading-relaxed mt-3">
                    Anda dapat mempelajari lebih lanjut tentang praktik privasi Google di <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent-400 hover:underline">halaman Kebijakan Privasi Google</a>.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <h2 className="text-white font-display font-semibold text-lg mb-3">5. Perlindungan Data</h2>
                  <p className="leading-relaxed">
                    Kami berkomitmen untuk melindungi informasi pribadi Anda. Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk mencegah akses tidak sah, perubahan, pengungkapan, atau penghancuran data pribadi.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <h2 className="text-white font-display font-semibold text-lg mb-3">6. Hak Anda</h2>
                  <p className="leading-relaxed">Anda memiliki hak untuk:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Meminta akses ke data pribadi yang kami simpan</li>
                    <li>Meminta koreksi atau penghapusan data pribadi</li>
                    <li>Menolak penggunaan data untuk tujuan pemasaran</li>
                    <li>Menarik persetujuan kapan saja</li>
                  </ul>
                </div>

                <div className="glass-card p-6">
                  <h2 className="text-white font-display font-semibold text-lg mb-3">7. Perubahan Kebijakan</h2>
                  <p className="leading-relaxed">
                    Kebijakan privasi ini dapat diperbarui sewaktu-waktu. Perubahan akan diumumkan melalui halaman ini. Dengan terus menggunakan website ini setelah perubahan, Anda menyetujui kebijakan yang diperbarui.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <h2 className="text-white font-display font-semibold text-lg mb-3">8. Kontak</h2>
                  <p className="leading-relaxed">
                    Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>Email: <a href="mailto:admin@fokuskonten.my.id" className="text-accent-400 hover:underline">admin@fokuskonten.my.id</a></li>
                    <li>WhatsApp: <a href="https://wa.me/6285183011318" target="_blank" rel="noopener noreferrer" className="text-accent-400 hover:underline">+62 851-8301-1318</a></li>
                    <li>Website: <a href="https://fokuskonten.my.id" target="_blank" rel="noopener noreferrer" className="text-accent-400 hover:underline">fokuskonten.my.id</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
