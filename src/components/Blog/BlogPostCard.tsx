import { Box, Heading, Img, Text } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";

import { BlogPostData } from "../../lib/Blog";
import { Link } from "../Link";

interface IBlogPostCardProps {
  readonly blogPost: BlogPostData;
}

export const BlogPostCard: FunctionComponent<IBlogPostCardProps> = ({
  blogPost,
}) => (
  <Link
    href={`/b/p/${blogPost.slug}`}
    display="flex"
    flexDirection={[`column`, `row`]}
    alignItems="flex-start"
    justifyContent="center"
    my={4}
    borderLeft="2px solid"
    borderLeftColor="gray.300"
    p={2}
    pl={4}
    backgroundColor="gray.50"
    _hover={{
      textDecoration: `none`,
      backgroundColor: `gray.100`,
    }}
  >
    <Box>
      <Text fontSize={12} color="gray.600">
        {new Intl.DateTimeFormat(`en`, {
          month: `short`,
          year: `numeric`,
          day: `numeric`,
        }).format(new Date(blogPost.date))}
        {` `}
      </Text>
      <Heading as="h2" size="md" _hover={{ textDecoration: `underline` }}>
        {blogPost.title}
      </Heading>
      <Text fontSize={14} color="gray.600">
        {blogPost.abstract}
      </Text>
      <Text fontSize={12} color="gray.400">
        {blogPost.tags.join(`, `)}
      </Text>
    </Box>
    <Img
      mt={[4, 0]}
      ml={[0, 4]}
      src={blogPost.cover}
      h={180}
      w={180}
      objectFit="contain"
    />
  </Link>
);
