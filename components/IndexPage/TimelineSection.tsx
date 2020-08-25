import React, {
  ReactNode,
  FunctionComponent,
  useState,
  useMemo,
  useCallback,
  ReactElement,
  cloneElement,
} from "react";
import {
  makeStyles,
  createStyles,
  BoxProps,
  Box,
  Typography,
  Paper,
  Chip,
  Hidden,
  Grid,
} from "@material-ui/core";
import {
  EmojiEvents,
  School,
  FindReplace,
  Work,
  VideogameAsset,
  EmojiPeople,
} from "@material-ui/icons";
import cx from "classnames";

import { Link } from "../../components/Link";

interface ITimelineEvent {
  readonly label: ReactNode;
  readonly title: ReactNode;
  readonly description: ReactNode;
  readonly icon: ReactNode;
  readonly tags: string[];
}

interface ITimelineEventProps {
  readonly event: ITimelineEvent;
  readonly isLastItem: boolean;
}

interface ITag {
  readonly tag: string;
  readonly icon: ReactElement;
}

const timelineEvents: ITimelineEvent[] = [
  {
    label: "2002 - 2005",
    title: "International Olympiads of Informatics trainee",
    description: (
      <Box>
        Member of the{" "}
        <Link href="http://www.france-ioi.org" external>
          International Olympieds of Informatics training squad
        </Link>{" "}
        supervised by Mathias Hiron and Arthur Charguéraud
      </Box>
    ),
    icon: <EmojiEvents />,
    tags: ["education"],
  },
  {
    label: "2002 - 2005",
    title: "Graduation in Science",
    description: (
      <Box>
        Maths specialization, with honors at{" "}
        <Link href="https://www.louislegrand.fr/en/home/" external>
          Lycée Louis-le-Grand
        </Link>
        , Paris
      </Box>
    ),
    icon: <School />,
    tags: ["education"],
  },
  {
    label: "2005 - 2007",
    title: "CPGE MPSI/MP*",
    description: (
      <Box>
        Classe préparatoire aux grandes écoles (CPGE), specialization in Maths,
        Computer Science and Physics at{" "}
        <Link href="http://www.lycee-charlemagne.fr/" external>
          Lycée Charlemagne
        </Link>
        , Paris. Admitted at Ecole normale supérieure de Lyon
      </Box>
    ),
    icon: <School />,
    tags: ["education"],
  },
  {
    label: "2007 - 2008",
    title: "Bsc in Computer Science",
    description: (
      <Box>
        At{" "}
        <Link href="https://www.ens-lyon.fr" external>
          Ecole normale supérieure de Lyon
        </Link>
      </Box>
    ),
    icon: <School />,
    tags: ["education"],
  },
  {
    label: "2008",
    title: "Research Internship in Bio-informatics",
    description: (
      <Box>
        2-month internship on simulated virus evolution, supervised by{" "}
        <Link
          href="https://perso.liris.cnrs.fr/guillaume.beslon/G._Beslon_home_page/Welcome.html"
          external
        >
          Guillaume Beslon
        </Link>
        , LIRIS/INSA Lyon
      </Box>
    ),
    icon: <FindReplace />,
    tags: ["education", "research"],
  },
  {
    label: "2008 - 2009",
    title: "Master in Computer Science",
    description: (
      <Box>
        <Link href="https://wikimpri.dptinfo.ens-cachan.fr/doku.php" external>
          Master Program for Research in Computer Science of Paris (MPRI)
        </Link>{" "}
        at{" "}
        <Link href="https://ens-paris-saclay.fr/en" external>
          Ecole normale supérieure de Cachan
        </Link>
        , with high honors. Specialization in Graph Theory, Complex Systems, and
        Bio-informatics
      </Box>
    ),
    icon: <School />,
    tags: ["education", "research"],
  },
  {
    label: "2008",
    title: "Research Internship in Complex Networks",
    description: (
      <Box>
        6-month internship on Internet IP-level topology measurement supervised
        by{" "}
        <Link href="https://perso.ens-lyon.fr/christophe.crespelle/" external>
          Christophe Crespelle
        </Link>{" "}
        and{" "}
        <Link href="https://www-complexnetworks.lip6.fr/~latapy/" external>
          Matthieu Latapy
        </Link>{" "}
        at{" "}
        <Link href="http://www.complexnetworks.fr/" external>
          LIP6/Complex Networks
        </Link>
      </Box>
    ),
    icon: <FindReplace />,
    tags: ["education", "research"],
  },
  {
    label: "2008 - 2013",
    title: "Co-founder and CTO of Millenium",
    description: (
      <Box>
        Technical and strategy director at Millenium, the company behind{" "}
        <Link href="https://www.millenium.org" external>
          millenium.org
        </Link>
        , the #1 core-gaming website in France. Supervision of website
        development, creation of the first WebTVs, continuous improvement of the
        business model, up to acquisition by{" "}
        <Link href="https://www.webedia-group.com" external>
          Webedia
        </Link>
        .
      </Box>
    ),
    icon: <VideogameAsset />,
    tags: ["work"],
  },
  {
    label: "2009 - 2010",
    title: "Master in Interdisciplinary Science",
    description: (
      <Box>
        Interdisciplinary Approach of Life and the Web (AIV / AIW) Master
        Program (now{" "}
        <Link href="https://master.cri-paris.org" external>
          AIRE
        </Link>
        ) at{" "}
        <Link href="https://www.cri-paris.org" external>
          Centre de Recherche Interdisciplinaire
        </Link>
      </Box>
    ),
    icon: <School />,
    tags: ["education", "research"],
  },
  {
    label: "2009",
    title: "Research Internship in Bio-informatics",
    description: (
      <Box>
        3-month internship on the emergence of cooperation in bacteria
        evolution, supervised by{" "}
        <Link href="https://twitter.com/FrancoisTaddei" external>
          François Taddei
        </Link>{" "}
        and{" "}
        <Link href="http://www.dule.fr/" external>
          Dusan Misevic
        </Link>{" "}
        at{" "}
        <Link href="https://www.cri-paris.org" external>
          Centre de Recherche Interdisciplinaire
        </Link>
      </Box>
    ),
    icon: <FindReplace />,
    tags: ["education", "research"],
  },
  {
    label: "2010",
    title: "Research Internship in Computational Sociology",
    description: (
      <Box>
        3-month internship on diffusion in online communities and the
        blogosphere{" "}
        <Link
          href="https://medialab.sciencespo.fr/equipe/jean-philippe-cointet/"
          external
        >
          Jean-Philippe Cointet
        </Link>{" "}
        at{" "}
        <Link href="https://iscpif.fr/" external>
          Institut des Systèmes Complexes de Paris
        </Link>
      </Box>
    ),
    icon: <FindReplace />,
    tags: ["education", "research"],
  },
  {
    label: "2010",
    title: "Reasearch Internship in Computational Sociology",
    description: (
      <Box>
        3-month internship on network models in social sciences, supervised by{" "}
        <Link
          href="https://medialab.sciencespo.fr/en/people/tommaso-venturini/"
          external
        >
          Tommaso Venturini
        </Link>{" "}
        and{" "}
        <Link
          href="https://medialab.sciencespo.fr/en/people/paul-girard/"
          external
        >
          Paul Girard
        </Link>{" "}
        at{" "}
        <Link href="https://medialab.sciencespo.fr/" external>
          médialab Sciences Po
        </Link>
      </Box>
    ),
    icon: <FindReplace />,
    tags: ["education", "research"],
  },
  {
    label: "2010 - 2014",
    title: "PhD Student and Teaching Assistant",
    description: (
      <Box>
        PhD in the field of complex networks applied to Internet topology,
        supervised by{" "}
        <Link href="https://perso.ens-lyon.fr/christophe.crespelle/" external>
          Christophe Crespelle
        </Link>{" "}
        and{" "}
        <Link href="https://www-complexnetworks.lip6.fr/~latapy/" external>
          Matthieu Latapy
        </Link>{" "}
        at{" "}
        <Link href="http://www.complexnetworks.fr/" external>
          LIP6/Complex Networks
        </Link>
      </Box>
    ),
    icon: <School />,
    tags: ["education", "research", "work"],
  },
  {
    label: "2014 - 2017",
    title: "CTO of Webedia Gaming / Jeuxvideo.com",
    description: (
      <Box>
        Co-creator of the gaming branch of Webedia, technical director of{" "}
        <Link href="https://www.jeuxvideo.com" external>
          jeuxvideo.com
        </Link>{" "}
        (#1 video games website in Europe)
      </Box>
    ),
    icon: <Work />,
    tags: ["work"],
  },
  {
    label: "2017 - 2018",
    title: "Head of R&D team at Webedia",
    description: <Box>Technical lead on cross-branch systems</Box>,
    icon: <Work />,
    tags: ["work"],
  },
  {
    label: "2019 - now",
    title: "Co-founder of iféa",
    description: (
      <Box>
        Co-founder of{" "}
        <Link href="https://ifea.education" external>
          iféa
        </Link>
        , in charge of technology and research partnerships
      </Box>
    ),
    icon: <EmojiPeople />,
    tags: ["work", "education", "research"],
  },
].reverse();

const availableTags: ITag[] = [
  {
    tag: "education",
    icon: <School />,
  },
  {
    tag: "research",
    icon: <FindReplace />,
  },
  {
    tag: "work",
    icon: <Work />,
  },
];

const useStyles = makeStyles((theme) =>
  createStyles({
    verticalLineContainer: {
      position: "relative",
      minHeight: "5em",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    labelContainer: {
      paddingTop: 9,
      paddingRight: 20,
      width: 110,
    },
    timelineContainer: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
      position: "relative",
      minHeight: "100%",
    },
    verticalConnector: {
      width: 2,
      backgroundColor: theme.palette.grey[400],
      position: "absolute",
      top: 0,
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 0,
    },
    timelineContainerLastItem: {
      borderBottomColor: theme.palette.grey[400],
      borderBottomWidth: 2,
      borderBottomStyle: "solid",
    },
    iconContainer: {
      position: "relative",
      width: 50,
      height: 50,
      top: 20,
      borderRadius: "50%",
      zIndex: 1,
      transform: "translateY(-50%)",
    },
    icon: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
    },
    contentContainer: {
      position: "relative",
      marginLeft: 20,
      minHeight: "100%",
      width: "100%",
      paddingBottom: "3em",
    },
    content: {
      padding: 10,
      minHeight: "100%",
      width: "100%",
      zIndex: 1,
    },
    horizontalConnector: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
      position: "absolute",
      top: 21,
      left: -25,
      height: 2,
      minWidth: "100%",
      backgroundColor: theme.palette.grey[400],
      zIndex: 0,
    },
  }),
);

export const TimelineEvent: FunctionComponent<ITimelineEventProps> = ({
  event,
  isLastItem,
}: ITimelineEventProps) => {
  const styles = useStyles();
  return (
    <Box display="flex" justifyContent="flex-start">
      <Box
        display="flex"
        alignItems="flex-start"
        className={styles.verticalLineContainer}
      >
        <Box className={styles.labelContainer} textAlign="right">
          <Typography>{event.label}</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          className={cx(
            styles.timelineContainer,
            isLastItem && styles.timelineContainerLastItem,
          )}
        >
          <Box className={styles.verticalConnector} />
          <Paper className={styles.iconContainer}>
            <Box
              className={styles.icon}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {event.icon}
            </Box>
          </Paper>
        </Box>
      </Box>
      <Box
        display="flex"
        className={styles.contentContainer}
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Box className={styles.horizontalConnector}></Box>
        <Paper className={styles.content}>
          <Hidden smUp>{event.label}</Hidden>
          <Typography component="h4" variant="h6">
            {event.title}
          </Typography>
          <Typography component="div">{event.description}</Typography>
          <Box fontStyle="oblique">
            <Typography color="textSecondary">
              {event.tags.join(", ")}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export const TimelineSection: FunctionComponent<BoxProps> = (
  props: BoxProps,
) => {
  const [activeTags, setActiveTags] = useState<Record<string, boolean>>(
    availableTags.reduce((acc, { tag }) => ({ ...acc, [tag]: true }), {}),
  );

  const toggleTag = useCallback((tag: string) => {
    setActiveTags((prevActiveTags) => ({
      ...prevActiveTags,
      [tag]: !prevActiveTags[tag],
    }));
  }, []);

  const activeTimelineEvents = useMemo(
    () =>
      timelineEvents.filter((event) =>
        event.tags.some((tag) => activeTags[tag]),
      ),
    [activeTags],
  );

  return (
    <Box component="section" display="flex" flexDirection="column" {...props}>
      <Box mb={1}>
        <Typography component="h2" variant="h5">
          Timeline
        </Typography>
      </Box>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <Box mx={2}>
            <Typography>Filter by tag</Typography>
          </Box>
        </Grid>
        {availableTags.map(({ tag, icon }) => (
          <Grid item key={tag}>
            <Chip
              label={tag}
              icon={cloneElement(icon, { fontSize: "small" })}
              onClick={() => toggleTag(tag)}
              clickable
              variant={activeTags[tag] ? "default" : "outlined"}
            />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" flexDirection="column" mt={2} pl={1}>
        {activeTimelineEvents.map((event, key) => (
          <TimelineEvent
            key={key}
            event={event}
            isLastItem={key === activeTimelineEvents.length - 1}
          />
        ))}
      </Box>
    </Box>
  );
};
