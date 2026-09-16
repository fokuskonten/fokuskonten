/**
 * loading.jsx — Skeleton Loading Hub Merek Smartphone
 * Mematuhi STANDAR_UI_WEB_OFFICIAL.md: Skeleton monokrom bershadow
 */
export default function SmartphoneHubLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero Skeleton */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-4">
        <div className="h-4 bg-neutral-200 rounded w-48"></div>
        <div className="h-8 bg-neutral-200 rounded w-3/4"></div>
        <div className="h-4 bg-neutral-100 rounded w-1/2"></div>
        <div className="h-12 bg-neutral-100 rounded-xl w-full max-w-2xl mt-4"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="h-6 bg-neutral-200 rounded w-48"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
            {[...Array(12)].map((_, idx) => (
              <div key={idx} className="h-20 bg-neutral-100 rounded-xl"></div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="h-48 bg-white border border-neutral-200 rounded-2xl"></div>
          <div className="h-64 bg-neutral-900 rounded-2xl"></div>
        </div>
      </div>
    </div>
  )
}
