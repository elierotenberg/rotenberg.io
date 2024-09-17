import { Resume } from "../components/Resume/Resume";

import type { Metadata } from "next";
import type { FunctionComponent } from "react";

const Page: FunctionComponent = () => {
  return <Resume />;
};

export default Page;

export const metadata: Metadata = {
  authors: [{ name: `Elie Rotenberg` }],
  description: `Elie Rotenberg's personal website`,
  openGraph: {
    type: `profile`,
  },
  robots: `index, follow`,
  title: `Elie Rotenberg`,
};
