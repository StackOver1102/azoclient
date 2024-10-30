// next.config.js
const { i18n } = require('./next-i18next.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.mypanel.link",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
