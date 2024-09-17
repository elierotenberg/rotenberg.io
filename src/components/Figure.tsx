"use client";

import { Box, Flex, Img } from "@chakra-ui/react";
import React from "react";

import type { ImgProps } from "@chakra-ui/react";
import type { FunctionComponent } from "react";

export const Figure: FunctionComponent<ImgProps> = (props) => {
  return (
    <Flex alignItems={`center`} as={`figure`} direction={`column`} my={2}>
      <a href={props.src} rel={`noreferrer noopener`} target={`_blank`}>
        <Img {...props} />
      </a>
      {props.title && (
        <Box
          as={`figcaption`}
          fontSize={`sm`}
          fontStyle={`italic`}
          mt={2}
          textAlign={`center`}
        >
          {props.title}
        </Box>
      )}
    </Flex>
  );
};
