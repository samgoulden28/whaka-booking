/** @type {import('next').NextConfig} */
const nextConfig = {
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
