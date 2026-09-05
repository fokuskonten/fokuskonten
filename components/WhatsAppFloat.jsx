'use client'

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/6285183011318"
      target="_blank"
      rel="noopener noreferrer"
      className="print:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-neutral-950 shadow-lg shadow-black/35 hover:shadow-2xl hover:shadow-black/50 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 animate-bounce-in group border border-neutral-800"
      aria-label="Customer Service Robot"
      title="Chat Customer Service (Bantuan Cepat)"
    >
      {/* Online Status Beacon */}
      <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-neutral-950" />
      </span>

      {/* Modern Robot CS Icon */}
      <svg
        className="w-7 h-7 text-white transition-transform duration-200 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="10" rx="4" fill="currentColor" fillOpacity="0.15" />
        <circle cx="8.5" cy="15.5" r="1.5" fill="currentColor" />
        <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" />
        <path d="M9.5 18.5c.8.5 1.7.7 2.5.7s1.7-.2 2.5-.7" />
        <line x1="12" y1="2" x2="12" y2="7" />
        <circle cx="12" cy="2" r="1" fill="currentColor" />
        <line x1="1" y1="16" x2="3" y2="16" />
        <line x1="21" y1="16" x2="23" y2="16" />
      </svg>
    </a>
  )
}
