import PanduanPortal from '@/components/panduan/PanduanPortal'
import tutorialsData from '@/content/panduan/tutorials_971.json'

export const metadata = {
  title: 'Pusat Panduan & Tutorial Resmi | FokusKonten',
  description: 'Pusat panduan resmi akses berkas, solusi ekstraksi WinRAR, Google Drive limit, desain CorelDRAW, percetakan, dan tutorial workshop FokusKonten.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/panduan',
  },
  openGraph: {
    title: 'Pusat Panduan & Tutorial Resmi | FokusKonten',
    description: 'Panduan lengkap ekstraksi file, solusi Google Drive limit, desain grafis, percetakan, dan workshop studio FokusKonten.',
    url: 'https://fokuskonten.my.id/panduan',
    siteName: 'FokusKonten',
    locale: 'id_ID',
    type: 'website',
  },
}

export default function PanduanPage() {
  return (
    <div className="min-h-screen bg-neutral-50/50 pb-20 pt-8 sm:pt-12">
      {/* Schema.org CollectionPage / TechArticle */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Pusat Panduan & Tutorial Resmi FokusKonten',
            description: 'Panduan lengkap akses file digital, ekstraksi WinRAR, desain grafis, dan tutorial workshop resmi FokusKonten.',
            url: 'https://fokuskonten.my.id/panduan',
            publisher: {
              '@type': 'Organization',
              name: 'FokusKonten',
              url: 'https://fokuskonten.my.id',
            },
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* HEADER HERO RESMI */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 text-white text-[11px] font-mono font-bold tracking-wider uppercase">
            <span>OFFICIAL KNOWLEDGE BASE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            <span>971 VIDEO RESMI</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            Pusat Panduan & Tutorial Resmi
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Panduan operasional berkas pesanan Shopee dan Web FokusKonten. Disertai video tutorial terverifikasi dari channel YouTube resmi <strong className="text-neutral-950 font-bold">@fokuskonten</strong>.
          </p>
        </div>

        {/* PORTAL INTERAKTIF */}
        <PanduanPortal initialTutorials={tutorialsData} />
      </div>
    </div>
  )
}
