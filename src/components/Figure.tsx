import type { ImgProps } from "@chakra-ui/react";
import { Box, Flex, Img } from "@chakra-ui/react";
import type { FunctionComponent } from "react";
import React from "react";

export const Figure: FunctionComponent<ImgProps> = (props) => {
  return (
    <Flex as="figure" direction="column" alignItems="center" my={2}>
      <a href={props.src} target="_blank" rel="noreferrer noopener">
        <Img {...props} />
      </a>
      {props.title && (
        <Box
          as="figcaption"
          textAlign="center"
          fontStyle="italic"
          fontSize="sm"
          mt={2}
        >
          {props.title}
        </Box>
      )}
    </Flex>
  );
};
