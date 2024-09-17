import { MDXRemote } from "next-mdx-remote/rsc";

import { BlogPost } from "../../../../components/Blog/BlogPost";
import { components } from "../../../../components/MdxProvider/MdxProvider";
import { getBlogPost, getBlogPosts } from "../../../../lib/Blog.server";

import type { Metadata } from "next";
import type { ReactNode } from "react";

type PageProps = {
  readonly params: {
    readonly slug: string;
  };
};

const Page = async ({ params: { slug } }: PageProps): Promise<ReactNode> => {
  const blogPost = await getBlogPost(slug);
  return (
    <BlogPost metadata={blogPost.frontmatter}>
      <MDXRemote
        components={components}
        source={blogPost.compiledSource}
      ></MDXRemote>
    </BlogPost>
  );
};

export default Page;

export const generateStaticParams = async (): Promise<PageProps[]> => {
  const blogPosts = await getBlogPosts();
  return blogPosts.map((blogPost) => ({
    params: { slug: blogPost.frontmatter.slug },
  }));
};

export const generateMetadata = async ({
  params: { slug },
}: PageProps): Promise<Metadata> => {
  const blogPost = await getBlogPost(slug);
  return {
    abstract: blogPost.frontmatter.abstract,
    authors: [{ name: `Elie Rotenberg` }],
    keywords: blogPost.frontmatter.tags,
    openGraph: {
      images: [blogPost.frontmatter.cover],
      type: `article`,
    },
    robots: `index, follow`,
    title: blogPost.frontmatter.title,
    twitter: {
      creator: `@elierotenberg`,
      description: blogPost.frontmatter.abstract,
      images: [blogPost.frontmatter.cover],
      title: blogPost.frontmatter.title,
    },
  };
};
