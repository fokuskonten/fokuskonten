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
  const items = (Array.isArray(currentOrder.items) && currentOrder.items.length > 0) ? currentOrder.items : []
  const hasMultipleItems = items.length > 1

  // 1. PENDING
  if (!isSettled) {
    return (
      <div className="no-print bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm text-center space-y-6">
        {/* Icon */}
        <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto text-neutral-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <div>
          <span className="inline-block px-3 py-1 rounded-md text-[10px] font-bold bg-neutral-100 text-neutral-600 mb-3 font-mono uppercase tracking-wider">
            Menunggu Pembayaran
          </span>
          <h3 className="font-bold text-xl sm:text-2xl text-neutral-950 tracking-tight">
            Selesaikan Pembayaran Anda
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mt-2 leading-relaxed">
            Akses Google Drive dan tautan unduhan file master otomatis terbuka begitu transaksi terverifikasi sistem.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto">
          {onSimulatePayment && (
            <button
              onClick={onSimulatePayment}
              disabled={isSimulating}
              type="button"
              className="w-full py-3 px-5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-40"
            >
              {isSimulating ? 'Memverifikasi...' : 'Simulasi Bayar (Uji Coba)'}
            </button>
          )}

          <a
            href={`https://wa.me/6285183011318?text=Halo%20Admin%20FokusKonten%2C%20saya%20sedang%20menyelesaikan%20pembayaran%20Order%20${currentOrder.orderId || sku}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs sm:text-sm border border-neutral-200 transition-colors flex items-center justify-center"
          >
            Bantuan Konfirmasi CS
          </a>
        </div>

        <div className="pt-4 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left text-xs text-neutral-600">
          {[
            'Scan QRIS atau bayar via Virtual Account Midtrans.',
            'Sistem mendeteksi pelunasan otomatis secara real-time.',
            'Tautan Google Drive langsung terbuka di halaman ini.'
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
              <span className="w-5 h-5 rounded-full bg-white border border-neutral-200 flex items-center justify-center font-bold text-neutral-900 shrink-0 text-[11px]">{i + 1}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 2. LUNAS / SETTLEMENT
  const hasMainLink = driveLink && driveLink !== '#'

  return (
    <div className="no-print bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm text-center space-y-6">
      {/* Icon */}
      <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto text-neutral-700">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </div>

      <div>
        <span className="inline-block px-3 py-1 rounded-md text-[10px] font-bold bg-neutral-950 text-white mb-3 font-mono uppercase tracking-wider">
          Pembayaran Terverifikasi
        </span>
        <h3 className="font-bold text-xl sm:text-2xl text-neutral-950 tracking-tight">
          {hasMultipleItems ? 'Akses File Bundle Siap Diunduh' : 'File Siap Diunduh'}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mt-2 leading-relaxed">
          {hasMultipleItems
            ? `${items.length} file master desain telah terbuka. Unduh melalui tombol di bawah:`
            : 'File master tersimpan aman di Google Drive dengan akses unduhan penuh.'}
        </p>
      </div>

      {/* Multi-item */}
      {hasMultipleItems ? (
        <div className="space-y-2.5 max-w-xl mx-auto text-left">
          {items.map((it, idx) => {
            const itemDrive = it.driveLink || it.deliveryLink || driveLink || '#'
            const hasItemLink = itemDrive && itemDrive !== '#'
            return (
              <div
                key={it.sku || idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white shrink-0 border border-neutral-200 font-mono text-[11px] font-bold text-neutral-700 flex items-center justify-center">
                    {it.format || 'CDR'}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-950 truncate">{it.title || `Master Desain ${it.sku}`}</h4>
                    <span className="text-[10px] font-mono text-neutral-400">SKU: {it.sku}</span>
                  </div>
                </div>
                {hasItemLink ? (
                  <a
                    href={itemDrive}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-xs shrink-0 transition-colors"
                  >
                    Buka Drive &rarr;
                  </a>
                ) : (
                  <span className="text-xs text-neutral-400 shrink-0">Menyiapkan link...</span>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        hasMainLink ? (
          <a
            href={driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full max-w-md py-3.5 px-6 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm transition-colors mx-auto"
          >
            Buka Google Drive &rarr;
          </a>
        ) : (
          <a
            href={`https://wa.me/6285183011318?text=Halo%20Admin%20FokusKonten%2C%20saya%20sudah%20membayar%20Order%20${currentOrder.orderId || sku}%20mohon%20kirimkan%20link%20Google%20Drive`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full max-w-md py-3 px-6 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-sm border border-neutral-200 transition-colors mx-auto"
          >
            Hubungi Bantuan CS
          </a>
        )
      )}

      <div className="pt-4 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left text-xs text-neutral-600">
        {[
          'Klik tombol buka Google Drive untuk mengunduh master asli.',
          'Pilih opsi unduh untuk menyimpan file .ZIP ke komputer Anda.',
          'Akses tersimpan permanen di menu Akun Saya perangkat ini.'
        ].map((text, i) => (
          <div key={i} className="flex items-start gap-2.5 bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
            <span className="w-5 h-5 rounded-full bg-white border border-neutral-200 flex items-center justify-center font-bold text-neutral-900 shrink-0 text-[11px]">{i + 1}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
