import Link from 'next/link'

export const metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan privasi FokusKonten — informasi tentang pengumpulan, penggunaan, dan perlindungan data pribadi pengunjung website dan pengguna aplikasi Android FokusKonten.',
  alternates: { canonical: 'https://fokuskonten.my.id/kebijakan-privasi' },
}

const sections = [
  {
    title: '1. Informasi yang Dikumpulkan',
    content: [
      'Kami mengumpulkan informasi yang Anda berikan secara sukarela saat menghubungi kami melalui WhatsApp, email, atau media sosial. Informasi tersebut dapat mencakup nama, alamat email, nomor telepon, dan pesan yang Anda kirimkan.',
      'Untuk aplikasi Android FokusKonten, kami dapat mengumpulkan informasi perangkat seperti model perangkat, versi sistem operasi, dan ID iklan (Advertising ID) melalui Google AdMob dan Firebase Analytics untuk keperluan iklan dan analitik.',
    ],
  },
  {
    title: '2. Penggunaan Informasi',
    list: [
      'Menanggapi pertanyaan dan permintaan yang Anda kirimkan',
      'Meningkatkan kualitas aplikasi Android',
      'Keperluan analitik dan statistik penggunaan aplikasi',
      'Menampilkan iklan yang relevan melalui Google AdMob',
      'Mematuhi kewajiban hukum yang berlaku',
    ],
  },
  {
    title: '3. Cookie',
    content: [
      'Website fokuskonten.my.id menggunakan cookie untuk meningkatkan pengalaman pengguna, menganalisis traffic, dan untuk keperluan iklan. Cookie adalah file kecil yang disimpan di perangkat Anda. Anda dapat mengatur preferensi cookie melalui pengaturan browser Anda.',
    ],
  },
  {
    title: '4. Google AdMob',
    content: [
      'Aplikasi Android FokusKonten menggunakan Google AdMob untuk menampilkan iklan. AdMob dapat mengumpulkan ID iklan (Advertising ID) perangkat Anda serta data penggunaan aplikasi untuk menayangkan iklan yang relevan. Data yang dikumpulkan oleh AdMob tidak digunakan untuk mengidentifikasi pengguna secara pribadi.',
    ],
  },
  {
    title: '5. Firebase Services',
    content: [
      'Aplikasi FokusKonten menggunakan layanan Firebase dari Google, termasuk Firebase Analytics untuk analitik penggunaan dan Firebase Crashlytics untuk pelaporan error. Data yang dikumpulkan bersifat anonim dan digunakan untuk meningkatkan stabilitas serta pengalaman pengguna.',
    ],
  },
  {
    title: '6. Pihak Ketiga',
    content: [
      'Kami dapat membagikan informasi Anda dengan pihak ketiga yang tepercaya, termasuk Google (AdMob, Firebase, Analytics), penyedia hosting, dan layanan terkait lainnya. Kami tidak menjual informasi pribadi Anda kepada pihak ketiga mana pun.',
    ],
  },
  {
    title: '7. Hak Anda',
    list: [
      'Meminta akses ke data pribadi yang kami simpan',
      'Meminta koreksi atau penghapusan data pribadi',
      'Menolak penggunaan data untuk tujuan pemasaran',
      'Menarik persetujuan kapan saja',
    ],
  },
  {
    title: '8. Keamanan Data',
    content: [
      'Kami berkomitmen untuk melindungi informasi pribadi Anda dengan menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk mencegah akses tidak sah.',
    ],
  },
  {
    title: '9. Perubahan Kebijakan',
    content: [
      'Kebijakan privasi ini dapat diperbarui sewaktu-waktu. Perubahan akan diumumkan melalui halaman ini. Dengan terus menggunakan website dan aplikasi kami setelah perubahan, Anda menyetujui kebijakan yang diperbarui.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-28 pb-20">
      <div className="container-page">
        <div className="max-w-3xl mx-auto">
          <span className="label-brand mb-4 inline-block">Legal</span>
          <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-3 text-balance">
            Kebijakan Privasi
          </h1>
          <p className="text-neutral-400 text-sm mb-10">Berlaku efektif: 1 Januari 2026</p>

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
              <h2 className="font-display font-semibold text-brand-700 text-base mb-3">10. Kontak</h2>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi:
              </p>
              <ul className="space-y-2 text-sm">
                <li><span className="text-neutral-400">Email: </span><a href="mailto:admin@fokuskonten.my.id" className="text-brand-600 hover:underline">admin@fokuskonten.my.id</a></li>
                <li><span className="text-neutral-400">WhatsApp: </span><a href="https://wa.me/6285183011318" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">+62 851-8301-1318</a></li>
                <li><span className="text-neutral-400">Website: </span><a href="https://fokuskonten.my.id" className="text-brand-600 hover:underline">fokuskonten.my.id</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
