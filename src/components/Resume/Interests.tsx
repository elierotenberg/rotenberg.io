"use client";

import { HStack, Heading, VStack } from "@chakra-ui/react";
import React from "react";

import { TagList } from "../TagList";

import type { FunctionComponent } from "react";

const interests = [
  `biology`,
  `business models`,
  `cognition`,
  `complex systems`,
  `computer science`,
  `education`,
  `evolution`,
  `gaming`,
  `learning`,
  `machine learning`,
  `maths`,
  `mental health`,
  `psychology`,
  `react`,
  `software engineering`,
  `sustainable development`,
  `typescript`,
];

export const Interests: FunctionComponent = () => (
  <VStack alignItems={`flex-start`} spacing={2}>
    <Heading as={`h2`} size={`md`}>
      {`Interests`}
    </Heading>
    <TagList pl={4} tags={interests} />
    <HStack style={{ maxWidth: `100%` }}></HStack>
  </VStack>
);
