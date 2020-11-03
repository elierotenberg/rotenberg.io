import { GetStaticPaths, GetStaticProps } from "next";
import React, { FunctionComponent } from "react";
import Head from "next/head";

import { IBlogPostData, loadBlogPosts } from "../../../lib/Blog";
import { BlogPost } from "../../../components/Blog/BlogPost";
import { useCanonicalUrl } from "../../../lib/url";
import { NavBar } from "../../../components/NavBar";
import { Footer } from "../../../components/Footer";

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

const Slug: FunctionComponent<ISlugProps> = ({ blogPost }) => {
  const link = useCanonicalUrl();
  return (
    <>
      <Head>
        <title>{blogPost.title}</title>
        {link}
      </Head>
      <NavBar />
      <BlogPost blogPost={blogPost} />
      <Footer />
    </>
  );
};

export default Slug;
