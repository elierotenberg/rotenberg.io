import { List } from "@chakra-ui/core";
import React, { FunctionComponent, useMemo } from "react";

import { IBlogPostData } from "../../lib/Blog";
import { Page } from "../Page";

import { BlogPostListItem } from "./BlogPostListItem";

interface IBlogPostListProps {
  readonly children: IBlogPostData[];
}

export const BlogPostList: FunctionComponent<IBlogPostListProps> = ({
  children,
}) => {
  const sortedBlogPosts = useMemo(
    () => children.sort((a, b) => b.date - a.date),
    [children],
  );
  return (
    <Page withNavBar={true} withFooter={true} title="Blog" lang="en">
      <List spacing={2}>
        {sortedBlogPosts.map((blogPost) => (
          <BlogPostListItem key={blogPost.slug} blogPost={blogPost} />
        ))}
      </List>
    </Page>
  );
};
