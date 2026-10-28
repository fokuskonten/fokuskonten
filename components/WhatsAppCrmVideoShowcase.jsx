'use client'

import { useRef, useState } from 'react'

export default function WhatsAppCrmVideoShowcase() {
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
            Tonton Langsung Cara Kerja WhatsApp Lead CRM Aplikasi
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Saksikan rekaman nyata operasional software di komputer Windows: penarikan ribuan kontak Google Maps per kota, broadcast promo massal berproteksi jeda acak aman, pengelolaan pipeline prospek di papan Kanban, hingga robot AI lokal yang melayani pembeli 24 jam nonstop.
          </p>
        </div>

        {/* LAPTOP / DESKTOP SCREEN CONTAINER TENGAH */}
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          {/* Mockup Laptop Display Bingkai Halus Widescreen 16:9 */}
          <div className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl border-[3px] border-neutral-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] bg-neutral-950 overflow-hidden group">
            
            {/* Title Bar Desktop Minimalis Windows */}
            <div className="absolute top-0 left-0 right-0 h-8 sm:h-9 bg-neutral-900/95 border-b border-neutral-800 flex items-center justify-between px-3.5 z-30 pointer-events-none">
              <div className="flex items-center gap-2">
                <img
                  src="/app-icons/whatsappcrm.png"
                  alt="Icon"
                  className="w-4 h-4 object-contain"
                />
                <span className="text-xs sm:text-sm font-sans text-white font-bold tracking-wide">
                  WhatsApp Lead CRM Aplikasi
                </span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
                <span className="hidden sm:inline">Windows Desktop</span>
              </div>
            </div>

            {/* Video Element */}
            <video
              ref={videoRef}
              src="/videos/whatsappcrm/whatsappcrm_presentasi.mp4"
              poster="/videos/whatsappcrm/poster_presentasi.jpg"
              playsInline
              controls={isPlaying}
              onPause={handlePause}
              onEnded={handlePause}
              className="w-full h-full object-cover pt-8 sm:pt-9"
            />

            {/* Overlay Thumbnail & Tombol Play (Saat Belum Diputar) */}
            {!isPlaying && (
              <div
                onClick={handlePlay}
                className="absolute inset-0 pt-8 sm:pt-9 bg-gradient-to-t from-black/85 via-black/25 to-black/40 flex flex-col justify-between p-5 sm:p-7 cursor-pointer z-20 group"
              >
                {/* Badge Atas */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-black/80 text-white text-[10px] font-mono font-bold tracking-wider border border-neutral-700">
                    DEMO LENGKAP DESKTOP
                  </span>
                  <span className="px-2.5 py-1 rounded bg-black/80 text-white text-[11px] font-mono font-bold">
                    05:26
                  </span>
                </div>

                {/* Tombol Play Besar */}
                <div className="self-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-950 ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Keterangan Bawah */}
                <div className="text-left pb-1">
                  <p className="text-white text-sm sm:text-base font-semibold drop-shadow-md line-clamp-1">
                    Tur Lengkap 6 Mesin Penjualan: Scraper, Broadcast, Kanban, AI CS &amp; Lisensi Offline
                  </p>
                  <span className="text-neutral-300 text-xs font-mono mt-1 block">
                    Klik untuk memutar video presentasi resolusi tinggi
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 3 Keunggulan Utama Faktual di Bawah Video */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full text-left">
            <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="text-xs font-mono font-bold text-neutral-900 block mb-1">01. 100% Database Privat</span>
              <p className="text-xs text-neutral-600 leading-snug font-sans">
                Seluruh kontak dan riwayat chat tersimpan mandiri di laptop Windows Anda.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="text-xs font-mono font-bold text-neutral-900 block mb-1">02. Scraper Maps 1-Klik</span>
              <p className="text-xs text-neutral-600 leading-snug font-sans">
                Tarik ribuan nomor calon pembeli tertarget per kota tanpa beli database luar.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="text-xs font-mono font-bold text-neutral-900 block mb-1">03. Lisensi Permanen</span>
              <p className="text-xs text-neutral-600 leading-snug font-sans">
                Beli sekali aktif seumur hidup, Rp 0 iuran bulanan tanpa tagihan tersembunyi.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
