/**
 * layout.jsx — Pembungkus Navigasi & Breadcrumb Konsisten Hub Smartphone
 */
import Breadcrumb from '../../components/Breadcrumb'

export const metadata = {
  title: 'Direktori Hardware & Testpoint HP — FokusKonten',
  description: 'Direktori master 3.000+ titik Testpoint EDL 9008, Direct ISP Pinout eMMC/UFS, dan Firehose Loader bebas auth terverifikasi.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/teknisi-hp'
  }
}

export default function SmartphoneLayout({ children }) {
  const breadcrumbItems = [
    { label: 'Direktori Teknisi', href: '/teknisi-hp' },
    { label: 'Smartphone Repair', href: '/teknisi-hp' }
  ]

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-950 pb-16 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />
        <main className="mt-4">{children}</main>
      </div>
    </div>
  )
}
