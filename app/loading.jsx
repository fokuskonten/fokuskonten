export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-canvas-100 flex flex-col items-center justify-center">
      <div className="relative flex flex-col items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-maroon-700 flex items-center justify-center shadow-lg animate-pulse">
          <span className="font-display font-bold text-xl text-white">FK</span>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-maroon-700/40"
              style={{
                animation: `loadingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes loadingBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
