import type { FunctionComponent } from "react";
import React from "react";
import Head from "next/head";

import { useCanonicalUrlLink } from "../../../lib/url";
import { Sc2CoopPickerPage } from "../../../components/Sc2CoopPicker/Sc2CoopPicker";

const Index: FunctionComponent = () => {
  const link = useCanonicalUrlLink();
  return (
    <>
      <Head>
        <title>SC2 Co-op Random Picker</title>
        {link}
      </Head>
      <Sc2CoopPickerPage />
    </>
  );
};

export default Index;
