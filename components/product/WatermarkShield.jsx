'use client'

/**
 * WatermarkShield.jsx — Proteksi Watermark Dinamis & Anti-Theft Non-Destruktif
 * Memberikan lapisan proteksi watermark visual elegan dan proteksi klik-kanan/drag
 * langsung di peramban web TANPA merusak atau mengubah file fisik gambar asli di server.
 */
export default function WatermarkShield({
  brandText = 'FOKUSKONTEN • OFFICIAL PREVIEW',
  subText = 'DILINDUNGI HAK CIPTA',
  showBadge = true,
  patternId = 'fk-watermark'
}) {
  return (
    <div 
      className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Lapisan Kontras Gelap (Terlihat jika foto berlatar terang) */}
      <svg 
        className="w-full h-full opacity-[0.14] text-black fill-current absolute inset-0 translate-x-[0.5px] translate-y-[0.5px]" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern 
            id={`${patternId}-dark`} 
            width="240" 
            height="120" 
            patternUnits="userSpaceOnUse" 
            patternTransform="rotate(-26)"
          >
            <text x="12" y="38" fontSize="11" fontWeight="900" fontFamily="sans-serif" letterSpacing="2.5" fill="currentColor">
              {brandText}
            </text>
            <text x="40" y="58" fontSize="8" fontWeight="700" fontFamily="sans-serif" letterSpacing="1.8" fill="currentColor">
              {subText}
            </text>
            <line x1="0" y1="80" x2="240" y2="80" stroke="currentColor" strokeWidth="0.6" strokeDasharray="5 5" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId}-dark)`} />
      </svg>

      {/* 2. Lapisan Kontras Terang (Terlihat jika foto berlatar gelap) */}
      <svg 
        className="w-full h-full opacity-[0.16] text-white fill-current absolute inset-0" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern 
            id={`${patternId}-light`} 
            width="240" 
            height="120" 
            patternUnits="userSpaceOnUse" 
            patternTransform="rotate(-26)"
          >
            <text x="12" y="38" fontSize="11" fontWeight="900" fontFamily="sans-serif" letterSpacing="2.5" fill="currentColor">
              {brandText}
            </text>
            <text x="40" y="58" fontSize="8" fontWeight="700" fontFamily="sans-serif" letterSpacing="1.8" fill="currentColor">
              {subText}
            </text>
            <line x1="0" y1="80" x2="240" y2="80" stroke="currentColor" strokeWidth="0.6" strokeDasharray="5 5" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId}-light)`} />
      </svg>

      {/* 3. Lencana Keamanan Elegan di Sudut Bawah */}
      {showBadge && (
        <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/65 backdrop-blur-md border border-white/15 text-white/85 text-[10px] font-mono tracking-wider flex items-center gap-1.5 shadow-md">
          <svg className="w-3 h-3 text-amber-400 shrink-0 fill-current" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
          <span className="font-semibold">FokusKonten Protected Preview</span>
        </div>
      )}
    </div>
  )
}
