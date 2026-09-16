'use client'

export default function LaptopDetailError({ error, reset }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center space-y-4 max-w-lg mx-auto my-12 shadow-md">
      <span className="px-3 py-1 bg-neutral-950 text-white font-mono text-xs font-bold rounded uppercase">
        SISTEM KENDALA
      </span>
      <h2 className="text-xl font-extrabold text-neutral-950">Gagal Memuat Skema Laptop</h2>
      <p className="text-xs text-neutral-500 font-mono">{error?.message || 'Terjadi kendala koneksi.'}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 bg-neutral-950 text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors font-mono uppercase"
      >
        Coba Lagi
      </button>
    </div>
  )
}
