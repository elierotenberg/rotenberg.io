import { Box, Heading, Text, VStack } from "@chakra-ui/core";
import React, { FunctionComponent, ReactElement, ReactNode } from "react";

interface IPositionItemProps {
  readonly children: ReactNode;
  readonly date?: ReactNode;
  readonly description?: ReactElement;
}

export const PositionItem: FunctionComponent<IPositionItemProps> = (props) => (
  <VStack
    alignItems="flex-start"
    spacing={1}
    borderLeft="2px solid"
    borderLeftColor="gray.300"
    pl={2}
    pb={1}
    background="gray.50"
  >
    <Heading as="h3" fontWeight="600" size="sm">
      {props.children}
    </Heading>
    {(props.date || props.description) && (
      <Box pl={2}>
        {props.date && (
          <Text fontStyle="italic" fontSize="xs">
            {props.date}
          </Text>
        )}
        {props.description}
      </Box>
    )}
  </VStack>
);
