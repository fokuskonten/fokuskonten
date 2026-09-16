import ErrorLookupWidget from '../../../components/teknisi/ErrorLookupWidget'
import SidebarHPTools from '../../../components/teknisi/SidebarHPTools'

export const metadata = {
  title: 'Pencarian Kode Error BROM & EDL Teknisi HP — FokusKonten',
  description: 'Kamus kode error BROM MediaTek (0xC0060001, 0xC0020004), Qualcomm EDL, SP Flash Tool, UFI, EasyJTAG lengkap dengan solusi perbaikan.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/teknisi-hp/error-lookup'
  }
}

export default function ErrorLookupPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8">
        <ErrorLookupWidget />
      </div>
      <div className="lg:col-span-4">
        <SidebarHPTools />
      </div>
    </div>
  )
}
