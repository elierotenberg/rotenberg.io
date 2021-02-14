import React, { ReactElement } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

import { head } from "../lib/GoogleAnalytics";

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html>
        <Head>{head}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
