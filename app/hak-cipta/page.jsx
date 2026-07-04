export const metadata = {
  title: 'Hak Cipta',
  description: 'Informasi hak cipta FokusKonten — seluruh hak dilindungi undang-undang.',
  alternates: { canonical: 'https://fokuskonten.my.id/hak-cipta' },
}

export default function CopyrightPage() {
  const year = new Date().getFullYear()

  return (
    <section className="pt-28 pb-20">
      <div className="container-page">
        <div className="max-w-3xl mx-auto">
          <span className="label-brand mb-4 inline-block">Legal</span>
          <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-3">Hak Cipta</h1>
          <p className="text-neutral-400 text-sm mb-10">&copy; {year} FokusKonten. Seluruh hak dilindungi undang-undang.</p>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
              <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                Hak cipta &copy; {year} FokusKonten. Seluruh konten yang terdapat di website fokuskonten.my.id dan 
                aplikasi Android FokusKonten — termasuk namun tidak terbatas pada teks, grafik, logo, ikon, gambar, 
                kode sumber, dan perangkat lunak — adalah milik eksklusif FokusKonten dan dilindungi oleh 
                undang-undang hak cipta Republik Indonesia serta perjanjian internasional yang berlaku.
              </p>
              <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                Dilarang keras menyalin, mereproduksi, mendistribusikan, mempublikasikan, atau membuat karya turunan 
                dari konten FokusKonten tanpa izin tertulis sebelumnya dari pemegang hak cipta.
              </p>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Pelanggaran terhadap hak cipta ini dapat mengakibatkan tuntutan hukum sesuai dengan peraturan 
                perundang-undangan yang berlaku di Indonesia.
              </p>
            </div>

            <div className="rounded-2xl bg-brand-50 border border-brand-100 p-6">
              <h2 className="font-display font-semibold text-brand-700 text-base mb-3">Hubungi</h2>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                Untuk pertanyaan terkait hak cipta atau izin penggunaan, silakan hubungi:
              </p>
              <ul className="space-y-2 text-sm">
                <li><span className="text-neutral-400">Email: </span><a href="mailto:admin@fokuskonten.my.id" className="text-brand-600 hover:underline">admin@fokuskonten.my.id</a></li>
                <li><span className="text-neutral-400">WhatsApp: </span><a href="https://wa.me/6285183011318" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">+62 851-8301-1318</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
