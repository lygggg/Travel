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
};

const moduleExports = {
  // Your existing module.exports

  sentry: {
    // disableServerWebpackPlugin: true, 서버, 클라이언트 별도로 처리하는 경우 플러그인 비활성화 가능함
    // disableClientWebpackPlugin: true,
    // autoInstrumentServerFunctions: false, 오류및 성능 모니터링, api 자동계측 설정
    hideSourceMaps: true,
  },
  // productionBrowserSourceMaps: true,
  // 소스맵 생성
};

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [
    withPlaiceholder,
    withBundleAnalyzer,
    () => withSentryConfig(moduleExports, sentryWebpackPluginOptions),
  ];
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig });
};
