/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["a0.muscache.com", "cectocdqshqvzdchewkg.supabase.in"],
  },
};

module.exports = nextConfig;
