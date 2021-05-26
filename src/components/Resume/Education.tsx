import React, { FunctionComponent } from "react";

import { Link } from "../Link";

import { PositionItem } from "./PositionItem";
import { PositionList } from "./PositionList";

export const Education: FunctionComponent = () => (
  <PositionList title="Education">
    <PositionItem
      date="2009"
      description={
        <>
          <Link href="https://master.cri-paris.org/" isExternal>
            Interdisciplinary Approaches to Life and the Web
          </Link>
          {` `}
          at{` `}
          <Link href="https://cri-paris.org" isExternal>
            Centre de Recherche Interdisciplinaire
          </Link>
        </>
      }
    >
      {`Master's Degree in Interdisciplinary Science`}
    </PositionItem>
    <PositionItem
      date="2008"
      description={
        <>
          <Link
            href="https://wikimpri.dptinfo.ens-cachan.fr/doku.php"
            isExternal
          >
            Master Program for Research in Computer Science of Paris (MPRI)
          </Link>
          {` `}
          at{` `}
          <Link href="https://ens-paris-saclay.fr/en" isExternal>
            École normale supérieure (Cachan)
          </Link>
          , ranked with high honors
        </>
      }
    >
      {`Master's Degree in Computer Science`}
    </PositionItem>
    <PositionItem
      date="2007"
      description={
        <>
          <Link href="http://www.ens-lyon.fr/" isExternal>
            École normale supérieure (Lyon)
          </Link>
        </>
      }
    >
      {`Bachelor of Science in Computer Science`}
    </PositionItem>
    <PositionItem
      date="2005 - 2007"
      description={
        <>
          Classe préparatoire aux grandes écoles at{` `}
          <Link
            href="http://www.lycee-charlemagne.fr/cpge/presentation.php"
            isExternal
          >
            Lycée Charlemagne
          </Link>
          , specialization in Maths and Computer Science. Admitted at École
          normale supérieure (Lyon)
        </>
      }
    >
      {`CPGE MPSI/MP*`}
    </PositionItem>
    <PositionItem
      date="2002 - 2005"
      description={
        <>
          <Link href="https://www.louislegrand.fr/en/home/" isExternal>
            Lycée Louis-le-Grand
          </Link>
          . Creator of Computer Science Club
        </>
      }
    >
      Graduation in Science
    </PositionItem>
    <PositionItem
      date="2002 - 2005"
      description={
        <>
          Intensive training program in Computer Science at{` `}
          <Link href="http://www.france-ioi.org/" isExternal>
            France IOI
          </Link>
        </>
      }
    >
      International Olympiads of Informatics Trainee
    </PositionItem>
  </PositionList>
);
