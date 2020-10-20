import React, { FunctionComponent } from "react";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface ICodeProps {
  readonly language: string;
  readonly value: string;
}

export const Code: FunctionComponent<ICodeProps> = ({ language, value }) => {
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
