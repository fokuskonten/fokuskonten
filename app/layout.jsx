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
    default: 'Fokus Konten — Official Studio Desain Grafis, Template Cetak & Software Resmi',
    template: '%s | Fokus Konten',
  },
  description: 'Website resmi Fokus Konten (FokusKonten). Menyediakan ratusan template desain grafis siap cetak (CorelDRAW, Photoshop), vektor, serta pengembang software aplikasi Android & Desktop resmi.',
  keywords: [
    'Fokus Konten', 'FokusKonten', 'Fokus Konten Official', 'fokuskonten.my.id',
    'Template Desain Grafis', 'Template CorelDRAW', 'Desain Spanduk CDR', 'Desain Banner',
    'Desain Undangan', 'Vektor Indonesia', 'Apotek Pro', 'Kelontong Pro', 'Aplikasi Kasir Android',
    'Publisher Software Indonesia', 'Jasa Desain dan Pembuatan Aplikasi',
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
    title: 'Fokus Konten — Official Studio Desain Grafis, Template Cetak & Software Resmi',
    description: 'Website resmi Fokus Konten. Katalog aset desain grafis lengkap (CorelDRAW, PSD, AI), template percetakan, dan software bisnis resmi.',
    images: [{ url: '/assets/brand/og-image.jpg', width: 1200, height: 630, alt: 'Fokus Konten — Desain Grafis & Software' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fokus Konten — Official Studio Desain Grafis, Template & Software Resmi',
    description: 'Website resmi Fokus Konten. Katalog ratusan aset desain grafis siap pakai dan software aplikasi bisnis terpercaya.',
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
      description: 'Official Publisher & Studio Desain Grafis, Template Cetak, dan Software Aplikasi Digital Fokus Konten.',
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
