import FaqSection from '@/components/FaqSection'
import SidebarLaptopTools from '@/components/teknisi/SidebarLaptopTools'

export const metadata = {
  title: 'FAQ & Tanya Jawab Teknisi Laptop — Skematik Motherboard & Boardview | FokusKonten',
  description: 'Pertanyaan umum teknisi motherboard laptop: panduan power sequence, pelacakan short rail 19V VIN, tegangan standby 3.3V/5V ALW, dan pembacaan boardview CAD.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/teknisi-laptop/faq/'
  }
}

const faqItems = [
  {
    q: 'Perangkat lunak apa yang digunakan untuk membuka berkas boardview motherboard laptop?',
    a: 'Berkas tata letak boardview format .cad, .brd, .fz, atau .asc dapat dibuka menggunakan software gratis OpenBoardView atau Boardview Viewer. Untuk berkas skematik diagram rangkaian sirkuit, gunakan penampil dokumen PDF standar seperti Adobe Acrobat Reader atau SumatraPDF.'
  },
  {
    q: 'Bagaimana prosedur pelacakan short circuit pada jalur tegangan utama 19V (VIN / B+)?',
    a: 'Gunakan multimeter pada mode pengukuran resistansi (Ohm) ke ground untuk mengonfirmasi nilai impedansi rendah pada jalur 19V. Jika terukur mendekati 0 Ohm, gunakan catu daya DC (power supply) yang diatur pada tegangan aman 1V hingga 2V dengan batasan arus 1A s/d 2A untuk menyuntikkan arus pada rail short. Raba komponen kapasitor keramik MLCC atau MOSFET upper/lower yang mengalami disipasi panas tidak normal.'
  },
  {
    q: 'Mengapa tegangan standby 3.3V dan 5V ALW belum muncul saat adaptor dicolokkan?',
    a: 'Pada arsitektur motherboard laptop modern, tegangan 3.3V dan 5V ALW dikendalikan oleh IC PWM regulator (seperti RT8205 atau TPS51125). Tegangan ini hanya akan dibangkitkan jika tegangan suplai 19V VIN telah masuk, sinyal Enable (EN) dari Embedded Controller (EC/KBC) berlogika HIGH, dan LDO regulator 3.3V/5V dalam kondisi normal.'
  },
  {
    q: 'Bagaimana cara membaca diagram urutan penyalaan (Power Sequence) pada motherboard?',
    a: 'Diagram power sequence menggambarkan alur sinyal logika dan pembangkitan tegangan langkah-demi-langkah mulai dari adaptor dicolokkan, tombol daya ditekan (PWR_SW#), hingga sinyal reset CPU (PLTRST#) dilepaskan. Jika motherboard mati total atau tidak bisa menyala, ukur titik tegangan sesuai urutan nomor pada diagram untuk menemukan di langkah ke berapa alur sinyal terhenti.'
  },
  {
    q: 'Apakah skematik dan berkas boardview laptop di FokusKonten bebas dari proteksi password?',
    a: 'Ya. Seluruh berkas skematik dan boardview disajikan tanpa enkripsi password sehingga dapat langsung dibuka dan dipelajari untuk keperluan diagnostik dan perbaikan sirkuit motherboard.'
  },
  {
    q: 'Apa peringatan keselamatan saat melakukan penyolderan komponen BGA atau IC regulator?',
    a: 'Gunakan cairan fluks berkualitias tinggi dan stasiun pemanas (hot air gun) dengan profil suhu terkontrol (maksimal 350°C s/d 380°C) untuk mencegah kerusakan termal pada lapisan PCB multi-layer. Pastikan baterai CMOS dan baterai utama dilepaskan sebelum menyentuh sirkuit.'
  }
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a
    }
  }))
}

export default function TeknisiLaptopFaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
            <span className="inline-block px-3 py-1 bg-neutral-100 border border-neutral-300 rounded-md text-xs font-mono font-bold text-neutral-900 mb-3">
              PUSAT PANDUAN TEKNISI LAPTOP
            </span>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-950 tracking-tight mb-3">
              Tanya Jawab &amp; Panduan Motherboard Laptop
            </h1>
            <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
              Kompilasi jawaban teknis seputar pelacakan short circuit 19V VIN, tegangan standby 3.3V/5V ALW, pembacaan software boardview, dan alur diagram power sequence motherboard.
            </p>
          </div>

          <FaqSection
            items={faqItems}
            title="Daftar Pertanyaan Kritis Motherboard Laptop"
            subtitle="Panduan teruji diagnostik sirkuit motherboard dan perbaikan daya"
          />
        </div>

        <div className="lg:col-span-4">
          <SidebarLaptopTools />
        </div>
      </div>
    </>
  )
}
