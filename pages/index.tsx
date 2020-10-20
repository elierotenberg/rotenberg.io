import React, { FunctionComponent } from "react";
import Head from "next/head";

import { useCanonicalUrl } from "../lib/url";
import { Resume } from "../components/Resume/Resume";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

const Index: FunctionComponent = () => {
  const link = useCanonicalUrl();
  return (
    <>
      <Head>
        <title>Elie Rotenberg</title>
        {link}
      </Head>
      <NavBar />
      <Resume />
      <Footer />
    </>
  );
};

export default Index;
