import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan privasi FokusKonten — informasi tentang pengumpulan, penggunaan, dan perlindungan data pribadi pengunjung website fokuskonten.my.id dan pengguna aplikasi Android FokusKonten.',
}

const sections = [
  {
    title: '1. Informasi yang Dikumpulkan',
    content: [
      'Kami mengumpulkan informasi yang Anda berikan secara sukarela saat menghubungi kami melalui formulir kontak, email, atau WhatsApp. Informasi tersebut dapat mencakup nama, alamat email, nomor telepon, dan pesan yang Anda kirimkan.',
      'Untuk aplikasi Android yang dikembangkan oleh FokusKonten dan tersedia di Google Play Store, kami dapat mengumpulkan informasi perangkat seperti model perangkat, versi sistem operasi, dan ID iklan (Advertising ID) melalui layanan Google AdMob untuk keperluan iklan dan analitik.',
      'Kami juga dapat mengumpulkan informasi non-pribadi secara otomatis seperti alamat IP, jenis browser, halaman yang dikunjungi, dan data analitik lainnya untuk meningkatkan pengalaman pengguna.',
    ],
  },
  {
    title: '2. Penggunaan Informasi',
    listTitle: 'Informasi yang kami kumpulkan digunakan untuk:',
    list: [
      'Menanggapi pertanyaan, permintaan, atau pesan yang Anda kirimkan',
      'Mengirimkan informasi terkait layanan dan pembaruan',
      'Meningkatkan kualitas website dan aplikasi Android',
      'Keperluan analitik dan statistik pengguna',
      'Menampilkan iklan yang relevan melalui Google AdMob',
      'Mematuhi kewajiban hukum yang berlaku',
    ],
  },
  {
    title: '3. Cookie',
    content: [
      'Website fokuskonten.my.id menggunakan cookie untuk meningkatkan pengalaman pengguna, menganalisis traffic, dan untuk keperluan iklan (Google AdSense). Cookie adalah file kecil yang disimpan di perangkat Anda. Anda dapat mengatur preferensi cookie melalui pengaturan browser Anda.',
      'Pihak ketiga, termasuk Google, menggunakan cookie untuk menayangkan iklan berdasarkan kunjungan sebelumnya ke website ini atau website lain. Anda dapat memilih untuk tidak menerima iklan yang dipersonalisasi melalui pengaturan iklan Google.',
    ],
  },
  {
    title: '4. Google AdMob',
    content: [
      'Aplikasi Android FokusKonten menggunakan Google AdMob untuk menampilkan iklan. AdMob dapat mengumpulkan ID iklan (Advertising ID) perangkat Anda serta data penggunaan aplikasi untuk menayangkan iklan yang relevan.',
      'Data yang dikumpulkan oleh AdMob tidak digunakan untuk mengidentifikasi pengguna secara pribadi. Anda dapat mereset ID iklan Anda kapan saja melalui pengaturan Google Play di perangkat Android Anda.',
    ],
  },
  {
    title: '5. Pihak Ketiga',
    content: [
      'Kami dapat membagikan informasi Anda dengan pihak ketiga yang tepercaya untuk tujuan tertentu, termasuk Google (AdSense dan AdMob), penyedia hosting, dan layanan analitik. Pihak ketiga ini memiliki kebijakan privasi mereka sendiri dan diwajibkan untuk melindungi data Anda.',
      'Kami tidak menjual informasi pribadi Anda kepada pihak ketiga mana pun.',
    ],
  },
  {
    title: '6. Hak Anda',
    listTitle: 'Anda memiliki hak untuk:',
    list: [
      'Meminta akses ke data pribadi yang kami simpan',
      'Meminta koreksi atau penghapusan data pribadi',
      'Menolak penggunaan data untuk tujuan pemasaran',
      'Menarik persetujuan kapan saja',
      'Mengajukan keluhan kepada otoritas perlindungan data yang berwenang',
    ],
  },
  {
    title: '7. Keamanan Data',
    content: [
      'Kami berkomitmen untuk melindungi informasi pribadi Anda. Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk mencegah akses tidak sah, perubahan, pengungkapan, atau penghancuran data pribadi.',
      'Namun, tidak ada metode transmisi data melalui internet atau metode penyimpanan elektronik yang 100% aman. Kami tidak dapat menjamin keamanan absolut data Anda.',
    ],
  },
  {
    title: '8. Perubahan Kebijakan',
    content: [
      'Kebijakan privasi ini dapat diperbarui sewaktu-waktu. Perubahan akan diumumkan melalui halaman ini. Dengan terus menggunakan website dan aplikasi kami setelah perubahan, Anda menyetujui kebijakan yang diperbarui.',
      'Kami menyarankan Anda untuk meninjau halaman ini secara berkala untuk mengetahui perubahan terbaru.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 sm:pt-40 pb-24" aria-label="Kebijakan privasi">
          <div className="container-max section px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

              {/* Header */}
              <div className="mb-12 animate-fade-up">
                <span className="section-label">Legal</span>
                <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mb-3 text-balance">
                  Kebijakan Privasi{' '}
                  <span className="text-maroon-gradient">FokusKonten</span>
                </h1>
                <p className="text-charcoal-400 text-sm">Berlaku efektif: 1 Januari 2026</p>
              </div>

              {/* Sections */}
              <div className="space-y-6">
                {sections.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-6 bg-white border border-black/[0.04] shadow-mature animate-scale-in"
                  >
                    <h2 className="font-display font-semibold text-charcoal-800 text-base mb-4">{s.title}</h2>
                    {s.content && (
                      <div className="space-y-3">
                        {s.content.map((p, j) => (
                          <p key={j} className="text-charcoal-500 text-sm leading-relaxed">{p}</p>
                        ))}
                      </div>
                    )}
                    {s.listTitle && (
                      <p className="text-charcoal-500 text-sm leading-relaxed mb-3">{s.listTitle}</p>
                    )}
                    {s.list && (
                      <ul className="space-y-2">
                        {s.list.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-charcoal-500 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-maroon-700 shrink-0 mt-1.5" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Contact Section */}
                <div
                  className="rounded-xl p-6 bg-maroon-50 border border-maroon-100 shadow-mature animate-scale-in"
                >
                  <h2 className="font-display font-semibold text-maroon-700 text-base mb-4">9. Kontak</h2>
                  <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
                    Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <span className="text-charcoal-500">Email: </span>
                      <a href="mailto:admin@fokuskonten.my.id" className="text-maroon-700 hover:underline">
                        admin@fokuskonten.my.id
                      </a>
                    </li>
                    <li>
                      <span className="text-charcoal-500">WhatsApp: </span>
                      <a href="https://wa.me/6285183011318" target="_blank" rel="noopener noreferrer" className="text-maroon-700 hover:underline">
                        +62 851-8301-1318
                      </a>
                    </li>
                    <li>
                      <span className="text-charcoal-500">Website: </span>
                      <a href="https://fokuskonten.my.id" target="_blank" rel="noopener noreferrer" className="text-maroon-700 hover:underline">
                        fokuskonten.my.id
                      </a>
                    </li>
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
