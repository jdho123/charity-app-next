import { Campaign, CategoryItem } from '@/components/sections/fundraisers/types';
import { NextResponse } from 'next/server';

const activeCampaigns: Campaign[] = [
  {
    id: 1,
    title: 'Books',
    goal: 500,
    raised: 375,
    imageUrl: '/images/books.png',
    description:
      'Access to educational materials is essential for nurturing young minds and fostering creativity. This fundraiser will help provide books for children in remote areas, creating opportunities for growth and learning.',
    status: 'active' as const,
    fundLink: 'https://google.com',
    category: 'Books',
  },
  {
    id: 2,
    title: 'Books 2',
    goal: 500,
    raised: 375,
    imageUrl: '/images/books.png',
    description:
      'Access to educational materials is essential for nurturing young minds and fostering creativity. This fundraiser will help provide books for children in remote areas, creating opportunities for growth and learning.',
    status: 'active' as const,
    fundLink: 'https://google.com',
    category: 'Books',
  },
  {
    id: 3,
    title: 'Books 3',
    goal: 500,
    raised: 375,
    imageUrl: '/images/books.png',
    description:
      'Access to educational materials is essential for nurturing young minds and fostering creativity. This fundraiser will help provide books for children in remote areas, creating opportunities for growth and learning.',
    status: 'active' as const,
    fundLink: 'https://google.com',
    category: 'Books',
  },
  {
    id: 4,
    title: 'Books 3',
    goal: 500,
    raised: 375,
    imageUrl: '/images/books.png',
    description:
      'Access to educational materials is essential for nurturing young minds and fostering creativity. This fundraiser will help provide books for children in remote areas, creating opportunities for growth and learning.',
    status: 'active' as const,
    fundLink: 'https://google.com',
    category: 'Books',
  },
  {
    id: 5,
    title: 'Wi-Fi',
    goal: 500,
    raised: 375,
    imageUrl: '/images/wifi-campaign.jpg',
    description:
      'Access to educational materials is essential for nurturing young minds and fostering creativity. This fundraiser will help provide books for children in remote areas, creating opportunities for growth and learning.',
    status: 'active',
    fundLink: 'https://google.com',
    category: 'Wi-Fi',
  },
  {
    id: 6,
    title: 'Sport',
    goal: 500,
    raised: 375,
    imageUrl: '/images/sport-campaign.jpg',
    description:
      'Access to educational materials is essential for nurturing young minds and fostering creativity. This fundraiser will help provide books for children in remote areas, creating opportunities for growth and learning.',
    status: 'active',
    fundLink: 'https://google.com',
    category: 'Sport',
  },
];
const completedCampaigns = [
  {
    id: 1,
    title: 'Books for Bright Minds',
    goal: 500,
    raised: 500,
    imageUrl: '/images/sunnyDayGroupPhoto.jpeg',
    description:
      'Thanks to your incredible support, we successfully provided a new collection of books to Impact Schools, inspiring a love for reading among children.',
    status: 'completed' as const,
  },
];

const categories: CategoryItem[] = [
  { name: 'Books', color: 'bg-[#C6F0A8]' },
  { name: 'Wi-Fi', color: 'bg-[#B9C0FA]' },
  { name: 'Sport', color: 'bg-[#FFEF9A]' },
  { name: 'Music', color: 'bg-[#FFBC92]' },
];

export async function GET() {
  // Return your campaign data
  return NextResponse.json({
    active: activeCampaigns,
    completed: completedCampaigns,
    categories: categories,
  });
}
