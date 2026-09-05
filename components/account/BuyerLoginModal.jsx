'use client'

import { useState, useEffect } from 'react'
import GoogleSignInButton from './GoogleSignInButton'
import SegmentedOtpInput from './SegmentedOtpInput'
import { isValidEmail } from '@/lib/validators'
import {
  registerBuyerAccount,
  loginBuyerWithPassword,
  requestBuyerOtp,
  verifyBuyerLoginOtp,
  verifyBuyerRegisterOtp
} from '@/lib/buyerStore'

export default function BuyerLoginModal({ isOpen, onClose, onLogin }) {
  const [tab, setTab] = useState('login') // 'login' | 'register'
  const [loginMode, setLoginMode] = useState('password') // 'password' | 'otp'

  // Register state
  const [regStep, setRegStep] = useState('form') // 'form' | 'verify_otp'
  const [regName, setRegName] = useState('')
  const [regPhone, setRegPhone] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regOtpCode, setRegOtpCode] = useState('')

  // Login state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // OTP Login state
  const [otpEmail, setOtpEmail] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [otpStep, setOtpStep] = useState('input') // 'input' | 'verify'

  // Feedback & Cooldown state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [cooldown, setCooldown] = useState(0)

  // Countdown Timer
  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  if (!isOpen) return null

  const switchTab = (newTab) => {
    setTab(newTab)
    setError('')
    setNotice('')
    setRegStep('form')
    setOtpStep('input')
    setLoginMode('password')
  }

  // 1. Handle Password Login
  const handlePasswordLogin = async (e) => {
    e.preventDefault()
    setError('')
    setNotice('')

    const cleanEmail = loginEmail.trim().toLowerCase()
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      setError('Silakan masukkan alamat email yang valid.')
      return
    }
    if (!loginPassword) {
      setError('Kata sandi wajib diisi.')
      return
    }

    setLoading(true)
    const result = await loginBuyerWithPassword({
      email: cleanEmail,
      password: loginPassword
    })
    setLoading(false)

    if (result.success) {
      if (typeof onLogin === 'function') {
        onLogin(result.buyer)
      }
      onClose()
    } else {
      setError(result.message || 'Email atau kata sandi tidak cocok.')
    }
  }

  // 2. Handle OTP Login Request
  const handleRequestOtp = async (e) => {
    if (e) e.preventDefault()
    setError('')
    setNotice('')

    const cleanEmail = (otpEmail || loginEmail).trim().toLowerCase()
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      setError('Alamat email tidak valid.')
      return
    }

    setOtpEmail(cleanEmail)
    setLoading(true)
    const res = await requestBuyerOtp({ email: cleanEmail, purpose: 'BUYER_LOGIN' })
    setLoading(false)

    if (res.success) {
      setOtpCode('')
      setCooldown(res.cooldownSeconds || 60)
      setOtpStep('verify')
      setNotice(`Kode OTP 6-digit telah dikirim ke ${cleanEmail}`)
    } else {
      setError(res.message || 'Gagal mengirimkan kode OTP. Pastikan email Anda aktif.')
    }
  }

  // 3. Handle OTP Login Verify
  const handleVerifyOtp = async (codeToVerify) => {
    const cleanCode = (codeToVerify || otpCode).trim()
    setError('')
    setNotice('')

    if (cleanCode.length !== 6) {
      setError('Masukkan 6 digit kode OTP.')
      return
    }

    setLoading(true)
    const res = await verifyBuyerLoginOtp({ email: otpEmail || loginEmail, otp: cleanCode })
    setLoading(false)

    if (res.success) {
      if (typeof onLogin === 'function') onLogin(res.buyer)
      onClose()
    } else {
      setError(res.message || 'Kode verifikasi tidak sesuai atau sudah kedaluwarsa.')
    }
  }

  // 4. Handle Register Step 1 (Minta OTP)
  const handleStartRegister = async (e) => {
    e.preventDefault()
    setError('')
    setNotice('')

    if (!regName.trim()) {
      setError('Nama lengkap wajib diisi.')
      return
    }
    if (!regPhone.trim()) {
      setError('Nomor WhatsApp aktif wajib diisi.')
      return
    }
    const cleanEmail = regEmail.trim().toLowerCase()
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      setError('Alamat email tidak valid.')
      return
    }
    if (!regPassword || regPassword.length < 6) {
      setError('Kata sandi minimal 6 karakter.')
      return
    }

    setLoading(true)
    const otpRes = await requestBuyerOtp({ email: cleanEmail, purpose: 'REGISTER_VERIFICATION' })
    setLoading(false)

    if (otpRes.success) {
      setRegOtpCode('')
      setCooldown(otpRes.cooldownSeconds || 60)
      setRegStep('verify_otp')
      setNotice(`Kode verifikasi 6 digit telah dikirim ke ${cleanEmail}`)
    } else {
      setError(otpRes.message || 'Gagal mengirimkan kode OTP.')
    }
  }

  // 5. Handle Register Step 2 (Verifikasi OTP)
  const handleVerifyRegister = async (codeToVerify) => {
    const cleanCode = (codeToVerify || regOtpCode).trim()
    setError('')
    setNotice('')

    if (cleanCode.length !== 6) {
      setError('Masukkan 6 digit kode OTP verifikasi akun.')
      return
    }

    setLoading(true)
    const res = await verifyBuyerRegisterOtp({
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      phone: regPhone.trim(),
      password: regPassword,
      otp: cleanCode
    })
    setLoading(false)

    if (res.success) {
      if (typeof onLogin === 'function') onLogin(res.buyer)
      onClose()
    } else {
      setError(res.message || 'Kode verifikasi salah atau sudah kedaluwarsa.')
    }
  }

  // Fallback: Daftar langsung tanpa OTP jika offline
  const handleInstantRegister = async () => {
    setLoading(true)
    const result = await registerBuyerAccount({
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      phone: regPhone.trim(),
      password: regPassword
    })
    setLoading(false)

    if (result.success) {
      if (typeof onLogin === 'function') onLogin(result.buyer)
      onClose()
    } else {
      setError(result.message || 'Gagal membuat akun.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-card max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Tutup"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-neutral-950 text-white flex items-center justify-center mx-auto mb-3 shadow-soft border border-neutral-800">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="font-sans font-bold text-xl text-neutral-950 tracking-tight">
            {tab === 'login' ? 'Masuk ke Akun Member' : 'Daftar Akun Member Baru'}
          </h3>
          <p className="text-xs text-neutral-500 font-sans mt-1 max-w-xs mx-auto">
            Wajib memiliki akun terdaftar untuk mengamankan kepemilikan lisensi komersial dan akses unduhan seumur hidup.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 rounded-xl bg-neutral-100 border border-neutral-200 mb-5">
          <button
            type="button"
            onClick={() => switchTab('login')}
            className={`flex-1 py-2 px-3 rounded-lg font-sans font-semibold text-xs transition-all cursor-pointer ${
              tab === 'login' ? 'bg-neutral-950 text-white shadow-soft' : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => switchTab('register')}
            className={`flex-1 py-2 px-3 rounded-lg font-sans font-semibold text-xs transition-all cursor-pointer ${
              tab === 'register' ? 'bg-neutral-950 text-white shadow-soft' : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            Daftar Akun Baru
          </button>
        </div>

        {/* 1-Click Google Sign-In */}
        {tab === 'login' && loginMode === 'password' && (
          <div className="space-y-3 mb-4">
            <GoogleSignInButton
              onLoginSuccess={(prof) => {
                if (typeof onLogin === 'function') onLogin(prof)
                onClose()
              }}
            />

            <div className="relative flex items-center justify-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <span className="relative px-3 bg-white text-xs font-sans font-medium text-neutral-400">
                atau dengan email
              </span>
            </div>
          </div>
        )}

        {/* Feedback Alert Banners */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-sans flex items-start gap-2">
            <svg className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {notice && (
          <div className="mb-4 p-3 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 text-xs font-sans flex items-start gap-2">
            <svg className="w-4 h-4 text-neutral-950 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="leading-relaxed">{notice}</span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TAB 1: MASUK
        ══════════════════════════════════════════════════════════ */}
        {tab === 'login' && (
          <div className="space-y-4">
            {loginMode === 'password' ? (
              <form onSubmit={handlePasswordLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-sans font-medium text-neutral-700 mb-1.5">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="nama@gmail.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-sans font-medium text-neutral-700">
                      Kata Sandi
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginMode('otp')
                        setOtpEmail(loginEmail)
                        setError('')
                        setNotice('')
                      }}
                      className="text-xs font-sans font-medium text-neutral-500 hover:text-neutral-950 cursor-pointer"
                    >
                      Masuk via Kode OTP?
                    </button>
                  </div>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Masukkan kata sandi..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-sans font-semibold text-sm shadow-soft hover:shadow-card active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <span>{loading ? 'Memproses...' : 'Masuk ke Akun'}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            ) : (
              /* Mode OTP */
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-1.5 border-b border-neutral-100">
                  <span className="text-xs font-sans font-semibold text-neutral-800">
                    Opsi Masuk Bebas Sandi via OTP
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMode('password')
                      setError('')
                      setNotice('')
                    }}
                    className="text-xs font-sans font-medium text-neutral-500 hover:text-neutral-900 cursor-pointer"
                  >
                    Gunakan Sandi
                  </button>
                </div>

                {otpStep === 'input' ? (
                  <form onSubmit={handleRequestOtp} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-sans font-medium text-neutral-700 mb-1.5">
                        Alamat Email / Gmail
                      </label>
                      <input
                        type="email"
                        value={otpEmail || loginEmail}
                        onChange={(e) => setOtpEmail(e.target.value)}
                        placeholder="nama@gmail.com"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-sans font-semibold text-sm shadow-soft transition-all cursor-pointer disabled:opacity-60"
                    >
                      {loading ? 'Mengirim Kode...' : 'Kirim Kode Verifikasi OTP'}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
                      <span className="font-sans text-neutral-600 truncate">
                        Kode dikirim ke <strong className="text-neutral-950 font-semibold">{otpEmail || loginEmail}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => setOtpStep('input')}
                        className="text-xs font-semibold text-neutral-900 hover:underline shrink-0 ml-2 cursor-pointer"
                      >
                        Ganti
                      </button>
                    </div>

                    <div className="py-2">
                      <label className="block text-center text-xs font-sans font-semibold text-neutral-700 mb-3">
                        Masukkan 6-Digit Kode OTP
                      </label>
                      <SegmentedOtpInput
                        value={otpCode}
                        onChange={(val) => {
                          setOtpCode(val)
                          setError('')
                        }}
                        onComplete={(fullVal) => {
                          handleVerifyOtp(fullVal)
                        }}
                        disabled={loading}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleVerifyOtp(otpCode)}
                      disabled={loading || otpCode.length < 6}
                      className="w-full py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-sans font-semibold text-sm shadow-soft transition-all cursor-pointer disabled:opacity-50"
                    >
                      {loading ? 'Memverifikasi...' : 'Verifikasi & Buka Akun'}
                    </button>

                    <div className="text-center pt-1">
                      {cooldown > 0 ? (
                        <span className="text-xs font-sans text-neutral-500">
                          Kirim ulang dalam <strong className="text-neutral-800 font-semibold">{cooldown}s</strong>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRequestOtp()}
                          disabled={loading}
                          className="text-xs font-sans font-semibold text-neutral-900 hover:underline cursor-pointer"
                        >
                          Kirim Ulang Kode OTP
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TAB 2: DAFTAR AKUN BARU
        ══════════════════════════════════════════════════════════ */}
        {tab === 'register' && (
          <div>
            {regStep === 'form' ? (
              <form onSubmit={handleStartRegister} className="space-y-3">
                <div>
                  <label className="block text-xs font-sans font-medium text-neutral-700 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-neutral-700 mb-1">
                    Nomor WhatsApp Aktif
                  </label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-neutral-700 mb-1">
                    Alamat Email (Gmail)
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="namaanda@gmail.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-neutral-700 mb-1">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-sans font-semibold text-sm shadow-soft hover:shadow-card active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <span>{loading ? 'Mengirim Kode OTP...' : 'Daftar & Minta Kode OTP'}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <div className="pt-1 text-center">
                  <button
                    type="button"
                    onClick={handleInstantRegister}
                    disabled={loading}
                    className="text-xs font-sans text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                  >
                    atau daftar langsung tanpa verifikasi email
                  </button>
                </div>
              </form>
            ) : (
              /* Step 2: Verifikasi OTP */
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
                  <span className="font-sans text-neutral-600 truncate">
                    Kode verifikasi dikirim ke <strong className="text-neutral-950 font-semibold">{regEmail}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setRegStep('form')}
                    className="text-xs font-semibold text-neutral-900 hover:underline shrink-0 ml-2 cursor-pointer"
                  >
                    Ubah
                  </button>
                </div>

                <div className="py-2">
                  <label className="block text-center text-xs font-sans font-semibold text-neutral-700 mb-3">
                    Masukkan 6-Digit Kode Verifikasi
                  </label>
                  <SegmentedOtpInput
                    value={regOtpCode}
                    onChange={(val) => {
                      setRegOtpCode(val)
                      setError('')
                    }}
                    onComplete={(fullVal) => {
                      handleVerifyRegister(fullVal)
                    }}
                    disabled={loading}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleVerifyRegister(regOtpCode)}
                  disabled={loading || regOtpCode.length < 6}
                  className="w-full py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-sans font-semibold text-sm shadow-soft transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Memverifikasi...' : 'Verifikasi & Buka Akun'}
                </button>

                <div className="text-center pt-1">
                  {cooldown > 0 ? (
                    <span className="text-xs font-sans text-neutral-500">
                      Kirim ulang dalam <strong className="text-neutral-800 font-semibold">{cooldown}s</strong>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleStartRegister}
                      disabled={loading}
                      className="text-xs font-sans font-semibold text-neutral-900 hover:underline cursor-pointer"
                    >
                      Kirim Ulang Kode OTP
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-center gap-2 text-center text-[11px] text-neutral-400 font-sans">
          <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Enkripsi SSL 256-Bit • Data Pembeli Dilindungi</span>
        </div>
      </div>
    </div>
  )
}
