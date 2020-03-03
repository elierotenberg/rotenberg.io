import React, { FunctionComponent, ReactNode } from "react";
import {
  Grid,
  Typography,
  Box,
  Hidden,
  Divider,
  BoxProps,
} from "@material-ui/core";
import { LinkedIn, GitHub, Twitter } from "@material-ui/icons";

import { Link } from "../../components/Link";

interface IGeneralInformationItem {
  readonly title: ReactNode;
  readonly label: ReactNode;
}

interface IPublicProfile {
  readonly icon: ReactNode;
  readonly title: string;
  readonly href: string;
}

const publicProfiles: IPublicProfile[] = [
  {
    icon: <LinkedIn />,
    title: "LinkedIn",
    href: "https://www.linkedin.com/pub/elie-rotenberg/1a/271/348",
  },
  {
    icon: <GitHub />,
    title: "GitHub",
    href: "https://github.com/elierotenberg",
  },
  {
    icon: <Twitter />,
    title: "Twitter",
    href: "'https://twitter.com/elierotenberg",
  },
];

const generalInformationItems: IGeneralInformationItem[] = [
  {
    title: "Birthdate",
    label: "09/04/1988",
  },
  {
    title: "Nationality",
    label: "French",
  },
  {
    title: "Contact",
    label: (
      <Box component="ul">
        {[
          "elie@rotenberg.io",
          "elie@ifea.education",
          "elie@page-rotenberg.fr",
        ].map((email, key) => (
          <Box component="li" key={key}>
            <Link href={`mailto:${email}`} external>
              {email}
            </Link>
          </Box>
        ))}
      </Box>
    ),
  },
  {
    title: "Public profiles",
    label: (
      <Box component="ul">
        {publicProfiles.map(({ icon, title, href }, key) => (
          <Box component="li" display="inline-block" key={key}>
            <Link href={href} title={title} external>
              {icon}
            </Link>
          </Box>
        ))}
      </Box>
    ),
  },
  {
    title: "Spoken languages",
    label: "French, English",
  },
  {
    title: "Academic degree",
    label: "PhD in Computer Science",
  },
  {
    title: "Topics of interest",
    label:
      "Education, Science and Technology, Complex Systems, Systems Architecture, History, Gaming",
  },
];

const GeneralInformationSection: FunctionComponent<BoxProps> = (
  props: BoxProps,
) => {
  return (
    <Box component="section" {...props}>
      <Box>
        <Typography component="h2" variant="h5">
          General information
        </Typography>
      </Box>
      <Box mt={1} pl={1}>
        <Grid container item spacing={1} component="ul" direction="column">
          {generalInformationItems.map((generalInformationItem, key) => (
            <Grid
              item
              container
              key={key}
              component="li"
              wrap="wrap"
              direction="row"
            >
              <Grid item xs={12} sm={4}>
                <Typography>{generalInformationItem.title}</Typography>
              </Grid>
              <Grid item xs={12} sm>
                <Typography component="div">
                  <Box fontStyle="oblique" fontWeight="fontWeightLight">
                    {generalInformationItem.label}
                  </Box>
                </Typography>
              </Grid>
              {key !== generalInformationItems.length - 1 && (
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

export { GeneralInformationSection };
