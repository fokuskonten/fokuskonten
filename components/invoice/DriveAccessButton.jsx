'use client'

export default function DriveAccessButton({ driveLink, sku, title }) {
  const hasLink = driveLink && driveLink !== '#'

  return (
    <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-[0_10px_35px_rgba(0,0,0,0.2)] text-center space-y-5">
      <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-2xl text-white shadow-inner">
        📥
      </div>

      <div>
        <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
          File Master Desain Siap Diunduh
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mt-1 leading-relaxed">
          Tautan akses penyimpanan Google Drive berkecepatan tinggi telah disiapkan untuk Anda. Bebas unduh kapan saja.
        </p>
      </div>

      {hasLink ? (
        <a
          href={driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 w-full max-w-md py-4 px-6 rounded-2xl bg-white hover:bg-neutral-100 active:scale-[0.99] text-black font-display font-black text-base shadow-xl transition-all cursor-pointer mx-auto"
        >
          <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
          </svg>
          <span>Buka Folder File di Google Drive</span>
          <span>→</span>
        </a>
      ) : (
        <a
          href={`https://wa.me/6285183011318?text=Halo%20Admin%20FokusKonten%2C%20saya%20sudah%20membayar%20SKU%20${sku}%20mohon%20kirimkan%20link%20Google%20Drive`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 w-full max-w-md py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all mx-auto"
        >
          <span>💬 Klaim Tautan Drive via WhatsApp Admin</span>
        </a>
      )}

      {/* Guide Steps */}
      <div className="pt-4 border-t border-neutral-900 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left text-xs text-neutral-400">
        <div className="flex items-start gap-2 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/60">
          <span className="font-bold text-white">1.</span>
          <span>Klik tombol putih untuk membuka Google Drive.</span>
        </div>
        <div className="flex items-start gap-2 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/60">
          <span className="font-bold text-white">2.</span>
          <span>Pilih menu &quot;Download&quot; untuk menyimpan ke komputer.</span>
        </div>
        <div className="flex items-start gap-2 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/60">
          <span className="font-bold text-white">3.</span>
          <span>Ekstrak file master dan buka di software Corel/Photoshop.</span>
        </div>
      </div>
    </div>
  )
}
