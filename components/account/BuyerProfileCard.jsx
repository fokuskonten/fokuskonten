'use client'

import Link from 'next/link'

export default function BuyerProfileCard({ profile, totalAssets = 0, totalOrders = 0, onLogout, onEditProfile }) {
  if (!profile || !profile.email) return null

  const initials = (profile.name || profile.email)
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white text-neutral-900 p-6 sm:p-7 border border-neutral-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name || 'Avatar'}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-neutral-200 shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center font-sans font-bold text-xl sm:text-2xl text-neutral-800 shrink-0">
              {initials}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-sans font-extrabold text-lg sm:text-xl tracking-tight text-neutral-950">
                {profile.name || 'Member FokusKonten'}
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold bg-neutral-900 text-white tracking-wider uppercase">
                <svg className="w-2.5 h-2.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            </div>
            <p className="text-neutral-500 font-mono text-xs sm:text-sm mt-0.5">
              {profile.email}
            </p>
            {profile.phone && (
              <p className="text-neutral-400 text-xs mt-0.5">
                WhatsApp: {profile.phone}
              </p>
            )}
          </div>
        </div>

        {/* Right Stats & Actions */}
        <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-neutral-200 flex-wrap">
          <div className="text-center px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 min-w-[72px]">
            <div className="text-sm font-bold font-sans text-neutral-950">
              {totalAssets}
            </div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 mt-0.5">
              Produk
            </div>
          </div>

          <div className="text-center px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 min-w-[72px]">
            <div className="text-sm font-bold font-sans text-neutral-950">
              {totalOrders}
            </div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 mt-0.5">
              Pesanan
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onEditProfile && (
              <button
                type="button"
                onClick={onEditProfile}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium border border-neutral-200 transition-colors cursor-pointer"
                title="Buka Pengaturan Profil"
              >
                <svg className="w-3.5 h-3.5 text-neutral-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Pengaturan
              </button>
            )}

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 text-xs font-medium border border-neutral-200 transition-colors cursor-pointer"
                title="Keluar dari sesi perangkat ini"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Keluar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
