import type { Metadata } from 'next'
import GuestLayout from '@/components/layout/GuestLayout'
import GeneralFund from '@/components/fundraisers/GeneralFund'
import ActiveCampaigns from '@/components/fundraisers/ActiveCampaigns'
import CompletedCampaigns from '@/components/fundraisers/CompletedCampaigns'

export const metadata: Metadata = {
  title: 'Fundraisers - LEDU',
  description: 'Support our educational initiatives through various fundraising campaigns'
}

// Navigation links for the fundraisers page
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const navLinks = [
  { id: 'general-fund', text: 'General Fund' },
  { id: 'active-campaigns', text: 'Active Campaigns' },
  { id: 'completed-campaigns', text: 'Completed Campaigns' }
]

// Sample data - In a real app, this would come from your API or database
const activeCampaigns = [
  {
    id: 1,
    title: 'Books',
    goal: 500,
    raised: 375,
    imageUrl: '/storage/books.png',
    description: 'Access to educational materials is essential for nurturing young minds and fostering creativity. This fundraiser will help provide books for children in remote areas, creating opportunities for growth and learning.',
    status: 'active' as const
  },
  {
    id: 2,
    title: 'Books 2',
    goal: 500,
    raised: 375,
    imageUrl: '/storage/books.png',
    description: 'Access to educational materials is essential for nurturing young minds and fostering creativity. This fundraiser will help provide books for children in remote areas, creating opportunities for growth and learning.',
    status: 'active' as const
  },
  {
    id: 3,
    title: 'Books 3',
    goal: 500,
    raised: 375,
    imageUrl: '/storage/books.png',
    description: 'Access to educational materials is essential for nurturing young minds and fostering creativity. This fundraiser will help provide books for children in remote areas, creating opportunities for growth and learning.',
    status: 'active' as const
  }
]

const completedCampaigns = [
  {
    id: 1,
    title: 'Books for Bright Minds',
    goal: 500,
    raised: 500,
    imageUrl: '/storage/booksForBright.png',
    description: 'Thanks to your incredible support, we successfully provided a new collection of books to Impact Schools, inspiring a love for reading among children.',
    status: 'completed' as const
  }
]

export default function FundraisersPage() {
  return (
    <GuestLayout>
      <div className="min-h-screen bg-white">
        {/* General Fund Section */}
        <GeneralFund />

        {/* Active Campaigns Section */}
        <ActiveCampaigns campaigns={activeCampaigns} />

        {/* Completed Campaigns Section */}
        <CompletedCampaigns campaigns={completedCampaigns} />
      </div>
    </GuestLayout>
  )
}