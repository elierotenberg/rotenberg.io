"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Avatar,
  Flex,
  Heading,
  Icon,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import React from "react";
import {
  FaGithub,
  FaLink,
  FaLinkedin,
  FaRegEnvelope,
  FaTwitter,
} from "react-icons/fa";

import portrait from "./elie-rotenberg.png";

import type { FunctionComponent } from "react";
import type { IconType } from "react-icons";

const HeaderLink: FunctionComponent<{
  readonly href: string;
  readonly children: string;
  readonly icon: IconType;
}> = ({ children, href, icon }) => {
  const url = new URL(href);
  return (
    <Link
      alignItems={`center`}
      display={`inline-flex`}
      gap={2}
      href={href}
      isExternal
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
      <Flex flexDirection={`row`} gap={6} w={`100%`}>
        <Avatar size={`xl`} src={portrait.src} title={`Elie Rotenberg`} />
        <Flex flexDirection={`column`}>
          <Heading as={`h1`}>{`Elie Rotenberg`}</Heading>
          <Text>{`Entrepreneur, computer scientist, lifelong learner`}</Text>
        </Flex>
      </Flex>
      <Flex
        alignItems={`center`}
        flexDirection={`row`}
        gap={1}
        pl={4}
        sx={{
          "@media print": {
            alignItems: `flex-start`,
            flexDirection: `column`,
          },
        }}
      >
        <HeaderLink href={`mailto:elie@rotenberg.io`} icon={FaRegEnvelope}>
          {`Email`}
        </HeaderLink>
        <HeaderLink href={`https://github.com/elierotenberg`} icon={FaGithub}>
          {`Github`}
        </HeaderLink>
        <HeaderLink href={`https://twitter.com/elierotenberg`} icon={FaTwitter}>
          {`Twitter`}
        </HeaderLink>
        <HeaderLink
          href={`https://linkedin.com/in/elierotenberg`}
          icon={FaLinkedin}
        >
          {`LinkedIn`}
        </HeaderLink>
        <HeaderLink href={`https://rotenberg.io`} icon={FaLink}>
          {`Homepage`}
        </HeaderLink>
      </Flex>
    </Flex>
  );
};
