'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getModelsByBrand } from '../../../lib/technicianService'
import BrandLogo from '../../../components/teknisi/BrandLogo'

export default function BrandModelsClient({ initialBrand, initialData }) {
  const brandSlug = initialBrand
  const [data, setData] = useState(initialData || null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(!initialData)

  useEffect(() => {
    // Jika halaman 1 dan sudah ada initialData, tidak perlu fetch ulang
    if (page === 1 && initialData) {
      setData(initialData)
      setLoading(false)
      return
    }

    async function loadModels() {
      if (!brandSlug) return
      setLoading(true)
      const res = await getModelsByBrand('hp', brandSlug, page, 60)
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
            KATALOG MEREK
          </span>
          <h1 className="text-3xl font-extrabold text-neutral-950 tracking-tight mt-2 font-mono">
            Katalog Perangkat {brandName}
          </h1>
          <p className="text-xs text-neutral-500 font-mono mt-1">
            Daftar model smartphone {brandName} terverifikasi dengan berkas Testpoint EDL 9008 & Direct ISP.
          </p>
        </div>
        <Link
          href="/teknisi-hp"
          className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-950 font-bold text-xs rounded-xl font-mono transition-colors self-start sm:self-auto"
        >
          &larr; Kembali ke Hub Merek
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
          <div className="py-12 text-center text-xs font-mono text-neutral-400">Memuat katalog model...</div>
        ) : !data || data.data.length === 0 ? (
          <div className="py-12 text-center text-xs font-mono text-neutral-500">
            Belum ada model terverifikasi untuk merek ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {data.data.map((item) => (
              <Link
                key={item.id}
                href={`/teknisi-hp/${brandSlug}/${item.slug}`}
                className="bg-white border border-neutral-200 hover:border-neutral-950 rounded-xl transition-all group flex flex-col overflow-hidden hover:shadow-sm"
              >
                {/* Thumbnail Preview: jsDelivr Edge CDN WebP / Google Drive CDN / Loader Microchip Elegan */}
                {(() => {
                  const tpFile = item.files?.find(f => (f.type === 'testpoint' || f.file_type === 'testpoint') && !(f.file_name || f.name)?.includes('_isp'))
                  const ispFile = item.files?.find(f => f.type === 'isp' || f.file_type === 'isp' || (f.file_name || f.name)?.includes('_isp'))
                  const activeImgFile = tpFile || ispFile
                  const isIsp = !tpFile && !!ispFile
                  const rawName = activeImgFile?.file_name || activeImgFile?.name || ''
                  const cleanFileName = rawName ? rawName.replace(/\.(jpg|jpeg|png)$/i, '.webp') : null
                  const folder = isIsp ? 'isp' : 'testpoint'
                  const extractedId = activeImgFile?.gdrive_direct_url ? activeImgFile.gdrive_direct_url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] : ''
                  const gdriveId = activeImgFile?.gdrive_file_id || extractedId || ''
                  const cdnUrl = cleanFileName
                    ? `https://cdn.jsdelivr.net/gh/mcjobs-id/fokuskonten-assets@main/${folder}/${brandSlug}/${cleanFileName}`
                    : (gdriveId ? `https://lh3.googleusercontent.com/d/${gdriveId}=w400` : null)

                  const isLoaderOnly = (item.has_loader === 1 || (item.fileTypes && item.fileTypes.includes('loader'))) && !tpFile && !ispFile

                  return cdnUrl ? (
                    <div className="w-full h-28 bg-neutral-900 overflow-hidden relative">
                      <img
                        src={cdnUrl}
                        alt={`Preview ${item.modelName || item.model_name}`}
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          if (gdriveId && e.target.src !== `https://lh3.googleusercontent.com/d/${gdriveId}=w400`) {
                            e.target.src = `https://lh3.googleusercontent.com/d/${gdriveId}=w400`
                          } else {
                            e.target.style.display = 'none'
                          }
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <span className="px-1.5 py-0.5 bg-white text-neutral-950 font-mono text-[8px] font-extrabold rounded shadow">
                          {isIsp ? 'ISP' : 'TP'}
                        </span>
                      </div>
                    </div>
                  ) : isLoaderOnly ? (
                    <div className="w-full h-28 bg-neutral-950 border-b border-neutral-900 flex flex-col items-center justify-center p-3 relative group-hover:bg-neutral-900 transition-colors text-white">
                      <div className="flex items-center gap-2 mb-1.5">
                        <BrandLogo brand={brandSlug} size="sm" className="bg-neutral-900 border-neutral-800 text-white" />
                        <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-white font-mono text-[9px] font-extrabold uppercase tracking-wider">
                          FIREHOSE LOADER
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-neutral-300">EDL 9008 Programmer Binary</span>
                      <span className="text-[9px] font-mono text-neutral-500 mt-0.5">Berkas Raw .BIN / .ELF</span>
                    </div>
                  ) : (
                    <div className="w-full h-28 bg-neutral-50 border-b border-neutral-100 flex flex-col items-center justify-center p-3 relative group-hover:bg-neutral-100 transition-colors">
                      <BrandLogo brand={brandSlug} size="md" />
                      <span className="text-[10px] font-mono text-neutral-500 mt-2 font-bold">Skema & Dokumen Teknis</span>
                    </div>
                  )
                })()}

                <div className="p-4 flex flex-col justify-between space-y-2 flex-1">
                  <div>
                    <h3 className="text-sm font-extrabold text-neutral-950 group-hover:underline font-mono leading-tight">
                      {item.modelName || item.model_name}
                    </h3>
                    <p className="text-[11px] text-neutral-400 font-mono mt-0.5">{item.chipset || item.type}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                    <div className="flex items-center space-x-1.5">
                      {(item.has_testpoint === 1 || (item.fileTypes && item.fileTypes.includes('testpoint'))) && (
                        <span className="px-1.5 py-0.5 bg-neutral-950 text-white font-mono text-[9px] font-bold rounded">TP</span>
                      )}
                      {(item.has_isp === 1 || (item.fileTypes && item.fileTypes.includes('isp'))) && (
                        <span className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-950 font-mono text-[9px] font-bold rounded">ISP</span>
                      )}
                      {(item.has_loader === 1 || (item.fileTypes && item.fileTypes.includes('loader'))) && (
                        <span className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-950 font-mono text-[9px] font-bold rounded">LDR</span>
                      )}
                    </div>
                    <span className="text-xs text-neutral-400 font-mono group-hover:text-neutral-950">Lihat Model &rarr;</span>
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
