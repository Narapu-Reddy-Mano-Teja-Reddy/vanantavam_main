import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.170.23.82"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
