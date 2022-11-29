/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_DIRECTUS_URL.split('https://')[1],
      },
    ],
  },
}

module.exports = nextConfig
