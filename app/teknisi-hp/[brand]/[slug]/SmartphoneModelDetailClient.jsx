'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getModelDetail } from '@/lib/technicianService'
import DeviceSpecsGrid from '@/components/teknisi/DeviceSpecsGrid'
import TestpointViewer from '@/components/teknisi/TestpointViewer'
import IspPinoutViewer from '@/components/teknisi/IspPinoutViewer'
import TroubleshootTable from '@/components/teknisi/TroubleshootTable'
import DeviceBlueprintSchematic from '@/components/teknisi/DeviceBlueprintSchematic'
import ArticleEducationalGuide from '@/components/teknisi/ArticleEducationalGuide'
import DualDownloadRow from '@/components/teknisi/DualDownloadRow'
import TraktirKopiModal from '@/components/teknisi/TraktirKopiModal'
import BundlePromoBanner from '@/components/teknisi/BundlePromoBanner'
import SidebarHPTools from '@/components/teknisi/SidebarHPTools'
import SmartphoneDetailLoading from './loading'

export default function SmartphoneModelDetailClient({ initialBrand, initialSlug, initialModel }) {
  const brandSlug = initialBrand
  const slug = initialSlug

  const [model, setModel] = useState(initialModel || null)
  const [loading, setLoading] = useState(!initialModel)
  const [activeTraktirFile, setActiveTraktirFile] = useState(null)

  useEffect(() => {
    if (initialModel) return
    async function loadData() {
      if (!brandSlug || !slug) return
      setLoading(true)
      const data = await getModelDetail('hp', brandSlug, slug)
      setModel(data)
      setLoading(false)
    }
    loadData()
  }, [brandSlug, slug, initialModel])

  if (loading) {
    return <SmartphoneDetailLoading />
  }

  if (!model) {
    notFound()
  }

  const files = model.files || []
  const tpFile = files.find(f => (f.type === 'testpoint' || f.file_type === 'testpoint') && !(f.file_name || f.name)?.includes('_isp'))
    || files.find(f => f.type === 'testpoint' || f.file_type === 'testpoint')
  const ispFile = files.find(f => f.type === 'isp' || f.file_type === 'isp' || (f.file_name || f.name)?.includes('_isp'))

  // Judul Baku Mas Muhari: Merek > Type > File > Free Download > + Panduan
  const brandName = (model.brand || (brandSlug ? brandSlug.toUpperCase() : 'Smartphone')).trim()
  let rawModelName = (model.modelName || model.model_name || slug).trim()
  if (rawModelName.toLowerCase().startsWith(brandName.toLowerCase())) {
    rawModelName = rawModelName.substring(brandName.length).trim()
  }
  const modelName = rawModelName
  const fullModelName = `${brandName} ${modelName}`.trim()
  const pageTitle = model.officialTitle || `${fullModelName} — Test Point EDL 9008 & Firehose Loader Free Download + Panduan Flashing Anti Gagal`

  return (
    <div className="space-y-8">
      {/* 1. Detail Header & Breadcrumbs */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4">
        {/* Breadcrumb Teks Mono */}
        <nav className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-500">
          <Link href="/" className="hover:text-neutral-950 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/teknisi-hp/" className="hover:text-neutral-950 transition-colors">Teknisi HP</Link>
          <span>/</span>
          <Link href={`/teknisi-hp/${brandSlug}/`} className="hover:text-neutral-950 transition-colors uppercase">{brandName}</Link>
          <span>/</span>
          <span className="text-neutral-950 font-bold truncate max-w-xs">{modelName}</span>
        </nav>

        {/* H1 Judul Formula Baku */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-neutral-950 text-white font-mono font-bold text-xs rounded-lg uppercase tracking-wider">
              {brandName}
            </span>
            <span className="px-2.5 py-0.5 bg-neutral-950 border border-neutral-800 text-white font-mono text-xs font-bold rounded uppercase">
              {model.chipset || 'Snapdragon / MediaTek'}
            </span>
            <span className="px-2 py-0.5 bg-white border-2 border-neutral-950 text-neutral-950 font-mono text-[10px] font-bold rounded">
              100% TESTED
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight font-mono leading-snug">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* 2. Grid 12-Kolom Datar: 8 Kolom Konten + 4 Kolom Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kolom Kiri: 8 Kolom Konten Utama */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Spesifikasi Perangkat Grid 2x2 Datar */}
          <DeviceSpecsGrid model={model} />

          {/* Skema Gambar Titik Test Point EDL 9008 */}
          {tpFile && (
            <TestpointViewer
              model={model}
              file={tpFile}
              modelName={fullModelName}
            />
          )}

          {/* Diagram ISP Pinout Direct Memory eMMC / UFS */}
          {ispFile && (
            <IspPinoutViewer
              model={model}
              file={ispFile}
              modelName={fullModelName}
            />
          )}

          {/* Tabel Troubleshooting Kendala & Solusi */}
          <TroubleshootTable model={model} />

          {/* Panduan Edukasi Teknis Komprehensif Meja Servis */}
          <ArticleEducationalGuide model={model} />

          {/* DAFTAR BERKAS DENGAN 2 TOMBOL AKSI */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <h3 className="text-xl font-extrabold text-neutral-950 tracking-tight">
                  Daftar Berkas Teruji ({files.length} File)
                </h3>
                <p className="text-xs text-neutral-500 font-mono">
                  Pilih jalur unduhan gratis (Safelink) atau unduh cepat bebas iklan (Traktir Kopi)
                </p>
              </div>
              <span className="px-2.5 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-800 font-mono text-xs font-bold rounded">
                SHA-256 VERIFIED
              </span>
            </div>

            {files.length === 0 ? (
              <div className="p-6 text-center text-xs font-mono text-neutral-500 bg-neutral-50 rounded-xl">
                Berkas untuk model ini sedang dalam proses verifikasi lumbung server.
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {files.map((file, idx) => (
                  <DualDownloadRow
                    key={file.id || idx}
                    file={file}
                    onOpenTraktir={(targetFile) => setActiveTraktirFile(targetFile)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* SATU BANNER PROMOSI PAKET BUNDLE SKU TOKO DIGITAL */}
          <BundlePromoBanner category="hp" />

        </div>

        {/* Kolom Kanan: 4 Kolom Sidebar Otoritas Sticky (Tidak Hilang Saat Scroll) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <SidebarHPTools />

          {/* Blueprint Skematik Punggung HP & Lokasi Testpoint di Bawah Beli Lisensi */}
          <DeviceBlueprintSchematic model={model} />

          {/* Kartu Jaminan Keandalan Berkas */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4">
            <span className="px-2.5 py-0.5 bg-neutral-950 text-white font-mono text-[10px] font-bold rounded uppercase">
              STANDAR LAYANAN
            </span>
            <h4 className="text-sm font-extrabold text-neutral-950">
              Jaminan Keandalan Berkas
            </h4>
            <div className="space-y-2 text-xs text-neutral-600 font-sans leading-relaxed">
              <p>
                Seluruh file firmware, firehose loader, dan skema telah melewati pengujian teknisi laboratorium FokusKonten untuk memastikan bebas malware dan dapat terbaca sempurna oleh box flasher.
              </p>
              <p className="text-[11px] font-mono text-neutral-500 pt-1">
                Koneksi aman dienkripsi SSL 256-bit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Interaktif Traktir Kopi QRIS Auto-Download */}
      <TraktirKopiModal
        isOpen={Boolean(activeTraktirFile)}
        onClose={() => setActiveTraktirFile(null)}
        file={activeTraktirFile}
        modelName={modelName}
        brand={brandName}
      />
    </div>
  )
}
