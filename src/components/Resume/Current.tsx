import React, { FunctionComponent } from "react";

import { Link } from "../Link";

import { PositionItem } from "./PositionItem";
import { PositionList } from "./PositionList";

export const Current: FunctionComponent = () => (
  <PositionList title="Current positions">
    <PositionItem date="Since 2019" description={<>CTO, Head of R&D</>}>
      Founder at{` `}
      <Link href="https://ifea.education" isExternal>
        iféa
      </Link>
    </PositionItem>
    <PositionItem date="Since 2019" description={<>Tech Advisor in Venture</>}>
      Founder at Page & Rotenberg
    </PositionItem>
  </PositionList>
);
