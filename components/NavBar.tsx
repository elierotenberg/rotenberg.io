import { HStack, StackDivider } from "@chakra-ui/core";
import React, { FunctionComponent } from "react";

import { Link } from "./Link";

export const NavBar: FunctionComponent = () => (
  <HStack
    divider={<StackDivider borderColor="gray.400" />}
    spacing={2}
    align="stretch"
    justify="center"
    lang="en"
  >
    <Link href="/">About</Link>
    <Link href="/b">Blog</Link>
  </HStack>
);
