"use client";

import { List, ListItem } from "@chakra-ui/react";
import React from "react";

import { Current } from "./Current";
import { Education } from "./Education";
import { Header } from "./Header";
import { Interests } from "./Interests";
import { Past } from "./Past";
import { Research } from "./Research";

import type { FunctionComponent } from "react";

export const Resume: FunctionComponent = () => {
  return (
    <List
      alignItems={`flex-start`}
      as={`div`}
      mt={4}
      spacing={4}
      sx={{
        "& > *": {
          breakInside: `avoid`,
        },
      }}
    >
      <ListItem as={`header`}>
        <Header />
      </ListItem>
      <ListItem as={`section`}>
        <Interests />
      </ListItem>
      <ListItem as={`section`}>
        <Current />
      </ListItem>
      <ListItem as={`section`}>
        <Past />
      </ListItem>
      <ListItem as={`section`}>
        <Research />
      </ListItem>
      <ListItem as={`section`}>
        <Education />
      </ListItem>
    </List>
  );
};
