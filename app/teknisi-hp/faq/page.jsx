import FaqSection from '@/components/FaqSection'
import SidebarHPTools from '@/components/teknisi/SidebarHPTools'

export const metadata = {
  title: 'FAQ & Tanya Jawab Teknisi HP — Skematik, Testpoint & Pinout | FokusKonten',
  description: 'Pertanyaan umum teknisi ponsel: panduan titik uji testpoint EDL 9008 Qualcomm, jumper direct ISP eMMC/UFS, perbaikan jalur lampu backlight, tegangan VBUS, dan pembacaan skematik.',
  alternates: {
    canonical: 'https://fokuskonten.my.id/teknisi-hp/faq/'
  }
}

const faqItems = [
  {
    q: 'Bagaimana prosedur aman melakukan titik uji (testpoint) EDL 9008 pada ponsel Qualcomm?',
    a: 'Lepaskan konektor fleksibel baterai terlebih dahulu untuk memutus suplai arus utama. Hubungkan titik uji (testpoint) ke ground (GND atau kaleng pelindung) menggunakan pinset anti-statis berujung presisi. Sambil menahan jumper, colokkan kabel USB dari komputer. Lepaskan pinset segera setelah Device Manager pada komputer mendeteksi port "Qualcomm HS-USB QDLoader 9008".'
  },
  {
    q: 'Berapa standar tegangan kerja VCC dan VCCQ saat melakukan Direct ISP eMMC/UFS?',
    a: 'Untuk direct ISP, gunakan tegangan VCCQ 1.8V dan VCC 2.8V hingga 3.3V. Pastikan panjang kawat jumper tidak melebihi 5 hingga 7 cm untuk mencegah distorsi sinyal clock (CLK) dan data (CMD, D0). Selalu lakukan pencadangan (backup) partisi penting seperti NVRAM, EFS, dan data keamanan sebelum memulai proses modifikasi partisi atau flashing.'
  },
  {
    q: 'Bagaimana cara melacak kerusakan sirkuit lampu layar LCD (backlight) yang mati total?',
    a: 'Ukur tegangan pada pin Anoda (LED+) konektor LCD saat tombol daya dinyalakan. Tegangan normal sirkuit penaik tegangan (boost converter) harus berkisar antara 15V hingga 35V. Jika hanya terukur 3.7V hingga 4.2V (tegangan baterai murni), periksa komponen lilitan boost (coil 10uH), dioda schottky penyearah, dan IC driver lampu (seperti seri LM3632 atau IC display PMIC).'
  },
  {
    q: 'Mengapa perangkat ponsel mengalami kendala pengisian baterai lambat atau peringatan temperatur?',
    a: 'Kendala pengisian daya umumnya dipicu oleh jalur data USB (D+/D-) yang terputus, sensor suhu resistor thermal (thermistor NTC 10K/47K pada jalur BAT_ID / BAT_TH) yang mengalami korosi, atau IC proteksi over-voltage (OVP) mengalami short circuit. Gunakan diagram skematik model terkait untuk memverifikasi suplai 5.0V VBUS dari konektor charger hingga kaki input IC charging.'
  },
  {
    q: 'Apakah diagram skematik dan panduan jalur di direktori FokusKonten memerlukan dongle perangkat keras?',
    a: 'Tidak. Seluruh berkas skematik sirkuit dan diagram tata letak komponen disajikan dalam format standar terbuka (PDF dan CAD boardview) yang dapat dibuka secara langsung menggunakan penampil dokumen gratis tanpa memerlukan aktivasi atau dongle perangkat keras berbayar.'
  },
  {
    q: 'Apa batas tanggung jawab teknis (disclaimer) penggunaan seluruh diagram dan berkas ini?',
    a: 'Seluruh panduan teknis, diagram skematik, dan titik uji disajikan murni untuk tujuan edukasi dan referensi kerja teknisi profesional. Tindakan modifikasi dan pembongkaran perangkat keras berisiko dan sepenuhnya menjadi tanggung jawab teknisi pelaksana di lapangan (Do With Your Own Risk / DWYOR).'
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

export default function TeknisiHpFaqPage() {
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
              PUSAT PANDUAN TEKNISI
            </span>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-950 tracking-tight mb-3">
              Tanya Jawab &amp; Panduan Teknisi Ponsel
            </h1>
            <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
              Kompilasi jawaban teknis seputar prosedur titik uji (testpoint EDL 9008), direct ISP pinout eMMC/UFS, pelacakan sirkuit lampu LCD, tegangan VBUS pengisian daya, dan pemanfaatan diagram skematik terverifikasi.
            </p>
          </div>

          <FaqSection
            items={faqItems}
            title="Daftar Pertanyaan Kritis Teknisi HP"
            subtitle="Panduan teruji dan solusi teknis laboratorium reparasi ponsel"
          />
        </div>

        <div className="lg:col-span-4">
          <SidebarHPTools />
        </div>
      </div>
    </>
  )
}
