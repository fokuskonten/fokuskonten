'use client'

import { useRef, useState } from 'react'

export default function BacaQuranVideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  return (
    <section className="py-20 sm:py-24 bg-neutral-50/70 border-b border-neutral-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* HEADER SECTION LATAR TERANG */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-500 mb-3 block">
            Demo &amp; Presentasi Resmi
          </span>
          <h2 className="heading-xl text-2xl sm:text-4xl text-neutral-950 mb-3 tracking-tight">
            Tonton Langsung Alur Kerja BacaQur&apos;an
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Saksikan rekaman layar nyata aplikasi BacaQur&apos;an: navigasi mushaf standar Kemenag RI, hisab waktu shalat otomatis, kompas kiblat sensor giroskop, tasbih digital respon haptic, hingga kurikulum belajar tajwid terstruktur langsung dari handphone.
          </p>
        </div>

        {/* SMARTPHONE REEL CONTAINER TENGAH */}
        <div className="flex flex-col items-center max-w-md mx-auto">
          {/* Mockup Smartphone Bingkai Halus */}
          <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[9/20] rounded-[2.6rem] border-[3px] border-neutral-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] bg-neutral-950 overflow-hidden group">
            
            {/* Punch hole kamera depan atas */}
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-neutral-700 mx-auto absolute top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none" />

            {/* Video Element */}
            <video
              ref={videoRef}
              src="/videos/bacaquran/bacaquran_presentasi.mp4"
              poster="/videos/bacaquran/poster_presentasi.jpg"
              playsInline
              controls={isPlaying}
              onPause={handlePause}
              onEnded={handlePause}
              className="w-full h-full object-cover object-top"
            />

            {/* Overlay Thumbnail & Tombol Play (Saat Belum Diputar) */}
            {!isPlaying && (
              <div
                onClick={handlePlay}
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 flex flex-col justify-between p-5 cursor-pointer z-20 group"
              >
                {/* Badge Atas */}
                <div className="flex items-center justify-between pt-2">
                  <span className="px-2.5 py-1 rounded bg-black/80 text-white text-[10px] font-mono font-bold tracking-wider border border-neutral-700">
                    PRESENTASI STATUS WA
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono font-bold">
                    03:00
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
                    Tur Lengkap 19 Modul Ibadah, Hisab Shalat &amp; Mushaf Tanpa Iklan
                  </p>
                  <span className="text-neutral-300 text-[10px] font-mono mt-1 block">
                    Klik untuk memutar video presentasi
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 3 Keunggulan Utama Faktual di Bawah Video */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl text-left">
            <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="text-xs font-mono font-bold text-neutral-900 block mb-1">01. Bebas Iklan</span>
              <p className="text-[11px] text-neutral-600 leading-snug font-sans">
                Khusyuk membaca ayat tanpa pop-up video bersuara kencang.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="text-xs font-mono font-bold text-neutral-900 block mb-1">02. 100% Offline</span>
              <p className="text-[11px] text-neutral-600 leading-snug font-sans">
                Teks Al-Qur&apos;an dan seluruh materi ibadah tersimpan lokal di ponsel.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="text-xs font-mono font-bold text-neutral-900 block mb-1">03. Sensor Akurat</span>
              <p className="text-[11px] text-neutral-600 leading-snug font-sans">
                Kompas Ka&apos;bah stabil berbasis giroskop tanpa butuh kuota internet.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
