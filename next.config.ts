import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ["https://msnpctknnynaeoaujccp.supabase.co"],
  },
  webpack: (config, { isServer }) => {
    // 클라이언트 사이드에서만 포트원 SDK 로드
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
