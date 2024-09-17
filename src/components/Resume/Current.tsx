"use client";

import { Link } from "@chakra-ui/next-js";
import React from "react";

import { PositionItem } from "./PositionItem";
import { PositionList } from "./PositionList";

import type { FunctionComponent } from "react";

export const Current: FunctionComponent = () => (
  <PositionList title={`Current positions`}>
    <PositionItem date={`Since 2019`}>
      {`Founder at`}
      {` `}
      <Link href={`https://ifea.education`} isExternal>
        {`iféa`}
      </Link>
    </PositionItem>
    <PositionItem date={`Since 2022`}>
      {`Board Member at`}
      {` `}
      <Link href={`https://learningplanetinstitute.org/`} isExternal>
        {`Learning Planet Institute`}
      </Link>
    </PositionItem>
    <PositionItem date={`Since 2020`}>
      {`Tech Advisor at`}
      {` `}
      <Link href={`https://jusmundi.com/`} isExternal>
        {`Jus Mundi`}
      </Link>
    </PositionItem>
    <PositionItem date={`Since 2019`}>
      {`Founder at Page & Rotenberg`}
    </PositionItem>
  </PositionList>
);
