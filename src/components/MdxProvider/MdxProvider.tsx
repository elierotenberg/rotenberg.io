import * as t from "typed-assert";
import React, { ComponentProps, Fragment, FunctionComponent } from "react";
import { MDXProvider as BaseMdxProvider, Components } from "@mdx-js/react";
import {
  Code,
  Divider,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";

import { Figure } from "../Figure";

import { Heading } from "./helpers/Heading";
import { Link } from "./helpers/Link";

const CodeBlock = dynamic(() => import("../CodeBlock"));

const components: Components = {
  code: ({ children, className }) => {
    t.isString(children);
    t.isString(className);
    const tokens = className.slice("language-".length).split("\n");
    const lang = (tokens[tokens.length - 1].length === 0
      ? tokens.slice(0, -1)
      : tokens
    ).join("\n");
    return <CodeBlock lang={lang}>{children}</CodeBlock>;
  },
  inlineCode: (props) => <Code {...props} />,
  a: (props) => (
    <Link {...((props as unknown) as ComponentProps<typeof Link>)} />
  ),
  h1: (props) => (
    <Fragment>
      <Heading as="h2" mt={4} fontSize="1.5em" {...props} />
      <Divider mt={2} mb={3} />
    </Fragment>
  ),
  h2: (props) => (
    <Fragment>
      <Heading as="h2" mt={4} fontSize="1.35em" {...props} />
      <Divider mt={2} mb={3} />
    </Fragment>
  ),
  h3: (props) => <Heading as="h4" mt={4} mb={1} fontSize="1.2em" {...props} />,
  h4: (props) => <Heading as="h5" mt={4} mb={1} fontSize="1.15em" {...props} />,
  ul: (props) => <UnorderedList pl={2} {...props} />,
  ol: OrderedList,
  li: (props) => <ListItem my={1} {...props} />,
  img: (props) => <Figure maxHeight={320} objectFit="contain" {...props} />,
  p: (props) => <Text textAlign="justify" my={4} lineHeight={1.5} {...props} />,
};

export const MdxProvider: FunctionComponent = ({ children }) => (
  <BaseMdxProvider components={components}>{children}</BaseMdxProvider>
);
