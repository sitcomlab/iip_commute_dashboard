/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
      },
    })

    return config
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.klimadashboard-ms.reedu.de',
      },
    ],
  },
}

module.exports = nextConfig
