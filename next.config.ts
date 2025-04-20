/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    NEXT_PUBLIC_BLOB_STORE_DOMAIN: process.env.NEXT_PUBLIC_BLOB_STORE_DOMAIN,
  },
  images: {
    domains: ['btgflyxste3cgojj.public.blob.vercel-storage.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ], // Add your image domains here
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  async rewrites() {
    return [
      {
        source: '/diary/seven_oranges',
        destination: '/diary/seven_oranges',
      },
      {
        source: '/diary/light_of_christmas',
        destination: '/diary/light_of_christmas',
      },
      {
        source: '/diary/sister_love',
        destination: '/diary/sister_love',
      },
      {
        source: '/diary/transformation',
        destination: '/diary/transformation',
      },
      {
        source: '/diary/not_forgotten',
        destination: '/diary/not_forgotten',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
