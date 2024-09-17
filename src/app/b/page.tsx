import { BlogPostList } from "../../components/Blog/BlogPostList";
import { getBlogPosts } from "../../lib/Blog.server";

import type { Metadata } from "next";
import type { ReactNode } from "react";

const Page = async (): Promise<ReactNode> => {
  const blogPosts = await getBlogPosts();

  return (
    <BlogPostList>
      {blogPosts.map(({ frontmatter }) => frontmatter)}
    </BlogPostList>
  );
};

export default Page;

export const metadata: Metadata = {
  robots: `index, follow`,
  title: `Blog posts`,
};
