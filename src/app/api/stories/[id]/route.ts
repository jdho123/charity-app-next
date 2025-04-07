import { corsHeaders } from '@/utils/cors';
import { NextRequest, NextResponse } from 'next/server';

// Basic story data for listings
const stories = [
  {
    id: 1,
    title: 'Solar Panels Installed at Impact Schools',
    excerpt: 'Bringing sustainable energy solutions to our partner schools...',
    date: '09/01/2025',
    image: '/images/solarPanels.jpeg',
    category: 'Latest News',
    readTime: 5,
  },
  {
    id: 2,
    title: 'New Teaching Program Launches',
    excerpt: 'Expanding our reach with innovative teaching methods...',
    date: '08/15/2025',
    image: '/images/teaching.jpeg',
    category: 'News',
    readTime: 4,
  },
  {
    id: 3,
    title: 'Student Success Stories',
    excerpt: 'Meet the students whose lives have been transformed...',
    date: '08/01/2025',
    image: '/images/students.jpeg',
    category: 'News',
    readTime: 6,
  },
  {
    id: 4,
    title: 'Community Partnership Expands',
    excerpt: 'New collaboration with local businesses creates opportunities...',
    date: '07/20/2025',
    image: '/images/community.jpeg',
    category: 'News',
    readTime: 3,
  },
];

// Define content item types
type ContentItem =
  | { type: 'image'; id: string; src: string; alt: string }
  | { type: 'title'; id: string; content: string }
  | { type: 'text'; id: string; content: string }
  | { type: 'row'; id: string; content: ContentItem[] }
  | { type: 'column'; id: string; content: ContentItem[] };

// Detailed content for individual stories
const storyDetails: Record<number, (typeof stories)[0] & { content: ContentItem[] }> = {
  1: {
    ...stories[0],
    content: [
      {
        type: 'image',
        id: 'main-image',
        src: '/images/solarPanels.jpeg',
        alt: 'Solar panels being installed at an impact school',
      },
      {
        type: 'title',
        id: 'main-title',
        content: 'Solar Panels Installed at Impact Schools',
      },
      {
        type: 'text',
        id: 'intro-text',
        content:
          "We're proud to announce the successful installation of solar panels across five of our impact schools, providing clean, renewable energy and reducing operational costs that can be redirected to educational resources.",
      },
      {
        type: 'row',
        id: 'image-text-row',
        content: [
          {
            type: 'column',
            id: 'image-column',
            content: [
              {
                type: 'image',
                id: 'detail-image',
                src: '/images/solar-installation.jpeg',
                alt: 'Close-up of solar panel installation',
              },
            ],
          },
          {
            type: 'column',
            id: 'text-column',
            content: [
              {
                type: 'text',
                id: 'detail-text',
                content:
                  "The solar panel project was completed in partnership with GreenEnergy Solutions, who provided technical expertise and installation services. Each school received a 10kW system capable of generating approximately 40% of the school's electricity needs. This initiative is part of our broader commitment to environmental sustainability and reducing the carbon footprint of educational institutions in our network.",
              },
            ],
          },
        ],
      },
      {
        type: 'title',
        id: 'benefits-title',
        content: 'Headline 2',
      },
      {
        type: 'text',
        id: 'benefits-text',
        content:
          'Beyond the environmental benefits, this project serves as an educational opportunity for students, who can learn about renewable energy and sustainability through real-world application. Teachers have already incorporated the solar installation into science and environmental studies curricula, helping students understand the importance of clean energy for our future.',
      },
      {
        type: 'image',
        id: 'students-image',
        src: '/images/students-learning.jpeg',
        alt: 'Students learning about solar energy',
      },
      {
        type: 'text',
        id: 'conclusion-text',
        content:
          'This initiative is just the beginning. We plan to expand the solar program to all schools in our network over the next three years, creating a more sustainable and cost-effective educational environment for communities that need it most.',
      },
    ],
  },
  2: {
    ...stories[1],
    content: [
      {
        type: 'image',
        id: 'main-image',
        src: '/images/teaching.jpeg',
        alt: 'Teachers in a new program session',
      },
      {
        type: 'title',
        id: 'main-title',
        content: 'New Teaching Program Launches',
      },
      {
        type: 'text',
        id: 'intro-text',
        content:
          'We are excited to announce the launch of our new innovative teaching program designed to empower educators and transform classroom experiences for students in underserved communities.',
      },
      // Additional content for article 2...
    ],
  },
  3: {
    ...stories[2],
    content: [
      {
        type: 'image',
        id: 'main-image',
        src: '/images/students.jpeg',
        alt: 'Students celebrating their achievements',
      },
      {
        type: 'title',
        id: 'main-title',
        content: 'Student Success Stories',
      },
      {
        type: 'text',
        id: 'intro-text',
        content:
          "We're thrilled to share some inspiring success stories from students in our programs who have overcome challenges and achieved remarkable growth in their educational journeys.",
      },
      // Additional content for article 3...
    ],
  },
  4: {
    ...stories[3],
    content: [
      {
        type: 'image',
        id: 'main-image',
        src: '/images/community.jpeg',
        alt: 'Community partnership signing ceremony',
      },
      {
        type: 'title',
        id: 'main-title',
        content: 'Community Partnership Expands',
      },
      {
        type: 'text',
        id: 'intro-text',
        content:
          "We're delighted to announce the expansion of our community partnership program, bringing together local businesses, community organizations, and schools to create enriched learning experiences and career pathways for students.",
      },
      // Additional content for article 4...
    ],
  },
};

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
): Promise<NextResponse> {
  const { id } = await params;
  // Handle invalid IDs (non-numeric or "undefined")
  if (id === 'undefined' || isNaN(Number(id))) {
    const errorResponse = NextResponse.json({ error: 'Invalid story ID' }, { status: 400 });
    return corsHeaders(errorResponse);
  }
  const nId = Number(id);
  // Check if the story exists
  if (!storyDetails[nId]) {
    const errorResponse = NextResponse.json({ error: 'Story not found' }, { status: 404 });
    return corsHeaders(errorResponse);
  }

  const response = NextResponse.json(storyDetails[nId]);
  return corsHeaders(response);
}

// OPTIONS handler for CORS preflight requests
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return corsHeaders(response);
}
