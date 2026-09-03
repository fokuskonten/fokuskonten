'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import BuyerProfileCard from '@/components/account/BuyerProfileCard'
import BuyerDownloadsList from '@/components/account/BuyerDownloadsList'
import BuyerOrderHistory from '@/components/account/BuyerOrderHistory'
import BuyerLoginModal from '@/components/account/BuyerLoginModal'
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
  const [activeTab, setActiveTab] = useState('downloads') // 'downloads' | 'orders'
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [manualEmail, setManualEmail] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  const reloadData = () => {
    const prof = getBuyerProfile()
    const prods = getPurchasedProducts()
    const ords = getBuyerOrders()
    setProfile(prof)
    setProducts(prods)
    setOrders(ords)
    setIsLoaded(true)
  }

  useEffect(() => {
    reloadData()
    const prof = getBuyerProfile()
    if (prof?.email) {
      syncBuyerOrdersFromServer(prof.email)
    }
    const unsubscribe = subscribeBuyerStore(() => {
      reloadData()
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = () => {
    if (window.confirm('Yakin ingin keluar dari akun di perangkat ini?')) {
      clearBuyerSession()
    }
  }

  const handleQuickLogin = (e) => {
    e.preventDefault()
    if (!manualEmail.trim()) return
    setBuyerProfile({
      email: manualEmail.trim().toLowerCase(),
      name: manualEmail.split('@')[0]
    })
    setManualEmail('')
  }

  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Toko Digital', href: '/toko-digital/' },
    { label: 'Akun & Unduhan', href: '/akun/' }
  ]

  return (
    <div className="min-h-screen bg-neutral-50/60 pb-20 pt-24 sm:pt-28">
      <div className="container-page max-w-5xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbs} />
        </div>

        {/* State 1: Belum Ada Profil (Welcome Hero / Login Gate) */}
        {isLoaded && !profile?.email ? (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.06)] text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-black/20">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>

              <h1 className="font-display font-black text-2xl sm:text-3xl text-neutral-950 tracking-tight mb-3">
                Brankas Unduhan & Akun Pembeli
              </h1>
              <p className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-lg mx-auto mb-8">
                Akses seluruh master file desain (CorelDraw, Photoshop, Vector) yang pernah Anda beli secara instan, kapan saja dan dari perangkat mana saja.
              </p>

              {/* Quick Gmail Access Form */}
              <form onSubmit={handleQuickLogin} className="max-w-md mx-auto space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    placeholder="Masukkan alamat Gmail Anda..."
                    className="flex-1 px-4 py-3 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 text-sm font-medium outline-none transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-black hover:bg-neutral-800 text-white font-display font-bold text-sm shadow-md transition-all whitespace-nowrap cursor-pointer"
                  >
                    Buka Brankas
                  </button>
                </div>
                <p className="text-xs text-neutral-400 text-left">
                  🔒 Otomatis mendeteksi riwayat transaksi pembelian dengan alamat Gmail tersebut.
                </p>
              </form>

              <div className="mt-10 pt-6 border-t border-neutral-100 flex items-center justify-center gap-6 text-xs text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Akses Google Drive Permanen</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Lisensi Komersial Resmi</span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* State 2: Sudah Ada Sesi Pembeli */
          <div className="space-y-8 animate-fade-in">
            {/* Header Profile Card */}
            <BuyerProfileCard
              profile={profile}
              totalAssets={products.length}
              totalOrders={orders.length}
              onLogout={handleLogout}
            />

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-px">
              <button
                onClick={() => setActiveTab('downloads')}
                className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-display font-bold text-sm transition-all border-b-2 ${
                  activeTab === 'downloads'
                    ? 'border-black text-black bg-white shadow-sm'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/50'
                }`}
              >
                <span>📦</span>
                <span>Unduhan & Aset Saya</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] bg-neutral-100 text-neutral-700 font-mono">
                  {products.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-display font-bold text-sm transition-all border-b-2 ${
                  activeTab === 'orders'
                    ? 'border-black text-black bg-white shadow-sm'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/50'
                }`}
              >
                <span>📄</span>
                <span>Riwayat Nota Invoice</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] bg-neutral-100 text-neutral-700 font-mono">
                  {orders.length}
                </span>
              </button>
            </div>

            {/* Tab Contents */}
            <div>
              {activeTab === 'downloads' ? (
                <BuyerDownloadsList products={products} />
              ) : (
                <BuyerOrderHistory orders={orders} />
              )}
            </div>

            {/* Store Banner Footer */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-neutral-900 to-black text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div>
                <h4 className="font-display font-bold text-base text-white">
                  Ingin Menambah Koleksi Master Desain?
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Lebih dari 2.100+ template kaos, font, vektor, dan grafis siap pakai.
                </p>
              </div>
              <Link
                href="/toko-digital/"
                className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-100 transition-colors shadow shrink-0"
              >
                Jelajahi Toko Digital →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Login Modal Popup */}
      <BuyerLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={(prof) => {
          setBuyerProfile(prof)
          reloadData()
        }}
      />
    </div>
  )
}
