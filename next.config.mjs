/* eslint-disable @typescript-eslint/no-var-requires */
import withBundleAnalyzer from "@next/bundle-analyzer";
import withMdx from "@next/mdx";
import remarkToc from "remark-toc";
import remarkSlug from "remark-slug";

export default withMdx({
  options: {
    remarkPlugins: [[remarkToc, { tight: true }], remarkSlug],
  },
})(
  withBundleAnalyzer({
    enabled: process.env.ANALYZE_BUNDLE === `1`,
  })({
    reactStrictMode: true,
    webpack: (config) => {
      config.module.rules.push({
        test: /\.lua$/,
        type: `asset/source`,
      });
      return config;
    },
  }),
);
