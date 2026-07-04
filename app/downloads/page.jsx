import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import appsData from '@/content/apps/apps.json'

export const metadata = {
  title: 'Downloads',
  description: 'Pusat download aplikasi Android FokusKonten di Google Play Store, aset digital gratis, dan cara mendapatkan akses download.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/downloads',
  },
}

export default function DownloadsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">

        {/* Header */}
        <section className="section border-t border-black/[0.04] bg-canvas-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <span className="section-label">Download</span>
              <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Download <span className="text-maroon-gradient">Center</span>
              </h1>
              <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed">
                Pusat download aplikasi Android, aset digital gratis, dan panduan mendapatkan akses ke seluruh produk FokusKonten.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: Google Play Apps */}
        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-up">
              <span className="section-label">Play Store</span>
              <h2 className="font-display font-semibold text-2xl text-charcoal-900 mt-3 mb-3">
                Aplikasi Kami di Google Play Store
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed mb-8 max-w-2xl">
                Semua {appsData.length} aplikasi Android FokusKonten telah tersedia dan dapat diunduh langsung dari Google Play Store.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {appsData.map((app) => (
                  <a
                    key={app.id}
                    href={`https://play.google.com/store/apps/details?id=${app.package}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-black/[0.05] shadow-mature hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white font-display font-bold text-xs shrink-0"
                      style={{ background: 'linear-gradient(135deg, #8c1f1f, #b53b3b)' }}
                    >
                      {app.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display font-medium text-sm text-charcoal-900 truncate group-hover:text-maroon-700 transition-colors">
                        {app.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-charcoal-400 truncate">{app.package}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-medium shrink-0">
                          {app.status}
                        </span>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-charcoal-300 shrink-0 group-hover:text-maroon-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Free Digital Assets */}
        <section className="section border-t border-black/[0.04] bg-canvas-50">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-up">
              <span className="section-label">Gratis</span>
              <h2 className="font-display font-semibold text-2xl text-charcoal-900 mt-3 mb-3">
                Aset Digital Gratis
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed mb-8 max-w-2xl">
                Beberapa aset digital berikut tersedia gratis untuk Anda. Hubungi kami via WhatsApp untuk mendapatkan link download.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-6 bg-white rounded-2xl border border-black/[0.05] shadow-mature">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-maroon-700 mb-4"
                    style={{ background: 'rgba(140,31,31,0.06)', border: '1px solid rgba(140,31,31,0.12)' }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-charcoal-900 mb-2">Preset Lightroom Gratis</h3>
                  <p className="text-charcoal-500 text-sm leading-relaxed">
                    Beberapa preset Lightroom tersedia gratis untuk dicoba. Koleksi lengkap 110+ preset tersedia dengan harga terjangkau.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-black/[0.05] shadow-mature">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-maroon-700 mb-4"
                    style={{ background: 'rgba(140,31,31,0.06)', border: '1px solid rgba(140,31,31,0.12)' }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-charcoal-900 mb-2">Template Gratis</h3>
                  <p className="text-charcoal-500 text-sm leading-relaxed">
                    Template Blogger dan desain gratis tersedia untuk Anda yang baru memulai. Dapatkan akses dengan menghubungi kami.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-black/[0.05] shadow-mature">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-maroon-700 mb-4"
                    style={{ background: 'rgba(140,31,31,0.06)', border: '1px solid rgba(140,31,31,0.12)' }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-charcoal-900 mb-2">Overlay & Sound Gratis</h3>
                  <p className="text-charcoal-500 text-sm leading-relaxed">
                    Beberapa overlay, tekstur, dan sound effects gratis dapat diunduh. Koleksi lengkap tersedia untuk anggota premium.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: How to Get */}
        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-up">
              <span className="section-label">Panduan</span>
              <h2 className="font-display font-semibold text-2xl text-charcoal-900 mt-3 mb-3">
                Cara Mendapatkan
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed mb-8 max-w-2xl">
                Untuk mendapatkan aset digital premium, template, preset, atau produk lainnya, ikuti langkah mudah berikut.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-maroon-100 text-maroon-700 flex items-center justify-center font-display font-bold text-lg mx-auto mb-4">1</div>
                  <h3 className="font-display font-semibold text-base text-charcoal-900 mb-2">Hubungi via WhatsApp</h3>
                  <p className="text-charcoal-500 text-sm leading-relaxed">
                    Kirim pesan ke <span className="text-charcoal-700 font-medium">+62 851-8301-1318</span> atau klik tombol di bawah untuk langsung terhubung.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-maroon-100 text-maroon-700 flex items-center justify-center font-display font-bold text-lg mx-auto mb-4">2</div>
                  <h3 className="font-display font-semibold text-base text-charcoal-900 mb-2">Pilih & Bayar</h3>
                  <p className="text-charcoal-500 text-sm leading-relaxed">
                    Pilih produk yang diinginkan dan lakukan pembayaran sesuai harga yang telah disepakati.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-maroon-100 text-maroon-700 flex items-center justify-center font-display font-bold text-lg mx-auto mb-4">3</div>
                  <h3 className="font-display font-semibold text-base text-charcoal-900 mb-2">Download Langsung</h3>
                  <p className="text-charcoal-500 text-sm leading-relaxed">
                    Setelah pembayaran dikonfirmasi, Anda akan menerima link download langsung ke WhatsApp atau email Anda.
                  </p>
                </div>
              </div>
              <div className="text-center mt-10">
                <a
                  href="https://wa.me/6285183011318"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-8 py-3.5"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Hubungi via WhatsApp
                </a>
                <p className="text-charcoal-400 text-xs mt-4">
                  Atau email ke <a href="mailto:admin@fokuskonten.my.id" className="text-maroon-700 hover:underline">admin@fokuskonten.my.id</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section border-t border-black/[0.04] bg-white">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center p-10 rounded-2xl bg-canvas-50 border border-black/[0.05]">
              <h2 className="font-display font-semibold text-2xl text-charcoal-900 mb-3">
                Butuh Bantuan?
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed mb-6">
                Jika Anda mengalami kesulitan dalam proses download atau memiliki pertanyaan, jangan ragu untuk menghubungi kami.
              </p>
              <a
                href="https://wa.me/6285183011318"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hubungi WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
