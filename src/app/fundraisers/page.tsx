import type { Metadata } from 'next'
import { use } from 'react'
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

// Type definitions for our campaign data
interface BaseCampaign {
  id: number
  title: string
  goal: number
  raised: number
  imageUrl: string
  description: string
  status: 'active' | 'completed'
}

interface ActiveCampaign extends BaseCampaign {
  status: 'active'
}

interface CompletedCampaign extends BaseCampaign {
  status: 'completed'
}

type CampaignData = {
  active: ActiveCampaign[]
  completed: CompletedCampaign[]
}

// Function to fetch campaign data
async function getCampaigns(): Promise<CampaignData> {
  const response = await fetch('/api/campaigns', { next: { revalidate: 3600 } }) // Cache for 1 hour
  if (!response.ok) {
    throw new Error('Failed to fetch campaigns')
  }
  
  const data = await response.json()
  
  // Ensure type safety by filtering campaigns based on status
  return {
    active: data.active.filter((campaign: BaseCampaign): campaign is ActiveCampaign => 
      campaign.status === 'active'
    ),
    completed: data.completed.filter((campaign: BaseCampaign): campaign is CompletedCampaign => 
      campaign.status === 'completed'
    )
  }
}

export default function FundraisersPage() {
  const { active, completed } = use(getCampaigns())

  return (
    <GuestLayout>
      <div className="min-h-screen bg-white">
        {/* General Fund Section */}
        <GeneralFund />

        {/* Active Campaigns Section */}
        <ActiveCampaigns campaigns={active} />

        {/* Completed Campaigns Section */}
        <CompletedCampaigns campaigns={completed} />
      </div>
    </GuestLayout>
  )
}