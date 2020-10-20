import React, { FunctionComponent } from "react";
import { Container, List, ListItem } from "@chakra-ui/core";

import { Header } from "./Header";
import { Current } from "./Current";
import { Past } from "./Past";
import { Research } from "./Research";
import { Education } from "./Education";
import { Interests } from "./Interests";

export const Resume: FunctionComponent = () => {
  return (
    <Container p={4} maxWidth="80ch">
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
    </Container>
  );
};
