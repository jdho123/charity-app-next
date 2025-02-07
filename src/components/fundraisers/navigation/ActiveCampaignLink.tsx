import Link from 'next/link'

interface ActiveCampaignLinkProps {
    className?: string;
  }
  

export default function ActiveCampaignLink({ className }: ActiveCampaignLinkProps) {
  return (
    <Link href="/fundraisers#active-campaigns" className={className}>Active Campaigns</Link>
  )
}
