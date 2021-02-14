import React, { FunctionComponent } from "react";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

type CodeBlockProps = {
  readonly lang: string;
  readonly children: string;
};

const CodeBlock: FunctionComponent<CodeBlockProps> = ({ lang, children }) => {
  return (
    <SyntaxHighlighter
      language={lang}
      style={vscDarkPlus}
      wrapLongLines={true}
      showLineNumbers={true}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
