"use client";

import { Link } from "@chakra-ui/next-js";
import { Box, Heading, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React from "react";

import { translations } from "../../lib/translations";
import { TagList } from "../TagList";

import type { BlogPostMetadata } from "../../lib/Blog";
import type { FunctionComponent, ReactNode } from "react";

type BlogPostProps = {
  readonly metadata: BlogPostMetadata;
  readonly children: ReactNode;
};

export const BlogPost: FunctionComponent<BlogPostProps> = ({
  children,
  metadata,
}) => {
  const path = usePathname();
  return (
    <Box as={`article`}>
      <Heading as={`h1`} fontSize={28} mb={2} mt={4}>
        <Link href={path.replace(/\#.*$/, ``)}>{metadata.title}</Link>
      </Heading>
      <Text fontSize={14} fontStyle={`italic`} mb={2} mt={2}>
        {translations.blog.publishedOn[metadata.lang === `fr` ? `fr` : `en`](
          metadata.date,
        )}
      </Text>
      <TagList mb={4} tags={metadata.tags} />
      {children}
    </Box>
  );
};
