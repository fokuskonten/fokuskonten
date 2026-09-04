'use client'

import { useRef, useEffect } from 'react'

/**
 * SegmentedOtpInput - 6-Box Individual Digit OTP Component
 * Mengikuti pola interaksi perbankan & Apotek Pro:
 * - 6 kotak digit terpisah
 * - Auto-advance ke kotak berikutnya saat mengetik angka
 * - Auto-retreat mundur saat menekan Backspace
 * - Navigasi tombol panah kiri / kanan
 * - Dukungan penuh paste clipboard (Ctrl+V / Tap Paste) langsung mengisi 6 digit
 * - Auto-trigger onComplete saat digit ke-6 terisi
 * - Tipografi strictly font-sans (Inter) dengan estetika neutral dark/white
 */
export default function SegmentedOtpInput({
  value = '',
  onChange,
  onComplete,
  disabled = false,
  autoFocus = true
}) {
  const inputRefs = useRef([])

  // Konversi string nilai menjadi array 6 karakter
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || '')

  // Auto focus ke kotak kosong pertama saat komponen dimuat
  useEffect(() => {
    if (!disabled && autoFocus && inputRefs.current[0]) {
      const firstEmptyIndex = digits.findIndex((d) => !d)
      const targetIndex = firstEmptyIndex === -1 ? 5 : firstEmptyIndex
      if (inputRefs.current[targetIndex]) {
        inputRefs.current[targetIndex].focus()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateDigits = (newDigits) => {
    const combined = newDigits.join('')
    if (typeof onChange === 'function') {
      onChange(combined)
    }
    if (combined.length === 6 && typeof onComplete === 'function') {
      onComplete(combined)
    }
  }

  const handleInputChange = (index, e) => {
    if (disabled) return
    const inputVal = e.target.value
    const numericChars = inputVal.replace(/\D/g, '')

    if (!numericChars) {
      const newDigits = [...digits]
      newDigits[index] = ''
      updateDigits(newDigits)
      return
    }

    const char = numericChars.slice(-1)
    const newDigits = [...digits]
    newDigits[index] = char
    updateDigits(newDigits)

    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
      inputRefs.current[index + 1].select()
    }
  }

  const handleKeyDown = (index, e) => {
    if (disabled) return

    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0 && inputRefs.current[index - 1]) {
        e.preventDefault()
        const newDigits = [...digits]
        newDigits[index - 1] = ''
        updateDigits(newDigits)
        inputRefs.current[index - 1].focus()
      }
    } else if (e.key === 'ArrowLeft' && index > 0 && inputRefs.current[index - 1]) {
      e.preventDefault()
      inputRefs.current[index - 1].focus()
      inputRefs.current[index - 1].select()
    } else if (e.key === 'ArrowRight' && index < 5 && inputRefs.current[index + 1]) {
      e.preventDefault()
      inputRefs.current[index + 1].focus()
      inputRefs.current[index + 1].select()
    }
  }

  const handlePaste = (e) => {
    if (disabled) return
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    const numericOnly = pastedData.replace(/\D/g, '').slice(0, 6)
    if (!numericOnly) return

    const newDigits = Array.from({ length: 6 }, (_, i) => numericOnly[i] || '')
    updateDigits(newDigits)

    const targetFocusIndex = Math.min(numericOnly.length, 5)
    if (inputRefs.current[targetFocusIndex]) {
      inputRefs.current[targetFocusIndex].focus()
    }
  }

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-2.5 max-w-sm mx-auto select-none font-sans">
      {Array.from({ length: 6 }).map((_, index) => {
        const isFilled = Boolean(digits[index])
        return (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digits[index]}
            disabled={disabled}
            onChange={(e) => handleInputChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={`w-11 h-13 sm:w-12 sm:h-14 text-center font-sans font-bold text-xl sm:text-2xl rounded-xl border transition-all shadow-soft outline-none ${
              isFilled
                ? 'border-neutral-950 bg-neutral-50/70 text-neutral-950 ring-1 ring-neutral-950/20'
                : 'border-neutral-300 bg-white text-neutral-900'
            } focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/15 disabled:opacity-50 disabled:bg-neutral-100 disabled:cursor-not-allowed`}
            aria-label={`Digit OTP ke-${index + 1}`}
          />
        )
      })}
    </div>
  )
}
