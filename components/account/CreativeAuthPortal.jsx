'use client'

import { useState, useEffect } from 'react'
import GoogleSignInButton from './GoogleSignInButton'
import SegmentedOtpInput from './SegmentedOtpInput'
import { isValidEmail } from '@/lib/validators'
import {
  registerBuyerAccount,
  loginBuyerWithPassword,
  setBuyerProfile,
  requestBuyerOtp,
  verifyBuyerLoginOtp,
  verifyBuyerRegisterOtp,
  resetBuyerPasswordOtp
} from '@/lib/buyerStore'

export default function CreativeAuthPortal({ onAuthSuccess }) {
  // Tab: 'login' | 'register'
  const [tab, setTab] = useState('login')

  // Mode Login: 'password' | 'otp' | 'forgot'
  const [loginMode, setLoginMode] = useState('password')

  // ─────────────────────────────────────────
  // STATE REGISTER
  // ─────────────────────────────────────────
  const [regStep, setRegStep] = useState('form') // 'form' | 'verify_otp'
  const [regName, setRegName] = useState('')
  const [regPhone, setRegPhone] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regOtpCode, setRegOtpCode] = useState('')
  const [agreedTerms, setAgreedTerms] = useState(true)

  // ─────────────────────────────────────────
  // STATE LOGIN PASSWORD
  // ─────────────────────────────────────────
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // ─────────────────────────────────────────
  // STATE LOGIN OTP (BEBAS KATA SANDI)
  // ─────────────────────────────────────────
  const [otpLoginEmail, setOtpLoginEmail] = useState('')
  const [otpLoginCode, setOtpLoginCode] = useState('')
  const [otpLoginStep, setOtpLoginStep] = useState('input') // 'input' | 'verify'

  // ─────────────────────────────────────────
  // STATE RESET KATA SANDI (LUPA PASSWORD)
  // ─────────────────────────────────────────
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotOtpCode, setForgotOtpCode] = useState('')
  const [forgotNewPassword, setForgotNewPassword] = useState('')
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('')
  const [forgotStep, setForgotStep] = useState('input') // 'input' | 'verify'

  // ─────────────────────────────────────────
  // FEEDBACK & COOLDOWN TIMER
  // ─────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [cooldown, setCooldown] = useState(0)

  // Cooldown Countdown Effect (1 Detik Interval)
  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  // Ganti Tab
  const switchTab = (newTab) => {
    setTab(newTab)
    setErrorMessage('')
    setSuccessMessage('')
    setRegStep('form')
    setLoginMode('password')
    setOtpLoginStep('input')
    setForgotStep('input')
  }

  // ─────────────────────────────────────────
  // 1. SUBMIT LOGIN DENGAN KATA SANDI
  // ─────────────────────────────────────────
  const handlePasswordLogin = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const cleanEmail = loginEmail.trim().toLowerCase()
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      setErrorMessage('Silakan masukkan alamat email yang valid.')
      return
    }
    if (!loginPassword) {
      setErrorMessage('Kata sandi wajib diisi.')
      return
    }

    setIsLoading(true)
    const result = await loginBuyerWithPassword({
      email: cleanEmail,
      password: loginPassword
    })
    setIsLoading(false)

    if (result.success) {
      setSuccessMessage('Login berhasil! Mengalihkan ke koleksi Anda...')
      if (typeof onAuthSuccess === 'function') {
        onAuthSuccess(result.buyer)
      }
    } else {
      setErrorMessage(result.message || 'Email atau kata sandi tidak cocok.')
    }
  }

  // ─────────────────────────────────────────
  // 2. FLOW LOGIN BEBAS SANDI (OTP GMAIL)
  // ─────────────────────────────────────────
  const handleRequestLoginOtp = async (e) => {
    if (e) e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const cleanEmail = (otpLoginEmail || loginEmail).trim().toLowerCase()
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      setErrorMessage('Silakan masukkan alamat Gmail / email yang valid.')
      return
    }

    setOtpLoginEmail(cleanEmail)
    setIsLoading(true)
    const res = await requestBuyerOtp({ email: cleanEmail, purpose: 'BUYER_LOGIN' })
    setIsLoading(false)

    if (res.success) {
      setOtpLoginCode('')
      setCooldown(res.cooldownSeconds || 60)
      setOtpLoginStep('verify')
      setSuccessMessage(`Kode verifikasi 6 digit telah dikirimkan ke ${cleanEmail}.`)
    } else {
      setErrorMessage(res.message || 'Gagal mengirimkan kode OTP. Pastikan email Anda aktif.')
    }
  }

  const handleVerifyLoginOtp = async (codeToVerify) => {
    const code = (codeToVerify || otpLoginCode).trim()
    setErrorMessage('')
    setSuccessMessage('')

    if (code.length !== 6) {
      setErrorMessage('Masukkan 6 digit kode OTP yang diterima di email.')
      return
    }

    setIsLoading(true)
    const result = await verifyBuyerLoginOtp({ email: otpLoginEmail, otp: code })
    setIsLoading(false)

    if (result.success) {
      setSuccessMessage('Verifikasi berhasil! Membuka brankas unduhan...')
      if (typeof onAuthSuccess === 'function') {
        onAuthSuccess(result.buyer)
      }
    } else {
      setErrorMessage(result.message || 'Kode verifikasi tidak sesuai atau sudah kedaluwarsa.')
    }
  }

  // ─────────────────────────────────────────
  // 3. FLOW LUPA KATA SANDI (RESET PASSWORD OTP)
  // ─────────────────────────────────────────
  const handleRequestForgotOtp = async (e) => {
    if (e) e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const cleanEmail = (forgotEmail || loginEmail).trim().toLowerCase()
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      setErrorMessage('Silakan masukkan alamat email akun Anda.')
      return
    }

    setForgotEmail(cleanEmail)
    setIsLoading(true)
    const res = await requestBuyerOtp({ email: cleanEmail, purpose: 'RESET_PASSWORD' })
    setIsLoading(false)

    if (res.success) {
      setForgotOtpCode('')
      setCooldown(res.cooldownSeconds || 60)
      setForgotStep('verify')
      setSuccessMessage(`Kode OTP untuk pembaruan kata sandi telah dikirim ke ${cleanEmail}.`)
    } else {
      setErrorMessage(res.message || 'Akun dengan email tersebut tidak ditemukan.')
    }
  }

  const handleResetPasswordWithOtp = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const code = forgotOtpCode.trim()
    if (code.length !== 6) {
      setErrorMessage('Masukkan 6 digit kode OTP dari email Anda.')
      return
    }
    if (forgotNewPassword.length < 6) {
      setErrorMessage('Kata sandi baru minimal 6 karakter demi keamanan.')
      return
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      setErrorMessage('Konfirmasi kata sandi baru tidak cocok.')
      return
    }

    setIsLoading(true)
    const result = await resetBuyerPasswordOtp({
      email: forgotEmail,
      otp: code,
      newPassword: forgotNewPassword
    })
    setIsLoading(false)

    if (result.success) {
      setSuccessMessage('Kata sandi berhasil diperbarui! Silakan masuk dengan kata sandi baru Anda.')
      setLoginEmail(forgotEmail)
      setLoginPassword(forgotNewPassword)
      setLoginMode('password')
      setForgotStep('input')
    } else {
      setErrorMessage(result.message || 'Verifikasi OTP reset kata sandi gagal.')
    }
  }

  // ─────────────────────────────────────────
  // 4. FLOW REGISTRASI AKUN DENGAN OTP GMAIL
  // ─────────────────────────────────────────
  const handleStartRegister = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!regName.trim()) {
      setErrorMessage('Nama lengkap wajib diisi untuk sertifikat lisensi komersial.')
      return
    }
    if (!regPhone.trim()) {
      setErrorMessage('Nomor WhatsApp aktif wajib diisi untuk konfirmasi file & nota.')
      return
    }
    const cleanEmail = regEmail.trim().toLowerCase()
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      setErrorMessage('Silakan masukkan alamat Gmail / email yang valid.')
      return
    }
    if (!regPassword || regPassword.length < 6) {
      setErrorMessage('Kata sandi minimal 6 karakter demi keamanan akun Anda.')
      return
    }
    if (!agreedTerms) {
      setErrorMessage('Anda harus menyetujui Ketentuan Layanan & Lisensi Komersial.')
      return
    }

    setIsLoading(true)
    // Kirimkan OTP registrasi ke Gmail pemohon
    const otpRes = await requestBuyerOtp({ email: cleanEmail, purpose: 'REGISTER_VERIFICATION' })
    setIsLoading(false)

    if (otpRes.success) {
      setRegOtpCode('')
      setCooldown(otpRes.cooldownSeconds || 60)
      setRegStep('verify_otp')
      setSuccessMessage(`Kode verifikasi 6 digit telah dikirim ke ${cleanEmail}.`)
    } else {
      // Fallback: Jika SMTP error atau pengguna ingin mendaftar langsung
      setErrorMessage(otpRes.message || 'Gagal mengirimkan kode OTP. Silakan periksa email Anda.')
    }
  }

  const handleVerifyRegister = async (codeToVerify) => {
    const code = (codeToVerify || regOtpCode).trim()
    setErrorMessage('')
    setSuccessMessage('')

    if (code.length !== 6) {
      setErrorMessage('Masukkan 6 digit kode OTP verifikasi akun.')
      return
    }

    setIsLoading(true)
    const result = await verifyBuyerRegisterOtp({
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      phone: regPhone.trim(),
      password: regPassword,
      otp: code
    })
    setIsLoading(false)

    if (result.success) {
      setSuccessMessage('Akun member resmi berhasil dibuat & diverifikasi!')
      if (typeof onAuthSuccess === 'function') {
        onAuthSuccess(result.buyer)
      }
    } else {
      setErrorMessage(result.message || 'Kode verifikasi tidak sesuai atau sudah kedaluwarsa.')
    }
  }

  // Registrasi instan (tanpa OTP jika offline / darurat)
  const handleInstantRegister = async () => {
    setIsLoading(true)
    const result = await registerBuyerAccount({
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      phone: regPhone.trim(),
      password: regPassword
    })
    setIsLoading(false)

    if (result.success) {
      setSuccessMessage('Akun member berhasil dibuat! Mengalihkan...')
      if (typeof onAuthSuccess === 'function') {
        onAuthSuccess(result.buyer)
      }
    } else {
      setErrorMessage(result.message || 'Gagal membuat akun.')
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 font-sans">
      {/* ──────────────────────────────────────────────────────────
          SISI KIRI (MARKETPLACE BRAND SHOWCASE)
      ────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-5 bg-neutral-950 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle Ambient Background Gradient */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-neutral-800/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-neutral-900/60 blur-3xl" />

        <div className="relative z-10 space-y-7">
          {/* Badge Portal */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300">
            <svg className="w-3.5 h-3.5 text-neutral-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Akun FokusKonten</span>
          </div>

          {/* Heading - Strict Inter font */}
          <div>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
              Pusat Desain &amp; Template Digital
            </h2>
            <p className="text-sm text-neutral-400 mt-2.5 leading-relaxed font-sans font-normal">
              Kelola seluruh file unduhan dan lisensi komersial desain Anda dalam satu akun.
            </p>
          </div>

          {/* Value Props with Pixel-Perfect Vector SVGs */}
          <div className="space-y-4 pt-1">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-white mt-0.5 shadow-soft">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6m0 0l-2-2m2 2l2-2" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans font-semibold text-sm text-white">
                  Akses Google Drive
                </h4>
                <p className="text-xs text-neutral-400 font-sans mt-0.5 leading-relaxed">
                  Unduh file desain kapan saja langsung melalui folder resmi Google Drive.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-white mt-0.5 shadow-soft">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans font-semibold text-sm text-white">
                  Lisensi Komersial
                </h4>
                <p className="text-xs text-neutral-400 font-sans mt-0.5 leading-relaxed">
                  Bebas digunakan untuk kebutuhan personal, cetak produk, maupun proyek klien.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-white mt-0.5 shadow-soft">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans font-semibold text-sm text-white">
                  Akses Multi-Perangkat
                </h4>
                <p className="text-xs text-neutral-400 font-sans mt-0.5 leading-relaxed">
                  Akses file dan riwayat pesanan dari komputer, laptop, maupun ponsel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Sisi Kiri */}
        <div className="relative z-10 pt-6 mt-6 border-t border-neutral-900 flex items-center gap-2.5 text-xs text-neutral-400 font-sans">
          <svg className="w-4 h-4 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Keamanan &amp; Privasi Data Terjamin</span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          SISI KANAN (FORM OTENTIKASI RESMI)
      ────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
        {/* Tab Switcher: Masuk vs Daftar Akun */}
        <div className="flex p-1 rounded-xl bg-neutral-100 border border-neutral-200/80 mb-6 max-w-xs">
          <button
            type="button"
            onClick={() => switchTab('login')}
            className={`flex-1 py-2 px-4 rounded-lg font-sans font-semibold text-sm transition-all cursor-pointer ${
              tab === 'login'
                ? 'bg-neutral-950 text-white shadow-soft'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => switchTab('register')}
            className={`flex-1 py-2 px-4 rounded-lg font-sans font-semibold text-sm transition-all cursor-pointer ${
              tab === 'register'
                ? 'bg-neutral-950 text-white shadow-soft'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            Daftar
          </button>
        </div>

        {/* 1-Click Google Sign-In */}
        {tab === 'login' && loginMode === 'password' && (
          <div className="space-y-4 mb-5">
            <GoogleSignInButton
              onLoginSuccess={(prof) => {
                if (typeof onAuthSuccess === 'function') {
                  onAuthSuccess(prof)
                }
              }}
            />

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <span className="relative px-3 bg-white text-xs font-sans font-medium text-neutral-400">
                atau lanjutkan dengan email
              </span>
            </div>
          </div>
        )}

        {/* Feedback Alert Banners */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-800 text-xs font-sans flex items-start gap-2.5">
            <svg className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 text-xs font-sans flex items-start gap-2.5">
            <svg className="w-4 h-4 text-neutral-950 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="leading-relaxed">{successMessage}</span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TAB 1: FORM MASUK (LOGIN)
        ══════════════════════════════════════════════════════════ */}
        {tab === 'login' && (
          <div className="space-y-4">
            {/* SUB-MODE A: MASUK DENGAN KATA SANDI */}
            {loginMode === 'password' && (
              <form onSubmit={handlePasswordLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-sans font-medium text-neutral-700 mb-1.5">
                    Alamat Email Terdaftar
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="nama@gmail.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-sans font-medium text-neutral-700">
                      Kata Sandi
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginMode('forgot')
                        setForgotEmail(loginEmail)
                        setErrorMessage('')
                        setSuccessMessage('')
                      }}
                      className="text-xs font-sans font-medium text-neutral-500 hover:text-neutral-950 transition-colors cursor-pointer"
                    >
                      Lupa Kata Sandi?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Masukkan kata sandi..."
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-1 py-3 px-6 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-sans font-semibold text-sm shadow-soft hover:shadow-card active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <span>Memproses...</span>
                  ) : (
                    <>
                      <span>Masuk ke Akun Member</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Switch ke Mode OTP */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMode('otp')
                      setOtpLoginEmail(loginEmail)
                      setErrorMessage('')
                      setSuccessMessage('')
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span>Masuk Instan dengan Kode OTP Gmail (Bebas Sandi)</span>
                  </button>
                </div>
              </form>
            )}

            {/* SUB-MODE B: LOGIN BEBAS SANDI DENGAN KODE OTP */}
            {loginMode === 'otp' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neutral-900" />
                    <span className="text-xs font-sans font-semibold text-neutral-800">
                      Login Bebas Kata Sandi via Gmail OTP
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMode('password')
                      setErrorMessage('')
                      setSuccessMessage('')
                    }}
                    className="text-xs font-sans font-medium text-neutral-500 hover:text-neutral-950 cursor-pointer"
                  >
                    Gunakan Kata Sandi
                  </button>
                </div>

                {otpLoginStep === 'input' ? (
                  <form onSubmit={handleRequestLoginOtp} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-sans font-medium text-neutral-700 mb-1.5">
                        Alamat Gmail Akun Anda
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={otpLoginEmail}
                          onChange={(e) => setOtpLoginEmail(e.target.value)}
                          placeholder="nama@gmail.com"
                          required
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-[11px] text-neutral-500 font-sans mt-1 block">
                        Sistem akan mengirimkan 6 digit kode pengaman ke kotak masuk atau spam email Anda.
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-6 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-sans font-semibold text-sm shadow-soft hover:shadow-card transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <span>Mengirim Kode OTP...</span>
                      ) : (
                        <>
                          <span>Kirim Kode OTP Masuk</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* Verifikasi Segmented 6-Box OTP */
                  <div className="space-y-4">
                    {/* Banner Info Target Email */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <svg className="w-4 h-4 text-neutral-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="font-sans text-neutral-600 truncate">
                          Kode dikirim ke <strong className="text-neutral-950 font-semibold">{otpLoginEmail}</strong>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOtpLoginStep('input')}
                        className="text-xs font-semibold text-neutral-900 hover:underline shrink-0 ml-2 cursor-pointer"
                      >
                        Ganti Email
                      </button>
                    </div>

                    {/* Segmented 6-Box OTP Input */}
                    <div className="py-2">
                      <label className="block text-center text-xs font-sans font-semibold text-neutral-700 mb-3">
                        Masukkan 6-Digit Kode Verifikasi
                      </label>
                      <SegmentedOtpInput
                        value={otpLoginCode}
                        onChange={(val) => {
                          setOtpLoginCode(val)
                          setErrorMessage('')
                        }}
                        onComplete={(fullVal) => {
                          handleVerifyLoginOtp(fullVal)
                        }}
                        disabled={isLoading}
                      />
                    </div>

                    {/* Tombol Verifikasi Manual */}
                    <button
                      type="button"
                      onClick={() => handleVerifyLoginOtp(otpLoginCode)}
                      disabled={isLoading || otpLoginCode.length < 6}
                      className="w-full py-3 px-6 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-sans font-semibold text-sm shadow-soft hover:shadow-card transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <span>Memverifikasi OTP...</span>
                      ) : (
                        <>
                          <span>Verifikasi & Buka Akun</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </>
                      )}
                    </button>

                    {/* Timer Countdown Kirim Ulang OTP */}
                    <div className="text-center pt-1">
                      {cooldown > 0 ? (
                        <div className="inline-flex items-center gap-2 text-xs font-sans text-neutral-500">
                          <svg className="w-3.5 h-3.5 animate-spin text-neutral-400" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                          </svg>
                          <span>
                            Kirim ulang kode dalam <strong className="text-neutral-800 font-semibold">{cooldown} detik</strong>
                          </span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRequestLoginOtp()}
                          disabled={isLoading}
                          className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-neutral-900 hover:text-neutral-700 transition-colors cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>Kirim Ulang Kode OTP</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SUB-MODE C: LUPA KATA SANDI (RESET PASSWORD VIA OTP) */}
            {loginMode === 'forgot' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                  <span className="text-xs font-sans font-semibold text-neutral-800">
                    Pemulihan Kata Sandi Akun
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMode('password')
                      setErrorMessage('')
                      setSuccessMessage('')
                    }}
                    className="text-xs font-sans font-medium text-neutral-500 hover:text-neutral-950 cursor-pointer"
                  >
                    Batal
                  </button>
                </div>

                {forgotStep === 'input' ? (
                  <form onSubmit={handleRequestForgotOtp} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-sans font-medium text-neutral-700 mb-1.5">
                        Alamat Email Akun Terdaftar
                      </label>
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="nama@gmail.com"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-6 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-sans font-semibold text-sm shadow-soft transition-all cursor-pointer disabled:opacity-60"
                    >
                      {isLoading ? 'Mengirim Kode...' : 'Kirim Kode Reset Kata Sandi'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleResetPasswordWithOtp} className="space-y-3.5">
                    {/* Banner Target */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs">
                      <span className="font-sans text-neutral-600 truncate">
                        Kode reset dikirim ke <strong className="text-neutral-950 font-semibold">{forgotEmail}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => setForgotStep('input')}
                        className="text-xs font-semibold text-neutral-900 hover:underline shrink-0 ml-2 cursor-pointer"
                      >
                        Ganti Email
                      </button>
                    </div>

                    {/* Segmented OTP */}
                    <div className="py-2">
                      <label className="block text-center text-xs font-sans font-semibold text-neutral-700 mb-3">
                        Masukkan 6-Digit Kode OTP Reset
                      </label>
                      <SegmentedOtpInput
                        value={forgotOtpCode}
                        onChange={(val) => {
                          setForgotOtpCode(val)
                          setErrorMessage('')
                        }}
                        disabled={isLoading}
                      />
                    </div>

                    {/* Password Baru */}
                    <div>
                      <label className="block text-xs font-sans font-medium text-neutral-700 mb-1">
                        Kata Sandi Baru
                      </label>
                      <input
                        type="password"
                        value={forgotNewPassword}
                        onChange={(e) => setForgotNewPassword(e.target.value)}
                        placeholder="Minimal 6 karakter"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                      />
                    </div>

                    {/* Konfirmasi Password Baru */}
                    <div>
                      <label className="block text-xs font-sans font-medium text-neutral-700 mb-1">
                        Konfirmasi Kata Sandi Baru
                      </label>
                      <input
                        type="password"
                        value={forgotConfirmPassword}
                        onChange={(e) => setForgotConfirmPassword(e.target.value)}
                        placeholder="Ulangi kata sandi baru"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || forgotOtpCode.length < 6}
                      className="w-full py-3 px-6 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-sans font-semibold text-sm shadow-soft transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? 'Menyimpan Kata Sandi...' : 'Simpan Kata Sandi Baru & Masuk'}
                    </button>

                    {/* Cooldown Timer */}
                    <div className="text-center pt-1">
                      {cooldown > 0 ? (
                        <span className="text-xs font-sans text-neutral-500">
                          Kirim ulang kode dalam <strong className="text-neutral-800 font-semibold">{cooldown} detik</strong>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRequestForgotOtp()}
                          disabled={isLoading}
                          className="text-xs font-sans font-semibold text-neutral-900 hover:underline cursor-pointer"
                        >
                          Kirim Ulang Kode OTP
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TAB 2: FORM DAFTAR AKUN BARU (REGISTER)
        ══════════════════════════════════════════════════════════ */}
        {tab === 'register' && (
          <div>
            {regStep === 'form' ? (
              <div className="space-y-4">
                {/* 1-Click Google Sign-In on Register */}
                <GoogleSignInButton
                  onLoginSuccess={(prof) => {
                    if (typeof onAuthSuccess === 'function') {
                      onAuthSuccess(prof)
                    }
                  }}
                />

                {/* Divider */}
                <div className="relative flex items-center justify-center my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200" />
                  </div>
                  <span className="relative px-3 bg-white text-xs font-sans font-medium text-neutral-400">
                    atau daftar dengan email & kata sandi
                  </span>
                </div>

                <form onSubmit={handleStartRegister} className="space-y-3.5">
                {/* Nama Lengkap */}
                <div>
                  <label className="block text-xs font-sans font-medium text-neutral-700 mb-1">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-sans mt-0.5 block">
                    Nama resmi untuk pencatatan sertifikat lisensi komersial & nota invoice.
                  </span>
                </div>

                {/* Nomor WhatsApp */}
                <div>
                  <label className="block text-xs font-sans font-medium text-neutral-700 mb-1">
                    Nomor WhatsApp Aktif
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-sans mt-0.5 block">
                    Digunakan untuk konfirmasi pengiriman pesanan dan notifikasi update file.
                  </span>
                </div>

                {/* Alamat Email */}
                <div>
                  <label className="block text-xs font-sans font-medium text-neutral-700 mb-1">
                    Alamat Email (Gmail)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="namaanda@gmail.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Kata Sandi */}
                <div>
                  <label className="block text-xs font-sans font-medium text-neutral-700 mb-1">
                    Kata Sandi Akun
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-sans outline-none transition-all"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Checkbox Persetujuan */}
                <div className="pt-0.5">
                  <label className="flex items-start gap-2.5 text-xs text-neutral-600 font-sans cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="mt-0.5 rounded border-neutral-300 text-neutral-950 focus:ring-neutral-950"
                    />
                    <span>
                      Saya menyetujui Ketentuan Layanan, Lisensi Komersial, dan Kebijakan Privasi Fokus Konten.
                    </span>
                  </label>
                </div>

                {/* Submit Button: Minta OTP */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-1 py-3 px-6 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-sans font-semibold text-sm shadow-soft hover:shadow-card active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <span>Mengirim Kode OTP...</span>
                  ) : (
                    <>
                      <span>Daftar & Minta Kode OTP Gmail</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Opsi Daftar Langsung */}
                <div className="pt-1 text-center">
                  <button
                    type="button"
                    onClick={handleInstantRegister}
                    disabled={isLoading}
                    className="text-xs font-sans text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                  >
                    atau daftar langsung tanpa verifikasi email
                  </button>
                </div>
              </form>
            </div>
            ) : (
              /* STEP 2: VERIFIKASI OTP REGISTRASI */
              <div className="space-y-4">
                {/* Banner Info Target Email */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <svg className="w-4 h-4 text-neutral-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-sans text-neutral-600 truncate">
                      Verifikasi pendaftaran akun untuk <strong className="text-neutral-950 font-semibold">{regEmail}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRegStep('form')}
                    className="text-xs font-semibold text-neutral-900 hover:underline shrink-0 ml-2 cursor-pointer"
                  >
                    Ubah Data
                  </button>
                </div>

                {/* Segmented OTP Input */}
                <div className="py-2">
                  <label className="block text-center text-xs font-sans font-semibold text-neutral-700 mb-3">
                    Masukkan 6-Digit Kode Verifikasi dari Gmail
                  </label>
                  <SegmentedOtpInput
                    value={regOtpCode}
                    onChange={(val) => {
                      setRegOtpCode(val)
                      setErrorMessage('')
                    }}
                    onComplete={(fullVal) => {
                      handleVerifyRegister(fullVal)
                    }}
                    disabled={isLoading}
                  />
                </div>

                {/* Tombol Selesaikan Pendaftaran */}
                <button
                  type="button"
                  onClick={() => handleVerifyRegister(regOtpCode)}
                  disabled={isLoading || regOtpCode.length < 6}
                  className="w-full py-3 px-6 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-sans font-semibold text-sm shadow-soft hover:shadow-card transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>Memverifikasi Akun...</span>
                  ) : (
                    <>
                      <span>Verifikasi & Selesaikan Pendaftaran</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Timer Countdown */}
                <div className="text-center pt-1">
                  {cooldown > 0 ? (
                    <span className="text-xs font-sans text-neutral-500">
                      Kirim ulang kode dalam <strong className="text-neutral-800 font-semibold">{cooldown} detik</strong>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleStartRegister}
                      disabled={isLoading}
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-neutral-900 hover:underline cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Kirim Ulang Kode OTP</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
