import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@nexura/database", "@nexura/types"],
  output: "standalone",
};

export default nextConfig;
