import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '128gb',
    },
  },
};

export default nextConfig;