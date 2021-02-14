import { Heading, HStack, VStack } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";

import { TagList } from "../TagList";

const interests = [
  "biology",
  "business models",
  "cognition",
  "complex systems",
  "computer science",
  "education",
  "evolution",
  "gaming",
  "machine learning",
  "maths",
  "psychology",
  "react",
  "software engineering",
  "typescript",
];

export const Interests: FunctionComponent = () => (
  <VStack alignItems="flex-start" spacing={2}>
    <Heading as="h2" size="md">
      Interests
    </Heading>
    <TagList tags={interests} pl={4} />
    <HStack style={{ maxWidth: "100%" }}></HStack>
  </VStack>
);
