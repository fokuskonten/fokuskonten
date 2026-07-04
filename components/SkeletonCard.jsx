export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-card overflow-hidden animate-pulse">
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-neutral-200 shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-neutral-200 rounded-lg w-3/4" />
            <div className="h-3 bg-neutral-200 rounded-full w-1/4" />
            <div className="h-3 bg-neutral-100 rounded-lg w-full" />
            <div className="h-3 bg-neutral-100 rounded-lg w-2/3" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-between">
          <div className="h-3 bg-neutral-200 rounded w-12" />
          <div className="h-3 bg-neutral-200 rounded w-16" />
        </div>
      </div>
    </div>
  )
}
