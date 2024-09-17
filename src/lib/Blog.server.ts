import { glob, readFile } from "fs/promises";

import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";

import { BlogPostMetadata } from "./Blog";

import type { BlogPost } from "./Blog";

export const getBlogPosts = async () => {
  const blogPosts: BlogPost[] = [];
  for await (const path of glob(`src/posts/**/*.mdx`)) {
    const source = await readFile(path, `utf-8`);
    const mdxSource = await serialize(source, {
      mdxOptions: {
        rehypePlugins: [rehypeSlug],
        remarkPlugins: [[remarkToc, { tight: true }]],
      },
      parseFrontmatter: true,
    });
    const frontmatter = BlogPostMetadata.parse(mdxSource.frontmatter);
    blogPosts.push({ ...mdxSource, frontmatter });
  }
  return blogPosts;
};

export const getBlogPost = async (slug: string) => {
  const blogPosts = await getBlogPosts();
  const blogPost = blogPosts.find(
    (blogPost) => blogPost.frontmatter.slug === slug,
  );
  if (!blogPost) {
    throw new Error(`Blog post not found: ${slug}`);
  }
  return blogPost;
};
