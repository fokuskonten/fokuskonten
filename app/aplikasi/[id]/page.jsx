import { notFound } from 'next/navigation'
import Link from 'next/link'
import appsData from '@/content/apps/apps.json'
import AppIcon from '@/components/AppIcon'
import Breadcrumb from '@/components/Breadcrumb'
import AppCard from '@/components/AppCard'

export async function generateStaticParams() {
  return appsData.map((app) => ({ id: app.id }))
}

export async function generateMetadata({ params }) {
  const app = appsData.find((a) => a.id === params.id)
  if (!app) return {}

  return {
    title: app.name,
    description: app.description || `Unduh ${app.name} — aplikasi Android kategori ${app.category} dari FokusKonten. Tersedia di Google Play Store.`,
    alternates: { canonical: `https://fokuskonten.my.id/aplikasi/${app.id}` },
    openGraph: {
      title: `${app.name} — Aplikasi Android FokusKonten`,
      description: app.description,
      images: [{ url: app.icon, width: 512, height: 512, alt: app.name }],
    },
  }
}

const categoryColors = {
  Game: 'bg-accent-50 text-accent-700 border-accent-200',
  Edukasi: 'bg-brand-50 text-brand-700 border-brand-200',
  Religi: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Bisnis: 'bg-blue-50 text-blue-700 border-blue-200',
  Utilitas: 'bg-purple-50 text-purple-700 border-purple-200',
  Kesehatan: 'bg-rose-50 text-rose-700 border-rose-200',
  Produktivitas: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  Hiburan: 'bg-pink-50 text-pink-700 border-pink-200',
}

export default function AppDetailPage({ params }) {
  const app = appsData.find((a) => a.id === params.id)
  if (!app) notFound()

  const relatedApps = appsData
    .filter((a) => a.category === app.category && a.id !== app.id)
    .slice(0, 3)

  const colorClass = categoryColors[app.category] || 'bg-neutral-50 text-neutral-700'

  const features = [
    'Ringan dan cepat',
    'Antarmuka modern dan intuitif',
    'Optimasi untuk berbagai resolusi layar',
    'Privasi pengguna terjamin',
  ]

  const permissions = [
    'Internet (akses data)',
    'Penyimpanan (bila diperlukan)',
  ]

  const firebaseServices = [
    'Google AdMob (iklan)',
    'Firebase Analytics',
    'Firebase Crashlytics',
  ]

  return (
    <>
      <section className="pt-28 pb-8">
        <div className="container-page">
          <Breadcrumb items={[
            { href: '/aplikasi', label: 'Aplikasi' },
            { label: app.name },
          ]} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-start gap-5 mb-6">
                <AppIcon src={app.icon} name={app.name} size="xlarge" />
                <div>
                  <h1 className="heading-xl text-3xl sm:text-4xl text-neutral-900 mb-2">{app.name}</h1>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`inline-flex items-center text-[11px] font-display font-semibold px-2.5 py-0.5 rounded-full border ${colorClass}`}>
                      {app.category}
                    </span>
                    <span className="text-xs text-neutral-400">
                      Versi {app.version}
                    </span>
                    <span className="text-xs text-neutral-400">
                      Target SDK {app.targetSdk}
                    </span>
                    <span className="text-xs text-neutral-400">
                      Min SDK {app.minSdk}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-neutral-600 text-base leading-relaxed mb-8">
                {app.description}
              </p>

              <div className="space-y-6">
                <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                  <h2 className="heading-md text-lg text-neutral-900 mb-4">Fitur Aplikasi</h2>
                  <ul className="space-y-3">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-600 text-sm">
                        <span className="w-5 h-5 rounded-full bg-brand-50 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                  <h2 className="heading-md text-lg text-neutral-900 mb-4">Info Teknis</h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-neutral-400">Package Name</span>
                      <p className="text-neutral-700 font-mono text-xs mt-0.5 break-all">{app.package}</p>
                    </div>
                    <div>
                      <span className="text-neutral-400">Versi Terbaru</span>
                      <p className="text-neutral-700 font-medium mt-0.5">{app.version}</p>
                    </div>
                    <div>
                      <span className="text-neutral-400">Target SDK</span>
                      <p className="text-neutral-700 font-medium mt-0.5">{app.targetSdk}</p>
                    </div>
                    <div>
                      <span className="text-neutral-400">Minimal SDK</span>
                      <p className="text-neutral-700 font-medium mt-0.5">{app.minSdk}</p>
                    </div>
                    <div>
                      <span className="text-neutral-400">Status</span>
                      <p className="text-neutral-700 font-medium mt-0.5 capitalize">{app.status}</p>
                    </div>
                    <div>
                      <span className="text-neutral-400">Firebase Services</span>
                      <p className="text-neutral-700 text-xs mt-0.5">AdMob, Analytics, Crashlytics</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-card p-6">
                  <h3 className="font-display font-semibold text-sm text-neutral-900 mb-4">Unduh Aplikasi</h3>
                  <a
                    href={`https://play.google.com/store/apps/details?id=${app.package}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-neutral-900 text-white font-display font-semibold text-sm hover:bg-neutral-800 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M1.326 1.973C1.256 2.294 1.22 2.634 1.22 3v18c0 .366.036.706.106 1.027L12 12 1.326 1.973zm.905-.642l11.17 10.736L23.723 3.38c-.443-.269-1-.43-1.607-.43H4.202c-.717 0-1.356.248-1.971.38zM23.66 4.797L13.334 15.05l5.914 5.686 4.02-3.878c.442-.374.732-.932.732-1.558V6.19c0-.515-.121-1-.34-1.394zM12 13.14L1.628 22.21A3.573 3.573 0 004.202 23h15.596c.46 0 .893-.112 1.28-.31L18.87 19.87 12 13.14z"/></svg>
                    Download di Google Play
                  </a>

                  <div className="mt-4 pt-4 border-t border-neutral-100 space-y-3">
                    <a
                      href={`https://play.google.com/store/apps/details?id=${app.package}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Info Play Store
                    </a>
                    <a
                      href="https://wa.me/6285183011318"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                      Laporkan Masalah
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-card p-6">
                  <h3 className="font-display font-semibold text-sm text-neutral-900 mb-3">Izin Aplikasi</h3>
                  <ul className="space-y-2">
                    {permissions.map((p, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-neutral-500">
                        <svg className="w-3 h-3 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {relatedApps.length > 0 && (
                  <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-card p-6">
                    <h3 className="font-display font-semibold text-sm text-neutral-900 mb-3">Aplikasi Terkait</h3>
                    <div className="space-y-3">
                      {relatedApps.map((ra) => (
                        <Link
                          key={ra.id}
                          href={`/aplikasi/${ra.id}`}
                          className="flex items-center gap-3 group"
                        >
                          <AppIcon src={ra.icon} name={ra.name} size="small" />
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-neutral-700 group-hover:text-brand-600 transition-colors truncate">
                              {ra.name}
                            </div>
                            <span className="text-xs text-neutral-400">{ra.category}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
