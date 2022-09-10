import {
  Avatar,
  Heading,
  Text,
  VisuallyHidden,
  Icon,
  Flex,
} from "@chakra-ui/react";
import type { FunctionComponent } from "react";
import React from "react";
import type { IconType } from "react-icons";
import {
  FaRegEnvelope,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaLink,
} from "react-icons/fa";

import { Link } from "../Link";

const HeaderLink: FunctionComponent<{
  href: string;
  children: string;
  icon: IconType;
}> = ({ href, children, icon }) => {
  const url = new URL(href);
  return (
    <Link
      href={href}
      isExternal
      display={`inline-flex`}
      alignItems="center"
      gap={2}
    >
      <VisuallyHidden>{children}</VisuallyHidden>
      <Icon as={icon} />
      <Text
        display={`none`}
        sx={{
          "@media print": {
            display: `inline`,
            fontSize: `sm`,
          },
        }}
      >
        {url.href
          .slice(url.protocol.length)
          .replace(/^\/*/, ``)
          .replace(/\/*$/, ``)}
      </Text>
    </Link>
  );
};

export const Header: FunctionComponent = () => {
  return (
    <Flex flexDirection={`column`} gap={4}>
      <Flex flexDirection={`row`} gap={6} w="100%">
        <Avatar src="/elie-rotenberg.png" title="Elie Rotenberg" size="xl" />
        <Flex flexDirection={`column`}>
          <Heading as="h1">Elie Rotenberg</Heading>
          <Text>Entrepreneur, computer scientist, lifelong learner</Text>
        </Flex>
      </Flex>
      <Flex
        flexDirection={`row`}
        alignItems="center"
        gap={1}
        pl={4}
        sx={{
          "@media print": {
            alignItems: `flex-start`,
            flexDirection: `column`,
          },
        }}
      >
        <HeaderLink href="mailto:elie@rotenberg.io" icon={FaRegEnvelope}>
          Email
        </HeaderLink>
        <HeaderLink href="https://github.com/elierotenberg" icon={FaGithub}>
          Github
        </HeaderLink>
        <HeaderLink href="https://twitter.com/elierotenberg" icon={FaTwitter}>
          Twitter
        </HeaderLink>
        <HeaderLink
          href="https://linkedin.com/in/elierotenberg"
          icon={FaLinkedin}
        >
          LinkedIn
        </HeaderLink>
        <HeaderLink href="https://rotenberg.io" icon={FaLink}>
          Homepage
        </HeaderLink>
      </Flex>
    </Flex>
  );
};
