import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "menofissacharvision.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nepc.gov.ng",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
