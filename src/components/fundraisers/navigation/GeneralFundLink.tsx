import Link from 'next/link'

interface GeneralFundLinkProps {
    className?: string;
}

export default function GeneralFundLink({ className }: GeneralFundLinkProps) {
  return (
    <Link href="/fundraisers#general-fund" className={className}>General Fund</Link>
  )
}