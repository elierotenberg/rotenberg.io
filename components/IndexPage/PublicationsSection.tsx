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

interface IPublicationItem {
  readonly title: ReactNode;
  readonly href: string;
  readonly label: ReactNode;
}

const publicationItems: IPublicationItem[] = [
  {
    title:
      "Rigorous measurement of IP-level neighborhood of internet core routers",
    href: "papers/netscicom-2010.pdf",
    label:
      "Christophe Crespelle, Matthieu Latapy, Elie Rotenberg, NetSciCom 2010 in conjunction with IEEE Infocom 2010",
  },
  {
    title: "Measuring Routing Tables in the Internet",
    href: "papers/netscicom-2014.pdf",
    label:
      "Elie Rotenberg, Christophe Crespelle, Matthieu Latapy, NetSciCom 2014 in conjunction with IEEE Infocom 2014",
  },
  {
    title: "Measuring the Degree Distribution of Routers in the Core Internet",
    href: "papers/networking-2014.pdf",
    label:
      "Matthieu Latapy, Elie Rotenberg, Christophe Crespelle, Fabien Tarissan, IFIP Networking 2014",
  },
  {
    title:
      "UDP Ping: a dedicated tool for improving measurements of the Internet topology",
    href: "papers/mascots-2014.pdf",
    label:
      "Fabien Tarissan, Elie Rotenberg, Matthieu Latapy, Christophe Crespelle, Mascots 2014",
  },
  {
    title:
      "Une nouvelle approche pour l'estimation fiable des propriétés de la topologie d'Internet",
    href: "papers/thesis-elie-rotenberg-2015.pdf",
    label: "Elie Rotenberg, PhD thesis",
  },
].reverse();

export const PublicationsSection: FunctionComponent<BoxProps> = (
  props: BoxProps,
) => {
  return (
    <Box component="section" {...props}>
      <Box>
        <Typography component="h2" variant="h5">
          Peer-reviewed scientific publications
        </Typography>
      </Box>
      <Box mt={1} pl={1}>
        <Grid container item spacing={1} component="ul" direction="column">
          {publicationItems.map((publicationItem, key) => (
            <Grid
              item
              container
              key={key}
              component="li"
              wrap="wrap"
              direction="row"
            >
              <Grid item xs={12} sm>
                <Typography>
                  <Link href={publicationItem.href} external>
                    {publicationItem.title}
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography component="div">
                  <Box fontStyle="oblique" fontWeight="fontWeightLight">
                    {publicationItem.label}
                  </Box>
                </Typography>
              </Grid>
              {key !== publicationItems.length - 1 && (
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
