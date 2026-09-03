'use client'

import Link from 'next/link'

export default function BuyerProfileCard({ profile, totalAssets = 0, totalOrders = 0, onLogout }) {
  if (!profile || !profile.email) return null

  const initials = (profile.name || profile.email)
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()

  return (
    <div className="relative overflow-hidden rounded-2xl bg-neutral-950 text-white p-6 sm:p-8 border border-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
      {/* Background Subtle Gradient Glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-neutral-800/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-neutral-800/30 blur-3xl" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Avatar Ring */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-700 border border-neutral-700/60 flex items-center justify-center font-display font-black text-xl sm:text-2xl text-white shadow-inner shrink-0">
            {initials}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-white">
                {profile.name || 'Member FokusKonten'}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-800 text-emerald-400 border border-emerald-500/20">
                Verified
              </span>
            </div>
            <p className="text-neutral-400 font-mono text-xs sm:text-sm mt-0.5">
              {profile.email}
            </p>
            {profile.phone && (
              <p className="text-neutral-500 text-xs mt-0.5">
                WhatsApp: {profile.phone}
              </p>
            )}
          </div>
        </div>

        {/* Right Stats & Actions */}
        <div className="flex items-center gap-4 sm:gap-6 pt-4 sm:pt-0 border-t sm:border-t-0 border-neutral-800/80">
          <div className="text-center px-4 py-2 rounded-xl bg-neutral-900/80 border border-neutral-800">
            <div className="text-2xl font-black font-display text-white">
              {totalAssets}
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Aset Digital
            </div>
          </div>

          <div className="text-center px-4 py-2 rounded-xl bg-neutral-900/80 border border-neutral-800">
            <div className="text-2xl font-black font-display text-white">
              {totalOrders}
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Transaksi
            </div>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold border border-neutral-800 transition-colors"
              title="Keluar dari sesi perangkat ini"
            >
              Keluar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
