import type { FunctionComponent } from "react";
import React from "react";

import { PositionItem } from "./PositionItem";
import { PositionList } from "./PositionList";

export const Past: FunctionComponent = () => (
  <PositionList title="Past positions">
    <PositionItem
      date="2018 - 2019"
      description={
        <>
          Tech lead on internal cross-branch projects (Infra, Machine
          Learning...)
        </>
      }
    >
      Head of R&D Team at Webedia
    </PositionItem>
    <PositionItem
      date="2014 - 2017"
      description={
        <>
          CTO, strategy & editorial advisor at Jeuxvideo.com, Millenium,
          IGN.fr...
        </>
      }
    >
      CTO of Webedia Gaming
    </PositionItem>
    <PositionItem
      date="2008 - 2013"
      description={<>CTO, strategy & editorial advisor</>}
    >
      Founder at Millenium
    </PositionItem>
  </PositionList>
);
