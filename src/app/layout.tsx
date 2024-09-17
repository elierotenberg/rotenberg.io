"use client";

import { Link } from "@chakra-ui/next-js";
import {
  ChakraProvider,
  Container,
  HStack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

import { theme } from "../lib/theme";

import type { ChildrenProps } from "../lib/React";
import type { FunctionComponent } from "react";

const NavBar: FunctionComponent = () => (
  <HStack
    align={`stretch`}
    divider={<StackDivider borderColor={`gray.400`} />}
    justify={`center`}
    lang={`en`}
    spacing={2}
    sx={{
      "@media print": {
        display: `none`,
      },
    }}
  >
    <Link href={`/`}>{`About`}</Link>
    <Link href={`/b`}>{`Blog`}</Link>
  </HStack>
);

const Footer: FunctionComponent = () => (
  <Text
    as={`footer`}
    fontSize={`sm`}
    mt={4}
    sx={{
      "@media print": {
        display: `none`,
      },
    }}
    textAlign={`center`}
  >
    {`Elie Rotenberg ©`}
  </Text>
);

const RootLayout: FunctionComponent<ChildrenProps> = ({ children }) => {
  return (
    <html>
      <body>
        <ChakraProvider theme={theme}>
          <Container maxWidth={`80ch`} p={4}>
            <NavBar />
            {children}
            <Footer />
          </Container>
        </ChakraProvider>
      </body>
    </html>
  );
};

export default RootLayout;
