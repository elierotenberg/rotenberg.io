import type { GetStaticPaths, GetStaticProps } from "next";
import type { FunctionComponent } from "react";
import React from "react";
import * as t from "typed-assert";

import type { BlogPostData } from "../../../lib/Blog";
import { parseBlogPostData } from "../../../lib/Blog";
import { BlogPost } from "../../../components/Blog/BlogPost";
import { blogPostsLoaders } from "../../../posts";

type StaticProps = {
  readonly blogPostData: BlogPostData;
  readonly loaderKey: string;
};

export const getStaticProps: GetStaticProps<StaticProps> = async (ctx) => {
  const slug = ctx.params?.slug;
  t.isString(slug);
  const blogPostsData = await Promise.all(
    blogPostsLoaders.map(async ({ key, loadData }) => {
      const data = await loadData();
      return { blogPostData: parseBlogPostData(data), loaderKey: key };
    }),
  );
  const props = blogPostsData.find(
    ({ blogPostData }) => blogPostData.slug == slug,
  );
  if (!props) {
    throw new Error(`no such blog post`);
  }
  return { props };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await Promise.all(
    blogPostsLoaders.map(async ({ loadData }) => {
      const blogPostData = parseBlogPostData(await loadData());
      return blogPostData.slug;
    }),
  );
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

const Slug: FunctionComponent<StaticProps> = ({ blogPostData, loaderKey }) => {
  const loadBlogPost = blogPostsLoaders.find(({ key }) => key === loaderKey);
  t.isNotUndefined(loadBlogPost);
  return (
    <BlogPost blogPostData={blogPostData}>{<loadBlogPost.Mdx />}</BlogPost>
  );
};

export default Slug;
