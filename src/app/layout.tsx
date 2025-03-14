import type { Metadata } from 'next';
import { Gloria_Hallelujah, Inter } from 'next/font/google';
import './globals.css';

const gloria = Gloria_Hallelujah({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-gloria',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s - LEDU',
    default: 'LEDU',
  },
  description: 'Transforming lives through education',
  icons: {
    icon: [
      { url: '/meta/favicon.ico' },
      { url: '/meta/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/meta/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: {
      url: '/meta/apple-touch-icon.png',
    },
    other: [
      { url: '/meta/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/meta/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/meta/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${gloria.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
