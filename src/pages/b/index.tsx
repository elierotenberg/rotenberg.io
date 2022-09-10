import type { GetStaticProps } from "next";
import type { FunctionComponent } from "react";
import React from "react";

import { BlogPostList } from "../../components/Blog/BlogPostList";
import type { BlogPostData } from "../../lib/Blog";
import { parseBlogPostData } from "../../lib/Blog";
import { blogPostsLoaders } from "../../posts";

type StaticProps = {
  readonly blogPostsData: BlogPostData[];
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const blogPosts = await Promise.all(
    blogPostsLoaders.map(async ({ loadData }) => {
      const data = await loadData();
      return parseBlogPostData(data);
    }),
  );

  return { props: { blogPostsData: blogPosts } };
};

const BlogIndexPage: FunctionComponent<StaticProps> = ({ blogPostsData }) => (
  <BlogPostList>{blogPostsData}</BlogPostList>
);

export default BlogIndexPage;
