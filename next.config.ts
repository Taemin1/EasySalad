/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ["your-supabase-storage-url.supabase.co"],
  },
};

module.exports = nextConfig;
