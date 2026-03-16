import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Ali Smaili — Software Developer',
  description:
    'Full-stack developer based in Irvine, CA. I build AI-powered tools and web apps that solve real problems.',
  keywords: [
    'Ali Smaili',
    'Software Developer',
    'Full-Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'AI Developer',
    'Irvine CA',
  ],
  authors: [{ name: 'Ali Smaili' }],
  creator: 'Ali Smaili',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Ali Smaili — Software Developer',
    description:
      'Full-stack developer based in Irvine, CA. I build AI-powered tools and web apps that solve real problems.',
    siteName: 'Ali Smaili Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ali Smaili — Software Developer',
    description:
      'Full-stack developer based in Irvine, CA. I build AI-powered tools and web apps that solve real problems.',
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
