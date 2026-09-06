import Link from 'next/link'

export const metadata = {
  title: 'Kebijakan Privasi - Apotek Pro',
  description: 'Kebijakan privasi Aplikasi Apotek Pro — cara data pengumpulan, penggunaan, dan perlindungan data manajemen apotek.',
  alternates: { canonical: 'https://fokuskonten.my.id/aplikasi/apotekpro/privacy' },
}

const sections = [
  {
    title: '1. Informasi yang Dikumpulkan',
    content: [
      'Apotek Pro mengelola data yang Anda masukkan sendiri untuk keperluan manajemen apotek, yaitu: data toko/cabang, data produk dan stok obat, batch serta tanggal kedaluwarsa, data transaksi penjualan, data pelanggan, data resep, dan data keuangan (harga beli, harga jual, pajak, dan laporan laba/rugi).',
      'Seluruh data tersebut disimpan di perangkat Anda dan dienkripsi menggunakan SQLCipher (AES-256). Data tidak dikirim ke server eksternal kecuali Anda mengaktifkan fitur sinkronisasi cloud secara eksplisit.',
    ],
  },
  {
    title: '2. Penggunaan Kamera',
    content: [
      'Aplikasi menggunakan kamera perangkat untuk memindai kode barcode produk obat. Fitur kamera stempel waktu (jika diaktifkan) mengambil foto beserta informasi lokasi dan waktu saat foto diambil. Foto diproses langsung di perangkat dan hanya disimpan sebagai bagian dari catatan Anda.',
    ],
  },
  {
    title: '3. Penggunaan Lokasi',
    content: [
      'Izin lokasi digunakan untuk menyimpan koordinat alamat cabang/toko Anda, menandai lokasi pada foto stempel waktu, dan membantu menemukan printer Bluetooth di sekitar perangkat. Koordinat hanya dipakai untuk tujuan tersebut dan tidak digunakan untuk melacak aktivitas Anda.',
    ],
  },
  {
    title: '4. Penggunaan Bluetooth',
    content: [
      'Izin Bluetooth digunakan untuk menghubungkan aplikasi ke printer struk thermal (ESC/POS) agar dapat mencetak nota penjualan. Koneksi hanya terjadi ketika Anda memilih sendiri perangkat printer dari daftar yang tersedia.',
    ],
  },
  {
    title: '5. Keamanan & Enkripsi',
    content: [
      'Seluruh data tersimpan di database lokal yang dienkripsi menggunakan SQLCipher (AES-256). Aplikasi menyediakan pengunci dengan PIN dan autentikasi biometrik perangkat (sidik jari/face recognition) yang diproses oleh sistem untuk keamanan perangkat, tanpa pernah mengirim PIN atau data biometrik ke server.',
      'Keamanan perangkat Anda tetap menjadi tanggung jawab Anda. Pastikan perangkat selalu terkunci saat tidak digunakan.',
    ],
  },
  {
    title: '6. Sinkronisasi Cloud & Cadangan Data',
    content: [
      'Jika Anda mengaktifkan fitur sinkronisasi atau masuk dengan akun multi-perangkat/cabang, data operasional bisnis (katalog obat, stok, dan transaksi kasir) disinkronkan secara aman ke Server Fokus Konten (api.fokuskonten.my.id) menggunakan enkripsi HTTPS/TLS dan WebSocket.',
      'Untuk berkas cadangan berskala besar (arsip ZIP cadangan dan foto bukti transaksi/stempel waktu), data dicadangkan langsung ke akun Google Drive pribadi Anda melalui otentikasi Google OAuth 2.0 resmi.',
    ],
  },
  {
    title: '7. Akun & Otentikasi',
    content: [
      'Aplikasi mendukung akun pemilik (owner) dan sub-akun (kasir/staf) dengan hak akses berjenjang. Otentikasi akun pengguna dilakukan secara aman melalui Google Sign-In (Firebase Auth) yang dikelola langsung oleh infrastruktur resmi Google.',
    ],
  },
  {
    title: '8. Iklan & Pemantauan Stabilitas',
    content: [
      'Aplikasi dapat menampilkan iklan bagi pengguna non-premium melalui Google AdMob, yang menggunakan ID Iklan (Advertising ID) perangkat sesuai persetujuan privasi sistem Android. Untuk memastikan stabilitas performa dan mendeteksi potensi crash, aplikasi menggunakan Firebase Crashlytics secara anonim tanpa merekam data identitas pribadi.',
    ],
  },
  {
    title: '9. Langganan Premium',
    content: [
      'Fitur premium dan penghapusan batas produk diproses melalui pembelian dalam aplikasi menggunakan Google Play Billing resmi. Seluruh rincian transaksi pembayaran dikelola sepenuhnya oleh Google Play dan tidak pernah diakses atau disimpan oleh server kami.',
    ],
  },
  {
    title: '10. Berbagi Data ke Pihak Ketiga',
    content: [
      'Kami tidak pernah menjual, menyewakan, atau memperdagangkan data bisnis apotek maupun informasi pribadi Anda kepada pihak ketiga manapun. Layanan pihak ketiga resmi yang terintegrasi (Google Play Services, Firebase Auth, Firebase Crashlytics, AdMob, dan Play Integrity) tunduk pada Kebijakan Privasi Google masing-masing.',
    ],
  },
  {
    title: '11. Kebijakan Penghapusan Data (Data Deletion)',
    content: [
      'Pengguna memiliki kendali penuh atas data mereka. Anda dapat menghapus data lokal kapan saja melalui menu pengaturan aplikasi atau dengan menghapus data aplikasi dari sistem Android.',
      'Bagi pengguna yang telah mengaktifkan sinkronisasi akun ke Server Fokus Konten, Anda berhak mengajukan penghapusan akun beserta seluruh data riwayat bisnis di server kami dengan mengirimkan permohonan melalui email resmi ke admin@fokuskonten.my.id. Data akun dan database cloud Anda akan dihapus permanen dalam waktu maksimal 7 hari kerja.',
    ],
  },
  {
    title: '12. Hak Pengguna',
    list: [
      'Mengakses, mengubah, dan mengekspor data apotek Anda kapan saja ke format Excel/CSV',
      'Mencadangkan dan memulihkan data secara mandiri melalui Google Drive pribadi Anda',
      'Mencabut izin kamera, lokasi, Bluetooth, dan notifikasi melalui pengaturan sistem Android kapan saja',
      'Menghapus seluruh database dan akun bisnis baik di perangkat maupun di cloud',
    ],
  },
  {
    title: '13. Perubahan Kebijakan',
    content: [
      'Kebijakan privasi ini dapat diperbarui sewaktu-waktu sejalan dengan pengembangan fitur atau regulasi baru. Setiap perubahan akan diumumkan melalui pembaruan aplikasi dan situs resmi kami. Penggunaan berkelanjutan atas Apotek Pro merupakan persetujuan Anda terhadap ketentuan yang diperbarui.',
    ],
  },
]

export default function ApotekProPrivacyPage() {
  return (
    <section className="pt-28 pb-20">
      <div className="container-page">
        <div className="max-w-3xl mx-auto">
          <span className="label-brand mb-4 inline-block">Legal</span>
          <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-2 text-balance">
            Kebijakan Privasi — Apotek Pro
          </h1>
          <p className="text-neutral-400 text-sm mb-2">
            Berlaku efektif: 6 September 2026
          </p>
          <p className="text-neutral-500 text-sm mb-10">
            Versi 1.0.1 untuk aplikasi <Link href="/aplikasi/apotekpro" className="text-brand-600 hover:underline">Apotek Pro</Link> (com.fokuskonten.apotekpro) yang dikembangkan oleh FokusKonten.
          </p>

          <div className="space-y-4">
            {sections.map((s, i) => (
              <div key={i} className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
                <h2 className="font-display font-semibold text-neutral-800 text-base mb-3">{s.title}</h2>
                {s.content && s.content.map((p, j) => (
                  <p key={j} className="text-neutral-500 text-sm leading-relaxed mb-3 last:mb-0">{p}</p>
                ))}
                {s.list && (
                  <ul className="space-y-2">
                    {s.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-neutral-500 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="rounded-2xl bg-brand-50 border border-brand-100 p-6">
              <h2 className="font-display font-semibold text-brand-700 text-base mb-3">14. Kontak</h2>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi:
              </p>
              <ul className="space-y-2 text-sm">
                <li><span className="text-neutral-400">Email: </span><a href="mailto:admin@fokuskonten.my.id" className="text-brand-600 hover:underline">admin@fokuskonten.my.id</a></li>
                <li><span className="text-neutral-400">WhatsApp: </span><a href="https://wa.me/6285183011318" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">+62 851-8301-1318</a></li>
                <li><span className="text-neutral-400">Syarat &amp; Ketentuan: </span><a href="/aplikasi/apotekpro/terms" className="text-brand-600 hover:underline">Syarat &amp; Ketentuan Apotek Pro</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}