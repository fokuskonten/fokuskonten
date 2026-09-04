import Link from 'next/link'

function formatDescription(desc) {
  if (!desc) return null

  const blocks = desc.split(/\r?\n\s*\r?\n/)

  return blocks.map((block, idx) => {
    const lines = block.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
    if (lines.length === 0) return null

    const firstLine = lines[0]

    // 1. Header Informasi Singkat (PRODUK:, KODE SKU:, KATEGORI:)
    if (firstLine.startsWith('PRODUK:') || firstLine.startsWith('KODE SKU:') || firstLine.startsWith('SKU:')) {
      return (
        <div key={idx} className="p-4 sm:p-5 rounded-xl bg-neutral-50 border border-neutral-200 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs sm:text-sm">
          {lines.map((line, lIdx) => {
            const colonIdx = line.indexOf(':')
            if (colonIdx !== -1) {
              let k = line.substring(0, colonIdx).trim()
              if (k === 'KODE SKU') k = 'SKU'
              let v = line.substring(colonIdx + 1).trim()
              if (v === 'Paket Master Aset Digital Original') v = 'Aset Digital'
              return (
                <div key={lIdx} className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block font-mono">{k}</span>
                  <span className="font-semibold text-neutral-900 block text-xs sm:text-sm">{v}</span>
                </div>
              )
            }
            return <div key={lIdx} className="font-medium text-neutral-800">{line}</div>
          })}
        </div>
      )
    }

    // 2. Section ber-heading (Contoh: "RINGKASAN & NILAI PRODUK:", "SPESIFIKASI TEKNIS & KELENGKAPAN (MUTLAK):")
    const isHeading = firstLine.endsWith(':') && firstLine === firstLine.toUpperCase()

    if (isHeading) {
      let heading = firstLine.replace(/:$/, '').trim()
      if (heading.includes('RINGKASAN & NILAI PRODUK')) heading = 'RINGKASAN PRODUK'
      if (heading.includes('SPESIFIKASI TEKNIS & KELENGKAPAN')) heading = 'SPESIFIKASI & KELENGKAPAN'
      if (heading.includes('STANDAR PENGIRIMAN & LAYANAN RESMI') || heading.includes('STANDAR LAYANAN & PENGIRIMAN')) heading = 'PENGIRIMAN & LAYANAN'

      const contentLines = lines.slice(1)

      // Sub-kasus 2A: Bullet List (diawali • atau -)
      const isBulletList = contentLines.some((l) => l.startsWith('•') || l.startsWith('-'))
      if (isBulletList) {
        return (
          <div key={idx} className="space-y-3 pt-2">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 flex items-center gap-2 border-b border-neutral-200 pb-2.5 font-display">
              <span className="w-2 h-2 rounded-full bg-neutral-900 shrink-0" />
              <span>{heading}</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-800 font-sans">
              {contentLines.map((line, lIdx) => {
                const cleanLine = line.replace(/^[•\-]\s*/, '')
                const colonIdx = cleanLine.indexOf(':')
                if (colonIdx !== -1) {
                  const label = cleanLine.substring(0, colonIdx)
                  const val = cleanLine.substring(colonIdx + 1)
                  return (
                    <li key={lIdx} className="flex items-start gap-2.5 leading-relaxed">
                      <svg className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <div className="text-neutral-800">
                        <strong className="font-semibold text-neutral-900">{label}:</strong>
                        <span className="text-neutral-800 ml-1.5">{val}</span>
                      </div>
                    </li>
                  )
                }
                return (
                  <li key={lIdx} className="flex items-start gap-2.5 leading-relaxed text-neutral-800">
                    <span className="text-neutral-400 font-bold">•</span>
                    <span>{cleanLine}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      }

      // Sub-kasus 2B: Numbered List (1. ..., 2. ...)
      const isNumberedList = contentLines.some((l) => /^\d+\.\s*/.test(l))
      if (isNumberedList) {
        return (
          <div key={idx} className="space-y-3 pt-2">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 flex items-center gap-2 border-b border-neutral-200 pb-2.5 font-display">
              <span className="w-2 h-2 rounded-full bg-neutral-900 shrink-0" />
              <span>{heading}</span>
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-neutral-800 font-sans">
              {contentLines.map((line, lIdx) => {
                const stepNum = line.match(/^(\d+)\.\s*/)?.[1] || `${lIdx + 1}`
                const stepText = line.replace(/^\d+\.\s*/, '')
                return (
                  <div key={lIdx} className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50/80 border border-neutral-200/80 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-neutral-900 text-white font-mono font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {stepNum}
                    </span>
                    <span className="text-neutral-800 font-medium">{stepText}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      }

      // Sub-kasus 2C: Paragraf di bawah heading
      return (
        <div key={idx} className="space-y-2.5 pt-2">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 flex items-center gap-2 border-b border-neutral-200 pb-2.5 font-display">
            <span className="w-2 h-2 rounded-full bg-neutral-900 shrink-0" />
            <span>{heading}</span>
          </h3>
          <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans font-normal">
            {contentLines.join(' ')}
          </p>
        </div>
      )
    }

    // 3. Paragraf Standar
    return (
      <p key={idx} className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans font-normal whitespace-pre-line">
        {block}
      </p>
    )
  })
}

export default function ProductSpecs({ fmtMeta, cleanDesc, tags = [] }) {
  return (
    <div className="space-y-8">
      {/* About the Product (Clean Long-Form Story) */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] space-y-6">
        <div className="border-b border-neutral-100 pb-4">
          <h2 className="text-xl font-bold text-neutral-950 font-display">
            Tentang Produk Ini
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Detail spesifikasi dan petunjuk penggunaan file.
          </p>
        </div>
        
        <div className="space-y-6">
          {cleanDesc ? (
            formatDescription(cleanDesc)
          ) : (
            <p className="text-neutral-500 italic text-sm">Deskripsi produk sedang dipersiapkan.</p>
          )}
        </div>
      </div>

      {/* Product Specifications Table */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] space-y-5">
        <h2 className="text-lg font-bold text-neutral-950 font-display border-b border-neutral-100 pb-3.5">
          Spesifikasi Produk
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs sm:text-sm">
          <div className="flex items-center justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium">Software Kompatibel</span>
            <span className="font-bold text-neutral-900 text-right">{fmtMeta?.comp || 'Semua Editor Vektor'}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium">Format File</span>
            <span className="font-bold text-neutral-900 text-right">.{fmtMeta?.ext || 'CDR'}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium">Tipe File</span>
            <span className="font-bold text-neutral-900 text-right">{fmtMeta?.type || 'Vector & Digital Asset'}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium">Lisensi</span>
            <span className="font-bold text-neutral-900 text-right">Komersial (Bebas Penggunaan)</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium">Penyimpanan</span>
            <span className="font-bold text-neutral-900 text-right">Google Drive</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium">Pengiriman</span>
            <span className="font-bold text-neutral-900 text-right">Instan via Email &amp; Akun</span>
          </div>
        </div>
      </div>

      {/* Tags List Footer */}
      {tags.length > 0 && (
        <div className="pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
            Tag Terkait:
          </h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/toko-digital/?q=${encodeURIComponent(tag)}`}
                className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-medium text-neutral-600 hover:text-black hover:border-black transition-colors shadow-sm"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
