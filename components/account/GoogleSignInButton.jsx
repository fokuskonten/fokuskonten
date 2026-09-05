'use client'

import { useEffect, useState, useRef } from 'react'
import { getBuyerProfile, setBuyerProfile } from '@/lib/buyerStore'

/**
 * Robust JWT parser for Google ID Tokens
 * Handles base64url characters, missing padding (=), and UTF-8 characters
 */
function parseJwt(token) {
  if (!token || typeof token !== 'string') return null
  try {
    const parts = token.split('.')
    if (parts.length < 2) return null
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    
    // Add base64 padding to avoid DOMException in window.atob
    const pad = base64.length % 4
    if (pad) {
      base64 += '='.repeat(4 - pad)
    }

    // Modern TextDecoder decoding for robust UTF-8 support
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    const text = new TextDecoder('utf-8').decode(bytes)
    return JSON.parse(text)
  } catch (err) {
    console.error('[GoogleAuth] Error parsing JWT:', err)
    try {
      const parts = token.split('.')
      let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
      const pad = base64.length % 4
      if (pad) base64 += '='.repeat(4 - pad)
      return JSON.parse(decodeURIComponent(escape(atob(base64))))
    } catch (_) {
      return null
    }
  }
}

export default function GoogleSignInButton({ onGoogleSuccess, onLoginSuccess, onError }) {
  const [loading, setLoading] = useState(false)
  const googleBtnContainerRef = useRef(null)

  const handleSuccess = async (profile) => {
    if (!profile?.email) return
    setLoading(true)

    // 1. Simpan profil ke localStorage buyerStore & dispatch event
    setBuyerProfile(profile)

    // 2. Bersihkan instance GSI jika ada
    if (typeof window !== 'undefined') {
      try {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.cancel()
        }
      } catch (_) {}
    }

    // 3. Background synchronization ke SQLite database FokusKonten
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090'
      await fetch(`${apiUrl}/api/v1/auth/buyer/google-sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
        keepalive: true
      }).then(async (res) => {
        if (res.ok) {
          const data = await res.json()
          if (data.buyer) {
            setBuyerProfile(data.buyer)
          }
        }
      }).catch((e) => {
        console.warn('[GoogleAuth] Sync notice:', e)
      })
    } catch (_) {}

    // 4. Panggil callback induk jika ada
    if (typeof onGoogleSuccess === 'function') onGoogleSuccess(profile)
    if (typeof onLoginSuccess === 'function') onLoginSuccess(profile)

    // 5. Redirect instan jika berada di halaman /login
    if (typeof window !== 'undefined' && window.location.pathname.includes('/login')) {
      window.location.href = '/akun/'
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const clientId =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      '662076483293-ang8sosqltt5aurnamb63qaojic6jcog.apps.googleusercontent.com'

    const initGsi = () => {
      if (!window.google?.accounts?.id || !clientId) return

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            if (response?.credential) {
              setLoading(true)
              try {
                const payload = parseJwt(response.credential)
                if (payload?.email) {
                  await handleSuccess({
                    email: payload.email.toLowerCase().trim(),
                    name: payload.name || payload.email.split('@')[0],
                    avatar: payload.picture || '',
                    verified: true,
                    authProvider: 'google'
                  })
                }
              } catch (err) {
                console.error('[GoogleAuth] Credential error:', err)
                if (onError) onError('Gagal memproses akun Google.')
              }
              setLoading(false)
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true
        })

        // Render Tombol Resmi Google
        // Catatan: Menggunakan renderButton adalah standar keamanan Google untuk mencegah clickjacking (Error 400/401).
        // Kita sesuaikan ukurannya dengan parent agar tidak overlap.
        if (googleBtnContainerRef.current) {
          googleBtnContainerRef.current.innerHTML = ''
          
          // Ambil lebar parent dengan aman, minimal 280, maksimal 400 (batas Google)
          const parentWidth = googleBtnContainerRef.current.parentElement?.offsetWidth || 380
          const buttonWidth = Math.min(400, Math.max(280, parentWidth))

          window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
            theme: 'outline',
            size: 'large',
            type: 'standard',
            shape: 'rectangular',
            text: 'continue_with',
            logo_alignment: 'center', // Agar terlihat lebih elegan dan balance
            width: buttonWidth,
            locale: 'id'
          })
        }
      } catch (err) {
        console.warn('[GoogleAuth] Init error:', err)
      }
    }

    if (!document.getElementById('google-gsi-client')) {
      const script = document.createElement('script')
      script.id = 'google-gsi-client'
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = initGsi
      document.body.appendChild(script)
    } else {
      // Tambahkan delay sedikit agar parent container sudah dirender sempurna sebelum menghitung offsetWidth
      setTimeout(initGsi, 100)
    }

    return () => {
      if (typeof window !== 'undefined') {
        try {
          if (window.google?.accounts?.id) window.google.accounts.id.cancel()
        } catch (_) {}
      }
    }
  }, [onError])

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[44px]">
      <div
        ref={googleBtnContainerRef}
        className="w-full flex justify-center transition-all duration-300"
      />
      {loading && (
        <span className="text-xs text-neutral-500 font-sans mt-2 animate-pulse">
          Menghubungkan akun Google...
        </span>
      )}
    </div>
  )
}
