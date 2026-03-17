import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
}

export const metadata: Metadata = {
  title: 'Ali Smaili — Software Developer',
  description:
    'Full-stack developer specializing in React, Node.js, and AI-integrated tools. Building real-world solutions that drive measurable impact.',
  keywords: [
    'software developer',
    'full-stack',
    'React',
    'Node.js',
    'TypeScript',
    'AI',
    'portfolio',
    'Ali Smaili',
  ],
  authors: [{ name: 'Ali Smaili' }],
  creator: 'Ali Smaili',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Ali Smaili — Software Developer',
    description:
      'Full-stack developer specializing in React, Node.js, and AI-integrated tools. Building real-world solutions that drive measurable impact.',
    siteName: 'Ali Smaili Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ali Smaili — Software Developer',
    description:
      'Full-stack developer specializing in React, Node.js, and AI-integrated tools. Building real-world solutions that drive measurable impact.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        {/* Satoshi font from Fontshare */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
