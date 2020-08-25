import { useRouter } from "next/router";
import React, { useEffect, ReactNode } from "react";

const baseUrl = `https://elie.rotenberg.io`;

const useCanonicalUrl = (): ReactNode => {
  const { route } = useRouter();
  const href = new URL(route, baseUrl).href;
  useEffect(() => {
    if (
      window.location.hostname !== "localhost" &&
      window.location.href !== href
    ) {
      window.location.assign(href);
    }
  }, [href]);

  return <link rel="canonical" href={href} />;
};

export { useCanonicalUrl };
