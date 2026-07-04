import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan privasi FokusKonten — informasi tentang pengumpulan, penggunaan, dan perlindungan data pribadi pengunjung website.',
}

const sections = [
  {
    title: '1. Informasi yang Dikumpulkan',
    content: [
      'Kami mengumpulkan informasi yang Anda berikan secara sukarela saat menghubungi kami melalui formulir kontak, email, atau WhatsApp. Informasi tersebut dapat mencakup nama, alamat email, nomor telepon, dan pesan yang Anda kirimkan.',
      'Kami juga dapat mengumpulkan informasi non-pribadi secara otomatis seperti alamat IP, jenis browser, halaman yang dikunjungi, dan data analitik lainnya untuk meningkatkan pengalaman pengguna.',
    ],
  },
  {
    title: '2. Penggunaan Informasi',
    listTitle: 'Informasi yang kami kumpulkan digunakan untuk:',
    list: [
      'Menanggapi pertanyaan, permintaan, atau pesan yang Anda kirimkan',
      'Mengirimkan informasi terkait layanan dan pembaruan',
      'Meningkatkan kualitas website dan layanan',
      'Keperluan analitik dan statistik pengunjung',
      'Mematuhi kewajiban hukum yang berlaku',
    ],
  },
  {
    title: '3. Penggunaan Cookie',
    content: [
      'Website ini menggunakan cookie untuk meningkatkan pengalaman pengguna, menganalisis traffic, dan untuk keperluan iklan (Google AdSense). Cookie adalah file kecil yang disimpan di perangkat Anda. Anda dapat mengatur preferensi cookie melalui pengaturan browser Anda.',
      'Pihak ketiga, termasuk Google, menggunakan cookie untuk menayangkan iklan berdasarkan kunjungan sebelumnya ke website ini atau website lain. Anda dapat memilih untuk tidak menerima iklan yang dipersonalisasi melalui pengaturan iklan Google.',
    ],
  },
  {
    title: '4. Google AdSense',
    content: [
      'Website ini menggunakan Google AdSense untuk menampilkan iklan. Google AdSense menggunakan cookie DART (DoubleClick for Publishers) untuk menayangkan iklan yang relevan berdasarkan kunjungan Anda ke website ini dan website lain di internet.',
    ],
  },
  {
    title: '5. Perlindungan Data',
    content: [
      'Kami berkomitmen untuk melindungi informasi pribadi Anda. Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk mencegah akses tidak sah, perubahan, pengungkapan, atau penghancuran data pribadi.',
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
    ],
  },
  {
    title: '7. Perubahan Kebijakan',
    content: [
      'Kebijakan privasi ini dapat diperbarui sewaktu-waktu. Perubahan akan diumumkan melalui halaman ini. Dengan terus menggunakan website ini setelah perubahan, Anda menyetujui kebijakan yang diperbarui.',
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
                <p className="text-charcoal-400 text-sm">Terakhir diperbarui: 4 Juli 2026</p>
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
                  <h2 className="font-display font-semibold text-maroon-700 text-base mb-4">8. Kontak</h2>
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
