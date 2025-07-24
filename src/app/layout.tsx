import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'BarangFYP.store - Produk Viral Terpopuler dari TikTok Shop, Shopee & Tokopedia',
    template: '%s | BarangFYP.store'
  },
  description: 'Temukan produk viral terbaru yang lagi hits di TikTok, Shopee, dan Tokopedia! Dapatkan barang trending dengan harga terbaik. iPhone, Samsung, Nike, skincare viral - semuanya ada! 🔥',
  keywords: [
    'barang viral',
    'produk tiktok',
    'barang fyp',
    'tiktok shop',
    'shopee viral',
    'tokopedia trending',
    'produk viral indonesia',
    'barang hits tiktok',
    'viral products',
    'trending products indonesia'
  ],
  authors: [{ name: 'Ignitron Team' }],
  creator: 'Ignitron',
  publisher: 'Bima Adam',
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
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://barangfyp.store',
    title: 'BarangFYP.store - Produk Viral Terpopuler 🔥',
    description: 'Temukan produk viral terbaru yang lagi hits di TikTok, Shopee, dan Tokopedia! Dapatkan barang trending dengan harga terbaik.',
    siteName: 'BarangFYP.store',
    images: [
      {
        url: 'https://barangfyp.store/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BarangFYP.store - Produk Viral Terpopuler',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BarangFYP.store - Produk Viral Terpopuler 🔥',
    description: 'Temukan produk viral terbaru yang lagi hits di TikTok, Shopee, dan Tokopedia!',
    images: ['https://barangfyp.store/og-image.jpg'],
    creator: '@barangfyp',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://barangfyp.store',
  },
  category: 'e-commerce',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Theme Color */}
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="msapplication-TileColor" content="#8B5CF6" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'BarangFYP.store',
              url: 'https://barangfyp.store',
              description: 'Temukan produk viral terbaru yang lagi hits di TikTok, Shopee, dan Tokopedia!',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://barangfyp.store?search={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Analytics (Google Analytics, Meta Pixel, etc.) */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}

        {children}

        {/* Loading Indicator */}
        <div id="loading-overlay" className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 items-center justify-center hidden">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Loading viral products...</p>
          </div>
        </div>
      </body>
    </html>
  )
}