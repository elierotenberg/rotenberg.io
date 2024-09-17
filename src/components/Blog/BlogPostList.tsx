import { List } from "@chakra-ui/react";
import React, { useMemo } from "react";

import { BlogPostListItem } from "./BlogPostListItem";

import type { BlogPostMetadata } from "../../lib/Blog";
import type { FunctionComponent } from "react";

type IBlogPostListProps = {
  readonly children: BlogPostMetadata[];
};

export const BlogPostList: FunctionComponent<IBlogPostListProps> = ({
  children,
}) => {
  const sortedBlogPosts = useMemo(
    () => children.sort((a, b) => b.date.getTime() - a.date.getTime()),
    [children],
  );
  return (
    <List spacing={2}>
      {sortedBlogPosts.map((blogPost) => (
        <BlogPostListItem blogPost={blogPost} key={blogPost.slug} />
      ))}
    </List>
  );
};
