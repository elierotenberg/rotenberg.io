import { ListItem } from "@chakra-ui/react";
import type { FunctionComponent } from "react";
import React from "react";

import type { BlogPostData } from "../../lib/Blog";

import { BlogPostCard } from "./BlogPostCard";

interface IBlogPostListItemProps {
  readonly blogPost: BlogPostData;
}

interface IBlogPostListItemProps {
  readonly blogPost: BlogPostData;
}

export const BlogPostListItem: FunctionComponent<IBlogPostListItemProps> = ({
  blogPost,
}) => {
  return (
    <ListItem as="article">
      <BlogPostCard blogPost={blogPost} />
    </ListItem>
  );
};
