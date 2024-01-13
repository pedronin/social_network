/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost:5555"],
  },
};

module.exports = nextConfig;
