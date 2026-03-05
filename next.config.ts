import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  async rewrites() {
    const backendUrl = process.env.API_DOMAIN || 'http://host.docker.internal:8080';
    console.log(`📡 Rewriting /api-be to: ${backendUrl}`);
    return [
      {
        source: "/api-be/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  }
};

export default nextConfig;
