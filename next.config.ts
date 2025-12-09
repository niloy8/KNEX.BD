import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'knex.com.bd',

      },

    ],
    domains: ["images.unsplash.com"]
  },
};

export default nextConfig;
