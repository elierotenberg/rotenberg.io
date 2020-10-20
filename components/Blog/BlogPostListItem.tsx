import { ListItem, Heading, Text, Box } from "@chakra-ui/core";
import React, { FunctionComponent } from "react";

import { IBlogPostData } from "../../lib/Blog";
import { Link } from "../Link";
import { TagList } from "../TagList";

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
      <Link href={`/b/p/${blogPost.slug}`}>
        <Heading as="h2" size="md">
          {blogPost.title}
        </Heading>
      </Link>
      <Box pl={2}>
        <TagList tags={blogPost.tags} tagProps={{ size: "sm", padding: 1 }} />
        <Text fontSize={12} fontStyle="italic">
          {new Date(blogPost.date).toLocaleDateString()}
        </Text>
      </Box>
    </ListItem>
  );
};
