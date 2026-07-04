import Link from 'next/link'

export const metadata = {
  title: 'Kontak',
  description: 'Hubungi FokusKonten melalui WhatsApp, email, atau media sosial. Kami siap membantu Anda.',
  alternates: { canonical: 'https://fokuskonten.my.id/kontak' },
}

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 pb-20">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="label-brand mb-4 inline-block">Kontak</span>
            <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-6">
              Hubungi <span className="text-gradient-brand">FokusKonten</span>
            </h1>
            <p className="text-neutral-500 text-base leading-relaxed max-w-lg mx-auto">
              Punya pertanyaan, masukan, atau ingin berdiskusi? Kami siap membantu melalui berbagai saluran berikut.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[
              {
                icon: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>),
                title: 'WhatsApp',
                        value: '+62 851-8301-1318',
                action: 'https://wa.me/6285183011318',
                label: 'Ketik Pesan',
              },
              {
                icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>),
                title: 'Email',
                value: 'admin@fokuskonten.my.id',
                action: 'mailto:admin@fokuskonten.my.id',
                label: 'Kirim Email',
              },
              {
                icon: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>),
                title: 'YouTube',
                value: '@fokuskonten',
                action: 'https://youtube.com/@fokuskonten',
                label: 'Subscribe',
              },
              {
                icon: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" /></svg>),
                title: 'Instagram',
                value: '@fokuskonten',
                action: 'https://instagram.com/fokuskonten',
                label: 'Ikuti',
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.action}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl border border-neutral-200/60 shadow-card p-5 hover:shadow-float hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 mb-3 group-hover:bg-brand-600 group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold text-sm text-neutral-900 mb-1">{item.title}</h3>
                <p className="text-neutral-500 text-xs mb-3">{item.value}</p>
                <span className="text-xs font-medium text-brand-600">{item.label} &rarr;</span>
              </a>
            ))}
          </div>

          <div className="rounded-3xl bg-neutral-50 border border-neutral-100 p-8 max-w-2xl mx-auto">
            <h2 className="heading-md text-lg text-neutral-900 mb-4 text-center">Atau Kirim Pesan Langsung</h2>
            <p className="text-neutral-500 text-sm text-center mb-6">
              Klik tombol di bawah untuk langsung terhubung dengan kami via WhatsApp.
            </p>
            <div className="text-center">
              <a
                href="https://wa.me/6285183011318"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm text-white bg-gradient-brand hover:shadow-lg hover:shadow-brand-500/25 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
                Kirim Pesan WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
