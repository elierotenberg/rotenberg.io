"use client";

import { Tag as ChakraTag, List, ListItem } from "@chakra-ui/react";
import React from "react";

import type { ListProps, TagProps } from "@chakra-ui/react";
import type { FunctionComponent } from "react";

type TagListProps = {
  readonly tags: string[];
  readonly tagProps?: TagProps;
} & Omit<ListProps, `children`>;

export const TagList: FunctionComponent<TagListProps> = ({
  tagProps,
  tags,
  ...props
}) => (
  <List
    alignItems={`center`}
    display={`flex`}
    flexDirection={`row`}
    flexWrap={`wrap`}
    {...props}
  >
    {tags.map((tag, key) => (
      <ListItem key={key} m={1}>
        <ChakraTag whiteSpace={`nowrap`} {...tagProps}>
          {tag}
        </ChakraTag>
      </ListItem>
    ))}
  </List>
);
