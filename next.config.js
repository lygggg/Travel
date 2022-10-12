/* eslint-disable @typescript-eslint/no-var-requires */
const { withPlaiceholder } = require("@plaiceholder/next");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["mlog-lygggg.s3.ap-northeast-2.amazonaws.com"],
    formats: ["image/webp"],
  },
};

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [withPlaiceholder, withBundleAnalyzer];
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig });
};
