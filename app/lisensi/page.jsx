export const metadata = {
  title: 'Lisensi',
  description: 'Informasi lisensi untuk aplikasi Android dan konten FokusKonten.',
  alternates: { canonical: 'https://fokuskonten.my.id/lisensi' },
}

export default function LicensesPage() {
  return (
    <section className="pt-28 pb-20">
      <div className="container-page">
        <div className="max-w-3xl mx-auto">
          <span className="label-brand mb-4 inline-block">Legal</span>
          <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-3">Lisensi</h1>
          <p className="text-neutral-400 text-sm mb-10">Informasi lisensi untuk produk FokusKonten.</p>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
              <h2 className="font-display font-semibold text-neutral-800 text-base mb-3">Aplikasi Android</h2>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Seluruh aplikasi Android yang dikembangkan oleh FokusKonten dan dipublikasikan di Google Play Store adalah hak milik FokusKonten. 
                Aplikasi tersebut dilindungi oleh undang-undang hak cipta yang berlaku. Dilarang merekayasa ulang (reverse engineering), 
                mendistribusikan kembali, atau memodifikasi aplikasi tanpa izin tertulis dari FokusKonten.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
              <h2 className="font-display font-semibold text-neutral-800 text-base mb-3">Konten Website</h2>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Seluruh konten yang terdapat di website fokuskonten.my.id — termasuk teks, gambar, logo, dan desain — 
                adalah milik FokusKonten dan dilindungi hak cipta. Dilarang menyalin, mereproduksi, atau mendistribusikan 
                konten tanpa izin tertulis.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
              <h2 className="font-display font-semibold text-neutral-800 text-base mb-3">Pustaka Pihak Ketiga</h2>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Aplikasi FokusKonten menggunakan pustaka pihak ketiga yang dilisensikan di bawah lisensi masing-masing, 
                termasuk namun tidak terbatas pada: Android SDK, Firebase SDK, Google AdMob SDK, 
                dan pustaka open source lainnya. Lisensi lengkap tersedia di halaman masing-masing proyek.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
