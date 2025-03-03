/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['your-domain.com'], // Add your image domains here
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  async rewrites() {
    return [
      {
        source: '/diary/seven_oranges',
        destination: '/diary/seven_oranges'
      },
      {
        source: '/diary/light_of_christmas',
        destination: '/diary/light_of_christmas'
      },
      {
        source: '/diary/sister_love',
        destination: '/diary/sister_love'
      },
      {
        source: '/diary/transformation',
        destination: '/diary/transformation'
      },
      {
        source: '/diary/not_forgotten',
        destination: '/diary/not_forgotten'
      }
    ]
  },
}

module.exports = nextConfig