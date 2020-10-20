import {
  List,
  ListItem,
  ListProps,
  Tag as ChakraTag,
  TagProps,
} from "@chakra-ui/core";
import React, { FunctionComponent } from "react";

import { Tag } from "../lib/Tag";

interface ITagListProps extends Omit<ListProps, "children"> {
  readonly tags: Tag[];
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
        <ChakraTag
          whiteSpace="nowrap"
          colorScheme={typeof tag === "string" ? undefined : tag.color}
          {...tagProps}
        >
          {typeof tag === "string" ? tag : tag.label}
        </ChakraTag>
      </ListItem>
    ))}
  </List>
);
