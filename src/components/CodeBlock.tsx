"use client";

import React from "react";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

import type { FunctionComponent } from "react";

type CodeBlockProps = {
  readonly lang?: string;
  readonly children: string;
};

const CodeBlock: FunctionComponent<CodeBlockProps> = ({ children, lang }) => {
  return (
    <SyntaxHighlighter
      language={lang}
      showLineNumbers={true}
      style={vscDarkPlus}
      wrapLongLines={true}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
