import { NextResponse } from 'next/server'

const activeCampaigns = [
  {
    id: 1,
    title: 'Books',
    goal: 500,
    raised: 375,
    imageUrl: '/images/books.png',
    description: 'Access to educational materials is essential for nurturing young minds and fostering creativity. This fundraiser will help provide books for children in remote areas, creating opportunities for growth and learning.',
    status: 'active' as const
  },
  {
    id: 2,
    title: 'Books 2',
    goal: 500,
    raised: 375,
    imageUrl: '/images/books.png',
    description: 'Access to educational materials is essential for nurturing young minds and fostering creativity. This fundraiser will help provide books for children in remote areas, creating opportunities for growth and learning.',
    status: 'active' as const
  },
  {
    id: 3,
    title: 'Books 3',
    goal: 500,
    raised: 375,
    imageUrl: '/images/books.png',
    description: 'Access to educational materials is essential for nurturing young minds and fostering creativity. This fundraiser will help provide books for children in remote areas, creating opportunities for growth and learning.',
    status: 'active' as const
  },
  {
    id: 4,
    title: 'Books 3',
    goal: 500,
    raised: 375,
    imageUrl: '/images/books.png',
    description: 'Access to educational materials is essential for nurturing young minds and fostering creativity. This fundraiser will help provide books for children in remote areas, creating opportunities for growth and learning.',
    status: 'active' as const
  }
]

const completedCampaigns = [
  {
    id: 1,
    title: 'Books for Bright Minds',
    goal: 500,
    raised: 500,
    imageUrl: '/images/booksForBright.png',
    description: 'Thanks to your incredible support, we successfully provided a new collection of books to Impact Schools, inspiring a love for reading among children.',
    status: 'completed' as const
  }
]

export async function GET() {
  // Return your campaign data
  return NextResponse.json({
    active: activeCampaigns,
    completed: completedCampaigns
  })
}