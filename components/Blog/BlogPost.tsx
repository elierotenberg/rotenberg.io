import { Container, Heading, Text } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";

import { IBlogPostData } from "../../lib/Blog";
import { Link } from "../Link";
import { Markdown } from "../Markdown/Markdown";
import { TagList } from "../TagList";

interface IBlogPostProps {
  readonly blogPost: IBlogPostData;
}

export const BlogPost: FunctionComponent<IBlogPostProps> = ({ blogPost }) => {
  const { asPath } = useRouter();
  return (
    <Container p={4} maxWidth="80ch" as="article">
      <Heading as="h1" fontSize={28} mb={2}>
        <Link href={asPath.replace(/\#.*$/, "")}>{blogPost.title}</Link>
      </Heading>
      <TagList tags={blogPost.tags} />
      <Text fontSize={14} mt={2} mb={4} fontStyle="italic">
        Published on {new Date(blogPost.date).toLocaleDateString()}
      </Text>
      <Markdown content={blogPost.content} headingOffset={1} />
    </Container>
  );
};
