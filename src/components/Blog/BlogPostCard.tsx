import { Box, Heading, Img, Text } from "@chakra-ui/react";
import React from "react";

import { Link } from "../Link";

import type { BlogPostData } from "../../lib/Blog";
import type { FunctionComponent } from "react";

type IBlogPostCardProps = {
  readonly blogPost: BlogPostData;
};

export const BlogPostCard: FunctionComponent<IBlogPostCardProps> = ({
  blogPost,
}) => (
  <Link
    _hover={{
      backgroundColor: `gray.100`,
      textDecoration: `none`,
    }}
    alignItems={`flex-start`}
    backgroundColor={`gray.50`}
    borderLeft={`2px solid`}
    borderLeftColor={`gray.300`}
    display={`flex`}
    flexDirection={[`column`, `row`]}
    href={`/b/p/${blogPost.slug}`}
    justifyContent={`center`}
    my={4}
    p={2}
    pl={4}
  >
    <Box>
      <Text color={`gray.600`} fontSize={12}>
        {new Intl.DateTimeFormat(`en`, {
          day: `numeric`,
          month: `short`,
          year: `numeric`,
        }).format(new Date(blogPost.date))}
        {` `}
      </Text>
      <Heading _hover={{ textDecoration: `underline` }} as={`h2`} size={`md`}>
        {blogPost.title}
      </Heading>
      <Text color={`gray.600`} fontSize={14}>
        {blogPost.abstract}
      </Text>
      <Text color={`gray.400`} fontSize={12}>
        {blogPost.tags.join(`, `)}
      </Text>
    </Box>
    <Img
      h={180}
      ml={[0, 4]}
      mt={[4, 0]}
      objectFit={`contain`}
      src={blogPost.cover}
      w={180}
    />
  </Link>
);
