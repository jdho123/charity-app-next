import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Stay updated with our latest news and stories',
}

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}