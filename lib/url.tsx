import { useRouter } from "next/router";
import React, { useEffect, ReactNode } from "react";

const canonicalBaseUrl = process.env.NEXT_PUBLIC_CANONICAL_BASE_URL;
const allowBaseUrl = (process.env.NEXT_PUBLIC_ALLOW_BASE_URL ?? "")
  .split(" ")
  .filter((baseUrl) => baseUrl.length > 0);

const useCanonicalUrl = (): ReactNode => {
  const { asPath } = useRouter();

  const canonicalHref = `${canonicalBaseUrl}${asPath}`;
  const allowHref = allowBaseUrl.map((baseUrl) => `${baseUrl}${asPath}`);
  useEffect(() => {
    if (![canonicalHref, ...allowHref].includes(window.location.href)) {
      window.location.assign(canonicalHref);
    }
  }, [canonicalHref, allowHref]);

  return <link rel="canonical" href={canonicalHref} />;
};

export { useCanonicalUrl };
