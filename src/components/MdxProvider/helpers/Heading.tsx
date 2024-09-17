"use client";

import { Link } from "@chakra-ui/next-js";
import { Heading as ChakraHeading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { Fragment, useMemo } from "react";

import type { HeadingProps } from "@chakra-ui/react";
import type { FunctionComponent, ReactElement } from "react";

export const Heading: FunctionComponent<HeadingProps> = ({
  children,
  id,
  ...props
}) => {
  const { asPath } = useRouter();
  const nextChildren = useMemo((): ReactElement => {
    if (id) {
      return (
        <Link href={asPath.replace(/\#.*$/, ``) + `#${id}`} id={id}>
          {children}
        </Link>
      );
    }
    return <Fragment>{`children`}</Fragment>;
  }, [children, id]);
  return (
    <ChakraHeading id={id} {...props}>
      {nextChildren}
    </ChakraHeading>
  );
};
