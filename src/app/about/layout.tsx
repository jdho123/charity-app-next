
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - LEDU',
  description: 'Learn about our mission, vision, and the team behind LEDU.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}