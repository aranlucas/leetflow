import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

export default withMDX()(nextConfig);
