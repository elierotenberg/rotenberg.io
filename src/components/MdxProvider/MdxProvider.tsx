import type { ComponentProps, FunctionComponent, ReactNode } from "react";
import React, { Fragment } from "react";
import type { Components } from "@mdx-js/react";
import { MDXProvider as BaseMdxProvider } from "@mdx-js/react";
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

const components: Components = {
  code: ({ children = ``, className = `` }) => {
    if (children.includes(`\n`)) {
      return (
        <CodeBlock lang={parseCodeClassNameAsLang(className)}>
          {children ?? ``}
        </CodeBlock>
      );
    }
    return <Code display={`inline`}>{children}</Code>;
  },
  inlineCode: (props) => <Code display={`inline`} {...props} />,
  a: (props) => <Link {...(props as unknown as ComponentProps<typeof Link>)} />,
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
  p: (props) => (
    <Text
      as="div"
      textAlign="justify"
      sx={{ hyphens: `auto` }}
      my={4}
      lineHeight={1.5}
      {...props}
    />
  ),
};

export const MdxProvider: FunctionComponent<{
  readonly children?: ReactNode;
}> = ({ children }) => (
  <BaseMdxProvider components={components}>{children}</BaseMdxProvider>
);
