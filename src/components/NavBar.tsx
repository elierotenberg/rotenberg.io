import { HStack, StackDivider } from "@chakra-ui/react";
import type { FunctionComponent } from "react";
import React from "react";

import { Link } from "./Link";

export const NavBar: FunctionComponent = () => (
  <HStack
    divider={<StackDivider borderColor="gray.400" />}
    spacing={2}
    align="stretch"
    justify="center"
    lang="en"
    sx={{
      "@media print": {
        display: `none`,
      },
    }}
  >
    <Link href="/">About</Link>
    <Link href="/b">Blog</Link>
  </HStack>
);
