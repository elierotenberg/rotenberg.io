import NextLink, { LinkProps as NextLinkProps } from "next/link";
import {
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import React, { forwardRef } from "react";
import cx from "classnames";

const InnerNextLink = forwardRef<HTMLAnchorElement, NextLinkProps>(
  function InnerNextLink({ as, href, prefetch, ...props }: NextLinkProps, ref) {
    return (
      <NextLink href={href} prefetch={prefetch} as={as}>
        <a ref={ref} {...props} />
      </NextLink>
    );
  },
);

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
  }),
);

type LinkProps = MuiLinkProps &
  NextLinkProps & {
    readonly external?: boolean;
  };

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className, external, ...props }: LinkProps,
  ref,
) {
  const styles = useStyles();
  const innerProps = external
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
        ...props,
      }
    : props;

  return (
    <MuiLink
      component={external ? "a" : InnerNextLink}
      ref={ref}
      underline={props.underline ?? "none"}
      className={cx(className, styles.root)}
      {...innerProps}
    />
  );
});

export { Link };
