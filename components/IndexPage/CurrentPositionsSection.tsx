import React, { FunctionComponent, ReactNode } from "react";
import {
  Grid,
  Typography,
  Hidden,
  Divider,
  Box,
  BoxProps,
} from "@material-ui/core";

import { Link } from "../../components/Link";

interface ICurrentPositionItem {
  readonly title: ReactNode;
  readonly label: ReactNode;
}

const currentPositionItems: ICurrentPositionItem[] = [
  {
    title: (
      <Link href="https://ifea.education" external>
        iféa
      </Link>
    ),
    label: "Founder, head of R&D",
  },
  {
    title: "Page & Rotenberg",
    label: "Partner",
  },
];

export const CurrentPositionsSection: FunctionComponent<BoxProps> = (
  props: BoxProps,
) => {
  return (
    <Box component="section" {...props}>
      <Box>
        <Typography component="h2" variant="h5">
          Current positions
        </Typography>
      </Box>
      <Box mt={1} pl={1}>
        <Grid container item spacing={1} component="ul" direction="column">
          {currentPositionItems.map((currentPositionItem, key) => (
            <Grid
              item
              container
              key={key}
              component="li"
              wrap="wrap"
              direction="row"
            >
              <Grid item xs={12} sm={4}>
                <Typography>{currentPositionItem.title}</Typography>
              </Grid>
              <Grid item xs={12} sm>
                <Typography component="div">
                  <Box fontStyle="oblique" fontWeight="fontWeightLight">
                    {currentPositionItem.label}
                  </Box>
                </Typography>
              </Grid>
              {key !== currentPositionItems.length - 1 && (
                <Hidden smUp>
                  <Grid item xs={12}>
                    <Box my={1}>
                      <Divider variant="middle" />
                    </Box>
                  </Grid>
                </Hidden>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
