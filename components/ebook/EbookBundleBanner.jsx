import Link from 'next/link'

/**
 * EbookBundleBanner.jsx — Banner Promosi Mega Bundle SKU IDEB00 (Rp 49.000)
 * Menawarkan akses instan ke 1 folder master 2.400+ E-Book tanpa unduh satu per satu.
 */
export default function EbookBundleBanner({ className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-neutral-950 text-white p-6 sm:p-8 shadow-xl border border-neutral-800 ${className}`}>
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 rounded-full border border-neutral-800 pointer-events-none" />
      <div className="absolute bottom-0 right-20 -mb-12 w-28 h-28 rounded-full border border-neutral-800/60 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-sm bg-white text-neutral-950 font-mono font-extrabold text-[10px] tracking-widest uppercase">
              MEGA BUNDLE LENGKAP
            </span>
            <span className="text-xs font-mono text-neutral-400 font-bold">
              SKU: IDEB00
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-snug">
            Koleksi Seluruh 2.400+ E-Book dalam 1 Folder Master
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
            Malas mengunduh satu per satu? Dapatkan akses instan ke 1 folder cloud storage lengkap berisi 2.470+ judul e-book terorganisir per 18 kategori keilmuan. Sekali bayar, akses selamanya.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 w-full sm:w-auto">
          <div className="text-left md:text-right">
            <span className="text-[11px] font-mono text-neutral-400 line-through">
              Rp 149.000
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-white">
              Rp 49.000
            </div>
          </div>

          <Link
            href="/toko-digital/ideb00/"
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-extrabold text-xs sm:text-sm font-mono tracking-wider uppercase text-center transition-all shadow-md inline-flex items-center justify-center gap-2"
          >
            <span>Dapatkan Paket Lengkap</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
