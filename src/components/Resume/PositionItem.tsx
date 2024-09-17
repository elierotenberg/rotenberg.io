"use client";

import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

import type { FunctionComponent, ReactElement, ReactNode } from "react";

type PositionItemProps = {
  readonly children: ReactNode;
  readonly date?: ReactNode;
  readonly description?: ReactElement;
};

export const PositionItem: FunctionComponent<PositionItemProps> = (props) => (
  <VStack
    alignItems={`flex-start`}
    background={`gray.50`}
    borderLeft={`2px solid`}
    borderLeftColor={`gray.300`}
    pb={2}
    pl={3}
    pt={1}
    spacing={1}
  >
    <Heading as={`h3`} fontWeight={`600`} size={`sm`}>
      {props.children}
    </Heading>
    {(props.date || props.description) && (
      <Box fontSize={`sm`} pl={2}>
        {props.date && (
          <Text fontSize={`xs`} fontStyle={`italic`}>
            {props.date}
          </Text>
        )}
        {props.description}
      </Box>
    )}
  </VStack>
);
