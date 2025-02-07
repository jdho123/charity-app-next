import type { Metadata } from 'next'
import Image from 'next/image'
import GuestLayout from '@/components/layout/GuestLayout'
import Card from '@/components/shared/Card'
import Button from '@/components/shared/Button'
import ScrollToTop from '@/components/shared/ScrollToTop'

export const metadata: Metadata = {
  title: 'Newsletter - LEDU',
}

// Sample data - would come from API in real implementation
const articles = [
  {
    title: 'Solar Panels Installed at Impact Schools',
    category: 'Latest News',
    date: '09/01/2025',
    image: '/images/solarPanel.png',
    excerpt: 'Our latest initiative brings sustainable energy solutions to our partner schools...'
  },
  {
    title: 'Teaching Through Technology',
    category: 'Success Stories',
    date: '08/28/2025',
    image: '/images/teaching-tech.jpg',
    excerpt: 'How digital tools are transforming education in remote areas...'
  },
]

export default function NewsletterPage() {
  return (
    <GuestLayout>
      <div className="bg-[#4B7277] min-h-screen">
        <div className="container mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="max-w-4xl mb-16">
            <h1 className="text-8xl font-gloria text-white mb-4">Our Journey</h1>
            <h2 className="text-5xl font-gloria text-[#FFEF9A] mb-8">One Story at a Time</h2>
            <p className="text-xl text-[#E6DBC4] font-verdana">
              Stay updated with the latest news, inspiring stories, and behind-the-scenes 
              moments from our mission. From impactful lessons to heartwarming success 
              stories, discover how we&apos;re making a difference every day.
            </p>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <Card key={index} variant="secondary" className="h-full">
                <Image 
                  src={article.image} 
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#DB6B24] font-gloria">{article.category}</span>
                    <span className="text-[#B21414]">{article.date}</span>
                  </div>
                  <h3 className="text-2xl font-gloria">{article.title}</h3>
                  <p className="font-verdana">{article.excerpt}</p>
                  <Button variant="primary">Read More &gt;&gt;&gt;</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <ScrollToTop />
    </GuestLayout>
  )
}