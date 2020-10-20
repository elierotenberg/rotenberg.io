import { Container, HStack, StackDivider } from "@chakra-ui/core";
import React, { FunctionComponent } from "react";

import { Link } from "./Link";

export const NavBar: FunctionComponent = () => (
  <Container p={4} pb={0} maxWidth="80ch">
    <HStack
      divider={<StackDivider borderColor="gray.400" />}
      spacing={2}
      align="stretch"
      justify="center"
    >
      <Link href="/">About</Link>
      <Link href="/b">Blog</Link>
    </HStack>
  </Container>
);
