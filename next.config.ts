import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  async rewrites() {
    return [
      {
        source: "/api-be/:path*",
        destination: `${process.env.API_DOMAIN}/:path*`,
      },
    ];
  }
};

export default nextConfig;
