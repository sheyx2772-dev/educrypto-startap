import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // framer-motion vendor-chunk xatolarini oldini olish
  transpilePackages: ["framer-motion", "phaser"],
  async redirects() {
    return [
      { source: "/labs", destination: "/dashboard", permanent: false },
      { source: "/labs/:id", destination: "/path/pd-:id", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
