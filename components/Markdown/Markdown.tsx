import React, { FunctionComponent, useMemo } from "react";
import ReactMarkdown, { ReactMarkdownPropsBase } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";

import "github-markdown-css";

import { Link } from "./helpers/Link";
import { Code } from "./helpers/Code";
import { Heading } from "./helpers/Heading";

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
      className: "markdown-body",
      renderers: {
        code: Code,
        heading: (props) => <Heading offset={headingOffset} {...props} />,
        link: Link,
      },
      plugins: [remarkGfm, remarkToc, remarkSlug],
    }),
    [headingOffset],
  );
  return (
    <ReactMarkdown allowDangerousHtml={true} {...reactMarkdownProps}>
      {content}
    </ReactMarkdown>
  );
};
