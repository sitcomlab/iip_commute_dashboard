/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'doinggeoandethics.files.wordpress.com',
      },
    ],
  },
}

module.exports = nextConfig
