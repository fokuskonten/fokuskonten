'use client'

import { isValidGmail, isValidEmail } from '@/lib/validators'

export default function DeliveryEmailForm({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  errors = {}
}) {
  const isGoogleMail = isValidGmail(email)
  const isGeneralEmail = isValidEmail(email)

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama lengkap Anda"
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-medium outline-none transition-all"
          required
        />
        {errors.name && (
          <p className="text-red-600 text-xs mt-1 font-medium">{errors.name}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Email Pengiriman <span className="text-red-500">*</span>
          </label>
          <span className="text-[10px] text-neutral-400 font-medium">
            Untuk akses Google Drive
          </span>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@gmail.com"
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-medium outline-none transition-all"
          required
        />
        {errors.email ? (
          <p className="text-red-600 text-xs mt-1 font-medium">{errors.email}</p>
        ) : email && !isGoogleMail && isGeneralEmail ? (
          <div className="mt-1.5 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-1.5">
            <span className="shrink-0 mt-0.5">⚠️</span>
            <span>
              Gunakan akun <strong>@gmail.com</strong> agar link Google Drive bisa langsung dibuka tanpa kendala akses.
            </span>
          </div>
        ) : (
          <p className="text-[11px] text-neutral-400 mt-1">
            Link akses Google Drive akan dikirim ke email ini.
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
          Nomor WhatsApp <span className="text-neutral-400 font-normal">(Opsional)</span>
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="08xxxxxxxxxx"
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-medium outline-none transition-all"
        />
        <p className="text-[11px] text-neutral-400 mt-1">
          Untuk konfirmasi atau bantuan teknis jika diperlukan.
        </p>
      </div>
    </div>
  )
}
