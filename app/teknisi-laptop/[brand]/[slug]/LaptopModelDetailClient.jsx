'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getModelDetail } from '@/lib/technicianService'
import DualDownloadRow from '@/components/teknisi/DualDownloadRow'
import TraktirKopiModal from '@/components/teknisi/TraktirKopiModal'
import BundlePromoBanner from '@/components/teknisi/BundlePromoBanner'
import SidebarHPTools from '@/components/teknisi/SidebarHPTools'
import LaptopDetailLoading from './loading'

export default function LaptopModelDetailClient({ initialBrand, initialSlug, initialModel }) {
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
      const data = await getModelDetail('laptop', brandSlug, slug)
      setModel(data)
      setLoading(false)
    }
    loadData()
  }, [brandSlug, slug, initialModel])

  if (loading) {
    return <LaptopDetailLoading />
  }

  if (!model) {
    notFound()
  }

  const files = model.files || []
  const brandName = model.brand || (brandSlug ? brandSlug.toUpperCase() : 'Laptop')
  const modelName = model.modelName || model.model_name || slug
  const mbCode = model.motherboardCode || model.motherboard_code || ''

  // Judul Baku Mas Muhari: Merek > Type > File > Free Download > + Panduan
  const pageTitle = model.officialTitle || `${brandName} ${modelName} ${mbCode ? '(' + mbCode + ') ' : ''}— Skema PDF & Boardview CAD Free Download + Panduan Jalur 19V & Standby`

  return (
    <div className="space-y-8">
      {/* 1. Detail Header & Breadcrumbs */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4">
        {/* Breadcrumb Teks Mono */}
        <nav className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-500">
          <Link href="/" className="hover:text-neutral-950 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/teknisi-laptop/" className="hover:text-neutral-950 transition-colors">Skema Laptop</Link>
          <span>/</span>
          <Link href={`/teknisi-laptop/${brandSlug}/`} className="hover:text-neutral-950 transition-colors uppercase">{brandName}</Link>
          <span>/</span>
          <span className="text-neutral-950 font-bold truncate max-w-xs">{modelName}</span>
        </nav>

        {/* H1 Judul Formula Baku */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-neutral-950 text-white font-mono font-bold text-xs rounded-lg uppercase tracking-wider">
              {brandName}
            </span>
            {mbCode && (
              <span className="px-2.5 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-950 font-mono text-xs font-bold rounded uppercase">
                BOARD: {mbCode}
              </span>
            )}
            <span className="px-2.5 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-800 font-mono text-[10px] font-bold rounded">
              SCHEMATIC & BOARDVIEW
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
          
          {/* Spesifikasi Motherboard Grid 2x2 Datar */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="text-xs font-mono font-bold uppercase text-neutral-500 tracking-wider">
                IDENTIFIKASI MOTHERBOARD & ARSITEKTUR
              </span>
              <span className="text-xs font-mono text-neutral-400">HARDWARE DATA</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1">
                <span className="text-neutral-500 text-[10px] uppercase">Merek & Model Casing</span>
                <p className="font-extrabold text-neutral-950 text-sm truncate">{brandName} {modelName}</p>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1">
                <span className="text-neutral-500 text-[10px] uppercase">Kode Part Motherboard PCB</span>
                <p className="font-extrabold text-neutral-950 text-sm truncate">{mbCode || 'OEM Proprietary'}</p>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1">
                <span className="text-neutral-500 text-[10px] uppercase">Platform Processor</span>
                <p className="font-extrabold text-neutral-950 text-sm truncate">{model.chipset || 'Intel / AMD APU'}</p>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1">
                <span className="text-neutral-500 text-[10px] uppercase">Ketersediaan Format Berkas</span>
                <p className="font-extrabold text-neutral-950 text-sm truncate">PDF Schematic & CAD Boardview</p>
              </div>
            </div>
          </div>

          {/* Panduan Diagnosa Jalur Tegangan Standby */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="text-xs sm:text-sm font-mono font-bold uppercase text-neutral-500 tracking-wider">
                PANDUAN PENGUKURAN TEGANGAN & MATI TOTAL
              </span>
              <span className="px-2.5 py-1 bg-neutral-950 text-white font-mono text-xs font-bold rounded">
                REPAIR GUIDE
              </span>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-neutral-800 font-sans leading-relaxed">
              <p>
                Gunakan berkas skema rangkaian dan boardview ini untuk melacak jalur distribusi tegangan utama motherboard <strong>{modelName}</strong>:
              </p>
              <div className="space-y-3 font-mono text-xs sm:text-sm pt-1">
                <div className="flex items-start gap-3 p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <span className="w-6 h-6 bg-neutral-950 text-white rounded-md flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">1</span>
                  <span className="text-neutral-700 leading-relaxed font-sans"><strong>Jalur Utama 19V (VIN / B+):</strong> Ukur tegangan pada kapasitor input dan kedua MOSFET switching pertama setelah konektor DC-IN.</span>
                </div>
                <div className="flex items-start gap-3 p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <span className="w-6 h-6 bg-neutral-950 text-white rounded-md flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">2</span>
                  <span className="text-neutral-700 leading-relaxed font-sans"><strong>Jalur Standby 3V & 5V:</strong> Ukur output kedua induktor/lilitan coil PWM regulator standby sebelum tombol power ditekan.</span>
                </div>
                <div className="flex items-start gap-3 p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <span className="w-6 h-6 bg-neutral-950 text-white rounded-md flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">3</span>
                  <span className="text-neutral-700 leading-relaxed font-sans"><strong>Sinyal Power Sequence:</strong> Pantau sinyal enable dari Embedded Controller (EC / KBC) menuju IC regulator CPU Core.</span>
                </div>
              </div>
            </div>
          </div>

          {/* DAFTAR BERKAS DENGAN 2 TOMBOL AKSI */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <h3 className="text-xl font-extrabold text-neutral-950 tracking-tight">
                  Berkas Skema & Boardview ({files.length} File)
                </h3>
                <p className="text-xs text-neutral-500 font-mono">
                  Pilih jalur unduhan gratis (Safelink) atau unduh cepat bebas iklan (Traktir Kopi)
                </p>
              </div>
              <span className="px-2.5 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-800 font-mono text-xs font-bold rounded">
                CLEAN REVISION
              </span>
            </div>

            {files.length === 0 ? (
              <div className="p-6 text-center text-xs font-mono text-neutral-500 bg-neutral-50 rounded-xl">
                Berkas skema untuk motherboard ini sedang disinkronisasi ke server.
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

          {/* SATU BANNER PROMOSI PAKET BUNDLE SKU TOKO DIGITAL LAPTOP */}
          <BundlePromoBanner category="laptop" />

        </div>

        {/* Kolom Kanan: 4 Kolom Sidebar Otoritas Sticky (Tidak Hilang Saat Scroll) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <SidebarHPTools />

          {/* Kartu Software Viewer Resmi */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4">
            <span className="px-2.5 py-0.5 bg-neutral-950 text-white font-mono text-[10px] font-bold rounded uppercase">
              SOFTWARE VIEWER
            </span>
            <h4 className="text-sm font-extrabold text-neutral-950">
              Software Pembuka Boardview (.CAD / .FZ / .BRD)
            </h4>
            <div className="space-y-2 text-xs text-neutral-600 font-sans leading-relaxed">
              <p>
                Untuk membuka berkas boardview, gunakan software standar industri gratis:
              </p>
              <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-neutral-800 pt-1">
                <li><strong>OpenBoardView:</strong> Multi-platform viewer (.brd, .cad, .bvr)</li>
                <li><strong>BoardViewer:</strong> Windows native viewer (.asc, .bdv, .fz)</li>
                <li><strong>Acrobat Reader:</strong> Untuk membuka dokumen skema .PDF</li>
              </ul>
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
