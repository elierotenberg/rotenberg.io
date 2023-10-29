"use client";

import { useState, type FunctionComponent, useEffect } from "react";

export const DateFormat: FunctionComponent<{
  readonly date: string;
  readonly locales?: undefined | string | string[];
  readonly options?: Intl.DateTimeFormatOptions;
}> = ({ date, locales, options }) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    setFormattedDate(
      new Intl.DateTimeFormat(locales, options).format(new Date(date)),
    );
  }, [date, locales, options]);

  return <>{formattedDate}</>;
};
