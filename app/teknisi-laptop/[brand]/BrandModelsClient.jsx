'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getModelsByBrand } from '../../../lib/technicianService'
import BrandLogo from '../../../components/teknisi/BrandLogo'

export default function LaptopBrandModelsClient({ initialBrand, initialData }) {
  const brandSlug = initialBrand
  const [data, setData] = useState(initialData || null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(!initialData)

  useEffect(() => {
    if (page === 1 && initialData) {
      setData(initialData)
      setLoading(false)
      return
    }

    async function loadModels() {
      if (!brandSlug) return
      setLoading(true)
      const res = await getModelsByBrand('laptop', brandSlug, page, 60)
      if (res.success) {
        setData(res)
      }
      setLoading(false)
    }
    loadModels()
  }, [brandSlug, page, initialData])

  const brandName = data?.brandName || (brandSlug ? brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1) : 'Merek')

  return (
    <div className="space-y-8">
      {/* Brand Header */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-neutral-950 text-white font-mono font-bold text-xs rounded-lg uppercase tracking-wider">
            KATALOG LAPTOP
          </span>
          <h1 className="text-3xl font-extrabold text-neutral-950 tracking-tight mt-2 font-mono">
            Katalog Motherboard & Skema {brandName}
          </h1>
          <p className="text-xs text-neutral-500 font-mono mt-1">
            Daftar motherboard laptop {brandName} terverifikasi dengan berkas Schematic PCB & Boardview.
          </p>
        </div>
        <Link
          href="/teknisi-laptop"
          className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-950 font-bold text-xs rounded-xl font-mono transition-colors self-start sm:self-auto"
        >
          &larr; Kembali ke Hub Laptop
        </Link>
      </div>

      {/* Models List (Full-Width Clean Grid, Zero Promo Sidebar) */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <h2 className="text-lg font-extrabold text-neutral-950 font-mono">
            Daftar Model ({data?.pagination?.totalItems || 0})
          </h2>
          <span className="text-xs text-neutral-500 font-mono">Halaman {page} dari {data?.pagination?.totalPages || 1}</span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-mono text-neutral-400">Memuat katalog laptop...</div>
        ) : !data || data.data.length === 0 ? (
          <div className="py-12 text-center text-xs font-mono text-neutral-500">
            Belum ada model motherboard terverifikasi untuk merek ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {data.data.map((item) => (
              <Link
                key={item.id}
                href={`/teknisi-laptop/${brandSlug}/${item.slug}`}
                className="bg-white border border-neutral-200 hover:border-neutral-950 rounded-xl transition-all group flex flex-col overflow-hidden hover:shadow-sm"
              >
                {/* Visual Header Kartu — Logo Merek Laptop */}
                <div className="w-full h-24 bg-neutral-100 flex items-center justify-between px-4">
                  <BrandLogo brand={brandSlug} size="lg" />
                  <div className="flex items-center gap-1">
                    {(item.has_schematic === 1 || (item.fileTypes && item.fileTypes.includes('schematic'))) && (
                      <span className="px-1.5 py-0.5 bg-neutral-950 text-white font-mono text-[8px] font-bold rounded">SCH</span>
                    )}
                    {(item.has_boardview === 1 || (item.fileTypes && item.fileTypes.includes('boardview'))) && (
                      <span className="px-1.5 py-0.5 bg-neutral-200 text-neutral-950 font-mono text-[8px] font-bold rounded">BDV</span>
                    )}
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between space-y-2 flex-1">
                  <div>
                    <h3 className="text-sm font-extrabold text-neutral-950 group-hover:underline font-mono leading-tight">
                      {item.modelName || item.model_name}
                    </h3>
                    <p className="text-[11px] text-neutral-500 font-mono mt-0.5">{item.motherboardCode || item.motherboard_code || item.chipset || 'Motherboard Code'}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400">PDF / CAD</span>
                    <span className="text-xs font-mono font-bold text-neutral-950 group-hover:underline">Lihat Skema &rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination controls */}
        {data && data.pagination.totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100 font-mono text-xs">
            <button
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-4 py-2 bg-neutral-100 disabled:opacity-40 rounded-xl font-bold text-neutral-950 hover:bg-neutral-200"
            >
              &larr; Sebelumnya
            </button>
            <span className="text-neutral-500">Hal {page} / {data.pagination.totalPages}</span>
            <button
              disabled={page >= data.pagination.totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 bg-neutral-100 disabled:opacity-40 rounded-xl font-bold text-neutral-950 hover:bg-neutral-200"
            >
              Berikutnya &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
