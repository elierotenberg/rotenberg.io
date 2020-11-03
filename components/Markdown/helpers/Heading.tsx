import React, {
  ElementType,
  FunctionComponent,
  ReactElement,
  useMemo,
} from "react";
import { Heading as ChakraHeading } from "@chakra-ui/core";
import { useRouter } from "next/router";

import { Link } from "../../Link";

interface IHeadingProps {
  readonly offset?: number;
  readonly level: number;
  readonly children: ReactElement;
  readonly node: {
    readonly data: {
      readonly id?: string;
    };
  };
}

export const Heading: FunctionComponent<IHeadingProps> = ({
  level,
  offset = 0,
  children,
  node: {
    data: { id },
  },
}) => {
  const { asPath } = useRouter();
  const offsetLevel = level + offset;
  const elementType = useMemo(
    (): ElementType =>
      Number.isInteger(offsetLevel) && offsetLevel > 0 && offsetLevel <= 6
        ? (`h${offsetLevel}` as ElementType)
        : "div",
    [level],
  );
  const nextChildren = useMemo((): ReactElement => {
    if (id) {
      return (
        <Link id={id} href={asPath.replace(/\#.*$/, "") + `#${id}`}>
          {children}
        </Link>
      );
    }
    return children;
  }, [elementType, children, id]);
  return <ChakraHeading as={elementType}>{nextChildren}</ChakraHeading>;
};
