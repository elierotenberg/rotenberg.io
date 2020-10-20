import { Container, List } from "@chakra-ui/core";
import React, { FunctionComponent, useMemo } from "react";

import { IBlogPostData } from "../../lib/Blog";

import { BlogPostListItem } from "./BlogPostListItem";

interface IBlogPostListProps {
  readonly children: IBlogPostData[];
}

export const BlogPostList: FunctionComponent<IBlogPostListProps> = ({
  children,
}) => {
  const sortedBlogPosts = useMemo(
    () => children.sort((a, b) => a.date - b.date),
    [children],
  );
  return (
    <Container p={4} maxWidth="80ch">
      <List spacing={2}>
        {sortedBlogPosts.map((blogPost) => (
          <BlogPostListItem key={blogPost.slug} blogPost={blogPost} />
        ))}
      </List>
    </Container>
  );
};
