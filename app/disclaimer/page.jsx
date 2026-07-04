export const metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer untuk website fokuskonten.my.id dan aplikasi Android FokusKonten.',
  alternates: { canonical: 'https://fokuskonten.my.id/disclaimer' },
}

export default function DisclaimerPage() {
  return (
    <section className="pt-28 pb-20">
      <div className="container-page">
        <div className="max-w-3xl mx-auto">
          <span className="label-brand mb-4 inline-block">Legal</span>
          <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-3">Disclaimer</h1>
          <p className="text-neutral-400 text-sm mb-10">Terakhir diperbarui: 1 Januari 2026</p>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
              <h2 className="font-display font-semibold text-neutral-800 text-base mb-3">1. Informasi Umum</h2>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Informasi yang disediakan di website fokuskonten.my.id dan aplikasi Android FokusKonten bersifat umum dan 
                disediakan untuk tujuan informasi saja. Kami berusaha menyajikan informasi yang akurat dan terkini, 
                namun tidak membuat jaminan atau pernyataan mengenai kelengkapan, keakuratan, keandalan, atau ketersediaannya.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
              <h2 className="font-display font-semibold text-neutral-800 text-base mb-3">2. Aplikasi Android</h2>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Aplikasi Android FokusKonten disediakan &quot;sebagaimana adanya&quot; (as is) tanpa jaminan apa pun. 
                Kami tidak bertanggung jawab atas kerusakan atau kehilangan data yang mungkin timbul dari penggunaan aplikasi kami. 
                Pengguna bertanggung jawab untuk mencadangkan data penting sebelum menggunakan aplikasi.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
              <h2 className="font-display font-semibold text-neutral-800 text-base mb-3">3. Tautan Eksternal</h2>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Website kami dapat berisi tautan ke situs eksternal (Google Play Store, media sosial, dll). 
                Kami tidak memiliki kendali atas konten dan praktik privasi situs tersebut dan tidak bertanggung jawab 
                atas kerugian atau kerusakan yang timbul dari penggunaannya.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
              <h2 className="font-display font-semibold text-neutral-800 text-base mb-3">4. Iklan</h2>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Aplikasi FokusKonten dapat menampilkan iklan melalui Google AdMob. Kami tidak bertanggung jawab atas 
                konten iklan yang ditampilkan oleh jaringan iklan pihak ketiga.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
              <h2 className="font-display font-semibold text-neutral-800 text-base mb-3">5. Perubahan</h2>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Kami berhak mengubah disclaimer ini sewaktu-waktu tanpa pemberitahuan sebelumnya. 
                Dengan terus menggunakan website dan aplikasi kami, Anda menyetujui disclaimer yang berlaku.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
