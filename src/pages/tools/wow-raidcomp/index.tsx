import type { FunctionComponent } from "react";
import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import { useCanonicalUrlLink } from "../../../lib/url";

const WowRaidCompPage = dynamic(
  import(`../../../components/WowRaidComp/WowRaidComp`),
);

const Index: FunctionComponent = () => {
  const link = useCanonicalUrlLink();
  return (
    <>
      <Head>
        <title>WoW RaidComp</title>
        {link}
      </Head>
      <WowRaidCompPage />
    </>
  );
};

export default Index;
