import Link from 'next/link'

export const metadata = {
  title: 'Syarat & Ketentuan - Apotek Pro',
  description: 'Syarat dan ketentuan penggunaan Aplikasi Apotek Pro oleh FokusKonten di Google Play Store.',
  alternates: { canonical: 'https://fokuskonten.my.id/aplikasi/apotekpro/terms' },
}

export default function ApotekProTermsPage() {
  const sections = [
    {
      title: '1. Penerimaan Syarat',
      content: 'Dengan mengunduh, memasang, atau menggunakan Aplikasi Apotek Pro ("Apotek Pro"), Anda menyetujui syarat dan ketentuan ini. Jika tidak menyetujui sebagian atau seluruh syarat ini, kami meminta Anda untuk tidak melanjutkan penggunaan aplikasi.',
    },
    {
      title: '2. Deskripsi Layanan',
      content: 'Apotek Pro adalah aplikasi manajemen apotek yang menyediakan pencatatan stok obat, transaksi penjualan (POS), data pelanggan, dan laporan keuangan. Aplikasi ini adalah alat bantu pengelolaan dan bukan pengganti sistem atau kewajiban yang diatur oleh peraturan perundangan di bidang kefarmasian.',
    },
    {
      title: '3. Tanggung Jawab Pengguna',
      content: 'Anda bertanggung jawab penuh atas keakuratan data yang dimasukkan, kepatuhan usaha Anda terhadap peraturan kefarmasian dan perpajakan yang berlaku, serta penggunaan medis informasi yang tersimpan. FokusKonten tidak memberikan saran medis, resep, atau rekomendasi mengenai penggunaan obat.',
    },
    {
      title: '4. Data & Back Memory',
      content: 'Data disimpan di perangkat Anda dan dapat dicadangkan ke penyimpanan local atau disinkronkan ke cloud sesuai pilihan Anda. Kami tidak bertanggung jawab atas kehilangan data yang diwakili oleh perangkat yang rusak, hilang, atau terhapus karena wanat pengguna. Pastikan Anda melakukan pencadangan (backup) secara berkala.',
    },
    {
      title: '5. Akun & Multi-Akun',
      content: 'Fitur akun pemilik dan sub-akun disediakan untuk membagi hak akses. Pemilik akun bertanggung jawab penuh terhadap konfigurasi izin dan peran yang diberikan kepada setiap pengguna sub-akun.',
    },
    {
      title: '6. Langganan & Pembayaran',
      content: 'Fitur premium disediakan melalui langganan pembelian dalam aplikasi (Google Play Billing) dan dikelola oleh Google. Langganan secara otomatis akan diperbarui sesuai kebijakan Google. Pembatalan langganan dilakukan melalui akun Google Play Anda. Refund mengikuti kebijakan Google Play dan tidak ditangani langsung oleh kami.',
    },
    {
      title: '7. Iklan',
      content: 'Apotek Pro dapat menampilkan iklan dari Google AdMob. Ketersediaan tanpa iklan dapat diperoleh melalui langganan premium sesuai ketentuan yang berlaku.',
    },
    {
      title: '8. Kekayaan Intelektual',
      content: 'Seluruh hak cipta, merek, dan kekayaan intelektual dalam Ap May Pro adalah milik Fokuskonten dan dilindungi oleh undang-undang. Anda tidak diperkenankan meniru, mereverse engineer, mengubah, atau mengganti byteode aplikasi tanpa izin tertulis.',
    },
    {
      title: '9. Batasan Tanggung Jawab',
      content: 'Sejauh diizinkan hukum yang berlaku, FokusKonten yang mekanisme bertanggung jawab atas kerugian langsung, tidak langsung, insidental, khusus, atau konsekuensial, termasuk kehilangan data atau keuntungan, yang timbul dari penggunaan atau ketidakmampuan menggunakan aplikasi. Aplikasi diberikan "sebagaimana adanya" (as is) tanpa jaminan.',
    },
    {
      title: '10. Hukum yang Berlaku',
      content: 'Syarat dan ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia. Adapun permufakatan, forum hukum yang relevan adalah wilayah hukum tempat sahnya FokusKonten beroperasi.',
    },
    {
      title: '11. Perubahan Syarat',
      content: 'FokusKonten berhak mengubah syarat dan ketentuan ini sewaktu-waktu dengan memperhatikannya pada halaman ini dan pembaruan aplikasi. Penggunaan kelanjutan merupakan bentuk penerimaan Anda terhadap syarat yang baru.',
    },
  ]

  return (
    <section className="pt-28 pb-20">
      <div className="container-page">
        <div className="max-w-3xl mx-auto">
          <span className="label-brand mb-4 inline-block">Legal</span>
          <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-2">
            Syarat &amp; Ketentuan — Apotek Pro
          </h1>
          <p className="text-neutral-400 text-sm mb-2">
            Terakhir diperbarui: 1 Juli 2026
          </p>
          <p className="text-neutral-500 text-sm mb-10">
            Berlaku untuk aplikasi <Link href="/aplikasi/apotekpro" className="text-brand-600 hover:underline">Apotek Pro</Link> (com.fokuskonten.apotekpro).
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
                <li><span className="text-neutral-400">Kebijakan Privasi: </span><a href="/aplikasi/apotekpro/privacy" className="text-brand-600 hover:underline">Kebijakan Privasi Apotek Pro</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}