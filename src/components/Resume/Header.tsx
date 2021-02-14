import {
  Avatar,
  Heading,
  HStack,
  Text,
  VisuallyHidden,
  VStack,
  Icon,
} from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import {
  FaRegEnvelope,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaLink,
} from "react-icons/fa";

import { Link } from "../Link";

export const Header: FunctionComponent = () => {
  return (
    <HStack spacing={4} w="100%" justify="center">
      <Avatar src="/elie-rotenberg.png" title="Elie Rotenberg" size="xl" />
      <VStack alignItems="flex-start" spacing={3}>
        <Heading as="h1">Elie Rotenberg</Heading>
        <Text>Entrepreneur, computer scientist, lifelong learner</Text>
        <HStack>
          <Link href="mailto:elie@rotenberg.io" isExternal>
            <VisuallyHidden>Contact me by mail</VisuallyHidden>
            <Icon as={FaRegEnvelope} />
          </Link>
          <Link href="https://github.com/elierotenberg" isExternal>
            <VisuallyHidden>Github</VisuallyHidden>
            <Icon as={FaGithub} />
          </Link>
          <Link href="https://twitter.com/elierotenberg" isExternal>
            <VisuallyHidden>Twitter</VisuallyHidden>
            <Icon as={FaTwitter} />
          </Link>
          <Link
            href="https://www.linkedin.com/pub/elie-rotenberg/1a/271/348"
            isExternal
          >
            <VisuallyHidden>LinkedIn</VisuallyHidden>
            <Icon as={FaLinkedin} />
          </Link>
          <Link href="https://elie.rotenberg.io" isExternal>
            <VisuallyHidden>Homepage</VisuallyHidden>
            <Icon as={FaLink} />
          </Link>
        </HStack>
      </VStack>
    </HStack>
  );
};
