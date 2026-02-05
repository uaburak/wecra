import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // allowedDevOrigins: ["172.16.34.163:3000", "localhost:3000"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
