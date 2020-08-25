import React, { createElement, FunctionComponent } from "react";
import { Box, Paper, makeStyles, createStyles } from "@material-ui/core";

import { CurrentPositionsSection } from "./CurrentPositionsSection";
import { GeneralInformationSection } from "./GeneralInformationSection";
import { TimelineSection } from "./TimelineSection";
import { PublicationsSection } from "./PublicationsSection";
import { Header } from "./Header";

const useStyles = makeStyles((theme) =>
  createStyles({
    section: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      "&:first-child": {
        marginTop: theme.spacing(1),
      },
      "&:last-child": {
        marginBottom: theme.spacing(1),
      },
    },
  }),
);

export const IndexPage: FunctionComponent = () => {
  const styles = useStyles();
  return (
    <Box my={1}>
      <Paper>
        <Header />
        <Box p={1} pb={2} component="main">
          {[
            GeneralInformationSection,
            CurrentPositionsSection,
            TimelineSection,
            PublicationsSection,
          ].map((Component, key) => (
            <Box mx={2} my={1} key={key} className={styles.section}>
              {createElement(Component)}
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};
