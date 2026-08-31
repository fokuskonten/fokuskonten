import appsData from '@/content/apps/apps.json'
import AppsExplorer from '@/components/AppsExplorer'
import Breadcrumb from '@/components/Breadcrumb'
import SectionHeading from '@/components/SectionHeading'

export const metadata = {
  title: 'Katalog Produk & Aplikasi Resmi',
  description: "Koleksi produk software dan aplikasi resmi FokusKonten: Apotek Pro, Kelontong Pro, BacaQur'an, 2048 Puzzle, MCJob.id, dan WhatsApp Lead CRM.",
  alternates: { canonical: 'https://fokuskonten.my.id/aplikasi' },
}

export default function AppsPage() {
  return (
    <>
      <section className="pt-32 pb-8 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-page">
          <Breadcrumb items={[{ label: 'Aplikasi' }]} />
          <SectionHeading
            label="Katalog Resmi"
            title="Produk &amp; Aplikasi FokusKonten"
            description="Jelajahi seluruh lini produk aplikasi mobile, platform karir, dan software desktop resmi kami."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page">
          <AppsExplorer apps={appsData} />
        </div>
      </section>
    </>
  )
}
