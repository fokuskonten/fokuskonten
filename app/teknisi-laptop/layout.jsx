import Breadcrumb from '../../components/Breadcrumb'

export const metadata = {
  title: 'Direktori Skema & Boardview Laptop Master — FokusKonten',
  description: 'Direktori master skema sirkuit PDF PDF & Boardview CAD CAD Acer, Asus, Apple, Dell, Lenovo, Toshiba, HP.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/teknisi-laptop'
  }
}

export default function LaptopLayout({ children }) {
  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Direktori Teknisi', href: '/teknisi-hp' },
    { label: 'Skema Laptop & Boardview', href: '/teknisi-laptop' }
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
