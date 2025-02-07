import CampaignScroller from "../shared/CampaignScroller"

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
      <section className="py-8 overflow-hidden">
        <div className="container mx-auto">
          <h2 className="text-4xl font-gloria mb-8 px-4">Active Campaigns</h2>
          <CampaignScroller campaigns={campaigns} />
        </div>
      </section>
    )
  }
  