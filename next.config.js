// next.config.js
const { i18n } = require('./next-i18next.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['cdn.mypanel.link'],  // Add this line to configure the allowed image domains
  },
};

module.exports = nextConfig;
