import React, { FunctionComponent } from "react";
import Head from "next/head";

import { PageContainer } from "../components/PageContainer";
import { useCanonicalUrl } from "../url";
import { IndexPage } from "../components/IndexPage/IndexPage";

const Index: FunctionComponent = () => {
  const link = useCanonicalUrl();
  return (
    <>
      <Head>
        <title>Elie Rotenberg</title>
        {link}
      </Head>
      <PageContainer>
        <IndexPage />
      </PageContainer>
    </>
  );
};

export default Index;
