import { GetStaticProps } from "next";
import Head from "next/head";
import React, { FunctionComponent } from "react";

import { BlogPostList } from "../../components/Blog/BlogPostList";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { IBlogPostData, loadBlogPosts } from "../../lib/Blog";
import { useCanonicalUrl } from "../../lib/url";

interface IIndexProps {
  readonly children: IBlogPostData[];
}

export const getStaticProps: GetStaticProps<IIndexProps> = async () => {
  const blogPosts = await loadBlogPosts();
  return { props: { children: blogPosts } };
};

const Index: FunctionComponent<IIndexProps> = (props) => {
  const link = useCanonicalUrl();
  return (
    <>
      <Head>
        <title>Blog posts</title>
        {link}
      </Head>
      <NavBar />
      <BlogPostList>{props.children}</BlogPostList>
      <Footer />
    </>
  );
};

export default Index;
