'use client'

import { useRef, useState } from 'react'

export default function DualReelKelontongShowcase() {
  const [playingVideo, setPlayingVideo] = useState(null) // 'hook' | 'demo' | null
  const hookVideoRef = useRef(null)
  const demoVideoRef = useRef(null)

  const handlePlay = (id) => {
    if (id === 'hook') {
      if (demoVideoRef.current) {
        demoVideoRef.current.pause()
      }
      if (hookVideoRef.current) {
        hookVideoRef.current.play()
      }
      setPlayingVideo('hook')
    } else if (id === 'demo') {
      if (hookVideoRef.current) {
        hookVideoRef.current.pause()
      }
      if (demoVideoRef.current) {
        demoVideoRef.current.play()
      }
      setPlayingVideo('demo')
    }
  }

  const handlePause = (id) => {
    if (playingVideo === id) {
      setPlayingVideo(null)
    }
  }

  return (
    <section className="py-20 sm:py-24 bg-neutral-50/70 border-b border-neutral-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION LATAR TERANG */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
            Demo &amp; Bukti Nyata Operasional
          </span>
          <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3 tracking-tight">
            Tonton 2 Video Alur Kerja Kelontong Pro
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Tanpa teori berbelit. Saksikan curhatan nyata sengkarut warung manual (buku bon robek dan uang kas campur kantong pribadi), serta rekaman presentasi operasional kasir POS, scanner, konversi dus ke eceran, hingga laporan laba rugi langsung dari perangkat Android.
          </p>
        </div>

        {/* DUA SMARTPHONE FULL-FRAME MOCKUP CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto justify-items-center">
          
          {/* REEL 1: HOOK / CERITA PEMILIK TOKO (90 DETIK) */}
          <div className="flex flex-col items-center w-full max-w-[360px]">
            {/* Full-Frame Smartphone Mockup */}
            <div className="relative w-full aspect-[9/19.5] rounded-[2.5rem] border-[4px] border-neutral-900 shadow-2xl bg-black overflow-hidden group ring-1 ring-neutral-800/50">
              {/* Video Element Full Frame */}
              <video
                ref={hookVideoRef}
                src="/videos/tokokelontongpro/kelontongpro_hook.mp4"
                poster="/videos/tokokelontongpro/poster_hook.jpg"
                playsInline
                controls={playingVideo === 'hook'}
                onPause={() => handlePause('hook')}
                onEnded={() => handlePause('hook')}
                className="w-full h-full object-cover"
              />

              {/* Overlay Thumbnail & Tombol Play (Saat Belum Diputar) */}
              {playingVideo !== 'hook' && (
                <div
                  onClick={() => handlePlay('hook')}
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 flex flex-col justify-between p-5 cursor-pointer z-20 group"
                >
                  {/* Badge Atas Non-Kapsul */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="px-2.5 py-1 rounded bg-black/80 text-white text-[10px] font-mono font-bold tracking-wider border border-neutral-700">
                      CURHATAN WARUNG
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono font-bold">
                      01:30
                    </span>
                  </div>

                  {/* Tombol Play Besar */}
                  <div className="self-center">
                    <div className="w-16 h-16 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-7 h-7 text-neutral-950 ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Keterangan Bawah */}
                  <div className="text-left pb-1">
                    <p className="text-white font-display font-bold text-sm leading-tight mb-1">
                      Uang Kasir Menguap &amp; Kulakan Meleset
                    </p>
                    <p className="text-neutral-300 text-[11px] leading-relaxed line-clamp-2">
                      Sengkarut buku bon robek, kalkulator kusam, dan uang kas campur kantong pribadi.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Label Keterangan Luar */}
            <div className="text-center mt-4">
              <h3 className="font-display font-bold text-neutral-950 text-base">Reel 1: Masalah Nyata Warung</h3>
              <p className="text-neutral-500 text-xs mt-0.5">90 Detik Cerita Pemilik Toko &amp; Solusi</p>
            </div>
          </div>

          {/* REEL 2: PRESENTASI RESMI OPERASIONAL (178 DETIK) */}
          <div className="flex flex-col items-center w-full max-w-[360px]">
            {/* Full-Frame Smartphone Mockup */}
            <div className="relative w-full aspect-[9/19.5] rounded-[2.5rem] border-[4px] border-neutral-900 shadow-2xl bg-black overflow-hidden group ring-1 ring-neutral-800/50">
              {/* Video Element Full Frame */}
              <video
                ref={demoVideoRef}
                src="/videos/tokokelontongpro/kelontongpro_demo.mp4"
                poster="/videos/tokokelontongpro/poster_demo.jpg"
                playsInline
                controls={playingVideo === 'demo'}
                onPause={() => handlePause('demo')}
                onEnded={() => handlePause('demo')}
                className="w-full h-full object-cover"
              />

              {/* Overlay Thumbnail & Tombol Play (Saat Belum Diputar) */}
              {playingVideo !== 'demo' && (
                <div
                  onClick={() => handlePlay('demo')}
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 flex flex-col justify-between p-5 cursor-pointer z-20 group"
                >
                  {/* Badge Atas Non-Kapsul */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="px-2.5 py-1 rounded bg-black/80 text-white text-[10px] font-mono font-bold tracking-wider border border-neutral-700">
                      PRESENTASI RESMI
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono font-bold">
                      02:58
                    </span>
                  </div>

                  {/* Tombol Play Besar */}
                  <div className="self-center">
                    <div className="w-16 h-16 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-7 h-7 text-neutral-950 ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Keterangan Bawah */}
                  <div className="text-left pb-1">
                    <p className="text-white font-display font-bold text-sm leading-tight mb-1">
                      Tur Lengkap Fitur Kelontong Pro
                    </p>
                    <p className="text-neutral-300 text-[11px] leading-relaxed line-clamp-2">
                      Bedah tuntas kasir POS, scanner, konversi multi-satuan dus ke eceran, buku piutang bon warga, hingga laporan keuangan laba rugi.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Label Keterangan Luar */}
            <div className="text-center mt-4">
              <h3 className="font-display font-bold text-neutral-950 text-base">Reel 2: Presentasi Resmi</h3>
              <p className="text-neutral-500 text-xs mt-0.5">178 Detik Tur Menyeluruh Antarmuka</p>
            </div>
          </div>

        </div>

        {/* CATATAN KAKI DI BAWAH REEL */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-200/60 text-neutral-700 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Semua fitur di video dapat langsung Anda uji coba secara gratis</span>
          </div>
        </div>

      </div>
    </section>
  )
}
