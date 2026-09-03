export default function ProductStudioCard({ generateWhatsAppLink }) {
  const waUrl = typeof generateWhatsAppLink === 'function' ? generateWhatsAppLink() : 'https://wa.me/6285183011318'

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center justify-between text-xs">
      <div className="flex items-center gap-3">
        <img
          src="/logo.webp"
          alt="FokusKonten Logo"
          className="w-10 h-10 object-contain drop-shadow-sm flex-shrink-0"
        />
        <div>
          <span className="font-bold text-neutral-900 block">FokusKonten Studio</span>
          <span className="text-neutral-500">Kabupaten Bekasi • Kreator Resmi</span>
        </div>
      </div>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold transition-colors shadow-sm"
      >
        Chat CS
      </a>
    </div>
  )
}
