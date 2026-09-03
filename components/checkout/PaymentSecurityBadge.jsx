export default function PaymentSecurityBadge() {
  return (
    <div className="p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/60 text-center space-y-2">
      <div className="flex items-center justify-center gap-2 text-xs font-bold text-neutral-800">
        <span>🔒</span>
        <span>Pembayaran Otomatis Aman (QRIS / VA Bank / E-Wallet)</span>
      </div>
      <p className="text-[11px] text-neutral-500 leading-relaxed max-w-sm mx-auto">
        Tautan Google Drive resmi langsung terbuka seketika setelah pembayaran terverifikasi lunas dan dikirimkan ke Gmail Anda.
      </p>
      <div className="flex items-center justify-center gap-3 pt-1 text-[10px] font-mono text-neutral-400 uppercase font-semibold">
        <span>QRIS</span>
        <span>•</span>
        <span>BCA / MANDIRI / BRI</span>
        <span>•</span>
        <span>GOPAY / SHOPEEPAY</span>
      </div>
    </div>
  )
}
