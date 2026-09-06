import Link from 'next/link'

export const metadata = {
  title: 'Kebijakan Privasi Resmi | FokusKonten',
  description: 'Kebijakan Privasi resmi FokusKonten — informasi mengenai pengumpulan, perlindungan, dan penggunaan data pengunjung website fokuskonten.my.id dan pengguna lini aplikasi mobile FokusKonten (termasuk 2048 Puzzle Game Legendaris) sesuai standar Google Play Developer Policy.',
  alternates: { canonical: 'https://fokuskonten.my.id/kebijakan-privasi' },
}

const sections = [
  {
    title: '1. Ruang Lingkup & Identitas FokusKonten',
    content: [
      'Kebijakan Privasi ini mengatur bagaimana FokusKonten ("kami", "pengembang") mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi pengguna di seluruh layanan resmi kami, termasuk website fokuskonten.my.id, platform digital, serta lini aplikasi Android resmi yang kami kembangkan dan distribusikan di Google Play Store (termasuk 2048 Puzzle Game Legendaris dengan Package Name: com.fokuskonten.gamepuzzle, Apotek Pro, Kelontong Pro, dan aplikasi lainnya).',
      'Kami berkomitmen penuh untuk menghormati privasi pengguna serta mematuhi seluruh Kebijakan Program Pengembang Google Play (Google Play Developer Program Policies), khususnya ketentuan Kebijakan Data Pengguna (User Data Policy).',
    ],
  },
  {
    title: '2. Informasi yang Dikumpulkan (Data Collection) & Ketentuan Aplikasi Mobile',
    content: [
      'Sesuai dengan ketentuan pada masing-masing aplikasi mobile (.kt) dan standar Google Play Store, pengumpulan dan pemrosesan data diatur sebagai berikut:',
    ],
    list: [
      'Apotek Pro (com.fokuskonten.apotekpro): Mengumpulkan data transaksi penjualan obat, stok obat, data pelanggan, dan data resep dokter untuk keperluan manajemen apotek. Seluruh data disimpan secara lokal di perangkat pengguna dan tidak dikirimkan ke server eksternal tanpa izin pengguna.',
      'Kelontong Pro (com.fokuskonten.tokokelontongpro): Mengumpulkan data transaksi penjualan produk, stok barang, data pelanggan, dan catatan hutang/kasbon piutang untuk keperluan operasional toko retail. Data disimpan secara lokal di perangkat dan tidak dikirimkan ke pihak ketiga.',
      'Penggunaan Kamera: Aplikasi menggunakan kamera perangkat untuk memindai barcode produk dan obat. Data kamera hanya diproses secara real-time di perangkat dan tidak disimpan atau dikirimkan ke pihak ketiga.',
      'Penyimpanan & Enkripsi Data: Semua data bisnis disimpan di database lokal yang dienkripsi menggunakan SQLCipher (AES-256). Pengguna bertanggung jawab atas keamanan perangkat fisik mereka.',
      'Backup Data & Sinkronisasi: Fitur backup memungkinkan pengguna menyimpan salinan data ke penyimpanan internal perangkat, akun Google Drive pribadi, atau Server Fokus Konten (api.fokuskonten.my.id) jika sinkronisasi cloud diaktifkan secara eksplisit oleh pemilik.',
      'Izin Aplikasi (App Permissions): Aplikasi memerlukan izin kamera untuk pemindaian barcode, izin notifikasi untuk pengingat stok dan kedaluwarsa, izin lokasi untuk pencatatan alamat bisnis/koordinat, serta izin Bluetooth untuk menghubungkan printer kasir thermal ESC/POS.',
      'Keamanan Data: Data pengguna diamankan dengan enkripsi lokal AES-256 via SQLCipher. Aplikasi tidak mengirimkan data sensitif ke internet kecuali untuk fitur sinkronisasi cloud yang diaktifkan secara eksplisit oleh pemilik.',
      'ID Iklan & Analitik Stabilitas: Aplikasi gratis menggunakan Google AdMob (Advertising ID) untuk penayangan iklan yang relevan, serta Firebase Crashlytics untuk pemantauan crash log anonim demi stabilitas sistem tanpa merekam data identitas pribadi.',
      'Layanan Website & Kontak: Informasi sukarela yang Anda kirimkan saat menghubungi kami via form kontak, WhatsApp, atau email (nama, email, nomor telepon, dan pesan).',
    ],
  },
  {
    title: '3. Tujuan Penggunaan Informasi',
    list: [
      'Menyediakan, memelihara, dan mengoptimalkan fungsi website dan aplikasi FokusKonten.',
      'Menayangkan iklan seluler yang relevan melalui Google AdMob pada aplikasi yang didukung iklan.',
      'Mendeteksi gangguan teknis, memperbaiki bug/error, dan memastikan kestabilan aplikasi di berbagai perangkat.',
      'Merespons pertanyaan, transaksi aset digital, dan permohonan bantuan teknis pengguna.',
      'Mematuhi ketentuan hukum serta standar kepatuhan ekosistem Google Play Store.',
    ],
  },
  {
    title: '4. Enkripsi dan Keamanan Data Saat Transit (Data Safety & Encryption)',
    content: [
      'Keamanan data Anda merupakan prioritas utama FokusKonten. Sesuai dengan deklarasi Keamanan Data (Data Safety) Google Play kami:',
      'Seluruh transmisi data antara aplikasi/website dengan jaringan pihak ketiga (seperti Google AdMob dan Firebase) dienkripsi saat transit menggunakan protokol kriptografi standar industri yang aman (HTTPS / TLS 1.3). Kami tidak pernah mengumpulkan atau menyimpan informasi pribadi yang sensitif seperti kata sandi, rekening keuangan, data kependudukan, atau lokasi fisik akurat (GPS).',
    ],
  },
  {
    title: '5. Layanan Pihak Ketiga & SDK Terdaftar (Third-Party Services)',
    content: [
      'Aplikasi mobile kami mengintegrasikan Software Development Kit (SDK) resmi pihak ketiga dari Google LLC. Pengguna dapat meninjau kebijakan privasi masing-masing penyedia layanan secara langsung:',
    ],
    links: [
      {
        name: 'Google Play Services',
        url: 'https://policies.google.com/privacy',
        desc: 'Layanan autentikasi sistem dan kompatibilitas Android',
      },
      {
        name: 'Google AdMob',
        url: 'https://support.google.com/admob/answer/6128543?hl=id',
        desc: 'Layanan penayangan iklan seluler Google',
      },
      {
        name: 'Google Firebase Analytics & Crashlytics',
        url: 'https://firebase.google.com/policies/analytics',
        desc: 'Diagnostik performa dan pemantauan error aplikasi',
      },
    ],
  },
  {
    title: '6. Privasi Anak-Anak (Children\'s Privacy / COPPA Compliance)',
    content: [
      'Layanan kami dan aplikasi seperti 2048 Puzzle ditujukan untuk audiens umum dari segala usia. Kami tidak secara sengaja mengumpulkan informasi identitas pribadi (Personally Identifiable Information) dari anak-anak di bawah usia 13 tahun (atau batas usia yang berlaku di yurisdiksi Anda).',
      'Jika orang tua atau wali mengetahui bahwa anak di bawah 13 tahun telah memberikan data pribadi tanpa persetujuan, silakan hubungi kami di admin@fokuskonten.my.id. Kami akan segera mengambil langkah untuk menghapus informasi tersebut dari sistem kami.',
    ],
  },
  {
    title: '7. Retensi Data dan Mekanisme Permintaan Penghapusan Data (Data Deletion Request)',
    content: [
      'Masa Retensi: Data diagnostik dan analitik disimpan oleh pihak ketiga (Google) sesuai batas retensi standarnya (berkisar antara 2 hingga 14 bulan) sebelum dihapus secara otomatis.',
      'Mekanisme Permintaan Penghapusan: Setiap pengguna berhak mengajukan penghapusan data atau riwayat yang tersimpan:',
      '1. Melalui Email Resmi: Kirimkan permohonan ke admin@fokuskonten.my.id dengan subjek "Permintaan Penghapusan Data - [Nama Aplikasi]". Permohonan akan diverifikasi dan diselesaikan dalam waktu maksimal 7 (tujuh) hari kerja tanpa biaya.',
      '2. Reset Data Lokal Game/Aplikasi: Di dalam game 2048 Puzzle, Anda dapat membuka menu Pengaturan > pilih "Hapus Semua Skor Tinggi", atau melalui pengaturan Android: Pengaturan > Aplikasi > 2048 Puzzle > Penyimpanan > Hapus Data.',
      '3. Reset ID Iklan (AAID): Anda dapat mereset atau menonaktifkan personalisasi iklan kapan saja melalui perangkat Android: Pengaturan > Google > Iklan > Reset ID Iklan atau Hapus ID Iklan.',
    ],
  },
  {
    title: '8. Penggunaan Cookie Website',
    content: [
      'Website fokuskonten.my.id menggunakan cookie untuk meningkatkan pengalaman navigasi, memelihara sesi pengguna, dan menganalisis traffic situs secara agregat. Anda dapat mengelola atau menonaktifkan preferensi cookie melalui pengaturan browser Anda sewaktu-waktu.',
    ],
  },
  {
    title: '9. Pembaruan Kebijakan Privasi',
    content: [
      'Kami dapat memperbarui Kebijakan Privasi ini secara berkala guna menyesuaikan dengan pengembangan layanan, pembaruan aplikasi, atau regulasi hukum dan kebijakan Google Play yang berlaku. Setiap pembaruan akan dipublikasikan pada halaman ini dengan tanggal efektif yang disesuaikan.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-32 pb-24 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 min-h-screen">
      <div className="container-page">
        <div className="max-w-3xl mx-auto">
          {/* Badge Kategori FokusKonten */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm">
            <span>🛡️ Legal &amp; Kepatuhan Data</span>
          </div>

          <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-950 font-extrabold tracking-tight mb-4 text-balance">
            Kebijakan Privasi Resmi
          </h1>

          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
            Pernyataan transparansi FokusKonten mengenai perlindungan data pribadi pengunjung situs web resmi dan pengguna seluruh lini aplikasi mobile FokusKonten.
          </p>

          {/* Kotak Identitas Resmi Aplikasi & Developer */}
          <div className="rounded-2xl bg-white border border-neutral-200/80 shadow-card p-5 sm:p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-neutral-600 font-semibold block uppercase text-[11px] tracking-wider mb-1">Pengembang Resmi</span>
              <span className="font-bold text-neutral-950 text-base">FokusKonten</span>
            </div>
            <div>
              <span className="text-neutral-600 font-semibold block uppercase text-[11px] tracking-wider mb-1">Domain Resmi</span>
              <a href="https://fokuskonten.my.id" className="font-bold text-brand-600 hover:underline text-base">fokuskonten.my.id</a>
            </div>
            <div>
              <span className="text-neutral-600 font-semibold block uppercase text-[11px] tracking-wider mb-1">Aplikasi Terdaftar Play Store</span>
              <span className="font-semibold text-neutral-800">Apotek Pro, Kelontong Pro, 2048 Puzzle, BacaQur&apos;an</span>
            </div>
            <div>
              <span className="text-neutral-600 font-semibold block uppercase text-[11px] tracking-wider mb-1">Tanggal Berlaku</span>
              <span className="font-semibold text-neutral-800">1 Januari 2026 (Diperbarui 6 Sep 2026)</span>
            </div>
          </div>

          {/* Konten Bagian-Bagian Kebijakan */}
          <div className="space-y-6">
            {sections.map((s, i) => (
              <div key={i} className="rounded-2xl bg-white border border-neutral-200/70 shadow-card p-6 sm:p-7 transition-all duration-200 hover:border-neutral-300">
                <h2 className="font-display font-bold text-neutral-900 text-base sm:text-lg mb-3">
                  {s.title}
                </h2>
                {s.content && s.content.map((p, j) => (
                  <p key={j} className="text-neutral-600 text-sm leading-relaxed mb-3 last:mb-0">{p}</p>
                ))}
                {s.list && (
                  <ul className="space-y-2.5 mt-3 pl-1">
                    {s.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-neutral-600 text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.links && (
                  <div className="mt-4 pt-3 border-t border-neutral-100 space-y-2">
                    <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">Tautan Kebijakan SDK Mitra:</span>
                    {s.links.map((link, k) => (
                      <div key={k} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-xs gap-1.5 sm:gap-4">
                        <span className="font-semibold text-neutral-800">{link.name} — <span className="font-normal text-neutral-500">{link.desc}</span></span>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-brand-600 hover:text-brand-700 font-semibold underline shrink-0"
                        >
                          Kebijakan Resmi ↗
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Kartu Kontak Resmi */}
            <div className="rounded-2xl bg-neutral-950 text-white p-6 sm:p-8 shadow-xl">
              <h2 className="font-display font-bold text-white text-lg sm:text-xl mb-2">
                10. Kontak Pengembang &amp; Bantuan Privasi
              </h2>
              <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                Apabila Anda memiliki pertanyaan, klarifikasi kepatuhan, atau mengajukan permohonan penghapusan data terkait website maupun aplikasi kami, silakan hubungi saluran resmi FokusKonten:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                  <span className="text-neutral-400 text-xs block mb-1">Email Resmi</span>
                  <a href="mailto:admin@fokuskonten.my.id" className="text-brand-400 hover:underline font-semibold">
                    admin@fokuskonten.my.id
                  </a>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                  <span className="text-neutral-400 text-xs block mb-1">WhatsApp Developer</span>
                  <a href="https://wa.me/6285183011318" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline font-semibold">
                    +62 851-8301-1318
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
