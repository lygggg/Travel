/* eslint-disable @typescript-eslint/no-var-requires */
const { withPlaiceholder } = require("@plaiceholder/next");
const { withSentryConfig } = require("@sentry/nextjs");
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
  sentry: {
    // disableServerWebpackPlugin: true, 서버, 클라이언트 별도로 처리하는 경우 플러그인 비활성화 가능함
    // disableClientWebpackPlugin: true,
    // autoInstrumentServerFunctions: false, 오류및 성능 모니터링, api 자동계측 설정
    hideSourceMaps: true,
    transpileClientSDK: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
  token: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
};

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [
    withPlaiceholder,
    withBundleAnalyzer,
    (nextConfig) => withSentryConfig(nextConfig, sentryWebpackPluginOptions),
  ];
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig });
};
