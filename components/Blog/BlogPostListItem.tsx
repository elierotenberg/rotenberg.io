import { ListItem } from "@chakra-ui/core";
import React, { FunctionComponent } from "react";

import { IBlogPostData } from "../../lib/Blog";

import { BlogPostCard } from "./BlogPostCard";

interface IBlogPostListItemProps {
  readonly blogPost: IBlogPostData;
}

interface IBlogPostListItemProps {
  readonly blogPost: IBlogPostData;
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
