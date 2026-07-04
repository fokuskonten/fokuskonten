export const metadata = {
  title: 'Syarat & Ketentuan',
  description: 'Syarat dan ketentuan penggunaan website fokuskonten.my.id dan aplikasi Android FokusKonten.',
  alternates: { canonical: 'https://fokuskonten.my.id/syarat-ketentuan' },
}

export default function TermsPage() {
  const sections = [
    { title: '1. Ketentuan Umum', content: 'Dengan mengakses dan menggunakan website fokuskonten.my.id serta aplikasi Android yang dikembangkan oleh FokusKonten, Anda menyetujui untuk terikat dengan syarat dan ketentuan berikut. Jika Anda tidak menyetujui sebagian atau seluruh syarat ini, harap tidak menggunakan website atau aplikasi kami.' },
    { title: '2. Aplikasi Android', content: 'Aplikasi Android FokusKonten tersedia di Google Play Store dan tunduk pada Persyaratan Layanan Google Play serta kebijakan Google Play Console. Pengguna bertanggung jawab penuh atas penggunaan aplikasi di perangkat masing-masing.' },
    { title: '3. Hak Kekayaan Intelektual', content: 'Seluruh konten, fitur, dan fungsi di website dan aplikasi FokusKonten merupakan milik eksklusif FokusKonten dan dilindungi oleh undang-undang hak cipta serta kekayaan intelektual Indonesia.' },
    { title: '4. Layanan Kustom', content: 'Untuk layanan kustom seperti pembuatan aplikasi, ketentuan spesifik akan dibahas dan disepakati bersama sebelum pekerjaan dimulai melalui komunikasi privat.' },
    { title: '5. Batasan Tanggung Jawab', content: 'FokusKonten tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, khusus, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan website, aplikasi, atau layanan kami.' },
    { title: '6. Hukum yang Berlaku', content: 'Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.' },
    { title: '7. Perubahan Syarat', content: 'FokusKonten berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Penggunaan website atau aplikasi secara berkelanjutan setelah perubahan merupakan bentuk penerimaan Anda terhadap syarat yang baru.' },
  ]

  return (
    <section className="pt-28 pb-20">
      <div className="container-page">
        <div className="max-w-3xl mx-auto">
          <span className="label-brand mb-4 inline-block">Legal</span>
          <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-3">Syarat & Ketentuan</h1>
          <p className="text-neutral-400 text-sm mb-10">Terakhir diperbarui: 1 Januari 2026</p>

          <div className="space-y-4">
            {sections.map((s, i) => (
              <div key={i} className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
                <h2 className="font-display font-semibold text-neutral-800 text-base mb-3">{s.title}</h2>
                <p className="text-neutral-500 text-sm leading-relaxed">{s.content}</p>
              </div>
            ))}

            <div className="rounded-2xl bg-brand-50 border border-brand-100 p-6">
              <h2 className="font-display font-semibold text-brand-700 text-base mb-3">8. Kontak</h2>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">Jika Anda memiliki pertanyaan, silakan hubungi:</p>
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
