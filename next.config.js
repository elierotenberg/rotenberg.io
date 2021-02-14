/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require("@next/bundle-analyzer");
const withMdx = require("@next/mdx");
const remarkToc = require("remark-toc");
const remarkSlug = require("remark-slug");

module.exports = withMdx({
  options: {
    remarkPlugins: [[remarkToc, { tight: true }], remarkSlug],
  },
})(
  withBundleAnalyzer({
    webpack: (config) => {
      config.node.fs = "empty";
      return config;
    },
    enabled: process.env.ANALYZE_BUNDLE === "1",
  }),
);
