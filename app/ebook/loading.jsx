/**
 * app/ebook/loading.jsx — Skeleton Anti-CLS Loader untuk Halaman Direktori E-Book
 */
export default function EbookLoading() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-neutral-900 dark:bg-[#f8fafc] dark:text-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 space-y-8 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 bg-neutral-200 rounded" />

        {/* Header Skeleton */}
        <div className="space-y-3">
          <div className="h-6 w-32 bg-neutral-200 rounded" />
          <div className="h-10 w-96 max-w-full bg-neutral-200 rounded-lg" />
          <div className="h-4 w-72 bg-neutral-200 rounded" />
        </div>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-white border border-neutral-200 rounded-2xl" />
            <div className="h-96 bg-white border border-neutral-200 rounded-2xl" />
          </div>
          <div className="space-y-6">
            <div className="h-80 bg-white border border-neutral-200 rounded-2xl" />
            <div className="h-48 bg-neutral-900 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
