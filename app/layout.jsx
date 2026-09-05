import { Suspense } from 'react'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import QuinChatWidget from '@/components/QuinChatWidget'
import CartFloat from '@/components/CartFloat'
import BackToTop from '@/components/BackToTop'
import SessionScrollRestorer from '@/components/SessionScrollRestorer'


export const metadata = {
  title: {
    default: 'Fokus Konten — Software Engineer, AI Creator & Creative Digital Studio',
    template: '%s | Fokus Konten',
  },
  description: 'Website resmi Fokus Konten. Dikelola oleh Solo Software Engineer & AI Creator. Menghadirkan software aplikasi Android (POS Kasir, PWA), Desktop EXE, platform web modern, serta katalog aset digital produksi nyata (template CorelDRAW, preset Lightroom/Premiere, dan footage sinematik).',
  keywords: [
    'Fokus Konten', 'FokusKonten', 'fokuskonten.my.id', 'Software Engineer Indonesia',
    'Solo Developer', 'AI Code Editor Creator', 'Android Developer Indonesia', 'Aplikasi Kasir Android',
    'Apotek Pro', 'Kelontong Pro', 'PWA', 'Windows Desktop EXE', 'MCJob.id',
    'Template CorelDRAW', 'Aset Desain Percetakan', 'Preset Lightroom', 'Preset Premiere Pro', 'Footage Sinematik',
  ],
  authors: [{ name: 'Fokus Konten', url: 'https://fokuskonten.my.id' }],
  creator: 'Fokus Konten',
  publisher: 'Fokus Konten',
  metadataBase: new URL('https://fokuskonten.my.id'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://fokuskonten.my.id',
    siteName: 'Fokus Konten',
    title: 'Fokus Konten — Software Engineer, AI Creator & Creative Digital Studio',
    description: 'Ekosistem software aplikasi Android, Windows Desktop EXE, web platform modern, dan katalog aset digital produksi nyata oleh Fokus Konten.',
    images: [{ url: '/assets/brand/og-image.jpg', width: 1200, height: 630, alt: 'Fokus Konten — Software Engineer & Creative Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fokus Konten — Software Engineer, AI Creator & Creative Digital Studio',
    description: 'Software aplikasi Android, Windows EXE, web platform modern, dan katalog aset digital produksi nyata oleh Fokus Konten.',
    images: ['/assets/brand/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://fokuskonten.my.id' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://fokuskonten.my.id/#organization',
      name: 'Fokus Konten',
      alternateName: ['FokusKonten', 'Fokus Konten Official', 'FokusKonten Studio'],
      url: 'https://fokuskonten.my.id',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fokuskonten.my.id/logo.png',
        caption: 'Fokus Konten Logo',
      },
      sameAs: [
        'https://www.youtube.com/@fokuskonten',
        'https://github.com/fokuskonten',
      ],
      description: 'Ekosistem resmi Fokus Konten: Software Engineering (Android Native, PWA, Desktop EXE, AI Code Tools) dan Digital Creative Assets Studio (Template Percetakan CorelDRAW, Cinematic Footage, Preset Fotografi & Videografi).',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://fokuskonten.my.id/#website',
      url: 'https://fokuskonten.my.id',
      name: 'Fokus Konten',
      publisher: {
        '@id': 'https://fokuskonten.my.id/#organization',
      },
      inLanguage: 'id-ID',
    },
  ],
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
        <QuinChatWidget />
        <CartFloat />
        <BackToTop />

      </body>
    </html>
  )
}
