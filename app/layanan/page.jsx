import Link from 'next/link'

export const metadata = {
  title: 'Layanan Pembuatan Aplikasi Android',
  description: 'FokusKonten melayani jasa pembuatan aplikasi Android profesional. Diskusikan kebutuhan aplikasi Anda melalui WhatsApp.',
  alternates: { canonical: 'https://fokuskonten.my.id/layanan' },
}

export default function ServicesPage() {
  return (
    <>
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-brand opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-accent opacity-10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="container-page relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="label-brand mb-4 inline-block">Layanan</span>
            <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-6 text-balance">
              Wujudkan Ide Aplikasi{' '}
              <span className="text-gradient-brand">Anda Sekarang</span>
            </h1>
            <p className="text-neutral-500 text-base leading-relaxed max-w-xl mx-auto">
              Setiap kebutuhan aplikasi berbeda. Hubungi kami melalui WhatsApp untuk diskusi privat — tanpa harga publik, tanpa komitmen di awal. Ceritakan ide Anda, kami akan bantu wujudkan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
            {[
              { 
                icon: '💡', 
                title: 'Konsultasi Ide', 
                desc: 'Diskusikan ide aplikasi Anda secara privat via WhatsApp tanpa tekanan',
                gradient: 'from-brand-500 to-brand-600' 
              },
              { 
                icon: '📱', 
                title: 'Pengembangan', 
                desc: 'Dibangun dengan Android Studio, Kotlin/Java, Firebase — standar Play Store',
                gradient: 'from-accent-500 to-accent-600' 
              },
              { 
                icon: '🚀', 
                title: 'Publikasi', 
                desc: 'Siap upload dan publikasi ke Google Play Store dengan optimal',
                gradient: 'from-warm-500 to-warm-600' 
              },
            ].map((item, i) => (
              <div key={i} className="group bg-white rounded-2xl border border-neutral-200/60 shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${item.gradient}`} />
                <div className="p-6">
                  <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                  <h3 className="font-display font-semibold text-sm text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://wa.me/6285183011318"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm text-white bg-gradient-brand hover:shadow-xl hover:shadow-brand-500/30 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Diskusi via WhatsApp
            </a>
            <p className="text-neutral-400 text-xs mt-4">Privasi terjamin. Diskusi tanpa kewajiban.</p>
          </div>
        </div>
      </section>
    </>
  )
}
