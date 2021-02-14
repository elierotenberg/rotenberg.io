import { Heading, List, ListItem, VStack } from "@chakra-ui/react";
import React, { Children, FunctionComponent, ReactNode } from "react";

interface IPositionListProps {
  readonly title: ReactNode;
  readonly children: ReactNode;
}

export const PositionList: FunctionComponent<IPositionListProps> = (props) => (
  <VStack alignItems="flex-start" spacing={2}>
    <Heading as="h2" size="md">
      {props.title}
    </Heading>
    <List spacing={2} pl={4} w="100%">
      {Children.map(props.children, (child, key) => (
        <ListItem key={key}>{child}</ListItem>
      ))}
    </List>
  </VStack>
);
