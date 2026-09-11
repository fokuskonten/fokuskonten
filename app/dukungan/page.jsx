import Link from 'next/link'

export const metadata = {
  title: 'Pusat Bantuan & Dukungan Teknis | FokusKonten',
  description: 'Pusat bantuan resmi FokusKonten. Temukan solusi operasional aplikasi kasir Android, manajemen akun, lisensi, dan konsultasi software.',
  alternates: { canonical: 'https://fokuskonten.my.id/dukungan' },
}

const supportTopics = [
  {
    icon: (
      <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Kendala Aplikasi & Printer',
    desc: 'Panduan mengatasi kendala koneksi printer thermal Bluetooth, scanner barcode, atau sinkronisasi transaksi offline.',
    action: 'https://wa.me/6285183011318',
    label: 'Konsultasi via WhatsApp',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    title: 'Akses Pengguna & PIN Kasir',
    desc: 'Bantuan reset PIN master, pengaturan hak akses kasir vs staf gudang, dan pemulihan database lokal.',
    action: 'https://wa.me/6285183011318',
    label: 'Bantuan Akses Akun',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: 'Lisensi & Aktivasi Software',
    desc: 'Informasi aktivasi kode lisensi beli putus, masa berlaku lisensi pro, dan instalasi di perangkat baru.',
    href: '/lisensi',
    label: 'Lihat Syarat Lisensi',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: 'Permintaan Fitur & Kustomisasi',
    desc: 'Punya kebutuhan khusus untuk apotek, toko retail, atau format struk kasir? Diskusikan langsung dengan pengembang.',
    action: 'https://wa.me/6285183011318',
    label: 'Diskusikan Fitur Baru',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Keamanan Data & Privasi',
    desc: 'Komitmen perlindungan data transaksi offline-first, enkripsi lokal SQLCipher, dan izin perangkat.',
    href: '/kebijakan-privasi',
    label: 'Kebijakan Privasi Resmi',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Tanya Jawab & Pertanyaan Umum',
    desc: 'Pelajari jawaban seputar pembelian aset digital CorelDraw, PowerPoint, maupun panduan penggunaan aplikasi.',
    href: '/faq',
    label: 'Buka Halaman FAQ',
  },
]

export default function SupportPage() {
  return (
    <section className="pt-28 sm:pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container-page">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 mb-6 font-mono">
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">Pusat Bantuan</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <span className="label-brand mb-3 inline-block">Pusat Bantuan &amp; Dukungan Teknis</span>
          <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-4 text-balance">
            Dukungan Teknis <span className="text-gradient-brand">FokusKonten</span>
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Pusat bantuan resmi untuk operasional aplikasi kasir Android, software desktop, dan aset digital FokusKonten. Pilih kategori bantuan di bawah atau hubungi tim teknis kami langsung.
          </p>
        </div>

        {/* Full-Width 3-Column Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-16">
          {supportTopics.map((topic, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-neutral-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center mb-5">
                  {topic.icon}
                </div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-neutral-900 mb-2">
                  {topic.title}
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {topic.desc}
                </p>
              </div>
              <div>
                {topic.href ? (
                  <Link
                    href={topic.href}
                    className="text-xs font-semibold text-neutral-900 hover:text-neutral-700 underline transition-colors inline-flex items-center gap-1.5"
                  >
                    {topic.label}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                ) : (
                  <a
                    href={topic.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-neutral-900 hover:text-neutral-700 underline transition-colors inline-flex items-center gap-1.5"
                  >
                    {topic.label}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Full-Width Direct Support Banner */}
        <div className="w-full rounded-3xl bg-neutral-950 p-8 sm:p-12 text-white border border-neutral-800 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-display font-semibold bg-white text-neutral-950 shadow-sm mb-3">
              Saluran WhatsApp Resmi
            </span>
            <h2 className="heading-xl text-2xl sm:text-3xl text-white mb-2 text-balance">
              Butuh Konsultasi atau Bantuan Langsung?
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Tim software engineer FokusKonten siap membantu menjawab pertanyaan teknis, mendiskusikan kebutuhan fitur baru, atau memandu instalasi software untuk usaha Anda.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/6285183011318"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-display font-semibold text-sm bg-white text-neutral-950 hover:bg-neutral-100 shadow-lg transition-all"
            >
              <svg className="w-4 h-4 text-neutral-950" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat WhatsApp (+62 851-8301-1318)
            </a>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-display font-semibold text-sm bg-white text-neutral-950 hover:bg-neutral-100 shadow-lg transition-all"
            >
              Buka FAQ
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
