import { Heading, HStack, VStack } from "@chakra-ui/react";
import type { FunctionComponent } from "react";
import React from "react";

import { TagList } from "../TagList";

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
  <VStack alignItems="flex-start" spacing={2}>
    <Heading as="h2" size="md">
      Interests
    </Heading>
    <TagList tags={interests} pl={4} />
    <HStack style={{ maxWidth: `100%` }}></HStack>
  </VStack>
);
