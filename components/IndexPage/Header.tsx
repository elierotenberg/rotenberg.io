import React, { FunctionComponent } from "react";
import {
  BoxProps,
  Box,
  Grid,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    picture: {
      width: "100%",
      maxWidth: 100,
      borderRadius: "50%",
    },
  }),
);

export const Header: FunctionComponent<BoxProps> = (props: BoxProps) => {
  const styles = useStyles();
  return (
    <Box mt={2.5} pt={4} mb={1} mx={4} component="header" {...props}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <img
            src="elie-rotenberg.png"
            alt="Elie Rotenberg"
            className={styles.picture}
          />
        </Grid>
        <Grid item xs>
          <Typography variant="h4" component="h1">
            Elie Rotenberg
          </Typography>
          <Box fontStyle="oblique" mt={1}>
            <Typography variant="body1">
              Entrepreneur, computer scientist, lifelong learner
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
