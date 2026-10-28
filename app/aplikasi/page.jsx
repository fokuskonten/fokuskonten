import appsData from '@/content/apps/apps.json'
import AppsExplorer from '@/components/AppsExplorer'
import Breadcrumb from '@/components/Breadcrumb'
import SectionHeading from '@/components/SectionHeading'
import Link from 'next/link'

export const metadata = {
  title: 'Katalog Produk & Aplikasi Resmi — FokusKonten',
  description: "Koleksi software kasir POS, sistem manajemen prospek, dan aplikasi mobile resmi siap pakai karya FokusKonten.",
  alternates: { canonical: 'https://fokuskonten.my.id/aplikasi' },
}

const officialProductIds = [
  'apotekpro',
  'tokokelontongpro',
  'whatsappcrm',
  'reimage',
  'bacaquran',
  'gamepuzzle',
]

export default function AppsPage() {
  const officialApps = appsData.filter((a) => officialProductIds.includes(a.id))

  return (
    <>
      <section className="pt-28 sm:pt-32 pb-8 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-page">
          <Breadcrumb items={[{ label: 'Aplikasi' }]} />
          <SectionHeading
            label="Katalog Resmi"
            title="Katalog Aplikasi Resmi FokusKonten"
            description="Jelajahi lini software kasir POS, sistem manajemen prospek, dan aplikasi mobile resmi siap pakai karya FokusKonten."
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <AppsExplorer apps={officialApps} />

          {/* Jembatan Penghubung ke Halaman Portofolio */}
          <div className="mt-16 rounded-3xl bg-neutral-50 border border-neutral-200/80 p-8 sm:p-10 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-neutral-950 text-white mb-3">
              Portofolio &amp; Kemitraan
            </span>
            <h3 className="heading-lg text-xl sm:text-2xl text-neutral-900 mb-2">
              Mencari Karya Pesanan Klien atau Proyek Pengembangan Khusus?
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm max-w-xl mx-auto mb-6 leading-relaxed font-sans">
              Jelajahi studi kasus sistem web industri PT Nurcahya Teknik Industry, platform kemitraan MCJob.id, serta utilitas teknisi dan otomasi studio kami di halaman Portofolio.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-display font-semibold text-xs sm:text-sm text-white bg-black hover:bg-neutral-800 shadow-md transition-all duration-200"
            >
              <span>Jelajahi Halaman Portofolio</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

