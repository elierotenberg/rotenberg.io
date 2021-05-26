import React, {
  Fragment,
  FunctionComponent,
  ReactElement,
  useMemo,
} from "react";
import { Heading as ChakraHeading, HeadingProps } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Link } from "../../Link";

export const Heading: FunctionComponent<HeadingProps> = ({
  id,
  children,
  ...props
}) => {
  const { asPath } = useRouter();
  const nextChildren = useMemo((): ReactElement => {
    if (id) {
      return (
        <Link id={id} href={asPath.replace(/\#.*$/, ``) + `#${id}`}>
          {children}
        </Link>
      );
    }
    return <Fragment>children</Fragment>;
  }, [children, id]);
  return (
    <ChakraHeading id={id} {...props}>
      {nextChildren}
    </ChakraHeading>
  );
};
