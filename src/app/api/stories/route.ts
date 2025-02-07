import { NextResponse } from 'next/server'

const stories = [
  {
    id: 1,
    title: 'Solar Panels Installed at Impact Schools',
    excerpt: 'Bringing sustainable energy solutions to our partner schools...',
    date: '09/01/2025',
    image: '/images/solar-panels.jpg',
    category: 'Latest News'
  },
  {
    id: 2,
    title: 'New Teaching Program Launches',
    excerpt: 'Expanding our reach with innovative teaching methods...',
    date: '08/15/2025',
    category: 'News'
  },
  {
    id: 3,
    title: 'Student Success Stories',
    excerpt: 'Meet the students whose lives have been transformed...',
    date: '08/01/2025',
    category: 'News'
  }
]

export async function GET() {
  return NextResponse.json(stories)
}