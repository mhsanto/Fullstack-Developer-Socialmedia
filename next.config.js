/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    serverActions: true,
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'giphy.com',
            port: '',
            pathname: '/embed/**',
          },
        ],
      },
}

module.exports = nextConfig
