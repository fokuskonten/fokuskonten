import Link from 'next/link'

export const metadata = {
  title: 'DMCA',
  description: 'Digital Millennium Copyright Act — kebijakan DMCA untuk FokusKonten. Laporkan pelanggaran hak cipta melalui kontak yang tersedia.',
  alternates: { canonical: 'https://fokuskonten.my.id/dmca' },
}

export default function DmcaPage() {
  return (
    <section className="pt-28 pb-20">
      <div className="container-page">
        <div className="max-w-3xl mx-auto">
          <span className="label-brand mb-4 inline-block">Legal</span>
          <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-3 text-balance">
            Digital Millennium Copyright Act
          </h1>
          <p className="text-neutral-400 text-sm mb-10">Kebijakan DMCA untuk fokuskonten.my.id</p>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
              <h2 className="font-display font-semibold text-neutral-800 text-base mb-3">1. Penghormatan terhadap Hak Cipta</h2>
              <p className="text-neutral-500 text-sm leading-relaxed">
                FokusKonten menghormati hak kekayaan intelektual pihak lain dan berharap pengguna website serta 
                aplikasi kami juga melakukan hal yang sama. Kami akan menanggapi pemberitahuan pelanggaran hak cipta 
                yang sesuai dengan Digital Millennium Copyright Act (DMCA).
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
              <h2 className="font-display font-semibold text-neutral-800 text-base mb-3">2. Prosedur Pelaporan</h2>
              <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                Jika Anda yakin bahwa konten yang tersedia di website atau aplikasi FokusKonten melanggar hak cipta Anda, 
                silakan kiramkan pemberitahuan tertulis kepada kami yang mencakup informasi berikut:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-neutral-500 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                  Tanda tangan fisik atau elektronik pemilik hak cipta atau kuasanya
                </li>
                <li className="flex items-start gap-2 text-neutral-500 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                  Identifikasi karya berhak cipta yang diduga dilanggar
                </li>
                <li className="flex items-start gap-2 text-neutral-500 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                  Identifikasi materi yang melanggar beserta URL atau lokasi spesifik
                </li>
                <li className="flex items-start gap-2 text-neutral-500 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                  Informasi kontak yang memadai (nama, alamat, email, nomor telepon)
                </li>
                <li className="flex items-start gap-2 text-neutral-500 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                  Pernyataan bahwa Anda memiliki itikad baik bahwa penggunaan tersebut tidak diizinkan
                </li>
                <li className="flex items-start gap-2 text-neutral-500 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                  Pernyataan bahwa informasi dalam pemberitahuan adalah akurat, disertai sanksi sumpah palsu
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
              <h2 className="font-display font-semibold text-neutral-800 text-base mb-3">3. Pengajuan Balik (Counter-Notification)</h2>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Jika Anda yakin bahwa konten yang dihapus akibat pemberitahuan DMCA tidak melanggar hak cipta, 
                Anda dapat mengirimkan pengajuan balik yang mencakup informasi identifikasi konten, pernyataan 
                itikad baik, dan persetujuan yurisdiksi pengadilan yang relevan.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-card p-6">
              <h2 className="font-display font-semibold text-neutral-800 text-base mb-3">4. Pengulang Pelanggaran</h2>
              <p className="text-neutral-500 text-sm leading-relaxed">
                FokusKonten berhak menghentikan layanan kepada pengguna yang terbukti berulang kali melanggar 
                hak cipta pihak lain sesuai dengan kebijakan DMCA.
              </p>
            </div>

            <div className="rounded-2xl bg-brand-50 border border-brand-100 p-6">
              <h2 className="font-display font-semibold text-brand-700 text-base mb-3">5. Kontak DMCA</h2>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                Kirim pemberitahuan DMCA atau pertanyaan terkait hak cipta melalui kontak di bawah ini:
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
