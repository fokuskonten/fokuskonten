'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import digitalProducts from '@/content/apps/digitalProducts.json'
import storeCategories from '@/content/apps/store_categories.json'
import ProductGallery from '@/components/product/ProductGallery'
import ProductPurchaseBox from '@/components/product/ProductPurchaseBox'
import ProductSpecs from '@/components/product/ProductSpecs'
import ProductRelatedGrid from '@/components/product/ProductRelatedGrid'
import { hasPurchasedSku, subscribeBuyerStore } from '@/lib/buyerStore'
import { addToCart, hasInCart, subscribeCartStore } from '@/lib/cartStore'

const formatSoftwareMap = {
  'CDR': { name: 'CorelDraw', ext: '.CDR', comp: 'CorelDraw X7 s/d 2024 / PC & Mac', type: 'Vector Graphics Master', desc: 'File Vektor Asli 100% Editable (Teks, Warna, & Garis)' },
  'PSD': { name: 'Adobe Photoshop', ext: '.PSD', comp: 'Adobe Photoshop CS6 s/d CC 2024', type: 'Layered Raster & Smart Object', desc: 'File Layered PSD High Resolution + Smart Object' },
  'AI/EPS': { name: 'Adobe Illustrator', ext: '.AI / .EPS', comp: 'Adobe Illustrator CS6 s/d CC 2024', type: 'Scalable Vector Asset', desc: 'Master Vector Illustrator Scalable Lossless' },
  'AEP': { name: 'Adobe After Effects', ext: '.AEP', comp: 'Adobe After Effects CC 2020 s/d 2024', type: 'Motion Graphics Project', desc: 'Project Motion Graphics dengan Kontrol Efek Lengkap' },
  'MP4': { name: 'Video Footage FX', ext: '.MP4', comp: 'Premiere Pro, CapCut, DaVinci, FCPX', type: '4K/FHD Video Overlay', desc: 'Asset Video Transparan / Alpha Channel Siap Pakai' },
  'PPTX': { name: 'Microsoft PowerPoint', ext: '.PPTX', comp: 'PowerPoint 2016+, Google Slides, Canva', type: 'Presentation Slides Master', desc: 'Template Presentasi Animasi & Visual Infografis' },
  'CANVA': { name: 'Canva Template Link', ext: 'Link Template', comp: 'Browser Web, Aplikasi iOS, Android', type: 'Cloud Graphic Template', desc: 'Template Desain Siap Edit Langsung di Canva' },
  'PROCREATE': { name: 'Procreate Brush / Canvas', ext: '.BRUSHSET', comp: 'Aplikasi Procreate iPad / Pocket', type: 'Digital Illustration Brushes', desc: 'Custom Brush & High-Resolution Texture Canvas' },
  'ABR': { name: 'Photoshop Brushes', ext: '.ABR', comp: 'Adobe Photoshop CS6 s/d 2024', type: 'Custom Brush Preset Pack', desc: 'Kumpulan Brush Khusus Efek & Tekstur Desain' },
  'LUTS/XMP': { name: 'Lightroom Presets & LUTs', ext: '.XMP / .CUBE', comp: 'Lightroom Mobile & Desktop, Premiere Pro', type: 'Color Grading Preset & LUTs', desc: 'Color Grading Preset Profesional 1-Klik' },
  'TTF/OTF': { name: 'Font Typography Master', ext: '.TTF / .OTF', comp: 'Windows, macOS, Linux, CapCut, Canva', type: 'Typography Font Master', desc: 'Font Komersial Penuh dengan Karakter Alternatif' },
  'WAV/MP3': { name: 'Audio Sound FX', ext: '.WAV / .MP3', comp: 'Semua Video Editor & DAW Audio', type: 'Studio Lossless Audio SFX', desc: 'Sound Effects Berkualitas Studio Tanpa Noise' },
  'XLSX': { name: 'Microsoft Excel / Sheets', ext: '.XLSX', comp: 'Microsoft Excel 2016+ & Google Sheets', type: 'Automated Spreadsheet Dashboard', desc: 'Template Spreadsheet Otomatisasi & Rumus Siap Pakai' },
  'PDF': { name: 'E-Book / Dokumen Master', ext: '.PDF', comp: 'Adobe Acrobat & Semua PDF Reader', type: 'Digital Document & Guide', desc: 'Dokumen Panduan & Aset Vektor Siap Cetak' }
}

export default function ProductDetailClient({ product }) {
  const router = useRouter()
  const [headerSearch, setHeaderSearch] = useState('')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(
    product ? product.gallery?.[0] || product.coverImage : ''
  )
  const [isOwned, setIsOwned] = useState(false)
  const [inCart, setInCart] = useState(false)
  const [isJustAdded, setIsJustAdded] = useState(false)

  useEffect(() => {
    if (!product?.sku) return
    setIsOwned(hasPurchasedSku(product.sku))
    setInCart(hasInCart(product.sku))

    const unsubBuyer = subscribeBuyerStore(() => {
      setIsOwned(hasPurchasedSku(product.sku))
    })
    const unsubCart = subscribeCartStore(() => {
      setInCart(hasInCart(product.sku))
    })

    return () => {
      unsubBuyer()
      unsubCart()
    }
  }, [product?.sku])

  const handleAddToCart = () => {
    if (inCart) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('open-cart-drawer'))
      }
      return
    }
    addToCart(product)
    setIsJustAdded(true)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cart-item-added', { detail: product }))
    }
    setTimeout(() => {
      setIsJustAdded(false)
    }, 1200)
  }

  // Kategori Dinamis: Menggabungkan kategori master, dataset produk, dan kategori produk ini
  const allCategories = useMemo(() => {
    const cats = new Set(['Semua'])
    if (Array.isArray(storeCategories)) {
      storeCategories.forEach(c => { if (c && c.trim()) cats.add(c.trim()) })
    }
    if (Array.isArray(digitalProducts)) {
      digitalProducts.forEach(p => {
        if (p.category && p.category.trim()) cats.add(p.category.trim())
      })
    }
    if (product && product.category) cats.add(product.category.trim())
    return Array.from(cats)
  }, [product])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (headerSearch.trim()) {
      router.push(`/toko-digital/?q=${encodeURIComponent(headerSearch.trim())}`)
    }
  }

  const handleCategorySelect = (cat) => {
    setIsCategoryOpen(false)
    if (cat === 'Semua') {
      router.push('/toko-digital/')
    } else {
      router.push(`/toko-digital/?cat=${encodeURIComponent(cat)}`)
    }
  }

  // useMemo sebelum early return agar tidak melanggar Rules of Hooks
  const fmtMetaResolved = useMemo(() => {
    if (!product) return { name: 'Master Digital', ext: '.ZIP', comp: 'PC / Laptop', type: 'Asset Digital', desc: 'File Master Aset Digital' }
    return formatSoftwareMap[product.format] || {
      name: product.format || 'Master Digital',
      ext: `.${product.format || 'ZIP'}`,
      comp: 'Perangkat PC / Laptop / Mobile',
      type: 'Asset Digital Original',
      desc: 'File Master Aset Digital Original Siap Pakai'
    }
  }, [product])

  const tags = useMemo(() => {
    if (!product) return []
    const base = [
      product.category,
      fmtMetaResolved.name,
      'AsetDigital',
      'DesainGrafis',
      'TemplateMaster',
      'InstantDownload',
      'GoogleDriveVault',
      'CommercialUse'
    ]
    const titleWords = (product.title || '')
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 3 && !['paket', 'koleksi', 'terlaris', 'premium', 'siap', 'pakai', 'untuk', 'dan', 'dari'].includes(w.toLowerCase()))
    return Array.from(new Set([...base, ...titleWords])).slice(0, 10)
  }, [product, fmtMetaResolved])

  const relatedProducts = useMemo(() => {
    if (!product) return []
    return digitalProducts
      .filter((p) => p.category === product.category && p.sku !== product.sku)
      .slice(0, 5)
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-white text-neutral-900 text-center">
        <h1 className="text-2xl font-bold">Produk Tidak Ditemukan</h1>
        <Link href="/toko-digital/" className="mt-4 inline-block text-black underline font-semibold">
          Kembali ke Toko Digital
        </Link>
      </div>
    )
  }

  const fmtMeta = fmtMetaResolved

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num)
  }

  const generateWhatsAppLink = () => {
    const message = `Halo Admin FokusKonten,%0A%0ASaya ingin memesan produk digital:%0A*${product.sku} - ${product.title}*%0AHarga: *${formatRupiah(product.price)}*%0AKategori: *${product.category}*%0A%0AMohon info rekening / QRIS pembayaran.%0AEmail Google Drive saya: [Tuliskan Email Anda]`
    return `https://wa.me/6285183011318?text=${message}`
  }

  const cleanDesc = product.description || 'Paket produk master digital resmi FokusKonten.'

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-32 sm:pb-24 bg-[#FAFAFA] text-neutral-900">
      <div className="container-page max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── 1. UNIFIED BREADCRUMB, CATEGORY SELECTOR & SEARCH BAR ── */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3.5 pb-4 border-b border-neutral-200/80">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 flex-wrap">
            <Link href="/" className="hover:text-black transition-colors font-medium">Beranda</Link>
            <span>/</span>
            <Link href="/toko-digital/" className="hover:text-black transition-colors font-medium">Toko Digital</Link>
            <span>/</span>
            <Link
              href={`/toko-digital/?cat=${encodeURIComponent(product.category)}`}
              className="px-2.5 py-1 rounded-lg bg-neutral-900 text-white font-bold hover:bg-neutral-800 transition-colors text-xs shadow-sm"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-mono font-bold bg-white px-2 py-0.5 rounded text-[11px] border border-neutral-200 shadow-sm">
              SKU: {product.sku}
            </span>
          </nav>

          {/* Integrated Category Switcher & Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-auto">
            {/* Custom Popover Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="py-2 pl-3.5 pr-8 rounded-xl bg-white border border-neutral-200 text-xs font-bold text-neutral-800 hover:border-black transition-all shadow-sm flex items-center gap-2"
              >
                <span>{product.category || 'Semua Kategori'}</span>
                <span className="text-neutral-400 text-[10px]">▼</span>
              </button>

              {isCategoryOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsCategoryOpen(false)}
                  />
                  <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-2 w-52 bg-white rounded-2xl border border-neutral-200 shadow-2xl p-1.5 z-50 max-h-72 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden animate-in fade-in zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => handleCategorySelect('Semua')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                        !product.category ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <span>Semua Kategori</span>
                      {!product.category && <span>✓</span>}
                    </button>
                    {allCategories.filter((c) => c !== 'Semua').map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleCategorySelect(cat)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                          product.category === cat ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        <span>{cat}</span>
                        {product.category === cat && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Quick Search Input */}
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                placeholder="Cari produk lain..."
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:border-black outline-none transition-colors shadow-sm"
              />
              <svg
                className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>
        </div>

        {/* ── 2. PRODUCT HEADER TITLE ─────────────────────────────────────── */}
        <div className="mb-6 space-y-1.5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-950 tracking-tight font-display">
            {product.title}
          </h1>
          <div className="flex items-center gap-2.5 text-xs text-neutral-500 flex-wrap">
            <span className="font-semibold text-neutral-800">FokusKonten</span>
            <span>•</span>
            <span className="text-amber-500 font-bold">★★★★★</span>
            <span className="text-neutral-600 font-medium">5.0 (490+ Ulasan)</span>
            <span>•</span>
            <span className="bg-white text-neutral-700 font-mono font-bold px-2 py-0.5 rounded text-[11px] border border-neutral-200 shadow-sm">
              SKU: {product.sku}
            </span>
          </div>
        </div>

        {/* ── 3. TWO-COLUMN GRID LAYOUT (CM STYLE) ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT COLUMN: MEDIA SHOWCASE, STORY & SPECS (8 COLS) ────────── */}
          <div className="lg:col-span-8 space-y-8">
            <ProductGallery
              product={product}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              isZoomOpen={isZoomOpen}
              setIsZoomOpen={setIsZoomOpen}
            />
            <ProductSpecs
              fmtMeta={fmtMeta}
              cleanDesc={cleanDesc}
              tags={tags}
            />
          </div>

          {/* ── RIGHT COLUMN: STICKY PURCHASE SIDEBAR (4 COLS) ─────────────── */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <ProductPurchaseBox
              product={product}
              fmtMeta={fmtMeta}
            />
          </div>
        </div>

        {/* ── 4. RELATED PRODUCTS SECTION ─────────────────────────────────── */}
        <ProductRelatedGrid
          category={product.category}
          relatedProducts={relatedProducts}
        />

      </div>

      {/* ── 5. MOBILE FLOATING STICKY ACTION BAR (MD DOWN ONLY) ─────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 p-3 px-4 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] flex items-center justify-between gap-3 font-sans">
        <div>
          <div className="text-[10px] text-neutral-400 line-through leading-none">
            {formatRupiah(product.originalPrice || product.price * 2)}
          </div>
          <div className="text-base font-black text-neutral-950 font-display leading-tight">
            {formatRupiah(product.price)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isOwned ? (
            <Link
              href="/akun/"
              className="py-2.5 px-4 rounded-xl bg-neutral-950 text-white font-display font-bold text-xs shadow-md flex items-center gap-1.5"
            >
              <span>✓ Di Koleksi Saya</span>
            </Link>
          ) : (
            <>
              <button
                type="button"
                onClick={handleAddToCart}
                className={`p-2.5 rounded-xl border font-bold text-xs transition-all duration-200 flex items-center justify-center cursor-pointer ${
                  inCart
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm active:scale-95'
                    : isJustAdded
                    ? 'bg-neutral-950 text-white border-neutral-950 scale-105 ring-2 ring-neutral-900 shadow-md'
                    : 'bg-white text-neutral-900 border-neutral-300 shadow-sm active:scale-95'
                }`}
                title={inCart ? 'Lihat Keranjang' : 'Tambah ke Keranjang'}
                aria-label={inCart ? 'Lihat Keranjang' : 'Tambah ke Keranjang'}
              >
                {inCart ? (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/>
                  </svg>
                )}
              </button>

              <Link
                href={`/toko-digital/checkout/?sku=${encodeURIComponent(product.sku)}`}
                className="py-2.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-display font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Beli Sekarang</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
