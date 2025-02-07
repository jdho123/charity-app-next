'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

interface Story {
  id: number
  title: string
  excerpt: string
  date: string
  image?: string
  category?: string
}

export default function NewsletterSection() {
  const [stories, setStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/stories')
        if (!response.ok) {
          throw new Error('Failed to fetch stories')
        }
        const data = await response.json()
        setStories(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stories')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStories()
  }, [])

  if (isLoading) {
    return (
      <section className="bg-[#2F4F4F] py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-white">Loading stories...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-[#2F4F4F] py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-white">Error: {error}</div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#2F4F4F] py-16 min-h-screen relative">
      {/* Star decoration */}
      <div className="absolute top-8 right-12">
        <Image 
          src="/images/stars1_2.png" 
          alt="" 
          width={120} 
          height={60} 
          className="opacity-70"
        />
      </div>

      {/* Lightbulb decoration */}
      <div className="absolute bottom-8 right-8">
        <Image 
          src="/images/lightbulb.png" 
          alt="" 
          width={60} 
          height={60} 
          className="opacity-20"
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Header Content */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-6xl font-gloria text-white mb-4">
            Our Journey
          </h2>
          <h3 className="text-3xl font-gloria text-yellow-200 mb-6">
            One Story at a Time
          </h3>
          <p className="text-white text-lg font-verdana leading-relaxed">
            Stay updated with the latest news, experience first-hand 
            behind-the-scenes moments from our mission. From 
            impactful lessons to heartwarming success stories, discover 
            how we&apos;re making a difference every day.
          </p>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured News Card */}
          {stories[0] && (
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image 
                  src={stories[0].image || '/images/placeholder.jpg'} 
                  alt={stories[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500">{stories[0].category}</span>
                  <span className="text-gray-500">{stories[0].date}</span>
                </div>
                <h4 className="text-xl font-gloria mb-4">{stories[0].title}</h4>
                <Link 
                  href={`/news/${stories[0].id}`}
                  className="text-[#2F4F4F] font-gloria hover:underline inline-flex items-center"
                >
                  Read More &gt;&gt;&gt;
                </Link>
              </div>
            </div>
          )}

          {/* Other News Cards */}
          {stories.slice(1).map((story) => (
            <div 
              key={story.id}
              className="bg-white/10 backdrop-blur rounded-lg p-6"
            >
              <div className="mb-4 h-32 bg-white/20 rounded-lg" />
              <span className="text-white">{story.category}</span>
              <h4 className="text-xl font-gloria text-white my-4">{story.title}</h4>
              <Link 
                href={`/news/${story.id}`}
                className="text-white font-gloria hover:underline block mt-4"
              >
                Read More &gt;&gt;&gt;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}