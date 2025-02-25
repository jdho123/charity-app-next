import Link from 'next/link'
import LeduLogo from './LeduLogo'

export default function Header() {
  return (
    <nav className="relative w-full py-3 flex items-center">
      <LeduLogo />

      <div className="flex gap-8 ml-8">
        <Link className="text-2xl text-black no-underline font-gloria hover:underline" href="/about">About Us</Link>
        <Link className="text-2xl text-black no-underline font-gloria hover:underline" href="/fundraisers">Fundraisers</Link>
        <Link className="text-2xl text-black no-underline font-gloria hover:underline" href="/diary">the Diary</Link>
        <Link className="text-2xl text-black no-underline font-gloria hover:underline" href="/news">Our News</Link>
        <Link className="text-2xl text-black no-underline font-gloria hover:underline" href="/contact">Contact Us</Link>
      </div>
    </nav>
  )
}