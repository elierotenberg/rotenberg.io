// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require("@next/bundle-analyzer");

module.exports = withBundleAnalyzer({
  webpack: (config) => {
    config.node.fs = "empty";
    return config;
  },
});
