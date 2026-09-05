'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import BuyerProfileCard from '@/components/account/BuyerProfileCard'
import BuyerDownloadsList from '@/components/account/BuyerDownloadsList'
import BuyerOrderHistory from '@/components/account/BuyerOrderHistory'
import BuyerProfileSettingsForm from '@/components/account/BuyerProfileSettingsForm'
import BuyerOrderClaimForm from '@/components/account/BuyerOrderClaimForm'
import CreativeAuthPortal from '@/components/account/CreativeAuthPortal'
import { 
  getBuyerProfile, 
  setBuyerProfile,
  clearBuyerSession, 
  getBuyerOrders, 
  getPurchasedProducts, 
  subscribeBuyerStore,
  syncBuyerOrdersFromServer 
} from '@/lib/buyerStore'

export default function AkunPage() {
  const [profile, setProfile] = useState(null)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('downloads') // 'downloads' | 'orders' | 'settings' | 'claim'
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const reloadData = () => {
    const prof = getBuyerProfile()
    const prods = getPurchasedProducts()
    const ords = getBuyerOrders()
    setProfile(prof)
    setProducts(prods)
    setOrders(ords)
    setIsLoaded(true)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('fk_akun_tab', tab)
      } catch (e) {}
      const newUrl = tab === 'downloads' ? '/akun/' : `/akun/?tab=${tab}`
      window.history.replaceState(null, '', newUrl)
    }
  }

  useEffect(() => {
    // 0. Tutup dan bersihkan Google One Tap saat pengguna sudah berada di dasbor akun
    if (typeof window !== 'undefined') {
      try {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.cancel()
        }
        const picker = document.getElementById('credential_picker_container')
        if (picker) picker.remove()
        const iframe = document.getElementById('credential_picker_iframe')
        if (iframe) iframe.remove()
      } catch (_) {}
    }

    // Restore tab from URL or handle cross-device claim (Mobile -> Desktop PC)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const tabParam = params.get('tab')
      const claimOrder = params.get('claim_order')
      const claimEmail = params.get('email')

      if (claimEmail) {
        setBuyerProfile({ email: claimEmail })
        syncBuyerOrdersFromServer(claimEmail).then(() => {
          reloadData()
        })
      }

      let savedTab = null
      try {
        savedTab = sessionStorage.getItem('fk_akun_tab')
      } catch (e) {}
      const validTabs = ['downloads', 'orders', 'settings', 'claim']
      const targetTab = tabParam || (claimOrder ? 'downloads' : savedTab)
      if (targetTab && validTabs.includes(targetTab)) {
        setActiveTab(targetTab)
      }
    }

    reloadData()
    const prof = getBuyerProfile()
    if (prof?.email) {
      syncBuyerOrdersFromServer(prof.email).then(() => {
        reloadData()
      })
    }
    const unsubscribe = subscribeBuyerStore(() => {
      reloadData()
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = () => {
    setIsLogoutModalOpen(true)
  }

  const confirmLogout = () => {
    clearBuyerSession()
    try {
      sessionStorage.removeItem('fk_akun_tab')
    } catch (e) {}
    setProfile(null)
    setProducts([])
    setOrders([])
    setIsLogoutModalOpen(false)
  }

  // Breadcrumbs dinamis menyesuaikan nama user
  const breadcrumbs = [
    { label: 'Toko Digital', href: '/toko-digital/' },
    { label: profile?.name ? `Akun ${profile.name.split(' ')[0]}` : 'Akun & Unduhan', href: '/akun/' }
  ]

  return (
    <div className="min-h-screen bg-neutral-50/60 pb-20 pt-24 sm:pt-28 font-sans">
      <div className="container-page max-w-5xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbs} />
        </div>

        {/* State 1: Belum Login -> Tampilkan Portal Otentikasi Creative Marketplace */}
        {!profile?.email ? (
          <div className="space-y-8 animate-fade-in">
            <CreativeAuthPortal
              onAuthSuccess={(newProfile) => {
                setProfile(newProfile)
                reloadData()
              }}
            />
          </div>
        ) : (
          /* State 2: Sudah Ada Sesi Pembeli -> Tampilkan Dashboard Studio */
          isLoaded && (
            <div className="space-y-8 animate-fade-in">
              {/* Header Profile Card */}
              <BuyerProfileCard
                profile={profile}
                totalAssets={products.length}
                totalOrders={orders.length}
                onLogout={handleLogout}
                onEditProfile={() => handleTabChange('settings')}
              />

              {/* Navigation Tabs (Creative Market / Creative Fabrica Hub Layout) */}
              <div className="flex items-center gap-1.5 sm:gap-2 border-b border-neutral-200/80 pb-px overflow-x-auto no-scrollbar">
                {/* 1. Downloads Tab */}
                <button
                  type="button"
                  onClick={() => handleTabChange('downloads')}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-t-xl font-sans font-semibold text-xs sm:text-sm transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'downloads'
                      ? 'border-neutral-950 text-neutral-950 bg-white shadow-soft'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/50'
                  }`}
                >
                  <svg className="w-4 h-4 text-neutral-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>File &amp; Unduhan</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-neutral-100 text-neutral-700 font-mono">
                    {products.length}
                  </span>
                </button>

                {/* 2. Orders Tab */}
                <button
                  type="button"
                  onClick={() => handleTabChange('orders')}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-t-xl font-sans font-semibold text-xs sm:text-sm transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'orders'
                      ? 'border-neutral-950 text-neutral-950 bg-white shadow-soft'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/50'
                  }`}
                >
                  <svg className="w-4 h-4 text-neutral-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Riwayat Pesanan</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-neutral-100 text-neutral-700 font-mono">
                    {orders.length}
                  </span>
                </button>

                {/* 3. Settings Tab */}
                <button
                  type="button"
                  onClick={() => handleTabChange('settings')}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-t-xl font-sans font-semibold text-xs sm:text-sm transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'settings'
                      ? 'border-neutral-950 text-neutral-950 bg-white shadow-soft'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/50'
                  }`}
                >
                  <svg className="w-4 h-4 text-neutral-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Pengaturan</span>
                </button>

                {/* 4. Claim Tab */}
                <button
                  type="button"
                  onClick={() => handleTabChange('claim')}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-t-xl font-sans font-semibold text-xs sm:text-sm transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'claim'
                      ? 'border-neutral-950 text-neutral-950 bg-white shadow-soft'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/50'
                  }`}
                >
                  <svg className="w-4 h-4 text-neutral-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Klaim Pesanan</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div>
                {activeTab === 'downloads' && (
                  <BuyerDownloadsList 
                    products={products} 
                    buyerProfile={profile} 
                  />
                )}

                {activeTab === 'orders' && (
                  <BuyerOrderHistory orders={orders} />
                )}

                {activeTab === 'settings' && (
                  <BuyerProfileSettingsForm
                    profile={profile}
                    onProfileUpdated={(upd) => {
                      setProfile(upd)
                      reloadData()
                    }}
                  />
                )}

                {activeTab === 'claim' && (
                  <BuyerOrderClaimForm
                    profile={profile}
                    onClaimSuccess={() => {
                      reloadData()
                      setActiveTab('downloads')
                    }}
                  />
                )}
              </div>

              {/* Store Banner Footer */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-neutral-900 to-black text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-card">
                <div>
                  <h4 className="font-sans font-bold text-base text-white">
                    Eksplorasi Desain Lainnya
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">
                    Temukan berbagai template dan aset desain siap pakai.
                  </p>
                </div>
                <Link
                  href="/toko-digital/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-sans font-semibold text-xs hover:bg-neutral-100 transition-colors shadow-soft shrink-0"
                >
                  <span>Buka Toko Digital</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          )
        )}
      </div>

      {/* Custom Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-[24px] shadow-2xl border border-neutral-200/60 w-full max-w-sm p-8 text-center animate-scale-in">
            <h3 className="font-sans font-extrabold text-2xl tracking-tight text-neutral-950 mb-3">
              Keluar Sesi?
            </h3>
            <p className="text-[13px] text-neutral-500 font-sans leading-relaxed mb-8 px-2">
              Akses ke unduhan dan riwayat pesanan di perangkat ini akan diakhiri sementara.
            </p>
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={confirmLogout}
                className="w-full px-5 py-3.5 rounded-2xl bg-neutral-950 hover:bg-neutral-900 text-white font-sans font-semibold text-sm transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                Akhiri Sesi
              </button>
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="w-full px-5 py-3.5 rounded-2xl bg-white hover:bg-neutral-50 text-neutral-900 font-sans font-semibold text-sm transition-all border border-neutral-200 hover:border-neutral-300"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
