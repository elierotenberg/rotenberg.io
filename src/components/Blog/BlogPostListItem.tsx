import { ListItem } from "@chakra-ui/react";
import React from "react";

import { BlogPostCard } from "./BlogPostCard";

import type { BlogPostData } from "../../lib/Blog";
import type { FunctionComponent } from "react";

type IBlogPostListItemProps = {
  readonly blogPost: BlogPostData;
};

type IBlogPostListItemProps = {
  readonly blogPost: BlogPostData;
};

export const BlogPostListItem: FunctionComponent<IBlogPostListItemProps> = ({
  blogPost,
}) => {
  return (
    <ListItem as={`article`}>
      <BlogPostCard blogPost={blogPost} />
    </ListItem>
  );
};
