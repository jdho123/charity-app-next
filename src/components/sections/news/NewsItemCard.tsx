import Image from 'next/image';
import Link from 'next/link';
import { NewsItem } from './types';
import GloriaTitle from '@/components/shared/GloriaTitle';

export default function NewsItemCard({ item }: { item: NewsItem }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <Link href={`/newsletter/${item.id}`} className="block">
        {/* Full-width Image Section at Top */}
        <div className="w-full h-80 relative">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            {item.image ? (
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            ) : (
              <span className="text-2xl text-gray-400">Photo</span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Headline and Date */}
          <div className="flex justify-between items-start mb-4">
            <GloriaTitle as="h2" size="3xl" color="black">
              {item.title}
            </GloriaTitle>
            <span className="text-gray-500 text-xl">{item.date}</span>
          </div>

          {/* Excerpt */}
          <p className="text-gray-700 mb-6 text-lg font-gloria">{item.excerpt}</p>

          {/* Read time with arrow */}
          <div className="flex items-center">
            <span className="text-gray-800 font-medium mr-2 font-gloria">
              Read the article {item.readTime || 5} min
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}
