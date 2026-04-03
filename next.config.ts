import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/menu",
        destination: "/sluzby",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
