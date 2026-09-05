'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import NotFound from '@/app/not-found'

function InvoiceRedirectContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('order_id')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (orderId) {
      router.replace(`/toko-digital/user/invoice/${encodeURIComponent(orderId)}`)
    }
  }, [orderId, router])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50/60 font-sans text-sm text-neutral-400">
        Memuat nota...
      </div>
    )
  }

  if (!orderId) {
    return <NotFound />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50/60 font-sans text-sm text-neutral-400">
      Mengarahkan ke invoice resmi...
    </div>
  )
}

export default function InvoicePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-neutral-50/60 font-sans text-sm text-neutral-400">Memuat nota...</div>}>
      <InvoiceRedirectContent />
    </Suspense>
  )
}
