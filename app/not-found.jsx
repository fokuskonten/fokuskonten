'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { extractSkuFromSlug } from '@/app/toko-digital/slugHelper'

export default function NotFound() {
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const pathname = window.location.pathname
      const match = pathname.match(/^\/toko-digital\/([^/]+)(\/fullpreview)?\/?$/i)
      if (match) {
        const rawParam = match[1]
        const isFullPreview = Boolean(match[2])
        const reserved = ['checkout', 'user', 'invoice', 'cart']

        if (!reserved.includes(rawParam.toLowerCase())) {
          const sku = extractSkuFromSlug(rawParam)
          if (sku) {
            const canonicalTarget = `/toko-digital/${sku.toLowerCase()}/${isFullPreview ? 'fullpreview/' : ''}`
            const currentNorm = pathname.replace(/\/+$/, '')
            const targetNorm = canonicalTarget.replace(/\/+$/, '')

            if (currentNorm !== targetNorm) {
              setIsRedirecting(true)
              window.location.replace(canonicalTarget)
              return
            }
          }
        }
      }
    } catch (_) {}
  }, [])

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var p = window.location.pathname;
                var m = p.match(/^\\/toko-digital\\/([^\\/]+)(\\/fullpreview)?\\/?$/i);
                if (m) {
                  var raw = decodeURIComponent(m[1]).trim();
                  var isFull = Boolean(m[2]);
                  var reserved = ['checkout', 'user', 'invoice', 'cart'];
                  if (reserved.indexOf(raw.toLowerCase()) === -1) {
                    var parts = raw.toLowerCase().split('-');
                    var sku = '';
                    if (parts[0] && /^id[a-z0-9]+$/i.test(parts[0])) {
                      sku = parts[0];
                    } else {
                      var last = parts[parts.length - 1];
                      if (last && /^id[a-z0-9]+$/i.test(last)) {
                        sku = last;
                      } else {
                        var sm = raw.match(/(id[a-z0-9]+)/i);
                        if (sm) sku = sm[1].toLowerCase();
                      }
                    }
                    if (sku) {
                      var target = '/toko-digital/' + sku + '/' + (isFull ? 'fullpreview/' : '');
                      if (p.replace(/\\/+$/, '') !== target.replace(/\\/+$/, '')) {
                        window.location.replace(target);
                      }
                    }
                  }
                }
              } catch (e) {}
            })();
          `,
        }}
      />

      {isRedirecting ? (
        <section className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center p-8">
            <div className="inline-block w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin mb-4" />
            <p className="text-xs uppercase tracking-widest text-neutral-400 font-bold font-sans">
              Mengalihkan ke Katalog Resmi...
            </p>
          </div>
        </section>
      ) : (
        <section className="min-h-[75vh] flex items-center justify-center py-16 px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <span className="text-8xl sm:text-9xl font-display font-black text-neutral-900 tracking-tight select-none">
                404
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-neutral-950 mb-3 tracking-tight">
              Halaman Tidak Ditemukan
            </h1>
            <p className="text-neutral-500 text-sm max-w-sm mx-auto mb-8 font-sans leading-relaxed">
              Halaman yang Anda tuju tidak tersedia atau telah dipindahkan ke tautan kanonikal resmi FokusKonten.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/toko-digital/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-xs text-white bg-neutral-950 hover:bg-neutral-800 transition-all shadow-sm active:scale-95"
              >
                <span>🛍️</span>
                <span>Jelajahi Toko Digital</span>
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-xs text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200/80 transition-all active:scale-95"
              >
                <span>Kembali ke Beranda</span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
