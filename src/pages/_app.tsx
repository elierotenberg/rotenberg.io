import type { FunctionComponent } from "react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { triggerPageView } from "../lib/GoogleAnalytics";
import { theme } from "../lib/theme";

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    router.events.on(`routeChangeComplete`, triggerPageView);
    return () => {
      router.events.off(`routeChangeComplete`, triggerPageView);
    };
  }, [router.events]);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
