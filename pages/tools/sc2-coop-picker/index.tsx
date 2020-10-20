import React, { FunctionComponent } from "react";
import Head from "next/head";

import { useCanonicalUrl } from "../../../lib/url";
import { Sc2CoopPickerPage } from "../../../components/Sc2CoopPicker/Sc2CoopPicker";

const Index: FunctionComponent = () => {
  const link = useCanonicalUrl();
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
