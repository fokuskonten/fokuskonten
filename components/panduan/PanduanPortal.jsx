'use client'

import { useState, useMemo, useEffect } from 'react'

const POPULAR_HASHTAGS = [
  '#GoogleDriveLimit',
  '#GagalEkstrakWinRAR',
  '#VersiCorelTinggi',
  '#CetakUndangan',
  '#JenisKertasCetak',
  '#SablonManual',
  '#Woodcraft',
  '#PhotoshopAction',
  '#RakitPC',
  '#TemplateCanva'
]

const ITEMS_PER_PAGE = 36

export default function PanduanPortal({ initialTutorials = [] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCat, setSelectedCat] = useState('ALL')
  const [selectedHashtag, setSelectedHashtag] = useState('')
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)

  // Ekstrak kategori unik berserta jumlahnya
  const categories = useMemo(() => {
    const map = new Map()
    initialTutorials.forEach(t => {
      const cat = t.parentCat || 'Umum'
      map.set(cat, (map.get(cat) || 0) + 1)
    })
    const list = Array.from(map.entries()).map(([name, count]) => ({ name, count }))
    return list
  }, [initialTutorials])

  // Filter video berdasarkan pencarian, kategori, dan hashtag
  const filteredTutorials = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    const tag = selectedHashtag.toLowerCase().trim()

    return initialTutorials.filter(item => {
      // Filter Kategori
      if (selectedCat !== 'ALL' && item.parentCat !== selectedCat) {
        return false
      }

      // Filter Hashtag
      if (tag) {
        const itemTags = (item.hashtags || []).map(h => h.toLowerCase())
        if (!itemTags.includes(tag)) {
          return false
        }
      }

      // Filter Pencarian Teks
      if (q) {
        const titleMatch = (item.title || '').toLowerCase().includes(q)
        const catMatch = (item.category || '').toLowerCase().includes(q)
        const parentMatch = (item.parentCat || '').toLowerCase().includes(q)
        const tagMatch = (item.hashtags || []).some(h => h.toLowerCase().includes(q))
        return titleMatch || catMatch || parentMatch || tagMatch
      }

      return true
    })
  }, [initialTutorials, selectedCat, selectedHashtag, searchQuery])

  // Reset pagination saat filter berubah
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE)
  }, [searchQuery, selectedCat, selectedHashtag])

  const visibleTutorials = useMemo(() => {
    return filteredTutorials.slice(0, displayCount)
  }, [filteredTutorials, displayCount])

  const handleHashtagClick = (tag) => {
    if (selectedHashtag === tag) {
      setSelectedHashtag('')
    } else {
      setSelectedHashtag(tag)
    }
  }

  const handleCatChange = (catName) => {
    setSelectedCat(catName)
  }

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + ITEMS_PER_PAGE)
  }

  return (
    <div className="space-y-8">
      {/* KOTAK DWYOR / PERINGATAN KRITIS: Akses & Ekstraksi File */}
      <div className="bg-neutral-950 text-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="bg-white text-neutral-950 font-mono font-bold text-xs uppercase px-2.5 py-1 rounded-md">
              PANDUAN KRITIS
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
              Solusi Utama Akses File & Ekstraksi
            </h2>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            Wajib Dibaca Pembeli Shopee & Web
          </span>
        </div>

        <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
          Jika mengalami kendala saat mengunduh dari Google Drive atau membuka berkas pesanan, pilih solusi terverifikasi di bawah ini:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
                <h3 className="font-bold text-sm text-white">Google Drive Limit Kuota 24 Jam</h3>
              </div>
              <p className="text-xs text-neutral-400 mb-3 pl-4">
                Trik membuat salinan pintasan di akun Drive pribadi agar file langsung dapat diunduh tanpa menunggu 24 jam.
              </p>
            </div>
            <a
              href="https://youtu.be/7fXjawx8OlE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2 bg-white text-neutral-950 text-xs font-bold font-mono rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Tonton Solusi Limit Drive →
            </a>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
                <h3 className="font-bold text-sm text-white">Gagal Ekstrak RAR / ZIP / Corrupt</h3>
              </div>
              <p className="text-xs text-neutral-400 mb-3 pl-4">
                Seluruh file 100% bebas password. Gunakan WinRAR 6.x atau 7-Zip versi terbaru di PC/Laptop untuk ekstraksi bersih.
              </p>
            </div>
            <a
              href="https://youtu.be/91Hp5PRE54s"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2 bg-white text-neutral-950 text-xs font-bold font-mono rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Tonton Solusi Ekstrak WinRAR →
            </a>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
                <h3 className="font-bold text-sm text-white">Download Macet / Berhenti di Tengah Jalan</h3>
              </div>
              <p className="text-xs text-neutral-400 mb-3 pl-4">
                Gunakan fitur resume unduhan di Chrome atau utilitas Internet Download Manager (IDM) untuk koneksi tidak stabil.
              </p>
            </div>
            <a
              href="https://youtu.be/uoU4-VoTWAE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2 bg-white text-neutral-950 text-xs font-bold font-mono rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Tonton Solusi Unduhan Macet →
            </a>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
                <h3 className="font-bold text-sm text-white">Unduh Banyak File Lewat HP Android</h3>
              </div>
              <p className="text-xs text-neutral-400 mb-3 pl-4">
                Panduan praktis membuka tautan Drive di HP Android dan mengunduh berkas tanpa perlu aplikasi tambahan.
              </p>
            </div>
            <a
              href="https://youtu.be/A5DaJ_mbED0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2 bg-white text-neutral-950 text-xs font-bold font-mono rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Tonton Panduan Android →
            </a>
          </div>
        </div>
      </div>

      {/* FILTER & PENCARIAN UTAMA */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
        {/* Input Pencarian */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tutorial spesifik (contoh: ekstrak winrar, coreldraw, potong kayu, sablon, reset canon, rakit pc)..."
            className="w-full px-4 py-3.5 pl-11 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-950 focus:bg-white transition-all text-neutral-950 placeholder:text-neutral-400"
          />
          <svg
            className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-neutral-400 hover:text-neutral-950"
            >
              BERSIHKAN
            </button>
          )}
        </div>

        {/* Hashtag Masalah Populer */}
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
            Topik & Kendala Paling Dicari:
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_HASHTAGS.map(tag => {
              const isActive = selectedHashtag.toLowerCase() === tag.toLowerCase()
              return (
                <button
                  key={tag}
                  onClick={() => handleHashtagClick(tag)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-mono font-medium transition-colors border ${
                    isActive
                      ? 'bg-neutral-950 text-white border-neutral-950'
                      : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {tag}
                </button>
              )
            })}
            {selectedHashtag && (
              <button
                onClick={() => setSelectedHashtag('')}
                className="text-xs px-3 py-1.5 rounded-lg font-mono font-bold text-neutral-950 bg-neutral-200 hover:bg-neutral-300"
              >
                Reset Topik ×
              </button>
            )}
          </div>
        </div>

        {/* Tab Kategori */}
        <div className="border-t border-neutral-100 pt-6 space-y-2">
          <div className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
            Kategori Workshop & Digital ({initialTutorials.length} Video Total):
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleCatChange('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border ${
                selectedCat === 'ALL'
                  ? 'bg-neutral-950 text-white border-neutral-950'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              Semua ({initialTutorials.length})
            </button>
            {categories.map(c => {
              const isSelected = selectedCat === c.name
              return (
                <button
                  key={c.name}
                  onClick={() => handleCatChange(c.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border ${
                    isSelected
                      ? 'bg-neutral-950 text-white border-neutral-950'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {c.name} ({c.count})
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* HEADER DAFTAR HASIL */}
      <div className="flex items-baseline justify-between border-b border-neutral-200 pb-3">
        <div>
          <h3 className="text-lg font-extrabold text-neutral-950">
            {selectedCat === 'ALL' ? 'Daftar Tutorial Terverifikasi' : selectedCat}
          </h3>
          {selectedHashtag && (
            <p className="text-xs text-neutral-500 font-mono mt-0.5">
              Menampilkan video dengan topik: {selectedHashtag}
            </p>
          )}
        </div>
        <span className="text-xs font-mono text-neutral-500">
          Ditemukan {filteredTutorials.length} video
        </span>
      </div>

      {/* GRID VIDEO (971 ITEM LAZY-LOADED) */}
      {visibleTutorials.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleTutorials.map((item) => {
            const thumbUrl = `https://img.youtube.com/vi/${item.id}/mqdefault.jpg`
            return (
              <div
                key={item.id + item.num}
                className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Video */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-video bg-neutral-900 group overflow-hidden"
                  >
                    <img
                      src={thumbUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-neutral-950/80 text-white flex items-center justify-center pl-0.5 shadow-lg group-hover:bg-neutral-950 transition-colors">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-neutral-950/80 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                      YouTube
                    </span>
                  </a>

                  {/* Isi Konten Kartu */}
                  <div className="p-4 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-200 uppercase">
                        {item.badge}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        #{item.num}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-neutral-950 leading-snug line-clamp-2 hover:text-neutral-700">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </h4>

                    {/* Hashtags */}
                    {item.hashtags && item.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.hashtags.slice(0, 3).map((h) => (
                          <button
                            key={h}
                            onClick={() => handleHashtagClick(h)}
                            className="text-[10px] font-mono text-neutral-500 hover:text-neutral-950"
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Kartu & Tombol Aksi */}
                <div className="p-4 pt-0">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    <span>Tonton Tutorial</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white border border-dashed border-neutral-300 rounded-2xl p-8 space-y-3">
          <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="font-extrabold text-neutral-950 text-base">Tutorial Tidak Ditemukan</h4>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Tidak ada video yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;. Silakan ganti kata kunci atau reset filter topik.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCat('ALL'); setSelectedHashtag(''); }}
            className="inline-block mt-2 px-4 py-2 bg-neutral-950 text-white text-xs font-bold rounded-lg"
          >
            Tampilkan Seluruh 971 Video
          </button>
        </div>
      )}

      {/* Tombol Muat Lebih Banyak */}
      {visibleTutorials.length < filteredTutorials.length && (
        <div className="text-center pt-4">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-white border border-neutral-300 hover:border-neutral-950 text-neutral-950 text-xs font-mono font-bold rounded-xl shadow-sm transition-all"
          >
            Muat Lebih Banyak ({visibleTutorials.length} dari {filteredTutorials.length} video ditampilkan) ↓
          </button>
        </div>
      )}

      {/* FOOTER CTA & SUBSCRIPTION */}
      <div className="border-t border-neutral-200 pt-8 text-center space-y-4">
        <div className="max-w-xl mx-auto space-y-2">
          <h3 className="text-base font-extrabold text-neutral-950">
            Butuh Bantuan Teknis Lebih Lanjut?
          </h3>
          <p className="text-xs text-neutral-500">
            Jika kendala spesifik Anda belum terpecahkan melalui video di atas, tim teknis FokusKonten siap memandu melalui saluran resmi berikut.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.youtube.com/@fokuskonten?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-950 text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <span>Langganan Channel @fokuskonten</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href="https://wa.me/6285183011318"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-300 text-neutral-950 text-xs font-bold rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <span>WhatsApp Bantuan Teknis</span>
          </a>
          <a
            href="/toko-digital"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-300 text-neutral-950 text-xs font-bold rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <span>Katalog Toko Digital</span>
          </a>
        </div>
      </div>
    </div>
  )
}
