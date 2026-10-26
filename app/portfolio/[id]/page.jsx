import Link from 'next/link'
import { notFound } from 'next/navigation'
import portfolioData from '@/content/portfolio/portfolio.json'
import Breadcrumb from '@/components/Breadcrumb'

export async function generateStaticParams() {
  return portfolioData.map((item) => ({ id: item.id }))
}

export async function generateMetadata({ params }) {
  const item = portfolioData.find((p) => p.id === params.id)
  if (!item) return {}
  return {
    title: `${item.title} — Portofolio FokusKonten`,
    description: item.tagline || item.description,
    alternates: { canonical: `https://fokuskonten.my.id/portfolio/${item.id}` },
  }
}

export default function PortfolioDetailPage({ params }) {
  const item = portfolioData.find((p) => p.id === params.id)
  if (!item) notFound()

  // Proyek terkait dari kategori yang sama atau proyek lain
  const relatedProjects = portfolioData
    .filter((p) => p.id !== item.id)
    .slice(0, 3)

  return (
    <section className="pt-28 sm:pt-32 pb-20 bg-white">
      <div className="container-page max-w-6xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Portfolio', href: '/portfolio' },
            { label: item.title },
          ]}
        />

        {/* ── HEADER PROYEK ──────────────────────────────────── */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
            <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 font-mono font-semibold text-xs uppercase tracking-wider border border-neutral-200/80">
              {item.category}
            </span>
            <span className="px-3 py-0.5 rounded-full bg-neutral-950 text-white font-mono font-semibold text-xs uppercase tracking-wider">
              {item.status}
            </span>
            <span className="text-neutral-400 font-mono text-xs">
              Tahun {item.year}
            </span>
          </div>

          <h1 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-950 mb-3 tracking-tight">
            {item.title}
          </h1>

          <p className="text-neutral-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            {item.tagline || item.description}
          </p>
        </header>

        {/* ── GRID UTAMA: 2 KOLOM KONTEN + 1 KOLOM SIDEBAR ────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* ── KOLOM KIRI (KONTEN LENGKAP & CASE STUDY) ───────── */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Visual Showcase Banner */}
            <div className="relative w-full aspect-[16/9] rounded-3xl bg-neutral-950 text-white overflow-hidden p-6 sm:p-10 flex flex-col justify-between border border-neutral-800 shadow-xl">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/10 text-neutral-300 font-mono text-xs tracking-wider uppercase border border-white/15">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  FokusKonten Engineering
                </span>
              </div>

              <div className="relative z-10 my-auto py-6">
                <span className="font-mono text-xs text-neutral-400 block mb-2">
                  Studi Kasus &amp; Rekayasa
                </span>
                <h2 className="heading-xl text-2xl sm:text-3xl lg:text-4xl text-white mb-2">
                  {item.title}
                </h2>
                <p className="text-neutral-300 text-xs sm:text-sm max-w-xl line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>Rilis: {item.year}</span>
                <span className="text-neutral-200">Karya Resmi Terverifikasi</span>
              </div>
            </div>

            {/* 2. Ikhtisar & Latar Belakang Proyek */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-6">
              <div>
                <h2 className="font-display font-bold text-lg sm:text-xl text-neutral-950 mb-3">
                  Ikhtisar &amp; Ringkasan Proyek
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  {item.overview || item.description}
                </p>
              </div>

              {item.challenge && (
                <div className="pt-6 border-t border-neutral-100">
                  <h3 className="font-mono text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                    Tantangan &amp; Kebutuhan Masalah
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                    {item.challenge}
                  </p>
                </div>
              )}

              {item.solution && (
                <div className="pt-6 border-t border-neutral-100">
                  <h3 className="font-mono text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                    Pendekatan Solusi FokusKonten
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              )}
            </div>

            {/* 3. Fitur Utama & Arsitektur Sistem */}
            {item.features && item.features.length > 0 && (
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
                <div className="mb-6">
                  <span className="label-brand mb-2 inline-block">Fitur &amp; Kemampuan</span>
                  <h2 className="font-display font-bold text-lg sm:text-xl text-neutral-950">
                    Spesifikasi Rekayasa Fitur
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.features.map((f, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 hover:bg-white hover:border-neutral-300 hover:shadow-sm transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-200/80 text-neutral-800 mb-2.5 inline-block">
                          0{i + 1}
                        </span>
                        <h3 className="font-display font-bold text-sm sm:text-base text-neutral-900 mb-1.5">
                          {f.title}
                        </h3>
                        <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Hasil & Metrik Pencapaian */}
            {item.results && item.results.length > 0 && (
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
                <h2 className="font-display font-bold text-lg sm:text-xl text-neutral-950 mb-4">
                  Hasil &amp; Metrik Pencapaian Nyata
                </h2>
                <div className="space-y-3">
                  {item.results.map((r, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-neutral-950 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <p className="text-neutral-700 text-sm leading-relaxed">
                        {r}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── KOLOM KANAN (SIDEBAR METADATA & CTA) ───────────── */}
          <div className="space-y-6">
            {/* Sidebar Card 1: Spesifikasi & Metadata Proyek */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
              <h3 className="font-display font-bold text-sm text-neutral-950 uppercase tracking-wider mb-4 pb-3 border-b border-neutral-100">
                Detail Spesifikasi
              </h3>

              <dl className="space-y-3.5 text-xs font-mono divide-y divide-neutral-100">
                <div className="flex justify-between items-center pt-2">
                  <dt className="text-neutral-400">Kategori</dt>
                  <dd className="font-semibold text-neutral-900">{item.category}</dd>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <dt className="text-neutral-400">Status</dt>
                  <dd>
                    <span className="px-2 py-0.5 rounded bg-neutral-950 text-white font-semibold">
                      {item.status}
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <dt className="text-neutral-400">Tahun Produksi</dt>
                  <dd className="font-semibold text-neutral-900">{item.year}</dd>
                </div>

                {item.targetUsers && (
                  <div className="pt-2">
                    <dt className="text-neutral-400 mb-1">Target Pengguna</dt>
                    <dd className="font-sans text-neutral-700 font-medium leading-relaxed">
                      {item.targetUsers}
                    </dd>
                  </div>
                )}

                {item.specs &&
                  Object.entries(item.specs).map(([key, val]) => (
                    <div key={key} className="pt-2">
                      <dt className="text-neutral-400 mb-0.5">{key}</dt>
                      <dd className="font-sans text-neutral-800 font-medium">
                        {val}
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>

            {/* Sidebar Card 2: Teknologi & Tools */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
              <h3 className="font-display font-bold text-sm text-neutral-950 uppercase tracking-wider mb-3">
                Teknologi &amp; Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-mono font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar Card 3: Konsultasi Cepat WhatsApp */}
            <div className="p-6 rounded-2xl bg-neutral-950 text-white border border-neutral-800 shadow-xl">
              <span className="inline-block px-2.5 py-0.5 rounded bg-white text-neutral-950 text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
                Konsultasi WhatsApp
              </span>
              <h3 className="font-display font-bold text-base text-white mb-2">
                Punya Proyek Serupa?
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed mb-5">
                Diskusikan alur logika, kebutuhan integrasi, dan estimasi waktu langsung bersama software engineer FokusKonten.
              </p>
              <a
                href={`https://wa.me/6285183011318?text=${encodeURIComponent(`Halo FokusKonten,\n\nSaya melihat portofolio proyek *${item.title}* (${item.category}) di fokuskonten.my.id.\nSaya tertarik untuk berdiskusi mengenai pembuatan solusi serupa untuk kebutuhan bisnis saya.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-white text-neutral-950 hover:bg-neutral-100 font-display font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span>Konsultasi Sekarang</span>
              </a>
            </div>

            {/* Sidebar Card 4: Karya Terkait Lainnya */}
            {relatedProjects.length > 0 && (
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
                <h3 className="font-display font-bold text-sm text-neutral-950 uppercase tracking-wider mb-4 pb-3 border-b border-neutral-100">
                  Karya Lainnya
                </h3>
                <div className="space-y-4">
                  {relatedProjects.map((p) => (
                    <Link
                      key={p.id}
                      href={'/portfolio/' + p.id}
                      className="block group"
                    >
                      <span className="text-[10px] font-mono font-semibold text-neutral-400 uppercase tracking-wider block mb-0.5">
                        {p.category}
                      </span>
                      <h4 className="font-display font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-neutral-600 transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-neutral-400 text-[11px] font-mono mt-0.5">
                        Tahun {p.year}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── GRAND FULL-WIDTH CTA CONTAINER (BAB 17.3 POIN 5) ── */}
        <div className="rounded-3xl bg-neutral-950 p-8 sm:p-14 text-center text-white w-full shadow-2xl border border-neutral-800">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-display font-semibold bg-white text-neutral-950 shadow-sm mb-4">
            Konsultasi Rekayasa
          </span>
          <h3 className="heading-xl text-2xl sm:text-4xl mb-3 text-balance">
            Siap Mengembangkan Solusi Serupa untuk Bisnis Anda?
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Konsultasikan ide aplikasi, kebutuhan sistem kasir POS, atau lisensi aset digital kustom langsung bersama software engineer FokusKonten.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/6285183011318?text=${encodeURIComponent(`Halo FokusKonten,\n\nSaya tertarik dengan proyek *${item.title}* dan ingin berdiskusi mengenai pembuatan solusi kustom serupa.\nMohon info proses dan estimasinya.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-display font-semibold text-xs sm:text-sm bg-white text-neutral-950 hover:bg-neutral-100 transition-all shadow-lg"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>Konsultasi WhatsApp Sekarang</span>
            </a>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-display font-semibold text-xs sm:text-sm bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800 transition-all"
            >
              <span>Jelajahi Portofolio Lainnya</span>
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-neutral-600 hover:text-neutral-950 transition-colors"
          >
            <span aria-hidden="true">&larr;</span>
            <span>Kembali ke Seluruh Portofolio</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
