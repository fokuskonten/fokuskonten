'use client'

import { useRef, useState } from 'react'

export default function DualReelVideoShowcase() {
  const [playingVideo, setPlayingVideo] = useState(null) // 'hook' | 'demo' | 'presentasi' | null
  const hookVideoRef = useRef(null)
  const demoVideoRef = useRef(null)
  const presentasiVideoRef = useRef(null)

  const handlePlay = (id) => {
    if (hookVideoRef.current && id !== 'hook') {
      hookVideoRef.current.pause()
    }
    if (demoVideoRef.current && id !== 'demo') {
      demoVideoRef.current.pause()
    }
    if (presentasiVideoRef.current && id !== 'presentasi') {
      presentasiVideoRef.current.pause()
    }

    if (id === 'hook' && hookVideoRef.current) {
      hookVideoRef.current.play()
    } else if (id === 'demo' && demoVideoRef.current) {
      demoVideoRef.current.play()
    } else if (id === 'presentasi' && presentasiVideoRef.current) {
      presentasiVideoRef.current.play()
    }
    setPlayingVideo(id)
  }

  const handlePause = (id) => {
    if (playingVideo === id) {
      setPlayingVideo(null)
    }
  }

  return (
    <section className="py-20 sm:py-24 bg-neutral-50/70 border-b border-neutral-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION LATAR TERANG */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
            Demo &amp; Bukti Nyata Operasional
          </span>
          <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3 tracking-tight">
            Tonton 3 Video Presentasi &amp; Alur Kerja Apotek Pro
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Tanpa teori berbelit. Saksikan curhatan nyata seputar sengkarut pembukuan apotek, tur live fitur kasir &amp; alarm FEFO, serta rekaman presentasi operasional terlengkap langsung dari perangkat Android kasir.
          </p>
        </div>

        {/* TIGA SMARTPHONE FULL-FRAME MOCKUP CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto justify-items-center">
          
          {/* REEL 1: HOOK / CERITA PEMILIK APOTEK (60 DETIK) */}
          <div className="flex flex-col items-center w-full max-w-[360px]">
            {/* Full-Frame Flagship Smartphone Mockup */}
            <div className="relative w-full aspect-[9/19.5] rounded-[2.5rem] border-[4px] border-neutral-900 shadow-2xl bg-black overflow-hidden group ring-1 ring-neutral-800/50">
              {/* Video Element Full Frame */}
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
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 flex flex-col justify-between p-5 cursor-pointer z-20 group"
                >
                  {/* Badge Atas Non-Kapsul */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="px-2.5 py-1 rounded bg-black/80 text-white text-[10px] font-mono font-bold tracking-wider border border-neutral-700">
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
                    <p className="text-sm text-white font-display font-bold leading-snug">
                      Pusing Obat Expired &amp; Tagihan Supplier?
                    </p>
                    <p className="text-xs text-neutral-300 font-sans mt-0.5">
                      Klik untuk memutar cerita (60 Detik)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Copywriting Deskripsi Reel 1 Latar Terang */}
            <div className="text-center md:text-left mt-6 w-full">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                Realita Operasional Apotek
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-neutral-950 mb-2 leading-snug">
                Mengapa Pembukuan Manual Menggerus Omzet?
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans mb-3">
                Rela kurang tidur demi jaga apotek, tapi pas cek rak obat malah banyak yang kedaluwarsa? Tonton curhatan seputar sengkarut pencatatan manual di sini.
              </p>
              <button
                type="button"
                onClick={() => handlePlay('hook')}
                className="text-xs font-mono font-bold text-neutral-950 hover:text-black underline inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>▶ Putar Curhatan (60 Detik)</span>
              </button>
            </div>
          </div>

          {/* REEL 2: DEMO TEKNIS / KASIR & ALARM FEFO (76 DETIK) */}
          <div className="flex flex-col items-center w-full max-w-[360px]">
            {/* Full-Frame Flagship Smartphone Mockup */}
            <div className="relative w-full aspect-[9/19.5] rounded-[2.5rem] border-[4px] border-neutral-900 shadow-2xl bg-black overflow-hidden group ring-1 ring-neutral-800/50">
              {/* Video Element Full Frame */}
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
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 flex flex-col justify-between p-5 cursor-pointer z-20 group"
                >
                  {/* Badge Atas Non-Kapsul */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="px-2.5 py-1 rounded bg-emerald-950/90 text-emerald-300 text-[10px] font-mono font-bold tracking-wider border border-emerald-700">
                      FITUR INTI KASIR
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
                    <p className="text-sm text-white font-display font-bold leading-snug">
                      Tur Antarmuka Kasir &amp; Racik Puyer
                    </p>
                    <p className="text-xs text-emerald-300 font-sans mt-0.5">
                      Klik untuk memutar demo (76 Detik)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Copywriting Deskripsi Reel 2 Latar Terang */}
            <div className="text-center md:text-left mt-6 w-full">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Tur Fitur Aplikasi Kasir
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-neutral-950 mb-2 leading-snug">
                Saksikan Kasir POS, Puyer &amp; Alarm FEFO
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans mb-3">
                Saksikan langsung layar kasir POS penjualan, kalkulator puyer potong stok presisi, hingga alarm expired FEFO yang berjalan live di aplikasi.
              </p>
              <button
                type="button"
                onClick={() => handlePlay('demo')}
                className="text-xs font-mono font-bold text-emerald-700 hover:text-emerald-900 underline inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>▶ Putar Demo Kasir (76 Detik)</span>
              </button>
            </div>
          </div>

          {/* REEL 3: PRESENTASI LENGKAP V1.0.3 BUILD 4 (131 DETIK) */}
          <div className="flex flex-col items-center w-full max-w-[360px]">
            {/* Full-Frame Flagship Smartphone Mockup (Border Netral Solid Mewah) */}
            <div className="relative w-full aspect-[9/19.5] rounded-[2.5rem] border-[4px] border-neutral-900 shadow-2xl bg-black overflow-hidden group ring-1 ring-neutral-800/50">
              {/* Video Element Full Frame (Presisi 1080x2400) */}
              <video
                ref={presentasiVideoRef}
                src="/videos/apotekpro/apotekpro_presentasi_v103.mp4"
                poster="/videos/apotekpro/poster_presentasi.jpg"
                playsInline
                controls={playingVideo === 'presentasi'}
                onPause={() => handlePause('presentasi')}
                onEnded={() => handlePause('presentasi')}
                className="w-full h-full object-cover"
              />

              {/* Overlay Thumbnail & Tombol Play (Saat Belum Diputar) */}
              {playingVideo !== 'presentasi' && (
                <div
                  onClick={() => handlePlay('presentasi')}
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 flex flex-col justify-between p-5 cursor-pointer z-20 group"
                >
                  {/* Badge Atas Non-Kapsul */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="px-2.5 py-1 rounded bg-emerald-700 text-white text-[10px] font-mono font-bold tracking-wider">
                      PRESENTASI RESMI V1.0.3
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono font-bold">
                      02:11
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
                    <p className="text-sm text-white font-display font-bold leading-snug">
                      Presentasi Menyeluruh Apotek Pro v1.0.3
                    </p>
                    <p className="text-xs text-emerald-300 font-sans mt-0.5">
                      Klik untuk memutar tur penuh (131 Detik)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Copywriting Deskripsi Reel 3 Latar Terang */}
            <div className="text-center md:text-left mt-6 w-full">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Tur Operasional Terlengkap
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-neutral-950 mb-2 leading-snug">
                Presentasi Menyeluruh Operasional Apotek Pro
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans mb-3">
                Rekaman navigasi dari login master toko, pencatatan transaksi kasir, kalkulator racikan resep, rekapitulasi shift kas, hingga pencadangan offline-online.
              </p>
              <button
                type="button"
                onClick={() => handlePlay('presentasi')}
                className="text-xs font-mono font-bold text-emerald-700 hover:text-emerald-900 underline inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>▶ Putar Presentasi Penuh (131 Detik)</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
