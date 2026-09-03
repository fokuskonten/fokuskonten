import Link from 'next/link'

export default function ProductSpecs({ fmtMeta, cleanDesc, tags = [] }) {
  return (
    <div className="space-y-8">
      {/* About the Product (Clean Long-Form Story) */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] space-y-6">
        <div className="border-b border-neutral-100 pb-4">
          <h2 className="text-xl font-bold text-neutral-950 font-display">
            Tentang Produk Ini
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Detail kelengkapan, isi paket master, dan instruksi penggunaan file.
          </p>
        </div>
        
        <div className="prose prose-neutral max-w-none text-sm sm:text-base text-neutral-700 leading-relaxed space-y-4">
          {cleanDesc ? cleanDesc.split('\n\n').map((paragraph, pIdx) => (
            <p key={pIdx} className="leading-relaxed whitespace-pre-line">
              {paragraph}
            </p>
          )) : (
            <p className="text-neutral-500 italic">Deskripsi produk master sedang dipersiapkan.</p>
          )}
        </div>
      </div>

      {/* Product Specifications Table */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] space-y-5">
        <h2 className="text-lg font-bold text-neutral-950 font-display border-b border-neutral-100 pb-3.5">
          Spesifikasi Teknis Produk
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs sm:text-sm">
          <div className="flex items-center justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium">Software Kompatibel</span>
            <span className="font-bold text-neutral-900 text-right">{fmtMeta?.comp || 'Semua Editor Vektor'}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium">Format File Master</span>
            <span className="font-bold text-neutral-900 text-right">{fmtMeta?.ext || 'Master Archive'}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium">Tipe Struktur Aset</span>
            <span className="font-bold text-neutral-900 text-right">{fmtMeta?.type || 'Vector & Digital Asset'}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium">Lisensi Penggunaan</span>
            <span className="font-bold text-emerald-700 text-right">Desain Proyek &amp; Produksi Kreatif</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium">Penyimpanan Master</span>
            <span className="font-bold text-neutral-900 text-right">Google Drive Cloud Vault Resmi</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium">Pengiriman Akses</span>
            <span className="font-bold text-neutral-900 text-right">Instan Akses Link Unduhan</span>
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
