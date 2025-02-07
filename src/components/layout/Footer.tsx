import Link from 'next/link'
import Button from '@/components/shared/Button'
import ActiveCampaignLink from '@/components/fundraisers/navigation/ActiveCampaignLink'
import CompletedCampaignLink from '@/components/fundraisers/navigation/CompletedCampaignsLink'
import GeneralFundLink from '@/components/fundraisers/navigation/GeneralFundLink'

const aboutLinks = [
  { href: '/who-we-are', text: 'Who We Are' },
  { href: '/what-we-do', text: 'What We Do' },
  { href: '/philosophy', text: 'Our Philosophy' },
  { href: '/journey', text: 'Our Journey' },
]

const newsLinks = [
  { href: '/latest-news', text: 'Latest News' },
  { href: '/diary', text: 'The Diary' },
]

export default function Footer() {
  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-gloria">About Us</h3>
            <nav className="space-y-2">
              {aboutLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="block text-lg font-gloria hover:underline"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Fundraisers Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-gloria">Fundraisers</h3>
            <nav className="space-y-2">
              <ActiveCampaignLink className="block text-lg font-gloria hover:underline" />
              <CompletedCampaignLink className="block text-lg font-gloria hover:underline" />
              <GeneralFundLink className="block text-lg font-gloria hover:underline" />
            </nav>
          </div>

          {/* News Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-gloria">Our News</h3>
            <nav className="space-y-2">
              {newsLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="block text-lg font-gloria hover:underline"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-gloria">Contact Us</h3>
            <div className="space-y-2 font-verdana">
              <a href="mailto:ledu@gmail.com" className="block text-base hover:underline">
                ledu@gmail.com
              </a>
              <p className="text-base">+44 1234 567 890</p>
            </div>

            {/* Partner Buttons */}
            <div className="space-y-4 pt-4">
              <h4 className="text-3xl font-gloria">Partner With Us:</h4>
              <div className="space-y-2">
                <Link href="/apply_to_teach" className="inline-block w-full">
                  <Button variant="secondary" className="w-full group">
                    For Teachers
                    <svg 
                      className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M13.75 6.75L19.25 12L13.75 17.25" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                      <path 
                        d="M19 12H4.75" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </Link>
                <Link href="/register_school" className="inline-block w-full">
                  <Button variant="secondary" className="w-full group">
                    For Schools
                    <svg 
                      className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M13.75 6.75L19.25 12L13.75 17.25" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                      <path 
                        d="M19 12H4.75" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}