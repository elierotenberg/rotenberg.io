"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Code,
  Divider,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { Fragment } from "react";

import { Figure } from "../Figure";

import { Heading } from "./helpers/Heading";

import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";

const CodeBlock = dynamic(() => import(`../CodeBlock`));

const CODE_CLASS_NAME_LANG_PREFIX = `language-`;
const parseCodeClassNameAsLang = (className?: string): undefined | string => {
  if (className?.startsWith(CODE_CLASS_NAME_LANG_PREFIX)) {
    const tokens = className
      .slice(CODE_CLASS_NAME_LANG_PREFIX.length)
      .split(`\n`);
    return (
      tokens[tokens.length - 1].length === 0 ? tokens.slice(0, -1) : tokens
    ).join(`\n`);
  }
  return void 0;
};

export const components = {
  a: (props) => <Link {...(props as unknown as ComponentProps<typeof Link>)} />,
  code: ({ children = ``, className = `` }) => {
    if (typeof children === `string` && children.includes(`\n`)) {
      return (
        <CodeBlock lang={parseCodeClassNameAsLang(className)}>
          {children ?? ``}
        </CodeBlock>
      );
    }
    return <Code display={`inline`}>{children}</Code>;
  },
  h1: (props) => (
    <Fragment>
      <Heading as={`h2`} fontSize={`1.5em`} mt={4} {...props} />
      <Divider mb={3} mt={2} />
    </Fragment>
  ),
  h2: (props) => (
    <Fragment>
      <Heading as={`h2`} fontSize={`1.35em`} mt={4} {...props} />
      <Divider mb={3} mt={2} />
    </Fragment>
  ),
  h3: (props) => (
    <Heading as={`h4`} fontSize={`1.2em`} mb={1} mt={4} {...props} />
  ),
  h4: (props) => (
    <Heading as={`h5`} fontSize={`1.15em`} mb={1} mt={4} {...props} />
  ),
  img: (props) => <Figure maxHeight={320} objectFit={`contain`} {...props} />,
  inlineCode: (props) => <Code display={`inline`} {...props} />,
  li: (props) => <ListItem my={1} {...props} />,
  ol: OrderedList,
  p: (props) => (
    <Text
      as={`div`}
      lineHeight={1.5}
      my={4}
      sx={{ hyphens: `auto` }}
      textAlign={`justify`}
      {...props}
    />
  ),
  ul: (props) => <UnorderedList pl={2} {...props} />,
} satisfies Partial<MDXComponents>;
