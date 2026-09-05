'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

function InvoiceRedirectContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('order_id') || searchParams.get('id')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (orderId) {
      router.replace(`/toko-digital/user/invoice/?order_id=${encodeURIComponent(orderId)}`)
    }
  }, [orderId, router])

  if (!mounted) {
    return null
  }

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50/60 font-sans text-sm text-neutral-500">
        <div className="text-center p-6">
          <p className="font-bold text-base text-neutral-800 mb-2">Parameter Order ID Tidak Ditemukan</p>
          <Link href="/toko-digital/" className="text-xs text-blue-600 underline">
            Kembali ke Toko Digital
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50/60 font-sans text-sm text-neutral-400">
      Mengarahkan ke invoice resmi...
    </div>
  )
}

export default function InvoicePage() {
  return (
    <Suspense fallback={null}>
      <InvoiceRedirectContent />
    </Suspense>
  )
}
