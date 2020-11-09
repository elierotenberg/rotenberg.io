import React, { FunctionComponent } from "react";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface ICodeBlockProps {
  readonly language: string;
  readonly value: string;
}

export const CodeBlock: FunctionComponent<ICodeBlockProps> = ({
  language,
  value,
}) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      wrapLongLines={true}
      showLineNumbers={true}
    >
      {value}
    </SyntaxHighlighter>
  );
};
