import type { ListProps, TagProps } from "@chakra-ui/react";
import { List, ListItem, Tag as ChakraTag } from "@chakra-ui/react";
import type { FunctionComponent } from "react";
import React from "react";

interface ITagListProps extends Omit<ListProps, `children`> {
  readonly tags: string[];
  readonly tagProps?: TagProps;
}

export const TagList: FunctionComponent<ITagListProps> = ({
  tags,
  tagProps,
  ...props
}) => (
  <List
    display="flex"
    flexDirection="row"
    flexWrap="wrap"
    alignItems="center"
    {...props}
  >
    {tags.map((tag, key) => (
      <ListItem key={key} m={1}>
        <ChakraTag whiteSpace="nowrap" {...tagProps}>
          {tag}
        </ChakraTag>
      </ListItem>
    ))}
  </List>
);
