import Link from 'next/link'
import ProductCard from './ProductCard'

export default function ProductRelatedGrid({ category, relatedProducts = [] }) {
  if (!relatedProducts || relatedProducts.length === 0) return null

  return (
    <div className="mt-16 pt-10 border-t border-neutral-200/80">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 font-display">
            Produk Terkait dalam Kategori &quot;{category}&quot;
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Koleksi master aset sejenis yang sering dibeli bersamaan.
          </p>
        </div>
        <Link
          href={`/toko-digital/?cat=${encodeURIComponent(category)}`}
          className="text-xs font-bold text-neutral-900 hover:underline flex items-center gap-1"
        >
          <span>Lihat Semua</span>
          <span>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {relatedProducts.map((rel) => (
          <ProductCard key={rel.sku} product={rel} compact={true} />
        ))}
      </div>
    </div>
  )
}
