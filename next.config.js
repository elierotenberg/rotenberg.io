/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require(`@next/bundle-analyzer`);
const withMdx = require(`@next/mdx`);
const remarkToc = require(`remark-toc`);
const remarkSlug = require(`remark-slug`);

module.exports = withMdx({
  options: {
    remarkPlugins: [[remarkToc, { tight: true }], remarkSlug],
  },
})(
  withBundleAnalyzer({
    enabled: process.env.ANALYZE_BUNDLE === `1`,
  })({
    future: {
      webpack5: true,
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.lua$/,
        type: `asset/source`,
      });
      return config;
    },
  }),
);
