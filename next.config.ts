import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: import.meta.dirname,
  },
  serverExternalPackages: ["mammoth"],
};

export default nextConfig;
