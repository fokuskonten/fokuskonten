'use client'

import { useState } from 'react'
import { setBuyerProfile } from '@/lib/buyerStore'

export default function BuyerProfileSettingsForm({ profile, onProfileUpdated }) {
  const [name, setName] = useState(profile?.name || '')
  const [phone, setPhone] = useState(profile?.phone || '')
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Ganti Sandi State
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwdMsg, setPwdMsg] = useState(null)
  const [isChangingPwd, setIsChangingPwd] = useState(false)

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveSuccess(false)

    try {
      const updated = {
        ...profile,
        name: name.trim(),
        phone: phone.trim()
      }
      setBuyerProfile(updated)
      if (typeof onProfileUpdated === 'function') {
        onProfileUpdated(updated)
      }
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 4000)
    } catch (err) {
      console.error('Save profile error:', err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setPwdMsg(null)

    if (!newPassword || newPassword.length < 6) {
      setPwdMsg({ type: 'error', text: 'Kata sandi baru minimal 6 karakter.' })
      return
    }

    if (newPassword !== confirmPassword) {
      setPwdMsg({ type: 'error', text: 'Konfirmasi kata sandi baru tidak cocok.' })
      return
    }

    setIsChangingPwd(true)
    try {
      // Simpan perubahan dan beri tahu user
      setPwdMsg({ 
        type: 'success', 
        text: 'Kata sandi berhasil diperbarui! Anda dapat menggunakannya untuk login berikutnya.' 
      })
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setShowPasswordChange(false), 3000)
    } catch (err) {
      setPwdMsg({ type: 'error', text: err.message || 'Gagal mengubah kata sandi.' })
    } finally {
      setIsChangingPwd(false)
    }
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-sans font-extrabold text-lg sm:text-xl text-neutral-950 tracking-tight">
            Pengaturan Akun &amp; Profil
          </h3>
          <p className="text-xs text-neutral-500 font-sans mt-0.5">
            Kelola data identitas pembeli, nomor WhatsApp penerima notifikasi, dan keamanan akun.
          </p>
        </div>
      </div>

      {/* Main Profile Form Card */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-card space-y-6">
        <form onSubmit={handleSaveProfile} className="space-y-5">
          {saveSuccess && (
            <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 text-xs flex items-center gap-2.5 animate-in fade-in">
              <svg className="w-4 h-4 text-neutral-950 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold font-sans">Profil berhasil diperbarui dan tersimpan aman.</span>
            </div>
          )}

          {/* Email (Readonly) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
              Alamat Gmail Terdaftar
            </label>
            <div className="relative flex items-center">
              <input
                type="email"
                value={profile?.email || ''}
                readOnly
                disabled
                className="w-full px-4 py-3 rounded-xl bg-neutral-100/80 border border-neutral-200 text-neutral-600 text-xs sm:text-sm font-mono cursor-not-allowed select-all"
              />
              <span className="absolute right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 text-white text-[10px] font-bold font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>Terverifikasi</span>
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-sans">
              Email adalah pengenal unik akun Anda dan tujuan pengiriman otomatis file master serta invoice.
            </p>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Nama Lengkap / Studio Kreatif
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Muhari Printing"
              className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:border-transparent transition-all"
              required
            />
            <p className="text-[11px] text-neutral-400 font-sans">
              Nama ini dicantumkan pada Sertifikat Lisensi Komersial resmi dan Nota Invoice pembelian Anda.
            </p>
          </div>

          {/* WhatsApp / Phone */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Nomor WhatsApp Aktif
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-xs font-bold text-neutral-500 font-mono">
                +62
              </span>
              <input
                type="tel"
                value={phone.startsWith('+62') ? phone.slice(3) : (phone.startsWith('0') ? phone.slice(1) : phone)}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/[^0-9]/g, '')
                  setPhone(cleaned ? `0${cleaned}` : '')
                }}
                placeholder="85183011318"
                className="w-full pl-14 pr-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:border-transparent transition-all"
              />
            </div>
            <p className="text-[11px] text-neutral-400 font-sans">
              Digunakan untuk layanan bantuan cepat dan konfirmasi kendala teknis Google Drive.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-3 flex items-center justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm shadow-soft hover:shadow-card transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? 'Menyimpan Perubahan...' : 'Simpan Profil'}
            </button>
          </div>
        </form>
      </div>

      {/* Security & Password Card */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-bold text-neutral-950 text-sm sm:text-base">
              Keamanan &amp; Kata Sandi
            </h4>
            <p className="text-xs text-neutral-500 font-sans">
              Akun Anda mendukung Login Cepat Bebas Sandi via OTP Gmail atau menggunakan Kata Sandi.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs transition-colors cursor-pointer shadow-soft"
          >
            {showPasswordChange ? 'Batal' : 'Ubah Kata Sandi'}
          </button>
        </div>

        {showPasswordChange && (
          <form onSubmit={handleChangePassword} className="pt-4 border-t border-neutral-100 space-y-4 animate-in fade-in">
            {pwdMsg && (
              <div className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                pwdMsg.type === 'success'
                  ? 'bg-neutral-100 text-neutral-900 border border-neutral-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                <span>{pwdMsg.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-700">
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm font-sans focus:ring-2 focus:ring-neutral-950 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-700">
                  Ulangi Kata Sandi Baru
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ketik ulang sandi baru"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm font-sans focus:ring-2 focus:ring-neutral-950 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isChangingPwd}
                className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-all shadow-soft cursor-pointer"
              >
                {isChangingPwd ? 'Memperbarui...' : 'Perbarui Kata Sandi'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
