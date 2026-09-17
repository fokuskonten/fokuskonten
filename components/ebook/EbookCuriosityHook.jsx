'use client'

/**
 * EbookCuriosityHook.jsx — Kontainer Mandiri Penasaran Naskah Lengkap
 * Ditempatkan pada posisi 2/3 alur bacaan editorial (setelah cuplikan naskah & kajian naskah).
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md (Anti-Nested Card, Zero-Icon Amatir, Monokrom Baku).
 */
export default function EbookCuriosityHook({ curiosityHook }) {
  if (!curiosityHook) return null

  // Dukung teks multi-paragraf jika curiosityHook memuat pemisah \n\n
  const paragraphs = curiosityHook.split('\n\n').filter(p => p.trim().length > 0)

  return (
    <section
      aria-label="Akses Naskah Lengkap"
      className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4"
    >
      <div className="flex items-start gap-4">
        {/* Bullet Box Monokrom Presisi */}
        <div className="w-9 h-9 rounded-xl bg-neutral-950 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          <span className="font-mono text-sm font-bold">→</span>
        </div>

        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-neutral-100">
            <h3 className="font-extrabold text-neutral-950 text-base sm:text-lg font-sans tracking-tight">
              Penasaran dengan Kelanjutan Naskah Lengkapnya?
            </h3>
            <span className="px-2.5 py-0.5 rounded bg-neutral-100 text-neutral-800 text-[10px] font-mono font-bold tracking-wider uppercase border border-neutral-200">
              Kelengkapan Dokumen PDF
            </span>
          </div>

          <div className="space-y-3 text-sm sm:text-[15px] leading-[1.8] text-neutral-700 font-sans">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="whitespace-pre-line text-neutral-700">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
