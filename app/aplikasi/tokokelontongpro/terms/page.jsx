import Link from 'next/link'

export const metadata = {
  title: 'Syarat & Ketentuan - Kelontong Pro',
  description: 'Syarat dan ketentuan penggunaan Aplikasi Kelontong Pro oleh FokusKonten di Google Play Store.',
  alternates: { canonical: 'https://fokuskonten.my.id/aplikasi/tokokelontongpro/terms' },
}

export default function KelontongProTermsPage() {
  const sections = [
    {
      title: '1. Penerimaan Syarat',
      content: 'Dengan mengunduh, memasang, atau menggunakan Aplikasi Kelontong Pro ("Kelontong Pro"), Anda menyetujui syarat dan ketentuan ini secara penuh. Jika Anda tidak menyetujui sebagian atau seluruh ketentuan ini, kami meminta Anda untuk tidak melanjutkan penggunaan aplikasi.',
    },
    {
      title: '2. Deskripsi Layanan',
      content: 'Kelontong Pro adalah aplikasi software kasir (POS) dan manajemen inventaris toko retail/warung yang menyediakan pencatatan produk, scanner barcode, transaksi penjualan, catatan hutang pelanggan, dan laporan keuangan harian.',
    },
    {
      title: '3. Tanggung Jawab Pengguna',
      content: 'Anda bertanggung jawab penuh atas keakuratan data barang, harga, dan transaksi yang dimasukkan, serta kepatuhan usaha Anda terhadap peraturan perpajakan dan perdagangan yang berlaku di wilayah hukum Anda.',
    },
    {
      title: '4. Data & Cadangan (Backup)',
      content: 'Data disimpan secara lokal di perangkat Anda dan dapat dicadangkan ke Google Drive pribadi atau disinkronkan ke server cloud FokusKonten sesuai pilihan Anda. Kami tidak bertanggung jawab atas kehilangan data yang diakibatkan oleh kerusakan fisik perangkat, kehilangan perangkat, atau penghapusan manual oleh pengguna.',
    },
    {
      title: '5. Akun & Multi-Akun',
      content: 'Aplikasi menyediakan fitur akun pemilik dan sub-akun staf/kasir. Pemilik akun bertanggung jawab penuh atas pengaturan hak akses dan operasional staf yang menggunakan aplikasi.',
    },
    {
      title: '6. Langganan & Pembayaran',
      content: 'Fitur premium dan kuota tanpa batas disediakan melalui pembelian dalam aplikasi (Google Play Billing) resmi Google. Pengelolaan, pembatalan, dan pengembalian dana (refund) mengikuti syarat dan ketentuan resmi Google Play Store.',
    },
    {
      title: '7. Iklan',
      content: 'Kelontong Pro dapat menampilkan iklan melalui Google AdMob untuk pengguna versi gratis. Pengguna dapat berlangganan paket premium untuk menikmati pengalaman penggunaan tanpa iklan.',
    },
    {
      title: '8. Kekayaan Intelektual',
      content: 'Seluruh hak cipta, merek dagang, desain antarmuka, dan kode pemrograman dalam Kelontong Pro adalah hak cipta milik FokusKonten dan dilindungi oleh undang-undang kekayaan intelektual Republik Indonesia.',
    },
    {
      title: '9. Batasan Tanggung Jawab',
      content: 'Sejauh diizinkan oleh hukum yang berlaku, FokusKonten tidak bertanggung jawab atas segala kerugian finansial, kehilangan keuntungan, atau gangguan operasional usaha yang timbul dari penggunaan atau ketidakmampuan menggunakan aplikasi.',
    },
    {
      title: '10. Hukum yang Berlaku',
      content: 'Syarat dan ketentuan ini tunduk dan ditafsirkan berdasarkan hukum Republik Indonesia. Setiap perselisihan yang timbul akan diselesaikan melalui musyawarah atau yurisdiksi pengadilan yang sah.',
    },
    {
      title: '11. Perubahan Syarat',
      content: 'FokusKonten berhak memperbarui syarat dan ketentuan ini sewaktu-waktu. Pembaruan akan dipublikasikan di halaman ini dan pembaruan versi aplikasi.',
    },
  ]

  return (
    <section className="pt-28 pb-20">
      <div className="container-page">
        <div className="max-w-3xl mx-auto">
          <span className="label-brand mb-4 inline-block">Legal</span>
          <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-2">
            Syarat &amp; Ketentuan — Kelontong Pro
          </h1>
          <p className="text-neutral-400 text-sm mb-2">
            Terakhir diperbarui: 6 September 2026
          </p>
          <p className="text-neutral-500 text-sm mb-10">
            Berlaku untuk aplikasi <Link href="/aplikasi/tokokelontongpro" className="text-brand-600 hover:underline">Kelontong Pro</Link> (com.fokuskonten.tokokelontongpro).
          </p>

          <div className="space-y-4">
            {sections.map((s, i) => (
              <div key={i} className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
                <h2 className="font-display font-semibold text-neutral-800 text-base mb-3">{s.title}</h2>
                <p className="text-neutral-500 text-sm leading-relaxed">{s.content}</p>
              </div>
            ))}

            <div className="rounded-2xl bg-brand-50 border border-brand-100 p-6">
              <h2 className="font-display font-semibold text-brand-700 text-base mb-3">12. Kontak</h2>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">Jika Anda memiliki pertanyaan, silakan hubungi:</p>
              <ul className="space-y-2 text-sm">
                <li><span className="text-neutral-400">Email: </span><a href="mailto:admin@fokuskonten.my.id" className="text-brand-600 hover:underline">admin@fokuskonten.my.id</a></li>
                <li><span className="text-neutral-400">WhatsApp: </span><a href="https://wa.me/6285183011318" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">+62 851-8301-1318</a></li>
                <li><span className="text-neutral-400">Kebijakan Privasi: </span><a href="/aplikasi/tokokelontongpro/privacy" className="text-brand-600 hover:underline">Kebijakan Privasi Kelontong Pro</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
