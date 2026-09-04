import { Suspense } from 'react'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import CartFloat from '@/components/CartFloat'
import BackToTop from '@/components/BackToTop'
import SessionScrollRestorer from '@/components/SessionScrollRestorer'


export const metadata = {
  title: {
    default: 'FokusKonten — Pengembang & Publisher Software Aplikasi Resmi',
    template: '%s | FokusKonten',
  },
  description: 'FokusKonten adalah pengembang dan publisher software serta aplikasi Android & Desktop resmi. Menyediakan solusi aplikasi bisnis kasir (Apotek Pro, Kelontong Pro), MCJob.id, CRM, dan layanan pembuatan aplikasi kustom profesional.',
  keywords: [
    'FokusKonten', 'Apotek Pro', 'Kelontong Pro', 'Aplikasi Kasir Android', 'POS Apotek', 'Software Apotek',
    'Aplikasi Android Indonesia', 'Developer Android Indonesia', 'Publisher Google Play',
    'Jasa Pembuatan Aplikasi Android', 'Aplikasi Bisnis Offline',
  ],
  authors: [{ name: 'FokusKonten', url: 'https://fokuskonten.my.id' }],
  creator: 'FokusKonten',
  publisher: 'FokusKonten',
  metadataBase: new URL('https://fokuskonten.my.id'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://fokuskonten.my.id',
    siteName: 'FokusKonten',
    title: 'FokusKonten — Pengembang & Publisher Software Aplikasi Resmi',
    description: 'Solusi software dan aplikasi andal untuk bisnis (Apotek Pro, Kelontong Pro), Al-Qur\'an digital, bursa karir MCJob.id, dan WhatsApp Lead CRM.',
    images: [{ url: '/assets/brand/og-image.jpg', width: 1200, height: 630, alt: 'FokusKonten — Software & Aplikasi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FokusKonten — Pengembang & Publisher Software Aplikasi Resmi',
    description: 'Solusi software dan aplikasi andal untuk bisnis (Apotek Pro, Kelontong Pro), Al-Qur\'an digital, bursa karir MCJob.id, dan WhatsApp Lead CRM.',
    images: ['/assets/brand/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://fokuskonten.my.id' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0F172A" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body className="bg-white text-neutral-800 font-sans antialiased">
        <Suspense fallback={null}>
          <SessionScrollRestorer />
        </Suspense>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <CartFloat />
        <BackToTop />

      </body>
    </html>
  )
}
