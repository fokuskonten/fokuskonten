'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

/**
 * CountdownAdSense.jsx — Widget Hitung Mundur 8 Detik AdSense (Zero CLS)
 * Mematuhi AdSense Policy: Disajikan dalam format Tech Article dengan unit resmi ca-pub-8431039930287287
 */
export default function CountdownAdSense({ file }) {
  const [seconds, setSeconds] = useState(8)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(prev => prev - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setIsReady(true)
    }
  }, [seconds])

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (_) {}
  }, [])

  if (!file) return null

  const fileId = file.gdrive_file_id || ''
  const directUrl = file.gdrive_direct_url || `https://drive.google.com/file/d/${fileId}/view?usp=sharing`

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
      {/* Script AdSense Resmi */}
      <Script
        id="adsbygoogle-init"
        strategy="lazyOnload"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8431039930287287"
        crossOrigin="anonymous"
      />

      {/* Header Info */}
      <div className="text-center space-y-2 pb-4 border-b border-neutral-100">
        <span className="px-3 py-1 bg-neutral-950 text-white font-mono font-bold text-xs rounded-lg uppercase tracking-wider">
          SERVER UTAMA GDrive
        </span>
        <h3 className="text-lg font-extrabold text-neutral-950 font-mono">{file.file_name}</h3>
        <p className="text-xs text-neutral-500 font-mono">Ukuran Berkas: {file.file_size_formatted || '4.2 MB'}</p>
      </div>

      {/* AdSense Locked Container (Zero CLS - Exact Height) */}
      <div className="min-h-[280px] bg-neutral-50 border border-neutral-200 rounded-xl p-4 flex flex-col items-center justify-center text-center overflow-hidden">
        <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono mb-2">
          UNIT SPONSOR RESMI FOKUSKONTEN
        </span>

        {/* Tag Resmi Ins AdSense */}
        <ins
          className="adsbygoogle block w-full text-center"
          style={{ display: 'block', minHeight: '250px' }}
          data-ad-client="ca-pub-8431039930287287"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      {/* Countdown Progress & Direct Master Link */}
      <div className="text-center space-y-4 pt-2">
        {!isReady ? (
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center px-6 py-3 bg-neutral-100 border border-neutral-300 rounded-xl font-mono text-sm font-extrabold text-neutral-950">
              Menyiapkan Server Utama dalam <span className="text-base text-neutral-950 mx-2 underline decoration-2">{seconds}</span> detik...
            </div>
            <p className="text-xs text-neutral-500 font-mono">Verifikasi checksum SHA-256 dan integritas lumbung GDrive master</p>
          </div>
        ) : (
          <div className="space-y-3">
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full sm:w-auto px-8 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-sm rounded-xl shadow-xl transition-all font-mono tracking-wider uppercase"
            >
              Buka Berkas Google Drive Master
            </a>
            <p className="text-xs text-neutral-500 font-mono">Unduhan langsung kecepatan tinggi tanpa batasan kuota</p>
          </div>
        )}
      </div>
    </div>
  )
}
