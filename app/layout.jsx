import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import BackToTop from '@/components/BackToTop'

export const metadata = {
  title: {
    default: 'FokusKonten — Kumpulan Aplikasi Android Terbaik',
    template: '%s | FokusKonten',
  },
  description: 'FokusKonten adalah publisher aplikasi Android Indonesia. Temukan 79+ aplikasi terbaik kami di Google Play Store — dari game, edukasi, utilitas, hingga bisnis.',
  keywords: [
    'FokusKonten', 'Aplikasi Android', 'Android Apps', 'Google Play Indonesia',
    'Publisher Android', 'Developer Indonesia', 'Aplikasi Terbaik',
    'Game Android', 'Edukasi Android', 'Utilitas Android', 'Android Studio',
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
    title: 'FokusKonten — Kumpulan Aplikasi Android Terbaik',
    description: '79+ aplikasi Android buatan Indonesia. Temukan game, edukasi, utilitas, dan aplikasi bisnis di Google Play Store.',
    images: [{ url: '/assets/brand/og-image.jpg', width: 1200, height: 630, alt: 'FokusKonten — Aplikasi Android' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FokusKonten — Kumpulan Aplikasi Android Terbaik',
    description: '79+ aplikasi Android buatan Indonesia. Temukan game, edukasi, utilitas, dan aplikasi bisnis di Google Play Store.',
    images: ['/assets/brand/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://fokuskonten.my.id' },
  verification: { google: 'PLACEHOLDER_GOOGLE_VERIFICATION' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#6366F1" />
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
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <BackToTop />
      </body>
    </html>
  )
}
