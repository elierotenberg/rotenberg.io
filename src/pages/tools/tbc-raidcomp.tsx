import { useRouter } from "next/router";
import type { ReactElement } from "react";
import React, { Fragment, useEffect } from "react";

export default (): ReactElement => {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    router.push({
      pathname: `/tools/wow-raidcomp`,
      hash,
    });
  }, []);

  return <Fragment />;
};
