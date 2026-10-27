import type { NextConfig } from "next";

// The site is a static export served from https://<user>.github.io/electricity-calculator/
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "export",
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === "production" ? "/electricity-calculator" : "",
};

export default nextConfig;
