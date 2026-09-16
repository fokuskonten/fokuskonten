'use client'

/**
 * TroubleshootTable.jsx — Matrix Tabel Kendala Perbaikan & Solusi Servis
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md: Tabel datar monokrom, zero nested cards
 */
export default function TroubleshootTable({ model }) {
  if (!model) return null

  const troubleshootData = [
    {
      issue: 'Mati Total / Dead Boot (Deteksi QDLoader 9008 / BROM)',
      cause: 'Kerusakan file loader/firmware korup atau pertahanan auth gagal.',
      solution: 'Gunakan Testpoint EDL 9008 + Firehose Loader Bebas Auth untuk flashing ulang rawprogram0.xml.'
    },
    {
      issue: 'Bootloop / Hardbrick (Stuck Logo Merek)',
      cause: 'Partisi system/userdata korup setelah update OTA atau salah firmware.',
      solution: 'Lakukan Factory Reset via Recovery Mode atau Flash ulang ROM resmi versi identik.'
    },
    {
      issue: 'Terkunci Akun / FRP Lock / Demo Mode',
      cause: 'Factory Reset Protection aktif setelah hard reset tanpa logout akun.',
      solution: 'Gunakan FokusKonten HP Tools v2.4 Desktop (.EXE) 1-Klik Reset FRP via mode EDL/BROM.'
    },
    {
      issue: 'Sinyal Hilang / IME NULL / Baseband Unknown',
      cause: 'Partisi EFS/NVRAM/QCN terhapus saat flashing firmware.',
      solution: 'Restore backup QCN/NVRAM resmi & tulis ulang IMEI terdaftar via QPST / Miracle.'
    }
  ]

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-950 tracking-tight">Matrix Kendala & Solusi Perbaikan</h2>
          <p className="text-xs text-neutral-500 font-mono">Panduan diagnosa cepat teknisi meja servis</p>
        </div>
        <span className="px-3 py-1 bg-neutral-100 border border-neutral-300 text-neutral-950 font-mono font-bold text-xs rounded-lg uppercase">
          TROUBLESHOOT
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase tracking-wider bg-neutral-50">
              <th className="py-3 px-4 rounded-l-xl">Gejala Kendala</th>
              <th className="py-3 px-4">Kemungkinan Penyebab</th>
              <th className="py-3 px-4 rounded-r-xl">Solusi Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs">
            {troubleshootData.map((row, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-neutral-950 align-top">{row.issue}</td>
                <td className="py-3.5 px-4 text-neutral-600 align-top">{row.cause}</td>
                <td className="py-3.5 px-4 text-neutral-900 font-mono font-medium align-top">{row.solution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
