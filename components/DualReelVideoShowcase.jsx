'use client'

import { useRef, useState } from 'react'

export default function DualReelVideoShowcase() {
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
            Tonton Langsung Alur Kerja Apotek Pro
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Tanpa teori berbelit. Saksikan curhatan nyata seputar sengkarut pembukuan apotek manual, serta rekaman layar kasir POS, kalkulator racikan puyer, dan alarm expired FEFO langsung dari perangkat handphone.
          </p>
        </div>

        {/* DUA SMARTPHONE REEL CONTAINER DENGAN LATAR TERANG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          
          {/* REEL 1: HOOK / CERITA PEMILIK APOTEK (60 DETIK) */}
          <div className="flex flex-col items-center">
            {/* Mockup Smartphone Bingkai Halus */}
            <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-3xl border-2 border-neutral-300 shadow-xl bg-black overflow-hidden group">
              {/* Punch hole kamera atas */}
              <div className="w-3 h-3 rounded-full bg-neutral-900 border border-neutral-700 mx-auto absolute top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none"></div>

              {/* Video Element */}
              <video
                ref={hookVideoRef}
                src="/videos/apotekpro/apotekpro_hook.mp4"
                poster="/videos/apotekpro/poster_hook.jpg"
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
                      CURHATAN NYATA
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono font-bold">
                      01:00
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
                    <p className="text-xs text-white font-display font-bold leading-snug">
                      Pusing Obat Expired &amp; Tagihan Supplier?
                    </p>
                    <p className="text-[11px] text-neutral-300 font-sans mt-0.5">
                      Klik untuk memutar cerita (60 Detik)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Copywriting Deskripsi Reel 1 Latar Terang */}
            <div className="text-center md:text-left mt-6 max-w-[320px] w-full">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                Realita Operasional Apotek
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-neutral-950 mb-2 leading-snug">
                Mengapa Pembukuan Manual Diam-Diam Menggerus Omzet?
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans mb-3">
                Rela kurang tidur demi jaga apotek, tapi pas cek rak obat malah banyak yang kedaluwarsa? Cemas tiap ada telepon masuk takut sidak atau tagihan PBF? Tonton curhatan nyata seputar sengkarut pencatatan manual di sini.
              </p>
              <button
                type="button"
                onClick={() => handlePlay('hook')}
                className="text-xs font-mono font-bold text-neutral-950 hover:text-black underline inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>▶ Putar Curhatan Pemilik Apotek (60 Detik)</span>
              </button>
            </div>
          </div>

          {/* REEL 2: DEMO TEKNIS / PRESENTASI APLIKASI KASIR (76 DETIK) */}
          <div className="flex flex-col items-center">
            {/* Mockup Smartphone Bingkai Halus */}
            <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-3xl border-2 border-neutral-300 shadow-xl bg-black overflow-hidden group">
              {/* Punch hole kamera atas */}
              <div className="w-3 h-3 rounded-full bg-neutral-900 border border-neutral-700 mx-auto absolute top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none"></div>

              {/* Video Element */}
              <video
                ref={demoVideoRef}
                src="/videos/apotekpro/apotekpro_demo.mp4"
                poster="/videos/apotekpro/poster_demo.jpg"
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
                    <span className="px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 text-[10px] font-mono font-bold tracking-wider border border-emerald-700">
                      DEMO LIVE APLIKASI
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono font-bold">
                      01:16
                    </span>
                  </div>

                  {/* Tombol Play Besar */}
                  <div className="self-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-7 h-7 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Keterangan Bawah */}
                  <div className="text-left pb-1">
                    <p className="text-xs text-white font-display font-bold leading-snug">
                      Tur Lengkap Antarmuka Kasir Apotek Pro
                    </p>
                    <p className="text-[11px] text-emerald-300 font-sans mt-0.5">
                      Klik untuk memutar demo (76 Detik)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Copywriting Deskripsi Reel 2 Latar Terang */}
            <div className="text-center md:text-left mt-6 max-w-[320px] w-full">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Tur Resmi Aplikasi Kasir
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-neutral-950 mb-2 leading-snug">
                Saksikan Kasir POS, Alarm FEFO &amp; Bukti Sidak BPOM
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans mb-3">
                Saksikan langsung layar kasir POS penjualan, kalkulator puyer potong stok presisi, kamera TimeStamp GPS otomatis untuk bukti retur PBF &amp; stock opname, hingga alarm expired FEFO yang berjalan live di aplikasi.
              </p>
              <button
                type="button"
                onClick={() => handlePlay('demo')}
                className="text-xs font-mono font-bold text-emerald-700 hover:text-emerald-900 underline inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>▶ Putar Demo Kasir &amp; Fitur BPOM (76 Detik)</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
