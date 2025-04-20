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

// Detailed content for individual stories
const storyDetails = {
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
      {
        type: 'row',
        id: 'program-details-row',
        content: [
          {
            type: 'column',
            id: 'text-column',
            content: [
              {
                type: 'text',
                id: 'program-text',
                content:
                  'The program focuses on project-based learning approaches that engage students through real-world problem-solving. Teachers receive comprehensive training, ongoing support, and access to a community of practice where they can share ideas and strategies.',
              },
            ],
          },
          {
            type: 'column',
            id: 'image-column',
            content: [
              {
                type: 'image',
                id: 'workshop-image',
                src: '/images/teacher-workshop.jpeg',
                alt: 'Teachers collaborating in a workshop',
              },
            ],
          },
        ],
      },
      {
        type: 'title',
        id: 'results-title',
        content: 'Early Results',
      },
      {
        type: 'text',
        id: 'results-text',
        content:
          'Pilot implementations of the program have shown promising results, with increased student engagement and improved learning outcomes. Teachers report feeling more confident and equipped to address diverse learning needs in their classrooms.',
      },
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
      {
        type: 'title',
        id: 'story-1-title',
        content: "Maya's Journey",
      },
      {
        type: 'row',
        id: 'story-1-row',
        content: [
          {
            type: 'column',
            id: 'image-column',
            content: [
              {
                type: 'image',
                id: 'student-1-image',
                src: '/images/student-maya.jpeg',
                alt: 'Maya working on a science project',
              },
            ],
          },
          {
            type: 'column',
            id: 'text-column',
            content: [
              {
                type: 'text',
                id: 'student-1-story',
                content:
                  "Maya struggled with science and math when she first joined our program. With dedicated support from her teachers and our specialized curriculum, she discovered a passion for environmental science. Today, she leads her school's ecology club and plans to pursue a degree in environmental engineering.",
              },
            ],
          },
        ],
      },
      {
        type: 'title',
        id: 'story-2-title',
        content: "David's Achievement",
      },
      {
        type: 'text',
        id: 'story-2-text',
        content:
          'David faced significant learning challenges due to frequent school changes. Our consistent support and personalized learning approach helped him build confidence and develop strong academic skills. He recently won a regional writing competition and has improved his overall grades from Cs to As and Bs.',
      },
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
      {
        type: 'row',
        id: 'partnership-row',
        content: [
          {
            type: 'column',
            id: 'text-column',
            content: [
              {
                type: 'text',
                id: 'partnership-details',
                content:
                  'The expanded partnership now includes 15 local businesses across sectors such as technology, healthcare, manufacturing, and creative arts. Each partner has committed to providing mentorship, internship opportunities, and curriculum support to help students gain real-world skills and career insights.',
              },
            ],
          },
          {
            type: 'column',
            id: 'image-column',
            content: [
              {
                type: 'image',
                id: 'mentorship-image',
                src: '/images/mentorship.jpeg',
                alt: 'Students with business mentors',
              },
            ],
          },
        ],
      },
      {
        type: 'title',
        id: 'impact-title',
        content: 'Expected Impact',
      },
      {
        type: 'text',
        id: 'impact-text',
        content:
          'This partnership is expected to benefit over 500 students in the coming year, creating pathways to career exploration, skill development, and potential employment opportunities. The program specifically targets students from underrepresented backgrounds to address opportunity gaps in high-growth industries.',
      },
    ],
  },
};

export async function GET() {
  const response = NextResponse.json(stories);
  return corsHeaders(response);
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return corsHeaders(response);
}

export async function generateStaticParams() {
  return stories.map((story) => ({
    id: story.id.toString(),
  }));
}
