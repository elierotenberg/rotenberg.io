import React, { FunctionComponent, ReactElement } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";

import { Link as AppLink } from "../../Link";

export interface ILinkProps {
  readonly href: string;
  readonly children: ReactElement;
}

export const Link: FunctionComponent<ILinkProps> = ({ href, children }) => {
  if (href.startsWith(`#`)) {
    return <ChakraLink href={href}>{children}</ChakraLink>;
  }
  return (
    <AppLink href={href} isExternal={/^\w*\:\/\//.test(href)}>
      {children}
    </AppLink>
  );
};
