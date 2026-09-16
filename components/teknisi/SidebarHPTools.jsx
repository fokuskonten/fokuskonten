'use client'

import Link from 'next/link'

/**
 * SidebarHPTools.jsx — Sidebar Kontainer Hitam Eksklusif Promosi Desktop App
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md Pilar 2 (Monokrom Mutlak) & Pilar 5 (Teks & Chip Kontras)
 */
export default function SidebarHPTools() {
  const waUrl = 'https://wa.me/6285156942008?text=Halo%20FokusKonten%2C%20saya%20butuh%20bantuan%20teknis%20Software%20FokusKonten%20HP%20Tools%20v2.4%20Desktop'

  return (
    <div className="bg-neutral-950 text-white border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      {/* Top Chip */}
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 bg-white text-neutral-950 font-mono font-bold text-xs rounded-lg uppercase tracking-wider">
          SOFTWARE TEKNISI
        </span>
        <span className="text-xs text-neutral-400 font-mono">v2.4 Desktop</span>
      </div>

      {/* Main Title */}
      <div className="space-y-2">
        <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug">
          FokusKonten HP Tools v2.4 Desktop (.EXE)
        </h3>
        <p className="text-xs text-neutral-300 leading-relaxed">
          Software profesional 1-Klik Bypass EDL 9008, BROM Flashing, Direct Memory Repair, Erase FRP, dan Repair IMEI. Berjalan 100% offline tanpa sewa server bulanan.
        </p>
      </div>

      {/* Feature List */}
      <div className="space-y-2 border-t border-b border-neutral-800 py-4 text-xs font-mono text-neutral-200">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          <span>Bypass EDL 9008 Tanpa Auth Server</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          <span>BROM Direct Flashing MediaTek & Kirin</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          <span>Unduh Otomatis Berkas Master 1-Klik</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          <span>Lisensi Permanen Bebas Biaya Bulanan</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-1">
        <Link
          href="/aplikasi/hptools"
          className="block w-full py-3 bg-white text-neutral-950 text-center font-extrabold text-xs rounded-xl hover:bg-neutral-100 transition-colors uppercase tracking-wider font-mono shadow-md"
        >
          Beli Lisensi Sekarang
        </Link>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-2.5 bg-neutral-900 border border-neutral-700 text-white text-center font-bold text-xs rounded-xl hover:bg-neutral-800 transition-colors font-mono flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span>Bantuan WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
