'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NewsCard from './newsletter/NewsCard';

interface Story {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  category?: string;
}

export default function Newsletter() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/stories');
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        const data = await response.json();
        setStories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-[#2F4F4F] py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-white">Loading stories...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#2F4F4F] py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-white">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#2F4F4F] py-16 min-h-screen relative overflow-hidden pt-12">
      {/* Star decoration */}
      <div className="absolute w-full top-4 md:top-20 left-[5%] md:left-[40%] lg:left-[30%]">
        <Image
          src="/images/shootingStar.png"
          alt=""
          width={450}
          height={300}
          className="opacity-70"
        />
      </div>

      {/* Lightbulb decoration */}
      <div className="absolute bottom-0 right-0">
        <Image src="/images/lightbulb.png" alt="" width={120} height={120} className="opacity-40" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header Content */}
        <div className="flex max-lg:flex-col lg:justify-evenly lg:gap-72 mb-12">
          <div className="">
            <h2 className="text-7xl font-gloria text-white mb-4 leading-tight">Our Journey</h2>
            <h3 className="text-4xl font-gloria text-yellow-200 mb-6">One Story at a Time</h3>
          </div>
          <p className="text-white text-lg leading-relaxed max-w-xl mt-16 font-urbanist">
            Stay updated with the latest news, inspiring stories, and behind-the-scenes moments from
            our mission. From impactful lessons to heartwarming success stories, discover how
            we&apos;re making a difference every day.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Header and Featured Article */}
          <div className="lg:w-1/2">
            {/* Featured Article */}
            {stories[0] && (
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
                <div className="relative h-64">
                  <Image
                    src={stories[0].image || '/images/placeholder.jpg'}
                    alt={stories[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[#E57C23]">{stories[0].category || 'Latest News'}</span>
                    <span className="text-gray-500">{stories[0].date}</span>
                  </div>
                  <h4 className="text-2xl font-gloria mb-4">{stories[0].title}</h4>
                  <div className="flex justify-end">
                    <Link
                      href={`/newsletter/${stories[0].id}`}
                      className="text-black font-bold hover:underline inline-flex items-center"
                    >
                      Read More&gt;&gt;&gt;
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - News Cards */}
          <div className="lg:w-1/2 space-y-6 flex flex-col justify-center">
            {stories.length > 1
              ? // If we have stories, show them
                stories
                  .slice(1, 4)
                  .map((story) => (
                    <NewsCard
                      key={story.id}
                      id={story.id}
                      title={story.title}
                      image={story.image}
                      category={story.category || 'News'}
                    />
                  ))
              : // If we don't have enough stories, show placeholder cards
                Array.from({ length: 3 }).map((_, index) => <NewsCard key={index} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
