import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.13",
    "10.139.56.82",
    "10.170.23.82",
    "127.0.0.1",
    "localhost",
  ],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
