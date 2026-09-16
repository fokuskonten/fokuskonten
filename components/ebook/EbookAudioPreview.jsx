'use client'

import { useState, useEffect, useRef } from 'react'
import { getApiBaseUrl } from '@/lib/apiConfig'

/**
 * EbookAudioPreview.jsx — Pratinjau Audio Naskah Dual-Tier
 * - Tier 1 (Utama): Narasi AI Voice via Express Backend (/api/v1/ebook/audio-preview/:sku)
 * - Tier 2 (Cadangan): Sintesis Perangkat Lokal (Web Speech API) jika server offline / halaman statis
 * - Bebas Istilah Developer & Patuh Konstitusi Monokrom STANDAR_UI_WEB_OFFICIAL.md
 */
export default function EbookAudioPreview({ textToRead, title = 'E-Book', sku = '' }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [playerTier, setPlayerTier] = useState(null)
  const [statusText, setStatusText] = useState('Pratinjau intisari naskah bersuara')
  const [selectedVoice, setSelectedVoice] = useState(null)

  const audioRef = useRef(null)
  const utteranceRef = useRef(null)
  const activeRequestIdRef = useRef(0)

  // Inisialisasi voice detection untuk Tier 2 (SpeechSynthesis)
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    const loadVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices()
        const idVoice = voices.find(
          (v) => v.lang && (v.lang.startsWith('id') || v.lang.startsWith('in'))
        )
        if (idVoice) setSelectedVoice(idVoice)
      } catch (_) {}
    }

    loadVoices()
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Safely detach audio element listeners
  const detachAudio = (audio) => {
    if (!audio) return
    audio.oncanplay = null
    audio.onerror = null
    audio.onended = null
    try {
      audio.pause()
      audio.src = ''
    } catch (_) {}
  }

  // Cleanup audio saat komponen unmount
  useEffect(() => {
    return () => {
      activeRequestIdRef.current += 1
      if (audioRef.current) {
        detachAudio(audioRef.current)
        audioRef.current = null
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Stop semua playback audio
  const stopAllPlayback = () => {
    activeRequestIdRef.current += 1
    if (audioRef.current) {
      audioRef.current.pause()
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    setIsPlaying(false)
    setIsLoading(false)
    setStatusText('Pratinjau audio dijeda')
  }

  // Fallback ke Tier 2: Sintesis Perangkat Lokal (Web Speech API)
  const playTier2 = (reqId) => {
    if (reqId !== undefined && reqId !== activeRequestIdRef.current) return

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsLoading(false)
      setIsPlaying(false)
      setStatusText('Audio tidak didukung pada peramban ini')
      return
    }

    try {
      window.speechSynthesis.cancel()

      const cleanText = (textToRead || '')
        .replace(/[\r\n\t]+/g, ' ')
        .replace(/[#*•_~`"']/g, '')
        .slice(0, 450)

      if (!cleanText) {
        setIsLoading(false)
        setIsPlaying(false)
        setStatusText('Teks cuplikan naskah belum tersedia')
        return
      }

      const script = `Cuplikan audio naskah ${title}. ${cleanText}`
      const utterance = new SpeechSynthesisUtterance(script)

      if (selectedVoice) {
        utterance.voice = selectedVoice
        utterance.lang = selectedVoice.lang
      } else {
        utterance.lang = 'id-ID'
      }

      utterance.rate = 0.95
      utterance.pitch = 1.0

      utterance.onstart = () => {
        if (reqId !== undefined && reqId !== activeRequestIdRef.current) return
        setIsLoading(false)
        setIsPlaying(true)
        setPlayerTier('tier2')
        setStatusText('Sedang memutar suara sintesis perangkat...')
      }

      utterance.onend = () => {
        if (reqId !== undefined && reqId !== activeRequestIdRef.current) return
        setIsPlaying(false)
        setIsLoading(false)
        setStatusText('Selesai diputar')
      }

      utterance.onerror = () => {
        if (reqId !== undefined && reqId !== activeRequestIdRef.current) return
        setIsPlaying(false)
        setIsLoading(false)
        setStatusText('Pratinjau audio tidak dapat diputar')
      }

      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
    } catch (_) {
      setIsLoading(false)
      setIsPlaying(false)
      setStatusText('Gagal mengaktifkan modul audio')
    }
  }

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAllPlayback()
      return
    }

    const currentReqId = ++activeRequestIdRef.current

    // Jika audio Tier 1 sudah siap dan dijeda sebelumnya, lanjutkan langsung (Resume)
    if (
      playerTier === 'tier1' &&
      audioRef.current &&
      audioRef.current.currentTime > 0 &&
      !audioRef.current.ended
    ) {
      setIsLoading(true)
      setStatusText('Melanjutkan pemutaran...')
      audioRef.current
        .play()
        .then(() => {
          if (currentReqId !== activeRequestIdRef.current) return
          setIsLoading(false)
          setIsPlaying(true)
          setStatusText('Sedang memutar narasi suara AI resmi...')
        })
        .catch((err) => {
          if (err.name === 'AbortError') return
          playTier2(currentReqId)
        })
      return
    }

    setIsLoading(true)
    setStatusText('Menyiapkan audio pratinjau...')

    // Tier 1: Coba putar dari Server Express AI Voice Engine
    if (sku) {
      try {
        const apiUrl = getApiBaseUrl()
        const audioUrl = `${apiUrl}/ebook/audio-preview/${sku}`

        if (audioRef.current) {
          detachAudio(audioRef.current)
        }

        const audio = new Audio()
        audioRef.current = audio

        let tier1Timeout = setTimeout(() => {
          // Jika server tidak merespons dalam 6 detik, otomatis alihkan ke Tier 2
          if (currentReqId === activeRequestIdRef.current && audioRef.current === audio && !isPlaying) {
            detachAudio(audio)
            playTier2(currentReqId)
          }
        }, 6000)

        audio.oncanplay = () => {
          clearTimeout(tier1Timeout)
          if (currentReqId !== activeRequestIdRef.current) return
          audio
            .play()
            .then(() => {
              if (currentReqId !== activeRequestIdRef.current) return
              setIsLoading(false)
              setIsPlaying(true)
              setPlayerTier('tier1')
              setStatusText('Sedang memutar narasi suara AI resmi...')
            })
            .catch((err) => {
              if (err.name === 'AbortError') return
              playTier2(currentReqId)
            })
        }

        audio.onended = () => {
          clearTimeout(tier1Timeout)
          if (currentReqId !== activeRequestIdRef.current) return
          setIsPlaying(false)
          setIsLoading(false)
          setStatusText('Selesai diputar')
        }

        audio.onerror = () => {
          clearTimeout(tier1Timeout)
          if (currentReqId !== activeRequestIdRef.current) return
          playTier2(currentReqId)
        }

        audio.src = audioUrl
        audio.load()
        return
      } catch (_) {
        playTier2(currentReqId)
        return
      }
    }

    // Jika tidak ada SKU, langsung ke Tier 2
    playTier2(currentReqId)
  }

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 dark:bg-white dark:text-neutral-900 shadow-xs flex items-center justify-between gap-4">
      <div className="flex items-center gap-3.5 sm:gap-4">
        {/* Tombol Play/Pause Ukuran Mantap & Nyaman */}
        <button
          type="button"
          onClick={handleTogglePlay}
          disabled={isLoading}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white flex items-center justify-center transition-all shrink-0 shadow-sm disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
          aria-label={isPlaying ? 'Hentikan Pratinjau Audio' : 'Dengarkan Pratinjau Audio'}
        >
          {isLoading ? (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          ) : isPlaying ? (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>

        {/* Informasi Status & Tipografi Nyaman */}
        <div className="space-y-1">
          <h4 className="text-sm sm:text-base font-bold text-neutral-950 font-sans tracking-tight">
            Dengarkan Pratinjau Audio
          </h4>
          <p className="text-xs sm:text-sm text-neutral-600 font-mono">
            {statusText}
          </p>
        </div>
      </div>

      {/* Badge Tier Audio — Zero Bahasa Developer (Pilar 8 STANDAR_UI_WEB_OFFICIAL.md) */}
      <div className="hidden sm:flex flex-col items-end">
        <span className="px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 text-[11px] font-mono font-bold tracking-wider uppercase border border-neutral-200">
          {playerTier === 'tier1' ? 'Audio Studio' : playerTier === 'tier2' ? 'Suara Narasi' : 'Pratinjau Suara'}
        </span>
        <span className="text-[10px] text-neutral-400 font-mono mt-1">
          {playerTier === 'tier1' ? 'Narasi Suara AI' : playerTier === 'tier2' ? 'Sintesis Perangkat' : 'Dual-Tier Audio'}
        </span>
      </div>
    </div>
  )
}
