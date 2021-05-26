import React, { FunctionComponent } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import { useCanonicalUrlLink } from "../../../lib/url";

const TbcRaidcompPage = dynamic(
  import(`../../../components/TbcRaidcomp/TbcRaidcomp`),
);

const Index: FunctionComponent = () => {
  const link = useCanonicalUrlLink();
  return (
    <>
      <Head>
        <title>TBC Raidcomp</title>
        {link}
      </Head>
      <TbcRaidcompPage />
    </>
  );
};

export default Index;
