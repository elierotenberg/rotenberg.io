/* eslint-disable quotes */
declare module "*.mdx" {
  export const data: unknown;
  const MdxComponent: (props: unknown) => JSX.Element;
  export default MdxComponent;
}

declare module "@mdx-js/react" {
  import * as React from "react";
  type ComponentKey =
    | "a"
    | "blockquote"
    | "code"
    | "del"
    | "em"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "hr"
    | "img"
    | "inlineCode"
    | "li"
    | "ol"
    | "p"
    | "pre"
    | "strong"
    | "sup"
    | "table"
    | "td"
    | "thematicBreak"
    | "tr"
    | "ul"
    | "wrapper";
  type ComponentProps = {
    readonly [key: string]: string | undefined;
  };
  type Component = React.ComponentType<ComponentProps>;
  export type Components = {
    readonly [key in ComponentKey]?: Component;
  } & {
    readonly [key: string]: Component | undefined;
  };
  export type MDXProviderProps = {
    children: React.ReactNode;
    components: Components;
  };
  export class MDXProvider extends React.Component<MDXProviderProps> {}
}
