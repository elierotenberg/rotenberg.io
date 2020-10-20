import { Container } from "@chakra-ui/core";
import React, { FunctionComponent } from "react";

export const Footer: FunctionComponent = () => (
  <Container as="footer" textAlign="center" p={4} maxWidth="80ch">
    Elie Rotenberg ©
  </Container>
);
