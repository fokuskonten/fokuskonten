/**
 * loading.jsx — Skeleton Loading State Anti-CLS (Cumulative Layout Shift = 0)
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md: Palet monokrom murni (bg-neutral-950, bg-white, border-neutral-200)
 */
export default function LaptopDetailLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* 1. Skeleton Header & Breadcrumb */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
        <div className="h-3.5 bg-neutral-200 rounded w-48 font-mono"></div>
        <div className="space-y-2">
          <div className="h-4 bg-neutral-200 rounded w-32"></div>
          <div className="h-8 bg-neutral-200 rounded w-4/5"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Kolom Kiri 8 Col */}
        <div className="lg:col-span-8 space-y-8">
          {/* 2. Skeleton Grid Spesifikasi 2x2 Datar */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="h-5 bg-neutral-200 rounded w-40 pb-2"></div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="h-10 bg-neutral-100 rounded-xl"></div>
              <div className="h-10 bg-neutral-100 rounded-xl"></div>
              <div className="h-10 bg-neutral-100 rounded-xl"></div>
              <div className="h-10 bg-neutral-100 rounded-xl"></div>
            </div>
          </div>

          {/* 3. Skeleton Skema Gambar */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-3">
            <div className="h-5 bg-neutral-200 rounded w-48"></div>
            <div className="h-64 bg-neutral-100 rounded-xl"></div>
          </div>

          {/* 4. Skeleton Daftar Berkas (2 Tombol) */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="h-5 bg-neutral-200 rounded w-48"></div>
            <div className="space-y-3 pt-2">
              <div className="h-14 bg-neutral-100 rounded-xl"></div>
              <div className="h-14 bg-neutral-100 rounded-xl"></div>
            </div>
          </div>

          {/* 5. Skeleton Banner Bundle */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 h-48"></div>
        </div>

        {/* Kolom Kanan 4 Col: Sidebar Otoritas Hitam Pekat */}
        <div className="lg:col-span-4 space-y-6">
          <div className="h-64 bg-neutral-950 rounded-2xl p-6 border border-neutral-800">
            <div className="h-4 bg-neutral-800 rounded w-24 mb-4"></div>
            <div className="h-6 bg-neutral-800 rounded w-48 mb-2"></div>
            <div className="h-16 bg-neutral-900 rounded w-full mb-4"></div>
            <div className="h-10 bg-white rounded-xl w-full"></div>
          </div>
          <div className="h-40 bg-white border border-neutral-200 rounded-2xl"></div>
        </div>
      </div>
    </div>
  )
}
