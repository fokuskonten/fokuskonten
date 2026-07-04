export const metadata = {
  title: {
    default: 'FokusKonten — Android Developer & Creative Digital',
    template: '%s | FokusKonten',
  },
  description: 'FokusKonten — Android Developer, Creative Digital & Content Creator, Fotograf & Videografi. Official website for portfolio and digital services.',
  keywords: ['FokusKonten', 'Android Developer', 'Content Creator', 'Fotograf', 'Videografi', 'Creative Digital', 'Portfolio'],
  authors: [{ name: 'FokusKonten' }],
  creator: 'FokusKonten',
  publisher: 'FokusKonten',
  metadataBase: new URL('https://fokuskonten.my.id'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://fokuskonten.my.id',
    siteName: 'FokusKonten',
    title: 'FokusKonten — Android Developer & Creative Digital',
    description: 'Android Developer, Creative Digital & Content Creator, Fotograf & Videografi.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FokusKonten — Android Developer & Creative Digital',
    description: 'Android Developer, Creative Digital & Content Creator, Fotograf & Videografi.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: '',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="google-adsense-account" content="" />
      </head>
      <body className="bg-dark-900 text-dark-100 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
