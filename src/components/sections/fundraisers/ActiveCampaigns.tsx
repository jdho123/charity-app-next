import CampaignScroller from "./CampaignScroller"

interface Campaign {
  id: number
  title: string
  goal: number
  raised: number
  imageUrl: string
  description: string
  status: 'active'
}

interface ActiveCampaignsProps {
  campaigns: Campaign[]
}

export default function ActiveCampaigns({ campaigns }: ActiveCampaignsProps) {
  return (
    <section className="py-12 overflow-hidden" id="active-campaigns">
      <div className="container mx-auto">
        <h2 className="text-5xl font-gloria mb-12 px-4">Active Campaigns</h2>
        <CampaignScroller campaigns={campaigns} />
      </div>
    </section>
  )
}