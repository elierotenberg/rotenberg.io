import { Heading, List, ListItem, VStack } from "@chakra-ui/react";
import React, { Children } from "react";

import type { FunctionComponent, ReactNode } from "react";

type IPositionListProps = {
  readonly title: ReactNode;
  readonly children: ReactNode;
};

export const PositionList: FunctionComponent<IPositionListProps> = (props) => (
  <VStack alignItems={`flex-start`} spacing={2}>
    <Heading as={`h2`} size={`md`}>
      {props.title}
    </Heading>
    <List pl={4} spacing={2} w={`100%`}>
      {Children.map(props.children, (child, key) => (
        <ListItem key={key}>{child}</ListItem>
      ))}
    </List>
  </VStack>
);
