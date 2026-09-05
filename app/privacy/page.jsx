import Link from 'next/link'

export const metadata = {
  title: 'Kebijakan Privasi - FokusKonten',
  description: 'Kebijakan privasi resmi FokusKonten — perlindungan data pengguna, transaksi, dan akun digital.',
  alternates: { canonical: 'https://fokuskonten.my.id/privacy' },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-slate-800/90 border border-slate-700/60 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
        <div className="border-b border-slate-700/60 pb-6 mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors mb-4">
            ← Kembali ke Beranda
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Kebijakan Privasi FokusKonten</h1>
          <p className="text-sm text-slate-400 mt-2">Terakhir diperbarui: 5 September 2026</p>
        </div>

        <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Pendahuluan</h2>
            <p>
              FokusKonten menghargai privasi setiap pengguna, pelanggan, dan pengunjung situs kami di <strong className="text-cyan-400">https://fokuskonten.my.id</strong>. Kebijakan ini menjelaskan bagaimana data pribadi Anda dikumpulkan, digunakan, dan dilindungi saat menggunakan layanan kami.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Data yang Kami Kumpulkan</h2>
            <p>Kami hanya mengumpulkan data yang diperlukan untuk pemrosesan pesanan dan layanan akun:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
              <li>Nama lengkap dan alamat email (untuk pengiriman berkas digital dan akses unduhan).</li>
              <li>Nomor WhatsApp/telepon (opsional, untuk konfirmasi transaksi penting).</li>
              <li>Informasi profil dasar saat Anda memilih login menggunakan Google Sign-In (nama, email, foto profil publik).</li>
              <li>Riwayat transaksi dan status pembayaran (diproses melalui gerbang pembayaran resmi Midtrans).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Penggunaan Data</h2>
            <p>Data yang dikumpulkan digunakan secara eksklusif untuk:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
              <li>Mengirimkan tautan akses unduhan produk digital via email (Gmail SMTP resmi).</li>
              <li>Memverifikasi kepemilikan akun dan transaksi pembelian Anda.</li>
              <li>Menyediakan layanan bantuan pelanggan jika Anda mengalami kendala unduhan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Keamanan Data</h2>
            <p>
              Kami menerapkan standar keamanan tinggi dengan enkripsi SSL/TLS, otentikasi OAuth 2.0 Google resmi, perlindungan brute-force, dan penyimpanan database terlindungi. Kami <strong>tidak pernah</strong> menjual, menyewakan, atau membagikan data pribadi Anda kepada pihak ketiga manapun untuk tujuan periklanan.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan seputar kebijakan privasi ini atau ingin menghapus data akun Anda, silakan hubungi tim kami melalui email resmi: <strong className="text-cyan-400">admin@fokuskonten.my.id</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
