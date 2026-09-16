export default function ErrorLookupLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
      <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-8 space-y-4">
        <div className="h-6 bg-neutral-200 rounded w-64"></div>
        <div className="h-12 bg-neutral-100 rounded-xl w-full"></div>
        <div className="h-32 bg-neutral-50 rounded-xl"></div>
      </div>
      <div className="lg:col-span-4 h-64 bg-neutral-900 rounded-2xl"></div>
    </div>
  )
}
