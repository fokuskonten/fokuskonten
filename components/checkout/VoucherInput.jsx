'use client'

import { useState } from 'react'
import { validateVoucher } from '@/lib/voucher'

export default function VoucherInput({ currentPrice, onApplyVoucher, appliedVoucher }) {
  const [code, setCode] = useState('')
  const [feedback, setFeedback] = useState(null) // { success: boolean, message: string }

  const handleApply = (e) => {
    e.preventDefault()
    if (!code.trim()) return

    const res = validateVoucher(code, currentPrice)
    if (res.valid) {
      setFeedback({ success: true, message: res.message })
      onApplyVoucher(res)
    } else {
      setFeedback({ success: false, message: res.message })
      onApplyVoucher(null)
    }
  }

  const handleRemove = () => {
    setCode('')
    setFeedback(null)
    onApplyVoucher(null)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
          Kode Promo
        </label>
        <span className="text-[10px] text-neutral-400">
          Gunakan: <button type="button" onClick={() => setCode('FOKUSHEMAT')} className="underline text-black font-semibold">FOKUSHEMAT</button>
        </span>
      </div>

      {appliedVoucher ? (
        <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">🎟️</span>
            <div>
              <span className="font-bold font-mono text-sm text-neutral-950">{appliedVoucher.code}</span>
              <p className="text-[11px] text-neutral-600">{appliedVoucher.description}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="text-xs text-red-600 hover:text-red-800 font-bold px-2 py-1 hover:bg-red-50 rounded transition-colors"
          >
            Hapus
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase())
              if (feedback) setFeedback(null)
            }}
            placeholder="Masukkan kode promo (misal: FOKUSHEMAT)"
            className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-xs sm:text-sm font-mono font-bold uppercase outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!code.trim()}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shrink-0"
          >
            Terapkan
          </button>
        </form>
      )}

      {feedback && !appliedVoucher && (
        <p className={`text-xs mt-1 font-medium ${feedback.success ? 'text-neutral-900 font-semibold' : 'text-red-600'}`}>
          {feedback.message}
        </p>
      )}
    </div>
  )
}
