import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://cdn-icons-png.flaticon.com/512/6858/6858504.png")]
  }
};

export default nextConfig;
