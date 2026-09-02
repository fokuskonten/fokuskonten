'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import digitalProducts from '@/content/apps/digitalProducts.json'
import { createProductSlug } from '../slugHelper'

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

function sanitizeDescription(rawText) {
  if (!rawText) return 'Paket produk master digital resmi FokusKonten.'
  return rawText
    .replace(/Fitur Chat Shopee/gi, 'Layanan WhatsApp FokusKonten')
    .replace(/Chat Shopee/gi, 'WhatsApp Resmi FokusKonten')
    .replace(/Shopee/gi, 'FokusKonten')
    .trim()
}

const topCategories = [
  'Semua',
  'Kaos',
  'Desain Grafis',
  'Vektor',
  'Tekstur & Brush',
  'Video FX',
  'Mockup',
  'Font',
  'Preset & LUTs',
  'Banner',
  'Undangan',
  'Sosial Media'
]

export default function ProductDetailClient({ product }) {
  const router = useRouter()
  const [headerSearch, setHeaderSearch] = useState('')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(
    product ? product.gallery?.[0] || product.coverImage : ''
  )

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

  // useMemo WAJIB diletakkan di sini (sebelum early return) agar tidak melanggar Rules of Hooks
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
      .slice(0, 4)
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

  const origPrice = product.originalPrice || product.price * 2
  const discountPercent = origPrice > product.price
    ? Math.round(((origPrice - product.price) / origPrice) * 100)
    : 50

  const cleanDesc = sanitizeDescription(product.description)

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-24 bg-[#FAFAFA] text-neutral-900">
      <div className="container-page max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── 1. UNIFIED BREADCRUMB, CUSTOM CATEGORY SELECTOR & SEARCH BAR ── */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3.5 pb-4 border-b border-neutral-200/80">
          
          {/* Breadcrumb Navigation with Category Pill */}
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
                    {topCategories.filter((c) => c !== 'Semua').map((cat) => (
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
                placeholder="Cari aset digital lain..."
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:border-black outline-none transition-colors shadow-sm"
              />
              <svg
                className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
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
            <span className="font-semibold text-neutral-800">Oleh FokusKonten Master Studio</span>
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
            
            {/* Main Image Showcase Frame (Seamless, Zero Letterboxing Void, Unified Shadow) */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden p-2">
              <div className="relative aspect-square sm:aspect-[4/3] bg-neutral-100 rounded-xl overflow-hidden flex items-center justify-center">
                {(activeImage || product.coverImage) ? (
                  <img
                    src={activeImage || product.coverImage}
                    alt={product.title}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const fallback = e.currentTarget.parentElement.querySelector('.detail-img-fallback')
                      if (fallback) fallback.style.display = 'flex'
                    }}
                    className="w-full h-full object-cover sm:object-contain"
                  />
                ) : null}
                <div
                  className="detail-img-fallback w-full h-full flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-white rounded-xl"
                  style={{ display: (activeImage || product.coverImage) ? 'none' : 'flex' }}
                >
                  <span className="text-6xl mb-3">📦</span>
                  <span className="text-sm font-mono font-bold text-neutral-300 uppercase tracking-widest">{product.category}</span>
                  <span className="text-sm text-neutral-400 mt-2 max-w-sm leading-relaxed">{product.title}</span>
                </div>
              </div>

              {/* Gallery Thumbnails Strip */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="mt-3 pt-3 border-t border-neutral-100 px-1">
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                    {product.gallery.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(imgUrl)}
                        className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg bg-neutral-100 border-2 overflow-hidden transition-all ${
                          activeImage === imgUrl
                            ? 'border-black ring-2 ring-black/10'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={imgUrl} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* About the Product (Clean Long-Form Story, Unified Shadow) */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] space-y-6">
              <div className="border-b border-neutral-100 pb-4">
                <h2 className="text-xl font-bold text-neutral-950 font-display">
                  Tentang Produk Ini
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Detail kelengkapan, isi paket master, dan instruksi penggunaan file.
                </p>
              </div>
              
              <div className="prose prose-neutral max-w-none text-sm sm:text-base text-neutral-700 leading-relaxed space-y-4">
                {cleanDesc.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Product Specifications (Creative Market Style Properties Card, Unified Shadow) */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] space-y-5">
              <h2 className="text-lg font-bold text-neutral-950 font-display border-b border-neutral-100 pb-3.5">
                Spesifikasi Teknis Produk
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Software Kompatibel</span>
                  <span className="font-bold text-neutral-900 text-right">{fmtMeta.comp}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Format File Master</span>
                  <span className="font-bold text-neutral-900 text-right">{fmtMeta.ext}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Tipe Struktur Aset</span>
                  <span className="font-bold text-neutral-900 text-right">{fmtMeta.type}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Lisensi Hak Cipta</span>
                  <span className="font-bold text-emerald-700 text-right">Komersial (Bebas Royalti)</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Penyimpanan Cloud</span>
                  <span className="font-bold text-neutral-900 text-right">Google Drive Cloud Vault</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Masa Berlaku Akses</span>
                  <span className="font-bold text-neutral-900 text-right">Seumur Hidup (Lifetime)</span>
                </div>
              </div>
            </div>

            {/* Tags List Footer (Clickable to Filter Catalog) */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                Tag Terkait:
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/toko-digital/?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-medium text-neutral-600 hover:text-black hover:border-black transition-colors shadow-sm"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: STICKY PURCHASE SIDEBAR (4 COLS, UNIFIED SHADOW) ─ */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            
            {/* Purchase & License Box */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] space-y-6">
              
              {/* License Badge Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <span className="px-2.5 py-1 rounded-md bg-neutral-900 text-white text-[11px] font-bold uppercase tracking-wider">
                  Commercial License
                </span>
                <span className="text-xs text-neutral-500 font-medium">
                  Unlimited Projects
                </span>
              </div>

              {/* Price Display */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Harga Master:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                    Hemat {discountPercent}%
                  </span>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <div className="text-3xl sm:text-4xl font-black text-neutral-950 font-display tracking-tight">
                    {formatRupiah(product.price)}
                  </div>
                  <div className="text-sm text-neutral-400 line-through">
                    {formatRupiah(origPrice)}
                  </div>
                </div>
              </div>

              {/* Inclusion Checklist */}
              <div className="space-y-3 pt-4 border-t border-neutral-100 text-xs sm:text-sm text-neutral-700">
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span><strong>File Master Original:</strong> Format {fmtMeta.ext} siap edit dan siap produksi.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span><strong>Lisensi Komersial:</strong> Bebas digunakan untuk klien, cetak kaos, dan proyek bisnis.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span><strong>Google Drive Lifetime:</strong> Akses cloud vault permanen tanpa batas kuota.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span><strong>Pengiriman Instan:</strong> Tautan akses langsung dikirim ke WhatsApp & Email.</span>
                </div>
              </div>

              {/* Primary High-Impact CTA Button */}
              <div className="pt-2">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-2.5 text-center cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
                  </svg>
                  <span>Beli Sekarang via WhatsApp</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-1 flex flex-col gap-1 text-center text-xs text-neutral-500">
                <span className="flex items-center justify-center gap-1.5 text-neutral-700 font-semibold">
                  <span>🔒</span>
                  <span>Pembayaran Resmi (QRIS / Bank Transfer)</span>
                </span>
                <span>File Original 100% • Bebas Ongkir • Akses Seketika</span>
              </div>
            </div>

            {/* Creator Studio & Support Box */}
            <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  FK
                </div>
                <div>
                  <span className="font-bold text-neutral-900 block">FokusKonten Studio</span>
                  <span className="text-neutral-500">Kreator & Publisher Resmi</span>
                </div>
              </div>
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold transition-colors shadow-sm"
              >
                Chat CS
              </a>
            </div>

          </div>
        </div>

        {/* ── 4. RELATED PRODUCTS SECTION (PRODUK SERUPA DALAM KATEGORI) ──── */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-neutral-200/80">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 font-display">
                  Produk Terkait dalam Kategori &quot;{product.category}&quot;
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Koleksi master aset sejenis yang sering dibeli bersamaan.
                </p>
              </div>
              <Link
                href={`/toko-digital/?cat=${encodeURIComponent(product.category)}`}
                className="text-xs font-bold text-neutral-900 hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Lihat Semua ({product.category})</span>
                <span>&rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => {
                const rOrigPrice = rel.originalPrice || rel.price * 2
                const rDiscount = rOrigPrice > rel.price
                  ? Math.round(((rOrigPrice - rel.price) / rOrigPrice) * 100)
                  : null

                const rSlug = createProductSlug(rel.sku, rel.title)

                return (
                  <div
                    key={rel.sku}
                    className="group bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <Link
                        href={`/toko-digital/${rSlug}/`}
                        className="block relative aspect-square bg-neutral-100 overflow-hidden border-b border-neutral-100"
                      >
                        {rel.coverImage ? (
                          <img
                            src={rel.coverImage}
                            alt={rel.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-white">
                            <span className="text-2xl mb-1">📦</span>
                            <span className="text-[10px] text-neutral-400 line-clamp-2 px-1">{rel.title}</span>
                          </div>
                        )}
                      </Link>

                      <div className="p-3 pb-1">
                        <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                          <span>{rel.category}</span>
                          <span className="font-mono text-neutral-500 bg-neutral-100 px-1 py-0.2 rounded font-semibold">{rel.sku}</span>
                        </div>
                        <Link href={`/toko-digital/${rSlug}/`}>
                          <h4 className="font-bold text-neutral-950 text-xs leading-snug group-hover:text-black transition-colors line-clamp-2 min-h-[32px]">
                            {rel.title}
                          </h4>
                        </Link>
                      </div>
                    </div>

                    <div className="p-3 pt-0">
                      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-1">
                        <div>
                          {rDiscount && (
                            <span className="text-[9px] text-neutral-400 line-through mr-1">
                              {formatRupiah(rOrigPrice)}
                            </span>
                          )}
                          <span className="text-xs font-black text-neutral-950 font-display">
                            {formatRupiah(rel.price)}
                          </span>
                        </div>
                        <Link
                          href={`/toko-digital/${rSlug}/`}
                          className="px-2.5 py-1 rounded-lg bg-black text-white text-[11px] font-bold hover:bg-neutral-800 transition-colors shadow-sm hover:shadow"
                        >
                          Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

