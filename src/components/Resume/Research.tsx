"use client";

import { Link } from "@chakra-ui/next-js";
import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";

import { PositionItem } from "./PositionItem";
import { PositionList } from "./PositionList";

import type { FunctionComponent, ReactNode } from "react";

type ResearchPaperListItemProps = {
  readonly href: string;
  readonly authors?: ReactNode;
  readonly context?: ReactNode;
  readonly children?: ReactNode;
};

const ResearchPaperListItem: FunctionComponent<ResearchPaperListItemProps> = ({
  authors,
  children,
  context,
  href,
}) => (
  <ListItem>
    <Link href={href} isExternal>
      {children}
    </Link>
    {authors && <Text>{authors}</Text>}
    {context && <Text>{context}</Text>}
  </ListItem>
);

export const Research: FunctionComponent = () => (
  <PositionList title={`Research`}>
    <PositionItem
      date={`2010 - 2014`}
      description={
        <>
          {`Complex Systems applied to Internet Topology , supervised by`}
          {` `}
          <Link
            href={`https://perso.ens-lyon.fr/christophe.crespelle/`}
            isExternal
          >
            {`Christophe Crespelle`}
          </Link>
          {` `}
          {`and`}
          {` `}
          <Link
            href={`https://www-complexnetworks.lip6.fr/~latapy/`}
            isExternal
          >
            {`Matthieu Latapy`}
          </Link>
          {` `}
          {`at`}
          {` `}
          <Link href={`http://www.complexnetworks.fr/`} isExternal>
            {`LIP6 / Complex Networks`}
          </Link>
          <UnorderedList fontSize={`xs`} listStyleType={`circle`}>
            <ResearchPaperListItem
              context={`PhD Thesis`}
              href={`papers/thesis-elie-rotenberg-2015.pdf`}
            >
              {`Une approche pour l’estimation fiable des propriétés de la`}
              {`topologie de l’Internet`}
            </ResearchPaperListItem>
            <ResearchPaperListItem
              authors={`Fabien Tarissan, Elie Rotenberg, Matthieu Latapay, Christophe Crespelle`}
              context={`Mascots 2014`}
              href={`papers/mascots-2014.pdf`}
            >
              {`UDP Ping: a dedicated tool for improving measurements of the`}
              {`Internet topology`}
            </ResearchPaperListItem>
            <ResearchPaperListItem
              authors={`Matthieu Latapy, Elie Rotenberg, Christophe Crespelle, Fabien Tarissan`}
              context={`IFIP Networking 2014`}
              href={`papers/networking-2014.pdf`}
            >
              {`Measuring the Degree Distribution of Routers in the Core Internet`}
            </ResearchPaperListItem>
            <ResearchPaperListItem
              authors={`Elie Rotenberg, Christophe Crespelle, Matthieu Latapy`}
              context={`NetSciCom 2014 in conjunction with IEEE Infocom 2014`}
              href={`papers/netscicom-2014.pdf`}
            >
              {`Measuring Routing Tables in the Internet`}
            </ResearchPaperListItem>
            <ResearchPaperListItem
              authors={`Christophe Crespelle, Matthieu Latapy, Elie Rotenberg`}
              context={`NetSciCom 2010 in conjunction with IEEE Infocom 2010`}
              href={`papers/netscicom-2010.pdf`}
            >
              {`Rigorous measurement of IP-level neighborhood of internet core`}
              {`routers`}
            </ResearchPaperListItem>
          </UnorderedList>
        </>
      }
    >
      {`PhD and Teaching Assistant in Computer Science`}
    </PositionItem>
    <PositionItem
      date={`2010`}
      description={
        <>
          {`Network models in social sciences, supervised by`}
          {` `}
          <Link
            href={`https://medialab.sciencespo.fr/en/people/tommaso-venturini/`}
            isExternal
          >
            {`Tommaso venturini`}
          </Link>
          {` `}
          {`and`}
          {` `}
          <Link
            href={`https://medialab.sciencespo.fr/en/people/paul-girard/`}
            isExternal
          >
            {`Paul Girard`}
          </Link>
          {` `}
          {`at`}
          {` `}
          <Link href={`https://medialab.sciencespo.fr/`} isExternal>
            {`médialab Sciences Po`}
          </Link>
        </>
      }
    >
      {`Research Intern in Computational Sociology`}
    </PositionItem>
    <PositionItem
      date={`2010`}
      description={
        <>
          {`Diffusion in online communities supervised by`}
          {` `}
          <Link
            href={`https://medialab.sciencespo.fr/equipe/jean-philippe-cointet/`}
            isExternal
          >
            {`Jean-Philippe Cointet`}
          </Link>
          {` `}
          {`at`}
          {` `}
          <Link href={`https://iscpif.fr/`} isExternal>
            {`ISC Paris`}
          </Link>
        </>
      }
    >
      {`Research Intern in Computational Sociology`}
    </PositionItem>
    <PositionItem
      date={`2009`}
      description={
        <>
          {`Emergence of Cooperation in Bacteria Evolution, supervied by`}
          {` `}
          <Link
            href={`https://cri-paris.org/en/profile?id=330b37fd-8768-4764-94db-bc47a91828e5`}
            isExternal
          >
            {`François Taddei`}
          </Link>
          {` `}
          {`and`}
          {` `}
          <Link
            href={`https://cri-paris.org/en/profile?id=aea0cc49-a01d-4883-b8da-9e849425e8d7`}
            isExternal
          >
            {`Dusan Misevic`}
          </Link>
        </>
      }
    >
      {`Research Intern in Computational Biology`}
    </PositionItem>
  </PositionList>
);
