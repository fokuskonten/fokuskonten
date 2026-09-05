import Link from 'next/link'

export const metadata = {
  title: 'Syarat & Ketentuan - FokusKonten',
  description: 'Syarat dan ketentuan layanan transaksi digital di marketplace FokusKonten.',
  alternates: { canonical: 'https://fokuskonten.my.id/terms' },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-slate-800/90 border border-slate-700/60 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
        <div className="border-b border-slate-700/60 pb-6 mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors mb-4">
            ← Kembali ke Beranda
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Syarat & Ketentuan Layanan</h1>
          <p className="text-sm text-slate-400 mt-2">Terakhir diperbarui: 5 September 2026</p>
        </div>

        <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Ketentuan Umum</h2>
            <p>
              Dengan mengakses dan bertransaksi di situs <strong className="text-cyan-400">https://fokuskonten.my.id</strong>, Anda menyatakan setuju dan terikat pada seluruh syarat serta ketentuan yang berlaku di situs ini.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Produk & Lisensi Digital</h2>
            <p>
              Produk yang dijual adalah berkas digital (template desain CorelDraw, Vector, Banner, Canva, Font, dan sejenisnya). Pembeli diberikan lisensi penggunaan komersial maupun personal untuk keperluan produksi kreatif.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Pengiriman & Akses Unduhan</h2>
            <p>
              Setelah pembayaran berhasil diverifikasi melalui gerbang resmi Midtrans, tautan akses Google Drive berkecepatan tinggi akan otomatis dikirimkan ke email yang Anda daftarkan saat proses checkout.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Bantuan Pelanggan</h2>
            <p>
              Apabila terdapat kendala unduhan berkas, link kadaluwarsa, atau file rusak, pembeli berhak mendapatkan tautan pemulihan melalui tim bantuan kami di <strong className="text-cyan-400">admin@fokuskonten.my.id</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
