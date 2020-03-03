export const GA_TRACKING_ID = "UA-58418549-1";

export const triggerPageView = (url: string): void => {
  // eslint-disable-next-line @typescript-eslint/camelcase
  window.gtag("config", GA_TRACKING_ID, { page_path: url });
};
