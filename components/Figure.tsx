import { Box, Flex, Img, ImgProps } from "@chakra-ui/core";
import React, { FunctionComponent } from "react";

export const Figure: FunctionComponent<ImgProps> = (props) => (
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
