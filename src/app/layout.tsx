import type { Metadata } from 'next'
import { Gloria_Hallelujah, Inter } from 'next/font/google'
import './globals.css'

const gloria = Gloria_Hallelujah({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-gloria',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s - LEDU',
    default: 'LEDU',
  },
  description: 'Transforming lives through education',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${gloria.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}