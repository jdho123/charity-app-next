import CampaignScroller from "../shared/CampaignScroller"

interface CompletedCampaign {
    id: number
    title: string
    goal: number
    raised: number
    imageUrl: string
    description: string
    status: 'completed'
  }
  
  interface CompletedCampaignsProps {
    campaigns: CompletedCampaign[]
  }
  
  export default function CompletedCampaigns({ campaigns }: CompletedCampaignsProps) {
    return (
      <section id="completed-campaigns" className="py-8 overflow-hidden">
        <div className="container mx-auto">
          <h2 className="text-4xl font-gloria mb-8 px-4">Completed Campaigns</h2>
          <CampaignScroller campaigns={campaigns} />
        </div>
      </section>
    )
  }