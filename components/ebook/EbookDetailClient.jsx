'use client'

import { useState, useRef } from 'react'
import EbookCover3D from './EbookCover3D'
import EbookDownloadRow from './EbookDownloadRow'
import EbookTraktirModal from './EbookTraktirModal'
import EbookMobileActionBar from './EbookMobileActionBar'
import EbookReadingProgressBar from './EbookReadingProgressBar'
import EbookSneakPeekReader from './EbookSneakPeekReader'
import EbookCuriosityHook from './EbookCuriosityHook'
import EbookRelatedGrid from './EbookRelatedGrid'
import EbookBundleBanner from './EbookBundleBanner'
import EbookDmcaModal from './EbookDmcaModal'

/**
 * EbookDetailClient.jsx — Client Wrapper Halaman Artikel E-Book Lengkap
 * Mengelola state modal Traktir Kopi, modal DMCA, scroll anchor, dan audio preview.
 */
function extractSubtitle(ebook) {
  if (!ebook) return null
  if (ebook.subtitle) return ebook.subtitle
  const raw = ebook.articleTitle || ''
  let clean = raw.replace(/^E-Book\s+/i, '').replace(/\s+PDF$/i, '').trim()
  clean = clean.replace(/\(Karya:[^)]+\)/i, '').trim()
  if (clean.includes('—')) {
    const parts = clean.split('—')
    return parts[parts.length - 1].trim()
  } else if (clean.includes(' - ')) {
    const parts = clean.split(' - ')
    return parts[parts.length - 1].trim()
  }
  return null
}

export default function EbookDetailClient({ ebook, relatedItems = [], categoryName = '' }) {
  const [isTraktirOpen, setIsTraktirOpen] = useState(false)
  const [isDmcaOpen, setIsDmcaOpen] = useState(false)

  const downloadSectionRef = useRef(null)

  if (!ebook) return null

  const subtitle = extractSubtitle(ebook)

  const handleScrollToDownload = () => {
    if (downloadSectionRef.current) {
      downloadSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <>
      {/* Indikator Kemajuan Membaca di Atas Layar */}
      <EbookReadingProgressBar />

      {/* Kontainer Utama dengan Safe Bottom Padding pb-28 sm:pb-12 (Celah 31) */}
      <div className="pb-28 sm:pb-12 space-y-10">

        {/* ── GRID UTAMA: 2 KOLOM (KONTEN EDITORIAL + SIDEBAR UNDUHAN) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* KOLOM KIRI (KONTEN EDITORIAL & BACAAN) - 8 KOLOM */}
          <article className="lg:col-span-8 space-y-8">

            {/* Header Artikel E-Book */}
            <header className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-neutral-950 text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                  E-BOOK RESMI
                </span>
                <span className="px-2.5 py-0.5 rounded bg-neutral-100 text-neutral-800 text-[10px] font-mono font-semibold uppercase">
                  {ebook.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 font-sans leading-tight">
                <span>{ebook.title}</span>
                {subtitle && (
                  <span className="text-neutral-500 font-medium text-lg sm:text-2xl lg:text-3xl ml-2 font-serif">
                    — {subtitle}
                  </span>
                )}
              </h1>

              {/* Sub Judul & Identitas Penulis (Menggantikan baris redundan Halaman/Durasi yang sudah ada di Spesifikasi) */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm pt-3 border-t border-neutral-100 font-mono text-neutral-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neutral-950 shrink-0" />
                  <span>
                    Sub Judul: <strong className="text-neutral-900 font-bold font-sans">{subtitle || `Resensi Literatur ${ebook.category || 'Digital'}`}</strong>
                  </span>
                </div>
                {ebook.hasAuthor && ebook.authorDisplay && (
                  <div className="text-neutral-600">
                    Penulis: <span className="font-bold text-neutral-950 font-serif">{ebook.authorDisplay}</span>
                  </div>
                )}
              </div>

              {/* Tampilan Cover Asli pada Layar Mobile (lg:hidden) */}
              <div className="lg:hidden w-full py-4">
                <EbookCover3D
                  coverImage={ebook.coverImage}
                  title={ebook.title}
                  sku={ebook.sku}
                  category={ebook.category}
                  size="lg"
                />
              </div>

            </header>

            {/* Cuplikan Sneak Peek Reader Bab 1 & Struktur Bab */}
            <EbookSneakPeekReader
              ebook={ebook}
            />

            {/* Sinopsis & Kajian Literatur Lengkap (Format Editorial Modern & Revolusioner) */}
            <section aria-labelledby="synopsis-heading" className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-6 sm:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
              {/* Header Tinjauan Editorial */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-neutral-950 shrink-0" />
                  <h2 id="synopsis-heading" className="font-extrabold text-lg sm:text-xl text-neutral-950 font-sans tracking-tight">
                    Telaah Literatur &amp; Kajian Naskah Kritis
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 text-[11px] font-mono font-bold uppercase tracking-wider border border-neutral-200">
                    Kajian Mendalam
                  </span>
                </div>
              </div>

              {/* Konten Artikel Tipografi Proporsional & Presisi (15-16px, leading-[1.8]) */}
              <div className="space-y-6">
                {(ebook.synopsis || '').split('\n\n').map((paragraph, pIdx) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;

                  // 1. Sub-Heading Babak Artikel (### 01. ... atau ### ...)
                  if (trimmed.startsWith('### ')) {
                    const rawHeading = trimmed.replace(/^###\s*/, '');
                    const numMatch = rawHeading.match(/^(\d\d)\.\s*(.*)/);

                    return (
                      <div key={pIdx} className="pt-4 first:pt-0">
                        <h3 className="font-sans font-extrabold text-base sm:text-lg text-neutral-950 tracking-tight pb-2.5 border-b border-neutral-100 flex items-center gap-2 flex-wrap">
                          {numMatch ? (
                            <>
                              <span className="px-2 py-0.5 rounded bg-neutral-950 text-white font-mono text-xs font-bold shrink-0">
                                {numMatch[1]}
                              </span>
                              <span>{numMatch[2]}</span>
                            </>
                          ) : (
                            <span>{rawHeading}</span>
                          )}
                        </h3>
                      </div>
                    );
                  }

                  // 2. Daftar Pilar Tematik Berbullet (Format Kartu Bersih & Berbobot)
                  if (trimmed.includes('• ')) {
                    const lines = trimmed.split('\n').filter((l) => l.trim().length > 0);
                    return (
                      <div key={pIdx} className="grid grid-cols-1 gap-2.5 my-3">
                        {lines.map((line, lIdx) => {
                          const cleanLine = line.replace(/^[•\-*]\s*/, '');
                          const boldMatch = cleanLine.match(/^\*\*([^*]+)\*\*:\s*(.*)/);

                          if (boldMatch) {
                            return (
                              <div
                                key={lIdx}
                                className="p-3.5 sm:p-4 rounded-xl bg-neutral-50/80 border-l-2 border-neutral-950 hover:bg-neutral-100/70 transition-colors space-y-1"
                              >
                                <div className="font-sans font-bold text-xs sm:text-[14px] text-neutral-950 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 shrink-0" />
                                  <span>{boldMatch[1]}</span>
                                </div>
                                <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed font-sans pl-3.5">
                                  {boldMatch[2]}
                                </p>
                              </div>
                            );
                          }

                          return (
                            <div
                              key={lIdx}
                              className="p-3 rounded-lg bg-neutral-50 text-neutral-700 text-xs sm:text-sm font-sans flex items-start gap-2 border border-neutral-100"
                            >
                              <span className="text-neutral-950 font-bold">•</span>
                              <span className="leading-relaxed">{cleanLine}</span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }

                  // 3. Paragraf Standar — Tipografi Inter Nyaman Dibaca (Anti-Kekecilan, Anti-Kebesaran)
                  return (
                    <p
                      key={pIdx}
                      className="text-[15px] sm:text-base text-neutral-700 font-sans leading-[1.8] tracking-normal whitespace-pre-line"
                    >
                      {trimmed}
                    </p>
                  );
                })}
              </div>

              {/* Footer Validasi Redaksional */}
              <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-500">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Kajian Disusun Mandiri Berbasis Fair Use</span>
                </span>
                <span className="px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 font-bold border border-neutral-200">
                  DIREKTORI RESMI FOKUSKONTEN
                </span>
              </div>
            </section>

            {/* ── KONTEN 2/3: KARTU PENASARAN NASKAH LENGKAP (CURIOSITY GAP) ── */}
            <EbookCuriosityHook
              curiosityHook={ebook.curiosityHook}
            />

            {/* Area Unduhan Anchor Ref (Untuk Navigasi Mobile & Desktop) */}
            <div ref={downloadSectionRef} className="pt-2">
              <EbookDownloadRow
                ebook={ebook}
                onOpenTraktir={() => setIsTraktirOpen(true)}
              />
            </div>

            {/* Rekomendasi Terkait di Kategori yang Sama */}
            <EbookRelatedGrid
              items={relatedItems}
              categoryName={categoryName || ebook.category}
              categorySlug={ebook.categorySlug}
            />

            {/* Mega Bundle Promo Banner */}
            <EbookBundleBanner />

            {/* Kotak Fair Use & Tombol Takedown Hak Cipta Cepat (Celah 4) */}
            <div className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-5 sm:p-6 text-xs text-neutral-600 leading-relaxed space-y-2 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-extrabold text-neutral-950 font-mono text-[11px] uppercase tracking-wider">
                  Disclaimer Hak Cipta &amp; DMCA Fair Use
                </span>
                <button
                  type="button"
                  onClick={() => setIsDmcaOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-mono font-bold text-[11px] uppercase tracking-wider transition-colors border border-neutral-300"
                >
                  Formulir Takedown 1x24 Jam
                </button>
              </div>
              <p>
                Sinopsis dan intisari disusun untuk tujuan apresiasi edukasi (Fair Use). Tautan unduhan merujuk pada arsip repositori digital. Jika Anda adalah pemegang hak cipta sah dan berkeberatan, naskah akan dinonaktifkan dalam 1x24 jam kerja.
              </p>
            </div>
          </article>

          {/* KOLOM KANAN (SIDEBAR COVER 3D & AKSI UNDUHAN DESKTOP) - 4 KOLOM */}
          <aside aria-label="Sidebar Unduhan & Berkas" className="hidden lg:block lg:col-span-4 space-y-6 sticky top-8">

            {/* 3D Showcase Sampul E-Book */}
            <div className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col items-center text-center">
              <EbookCover3D
                coverImage={ebook.coverImage}
                title={ebook.title}
                sku={ebook.sku}
                category={ebook.category}
                size="full"
              />
            </div>

            {/* Kartu Spesifikasi Dokumen */}
            <div className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-3">
              <h3 className="font-extrabold text-xs text-neutral-950 font-mono uppercase tracking-wider pb-2 border-b border-neutral-100">
                Spesifikasi Dokumen Digital
              </h3>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Kode SKU</span>
                  <span className="font-bold text-neutral-950">{ebook.sku}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Format Master</span>
                  <span className="font-bold text-neutral-950">PDF Searchable Text</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Ukuran File</span>
                  <span className="font-bold text-neutral-950">{ebook.sizeMb || '1.0 MB'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Jumlah Halaman</span>
                  <span className="font-bold text-neutral-950">{ebook.pages || 'Lengkap'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Estimasi Baca</span>
                  <span className="font-bold text-neutral-950">{ebook.duration || '~1-2 Jam'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-500">Kesesuaian Layar</span>
                  <span className="font-bold text-neutral-950">HP, Tablet, PC</span>
                </div>
              </div>
            </div>

            {/* Status Akses Literatur Digital (Monokrom Baku STANDAR_UI_WEB_OFFICIAL.md) */}
            <div className="bg-white text-neutral-900 border border-neutral-200 dark:bg-white dark:text-neutral-900 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-950" />
                <span className="font-extrabold text-xs text-neutral-950 font-mono uppercase tracking-wider">
                  Status Repositori Publik
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Dokumen e-book ini tersedia terbuka untuk tujuan studi, riset, dan apresiasi literatur edukatif. Seluruh tombol aksi unduhan dan opsi apresiasi naskah terpusat pada area baca di sebelah kiri.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Floating Action Bar untuk Layar Ponsel (sm:hidden) */}
      <EbookMobileActionBar
        ebook={ebook}
        onOpenTraktir={() => setIsTraktirOpen(true)}
        onScrollToDownload={handleScrollToDownload}
      />

      {/* Modal Traktir Kopi QRIS Midtrans (Celah 7, 19, 21, 22, 41, 42) */}
      <EbookTraktirModal
        isOpen={isTraktirOpen}
        onClose={() => setIsTraktirOpen(false)}
        ebook={ebook}
      />

      {/* Modal Permohonan Takedown DMCA 1x24 Jam (Celah 4) */}
      <EbookDmcaModal
        isOpen={isDmcaOpen}
        onClose={() => setIsDmcaOpen(false)}
        ebook={ebook}
      />
    </>
  )
}
