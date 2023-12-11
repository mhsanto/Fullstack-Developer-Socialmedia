/** @type {import('next').NextConfig} */
const nextConfig = {

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
