// Courtesy of https://github.com/chakra-ui/chakra-ui/blob/develop/examples/nextjs-typescript/components/NextChakraLink.tsx

import type { ElementType, FunctionComponent, PropsWithChildren } from "react";
import React from "react";
import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/dist/client/link";
import type { LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";

export type NextChakraLinkProps = PropsWithChildren<
  NextLinkProps & Omit<ChakraLinkProps, `as`>
> & {
  readonly elementType?: ElementType;
};

//  Has to be a new component because both chakra and next share the `as` keyword
export const Link: FunctionComponent<NextChakraLinkProps> = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  elementType,
  ...chakraProps
}: NextChakraLinkProps) => {
  return (
    <NextLink
      passHref={true}
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
    >
      <ChakraLink as={elementType} {...chakraProps}>
        {children}
      </ChakraLink>
    </NextLink>
  );
};
