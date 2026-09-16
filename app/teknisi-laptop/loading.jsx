export default function LaptopHubLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="bg-white border border-neutral-200 rounded-2xl p-8 space-y-3">
        <div className="h-4 bg-neutral-200 rounded w-48"></div>
        <div className="h-8 bg-neutral-200 rounded w-2/3"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-6 grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-neutral-100 rounded-xl"></div>
          ))}
        </div>
        <div className="lg:col-span-4 h-64 bg-neutral-900 rounded-2xl"></div>
      </div>
    </div>
  )
}
