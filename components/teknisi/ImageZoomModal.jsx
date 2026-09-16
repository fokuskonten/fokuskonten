'use client'

import { useState } from 'react'

/**
 * ImageZoomModal.jsx — Lightbox Inspection Zoom-In/Out & Pan
 * Menyajikan inspeksi mikro skema PCB Testpoint & Pinout ISP resolusi tinggi
 */
export default function ImageZoomModal({ isOpen, onClose, imageUrl, title, instructions }) {
  const [zoomLevel, setZoomLevel] = useState(1)

  if (!isOpen || !imageUrl) return null

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 3))
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 1))
  const handleResetZoom = () => setZoomLevel(1)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm p-4">
      <div className="bg-white border border-neutral-200 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
          <div>
            <h3 className="text-base font-extrabold text-neutral-950">{title || 'Inspeksi Skema Resolusi Tinggi'}</h3>
            <p className="text-xs text-neutral-500 font-mono">Gunakan tombol zoom untuk memeriksa titik solder mikro PCB</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-950 transition-colors"
            >
              Zoom -
            </button>
            <button
              onClick={handleResetZoom}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-950 font-mono transition-colors"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-950 transition-colors"
            >
              Zoom +
            </button>
            <button
              onClick={onClose}
              className="ml-4 px-3 py-1.5 bg-neutral-950 text-white hover:bg-neutral-800 rounded-lg text-xs font-bold transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>

        {/* Modal Body / Image Viewer */}
        <div className="flex-1 overflow-auto p-6 bg-neutral-900 flex items-center justify-center min-h-[400px] relative">
          {/* Watermark Chip Lightbox */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span className="px-3 py-1.5 bg-neutral-950/90 text-white font-mono font-bold text-xs rounded-lg uppercase tracking-wider border border-neutral-700 shadow-xl">
              {title}
            </span>
          </div>

          <div className="transition-transform duration-200 ease-out" style={{ transform: `scale(${zoomLevel})` }}>
            <img
              src={imageUrl}
              alt={title || 'Skema PCB'}
              className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-lg cursor-grab active:cursor-grabbing pt-6"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = 'https://via.placeholder.com/800x600?text=Gambar+Skema+Motherboard+Offline'
              }}
            />
          </div>
        </div>

        {/* Modal Footer / Instructions */}
        {instructions && (
          <div className="px-6 py-4 border-t border-neutral-100 bg-white">
            <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider mb-1">Panduan Langkah Jumper:</h4>
            <p className="text-xs text-neutral-700 whitespace-pre-line font-mono">{instructions}</p>
          </div>
        )}
      </div>
    </div>
  )
}
