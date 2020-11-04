import { GetStaticProps } from "next";
import React, { FunctionComponent } from "react";

import { BlogPostList } from "../../components/Blog/BlogPostList";
import { IBlogPostData, loadBlogPosts } from "../../lib/Blog";

interface IIndexProps {
  readonly blogPosts: IBlogPostData[];
}

export const getStaticProps: GetStaticProps<IIndexProps> = async () => {
  const blogPosts = await loadBlogPosts();
  return { props: { blogPosts } };
};

const Index: FunctionComponent<IIndexProps> = (props) => (
  <BlogPostList>{props.blogPosts}</BlogPostList>
);

export default Index;
