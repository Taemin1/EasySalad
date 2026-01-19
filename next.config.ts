import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Turbopack 사용 명시
  turbopack: {},

  compiler: {
    emotion: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "msnpctknnynaeoaujccp.supabase.co",
      },
    ],
  },

  // webpack 설정 유지
  webpack: (config, { isServer }) => {
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

export default nextConfig;
