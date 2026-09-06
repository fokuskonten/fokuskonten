import Link from 'next/link'

export const metadata = {
  title: 'Kebijakan Privasi - Kelontong Pro',
  description: 'Kebijakan privasi Aplikasi Kelontong Pro — cara pengumpulan, penggunaan, dan perlindungan data manajemen toko kelontong dan warung retail.',
  alternates: { canonical: 'https://fokuskonten.my.id/aplikasi/tokokelontongpro/privacy' },
}

const sections = [
  {
    title: '1. Informasi yang Dikumpulkan',
    content: [
      'Kelontong Pro mengelola data yang Anda masukkan sendiri untuk keperluan operasional warung, toko kelontong, atau retail UMKM, yaitu: data toko/cabang, data katalog produk dagangan, barcode/SKU produk, data transaksi kasir penjualan, data pelanggan, catatan hutang/kasbon piutang, dan laporan laba/rugi harian.',
      'Seluruh data tersebut disimpan secara lokal di perangkat Anda dan dienkripsi menggunakan Room SQLite dengan SQLCipher (AES-256). Data tidak dikirimkan ke server pihak ketiga tanpa persetujuan eksplisit dari Anda.',
    ],
  },
  {
    title: '2. Penggunaan Kamera',
    content: [
      'Aplikasi menggunakan kamera perangkat sebagai pemindai (scanner) barcode kemasan produk secara instan dan fitur kamera stempel waktu untuk dokumentasi barang masuk. Kamera hanya memproses gambar secara lokal pada perangkat tanpa menyimpannya ke server eksternal.',
    ],
  },
  {
    title: '3. Penggunaan Lokasi',
    content: [
      'Izin lokasi digunakan untuk menandai koordinat alamat toko pada profil usaha, bukti stempel waktu, serta membantu mendeteksi printer Bluetooth di sekitar perangkat. Lokasi tidak digunakan untuk pelacakan latar belakang (background tracking).',
    ],
  },
  {
    title: '4. Penggunaan Bluetooth',
    content: [
      'Izin Bluetooth digunakan untuk menghubungkan aplikasi ke printer kasir thermal (ESC/POS 58mm atau 80mm) guna mencetak struk nota belanja pelanggan secara instan tanpa kabel.',
    ],
  },
  {
    title: '5. Keamanan & Enkripsi',
    content: [
      'Semua database transaksi dan persediaan toko dilindungi dengan enkripsi SQLCipher (AES-256) berstandar industri. Aplikasi juga dilengkapi proteksi kunci PIN dan autentikasi biometrik lokal (sidik jari) untuk mengamankan akses kasir.',
    ],
  },
  {
    title: '6. Sinkronisasi Cloud & Cadangan Data',
    content: [
      'Jika Anda mengaktifkan fitur sinkronisasi akun multi-perangkat/cabang, data operasional bisnis (katalog barang, stok, dan mutasi penjualan) disinkronkan secara aman ke Server Fokus Konten (api.fokuskonten.my.id) menggunakan enkripsi HTTPS/TLS dan WebSocket.',
      'Untuk berkas cadangan berskala besar (arsip ZIP cadangan data dan foto bukti), data dicadangkan langsung ke akun Google Drive pribadi Anda melalui otentikasi Google OAuth 2.0 resmi.',
    ],
  },
  {
    title: '7. Akun & Otentikasi',
    content: [
      'Aplikasi mendukung akun pemilik toko (owner) dan staf/kasir dengan kontrol hak akses. Otentikasi dilakukan secara aman menggunakan Google Sign-In (Firebase Auth) resmi dari Google.',
    ],
  },
  {
    title: '8. Iklan & Pemantauan Stabilitas',
    content: [
      'Aplikasi dapat menampilkan iklan bagi pengguna versi gratis melalui Google AdMob sesuai izin ID Iklan (Advertising ID). Untuk memelihara kehandalan sistem, aplikasi menyertakan Firebase Crashlytics guna merekam crash log anonim tanpa data pribadi pengguna.',
    ],
  },
  {
    title: '9. Langganan Premium',
    content: [
      'Upgrade fitur tanpa batas dan fitur pro diproses secara aman melalui Google Play Billing resmi. Seluruh data penagihan dikelola langsung oleh sistem Google Play Store.',
    ],
  },
  {
    title: '10. Berbagi Data ke Pihak Ketiga',
    content: [
      'Kami tidak pernah menjual atau membagikan data riwayat toko, omzet, maupun pelanggan Anda kepada pihak ketiga. Layanan eksternal resmi yang terpasang (Google Play Services, Firebase Auth, Crashlytics, AdMob, Play Integrity) tunduk pada Kebijakan Privasi resmi Google.',
    ],
  },
  {
    title: '11. Kebijakan Penghapusan Data (Data Deletion)',
    content: [
      'Anda berhak menghapus data lokal toko Anda kapan saja melalui tombol reset database di pengaturan aplikasi atau membersihkan penyimpanan aplikasi di setelan Android.',
      'Bagi pengguna yang telah menghubungkan akun ke Server Fokus Konten, Anda dapat mengajukan penghapusan akun cloud dan seluruh data server dengan mengirimkan email ke admin@fokuskonten.my.id. Data akan dihapus permanen dalam waktu maksimal 7 hari kerja.',
    ],
  },
  {
    title: '12. Hak Pengguna',
    list: [
      'Mengakses, mengedit, dan mengekspor seluruh data stok dan transaksi ke Excel/CSV',
      'Membuat cadangan mandiri dan memulihkan database via Google Drive',
      'Mencabut izin kamera, Bluetooth, notifikasi, dan lokasi di setelan Android kapan saja',
      'Menghapus seluruh akun dan data riwayat toko secara permanen',
    ],
  },
  {
    title: '13. Perubahan Kebijakan',
    content: [
      'Kebijakan privasi ini dapat diperbarui sewaktu-waktu. Pembaruan akan diumumkan di situs ini dan melalui aplikasi. Penggunaan berkelanjutan atas Kelontong Pro menandakan persetujuan Anda terhadap versi terbaru.',
    ],
  },
]

export default function KelontongProPrivacyPage() {
  return (
    <section className="pt-28 pb-20">
      <div className="container-page">
        <div className="max-w-3xl mx-auto">
          <span className="label-brand mb-4 inline-block">Legal</span>
          <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-2 text-balance">
            Kebijakan Privasi — Kelontong Pro
          </h1>
          <p className="text-neutral-400 text-sm mb-2">
            Berlaku efektif: 6 September 2026
          </p>
          <p className="text-neutral-500 text-sm mb-10">
            Versi 1.0.0 untuk aplikasi <Link href="/aplikasi/tokokelontongpro" className="text-brand-600 hover:underline">Kelontong Pro</Link> (com.fokuskonten.tokokelontongpro) yang dikembangkan oleh FokusKonten.
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
                <li><span className="text-neutral-400">Syarat &amp; Ketentuan: </span><a href="/aplikasi/tokokelontongpro/terms" className="text-brand-600 hover:underline">Syarat &amp; Ketentuan Kelontong Pro</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
