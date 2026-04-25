import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for optimal performance on Vercel
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // React compiler for better performance
  reactStrictMode: true,
};

export default nextConfig;
