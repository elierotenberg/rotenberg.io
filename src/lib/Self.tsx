import type { ReactNode } from "react";
import React from "react";

import charlemagneSrc from "../../public/media/home/charlemagne.jpg";
import criSrc from "../../public/media/home/cri.png";
import ensCachanSrc from "../../public/media/home/ens-cachan.png";
import ensLyonSrc from "../../public/media/home/ens-lyon.png";
import franceIoiSrc from "../../public/media/home/france-ioi.png";
import ifeaSrc from "../../public/media/home/ifea.png";
import iscpifSrc from "../../public/media/home/iscpif.jpg";
import jmSrc from "../../public/media/home/jm.png";
import llgSrc from "../../public/media/home/llg.jpg";
import lpiSrc from "../../public/media/home/lpi.png";
import medialabSrc from "../../public/media/home/medialab.png";
import milleniumSrc from "../../public/media/home/millenium.png";
import upmcSrc from "../../public/media/home/upmc.png";
import webediaGamingSrc from "../../public/media/home/webedia-gaming.jpg";
import webediaSrc from "../../public/media/home/webedia.png";
import elieRotenbergSrc from "../../public/elie-rotenberg.png";

import Image from "next/image";
import { VscGithub, VscHome, VscMail, VscTwitter } from "react-icons/vsc";
import { SiLinkedin } from "react-icons/si";
import type { IconType } from "react-icons";

type ContentItem = {
  readonly key: string;
  readonly title: ReactNode;
  readonly date?: undefined | ReactNode;
  readonly description?: undefined | ReactNode;
  readonly picture?: undefined | ReactNode;
};

type SelfLink = {
  readonly key: string;
  readonly title: string;
  readonly href: string;
  readonly IconType: IconType;
};

type Quote = {
  readonly key: string;
  readonly text: ReactNode;
  readonly footnote: ReactNode;
};

export type Self = {
  readonly picture: ReactNode;
  readonly name: string;
  readonly description: string;
  readonly links: SelfLink[];
  readonly interests: string[];
  readonly positions: {
    readonly current: ContentItem[];
    readonly past: ContentItem[];
  };
  readonly education: ContentItem[];
  readonly research: ContentItem[];
  readonly randomQuotes: Quote[];
};

export const myself: Self = {
  description: "Broad-spectrum hobbyist",
  education: [
    {
      date: "2009",
      description: (
        <>
          <a
            target="_blank"
            href="https://master.learningplanetinstitute.org/en/digital"
          >
            Interdisciplinary Approaches to Life and the Web
          </a>{" "}
          at{" "}
          <a target="_blank" href="https://www.learningplanetinstitute.org/">
            Centre de Recherche Interdisciplinaire
          </a>{" "}
          (now{" "}
          <a target="_blank" href="https://www.learningplanetinstitute.org/">
            Learning Planet Institute
          </a>
          )
        </>
      ),
      key: "master2",
      picture: (
        <Image src={criSrc} alt="Centre de Recherche Interdisciplinaire" />
      ),
      title: "Master's Degree in Interdisciplinary Science",
    },
    {
      date: "2008",
      description: (
        <>
          <a
            target="_blank"
            href="https://wikimpri.dptinfo.ens-cachan.fr/doku.php"
          >
            Master Program for Research in Computer Science of Paris (MPRI)
          </a>{" "}
          at{" "}
          <a target="_blank" href="https://ens-paris-saclay.fr/en">
            École normale supérieure de Cachan
          </a>{" "}
          (now{" "}
          <a target="_blank" href="https://ens-paris-saclay.fr/en">
            ENS Paris-Saclay
          </a>
          ), ranked with high honors
        </>
      ),
      key: "master1",
      picture: <Image src={ensCachanSrc} alt="ENS de Cachan" />,
      title: "Master's Degree in Computer Science",
    },
    {
      date: "2007",
      description: (
        <>
          Magistère in Computer Science at{" "}
          <a target="_blank" href="https://www.ens-lyon.fr/en">
            École normale supérieure de Lyon
          </a>
        </>
      ),
      key: "bsc",
      picture: <Image src={ensLyonSrc} alt="ENS de Lyon" />,
      title: "Bachelor's Degree in Computer Science",
    },
    {
      date: "2005 - 2007",
      description: (
        <>
          <a
            target="_blank"
            href="https://en.wikipedia.org/wiki/Classe_pr%C3%A9paratoire_aux_grandes_%C3%A9coles"
          >
            Classe préparatoire aux grandes écoles
          </a>{" "}
          at{" "}
          <a
            target="_blank"
            href="https://pia.ac-paris.fr/serail/jcms/s1_2107661/fr/cite-scolaire-charlemagne"
          >
            Lycée Charlemagne
          </a>
          , specialization in Maths and Computer Science. Admitted and enrolled
          at{" "}
          <a target="_blank" href="https://www.ens-lyon.fr/">
            École normale supérieure de Lyon
          </a>
        </>
      ),
      key: "cpge",
      picture: <Image src={charlemagneSrc} alt="Lycée Charlemagne" />,
      title: "Classe préparatoire aux grandes écoles, section MPSI/MP*",
    },
    {
      date: "2005",
      description: (
        <>
          Baccalauréat scientifique option Mathématiques at{" "}
          <a target="_blank" href="https://www.louislegrand.fr/en/home/">
            Lycée Louis-le-Grand
          </a>
          .
          <br />
          Founder of the Computer Science student club.
        </>
      ),
      key: "bac",
      picture: <Image src={llgSrc} alt="Lycée Louis-le-Grand" />,
      title: "Baccalauréat scientifique (S), option Mathématiques",
    },
    {
      date: "2002 - 2005",
      description: (
        <>
          Participant in the{" "}
          <a target="_blank" href="https://ioinformatics.org/">
            International Olympiad in Informatics
          </a>{" "}
          Training Program by{" "}
          <a target="_blank" href="https://www.france-ioi.org/">
            France IOI
          </a>
          .
          <br />
          Member of the{" "}
          <a target="_blank" href="http://ceoi.inf.elte.hu/ceoi2005/">
            CEOI 2005
          </a>{" "}
          French team.
        </>
      ),
      key: "ioi",
      picture: <Image src={franceIoiSrc} alt="France IOI" />,
      title: "International Olympiad in Informatics Training Program",
    },
  ],
  interests: [
    "ai",
    "biology",
    "business models",
    "cognition",
    "complex systems",
    "computer science",
    "education",
    "evolution",
    "gaming",
    "learning",
    "machine learning",
    "maths",
    "mental health",
    "psychology",
    "react",
    "software engineering",
    "sustainable development",
    "typescript",
  ],
  links: [
    {
      IconType: VscMail as IconType,
      href: "mailto:elie@rotenberg.io",
      key: "email",
      title: "Email",
    },
    {
      IconType: VscGithub as IconType,
      href: "https://github.com/elierotenberg",
      key: "github",
      title: "GitHub",
    },
    {
      IconType: VscTwitter as IconType,
      href: "https://twitter.com/elierotenberg",
      key: "twitter",
      title: "Twitter",
    },
    {
      IconType: SiLinkedin as IconType,
      href: "https://www.linkedin.com/in/elierotenberg/",
      key: "linkedin",
      title: "LinkedIn",
    },
    {
      IconType: VscHome as IconType,
      href: "https://elie.rotenberg.io",
      key: "homepage",
      title: "Homepage",
    },
  ],
  name: "Elie Rotenberg, PhD",
  picture: (
    <Image
      src={elieRotenbergSrc}
      placeholder="blur"
      alt="Elie Rotenberg"
      style={{
        borderRadius: 999999,
      }}
    />
  ),
  positions: {
    current: [
      {
        date: "2020 - Present",
        key: "lisa",
        title: <>Founder of LISA</>,
      },
      {
        date: "2019 - Present",
        key: "ifea",
        picture: <Image src={ifeaSrc} alt="iféa" />,
        title: (
          <>
            Founder of{" "}
            <a target="_blank" href="https://ifea.education">
              iféa
            </a>
          </>
        ),
      },
      {
        date: "2022 - Present",
        key: "lpi",
        picture: <Image src={lpiSrc} alt="iféa" />,
        title: (
          <>
            Administrator in the Board of Directors of the{" "}
            <a target="_blank" href="https://learningplanetinstitute.org">
              Learning Planet Institute
            </a>
          </>
        ),
      },
      {
        date: "2020 - Present",
        key: "jusmundi",
        picture: <Image src={jmSrc} alt="Jus Mundi" />,
        title: (
          <>
            Technical Advisor of{" "}
            <a target="_blank" href="https://jusmundi.com">
              Jus Mundi
            </a>
          </>
        ),
      },
      {
        date: "2021 - Present",
        key: "pagerotenberg",
        title: <>Founder of Page & Rotenberg</>,
      },
    ],
    past: [
      {
        date: "2018 - 2019",
        description: <>Internal cross-branch projects</>,
        key: "webedia",
        picture: <Image src={webediaSrc} alt="Webedia" />,
        title: (
          <>
            Head of R&D Team at{" "}
            <a target="_blank" href="https://webedia-group.com/">
              Webedia
            </a>
          </>
        ),
      },
      {
        date: "2014 - 2017",
        description: <>Including Jeuxvideo.com, Millenium, IGN.fr, etc.</>,
        key: "webedia-gaming",
        picture: <Image src={webediaGamingSrc} alt="Webedia Gaming" />,
        title: (
          <>
            Deputy Director and Chief Technological Director of{" "}
            <a target="_blank" href="">
              Webedia Gaming
            </a>
          </>
        ),
      },
      {
        date: "2008 - 2013",
        key: "millenium",
        picture: <Image src={milleniumSrc} alt="Millenium" />,
        title: (
          <>
            Founder and CTO of{" "}
            <a target="_blank" href="https://www.millenium.org/">
              Millenium
            </a>
          </>
        ),
      },
    ],
  },
  randomQuotes: [
    {
      footnote: (
        <a
          target="_blank"
          href="https://en.wikipedia.org/wiki/Hanlon%27s_razor"
        >
          Hanlon&#39;s razor
        </a>
      ),
      key: "hanlon",
      text: "Never attribute to malice that which is adequately explained by stupidity.",
    },
    {
      footnote: (
        <>
          Colloquially derived from{" "}
          <a
            target="_blank"
            href="https://en.wikipedia.org/wiki/Planck%27s_principle"
          >
            Planck&#39;s Principle
          </a>
        </>
      ),
      key: "planck",
      text: "Science progresses one funeral at a time.",
    },
    {
      footnote: (
        <a target="_blank" href="https://www.youtube.com/watch?v=8DO0kxKMHIA">
          Dr Ian Malcom
        </a>
      ),
      key: "malcolm",
      text: "Boy do I hate being right all the time",
    },
  ],
  research: [
    {
      date: "2010 - 2014",
      description: (
        <>
          In the field of Complex Systems, supervised by{" "}
          <a target="_blank" href="https://webusers.i3s.unice.fr/~ccrespelle/">
            Christophe Crespelle
          </a>{" "}
          and{" "}
          <a target="_blank" href="https://lip6.fr/Matthieu.Latapy">
            Matthieu Latapy
          </a>
          .
          <ol className="list-disc space-y-0.5 pl-4 text-xs sm:text-sm">
            <li>
              <a target="_blank" href="/papers/thesis-elie-rotenberg-2015.pdf">
                Une approche pour l’estimation fiable des propriétés de la
                topologie de l’Internet
              </a>
              , PhD Thesis
            </li>
            <li>
              <a target="_blank" href="/papers/mascots-2014.pdf">
                UDP Ping: a dedicated tool for improving measurements of the
                Internet topology
              </a>
              , Fabien Tarissan, Elie Rotenberg, Matthieu Latapay, Christophe
              Crespelle, Mascots 2014
            </li>
            <li>
              <a target="_blank" href="/papers/networking-2014.pdf">
                Measuring the Degree Distribution of Routers in the Core
                Internet
              </a>
              , Matthieu Latapy, Elie Rotenberg, Christophe Crespelle, Fabien
              Tarissan, IFIP Networking 2014
            </li>
            <li>
              <a target="_blank" href="/papers/netscicom-2014.pdf">
                Measuring Routing Tables in the Internet
              </a>
              , Elie Rotenberg, Christophe Crespelle, Matthieu Latapy, NetSciCom
              2014 in conjunction with IEEE Infocom 2014
            </li>
            <li>
              <a target="_blank" href="/papers/netscicom-2010.pdf">
                Rigorous measurement of IP-level neighborhood of internet core
                routers
              </a>
              , Christophe Crespelle, Matthieu Latapy, Elie Rotenberg, NetSciCom
              2010 in conjunction with IEEE Infocom 2010
            </li>
          </ol>
        </>
      ),
      key: "phd",
      picture: <Image src={upmcSrc} alt="UPMC" />,
      title: "PhD in Computer Science",
    },
    {
      date: "2010",
      description: (
        <>
          Network models in social sciences, supervised by{" "}
          <a
            target="_blank"
            href="https://medialab.sciencespo.fr/en/people/tommaso-venturini/"
          >
            Tommaso Venturini
          </a>{" "}
          and{" "}
          <a
            target="_blank"
            href="https://medialab.sciencespo.fr/en/people/paul-girard/"
          >
            Paul Girard
          </a>{" "}
          at{" "}
          <a target="_blank" href="https://medialab.sciencespo.fr/en/">
            médialab Sciences Po
          </a>
        </>
      ),
      key: "medialab",
      picture: <Image src={medialabSrc} alt="Medialab Sciences Po" />,
      title: "Research Intern in Computational Sociology",
    },
    {
      date: "2010",
      description: (
        <>
          Diffusion in online communities supervised by{" "}
          <a
            target="_blank"
            href="https://medialab.sciencespo.fr/equipe/jean-philippe-cointet/"
          >
            Jean-Philippe Cointet
          </a>{" "}
          at{" "}
          <a target="_blank" href="https://iscpif.fr/">
            ISC-PIF
          </a>
        </>
      ),
      key: "iscpif",
      picture: (
        <Image
          src={iscpifSrc}
          alt="Institut des Systèmes Complexes de Paris IDF"
        />
      ),
      title: "Research Intern in Computational Sociology",
    },
    {
      date: "2009",
      description: (
        <>
          Emergence of Cooperation in Bacteria Evolution, supervied by{" "}
          <a
            target="_blank"
            href="https://www.learningplanetinstitute.org/en/francois-taddeis-biography/"
          >
            François Taddei
          </a>{" "}
          and{" "}
          <a target="_blank" href="https://www.dule.fr/">
            Dusan Misevic
          </a>
        </>
      ),
      key: "cri",
      picture: (
        <Image src={criSrc} alt="Centre de Recherche Interdisciplinaire" />
      ),
      title: "Research Intern in Computational Biology",
    },
  ],
};
