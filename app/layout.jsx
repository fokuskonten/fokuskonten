import './globals.css'

export const metadata = {
  title: {
    default: 'FokusKonten — Creative Digital Studio',
    template: '%s | FokusKonten',
  },
  description: 'FokusKonten adalah studio kreatif digital yang bergerak di bidang Android Development, Fotografi & Videografi, Desain Grafis, dan Content Creator. Berbasis di Indonesia.',
  keywords: [
    'FokusKonten', 'Android Developer Indonesia', 'Creative Digital Studio',
    'Content Creator', 'Fotografi Profesional', 'Videografi', 'Desain Grafis',
    'Jasa Aplikasi Android', 'Jasa Foto Video', 'Portfolio Digital'
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
    title: 'FokusKonten — Creative Digital Studio',
    description: 'Studio kreatif digital untuk Android Development, Fotografi & Videografi, Desain Grafis, dan Content Creator di Indonesia.',
    images: [
      {
        url: '/assets/brand/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FokusKonten — Creative Digital Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FokusKonten — Creative Digital Studio',
    description: 'Studio kreatif digital untuk Android Development, Fotografi & Videografi, Desain Grafis, dan Content Creator di Indonesia.',
    images: ['/assets/brand/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '',
  },
  alternates: {
    canonical: 'https://fokuskonten.my.id',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/icon-512.png" sizes="512x512" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="msapplication-TileColor" content="#8c1f1f" />
        <link rel="msapplication-config" href="/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="google-adsense-account" content="" />
      </head>
      <body className="bg-canvas-100 text-charcoal-800 font-sans antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
