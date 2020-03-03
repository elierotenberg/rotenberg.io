import React, { FunctionComponent } from "react";
import cx from "classnames";
import {
  Container,
  makeStyles,
  createStyles,
  ContainerProps,
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      ul: {
        padding: 0,
      },
      li: {
        listStyleType: "none",
      },
    },
    root: {},
  }),
);

const PageContainer: FunctionComponent<ContainerProps> = ({
  className,
  ...props
}: ContainerProps) => {
  const styles = useStyles();
  return (
    <Container
      className={cx(className, styles.root)}
      maxWidth="md"
      {...props}
    />
  );
};

export { PageContainer };
