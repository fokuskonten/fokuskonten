'use client'

import { useState, useEffect } from 'react'
import ImageZoomModal from './ImageZoomModal'
import { isImageQuarantined } from '@/lib/quarantineHelper'

/**
 * IspPinoutViewer.jsx — Penampil Pinout Direct ISP (eMMC / UFS)
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md: Multi-tier CDN, zero bahasa developer, zero emoji
 * Props: mendukung dua format pemanggilan:
 *   - { model, file } — format legacy
 *   - { model, ispFile, modelName } — format SmartphoneModelDetailClient
 */
export default function IspPinoutViewer({ model, file, ispFile, modelName }) {
  // Resolusi file aktif: prioritas file > ispFile
  const activeFile = file || ispFile

  // Resolusi nama tampilan
  const displayName = modelName || model?.model_name || model?.modelName || 'Model'

  // Resolusi ketersediaan konten
  const hasContent = !!(activeFile?.gdrive_file_id || activeFile?.gdrive_direct_url || activeFile?.file_name)
  const hasModelFlag = !!(model?.has_isp === 1 || model?.has_isp === true)

  // Resolusi nama file WebP dan URL CDN multi-tier
  const brandSlug = (model?.brand_slug || model?.brandSlug || model?.brand || '').toLowerCase().replace(/[^a-z0-9]/g, '')
  const rawFileName = activeFile?.file_name || activeFile?.name || ''
  const baseFileName = rawFileName
    ? rawFileName.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    : null

  // VALIDASI FISIK: Cegah foto komersial / iklan / non-PCB tampil sebagai ISP pinout
  const isQuarantined = isImageQuarantined(rawFileName) || isImageQuarantined(baseFileName)

  // 1. jsDelivr Edge CDN (Rekomendasi Utama: Tercepat, Global Multi-Edge)
  const cdnJsDelivrUrl = (!isQuarantined && baseFileName)
    ? `https://cdn.jsdelivr.net/gh/mcjobs-id/fokuskonten-assets@main/isp/${brandSlug}/${baseFileName}`
    : null

  // 2. GitHub Pages CDN (Cermin Langsung Repositori)
  const cdnGhPagesUrl = (!isQuarantined && baseFileName)
    ? `https://mcjobs-id.github.io/fokuskonten-assets/isp/${brandSlug}/${baseFileName}`
    : null

  // 3. Fallback Google Drive CDN (dengan no-referrer)
  const extractedId = activeFile?.gdrive_direct_url ? activeFile.gdrive_direct_url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] : ''
  const fileId = activeFile?.gdrive_file_id || extractedId || ''
  const gdriveUrl = (!isQuarantined && fileId)
    ? `https://lh3.googleusercontent.com/d/${fileId}=w1000`
    : (!isQuarantined && activeFile?.gdrive_direct_url ? activeFile.gdrive_direct_url : null)

  const initialImageUrl = cdnJsDelivrUrl || gdriveUrl || cdnGhPagesUrl

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imgFailed, setImgFailed] = useState(isQuarantined)
  const [currentSrc, setCurrentSrc] = useState(initialImageUrl)
  const [cdnTier, setCdnTier] = useState(1) // 1: jsDelivr, 2: GitHub Pages, 3: Google Drive

  useEffect(() => {
    if (isQuarantined) {
      setCurrentSrc(null)
      setImgFailed(true)
      return
    }
    setCurrentSrc(cdnJsDelivrUrl || gdriveUrl || cdnGhPagesUrl)
    setImgFailed(false)
    setCdnTier(1)
  }, [cdnJsDelivrUrl, gdriveUrl, cdnGhPagesUrl, isQuarantined])

  // Jika tidak ada file fisik DAN flag model tidak ada → tampilkan pesan faktual
  if (!hasContent && !hasModelFlag) {
    return (
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] text-center space-y-2">
        <h3 className="text-base font-extrabold text-neutral-950">Direct ISP Pinout (eMMC / UFS)</h3>
        <p className="text-xs text-neutral-500 font-mono">
          Jalur Direct ISP belum dipetakan untuk varian board ini. Gunakan jalur Testpoint EDL 9008 di atas untuk perbaikan software.
        </p>
      </div>
    )
  }

  const pinSignals = [
    { label: 'CLK', desc: 'Clock Signal' },
    { label: 'CMD', desc: 'Command Line' },
    { label: 'DAT0', desc: 'Data Line 0' },
    { label: 'VCC', desc: 'Core Power 2.8V / 3.3V' },
    { label: 'VCCQ', desc: 'IO Power 1.8V' },
    { label: 'GND', desc: 'Ground Reference' }
  ]

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-2">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-950 tracking-tight">Pinout Direct ISP (eMMC / UFS Memory)</h2>
          <p className="text-xs text-neutral-500 font-mono">Titik Jumper Direct Repair UFI / EasyJTAG / Medusa Box</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 bg-neutral-950 text-white font-mono font-bold text-xs rounded-lg uppercase tracking-wider self-start sm:self-auto">
          DIRECT MEMORY VERIFIED
        </span>
      </div>

      {/* Signal Chips Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {pinSignals.map((sig, idx) => (
          <div key={idx} className="p-2.5 bg-neutral-950 text-white rounded-xl text-center font-mono">
            <span className="text-xs font-bold block">{sig.label}</span>
            <span className="text-[10px] text-neutral-400 block truncate">{sig.desc}</span>
          </div>
        ))}
      </div>

      {/* Media Image Container */}
      {currentSrc && !imgFailed ? (
        <div className="relative group bg-neutral-900 rounded-xl overflow-hidden min-h-[250px] flex items-center justify-center border border-neutral-200">
          
          {/* Watermark Chip Merek & Tipe Resmi */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10 gap-2">
            <span className="px-3 py-1 bg-neutral-950/90 backdrop-blur-md text-white font-mono font-bold text-xs rounded-lg uppercase tracking-wider border border-neutral-700 shadow-lg truncate max-w-[70%]">
              {(model?.brand || 'SMARTPHONE').toUpperCase()} • {displayName}
            </span>
            <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md text-neutral-950 font-mono font-bold text-[10px] rounded-lg border border-neutral-300 shadow-md uppercase shrink-0">
              DIRECT ISP VERIFIED
            </span>
          </div>

          <img
            src={currentSrc}
            alt={`Pinout ISP ${displayName}`}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            className="max-h-[360px] w-full object-contain p-2 pt-10 pb-6"
            onError={() => {
              if (cdnTier === 1 && cdnGhPagesUrl && currentSrc !== cdnGhPagesUrl) {
                setCdnTier(2)
                setCurrentSrc(cdnGhPagesUrl)
              } else if (cdnTier <= 2 && gdriveUrl && currentSrc !== gdriveUrl) {
                setCdnTier(3)
                setCurrentSrc(gdriveUrl)
              } else {
                setImgFailed(true)
              }
            }}
          />

          {/* Watermark Label Footer Bawah */}
          <div className="absolute bottom-2.5 left-3 pointer-events-none z-10">
            <span className="text-[10px] font-mono font-bold text-neutral-400 bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800">
              FokusKonten Lab • Direct Memory Pinout
            </span>
          </div>

          <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-white text-neutral-950 font-extrabold text-xs rounded-xl shadow-xl hover:bg-neutral-100 transition-colors tracking-wider uppercase font-mono"
            >
              Inspeksi Pinout HD
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-xl text-center space-y-1.5">
          <p className="text-xs font-bold text-neutral-950 font-mono">
            {isQuarantined
              ? 'Pinout ISP Fisik Dalam Verifikasi Laboratorium'
              : 'Diagram Jalur ISP Sedang Dimuat'}
          </p>
          <p className="text-[11px] text-neutral-500 font-mono">
            {isQuarantined
              ? 'Diagram titik solder eMMC/UFS sedang divalidasi mikroskop laboratorium. Silakan gunakan skematik blueprint hardware di bawah dan unduh berkas resmi.'
              : 'Pratinjau visual sedang diproses. Silakan unduh berkas pinout resmi pada daftar di bawah.'}
          </p>
        </div>
      )}

      {/* Instructions */}
      {model?.instructions && (
        <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">Prosedur Solder ISP Direct:</span>
          <p className="text-xs text-neutral-800 font-mono whitespace-pre-line leading-relaxed">{model.instructions}</p>
        </div>
      )}

      {/* Lightbox Zoom Modal */}
      {currentSrc && (
        <ImageZoomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageUrl={currentSrc}
          title={`Pinout Direct ISP — ${displayName}`}
          instructions={model?.instructions}
        />
      )}
    </div>
  )
}
