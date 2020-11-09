import Head from "next/head";
import React, { FunctionComponent, ReactNode } from "react";
import { Container, Box } from "@chakra-ui/core";

import { useCanonicalUrlLink } from "../lib/url";

import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

interface IPageProps {
  readonly children: ReactNode;
  readonly withNavBar: boolean;
  readonly withFooter: boolean;
  readonly lang?: string;
  readonly title: string;
  readonly head?: ReactNode;
}

export const Page: FunctionComponent<IPageProps> = ({
  head,
  children,
  withNavBar,
  withFooter,
  lang,
  title,
}) => {
  const link = useCanonicalUrlLink();
  return (
    <>
      <Head>
        <title>{title}</title>
        {link}
        {head}
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <Container p={4} maxWidth="80ch">
        {withNavBar && <NavBar />}
        <Box as="main" lang={lang}>
          {children}
        </Box>
        {withFooter && <Footer />}
      </Container>
    </>
  );
};
