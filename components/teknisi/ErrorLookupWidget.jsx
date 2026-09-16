'use client'

import { useState, useEffect } from 'react'
import { getErrorCodes } from '../../lib/technicianService'

/**
 * ErrorLookupWidget.jsx — Modul Pencari Kode Error Diagnosa Teknisi (BROM / EDL / UFI)
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md: Font Mono Bold, Container Putih Bershadow
 */
export default function ErrorLookupWidget() {
  const [query, setQuery] = useState('')
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let active = true
    const fetchData = async () => {
      setLoading(true)
      const data = await getErrorCodes(query)
      if (active) {
        setErrors(data)
        setLoading(false)
      }
    }

    const timer = setTimeout(fetchData, 300)
    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [query])

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-2">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-950 tracking-tight">Kamus Kode Error & Diagnosa Servis</h2>
          <p className="text-xs text-neutral-500 font-mono">Pencarian solusi error BROM MediaTek, Qualcomm EDL, SP Flash Tool, UFI, EasyJTAG</p>
        </div>
        <span className="px-3 py-1 bg-neutral-950 text-white font-mono font-bold text-xs rounded-lg uppercase self-start sm:self-auto">
          DIAGNOSTIC SEARCH
        </span>
      </div>

      {/* Input Search Field */}
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari kode error (contoh: 0xC0060001, BROM, EDL, serial port drop)..."
          className="w-full bg-white border border-neutral-300 focus:border-neutral-950 focus:ring-0 rounded-xl px-4 py-3 text-neutral-950 text-sm font-mono placeholder:text-neutral-400 transition-colors"
        />
      </div>

      {/* Error Results Table / List */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-4 text-center text-xs text-neutral-400 font-mono">Mencari kode error...</div>
        ) : errors.length === 0 ? (
          <div className="p-4 text-center text-xs text-neutral-500 font-mono bg-neutral-50 rounded-xl">
            Kode error tidak ditemukan. Coba ketik kode hex seperti `0xC00` atau protokol `BROM`.
          </div>
        ) : (
          <div className="divide-y divide-neutral-100 space-y-3">
            {errors.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-extrabold text-sm text-neutral-950">{item.raw_code || item.code}</span>
                  <span className="px-2.5 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-950 font-mono text-[10px] font-bold rounded">
                    {item.protocol}
                  </span>
                </div>
                <p className="text-xs text-neutral-700 font-medium">{item.meaning}</p>
                <div className="p-3 bg-neutral-50 border border-neutral-100 rounded-xl">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Langkah Solusi:</span>
                  <p className="text-xs text-neutral-900 font-mono whitespace-pre-line">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
