import React, { FunctionComponent, useMemo } from "react";
import ReactMarkdown, { ReactMarkdownPropsBase } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";
import classNames from "classnames";

import { CodeBlock } from "../CodeBlock";
import { Figure } from "../Figure";

import styles from "./Markdown.module.css";
import { Link } from "./helpers/Link";
import { Heading } from "./helpers/Heading";

import "github-markdown-css";

interface IMarkdownProps {
  readonly content: string;
  readonly headingOffset?: number;
}

export const Markdown: FunctionComponent<IMarkdownProps> = ({
  content,
  headingOffset,
}) => {
  const reactMarkdownProps = useMemo(
    (): ReactMarkdownPropsBase => ({
      className: classNames("markdown-body", styles.markdown),
      renderers: {
        code: CodeBlock,
        heading: (props) => <Heading offset={headingOffset} {...props} />,
        link: Link,
        image: (props) => (
          <Figure maxHeight={320} objectFit="contain" {...props} />
        ),
      },
      plugins: [remarkGfm, [remarkToc, { tight: true }], remarkSlug],
    }),
    [headingOffset],
  );
  return (
    <ReactMarkdown allowDangerousHtml={true} {...reactMarkdownProps}>
      {content}
    </ReactMarkdown>
  );
};
