import React, { ReactElement } from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Router } from "next/router";

import { triggerPageView } from "../lib/gtag";
import { theme } from "../lib/theme";

Router.events.on("routeChangeComplete", (url) => triggerPageView(url));

export default class extends App {
  public readonly componentDidMount = (): void => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  };

  public readonly render = (): ReactElement => {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  };
}
