'use client'

export default function DriveAccessButton({ order, driveLink: propDriveLink, sku: propSku, title: propTitle, onSimulatePayment, isSimulating }) {
  const currentOrder = order || {}
  const status = (currentOrder.status || 'pending').toLowerCase()
  const isSettled = (
    status === 'settlement' || 
    status === 'lunas' || 
    status === 'success'
  )
  
  const driveLink = currentOrder.driveLink || propDriveLink
  const sku = currentOrder.sku || propSku || 'MASTER'
  const title = currentOrder.title || propTitle || 'Master Desain'
  const items = (Array.isArray(currentOrder.items) && currentOrder.items.length > 0) ? currentOrder.items : []
  const hasMultipleItems = items.length > 1

  // 1. Tampilan jika pesanan masih PENDING (Belum Lunas)
  if (!isSettled) {
    return (
      <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-[0_10px_35px_rgba(0,0,0,0.2)] text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-amber-400 shadow-inner">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2 font-mono uppercase tracking-wider">
            Status: Menunggu Pembayaran
          </span>
          <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
            Selesaikan Pembayaran Anda
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mt-1 leading-relaxed font-sans">
            Akses Google Drive dan hak unduhan lisensi komersial otomatis terbuka begitu transaksi terverifikasi sistem.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto">
          {onSimulatePayment && (
            <button
              onClick={onSimulatePayment}
              disabled={isSimulating}
              type="button"
              className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-neutral-200 active:scale-[0.99] text-neutral-950 font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSimulating ? (
                <span>Memverifikasi Pembayaran...</span>
              ) : (
                <>
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Simulasi Bayar Sekarang (Uji Coba Lunas)</span>
                </>
              )}
            </button>
          )}

          <a
            href={`https://wa.me/6285183011318?text=Halo%20Admin%20FokusKonten%2C%20saya%20sedang%20menyelesaikan%20pembayaran%20Order%20${currentOrder.orderId || sku}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold text-xs sm:text-sm border border-neutral-800 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.531 1.77.818 2.796.818 3.179 0 5.765-2.587 5.765-5.766.001-3.181-2.585-5.804-5.765-5.804zm3.394 8.204c-.144.405-.837.774-1.17.824-.312.045-.634.073-1.849-.434-.849-.354-1.469-.942-1.921-1.458-.236-.269-.731-.975-.731-1.859 0-.883.462-1.319.626-1.498.165-.179.359-.224.479-.224.12 0 .24.001.344.006.11.005.257-.042.403.308.15.358.51 1.246.555 1.337.045.09.075.195.015.314-.06.12-.09.195-.18.299-.089.105-.188.234-.269.314-.09.09-.184.187-.079.367.105.18.468.772.999 1.246.685.611 1.264.8 1.444.89.18.09.284.075.389-.045.105-.12.449-.523.569-.703.12-.179.24-.149.404-.09.165.06 1.048.494 1.228.584.18.09.3.135.344.21.045.075.045.434-.099.839z"/>
            </svg>
            <span>Bantuan Konfirmasi CS</span>
          </a>
        </div>

        <div className="pt-4 border-t border-neutral-900 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left text-xs text-neutral-400">
          <div className="flex items-start gap-2 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/60">
            <span className="font-bold text-white">1.</span>
            <span>Scan QRIS atau bayar via Virtual Account Midtrans.</span>
          </div>
          <div className="flex items-start gap-2 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/60">
            <span className="font-bold text-white">2.</span>
            <span>Sistem mendeteksi pelunasan otomatis secara real-time.</span>
          </div>
          <div className="flex items-start gap-2 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/60">
            <span className="font-bold text-white">3.</span>
            <span>Tautan Google Drive langsung terbuka di halaman ini.</span>
          </div>
        </div>
      </div>
    )
  }

  // 2. Tampilan jika pesanan sudah SETTLEMENT / LUNAS
  const hasMainLink = driveLink && driveLink !== '#'

  return (
    <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-[0_10px_35px_rgba(0,0,0,0.2)] text-center space-y-6">
      <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-emerald-400 shadow-inner">
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </div>

      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2 font-mono uppercase tracking-wider">
          ✓ Pembayaran Terverifikasi (Lunas)
        </span>
        <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
          {hasMultipleItems ? 'Akses File Bundle Siap Diunduh' : 'File Siap Diunduh'}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mt-1 leading-relaxed font-sans">
          {hasMultipleItems
            ? `${items.length} file master desain telah terbuka secara penuh. Unduh file master melalui tombol di bawah:`
            : 'File master asli tersimpan aman di Google Drive dengan akses unduhan langsung 24 jam.'}
        </p>
      </div>

      {/* Multi-item Bundle Download Cards */}
      {hasMultipleItems ? (
        <div className="space-y-3 max-w-xl mx-auto text-left">
          {items.map((it, idx) => {
            const itemDrive = it.driveLink || it.deliveryLink || driveLink || '#'
            const hasItemLink = itemDrive && itemDrive !== '#'
            return (
              <div
                key={it.sku || idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 shrink-0 overflow-hidden flex items-center justify-center border border-neutral-700 font-mono text-[11px] font-bold text-neutral-300">
                    {it.format || 'CDR'}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                      {it.title || `Master Desain ${it.sku}`}
                    </h4>
                    <span className="text-[11px] font-mono text-neutral-400">
                      SKU: {it.sku}
                    </span>
                  </div>
                </div>

                {hasItemLink ? (
                  <a
                    href={itemDrive}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs shrink-0 transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
                    </svg>
                    <span>Buka Drive</span>
                  </a>
                ) : (
                  <span className="text-xs text-neutral-500 italic shrink-0">Menyiapkan link...</span>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        /* Single Item Download CTA */
        hasMainLink ? (
          <a
            href={driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full max-w-md py-4 px-6 rounded-2xl bg-white hover:bg-neutral-100 active:scale-[0.99] text-black font-display font-black text-base shadow-xl transition-all cursor-pointer mx-auto"
          >
            <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
            </svg>
            <span>Buka Google Drive</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        ) : (
          <a
            href={`https://wa.me/6285183011318?text=Halo%20Admin%20FokusKonten%2C%20saya%20sudah%20membayar%20Order%20${currentOrder.orderId || sku}%20mohon%20kirimkan%20link%20Google%20Drive`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 w-full max-w-md py-3.5 px-6 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white font-display font-bold text-sm border border-neutral-700 shadow-md transition-all mx-auto"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.531 1.77.818 2.796.818 3.179 0 5.765-2.587 5.765-5.766.001-3.181-2.585-5.804-5.765-5.804zm3.394 8.204c-.144.405-.837.774-1.17.824-.312.045-.634.073-1.849-.434-.849-.354-1.469-.942-1.921-1.458-.236-.269-.731-.975-.731-1.859 0-.883.462-1.319.626-1.498.165-.179.359-.224.479-.224.12 0 .24.001.344.006.11.005.257-.042.403.308.15.358.51 1.246.555 1.337.045.09.075.195.015.314-.06.12-.09.195-.18.299-.089.105-.188.234-.269.314-.09.09-.184.187-.079.367.105.18.468.772.999 1.246.685.611 1.264.8 1.444.89.18.09.284.075.389-.045.105-.12.449-.523.569-.703.12-.179.24-.149.404-.09.165.06 1.048.494 1.228.584.18.09.3.135.344.21.045.075.045.434-.099.839z"/>
            </svg>
            <span>Hubungi Bantuan CS</span>
          </a>
        )
      )}

      {/* Guide Steps */}
      <div className="pt-4 border-t border-neutral-900 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left text-xs text-neutral-400">
        <div className="flex items-start gap-2 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/60">
          <span className="font-bold text-white">1.</span>
          <span>Klik tombol buka Google Drive untuk mengunduh master asli.</span>
        </div>
        <div className="flex items-start gap-2 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/60">
          <span className="font-bold text-white">2.</span>
          <span>Pilih opsi &quot;Download&quot; untuk menyimpan ke komputer Anda.</span>
        </div>
        <div className="flex items-start gap-2 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/60">
          <span className="font-bold text-white">3.</span>
          <span>Akses tersimpan permanen di menu &quot;Akun Saya&quot; perangkat ini.</span>
        </div>
      </div>
    </div>
  )
}
