export default function PaymentSecurityBadge() {
  return (
    <div className="p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/60 text-center space-y-2">
      <div className="flex items-center justify-center gap-2 text-xs font-bold text-neutral-800">
        <span>🔒</span>
        <span>Pembayaran Aman &amp; Terverifikasi Otomatis</span>
      </div>
      <p className="text-[11px] text-neutral-500 leading-relaxed max-w-sm mx-auto">
        Akses file langsung aktif dan link unduhan otomatis dikirim ke email setelah pembayaran berhasil.
      </p>
      <div className="flex items-center justify-center gap-3 pt-1 text-[10px] font-mono text-neutral-400 uppercase font-semibold">
        <span>QRIS</span>
        <span>•</span>
        <span>Transfer Bank</span>
        <span>•</span>
        <span>E-Wallet</span>
      </div>
    </div>
  )
}
