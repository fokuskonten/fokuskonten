export default function BrandModelsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="h-4 bg-neutral-200 rounded w-32"></div>
        <div className="h-8 bg-neutral-200 rounded w-1/2"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-6 grid grid-cols-2 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-28 bg-neutral-100 rounded-xl"></div>
          ))}
        </div>
        <div className="lg:col-span-4 h-64 bg-neutral-900 rounded-2xl"></div>
      </div>
    </div>
  )
}
