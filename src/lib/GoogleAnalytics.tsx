import type { ReactElement } from "react";
import React, { Fragment } from "react";

export const GA_TRACKING_ID = `UA-58418549-1`;

export const triggerPageView = (url: string): void => {
  window.gtag(`config`, GA_TRACKING_ID, { page_path: url });
};

export const head: ReactElement = (
  <Fragment>
    <script
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });
            
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
      }}
    />
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
  </Fragment>
);
