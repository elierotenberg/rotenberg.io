import React, { FunctionComponent } from "react";
import { List, ListItem } from "@chakra-ui/core";

import { Page } from "../Page";

import { Header } from "./Header";
import { Current } from "./Current";
import { Past } from "./Past";
import { Research } from "./Research";
import { Education } from "./Education";
import { Interests } from "./Interests";

export const Resume: FunctionComponent = () => {
  return (
    <Page withFooter={true} withNavBar={true} title="Elie Rotenberg" lang="en">
      <List alignItems="flex-start" spacing={4}>
        <ListItem as="header">
          <Header />
        </ListItem>
        <ListItem as="section">
          <Interests />
        </ListItem>
        <ListItem as="section">
          <Current />
        </ListItem>
        <ListItem as="section">
          <Past />
        </ListItem>
        <ListItem as="section">
          <Research />
        </ListItem>
        <ListItem as="section">
          <Education />
        </ListItem>
      </List>
    </Page>
  );
};
