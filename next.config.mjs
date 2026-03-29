/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'h.cricapi.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
