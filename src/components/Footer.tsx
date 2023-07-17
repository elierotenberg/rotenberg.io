import { Text } from "@chakra-ui/react";
import type { FunctionComponent } from "react";
import React from "react";

export const Footer: FunctionComponent = () => (
  <Text
    as="footer"
    textAlign="center"
    mt={4}
    fontSize="sm"
    sx={{
      "@media print": {
        display: `none`,
      },
    }}
  >
    Elie Rotenberg ©
  </Text>
);
