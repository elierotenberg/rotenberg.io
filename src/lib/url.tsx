import { useRouter } from "next/router";
import React, { useEffect, ReactNode, Fragment } from "react";

const canonicalBaseUrl = process.env.NEXT_PUBLIC_CANONICAL_BASE_URL;
const allowBaseUrlPatterns = (
  process.env.NEXT_PUBLIC_ALLOW_BASE_URL_PATTERNS ?? ``
)
  .split(` `)
  .filter((baseUrl) => baseUrl.length > 0);

export const useCanonicalUrlLink = (): ReactNode => {
  const { asPath } = useRouter();

  const canonicalHref = `${canonicalBaseUrl}${asPath}`;
  useEffect(() => {
    if (
      !allowBaseUrlPatterns.some((baseUrlPattern) =>
        window.location.href.includes(baseUrlPattern),
      ) &&
      canonicalHref !== window.location.href
    ) {
      window.location.assign(canonicalHref);
    }
  }, [canonicalHref, canonicalHref]);

  return (
    <Fragment>
      <link rel="canonical" href={canonicalHref} />
      <meta property="og:url" content={canonicalHref} />
    </Fragment>
  );
};

export const useCanonicalUrl = (path: string): string =>
  `${canonicalBaseUrl}${path}`;
