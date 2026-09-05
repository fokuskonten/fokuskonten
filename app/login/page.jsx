'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Breadcrumb from '@/components/Breadcrumb'
import CreativeAuthPortal from '@/components/account/CreativeAuthPortal'
import { getBuyerProfile, subscribeBuyerStore } from '@/lib/buyerStore'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const prof = getBuyerProfile()
    if (prof?.email) {
      router.replace('/akun/')
    }

    const unsub = subscribeBuyerStore(() => {
      const p = getBuyerProfile()
      if (p?.email) {
        router.replace('/akun/')
      }
    })
    return () => unsub()
  }, [router])

  // Breadcrumb tanpa duplikasi Beranda
  const breadcrumbs = [
    { label: 'Toko Digital', href: '/toko-digital/' },
    { label: 'Masuk / Daftar Akun', href: '/login/' }
  ]

  return (
    <div className="min-h-screen bg-neutral-50/60 pb-20 pt-24 sm:pt-28 font-sans">
      <div className="container-page max-w-5xl">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbs} />
        </div>
        <CreativeAuthPortal
          onAuthSuccess={() => {
            window.location.href = '/akun/'
          }}
        />
      </div>
    </div>
  )
}
