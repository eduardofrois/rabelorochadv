import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
