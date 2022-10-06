/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["mlog-lygggg.s3.ap-northeast-2.amazonaws.com"],
  },
};

const config = withPlugins([withBundleAnalyzer], nextConfig);

export default config;
