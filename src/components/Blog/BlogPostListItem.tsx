import { ListItem } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";

import { BlogPostData } from "../../lib/Blog";

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
