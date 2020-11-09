import { GetStaticPaths, GetStaticProps } from "next";
import React, { FunctionComponent } from "react";

import { IBlogPostData, loadBlogPosts } from "../../../lib/Blog";
import { BlogPost } from "../../../components/Blog/BlogPost";

interface ISlugProps {
  readonly blogPost: IBlogPostData;
}

export const getStaticProps: GetStaticProps<ISlugProps> = async (ctx) => {
  const slugParam = ctx.params?.slug;
  const slug =
    typeof slugParam === "string"
      ? slugParam
      : Array.isArray(slugParam)
      ? slugParam[0]
      : null;
  if (!slug) {
    throw new Error("invalid slug");
  }
  const blogPosts = await loadBlogPosts();
  const blogPost = blogPosts.find((blogPost) => blogPost.slug === slug);
  if (!blogPost) {
    throw new Error("no such blog post");
  }
  return { props: { blogPost } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogPosts = await loadBlogPosts();
  const paths = blogPosts.map((blogPost) => ({
    params: { slug: blogPost.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

const Slug: FunctionComponent<ISlugProps> = ({ blogPost }) => (
  <BlogPost blogPost={blogPost} />
);

export default Slug;
