import Link from 'next/link'

interface CompletedCampaignLinkProps {
    className?: string;
}

export default function CompletedCampaignsLink({ className }: CompletedCampaignLinkProps) {
  return (
    <Link href="/fundraisers#completed-campaigns" className={className}>Completed Campaigns</Link>
  )
}
