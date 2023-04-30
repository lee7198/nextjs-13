/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    //도메인 넣어줘야함
    domains: ["resizer.otstatic.com"],
  },
};

module.exports = nextConfig;
