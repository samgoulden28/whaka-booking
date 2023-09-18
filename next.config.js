/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return [
      {
        source: '/accomodation/:path*',
        destination: '/',
      },
    ];
  },
}

module.exports = nextConfig
