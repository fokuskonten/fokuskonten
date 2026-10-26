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
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* HEADER SECTION LATAR TERANG */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
            Demo &amp; Bukti Nyata Operasional
          </span>
          <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3 tracking-tight">
            Tonton Langsung Alur Kerja Kelontong Pro
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Tanpa teori berbelit. Saksikan curhatan nyata seputar sengkarut pembukuan toko kelontong manual (bon utang &amp; selisih kulakan dus), serta rekaman layar kasir POS, barcode scanner kilat, konversi multi-satuan, dan pembukuan laba rugi langsung dari handphone kasir.
          </p>
        </div>

        {/* DUA SMARTPHONE REEL CONTAINER DENGAN LATAR TERANG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          
          {/* REEL 1: HOOK / CERITA PEMILIK TOKO (90 DETIK) */}
          <div className="flex flex-col items-center">
            {/* Mockup Smartphone Bingkai Halus */}
            <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-3xl border-2 border-neutral-300 shadow-xl bg-black overflow-hidden group">
              {/* Punch hole kamera atas */}
              <div className="w-3 h-3 rounded-full bg-neutral-900 border border-neutral-700 mx-auto absolute top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none"></div>

              {/* Video Element */}
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
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 flex flex-col justify-between p-5 cursor-pointer z-20 group"
                >
                  {/* Badge Atas Non-Kapsul */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono font-bold tracking-wider border border-neutral-700">
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
                    <p className="text-white text-xs font-semibold drop-shadow-md line-clamp-2">
                      Sengkarut Kulakan Dus Jual Ecer &amp; Bon Utang Pembeli Tercecer
                    </p>
                    <span className="text-neutral-300 text-[10px] font-mono mt-1 block">
                      Klik untuk memutar audio &amp; video
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Keterangan & Poin Masalah di Bawah Video */}
            <div className="mt-5 text-center max-w-xs">
              <h3 className="font-display font-bold text-base text-neutral-950 mb-1.5">
                Keresahan Harian Warung Sembako
              </h3>
              <p className="text-neutral-600 text-xs leading-relaxed font-sans mb-3">
                Kisah nyata tantangan pemilik toko kelontong dalam menertibkan catatan keuangan dan barang dagangan.
              </p>
              <div className="space-y-1.5 text-left text-xs font-medium text-neutral-700 bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Uang kas tekor karena hitungan margin kulakan dus meleset</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Buku bon utang terselip dan piutang pembeli menumpuk</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Antrean macet saat warung ramai karena hitung manual</span>
                </div>
              </div>
            </div>
          </div>

          {/* REEL 2: DEMO FITUR NYATA / SOLUSI (178 DETIK) */}
          <div className="flex flex-col items-center">
            {/* Mockup Smartphone Bingkai Halus */}
            <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-3xl border-2 border-neutral-300 shadow-xl bg-black overflow-hidden group">
              {/* Punch hole kamera atas */}
              <div className="w-3 h-3 rounded-full bg-neutral-900 border border-neutral-700 mx-auto absolute top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none"></div>

              {/* Video Element */}
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
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 flex flex-col justify-between p-5 cursor-pointer z-20 group"
                >
                  {/* Badge Atas Non-Kapsul */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono font-bold tracking-wider border border-neutral-700">
                      DEMO LIVE KASIR
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
                    <p className="text-white text-xs font-semibold drop-shadow-md line-clamp-2">
                      Live In-App: Scan Barcode, Multi-Satuan &amp; Cetak Struk
                    </p>
                    <span className="text-neutral-300 text-[10px] font-mono mt-1 block">
                      Klik untuk melihat alur sistem kasir nyata
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Keterangan & Poin Solusi di Bawah Video */}
            <div className="mt-5 text-center max-w-xs">
              <h3 className="font-display font-bold text-base text-neutral-950 mb-1.5">
                Solusi Nyata Kelontong Pro
              </h3>
              <p className="text-neutral-600 text-xs leading-relaxed font-sans mb-3">
                Rekaman layar langsung di handphone tanpa rekayasa mockup promosi yang berlebihan.
              </p>
              <div className="space-y-1.5 text-left text-xs font-medium text-neutral-800 bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>Scan barcode kamera cepat 1 detik &amp; total otomatis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>Pecah satuan dus ke renceng &amp; eceran tanpa tekor modal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>Cetak struk bluetooth &amp; buku piutang 100% offline</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
