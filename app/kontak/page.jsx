import Link from 'next/link'

export const metadata = {
  title: 'Kontak',
  description: 'Hubungi FokusKonten melalui WhatsApp, email, atau media sosial. Kami siap membantu Anda.',
  alternates: { canonical: 'https://fokuskonten.my.id/kontak' },
}

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 sm:pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-page">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 mb-8 font-mono">
            <Link href="/" className="hover:text-neutral-900 transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">Kontak</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <span className="label-brand mb-3 inline-block">Kontak Resmi</span>
            <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-4 text-balance">
              Hubungi <span className="text-gradient-brand">FokusKonten</span>
            </h1>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl">
              Silakan hubungi tim software engineer kami untuk pertanyaan seputar aplikasi, konsultasi sistem kasir POS, atau permohonan lisensi software.
            </p>
          </div>

          {/* Unified 12-Column Contact Hub */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full mb-16">
            
            {/* Left: Featured Direct WhatsApp Card (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl bg-neutral-950 text-white p-8 sm:p-10 shadow-xl border border-neutral-800 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white text-neutral-950 text-xs font-semibold mb-6 shadow-sm">
                  Saluran Utama • Respon Cepat
                </div>
                <h2 className="heading-xl text-2xl sm:text-3xl text-white mb-3 text-balance">
                  Konsultasi Langsung via WhatsApp
                </h2>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
                  Mulai percakapan langsung bersama pengembang FokusKonten. Diskusikan alur transaksi kasir, stok obat, atau kebutuhan software khusus untuk usaha Anda secara transparan.
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <a
                  href={`https://wa.me/6285183011318?text=${encodeURIComponent('Halo FokusKonten,\n\nSaya ingin berkonsultasi langsung dengan tim software engineer FokusKonten mengenai solusi software dan layanan resmi.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-display font-semibold text-sm bg-white text-neutral-950 hover:bg-neutral-100 transition-all shadow-lg shrink-0"
                >
                  <svg className="w-5 h-5 text-neutral-950" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Kirim Pesan WhatsApp
                </a>
                <div className="text-left sm:text-right">
                  <span className="text-neutral-400 text-xs block font-mono">Nomor Resmi:</span>
                  <span className="text-white text-sm font-semibold font-mono">+62 851-8301-1318</span>
                </div>
              </div>
            </div>

            {/* Right: Channels & Studio Location Stack (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {/* Email Card */}
              <a
                href="mailto:admin@fokuskonten.my.id"
                className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm hover:shadow-md hover:border-neutral-400 p-5 transition-all group flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-950 group-hover:text-white transition-all shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm text-neutral-900 mb-0.5">Email Resmi</h3>
                    <p className="text-neutral-500 text-xs font-mono">admin@fokuskonten.my.id</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-neutral-900 underline shrink-0">Kirim Email &rarr;</span>
              </a>

              {/* YouTube Card */}
              <a
                href="https://youtube.com/@fokuskonten"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm hover:shadow-md hover:border-neutral-400 p-5 transition-all group flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-950 group-hover:text-white transition-all shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm text-neutral-900 mb-0.5">YouTube</h3>
                    <p className="text-neutral-500 text-xs">@fokuskonten</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-neutral-900 underline shrink-0">Subscribe &rarr;</span>
              </a>

              {/* Instagram Card */}
              <a
                href="https://instagram.com/fokuskonten"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm hover:shadow-md hover:border-neutral-400 p-5 transition-all group flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-950 group-hover:text-white transition-all shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm text-neutral-900 mb-0.5">Instagram</h3>
                    <p className="text-neutral-500 text-xs">@fokuskonten</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-neutral-900 underline shrink-0">Ikuti Profil &rarr;</span>
              </a>

              {/* Studio Location Card */}
              <div className="bg-neutral-50 rounded-2xl border border-neutral-200/60 p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-800 shrink-0">
                  <svg className="w-5 h-5 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-neutral-400 text-xs block font-mono">Lokasi Operasional</span>
                  <span className="font-medium text-neutral-900 text-xs sm:text-sm">Kabupaten Bekasi, Jawa Barat, Indonesia</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
