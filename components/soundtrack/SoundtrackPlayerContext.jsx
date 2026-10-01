'use client'

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'
import { getSoundtrackStreamUrl } from '@/lib/soundtrackCdn'

const SoundtrackPlayerContext = createContext(null)

export function SoundtrackPlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [playbackError, setPlaybackError] = useState(null)

  const audioRef = useRef(null)
  const currentTrackRef = useRef(currentTrack)

  // Sinkronkan ref trek aktif
  useEffect(() => {
    currentTrackRef.current = currentTrack
  }, [currentTrack])

  // Inisialisasi Audio Element Singleton pada Client (Hanya 1 kali saat mount)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const audio = new Audio()
    audio.preload = 'none'
    audioRef.current = audio

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0)
      setIsBuffering(false)
    }

    const onWaiting = () => {
      setIsBuffering(true)
    }

    const onPlaying = () => {
      setIsBuffering(false)
      setIsPlaying(true)
      setPlaybackError(null)
    }

    const onPause = () => {
      setIsPlaying(false)
    }

    const onEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const onError = () => {
      setIsBuffering(false)
      // Coba fallback ke stream backend jika pemutaran CDN gagal
      const active = currentTrackRef.current
      if (active) {
        const sku = active.s || active.track_sku
        const isVariation = active.vIdx !== undefined && active.vIdx !== null
        const fallbackUrl = isVariation
          ? `/api/v1/soundtrack/stream-variation/${sku}/${active.vIdx}`
          : `/api/v1/soundtrack/stream/${sku}`

        if (audio.src !== fallbackUrl && !audio.src.endsWith(fallbackUrl)) {
          console.warn('[SoundtrackPlayer] CDN gagal, mengalihkan otomatis ke stream backend:', fallbackUrl)
          audio.src = fallbackUrl
          audio.play().then(() => {
            setIsPlaying(true)
            setPlaybackError(null)
          }).catch(() => {
            setIsPlaying(false)
            setPlaybackError('Gagal memuat pratinjau audio. Silakan coba kembali atau unduh langsung.')
          })
          return
        }
      }
      setIsPlaying(false)
      setPlaybackError('Gagal memuat pratinjau audio. Silakan coba kembali atau unduh langsung.')
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [])

  // Helper Resolver Audio URL: Menggunakan Multi-Tier CDN Resolver (Local API -> jsDelivr Edge CDN)
  const resolveAudioUrl = useCallback((track) => {
    if (!track) return ''
    if (track.audioUrl) return track.audioUrl
    return getSoundtrackStreamUrl(track, track.vIdx)
  }, [])

  // Helper Pengenal Identitas Unik (Membedakan Main Track vs Tiap Potongan Variasi)
  const getTrackKey = useCallback((t) => {
    if (!t) return ''
    const sku = t.s || t.track_sku || ''
    const vIdx = t.vIdx !== undefined && t.vIdx !== null ? t.vIdx : 'main'
    return `${sku}__${vIdx}`
  }, [])

  // Sinkronisasi Media Session API (Lock Screen & Earphone Control)
  useEffect(() => {
    if (!currentTrack || typeof window === 'undefined' || !('mediaSession' in navigator)) return

    const vTitle = currentTrack.variationName ? ` (${currentTrack.variationName})` : ''
    navigator.mediaSession.metadata = new window.MediaMetadata({
      title: `${currentTrack.t || currentTrack.title || 'Soundtrack'}${vTitle}`,
      artist: currentTrack.c || currentTrack.composer || 'AudioJungle Artist',
      album: `Soundtrack Master Series (${currentTrack.v || currentTrack.source_volume || 'Studio'})`,
      artwork: [
        { src: '/logo.webp', sizes: '512x512', type: 'image/webp' }
      ]
    })

    navigator.mediaSession.setActionHandler('play', () => {
      if (audioRef.current) audioRef.current.play().catch(() => {})
    })
    navigator.mediaSession.setActionHandler('pause', () => {
      if (audioRef.current) audioRef.current.pause()
    })
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (audioRef.current && details.seekTime) {
        audioRef.current.currentTime = details.seekTime
      }
    })
  }, [currentTrack])

  // Eksekusi Pemutaran Lagu
  const playTrack = useCallback((track) => {
    if (!track) return

    const audio = audioRef.current
    if (!audio) return

    const audioUrl = resolveAudioUrl(track)
    if (!audioUrl) {
      setPlaybackError('Tautan streaming tidak tersedia.')
      return
    }

    // Jika lagu & variasi yang sama diklik saat sedang pause -> resume
    if (currentTrack && getTrackKey(currentTrack) === getTrackKey(track)) {
      if (audio.paused) {
        audio.play().catch(() => setPlaybackError('Interaksi sentuh diperlukan untuk memulai audio.'))
      }
      return
    }

    // Ganti ke lagu/variasi baru
    audio.pause()
    audio.src = audioUrl
    setCurrentTime(0)
    setDuration(0)
    setIsBuffering(true)
    setPlaybackError(null)
    setCurrentTrack(track)

    audio.play().catch((err) => {
      console.warn('[SoundtrackPlayer] Play error (autoplay blocked):', err.message)
      setIsBuffering(false)
      setIsPlaying(false)
      setPlaybackError('Klik tombol play untuk mendengarkan pratinjau audio.')
    })

    // Kirim metrik putar ke backend (non-blocking)
    const sku = track.s || track.track_sku
    if (sku && typeof window !== 'undefined') {
      try {
        fetch(`/api/v1/soundtrack/track-play/${sku}`, { method: 'POST' }).catch(() => {})
      } catch (e) {}
    }
  }, [currentTrack, getTrackKey, resolveAudioUrl])

  // Pause Lagu
  const pauseTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [])

  // Toggle Play/Pause
  const togglePlay = useCallback((track) => {
    if (!track) return
    const isSame = currentTrack && getTrackKey(currentTrack) === getTrackKey(track)

    if (isSame && isPlaying) {
      pauseTrack()
    } else {
      playTrack(track)
    }
  }, [currentTrack, isPlaying, pauseTrack, playTrack, getTrackKey])

  // Seek Progress Bar
  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  // Volume & Mute
  const setVolume = useCallback((val) => {
    const safe = Math.max(0, Math.min(1, val))
    if (audioRef.current) {
      audioRef.current.volume = safe
      setVolumeState(safe)
      setIsMuted(safe === 0)
    }
  }, [])

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return
    if (isMuted) {
      audioRef.current.muted = false
      setIsMuted(false)
      audioRef.current.volume = volume || 1
    } else {
      audioRef.current.muted = true
      setIsMuted(true)
    }
  }, [isMuted, volume])

  const closePlayer = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setCurrentTrack(null)
    setIsPlaying(false)
    setCurrentTime(0)
  }, [])

  return (
    <SoundtrackPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isBuffering,
        playbackError,
        playTrack,
        pauseTrack,
        togglePlay,
        seek,
        setVolume,
        toggleMute,
        closePlayer
      }}
    >
      {children}
    </SoundtrackPlayerContext.Provider>
  )
}

export function useSoundtrackPlayer() {
  const ctx = useContext(SoundtrackPlayerContext)
  if (!ctx) {
    throw new Error('useSoundtrackPlayer must be used within SoundtrackPlayerProvider')
  }
  return ctx
}
